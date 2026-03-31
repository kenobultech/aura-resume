"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// 1. Move the actual logic into a separate component
function VerifyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const reference = params.get("reference");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!reference) return;

    fetch("/api/paystack/verify", {
      method: "POST",
      body: JSON.stringify({ reference }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" || data.status === "already_verified") {
          setStatus("success");
          setTimeout(() => {
            router.push("/builder");
          }, 2000);
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [reference, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        {status === "verifying" && (
          <p className="text-blue-600 font-semibold animate-pulse">Verifying payment, please wait...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 font-semibold">Payment successful! Redirecting to your resume...</p>
        )}
        {status === "failed" && (
          <p className="text-red-600 font-semibold">Payment failed or could not be verified.</p>
        )}
      </div>
    </div>
  );
}

// 2. Wrap it in Suspense in the default export
export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}