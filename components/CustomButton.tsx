"use client";

import Image from "next/image";

const Button = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  leftIcon,
  rightIcon,
  handleClick,
}: any) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    {leftIcon && (
      <div className="relative w-5 h-5">
        <Image
          src={leftIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
    <span className={`flex-1 ${textStyles}`}>{title}</span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <Image
          src={rightIcon}
          alt="arrow_left"
          fill
          className="object-contain"
        />
      </div>
    )}
  </button>
);

export default Button;
