// src/app/(root)/thank-you/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const ThankYouPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Retrieve user info from localStorage
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-white p-4">
      <div className="bg-white p-10 rounded-lg shadow-xl max-w-2xl w-full text-center border border-gray-200">
        <h1 className="text-5xl font-bold text-zinc-800 mb-6">
          Thank You for Shopping with Us
        </h1>
        {userInfo && (
          <div className="space-y-3 mb-8">
            <p className="text-2xl text-gray-800">
              <span className="font-semibold">Hi {userInfo.name},</span>
            </p>
            <p className="text-2xl text-gray-800">
              Your order has been successfully placed. A confirmation email has been sent to{" "}
              <span className="font-semibold text-black">{userInfo.email}</span>.
            </p>
          </div>
        )}
        <p className="text-2xl text-gray-700 mb-8">
          We appreciate your trust in us. If you have any questions, feel free to contact us.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-800 text-white px-8 py-3 rounded-lg text-xl hover:bg-green-600 transition duration-200"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;