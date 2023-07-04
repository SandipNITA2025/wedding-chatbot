import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { API } from "../utils/URL";
import { Link } from "react-router-dom";

const TestCompo = ({ details }) => {
  if (!details || details?.length === 0) {
    return <div>No details available</div>;
  }

  const detail = details;

  return (
    <div>
      {detail?.messages && (
        <div className=" flex flex-col gap-1">
          {/* <p>Messages:</p> */}
          {detail?.messages?.map((message) => (
            <p
              className=" bg-[#F8BB7E] p-2 px-3 rounded-lg w-fit text-white"
              key={message?._id}
            >
              {message?.text}
            </p>
          ))}
        </div>
      )}

      {detail?.date && (
        <div className="mt-1">
          {/* <p className=" bg-[#F8BB7E] p-2 px-3 rounded-full w-fit text-white">
            Date: {detail?.date}
          </p> */}
        </div>
      )}

      {detail?.time && (
        <div className="mt-1">
          {/* <p className=" bg-[#F8BB7E] p-2 px-3 rounded-full w-fit text-white">
            Time: {detail?.time}
          </p> */}
        </div>
      )}

      {detail?.photos && detail?.photos?.length > 0 && (
        <div className="mt-1 space-y-1 ">
          {/* <p>Photos:</p> */}
          {detail?.photos?.map((photo, index) => (
            <img
              className=" object-cover rounded-md overflow-hidden"
              key={index}
              src={photo?.url}
              alt=""
            />
          ))}
        </div>
      )}

      {detail?.videos && detail?.videos.length > 0 && (
        <div>
          {detail?.videos.map((video, index) => (
            <video key={index} src={video?.url} controls />
          ))}
        </div>
      )}

      {detail.textInput && (
        <div>
          {/* <p>TextInput:</p>
          <p>Order: {detail.textInput.order}</p> */}
        </div>
      )}
    </div>
  );
};

const CHATBOT_THEME = {
  background: "#fff",
  fontFamily: "Roboto",
  headerBgColor: "#F2A559",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#F8BB7E",
  botFontColor: "#fff",
  userBubbleColor: "#f5f6fa",
  userFontColor: "#000",
};

const ChatBotHelper = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("");

  useEffect(() => {
    const pathID = localStorage.getItem("pathID");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/api/auth/chatdetails?authId=${pathID}`
        );
        setDetails(response?.data?.details);
        setOrder(response?.data?.details[0]?.order);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const option = details[0]?.options[0]?.name;
  console.log(option);

  console.log(details);
  console.log(order);
  console.log(details[0]?.options[0]?.order);

  // --------------------------chatbot steps--------------------------------

  const steps = [
    {
      id: String(details[0]?.order),
      component: <TestCompo details={details[0]} />,
      trigger: "forward1",
    },
    {
      id: "forward1",
      options:
        details[0]?.options && details[0]?.options.length !== 0
          ? details[0]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Will you be joining and blessing us?",
                trigger: "show",
              },
            ],
    },
    {
      id: "no",
      message: "Okay! No problem.",
      end: true,
    },

    ...details.slice(1).map((detail, index) => ({
      id: String(detail?.order),
      component: <TestCompo details={detail} />,
      trigger: "forward2",
    })),

    ...details.slice(1)?.map((detail, index) => ({
      id: "forward2",
      options:
        detail?.options && detail?.options.length !== 0
          ? detail?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              end: true,
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    })),

    {
      id: "show",
      message: "Will you be joining and blessing us?",
      trigger: "yesNo",
    },
    {
      id: "yesNo",
      options: [
        { value: 1, label: "Yeah! How can I miss this.", trigger: "yes" },
        { value: 2, label: "Nope. I'm super busy", trigger: "no" },
      ],
    },
    {
      id: "no",
      message: "Okay! No problem.",
    },
    {
      id: "yes",
      message: "Nice! Please provide your name",
      trigger: "guestName",
    },
    {
      id: "guestName",
      user: true,
      trigger: "next",
      validator: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter your name.";
        }
        return true;
      },
      user: true,
      trigger: "next",
      validator: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter your name.";
        }
        return true;
      },
      user: true,
      trigger: "next",
    },
    {
      id: "next",
      message: "Hi {previousValue}! What is your email?",
      trigger: "guestEmail",
    },
    {
      id: "guestEmail",
      user: true,
      trigger: "next2",
      validator: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter your email.";
        }
        return true;
      },
      user: true,
      trigger: "next2",
      validator: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter your email.";
        }
        return true;
      },
      user: true,
      trigger: "next2",
    },
    {
      id: "next2",
      message: "Great! Check out your summary",
      end: true,
    },
  ];
  // --------------------------chatbot steps--------------------------------

  // Generate steps dynamically based on the details array
  const generateSteps = () => {
    const steps = [];

    for (let i = 0; i < details.length; i++) {
      const detail = details[i];

      steps.push({
        id: String(detail.order),
        component: <TestCompo details={detail} />,
        // trigger: i === details.length - 1 ? "next" : String(details[i + 1].order),
        // end:true
      });
    }

    return steps;
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="boticon">
      <ThemeProvider theme={CHATBOT_THEME}>
        <ChatBot steps={steps} floating={true} opened={true} />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotHelper;
