// config/Pricing.ts

export interface PricingPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  tag?: string;
}

export const getPricingPlans = (templatePrice: number): PricingPlan[] => {
  return [
    {
      id: "single-download", // MATCHES YOUR BACKEND ROUTE CHECK
      name: "Single Download",
      credits: 0, // Backend says 0 for single
      price: templatePrice, 
      description: "One-time payment for this resume.",
      tag: undefined
    },
    {
      id: "bundle-5", // MATCHES YOUR BACKEND ROUTE CHECK
      name: "Power Pack",
      credits: 5,
      price: 500, 
      description: "Get 5 credits (Best Value).",
      tag: "Best Value"
    }
  ];
};