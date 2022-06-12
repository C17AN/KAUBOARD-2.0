import { SearchCircleIcon, SearchIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useState } from "react";

type SearchType = "GOOGLE" | "NAVER";

const SearchBar = () => {
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>("GOOGLE");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isNaverSelected = selectedSearchType === "NAVER";
  const isGoogleSelected = selectedSearchType === "GOOGLE";

  const submitQuery = (searchType: SearchType) => {
    if (searchQuery.length > 0) {
      if (searchType === "GOOGLE") {
        const googleSearchEndPoint = "https://www.google.com/search";
        window.open(`${googleSearchEndPoint}?q=${searchQuery}`, "_self");
      } else if (searchType === "NAVER") {
        const naverSearchEndPoint = "https://search.naver.com/search.naver";
        window.open(`${naverSearchEndPoint}/?query=${searchQuery}`, "_self");
      }
      setSearchQuery("");
    }
  };

  return (
    <>
      <section className="flex space-x-4 items-center mb-4">
        <div className="flex space-x-2 items-center text-gray-700">
          <SearchCircleIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">통합검색</h2>
        </div>
        <div className="flex space-x-3">
          <img
            src="/icons/google.png"
            className={classNames(
              "w-9 h-9 hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all",
              isGoogleSelected && "bg-gray-200/90"
            )}
            alt="구글 검색"
            onClick={() => setSelectedSearchType("GOOGLE")}
          />
          <img
            src="/icons/naver.webp"
            className={classNames(
              "w-9 h-9 hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all",
              isNaverSelected && "bg-gray-200/90"
            )}
            alt="네이버 검색"
            onClick={() => setSelectedSearchType("NAVER")}
          />
        </div>
      </section>
      <div className="flex h-12 items-center rounded-lg transition-all shadow">
        <div
          className={classNames(
            "flex items-center justify-center h-full w-20 text-center rounded-l-lg",
            isNaverSelected && "bg-[#02C73C]",
            isGoogleSelected && "bg-gray-200"
          )}
        >
          <img
            src={`/icons/${isNaverSelected ? "naver.webp" : "google.png"}`}
            className={isNaverSelected ? "w-9 h-9" : "w-6 h-6"}
            alt={`${isNaverSelected ? "네이버 검색" : "구글 검색"}`}
          />
        </div>
        <input
          value={searchQuery}
          className={classNames(
            "w-full outline-none placeholder:font-semibold placeholder:text-gray-400/60 font-semibold text-gray-700 h-full px-3 bg-white border-2 border-solid",
            isNaverSelected && "border-[#02C73C]",
            isGoogleSelected && "border-gray-200"
          )}
          spellCheck={false}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              submitQuery(selectedSearchType);
            } else return;
          }}
          placeholder="검색어를 입력하세요"
        />
        <button
          className={classNames(
            "w-20 flex justify-center items-center rounded-r-lg h-full hover:text-gray-700 cursor-pointer",
            isNaverSelected && "bg-[#02C73C]",
            isGoogleSelected && "bg-gray-50/80 border-gray-200 border-solid border-y-2 border-r-2"
          )}
          onClick={() => submitQuery(selectedSearchType)}
        >
          <SearchIcon
            className={classNames(
              "w-8 h-8",
              isNaverSelected && "text-white",
              isGoogleSelected && "text-gray-600"
            )}
          />
        </button>
      </div>
      <div className="bg-kau-primary/20 h-[1px] rounded-2xl mt-4 mb-8" />
    </>
  );
};

export default SearchBar;
