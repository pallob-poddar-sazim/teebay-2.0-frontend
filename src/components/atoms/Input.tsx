"use client";

import { useState } from "react";
import VisibilityIcon from "@/assets/icons/visibility-icon.svg";
import VisibilityOffIcon from "@/assets/icons/visibility-off-icon.svg";

type Props = {
  placeholder?: string;
  type?: "text" | "email" | "password" | "datetime-local" | "number";
  autocomplete?: string;
  includePasswordIcon?: boolean;
  field?: React.InputHTMLAttributes<HTMLInputElement>;
  error?: boolean;
};

const Input = (props: Props) => {
  const [inputType, setInputType] = useState(props.type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="relative flex items-center">
      <input
        className={`p-3 w-full rounded-sm ${
          props.error
            ? `border border-red-500 focus:outline-red-500`
            : `focus:outline-purple border-2 border-gray`
        } `}
        type={inputType}
        placeholder={props.placeholder}
        autoComplete={props.autocomplete}
        {...props.field}
      />
      {props.includePasswordIcon && (
        <span
          className="absolute right-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {inputType === "password" ? (
            <VisibilityOffIcon />
          ) : (
            <VisibilityIcon />
          )}
        </span>
      )}
    </div>
  );
};

export default Input;
