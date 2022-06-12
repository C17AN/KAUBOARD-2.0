import classNames from "classnames";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "react-query";
import openGraphFetcher from "../../../apis/openGraph";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Input from "../../common/Input";
import Modal from "../../common/Modal";
import { v4 as uuidv4 } from "uuid";
import { FavoriteLink } from "./List";

type FavoriteLinkCreateModalProps = {
  handleClose: () => void;
  favoriteLinkList: FavoriteLink[];
  setFavoriteLinkList: Dispatch<SetStateAction<FavoriteLink[]>>;
};

const FavoriteLinkCreateModal = ({
  handleClose,
  favoriteLinkList,
  setFavoriteLinkList,
}: FavoriteLinkCreateModalProps) => {
  const [, setItem] = useLocalStorageAsync();
  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // fetcher 함수에는 첫 번째 인자의 값(쿼리 키, 인자 등)이 전달된다.
  const { isSuccess, isLoading, refetch } = useQuery(["openGraphData", siteUrl], openGraphFetcher, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleUrlValidation = async () => {
    const { data } = await refetch();
    const imageResource = data?.data.ogImage;
    // ogImage가 둘 이상인 사이트가 일부 존재함. (Ex. https://m.inven.co.kr)
    if (Array.isArray(imageResource)) {
      setOgImage(imageResource[imageResource.length].url);
    } else {
      setOgImage(imageResource.url);
    }
  };

  const handleSubmit = () => {
    setItem("favorites", [
      ...favoriteLinkList,
      { id: uuidv4(), title: siteName, thumbnail: ogImage, targetUrl: siteUrl },
    ]);
    setFavoriteLinkList([
      ...favoriteLinkList,
      { id: uuidv4(), title: siteName, thumbnail: ogImage, targetUrl: siteUrl },
    ]);
    handleClose();
  };

  const validateForm = () => {
    if (siteName.length > 0 && siteUrl.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(validateForm, [siteUrl, siteName]);

  return (
    <Modal>
      <div className="min-w-[36vw] bg-white px-6 py-4 rounded-lg">
        <h2 className="text-gray-600 font-bold text-xl mb-4">즐겨찾기 추가</h2>
        <section className="flex flex-col mb-6 gap-4">
          <div>
            <h3 className="text-lg text-gray-500 font-bold">
              <span className="text-red-400 mr-1 align-middle">*</span>제목
            </h3>
            <Input
              onChange={(e) => {
                setSiteName(e.target.value);
              }}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div>
            <h3 className="text-lg text-gray-500 font-bold">
              <span className="text-red-400 mr-1 align-middle">*</span>사이트 URL
            </h3>
            <div className="flex space-x-4 items-center">
              <Input
                onChange={(e) => {
                  setSiteUrl(e.target.value);
                }}
                placeholder="사이트 URL을 입력하세요"
              />
              {/* 
                오픈 그래프 불러오는 코드 -> 사용자 입장에서는 불편할 수 있을거같아 제거
                {!isSuccess ? (
                <button
                  className={classNames(
                    "inline-block my-2 bg-kau-primary/50 rounded-lg text-gray-50 hover:bg-kau-primary/70 transition-colors py-2 px-4 font-semibold",
                    isSuccess && "bg-white"
                  )}
                  onClick={() => !isLoading && !isSuccess && handleUrlValidation()}
                >
                  URL 검사
                </button>
              ) : (
                <img src="/icons/complete.gif" className="w-10 h-10" />
              )} */}
            </div>
          </div>
        </section>
        <div className="space-x-5 text-right">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="확인" handleClick={handleSubmit} disabled={!isFormValid} />
        </div>
      </div>
    </Modal>
  );
};

export default FavoriteLinkCreateModal;
