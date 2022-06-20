import React, { useState } from "react";
import BugReportModal from "./BugReportModal";

const BugReport = () => {
  const [isBugReportModalOpen, setIsBugReportModalOpen] = useState(false);

  return (
    <>
      <button
        className="w-full flex items-center py-2 px-4 rounded-md bg-white hover:bg-gray-200/80 transition-colors text-sm border border-solid border-gray-200/80"
        onClick={() => setIsBugReportModalOpen(true)}
      >
        <img src="/icons/slack.svg" className="w-4 h-4 mr-3" alt="버그 제보" />
        <span className="text-gray-500/80 font-semibold">버그 제보 및 건의하기</span>
      </button>
      {isBugReportModalOpen && (
        <BugReportModal handleClose={() => setIsBugReportModalOpen(false)} />
      )}
    </>
  );
};

export default BugReport;
