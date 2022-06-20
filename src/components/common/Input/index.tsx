import React, { ChangeEventHandler } from "react";

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  type?: string;
}

const Input = ({ onChange, placeholder, value, maxLength, type = "text" }: InputProps) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className="w-full min-w-[10rem] focus:outline-none flex-1 focus:bg-gray-50 transition-colors rounded-md text-lg caret-slate-500 py-2 pl-3 placeholder-slate-400/80 text-slate-500 font-semibold"
      onChange={onChange}
      maxLength={maxLength}
      type={type}
      spellCheck={false}
    />
  );
};

export default Input;
