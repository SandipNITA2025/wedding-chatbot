import React from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsClipboard2CheckFill } from "react-icons/bs";
import axios from "axios";
import { API } from "../../utils/API";
import { useState } from "react";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiCircle } from "react-icons/fi";

const GiftRegistry = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedPath = localStorage.getItem("path");


    axios
      .get(`${API}/api/auth/get-giftlists?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [details]);

  const giftUpdateTrue = (id) => {

      axios
        .put(`${API}/api/auth/giftlists/${id}/gift`, { receivedGift: true })
        .then((response) => {
          // Retrieve receivedGift from details state
          const updatedDetails = details.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                receivedGift: true,
              };
            }
            return item;
          });
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
          // Retrieve receivedGift from details state
          const updatedDetails = details.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                receivedGift: false,
              };
            }
            return item;
          });
          setDetails(updatedDetails);

        })
        .catch((error) => {

          console.error("Error:", error);
        });

  };


  return (
    <TopNav routeLink={"/"} barTitle={"Gift Registry"}>
      <div className="w-full flex flex-col items-center justify-center p-2  overflow-y-scroll mt-1">
        <div className=" w-[90%] m-auto flex items-center justify-center flex-col">
          <div className=" w-[100%] h-[150px] ">
            <img
              className=" object-contain "
              src="https://i.postimg.cc/wvF6RFH5/Gift-box-on-transparent-background-PNG.png"
              alt=""
            />
          </div>
          <p className=" font-['Great_Vibes'] text-justify text-[1.2rem] mt-1">
            Your love and support are the most precious gifts we could receive.
            If you would like to give a gift, we have created a registry to make
            it easier for you. Thank you for celebrating with us!{" "}
          </p>
        </div>

        <div className="w-[90%] mt-5 flex items-start flex-col">
          <div className=" flex items-center justify-center gap-2">
            <BsClipboard2CheckFill size={20} className=" text-[#F79489]" />
            <h2>Our Checklist</h2>
          </div>
          <hr className=" w-full h-1 bg-white" />
          <div className="w-full space-y-2 mt-2">
            {/* options */}
            {details.map((i, ind) => (
              <div
                key={ind}
                className="w-full h-fit pl-4 flex items-center gap-3"
              >
                {i?.receivedGift ? (
                  <IoMdCheckmarkCircleOutline className=" cursor-pointer" onClick={() => giftUpdateFalse(i._id)}  size={20} />
                ) : (
                  <FiCircle className=" cursor-pointer" onClick={() => giftUpdateTrue(i._id)} size={19} />
                )}

                <p className=" text-[.9rem]">{i.giftName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TopNav>
  );
};

export default GiftRegistry;
