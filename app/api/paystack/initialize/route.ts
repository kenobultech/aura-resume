// app/api/paystack/initialize/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 
import connectDB from '@/lib/db'; 
import { Transaction } from '@/models/Transactions'; 
import { User } from '@/models/User';
import { RESUME_TEMPLATES } from '@/data/templates';

// Helper to determine credit category from templateId
const getCategory = (templateId: string) => {
  if (!templateId) return "multi"; // Fallback to multi if no template provided
  const prefix = templateId.split("-")[0].toLowerCase();
  if (prefix === "corp") return "corporate";
  if (["creative", "basic", "pro"].includes(prefix)) return prefix;
  return "multi";
};

export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Parse Request
    const body = await req.json();
    
    const rawPlan = body.plan || body.planId || 'single';
    // targetCategory should be sent from frontend when buying on the Subscription page
    const { templateId, resumeId, targetCategory } = body; 

    let amount = 0;
    let creditsPurchased = 0;
    let dbPlan = 'single';
    let dbCategory = targetCategory;

    // 3. Logic: Bundle vs Single
    // If frontend sends 'bundle', 'bundle-5', etc.
    if (rawPlan.includes('bundle') || rawPlan === 'subscription') {
      dbPlan = 'bundle';
      
      // Pull amount and credits from the frontend payload
      amount = Number(body.amount) || 0;
      creditsPurchased = Number(body.creditsToGive || body.creditsPurchased) || 0;
      
      // If category wasn't explicitly provided, infer it from the template (or default to multi)
      if (!dbCategory) {
        dbCategory = getCategory(templateId);
      }

      if (amount <= 0 || creditsPurchased <= 0) {
        return NextResponse.json({ error: 'Invalid bundle configuration' }, { status: 400 });
      }
      
    } else {
      // Default to Single Pay-As-You-Go logic
      dbPlan = 'single';
      
      if (!templateId) {
        return NextResponse.json({ error: 'Template ID required for single download' }, { status: 400 });
      }

      // Lookup price from your template file (Source of Truth)
      const template = RESUME_TEMPLATES.find(t => t.id === templateId);
      
      if (!template) {
        return NextResponse.json({ error: 'Invalid template' }, { status: 400 });
      }
      
      amount = template.price;
      creditsPurchased = 0; 
      
      // Automatically map "corp-1" -> "corporate"
      dbCategory = getCategory(templateId);
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Cannot process payment for free templates' }, { status: 400 });
    }

    // 4. Generate Reference
    const reference = `resume_${Date.now()}_${user._id}`;

    // 5. Create PENDING Transaction in DB
    await Transaction.create({
      userId: user._id,
      reference,
      amount, 
      currency: 'KES',
      status: 'pending',
      plan: dbPlan, 
      targetCategory: dbCategory, // <--- CRITICAL: Saves which bucket gets the credits!
      templateId: templateId || null,
      resumeId: resumeId || null,
      creditsPurchased,
    });

    // 6. Return Config to Frontend
    return NextResponse.json({
      reference,
      amount: amount * 100, // Paystack expects lowest denomination (Kobo/Cents)
      email: user.email,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
    });

  } catch (error: any) {
    console.error('Payment Initialization Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}