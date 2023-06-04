import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiViewfinderCircle } from "react-icons/hi2";
import { IoMdCheckmarkCircle } from "react-icons/io";
// import { IoMdCheckmarkCircle } from 'react-icons/io5';
import { API } from "../../utils/API";

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
    <div className="  w-full mx-auto mt-14 ">
      <nav className=" flex items-center justify-between bg-white w-full p-3 shadow-md absolute top-0">
        <Link to="/polls">
          <MdOutlineArrowBackIosNew size={20} />
        </Link>
        <p>Vote Poll</p>
        <BiSearch size={20} />
      </nav>

      <div className=" w-full flex justify-center items-center p-2  overflow-y-scroll">
        <div className=" w-[95%] border p-2 rounded-md">
          <p className=" text-[#F7998E] text-[1.1rem] font-bold mb-1">
            {getPoll?.question}
          </p>

          <div>
            {getPoll.options?.map((option, index) => {
              const totalVotes = getTotalVotes(getPoll);
              const optionPercentage = getOptionPercentage(option, totalVotes);

              return (
                <div
                  key={index}
                  className="flex space-y-3 items-center justify-between"
                >
                  <div className="flex items-center flex-row gap-2">
                    <IoMdCheckmarkCircle
                      onClick={() => handleVote(getPoll?._id, index)}
                      className={`${
                        submit && getPoll.submittedOptionIndex === index
                          ? "text-green-400 cursor-pointer"
                          : "text-gray-300 cursor-pointer"
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
    </div>
  );
};

export default VotePoll;
