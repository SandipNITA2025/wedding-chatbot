import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FiSettings } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

// import icons png:
import ImageHub from "../../icons/Photo Gallery.png";
import Video from "../../icons/Video.png";
import Calender from "../../icons/calender.png";
import Event from "../../icons/Event.png";
import Playlist from "../../icons/Playlist.png";
import Poll from "../../icons/Poll.png";
import Timer from "../../icons/Timer.png";
import Location from "../../icons/Location.png";
import Gift from "../../icons/Gift.png";
import orangebox from "../../icons/orangebox.png";
import Hati from "../../icons/hati.png";
import brownbox from "../../icons/box.png";
import bgbg from "../../icons/bgbg.png";

const HomeDesk = ({ backgroundImage }) => {
  const iconsData = [
    {
      id: 1,
      image: ImageHub,
      name: "Image Hub",
      bgColor: "#F53C75",
      link: "",
    },
    {
      id: 2,
      image: Video,
      name: "Video Gallery",
      bgColor: "#F2A559",
      link: "",
    },
    {
      id: 3,
      image: Poll,
      name: "Polls",
      bgColor: "#F53C75",
      link: "",
    },
    {
      id: 4,
      image: Calender,
      name: "Calender",
      bgColor: "#F2A559",
      link: "",
    },
    {
      id: 5,
      image: Timer,
      name: "Countdown",
      bgColor: "#8A553C",
      link: "",
    },
    {
      id: 6,
      image: Event,
      name: "Events",
      bgColor: "#F2A559",
      link: "",
    },
    {
      id: 7,
      image: Location,
      name: "Map",
      bgColor: "#8A553C",
      link: "",
    },
    {
      id: 8,
      image: Playlist,
      name: "Playlist",
      bgColor: "#F53C75",
      link: "",
    },
    {
      id: 8,
      image: Gift,
      name: "Gift Registry",
      bgColor: "#F2A559",
      link: "",
    },
  ];

  return (
    <div className=" w-full  h-full flex flex-col items-center sm:min-h-[700px] relative">
      <Navbar />
      {/* UPPER CONTAINER */}
      <div className=" relative  overflow-hidden w-full flex-1 h-[54%] sm:min-h-[40%]  ">
        <img className=" sm:object-left" src={bgbg} alt="" />
        <div className=" sm:hidden absolute  top-[50%] px-10 translate-y-[-50%] w-[530px] flex flex-col gap-1">
          <h2 className=" text-[48px] font-semibold text-white">
            Lörem ipsum onas
          </h2>
          <p className=" text-[14px] text-white">
            Ivera. Prende exoment: gigad för tralig nehahusade. Ivera. Prende
            exoment: gigad för tralig nehahusade. Parasocial platinade och
            tyvaling, suskade,
          </p>
          <button className=" w-fit bg-[#F53C75] text-white text-[14px] rounded-md p-1 px-3">
            Know More
          </button>
        </div>

        {/* Hati */}
        <div className=" min-w-full overflow-hidden  z-10 h-full absolute bottom-0 sm:bottom-[-20px] flex items-start justify-center left-[50%] translate-x-[-50%]">
          <img
            className="w-full  md:w-[75%] sm:w-[70%] xsm:w-[74%] z-10 object-contain"
            src={Hati}
            alt=""
          />
        </div>
      </div>
      {/* LOWER CONTAINER */}
      <div className=" w-full px-10 sm:px-10 sm:py-3 bg-[#F3E1D8]  flex-1 sm:flex-[2] flex   h-full">
        <div className=" w-[70%] sm:w-full  border-black">
          {/* TEXT */}
          <div className="mt-2">
            <h2 className=" sm:hidden text-[36px] text-[#8A553C]">
              Lörem ipsum onas vera rende exoment
            </h2>
            <p className=" sm:hidden text-[14px] text-[#8A553C]">
              Ivera. Prende exoment: gigad för tralig nehahusade. Ivera. Prende
              exoment: gigad för
            </p>
            <h2 className=" hidden sm:block text-[22px] text-[#8A553C]">
              Categories
            </h2>
          </div>
          {/* MENUS */}
          <div className=" mt-4 w-full grid grid-cols-6 place-content-start gap-8 grid-rows-2 sm:grid-cols-3 sm:grid-rows-3 sm:place-items-center">
            {iconsData.map((i) => (
              <div
                className={`w-[71px] rounded-lg p-[4px] overflow-hidden active:scale-95 h-[71px] flex flex-col items-center justify-center  cursor-pointer`}
                style={{
                  background: i.bgColor,
                }}
              >
                <img
                  src={i.image}
                  className=" max-h-[30px] max-w-[30px] object-contain"
                  alt=""
                />
                <p className=" text-[10px] text-white">{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* BOTTOMBAR START */}
      {/* <div className="buttom-nav drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)] absolute bottom-0 h-[60px] bg-white w-full p-2 flex items-center justify-around">
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FiSettings size={20} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <BiMessageDetail size={22} />
            </div>
            <div className=" cursor-pointer text-[#F79489] active:scale-95">
              <FaUser size={20} />
            </div>
          </div> */}
      {/* BOTTOMBAR END */}
    </div>
  );
};

export default HomeDesk;
