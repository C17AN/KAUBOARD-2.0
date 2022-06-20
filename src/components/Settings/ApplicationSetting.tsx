import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import useLocalStorageAsync from "../../hooks/useLocalStorageAsync";
import Input from "../common/Input";
import getRecentVersion from "../../apis/getRecentVersion";
import ConfirmButton from "../common/Button/ConfirmButton";
import openToast from "../../utils/helpers/openToast";
import { userNameAtom } from "../../recoil/atom/application";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { APP_STORE_URL, RECENT_VERSION } from "../../utils/contants/application";
import generateRandomUserName from "../../utils/helpers/generateRandomUserName";

const MAX_USERNAME_LENGTH = 15;

const ApplicationSetting = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [localUserName, setLocalUserName] = useState(userName);
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [, setItem] = useLocalStorageAsync();

  const { data: recentVersion } = useQuery("recentVersion", () => getRecentVersion(), {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (recentVersion === RECENT_VERSION) {
      setIsLatestVersion(true);
    }
  }, [recentVersion]);

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalUserName(e.target.value);
  };

  useEffect(() => {
    setLocalUserName(userName);
  }, [userName]);

  const submitUserName = () => {
    if (localUserName.length > 0) {
      setUserName(localUserName);
      setItem("userName", localUserName);
      openToast("이름이 변경되었습니다.");
    } else {
      const randomName = generateRandomUserName();
      setUserName(randomName);
      setItem("userName", randomName);
      openToast("무작위 이름이 생성되었습니다.");
    }
  };

  const initTaskData = () => {
    setItem("tasks", []);
    openToast("일정 목록이 초기화되었습니다.");
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(APP_STORE_URL);
    openToast("앱스토어 URL이 복사되었습니다.");
  };

  return (
    <>
      <div className="px-6 py-4 rounded-lg bg-white/90 space-y-8 text-lg font-semibold text-gray-500 border border-solid border-gray-200">
        <section className="flex space-x-4 justify-between items-center">
          <div className="flex-[2] space-y-1">
            <h2>닉네임 설정</h2>
            <p className="text-xs text-gray-400">닉네임은 채팅 및 이미지 업로드에 사용됩니다.</p>
          </div>
          <Input
            value={localUserName}
            placeholder="사용할 별명을 입력하세요 (최대 15자)"
            onChange={handleUserNameChange}
            maxLength={MAX_USERNAME_LENGTH}
          />
          <button
            className="bg-kau-primary/60 rounded-lg py-2 px-4 text-white font-semibold hover:bg-kau-primary/80 transition-colors disabled:bg-gray-300"
            onClick={submitUserName}
            disabled={userName === localUserName}
          >
            변경
          </button>
        </section>
        <section className="flex space-x-4 justify-between items-center">
          <div>
            <h2>일정 데이터 초기화</h2>
            <p className="text-xs text-gray-400">
              메모 / 일정 추가에 문제를 겪을 시, 이전에 쌓인 일정을 초기화해 보세요.
            </p>
          </div>
          <button
            className="bg-kau-primary/60 rounded-lg py-2 px-4 text-white font-semibold hover:bg-kau-primary/80 transition-colors"
            onClick={initTaskData}
          >
            확인
          </button>
        </section>
        {/* <div className="flex space-x-4 justify-between items-center">
          <div>컨텐츠 애니메이션 사용하기</div>
          <Switch handleClick={toggleAnimationSetting} isSelected={isAnimationEnabled} />
        </div> */}
        <section className="flex space-x-4 justify-between items-center">
          <h2>버전 정보</h2>
          <div className="space-x-4 flex">
            <div>
              <p>현재 클라이언트 버전 : {RECENT_VERSION}</p>
              {!isLatestVersion && (
                <p className="text-xs text-red-400 mt-1">업데이트가 필요합니다.</p>
              )}
            </div>
            <span>/</span>
            <p>최신 버전 : {recentVersion}</p>
          </div>
        </section>
        <section className="flex space-x-4 justify-between items-center">
          <h2>종강시계 공유하기</h2>
          <ConfirmButton text="URL 복사" handleClick={copyShareUrl} />
        </section>
        <section className="flex space-x-4 justify-between items-center">
          <h2>개인정보 사용처 고지</h2>
          <div className="text-xs text-gray-400 space-y-1">
            <p>채팅, 갤러리 기능에 한해서만 발신자 / 업로더의 이메일 정보를 수집하고 있습니다.</p>
            <p>이를 제외한 일정, 메모, 즐겨찾기 등의 모든 데이터는 서버로 전달되지 않습니다.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicationSetting;
