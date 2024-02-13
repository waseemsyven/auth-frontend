"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

function Sidebar({ children }) {
  const { user } = useUser();

  const [isHovered, setIsHovered] = useState(false);

  const renderSidebarStyles = () => {
    if (isHovered) {
      return "w-[200px] h-screen py-4 bg-blue-500 flex flex-col duration-200 ps-absolute sidebarcustom";
    }

    return "w-[80px] h-screen py-4 bg-blue-500 flex flex-col duration-200 ps-absolute sidebarcustom";
  };
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const pathname = "dashboard";

  return (
    <div className="flex sidenavlist">
      <div
        className={renderSidebarStyles()}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <Link href="/dashboard" className="flex justify-center items-center ">
          {!isHovered && (
            <Image
              src="/logo_bookend_closed.svg"
              alt="logo_bookend"
              width={32}
              height={48}
              className="object-contain py-2 logocls"
            />
          )}
          {isHovered && (
            <Image
              src="/logo_bookend.svg"
              alt="logo_bookend"
              width={132}
              height={48}
              className="object-contain py-2 logocls "
            />
          )}
        </Link>
        {<div className="w-full bg-[#F7FAFB] opacity-30 h-[1px] mt-2"></div>}
        <div className="flex flex-col justify-between h-full">
          <div className="mx-[0.5rem]">
            {" "}
            <Link
              href="/dashboard"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-4 w-full hover:[#2B59C5] rounded-[8px] ${
                pathname.includes("dashboard") ? "bg-[#2B59C5]" : ""
              }`}
            >
              <Image
                src="/gauge.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Dashboard
                </h2>
              )}
            </Link>{" "}
            <Link
              href="/datasets"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-4 w-full hover:bg-[#2B59C5] rounded-[8px] ${
                pathname.includes("datasets") && "bg-[#2B59C5]"
              }`}
            >
              <Image
                src="/database.svg"
                alt="Datasets"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  Datasets
                </h2>
              )}
            </Link>
            <div
              className={`flex cursor-pointer ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-4 w-full hover:bg-[#2B59C5] rounded-[8px] ${
                pathname === "/docs" && "bg-[#2B59C5]"
              }`}
              //   onClick={openNewTab}
            >
              <Image
                src="/book_icon.svg"
                alt="Datasets"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3">
                  API Docs
                </h2>
              )}
            </div>
          </div>
          <div className="mx-[0.5rem]">
            <div
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center my-6 px-4 w-full hover:bg-[#2B59C5] rounded-[8px] cursor-pointer`}
            >
              <Image
                src="/question.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3 whitespace-nowrap">
                  Help & Support
                </h2>
              )}
            </div>
            <div className="w-full bg-[#F7FAFB] opacity-30 h-[1px]"></div>
            <div
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center mt-6 px-4 w-full hover:bg-[#2B59C5] rounded-[8px] cursor-pointer`}
            >
              <Image
                src="/user_icon.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4"
              />
              {isHovered && (
                <h2 className="text-[13px] font-semibold text-white ml-3 capitalize">
                  {user && user.nickname}
                </h2>
              )}
            </div>
            <a
              href="/api/auth/logout"
              className={`flex ${
                isHovered ? "justify-start" : "justify-center"
              } items-center mt-6 px-4 w-full hover:bg-[#2B59C5] rounded-[8px] cursor-pointer text-white`}
            >
              {" "}
              <Image
                src="/logout.svg"
                alt="logo_bookend"
                width={24}
                height={24}
                className="object-contain py-4 mr-2"
              />
              {isHovered && "Logout"}
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full dash-right-section"> {children}</div>
    </div>
  );
}

export default Sidebar;
