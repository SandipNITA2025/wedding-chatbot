import React, { useEffect, useState } from "react";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";

const CountDown = () => {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const storedPath = localStorage.getItem("path");
        // console.log(storedPath);
    
        axios
          .get(`${API}/api/mergedetails?authId=${storedPath}`)
          .then((response) => {
            setDetails(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, []);

      console.log(details);
  return (
    <div className="  w-full mx-auto mt-14 ">
      <nav className=" flex items-center justify-between bg-white w-full p-3 shadow-md absolute top-0">
        <Link to="/">
          <MdOutlineArrowBackIosNew size={20} />
        </Link>
        <p>Count Down</p>
        <BiSearch size={20} />
      </nav>

      {/* COUNTDOWN START*/}
      <div className=" w-full h-full flex-col flex items-center justify-center p-2 gap-3 overflow-y-scroll">
        <div className=" flex items-center justify-center mt-2">
          <img
            className=" w-[90%]"
            src="https://i.postimg.cc/W1Sx56DM/cccc.jpg"
            alt=""
          />
        </div>
        <div className=" text-center mt-2 space-y-2">
          <p className=" text-[1.3rem] font-medium">
            The best is yet to come !
          </p>
          <p className="text-[1.1rem] text-[#f79489] font-medium">
            7 Days : 8 Hours
          </p>
        </div>
        <div className=" mt-3">
          <button className=" bg-gray-200 text-[1rem] text-[#f79489] p-2 px-7 rounded-3xl active:scale-95">
            Events
          </button>
        </div>
      </div>
      {/* COUNTDOWN END*/}
    </div>
  );
};

export default CountDown;
