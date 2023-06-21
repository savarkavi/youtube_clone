"use client";

import { categories } from "@/utils/constants";
import { context } from "@/context/context";
import { useContext, useEffect } from "react";
import Link from "next/link";

const LeftNav = () => {
  const { mobileMenu, selectedCategory, setSelectedCategory } =
    useContext(context);

  const handleSelectedCategory = (name) => {
    setSelectedCategory(name);
  };

  const renderedCategories = categories.map((category, idx) => {
    if (category.type === "category" || category.type === "home") {
      return (
        <Link key={idx} href="/">
          <div
            className={`flex gap-4 items-center ${
              selectedCategory === category.name ? "bg-[#303030]" : ""
            } text-white hover:bg-[#303030] cursor-pointer p-3 rounded-xl`}
            onClick={() => handleSelectedCategory(category.name)}
          >
            <div className="text-xl">{category.icon}</div>
            <h3 className="text-sm">{category.name}</h3>
          </div>
        </Link>
      );
    }
  });

  const renderedMenuCategories = categories.map((category, idx) => {
    if (category.type === "menu") {
      return (
        <div
          key={idx}
          className="flex gap-4 items-center text-white hover:bg-[#303030] cursor-pointer p-3 rounded-xl"
        >
          <div className="text-xl">{category.icon}</div>
          <h3 className="text-sm">{category.name}</h3>
        </div>
      );
    }
  });

  return (
    <div
      className={`bg-black px-8 h-[calc(100vh-72px)] gap-1  transition-all duration-200 md:translate-x-0 w-full ${
        mobileMenu ? "-translate-x-[300px] absolute" : "translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-1 border-b py-4">
        {renderedCategories}
      </div>
      <div className=" flex flex-col border-b py-4 ">
        {renderedMenuCategories}
      </div>
    </div>
  );
};

export default LeftNav;
