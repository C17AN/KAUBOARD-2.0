import React, { ChangeEvent } from "react";

type TextAreaProps = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  value?: string;
  maxLength?: number;
};

const TextArea = ({ value, placeholder, onChange, maxLength = 100 }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      className="resize-none w-full placeholder:text-lg flex-1 mb-4 pr-6 transition-colors focus:bg-gray-50 border-gray-100 rounded-lg py-4 pl-3 focus:outline-none text-lg caret-slate-500 placeholder-slate-400/80 text-slate-500 font-semibold"
      onChange={onChange}
      spellCheck={false}
      maxLength={maxLength}
    />
  );
};

export default TextArea;
