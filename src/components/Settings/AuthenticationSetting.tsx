import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithCredential, signInWithPopup, signOut } from "firebase/auth";
import { authService } from "../../firebase/Config";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom, userEmailAtom } from "../../recoil/atom/authentication";
import CancelButton from "../common/Button/CancelButton";
import LogoutModal from "./LogoutModal";

const getGoogleAuthCredential = () => {
  return new Promise<ReturnType<typeof GoogleAuthProvider.credential>>((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      const credential = GoogleAuthProvider.credential(null, token);
      resolve(credential);
    });
  });
};

const AuthenticationSetting = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);

  const signInWithGoogle = async () => {
    let result: any;
    try {
      if (process.env.NODE_ENV === "development") {
        const provider = new GoogleAuthProvider();
        result = await signInWithPopup(authService, provider);
      } else {
        const credential = await getGoogleAuthCredential();
        result = await signInWithCredential(authService, credential);
      }
      if (result) {
        setIsAuthenticated(true);
      }
      return;
    } catch (error) {
      return error;
    }
  };

  const signout = async () => {
    await signOut(authService);
    return;
  };

  return (
    <>
      <div className="px-6 py-4 rounded-lg bg-white/90 space-y-4 border border-solid border-gray-200">
        {isAuthenticated ? (
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-500">
              {`현재 연결된 이메일 : ${userEmail}`}
            </span>
            <CancelButton
              handleClick={() => {
                setIsLogoutModalOpen(true);
              }}
              text="로그아웃"
            />
          </div>
        ) : (
          <button
            className="flex items-center text-lg font-semibold text-gray-500"
            onClick={signInWithGoogle}
          >
            <img
              src="/icons/google.png"
              alt="google 로그인"
              className="w-4 h-4 mr-2"
              width={48}
              height={48}
            />
            Google 계정으로 로그인
          </button>
        )}
      </div>
      {isLogoutModalOpen && (
        <LogoutModal signOut={signout} handleClose={() => setIsLogoutModalOpen(false)} />
      )}
    </>
  );
};

export default AuthenticationSetting;
