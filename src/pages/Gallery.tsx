import React from "react";
import PhotoList from "../components/Gallery/PhotoList";

type Props = {};

const Gallery = (props: Props) => {
  return (
    <div>
      <section className="flex items-end justify-between">
        <h2 className="text-4xl font-bold">화전 갤러리</h2>
      </section>
      <PhotoList />
    </div>
  );
};

export default Gallery;
