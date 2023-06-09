import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";
import { BsFillPlayCircleFill } from "react-icons/bs";

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
        // console.log(data);
        setGetLists(data?.details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleImageModel = (image) => {
    setSelectedImage(image);
  };

  return (
    <TopNav
      routeLink={"/video_gallery"}
      barTitle={getLists.VideoCollectionName}
    >
      {/* DISPLAY COLLECTIONS LISTS START*/}
      <div className="  w-full overflow-y-scroll mt-1">
        <div className="grid grid-cols-6 sm:grid-cols-2 p-2 gap-3 w-full h-fit rounded-xl overflow-hidden">
          {getLists?.videos?.map((x) => (
            <div
              key={x._id}
              className=" flex-wrap relative flex items-center justify-center flex-col"
            >
              <video
                className="border border-gray-300 w-full h-[130px] rounded-sm overflow-hidden cursor-pointer object-contain"
                src={x.url}
                alt={x.name}
                onClick={() => handleImageModel(x)}
              />
              <div className="w-full flex-wrap overflow-hidden flex items-center justify-between">
                <p className="  overflow-hidden text-ellipsis whitespace-nowrap text-center text-[11px] p-1 px-2">
                  {x.name}
                </p>
              </div>
              <button
                className=" absolute  flex items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] right-1 "
                onClick={() => handleImageModel(x)}
              >
                <BsFillPlayCircleFill size={30} className=" text-red-400" />
              </button>
            </div>
          ))}
        </div>
        {/* Image Popup Model */}
        {selectedImage && (
          <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full  rounded-md flex items-center justify-center bg-black bg-opacity-60">
            <div className="relative max-w-3xl max-h-full w-full h-auto">
              <video
                controls
                className="object-contain w-full max-h-[370px]"
                src={selectedImage.url}
                alt={selectedImage.name}
              />
              <button
                className=" active:scale-95 absolute p-1 bg-red-400 text-white rounded-full -top-7 right-2  font-medium"
                onClick={() => setSelectedImage(null)}
              >
                <RxCross1 size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* DISPLAY COLLECTIONS LISTS END*/}
    </TopNav>
  );
};

export default VideoLists;
