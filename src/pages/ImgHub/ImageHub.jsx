import React, { useEffect, useState } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const ImageHub = () => {
  const [imgCollections, setImgCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-collection?authId=${storedPath}`
        );
        const data = response.data;
        setImgCollections(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <TopNav routeLink={'/'} barTitle={"Image Hub"}>

      {/* DISPLAY COLLECTIONS START*/}
      <div className=" w-full grid grid-cols-2 p-2 gap-3 overflow-y-scroll mt-14">
        {imgCollections?.details?.map((x) => (
          <div
            key={x._id}
            className=" flex flex-col items-center w-full h-fit rounded-xl overflow-hidden"
          >
            <Link to={`/image_hub/images/${x._id}`}>
              <img
                className="  w-[140px] h-[140px] rounded-xl overflow-hidden object-cover active:scale-95"
                //   src={x.photos[0].url}
                src="https://i.postimg.cc/0jhx5pxW/ajhdgkdc.jpg"
                alt=""
              />
            </Link>
            <p className=" text-center text-[13px] p-1">{x.collectionName}</p>
          </div>
        ))}
      </div>
      {/* DISPLAY COLLECTIONS END*/}
      </TopNav>
  );
};

export default ImageHub;
