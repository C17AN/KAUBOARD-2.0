import classNames from "classnames";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type NavItemProps = {
  text: string;
  icon: ReactNode;
  targetUrl: string;
  onClick: () => void;
  selected?: boolean;
};

const NavItem = ({ text, icon, targetUrl, onClick, selected = false }: NavItemProps) => {
  return (
    <Link to={`${targetUrl}`} onClick={onClick}>
      <li
        className={classNames(
          "flex items-center gap-2 text-gray-400 p-2 pl-4 rounded-md hover:bg-slate-100 hover:text-gray-500 cursor-pointer transition-colors",
          {
            "bg-slate-200": selected,
            "text-gray-600": selected,
          }
        )}
      >
        <>{icon}</>
        <p className="text-xl font-semibold">{text}</p>
      </li>
    </Link>
  );
};

export default NavItem;
