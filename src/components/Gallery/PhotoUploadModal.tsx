import React, { ChangeEvent, useState } from "react";
import CancelButton from "../common/Button/CancelButton";
import ConfirmButton from "../common/Button/ConfirmButton";
import imageCompression from "browser-image-compression";
import Modal from "../common/Modal";
import { stringify as uuidStringify } from "uuid";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { ListResult, ref, updateMetadata, uploadBytes, UploadMetadata } from "firebase/storage";
import { storageService } from "../../firebase/Config";
import { useRecoilState } from "recoil";
import { userEmailAtom } from "../../recoil/atom/authentication";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

type PhotoUploadModalProps = {
  handleClose: () => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<ListResult, unknown>>;
};

const compressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 500,
  useWebWorker: true,
};

const PhotoUploadModal = ({ handleClose, refetch }: PhotoUploadModalProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [userEmail] = useRecoilState(userEmailAtom);

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
    const photoRef = ref(storageService, `gallery/${photoFile!.name}`!);
    const metaData = {
      customMetadata: {
        author: userEmail,
      },
    };
    await uploadBytes(photoRef, photoFile as Blob);
    await updateMetadata(photoRef, metaData as any);
    await refetch();
    handleClose();
  };

  return (
    <Modal>
      <div className="bg-white p-6 w-[28rem] rounded-xl">
        <h2 className="text-gray-600 font-bold text-xl mb-4">사진 업로드</h2>
        <section className="flex flex-col items-center">
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
          <div className="mb-5">
            <p className="text-lg font-semibold text-gray-600 mb-2">업로드 주의사항</p>
            <ul className="text-sm list-disc list-inside flex flex-col gap-2 text-gray-600/90">
              <li>최대 3MB 이하의 사진을 업로드해 주세요.</li>
              <li>선정적인 이미지 및 불쾌감을 줄 수 있는 이미지의 공유를 금지합니다.</li>
            </ul>
          </div>
        </section>
        <div className="space-x-4 flex justify-end">
          <CancelButton handleClick={handleClose} />
          <ConfirmButton handleClick={uploadImage} text="업로드" disabled={photoUrl === null} />
        </div>
      </div>
    </Modal>
  );
};

export default PhotoUploadModal;
