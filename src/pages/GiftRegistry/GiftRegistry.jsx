import React, { useState, useEffect } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsClipboard2CheckFill } from "react-icons/bs";
import axios from "axios";
import { API } from "../../utils/URL";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiCircle } from "react-icons/fi";

const GiftRegistry = () => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPath = localStorage.getItem("path");

    axios
      .get(`${API}/api/auth/get-giftlists?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const giftUpdateTrue = (id) => {
    axios
      .put(`${API}/api/auth/giftlists/${id}/gift`, { receivedGift: true })
      .then((response) => {
        const updatedDetails = details.map((item) =>
          item._id === id ? { ...item, receivedGift: true } : item
        );
        setDetails(updatedDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const giftUpdateFalse = (id) => {
    axios
      .put(`${API}/api/auth/giftlists/${id}/gift`, { receivedGift: false })
      .then((response) => {
        const updatedDetails = details.map((item) =>
          item._id === id ? { ...item, receivedGift: false } : item
        );
        setDetails(updatedDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <TopNav routeLink={"/"} barTitle={"Gift Registry"}>
        <div className="w-full flex flex-col items-start justify-center p-2 overflow-y-scroll mt-1">
          <div className="w-[95%] m-auto flex items-center justify-center flex-col">
            <div className="rounded-xl overflow-hidden bg-[#F2A559] relative w-[100%] h-[280px]">
              <img
                className="z-10 object-contain"
                src="https://i.postimg.cc/LXkfVswQ/white-gift-box-with-orange-ribbon-isolated-212889-339-removebg-preview-1.png"
                alt=""
              />
              <div className="absolute w-[100%] h-[280px] top-[50%] translate-y-[-50%]">
                <img
                  className="object-contain"
                  src="https://i.postimg.cc/yxvZwbVF/bgmandala.png"
                  alt=""
                />
              </div>
            </div>
            <p className="text-[#8A553C] font-['Great_Vibes'] text-justify text-[1.2rem] mt-1">
              Your love and support are the most precious gifts we could
              receive. If you would like to give a gift, we have created a
              registry to make it easier for you. Thank you for celebrating with
              us!
            </p>
          </div>

          <div className="w-[95%] m-auto">
            <div className=" w-[25%] sm:w-[90%] mt-5 flex items-start justify-start flex-col">
              <div className="flex items-center justify-center gap-2">
                <BsClipboard2CheckFill size={20} className="text-[#8A553C]" />
                <h2 className="text-[#8A553C]">Our Checklist</h2>
              </div>
              <hr className="w-full h-[2.2px] bg-[#8A553C]" />
              <div className="w-full space-y-3 mt-2">
                {/* options */}
                {details.map((item) => (
                  <div
                    key={item._id}
                    className={`${
                      item.receivedGift ? "bg-[#F2A559]" : "bg-[#F2A5594D]"
                    } w-full rounded-[15px] p-[2px] h-fit pl-4 flex items-center gap-3`}
                  >
                    {item.receivedGift ? (
                      <IoMdCheckmarkCircleOutline
                        className="cursor-pointer"
                        size={20}
                      />
                    ) : (
                      <FiCircle
                        className="cursor-pointer"
                        onClick={() => giftUpdateTrue(item._id)}
                        size={19}
                      />
                    )}

                    <p className="text-[.9rem]">{item.giftName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TopNav>
    </>
  );
};

export default GiftRegistry;
