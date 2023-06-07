import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiViewfinderCircle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const VideoLists = () => {
  const { id } = useParams();
  const [getLists, setGetLists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/api/auth/get-video-collection/${id}`
        );
        const data = response.data;
        console.log(data);
        setGetLists(data?.details);
        // Use the fetched data for the collection
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(getLists);

  const handleImageModel = (image) => {
    setSelectedImage(image);
  };

  return (
    <TopNav routeLink={"/video_gallery"} barTitle={getLists.VideoCollectionName}>
      {/* DISPLAY COLLECTIONS LISTS START*/}
      <div className="  w-full overflow-y-scroll mt-1">
        <div className="grid grid-cols-2 p-2 gap-3 w-full h-fit rounded-xl overflow-hidden">
          {getLists?.videos?.map((x) => (
            <div
              key={x.id}
              className=" flex-wrap relative flex items-center justify-center flex-col"
            >
              <video
                className="border border-gray-200 w-full h-[130px] rounded-sm overflow-hidden cursor-pointer object-contain"
                src={x.url}
                alt={x.name}
                onClick={() => handleImageModel(x)}
              />
              <div className="w-full flex-wrap overflow-hidden flex items-center justify-between">
                <p className="  overflow-hidden text-center text-[11px] p-1 px-2">
                  {x.name}
                </p>
                {/* <p className=" overflow-hidden text-center text-[11px] p-1 px-2">
                  {`${(x.size / (1024 * 1024)).toFixed(2)} mb`}
                </p> */}
              </div>
              <button
                className=" absolute top-1 right-1 "
                onClick={() => handleImageModel(x)}
              >
                <HiViewfinderCircle size={20} className=" text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* DISPLAY COLLECTIONS LISTS END*/}

      {/* Image Popup Model */}
      {selectedImage && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative max-w-3xl max-h-full w-full h-auto">
            <video
              controls
              className="object-contain w-full max-h-[400px]"
              src={selectedImage.url}
              alt={selectedImage.name}
            />
            <button
              className=" active:scale-95 absolute p-1 bg-red-400 text-white rounded-full top-2 right-2  font-medium"
              onClick={() => setSelectedImage(null)}
            >
              <RxCross1 size={12} />
            </button>
          </div>
        </div>
      )}
    </TopNav>
  );
};

export default VideoLists;
