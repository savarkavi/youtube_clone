"use client";

import { context } from "@/context/context";
import { useContext } from "react";
import Loader from "@/components/Loader";
import VideoCard from "@/components/VideoCard";
import LeftNav from "@/components/LeftNav";

export default function Home() {
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
}
