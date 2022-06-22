import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import PhotoUploadModal from "./PhotoUploadModal";
import Masonry from "@mui/lab/Masonry";
import PhotoItem from "./PhotoItem";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../../recoil/atom/authentication";
import UploadRestrictionModal from "./UploadRestrictionModal";
import { deletePhotoList, getPhotoRefList } from "../../apis/gallery";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { Photo } from "../../types/Photo";

const POSTS_PER_PAGE = 50;

const PhotoList = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadRestrictionModalOpen, setIsUploadRestrictionModalOpen] = useState(true);
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  const [isAuthenticated] = useRecoilState(isAuthenticatedAtom);

  const { data, refetch, isSuccess } = useQuery<Photo[], AxiosError>(
    "photoRefList",
    getPhotoRefList,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const getInitialData = async () => {
    await refetch();
    setPhotoList(data ?? []);
  };

  const updateData = () => {
    setPhotoList(data ?? []);
  };

  useEffect(() => {
    getInitialData();
    deletePhotoList();
  }, []);

  useEffect(() => {
    updateData();
  }, [data]);

  return (
    <>
      <div className="flex justify-end mt-4 mb-6">
        <div className="flex w-full items-center justify-between">
          <ul className="flex flex-col list-disc list-inside space-y-1">
            <li className="text-xs text-gray-400">업로드한 사진은 최대 일주일동안 유지됩니다.</li>
            <li className="text-xs text-gray-400">
              [화전 갤러리] 는 베타 중인 기능으로, 이후 업데이트에서 기능이 추가 & 제거될 수
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
              return (
                <PhotoItem
                  // TODO: key 값 변경하기
                  index={index}
                  key={index}
                  {...photo}
                />
              );
            })}
          </Masonry>
        ) : (
          <div className="flex flex-col items-center justify-center bg-white/70 w-full h-full">
            <h3 className="text-2xl font-semibold text-gray-500 mb-4">
              이런, 이미지가 존재하지 않습니다!
            </h3>
            <div className="text-sm text-gray-400 text-center">
              <p>갤러리에 업로드된 이미지가 없거나, 일시적인 네트워크 문제일 수 있습니다.</p>
              <p>잠시 뒤에 다시 시도해주세요.</p>
            </div>
          </div>
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
