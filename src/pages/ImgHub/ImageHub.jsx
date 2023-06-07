import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const ImageHub = () => {
  const [imgCollections, setImgCollections] = useState([]);
  const storedType = localStorage.getItem("type");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-collection?authId=${storedPath}`
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
        console.log(filteredData);
        console.log(storedType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [storedType]);

  return (
    <TopNav routeLink={"/"} barTitle={"Image Hub"}>
      {/* DISPLAY COLLECTIONS START*/}
      <div className="w-full grid grid-cols-2 grid-rows-2 p-2 gap-3 overflow-y-scroll mt-1">
        {imgCollections?.map((x) => (
          <div
            key={x._id}
            className="flex  flex-col items-center w-full h-fit rounded-xl overflow-hidden"
          >
            <Link to={`/image_hub/images/${x._id}`}>
              {/* <img
                className="w-[120px] h-[120px] rounded-xl overflow-hidden object-cover active:scale-95"
                // src={x.photos[0].url}
                src="https://i.postimg.cc/YC900BdS/pngegg.png"
                alt=""
              /> */}
              <div className="border overflow-hidden w-[140px] h-[140px] rounded-[8px] p-1 grid grid-cols-2 grid-rows-2 gap-1">
                <img
                  className=" w-[100%] h-[100%] rounded-sm overflow-hidden object-cover active:scale-95"
                  src={x?.photos[0]?.url}
                  // src="https://i.postimg.cc/YC900BdS/pngegg.png"
                  alt=""
                />
                <img
                  className=" w-[100%] h-[100%] rounded-sm overflow-hidden object-cover active:scale-95"
                  src={
                    x?.photos[1]
                      ? x?.photos[1].url
                      : "https://i.postimg.cc/8PrJmShn/white.jpg"
                  }
                  // src="https://i.postimg.cc/YC900BdS/pngegg.png"
                  alt=""
                />
                <img
                  className=" w-[100%] h-[100%] rounded-sm overflow-hidden object-cover active:scale-95"
                  src={
                    x?.photos[2]
                      ? x?.photos[2].url
                      : "https://i.postimg.cc/8PrJmShn/white.jpg"
                  }
                  // src="https://i.postimg.cc/YC900BdS/pngegg.png"
                  alt=""
                />
                <img
                  className=" w-[100%] h-[100%] rounded-sm overflow-hidden object-cover active:scale-95"
                  src={
                    x?.photos[3]
                      ? x?.photos[3].url
                      : "https://i.postimg.cc/8PrJmShn/white.jpg"
                  }
                  // src="https://i.postimg.cc/YC900BdS/pngegg.png"
                  alt=""
                />
              </div>
            </Link>
            <p className="text-center text-[13px] p-1">{x.collectionName}</p>
          </div>
        ))}
      </div>
      {/* DISPLAY COLLECTIONS END*/}
    </TopNav>
  );
};

export default ImageHub;
