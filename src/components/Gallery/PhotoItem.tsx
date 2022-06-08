import React, { useState } from "react";
import { HeartIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import PhotoDetailModal from "./PhotoDetailModal";

type PhotoItemProps = {
  index: number;
  author: string;
  imageUrl: string;
  description: string;
};

const initialAnimation = {};

const animationVariant = {
  hidden: {
    opacity: 0,
  },
  visible: (index: number) => ({
    opacity: 1,
    transition: {
      delay: index * 0.15,
    },
  }),
  upScale: {
    scale: 1.02,
  },
};

const PhotoItem = ({ index, author, imageUrl, description }: PhotoItemProps) => {
  const [isPhotoDetailModalOpen, setIsPhotoDetailModalOpen] = useState(false);
  return (
    <>
      <motion.div
        custom={index}
        className="rounded-md bg-white border border-gray-200 border-solid cursor-pointer"
        whileHover="upScale"
        animate="visible"
        initial="hidden"
        variants={animationVariant}
        onClick={() => setIsPhotoDetailModalOpen(true)}
      >
        {/* <p className="py-4 px-4 font-semibold text-gray-600">{author}</p> */}
        <img src={imageUrl} alt={description} />
        {/* <section className="my-3 px-3">
        <HeartIcon className="h-5 w-5 text-gray-500 cursor-pointer hover:text-pink-300 transition-colors" />
      </section> */}
      </motion.div>
      {isPhotoDetailModalOpen && (
        <PhotoDetailModal
          imageUrl={imageUrl}
          handleClose={() => setIsPhotoDetailModalOpen(false)}
        />
      )}
    </>
  );
};

export default PhotoItem;
