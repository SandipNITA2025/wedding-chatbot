import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoMdCheckmarkCircle } from "react-icons/io";
// import { IoMdCheckmarkCircle } from 'react-icons/io5';
import { API } from "../../utils/API";
import TopNav from "../../components/TopNav/TopNav";

const VotePoll = () => {
  const { id } = useParams();
  const [getPoll, setGetPoll] = useState([]);
  const [submit, setSubmit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/api/auth/get-polls/${id}`);
      const data = response.data;
      console.log(data);
      setGetPoll(data?.details);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleVote = async (pollId, optionIndex) => {
    try {
      await axios.put(`${API}/api/auth/polls/${pollId}/vote`, {
        optionIndex,
      });

      setSubmit(true);
      setGetPoll((prevPoll) => {
        const updatedOptions = prevPoll.options.map((option, index) => {
          if (index === optionIndex) {
            return { ...option, count: option.count + 1 };
          }
          return option;
        });

        return {
          ...prevPoll,
          options: updatedOptions,
          submittedOptionIndex: optionIndex,
        };
      });
    } catch (error) {
      setSubmit(false);
      console.error(error);
    }
  };

  console.log(getPoll);

  const getTotalVotes = (poll) => {
    let totalVotes = 0;
    poll.options.forEach((option) => {
      totalVotes += option.count;
    });
    return totalVotes;
  };

  const getOptionPercentage = (option, totalVotes) => {
    if (totalVotes === 0) {
      return 0;
    }
    return Math.floor((option.count / totalVotes) * 100);
  };

  return (
    <TopNav routeLink={"/polls"} barTitle={"Vote Poll"}>
      <div className=" w-full flex justify-center items-center p-2  overflow-y-scroll mt-1">
        <div className=" w-[95%] border p-2 rounded-md">
          <p className=" text-[#F7998E] text-[1.2rem] font-bold mb-3">
            {getPoll?.question}
          </p>

          <div>
            {getPoll.options?.map((option, index) => {
              const totalVotes = getTotalVotes(getPoll);
              const optionPercentage = getOptionPercentage(option, totalVotes);

              return (
                <div
                  key={index}
                  className="flex space-y-4 items-center justify-between"
                >
                  <div className="flex items-center flex-row gap-2">
                    <IoMdCheckmarkCircle
                      size={20}
                      onClick={() => handleVote(getPoll?._id, index)}
                      className={`${
                        submit && getPoll.submittedOptionIndex === index
                          ? "text-green-400 cursor-pointer"
                          : "text-white bg-white border border-gray-400 rounded-full cursor-pointer p-0 w-[1.1rem] h-[1.1rem]"
                      }`}
                    />
                    <p className="text-[#F7998E]">{option.text}</p>
                  </div>
                  <div className=" flex items-center">
                    {/* <span className="text-[#F7998E]">{option.count}</span> */}
                    <span className=" text-sm text-[#F7998E]">
                      {optionPercentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TopNav>
  );
};

export default VotePoll;
