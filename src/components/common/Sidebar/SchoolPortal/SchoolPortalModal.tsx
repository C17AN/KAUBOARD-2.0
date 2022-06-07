import React from "react";
import QuickLink from "./QuickLink";
import Modal from "../../Modal";

type SchoolPortalModalProps = {
  handleClose: () => void;
};

const SchoolPortalModal = ({ handleClose }: SchoolPortalModalProps) => {
  return (
    <Modal handleClose={handleClose}>
      <div className="">
        <QuickLink />
      </div>
    </Modal>
  );
};

export default SchoolPortalModal;
