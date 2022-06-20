import React, { MouseEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  handleClose?: () => void;
};

const ModalPortal = ({ children }) => {
  const el = document.getElementById("modal-root");
  if (el) {
    return ReactDOM.createPortal(children, el);
  } else {
    return <>{children}</>;
  }
};

const Modal = ({ children, handleClose }: ModalProps) => {
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
      <div className="absolute flex items-center justify-center top-0 left-0 w-full h-full ">
        <div
          id="backdrop"
          className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-800 bg-opacity-40 z-10"
          onClick={handleClose}
        />
        <motion.div
          initial={initialModalAnimation}
          animate={activeModalAnimation}
          className="z-20 inline"
        >
          {children}
        </motion.div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
