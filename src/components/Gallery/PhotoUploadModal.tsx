import React, { ChangeEvent, useEffect, useState } from "react";
import CancelButton from "../common/Button/CancelButton";
import ConfirmButton from "../common/Button/ConfirmButton";
import imageCompression from "browser-image-compression";
import Modal from "../common/Modal";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { userEmailAtom } from "../../recoil/atom/authentication";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";
import { postPhotoOnStorage, postPhotoRef } from "../../apis/gallery";
import { imgBBPhoto, Photo } from "../../types/Photo";
import { maxUploadQuotaAtom, userNameAtom } from "../../recoil/atom/application";
import { AxiosError } from "axios";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import useLocalStorageAsync from "../../hooks/useLocalStorageAsync";
import classNames from "classnames";

type PhotoUploadModalProps = {
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Photo[], AxiosError<unknown, any>>>;
};

const MAX_PHOTO_DESCRIPTION_LENGTH = 30;

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 500,
  useWebWorker: true,
};

const PhotoUploadModal = ({ handleClose, refetch }: PhotoUploadModalProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoDescription, setPhotoDescription] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const [localUploadQuota, setLocalUploadQuota] = useState<number>();
  const [userEmail] = useRecoilState(userEmailAtom);
  const [userName] = useRecoilState(userNameAtom);
  const [uploadQuota, setUploadQuota] = useRecoilState(maxUploadQuotaAtom);
  const [getItem, setItem] = useLocalStorageAsync();
  const isOutOfQuota = uploadQuota <= 0;

  useEffect(() => {
    setLocalUploadQuota(uploadQuota);
  }, [uploadQuota]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const fileName = e.target.files[0];
        const compressedFile = await imageCompression(fileName, compressOptions);
        const dataUrl = URL.createObjectURL(compressedFile);
        setPhotoFile(fileName);
        setPhotoUrl(dataUrl);
      }
    } catch (err) {
      setPhotoFile(null);
      setPhotoUrl(null);
    }
  };

  const uploadImage = async () => {
    try {
      setIsUploading(true);
      const photoUploadResult = await postPhotoOnStorage(photoFile);
      const {
        data: { url, expiration },
      } = photoUploadResult;
      const photo: Photo = {
        uploaderEmail: userEmail,
        uploaderName: userName,
        description: photoDescription,
        photoUrl: url,
      };
      await postPhotoRef(photo, expiration!);
      handleClose();
      await refetch();
      await setItem("uploadQuota", uploadQuota - 1);
      setUploadQuota((uploadQuota) => uploadQuota - 1);
      setIsUploading(false);
    } catch (err) {
      alert("이미지 업로드에 문제가 발생했습니다.");
    }
  };

  return (
    <Modal>
      <div className="bg-white py-6 px-5 w-[28rem]  rounded-xl">
        <h2 className="text-gray-600 font-bold text-xl mb-1">사진 업로드</h2>
        <p
          className={classNames(
            "text-xs mb-4 font-semibold",
            isOutOfQuota && "text-red-400",
            !isOutOfQuota && "text-gray-400"
          )}
        >
          {isOutOfQuota
            ? "주간 업로드 한도를 모두 사용했습니다."
            : `(이번 주 업로드 한도 : ${localUploadQuota}장 / 매주 월요일 초기화)`}
        </p>
        <section className="flex flex-col items-center">
          <div className=" max-h-[20rem] overflow-y-auto mb-4">
            {!photoUrl ? (
              <label htmlFor="image-upload">
                <PhotographIcon className="w-32 h-32 text-gray-300/90 border-dashed border-4 border-gray-300/90 rounded-2xl mb-6 cursor-pointer" />
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  id="image-upload"
                  className="hidden"
                  onChange={(e) => {
                    handleImageUpload(e);
                  }}
                />
              </label>
            ) : (
              <div className="relative border border-solid border-gray-200 p-2 mb-6">
                <XIcon
                  className="absolute top-2 right-2 bg-white/70 hover:bg-gray-300 transition-colors rounded-full p-1 text-red-500 font-semibold w-6 h-6 cursor-pointer"
                  onClick={() => setPhotoUrl(null)}
                />
                <img src={photoUrl!} alt="미리보기 이미지" />
              </div>
            )}
          </div>
          <section className="flex flex-1 flex-col justify-self-start w-full mb-4">
            <h2 className="text-gray-600 font-bold text-lg mb-2">사진 설명</h2>
            <Input
              placeholder={`한 줄 소개를 입력해주세요. (최대 ${MAX_PHOTO_DESCRIPTION_LENGTH}자)`}
              onChange={(e) => {
                setPhotoDescription(e.target.value);
              }}
              maxLength={MAX_PHOTO_DESCRIPTION_LENGTH}
            />
          </section>
          <div className="mb-5 w-full">
            <h2 className="text-lg font-bold text-gray-600 mb-2">업로드 주의사항</h2>
            <ul className="text-sm list-disc list-inside flex flex-col gap-2 text-gray-600/90">
              <li>최대 3MB 이하의 사진을 업로드해 주세요.</li>
              <li>선정적이거나 불쾌감을 줄 수 있는 이미지의 공유를 금지합니다.</li>
              <li>업로드 후에는 사진 삭제가 어려우니, 파일을 신중히 선택해주세요!</li>
            </ul>
          </div>
        </section>
        <div className="space-x-4 flex justify-end">
          <CancelButton handleClick={handleClose} />
          <ConfirmButton
            handleClick={uploadImage}
            text={!isUploading ? "업로드" : "업로드 중..."}
            disabled={photoUrl === null || isUploading || isOutOfQuota}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhotoUploadModal;
