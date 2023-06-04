import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";

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
    <div className="  w-full mx-auto mt-14 ">
      <nav className=" flex items-center justify-between bg-white w-full p-3 shadow-md absolute top-0">
        <Link to="/">
          <MdOutlineArrowBackIosNew size={20} />
        </Link>
        <p>Polls</p>
        <BiSearch size={20} />
      </nav>

      {/* DISPLAY POLLS START*/}
      <div className=" w-full grid grid-cols-2 p-2 gap-3 overflow-y-scroll">
        {getPolls.map((x) => (
          <div
            key={x._id}
            className=" flex flex-col items-center justify-center w-full h-[150px] bg-[#F7998E] rounded-md overflow-hidden p-2"
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
    </div>
  );
};

export default Polls;
