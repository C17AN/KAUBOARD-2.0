import React from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50" onClick={onClose}>
      {children}
    </div>
  );
};

export default Modal;
