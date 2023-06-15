import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/URL";
import TopNav from "../../components/TopNav/TopNav";
import { BiParty } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineDateRange, MdOutlineLocationOn } from "react-icons/md";

const Event = () => {
  const { id } = useParams();
  const [getEvent, setGetEvent] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/api/auth/get-events/${id}`);
      const data = response.data;
      console.log(data.event);
      setGetEvent(data?.event);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
    <TopNav routeLink={"/calender"} barTitle={getEvent.eventName}>
      <div className="w-full flex flex-col items-center justify-center p-2 gap-4 overflow-y-scroll mt-1">
        <div className="relative w-full">
          <div
            className="h-[200px] sm:h-[260px] overflow-hidden rounded-xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.9) 100%), url('https://i.postimg.cc/RVVQ7FKX/photo-1527529482837-4698179dc6ce-1.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div className="absolute bottom-0 flex items-center gap-2 justify-center text-white p-2">
              {/* <BiParty size={24} /> */}
              <h2 className=" text-2xl font-semibold">{getEvent.eventName}</h2>
            </div>
          </div>
        </div>

        <div className=" flex  flex-col items-start w-[95%]">
          {/* <h2 className=" text-2xl font-semibold">{getEvent.eventName}</h2> */}
          <p className="text-[14px] flex items-center gap-1 font-medium">
            <MdOutlineDateRange />
            <span>
              {formatDay(getEvent.eventDate)}, {formatDate(getEvent.eventDate)}
            </span>
          </p>
          <p className="text-[14px] flex items-center gap-1 font-medium">
            <AiOutlineFieldTime />
            <span>
              {formatDay(getEvent.eventDate)}, {getEvent.eventTime}
            </span>
          </p>
          <div className="text-[14px] flex items-start gap-0 font-semibold">
           <div className=" min-w-[20px]">
           <MdOutlineLocationOn/>
           </div>
            <span>{getEvent.eventLocation}</span>
          </div>

          <div className=" mt-3 w-full flex flex-col items-center justify-center m-auto">
            <iframe
              title="Google Maps"
              className=" w-[90%] h-[200px]"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                getEvent.eventLocation
              )}`}
              allowFullScreen
            ></iframe>
            <div className="mt-2">
              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  getEvent.eventLocation
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white p-2 mt-1 rounded-sm px-3 bg-[#F79489]"
              >
                Follow Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </TopNav>
  );
};

export default Event;
