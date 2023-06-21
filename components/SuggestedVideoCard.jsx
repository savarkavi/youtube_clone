import { BsDot } from "react-icons/bs";
import { useContext, useState } from "react";
import { context } from "@/context/context";
import Link from "next/link";

const SuggestedVideoCard = ({ relatedVideos }) => {
  const [thumbnailSrc, setThumbnailSrc] = useState("");
  const { searchResults, loading } = useContext(context);

  const handleMovingSrc = (idx) => {
    setThumbnailSrc(idx);
  };

  const handleNotMovingSrc = () => {
    setThumbnailSrc("");
  };

  const renderedVideoCard = relatedVideos?.map((result, idx) => {
    if (result?.type === "video") {
      const thumbnails = result?.video?.thumbnails;
      const thumbnailUrl = thumbnails?.[0]?.url || "";
      return (
        <Link key={idx} href={`/videoDetails/${result.video.videoId}`}>
          <div className="rounded-xl mb-8 cursor-pointer">
            <img
              src={thumbnailUrl}
              alt=""
              className="rounded-xl w-[300px] h-[169px]"
              onMouseEnter={() => handleMovingSrc(idx)}
              onMouseLeave={handleNotMovingSrc}
            />
            <div className="flex  mt-3 gap-4">
              <img
                src={`${result.video.author.avatar[0].url}`}
                alt=""
                className="rounded-full w-10 h-10"
              />
              <div className=" w-full group">
                <h2 className="text-white max-w-[250px] truncate text-sm">
                  {result.video.title}
                </h2>
                <div className="absolute bg-[#272626]  text-white hidden group-hover:block px-1">
                  {result.video.title}
                </div>
              </div>
            </div>
            <div className="text-gray-400 ml-[56px] text-sm -mt-4">
              <h3 className="max-w-[250px]">{result.video.author.title}</h3>
              <div className="flex items-center">
                <span>
                  {result.video.stats.views >= 1000000
                    ? `${Math.floor(result.video.stats.views / 1000000)}M views`
                    : result.video.stats.views >= 1000
                    ? `${Math.floor(result.video.stats.views / 1000)}k views`
                    : `${result.video.stats.views} views`}
                </span>
                <BsDot className="text-xl" />
                <span>{result.video.publishedTimeText}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
  });

  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap lg:flex-col justify-center  bg-black p-4">
      {renderedVideoCard}
    </div>
  );
};

export default SuggestedVideoCard;
