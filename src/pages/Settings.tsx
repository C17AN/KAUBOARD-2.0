import React from "react";
import ApplicationSetting from "../components/Settings/ApplicationSetting";
import AuthenticationSetting from "../components/Settings/AuthenticationSetting";

type Props = {};

const Settings = (props: Props) => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-700">설정</h2>
      <div className="bg-kau-primary h-[2px] my-4 rounded-2xl bg-opacity-40" />
      <div className="flex flex-col space-y-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-600">어플리케이션 설정</h2>
        <ApplicationSetting />
      </div>
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-gray-600">소셜 로그인</h2>
        <AuthenticationSetting />
      </div>
    </div>
  );
};

export default Settings;
