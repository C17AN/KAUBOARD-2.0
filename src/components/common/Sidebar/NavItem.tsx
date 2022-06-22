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
          "flex items-center p-2 pl-4 rounded-md  cursor-pointer transition-colors",
          {
            "bg-kau-primary/80": selected,
            "text-gray-100": selected,
          },
          {
            "hover:bg-slate-200": !selected,
            "text-gray-400": !selected,
            "hover:text-gray-500": !selected,
          }
        )}
      >
        <>{icon}</>
        <p className="pl-3 text-xl font-semibold">{text}</p>
      </li>
    </Link>
  );
};

export default NavItem;
