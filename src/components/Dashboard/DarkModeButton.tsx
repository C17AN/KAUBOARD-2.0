import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import React from "react";
import { useRecoilState } from "recoil";
import useLocalStorageAsync from "../../hooks/useLocalStorageAsync";
import { isDarkModeAtom } from "../../recoil/atom/application";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeAtom);
  const [getItem, setItem] = useLocalStorageAsync();

  const toggleDarkModeState = () => {
    setIsDarkMode((prevState) => {
      setItem("isDarkMode", !prevState);
      return !prevState;
    });
  };

  return (
    <button>
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" onClick={toggleDarkModeState} />
      ) : (
        <MoonIcon className="w-6 h-6" onClick={toggleDarkModeState} />
      )}
    </button>
  );
};

export default DarkModeButton;
