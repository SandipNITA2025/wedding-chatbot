import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import { API } from "./../../utils/API";

const Events = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-events?authId=${storedPath}`
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

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Events Calendar"}>
      <div className="w-full flex flex-col items-center justify-center p-2 gap-4 overflow-y-scroll mt-2">
        {/* <input type="time" name="" id="" /> */}
        {details?.events?.map((data, index) => (
          <div
            key={index}
            className="box w-full min-h-[50px]  flex items-center"
          >
            <div className="left w-full flex-[2.5] px-2">
              <p className="text-[13px]">{formatDate(data.eventDate)}</p>
              <p className="text-[12px] text-[#F79489]">
                {formatDay(data.eventDate)}, {data.eventTime}
              </p>
              <p className="text-[10px] flex items-center ">
                <MdLocationPin className="text-[#F79489]" />
                <span>{data.eventLocation}</span>
              </p>
            </div>
            <div className="right w-full flex-[3]">
              <button
                className={`${
                  index % 2 === 0 ? "bg-[#E7B6C7]" : "bg-[#F79489]"
                } active:scale-95 w-[95%] p-[13px] text-[14px] text-white`}
              >
                {data.eventName}
              </button>
            </div>
          </div>
        ))}
      </div>
    </TopNav>
  );
};

export default Events;