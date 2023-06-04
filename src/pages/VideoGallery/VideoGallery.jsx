import React, { useEffect, useState } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";

const VideoGallery = () => {
  const [vidCollections, setvidCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-video-collection?authId=${storedPath}`
        );
        const data = response.data;
        setvidCollections(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="  w-full mx-auto mt-14 ">
      <nav className=" flex items-center justify-between bg-white w-full p-3 shadow-md absolute top-0">
        <Link to="/">
          <MdOutlineArrowBackIosNew size={20} />
        </Link>
        <p>Video Gallery</p>
        <BiSearch size={20} />
      </nav>

      {/* DISPLAY COLLECTIONS START*/}
      <div className=" w-full grid grid-cols-2 p-2 gap-3 overflow-y-scroll">
        {vidCollections?.details?.map((x) => (
          <div
            key={x._id}
            className=" flex flex-col items-center w-full h-fit rounded-xl overflow-hidden"
          >
            <Link to={`/video_gallery/videos/${x._id}`}>
              <img
                className="  w-[140px] h-[140px] rounded-xl overflow-hidden object-cover active:scale-95"
                //   src={x.photos[0].url}
                src="https://i.postimg.cc/0jhx5pxW/ajhdgkdc.jpg"
                alt=""
              />
            </Link>
            <p className=" text-center text-[13px] p-1">
              {x.VideoCollectionName}
            </p>
          </div>
        ))}
      </div>
      {/* DISPLAY COLLECTIONS END*/}
    </div>
  );
};

export default VideoGallery;
