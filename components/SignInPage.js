"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

function Signin() {
  const { user } = useUser();
  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }

  return (
    <div className="h-screen w-full bg-[#F7FAFB] flex justify-center items-center">
      <div className="w-[1060px] h-[568px] shadow grid grid-cols-2 rounded-[20px]">
        <div className="bg-[#131A44] flex justify-center items-center rounded-tl-[20px] rounded-bl-[20px]">
          <Image
            src="/bookendailogo.svg"
            alt="logo_bookend"
            width={301}
            height={48}
            className="object-contain py-2"
          />
        </div>
        <div className="bg-white flex justify-center items-center flex-col rounded-[20px]">
          <h2 className="text-2xl font-semibold	mb-8">Welcome to Bookend.AI</h2>
          <a
            href="/api/auth/login"
            className="bg-blue-500 rounded-[8px] gap-2 py-2 px-8 text-[15px] font-normal text-white disabled:bg-[#C0C0C0]"
          >
            Login to Continue
          </a>
          <h3 className="text-sm text-[#404040] font-normal mt-8">
            Could not login?{" "}
            <span className="underline underline-offset-1 cursor-pointer">
              Contact Us
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Signin;
