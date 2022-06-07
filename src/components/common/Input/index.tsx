import React, { ChangeEventHandler } from "react";

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const Input = ({ onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full focus:outline-none flex-1 focus:bg-gray-50 transition-colors rounded-md text-lg caret-slate-500 py-2 pl-3 my-2 placeholder-slate-400/80 text-slate-500 font-semibold"
      onChange={onChange}
    />
  );
};

export default Input;
