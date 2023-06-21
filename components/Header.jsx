"use client";

import { FaBars } from "react-icons/fa";
import { AiOutlineSearch, AiOutlineClose, AiOutlineBell } from "react-icons/ai";
import { BiVideoPlus } from "react-icons/bi";

import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { context } from "@/context/context";
import Loader from "./Loader";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const {
    loading,
    mobileMenu,
    setMobileMenu,
    selectedCategory,
    setSelectedCategory,
  } = useContext(context);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (searchQuery === "") return;
    router.push(`searchResult/${searchQuery}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMobileToggle = () => {
    setMobileMenu((prev) => !prev);
  };

  const handleSelectedCategory = () => {
    setSelectedCategory("New");
  };

  return (
    <header className="p-4 bg-black sticky top-0 z-99">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center cursor-pointer">
          <div
            className="w-10 h-10 rounded-full hover:bg-[#303030] flex justify-center items-center md:hidden"
            onClick={handleMobileToggle}
          >
            {mobileMenu ? (
              <FaBars className="text-white text-xl " />
            ) : (
              <AiOutlineClose className="text-white text-xl " />
            )}
          </div>
          <Link href="/">
            <Image
              src="/images/yt-logo-mobile.png"
              alt="logo"
              width={30}
              height={15}
              className="md:hidden"
              onClick={handleSelectedCategory}
            />
            <Image
              src="/images/yt-logo.png"
              alt="logo"
              width={100}
              height={50}
              className="hidden md:block"
              onClick={handleSelectedCategory}
            />
          </Link>
        </div>
        <form className="relative" onSubmit={handleSumbit}>
          <input
            type="text"
            className="rounded-full bg-transparent border border-[#303030] outline-none px-4 py-1 text-white w-[200px] sm:w-[300px] lg:w-[500px]"
            onChange={handleSearch}
            value={searchQuery}
          />
          <button className="bg-[#303030] px-4 h-[34px] rounded-r-full absolute top-0 right-0 ">
            <AiOutlineSearch className="text-white" />
          </button>
        </form>
        <div className="flex items-center gap-4">
          <div className="md:flex gap-4 hidden ">
            <div className="w-10 h-10 rounded-full hover:bg-[#303030] flex justify-center items-center">
              <BiVideoPlus className="text-white text-2xl" />
            </div>
            <div className="w-10 h-10 rounded-full hover:bg-[#303030] flex justify-center items-center">
              <AiOutlineBell className="text-white text-2xl" />
            </div>
          </div>
          <img
            src="/images/profile.png"
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
