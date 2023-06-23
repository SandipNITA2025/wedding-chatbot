import React, { useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { FiSettings } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { BiPoll } from "react-icons/bi";
import { MdOutlineTimer } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RiPlayListLine } from "react-icons/ri";
import { BsPinMap, BsCalendar3Event } from "react-icons/bs";
import {
  AiOutlineCamera,
  AiOutlineVideoCamera,
  AiOutlineGift,
  AiFillHome,
} from "react-icons/ai";

// import icons png:
// import ImageHub from "../../icons/Photo Gallery.png";
// import Video from "../../icons/Video.png";
// import Calender from "../../icons/calender.png";
// import Event from "../../icons/Event.png";
// import Playlist from "../../icons/Playlist.png";
// import Poll from "../../icons/Poll.png";
// import Timer from "../../icons/Timer.png";
// import Location from "../../icons/Location.png";
// import Gift from "../../icons/Gift.png";
// import orangebox from "../../icons/orangebox.png";
// import brownbox from "../../icons/box.png";
import Hati from "../../icons/hati.png";
import bgbg from "../../icons/bgbg.png";

const HomeDesk = ({ backgroundImage }) => {
  const iconsData = [
    {
      id: 1,
      icon: <AiOutlineCamera size={30} className="text-[#fff]" />,
      name: "Image Hub",
      bgColor: "#F53C75",
      link: "/image_hub",
    },
    {
      id: 2,
      icon: <AiOutlineVideoCamera size={30} className="text-[#fff]" />,
      link: "/video_gallery",
      name: "Video Gallery",
      bgColor: "#F2A559",
    },
    {
      id: 3,
      icon: <BiPoll size={30} className="text-[#fff]" />,
      link: "/polls",
      name: "Polls",
      bgColor: "#F53C75",
    },
    {
      id: 4,
      icon: <MdOutlineTimer size={30} className="text-[#fff]" />,
      link: "/count_down",
      name: "Countdown",
      bgColor: "#F2A559",
    },
    {
      id: 5,
      icon: <SlCalender size={26} className="text-[#fff]" />,
      link: "/calender",
      name: "Calendar",
      bgColor: "#8A553C",
    },
    {
      id: 6,
      icon: <BsCalendar3Event size={25} className="text-[#fff]" />,
      link: "/event",
      name: "Events",
      bgColor: "#F2A559",
    },
    {
      id: 7,
      icon: <BsPinMap size={27} className="text-[#fff]" />,
      name: "Map",
      bgColor: "#8A553C",
    },
    {
      id: 8,
      icon: <RiPlayListLine size={28} className="text-[#fff]" />,
      link: "/playlists",
      name: "Playlist",
      bgColor: "#F53C75",
    },

    {
      id: 9,
      icon: <AiOutlineGift size={30} className="text-[#fff]" />,
      link: "/gift_registry",
      name: "Gift Registry",
      bgColor: "#F2A559",
    },
  ];

  const location = useLocation();
  const path = location.pathname.split("/")[4];
  const theme = location.pathname.split("/")[3];
  const type = location.pathname.split("/")[2];

  useEffect(() => {
    localStorage.setItem("path", path);
    localStorage.setItem("theme", theme);
    localStorage.setItem("type", type);
  }, [path, type, theme]);

  return (
    <div className=" w-full  h-full flex flex-col items-center sm:min-h-[700px] relative">
      <Navbar />
      {/* UPPER CONTAINER */}
      <div className=" relative  overflow-hidden w-full flex-1 h-[55%] sm:min-h-[355px]  ">
        <img className=" sm:object-left" src={bgbg} alt="" />
        <div className=" z-20 sm:hidden absolute  top-[50%] px-10 translate-y-[-50%] w-[530px] flex flex-col gap-1">
          <h2 className=" text-[40px] font-semibold text-white">Wedding App</h2>
          <p className=" text-[14px] mt-[-8px] text-white">
            Ivera. Prende exoment: gigad för tralig nehahusade. Ivera. Prende
            exoment: gigad för tralig nehahusade. Parasocial platinade och
            tyvaling, suskade,
          </p>
          <button className=" mt-3 w-fit bg-[#F53C75] text-white text-[14px] rounded-[20px] p-1 px-3">
            Know More
          </button>
        </div>

        {/* Hati */}
        <div className="w-full overflow-hidden  z-10 h-full absolute bottom-0 sm:bottom-[-20px] flex items-start justify-center left-[50%] translate-x-[-50%]">
          <img className="w-full md:w-[85%] object-contain" src={Hati} alt="" />
        </div>
      </div>
      {/* LOWER CONTAINER */}
      <div className=" relative  w-full px-10 sm:px-10 sm:py-3 bg-[#F8F0EC] overflow-hidden flex-1 sm:flex-[2] flex  h-full">
        <div className=" absolute w-full h-[600px] flex items-start justify-start top-0 right-0 mx-auto">
          <div className="flex items-start w-full h-[600px] ">
            <img
              className=" object-contain"
              src="https://i.postimg.cc/zXGCSqJD/bgmandala-1.png"
              alt=""
            />
            <img
              className=" object-contain"
              src="https://i.postimg.cc/zXGCSqJD/bgmandala-1.png"
              alt=""
            />
          </div>
        </div>
        <div className=" bg-transparent z-[2] w-[70%] sm:w-full  border-black">
          {/* TEXT */}
          <div className="mt-2">
            <h2 className=" z-[50] py-2 sm:hidden text-[36px] text-[#8A553C]">
              Lörem ip rende exoment
            </h2>
            <p className=" w-[70%] pb-3 sm:hidden text-[14px] text-[#8A553C]">
              Ivera. Prende exoment: gigad för tralig nehahusade. Ivera. Prende
              exoment: gigad för Ivera. Prende exoment: gigad för tralig
              nehahusade. Ivera. Prende exoment: gigad för
            </p>
            <h2 className=" hidden sm:block text-[22px] text-[#8A553C]">
              Categories
            </h2>
          </div>
          {/* MENUS */}
          <div className=" mt-4 w-full grid grid-cols-5 place-content-start gap-8 grid-rows-2 sm:grid-cols-3 sm:grid-rows-3 sm:place-items-center">
            {iconsData.map((i) => (
              <Link className=" w-fit" to={i.link}>
                <div
                  className={`w-[71px] rounded-lg p-[4px] overflow-hidden active:scale-95 h-[71px] flex flex-col gap-1 items-center justify-center  cursor-pointer`}
                  style={{
                    background: i.bgColor,
                  }}
                >
                  <span className=" text-white">{i.icon}</span>
                  <p className=" text-[10px] text-white">{i.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* BOTTOMBAR START */}
      <div className=" hidden buttom-nav fixed bottom-0 h-[60px] bg-transparent w-full p-2 sm:flex items-center justify-around">
        {/* <div className=" cursor-pointer w-[43px] h-[43px] flex items-center justify-center rounded-full bg-[#F2A559] text-[#8A553C] active:scale-95">
          <AiFillHome size={22} />
        </div> */}
        {/* <div className=" cursor-pointer text-[#F79489] active:scale-95">
          <BiMessageDetail size={22} />
        </div>
        <div className=" cursor-pointer text-[#F79489] active:scale-95">
          <FaUser size={20} />
        </div> */}
      </div>
      {/* BOTTOMBAR END */}
    </div>
  );
};

export default HomeDesk;
