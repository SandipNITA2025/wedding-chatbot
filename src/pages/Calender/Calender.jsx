import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { MdLocationPin } from "react-icons/md";
import axios from "axios";
import { API } from "../../utils/URL";
import { Link } from "react-router-dom";

const Events = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-events?authId=${storedPath}`
        );
        const data = response.data;
        setDetails(data.calendar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(details);

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

  const openGoogleMaps = (loca) => {
    const searchURL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      loca
    )}`;
    window.open(searchURL, "_blank");
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Events Calendar"}>
      <div className="w-full flex flex-col items-center justify-center p-2 gap-4 overflow-y-scroll mt-2">
        {details?.[0]?.events?.map((data, index) => (
          <div
            key={index}
            className="box w-full h-[50px] hover:bg-gray-50  overflow-hidden  flex items-center"
          >
            <div className="left  w-full flex-[2.5] px-2">
              <p className="text-[13px]">{formatDate(data.eventDate)}</p>
              <p className="text-[12px] text-[#F79489]">
                {formatDay(data.eventDate)}, {data.eventTime}
              </p>
              <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-[11px] flex items-center">
                <MdLocationPin size={13} className="text-[#F79489]" />
                <span
                  // to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  //   data.eventLocation
                  // )}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                >
                  {data.eventLocation}
                </span>
              </p>
            </div>
            <div className="right w-full flex-[3]">
              <Link to={`/event/${data._id}`}>
                <button
                  className={`${
                    index % 2 === 0 ? "bg-[#E7B6C7]" : "bg-[#F79489]"
                  } active:scale-95 w-[95%] p-[14px] text-[14px] text-white`}
                >
                  {data.eventName}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </TopNav>
  );
};

export default Events;
