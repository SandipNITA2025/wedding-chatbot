import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const TopNav = ({ children, routeLink, barTitle }) => {
  return (
    <div className="relative w-full h-full m-auto">
      <nav className="flex items-center justify-between bg-white w-full p-3 shadow-md sticky top-0 z-[5] sm:p-[13px] ">
        <Link to={routeLink}>
          <MdOutlineArrowBackIosNew size={20} />
        </Link>
        <p className=" text-[1.1rem]">{barTitle}</p>
        <BiSearch size={20} />
      </nav>
      {children}
    </div>
  );
};

export default TopNav;
