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

const POSTS_PER_PAGE = 100;

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
            // getDownloadURL(imageRef).then((imageUrl) => {
            //   newPhoto.imageUrl = imageUrl;
            // });
            // getMetadata(imageRef).then((metadata) => {
            //   newPhoto.metaData = metadata;
            // });
            return getPhotoData(imageRef);
          })
        );
        console.log(photoList);
        setPhotoList(photoList);
      },
      enabled: false,
      refetchOnWindowFocus: false,
      // cacheTime: 0,
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
