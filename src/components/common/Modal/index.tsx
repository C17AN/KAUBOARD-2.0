import React, { MouseEvent } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal-root");
  if (el) {
    return ReactDOM.createPortal(children, el);
  } else {
    return <>{children}</>;
  }
};

const Modal = ({ children }: ModalProps) => {
  const initialModalAnimation = {
    y: -30,
    scale: 0.7,
  };

  const activeModalAnimation = {
    y: 0,
    scale: 1,
  };

  return (
    <ModalPortal>
      <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-gray-600 bg-opacity-40">
        <motion.div initial={initialModalAnimation} animate={activeModalAnimation}>
          {children}
        </motion.div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
