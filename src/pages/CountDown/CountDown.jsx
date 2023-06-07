import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const CountDown = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const storedPath = localStorage.getItem("path");

    axios
      .get(`${API}/api/mergedetails?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
        // console.log(response.data);
        if (
          response.data.mergedData &&
          response.data.mergedData[0] &&
          response.data.mergedData[0].eventDetails
        ) {
          const targetDate = new Date(
            response.data.mergedData[0].eventDetails.date
          );
          startCountdown(targetDate);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const startCountdown = (targetDate) => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const remainingMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    };

    calculateTime();

    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Count Down"}>
      <div className="w-full flex flex-col items-center justify-center p-2 gap-3 overflow-y-scroll mt-10">
        <div className="flex items-center justify-center mt-2">
          <img
            className="w-[90%]"
            src="https://i.postimg.cc/W1Sx56DM/cccc.jpg"
            alt=""
          />
        </div>
        <div className="text-center mt-2 space-y-2">
          <p className="text-[1.3rem] font-medium">The best is yet to come!</p>
          <p className="text-[1rem] text-[#f79489] font-medium">
            {days} Days : {hours} Hours : {minutes} Minutes
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center">
          <Link
            to="/events"
            className="bg-gray-200 text-[1rem] text-[#f79489] p-2 px-7 rounded-3xl active:scale-95"
          >
            Events
          </Link>
        </div>
      </div>
    </TopNav>
  );
};

export default CountDown;
