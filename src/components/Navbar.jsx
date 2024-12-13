import React from "react";
import { ReactComponent as RightArrowIcon } from "../assets/icons/right-arrow.svg";
import { ReactComponent as MenuBars } from "../assets/icons/menu-bars.svg";
import { navCategories } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="w-screen lg:w-full absolute z-10 overflow-hidden">
      <nav className="bg-white lg:mx-5 lg:mt-5 py-4 lg:py-[2.1rem] px-5 lg:px-8 flex items-center justify-between">
        <div className="hidden lg:flex justify-evenly gap-4">
          {
            navCategories.map((category,index)=>(
              <a key={index} className="text-[0.9rem] font-[350]">{category.categoryName}</a>
            ))
          }
        </div>

        <button className="flex items-center gap-3.5 py-0.5 px-3 pl-4 bg-contactsBg text-contactsText border border-contactsText">
          <h2 className="text-[1rem] font-[350]">Contact us</h2>
          <div>
            <RightArrowIcon width="20" height="16" fill="#221F20" />
          </div>
        </button>

        <button className="lg:hidden bg-[#F9F4EE] px-2.5 py-3">
          <MenuBars width="25" height="16" fill="#221F20" />
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
