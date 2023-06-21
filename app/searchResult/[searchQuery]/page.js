"use client";

import VideoCard from "@/components/VideoCard";
import Loader from "@/components/Loader";
import { context } from "@/context/context";
import { useContext } from "react";
import LeftNav from "@/components/LeftNav";

const searchResult = () => {
  const { loading } = useContext(context);

  return (
    <div>
      <div className="fixed">
        <LeftNav />
      </div>
      <div className="flex">
        {loading ? (
          <div className="flex justify-center items-center bg-black w-screen h-[calc(100vh-72px)]">
            <Loader />
          </div>
        ) : (
          <VideoCard />
        )}
      </div>
    </div>
  );
};

export default searchResult;
