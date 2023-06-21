"use client";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import Loader from "@/components/Loader";
import { context } from "@/context/context";
import { fetchFromApi } from "@/utils/api";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SuggestedVideoCard from "@/components/SuggestedVideoCard";

const page = () => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { loading } = useContext(context);
  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    fetchFromApi(`video/details/?id=${id}`).then((res) => {
      setVideoDetails(res);
    });
  };

  const fetchRelatedVideos = () => {
    fetchFromApi(`video/related-contents/?id=${id}`).then(({ contents }) => {
      setRelatedVideos(contents);
    });
  };

  console.log(relatedVideos);
  return (
    <div className="flex">
      {loading ? (
        <div className="flex justify-center items-center bg-black w-screen h-[calc(100vh-72px)]">
          <Loader />
        </div>
      ) : (
        <div className="w-[1440px]  p-4 mx-auto lg:flex ">
          <div className="video lg:h-screen lg:fixed">
            <div className="w-[90%] xl:w-[700px] 2xl:w-[1000px]  h-[200px] sm:h-[400px]  2xl:h-[600px]  mx-auto">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width="100%"
                height="100%"
                style={{ backgroundColor: "black" }}
                playing={true}
              />
            </div>
            {videoDetails?.title ? (
              <h3 className="text-white mt-4 ml-2 font-bold max-w-[600px] ">
                {videoDetails?.title}
              </h3>
            ) : (
              ""
            )}
            <div className="flex gap-3 items-center mt-3">
              {videoDetails?.author?.avatar[0]?.url ? (
                <img
                  src={`${videoDetails?.author?.avatar[0]?.url}`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                ""
              )}
              <div className="text-gray-400 text-sm flex flex-col gap-1">
                {videoDetails?.author?.title ? (
                  <span className="text-white font-bold">
                    {videoDetails?.author?.title}
                  </span>
                ) : (
                  ""
                )}
                {videoDetails?.author?.stats?.subscribersText ? (
                  <span>{`${videoDetails?.author?.stats?.subscribersText}`}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:ml-[65%] xl:ml-[70%] 2xl:ml-[80%]">
            <SuggestedVideoCard relatedVideos={relatedVideos} />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
