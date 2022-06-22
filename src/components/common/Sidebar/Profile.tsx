import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <img className="w-10 h-10 rounded-full" src="" alt="" />
      <section>
        <h3 className="mb-1 font-semibold">김찬민</h3>
        <p className="text-gray-500 text-xs whitespace-nowrap">경영학부 17학번</p>
      </section>
    </div>
  );
};

export default Profile;
