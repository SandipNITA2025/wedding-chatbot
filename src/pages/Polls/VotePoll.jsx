import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../utils/URL";

import TopNav from "../../components/TopNav/TopNav";
import UseAnimations from "react-useanimations";
import radioButton from "react-useanimations/lib/radioButton";

const VotePoll = () => {
  const { id } = useParams();
  const [getPoll, setGetPoll] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [checked, setChecked] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/api/auth/get-polls/${id}`);
      const data = response.data;
      // console.log(data);
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
        <div className=" bg-[#F0D7BE] w-[95%] border p-2 rounded-md">
          <p className=" text-[#8A553C] text-[1.2rem] font-bold mb-3">
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
                    <UseAnimations
                      onClick={() => {
                        setChecked(!checked);
                        handleVote(getPoll?._id, index);
                      }}
                      size={24}
                      wrapperStyle={{ marginTop: "5px" }}
                      animation={radioButton}
                    />
                    <p className="text-[#8A553C]">{option.text}</p>
                  </div>
                  <div className=" flex items-center">
                    <span className=" text-sm text-[#8A553C]">
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
