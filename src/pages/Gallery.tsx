import React from "react";
import PageTitle from "../components/common/PageTitle";
import PhotoList from "../components/Gallery/PhotoList";

type Props = {};

const Gallery = (props: Props) => {
  return (
    <div className="h-5/6">
      <PageTitle title="화전 갤러리" />
      <PhotoList />
    </div>
  );
};

export default Gallery;
