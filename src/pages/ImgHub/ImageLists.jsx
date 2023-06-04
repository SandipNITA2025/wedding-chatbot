import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiViewfinderCircle } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const ImageLists = () => {
  const { id } = useParams();
  const [getLists, setGetLists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/api/auth/get-collection/${id}`
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
    <TopNav routeLink={'/image_hub'} barTitle={getLists.collectionName}>

      {/* DISPLAY COLLECTIONS LISTS START*/}
      <div className="  w-full overflow-y-scroll mt-14">
        <div className="grid grid-cols-2 p-2 gap-3 w-full h-fit rounded-xl overflow-hidden">
          {getLists?.photos?.map((x) => (
            <div
              key={x.id}
              className=" flex-wrap relative flex items-center justify-center flex-col"
            >
              <img
                className="border border-gray-200 w-full h-[130px] rounded-sm overflow-hidden object-contain"
                src={x.url}
                alt={x.name}
              />
              <div className="w-full flex-wrap overflow-hidden flex items-center justify-between">
                <p className="  overflow-hidden text-center text-[11px] p-1 px-2">
                  {x.name}
                </p>
                <p className=" overflow-hidden text-center text-[11px] p-1 px-2">
                  {`${(x.size / (1024 * 1024)).toFixed(2)} mb`}
                </p>
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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative max-w-3xl max-h-full w-full h-auto">
            <img
              className="object-contain max-w-full max-h-full"
              src={selectedImage.url}
              alt={selectedImage.name}
            />
            <button
              className="absolute top-2 right-2 text-gray-900 font-medium"
              onClick={() => setSelectedImage(null)}
            >
              <RxCross1 size={20} />
            </button>
          </div>
        </div>
      )}
  </TopNav>
  );
};

export default ImageLists;
