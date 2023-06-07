import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const Polls = () => {
  const [getPolls, setGetPolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-polls?authId=${storedPath}`
        );
        const data = response.data;
        setGetPolls(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getTotalVotes = (poll) => {
    let totalVotes = 0;
    poll.options.forEach((option) => {
      totalVotes += option.count;
    });
    return totalVotes;
  };
  

  return (
    <TopNav routeLink={'/'} barTitle={"Polls"}>

      {/* DISPLAY POLLS START*/}
      <div className=" w-full grid grid-cols-2 grid-rows-2 p-2 gap-3 overflow-y-scroll mt-1">
        {getPolls.map((x) => (
          <div
            key={x._id}
            className=" flex flex-col items-center justify-center w-full min-h-[150px] bg-[#F7998E] rounded-md overflow-hidden p-2"
          >
            <p className="text-white text-[.9rem]">{x.question}</p>
            <div className=" flex items-center flex-col mt-1">
              <p className="flex items-center gap-1 p-1 text-sm text-gray-700">
                <AiFillLike size={16} className=" text-white" />
                <span className=" text-sm text-gray-700" >{getTotalVotes(x)} Votes</span>
              </p>
              <Link
                to={`/poll/${x._id}`}
                className=" active:scale-95 flex items-start text-sm font-semibold bg-white text-[#F7998E] py-[2px] px-2 rounded-full"
              >
                Vote Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* DISPLAY POLLS END*/}
      </TopNav>
  );
};

export default Polls;
