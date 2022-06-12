import classNames from "classnames";
import { useState } from "react";

export type TabItem = {
  name: string;
  value: any;
};

type TabProps = {
  itemList: TabItem[];
  handleClick: (value: any) => void;
};

const STARTING_TYPE = 0;

const Tab = ({ itemList, handleClick }: TabProps) => {
  const [selectedItem, setSelectedItem] = useState(STARTING_TYPE);

  const toggleTab = (value: any, index: any) => {
    setSelectedItem(index);
    handleClick(value);
  };

  return (
    <div className="flex space-x-4 w-full bg-gray-300/30 bg-opacity-20 rounded-lg p-1 my-2">
      {itemList.map((item, index) => {
        const { name, value } = item;
        return (
          <div
            key={name}
            className={classNames(
              "w-full text-center rounded-lg py-1 text-base font-semibold transition-colors cursor-pointer",
              selectedItem === index
                ? "bg-kau-primary/70 text-white shadow"
                : "text-gray-600 hover:bg-white hover:bg-kau-primary/10"
            )}
            onClick={() => toggleTab(value, index)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
