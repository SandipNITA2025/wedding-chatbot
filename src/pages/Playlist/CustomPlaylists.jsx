import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TopNav from "../../components/TopNav/TopNav";
import { API } from "../../utils/URL";
import { BsMusicNote, BsPlayFill } from "react-icons/bs";

const CustomPlaylists = () => {
  const { id } = useParams();
  const [getLists, setGetLists] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/api/auth/suggest_playlist/${id}`
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

  console.log(getLists);
  return (
    <TopNav routeLink={"/playlists"} barTitle={getLists.playlistName}>
      <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
        <div className=" w-full grid gap-1 grid-cols-2">
          {getLists.songs?.map((i) => (
            <Link
              to={i.externalUrl}
              target="_blank"
              className="bg-white px-[6px] py-2 border border-gray-300 cursor-pointer rounded-md flex items-center gap-2 hover:bg-gray-50 active:scale-95"
              key={i?._id}
            >
              <BsMusicNote size={18} className="text-green-500" />
              <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                {i?.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </TopNav>
  );
};

export default CustomPlaylists;
