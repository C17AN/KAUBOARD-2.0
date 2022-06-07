import React from "react";

type ChannelProps = {
  channelType: string;
};

const Channel = ({ channelType }: ChannelProps) => {
  return <div className="bg-white h-full border-2 border-solid border-gray-300"></div>;
};

export default Channel;
