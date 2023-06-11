import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsSpotify } from "react-icons/bs";
import { API } from "../../utils/URL";
import axios from "axios";
import { Link } from "react-router-dom";

const Playlist = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-playlists?authId=${storedPath}`
        );
        const data = response.data;
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <TopNav routeLink={"/"} barTitle={"Playlists"}>
      <div className="w-full grid grid-cols-2 place-items-center content-center p-2 gap-3 overflow-y-scroll mt-2">
        {details?.map((i) => (
          <Link
            key={i._id}
            target="_blank"
            to={i.playListUrl}
            className="active:scale-95 cursor-pointer w-[95%] flex items-center gap-3 border border-green-200 rounded-[4px] hover:bg-green-50 p-[.6rem] px-3"
          >
            <BsSpotify size={20} className=" text-green-500" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {i.playListName}
            </span>
          </Link>
        ))}
      </div>
    </TopNav>
  );
};

export default Playlist;
