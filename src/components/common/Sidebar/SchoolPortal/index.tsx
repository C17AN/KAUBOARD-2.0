import React, { useState } from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import SchoolPortalModal from "./SchoolPortalModal";

const SchoolPortal = () => {
  const [isSchoolPortalModalOpen, setIsSchoolPortalModalOpen] = useState(false);
  return (
    <>
      <button
        className="w-full flex items-center py-2 px-4 rounded-md bg-kau-primary/60 hover:bg-kau-primary/80 transition-colors text-sm border border-solid border-gray-200/80"
        onClick={() => {
          setIsSchoolPortalModalOpen(true);
        }}
      >
        <ExternalLinkIcon className="w-4 h-4 text-white mr-3" />
        <span className="text-white font-semibold">학교 포탈 바로가기</span>
      </button>
      {isSchoolPortalModalOpen && (
        <SchoolPortalModal
          handleClose={() => {
            setIsSchoolPortalModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default SchoolPortal;
