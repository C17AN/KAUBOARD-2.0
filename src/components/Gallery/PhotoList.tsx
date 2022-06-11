import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import PhotoUploadModal from "./PhotoUploadModal";
import Masonry from "@mui/lab/Masonry";
import { getDownloadURL, getMetadata, getStorage, list, ref } from "firebase/storage";
import { storageService } from "../../firebase/Config";
import { uploadBytes, UploadMetadata, listAll } from "firebase/storage";
import PhotoItem from "./PhotoItem";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../../recoil/atom/authentication";
import UploadRestrictionModal from "./UploadRestrictionModal";
import getGalleryPhotoList from "../../apis/gallery";
import { useQuery } from "react-query";

const POSTS_PER_PAGE = 50;

type Photo = {
  imageUrl: string;
  metaData: any;
};

const PhotoList = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadRestrictionModalOpen, setIsUploadRestrictionModalOpen] = useState(true);
  const [photoList, setPhotoList] = useState<any[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);

  const getPhotoData = (imageRef) => {
    return new Promise(async (resolve, reject) => {
      getDownloadURL(imageRef).then((imageUrl) => {
        getMetadata(imageRef).then((metadata) => {
          resolve({ imageUrl, metadata });
        });
      });
    });
  };

  const { data, refetch, isSuccess } = useQuery(
    "photoList",
    () => getGalleryPhotoList(POSTS_PER_PAGE),
    {
      async onSuccess(data) {
        const photoList = await Promise.all(
          data.items.map((imageRef) => {
            return getPhotoData(imageRef);
          })
        );
        setPhotoList(photoList);
      },
      // enabled: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 1000 * 60,
    }
  );

  const getInitialData = async () => {
    const result = await refetch();
    return result;
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
      <div className="flex justify-end mt-4 mb-6">
        <div className="flex w-full items-center justify-between">
          <ul className="flex flex-col list-disc list-inside space-y-1">
            <li className="text-xs text-gray-400">최근 업로드된 50장의 사진이 보여집니다.</li>
            <li className="text-xs text-gray-400">
              [화전 갤러리] 는 베타 중인 기능으로, 이후 업데이트에서 기능이 추가되거나 제거될 수
              있습니다.
            </li>
          </ul>
          {isAuthenticated && (
            <button
              className="bg-kau-primary bg-opacity-60 text-gray-50 hover:text-gray-50 hover:bg-kau-primary hover:bg-opacity-80 transition-all font-semibold shadow py-2 px-4 rounded-md text-sm"
              onClick={() => {
                setIsUploadModalOpen(true);
              }}
            >
              새 이미지 업로드
            </button>
          )}
        </div>
      </div>
      <div className="overflow-y-auto h-full pt-2">
        {isSuccess ? (
          <Masonry columns={4} spacing={2}>
            {photoList?.map((photo, index) => {
              const { imageUrl, metadata } = photo;
              return (
                <PhotoItem
                  // TODO: key 값 변경하기
                  index={index}
                  key={index}
                  author="17학번 재학생"
                  description="하하"
                  imageUrl={imageUrl}
                />
              );
            })}
          </Masonry>
        ) : (
          <div>로딩 중...</div>
        )}
      </div>
      {isUploadModalOpen && (
        <PhotoUploadModal handleClose={() => setIsUploadModalOpen(false)} refetch={refetch} />
      )}
      {!isAuthenticated && isUploadRestrictionModalOpen && (
        <UploadRestrictionModal handleClose={() => setIsUploadRestrictionModalOpen(false)} />
      )}
    </>
  );
};

export default PhotoList;
