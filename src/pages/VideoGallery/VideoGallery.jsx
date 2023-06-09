import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";
import { BsFillPlayCircleFill } from "react-icons/bs";

const VideoGallery = () => {
  const [imgCollections, setImgCollections] = useState([]);
  const storedType = localStorage.getItem("type");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-video-collection?authId=${storedPath}`
        );
        const data = response.data;

        // Filter data based on inviteType and storedType
        let filteredData = [];
        if (storedType === "general") {
          filteredData = data.details;
        } else {
          filteredData = data.details.filter(
            (collection) => collection.inviteType === storedType
          );
        }

        setImgCollections(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TopNav routeLink={"/"} barTitle={"Video Gallery"}>
      {/* DISPLAY COLLECTIONS START*/}
      <div className="w-full grid grid-cols-2 p-2 gap-3 overflow-y-scroll mt-1">
        {imgCollections?.map((i) => (
          <div
            key={i._id}
            className="relative flex flex-col items-center w-full h-fit rounded-xl overflow-hidden"
          >
            <Link className="" to={`/video_gallery/videos/${i._id}`}>
              <img
                className="w-[140px] h-[140px] rounded-xl overflow-hidden object-cover active:scale-95"
                // src={x.photos[0].url}
                src="https://i.postimg.cc/0jhx5pxW/ajhdgkdc.jpg"
                alt=""
              />
              <div className=" absolute z-[1]  translate-x-[-50%] translate-y-[-50%]  top-[-50%] left-[-50%]">
              <BsFillPlayCircleFill  />
              </div>
            </Link>
            
            <p className="text-center text-[13px] p-1">
              {i.VideoCollectionName}
            </p>
          </div>
        ))}
      </div>
      {/* DISPLAY COLLECTIONS END*/}
    </TopNav>
  );
};

export default VideoGallery;
