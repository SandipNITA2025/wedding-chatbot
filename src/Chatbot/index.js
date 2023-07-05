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
        setDetails(response?.data?.details)
        console.log(response?.data)
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

  // --------------------------chatbot steps manually--------------------------------

  const steps = [
    // --------ORDER 1----------
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
                label: "Show next",
                trigger: "show",
              },
            ],
    },
    {
      id: "no",
      message: "Okay! No problem.",
      end: true,
    },

    // --------ORDER 2----------
    ...details.slice(1).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward2",
    })),

    {
      id: "forward2",
      options:
        details[1]?.options && details[1]?.options.length !== 0
          ? details[1]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 3----------
    ...details.slice(2).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward3",
    })),

    {
      id: "forward3",
      options:
        details[2]?.options && details[2]?.options.length !== 0
          ? details[2]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 4----------
    ...details.slice(3).map((detail, index) => ({
      id: String(details && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward4",
    })),

    {
      id: "forward4",
      options:
        details[3]?.options && details[3]?.options.length !== 0
          ? details[3]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 5----------
    ...details.slice(4).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward5",
    })),

    {
      id: "forward5",
      options:
        details[4]?.options && details[4]?.options.length !== 0
          ? details[4]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 6----------
    ...details.slice(5).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward6",
    })),

    {
      id: "forward6",
      options:
        details[5]?.options && details[5]?.options.length !== 0
          ? details[5]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 7----------
    ...details.slice(6).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward7",
    })),

    {
      id: "forward7",
      options:
        details[6]?.options && details[6]?.options.length !== 0
          ? details[6]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 8----------
    ...details.slice(7).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward8",
    })),

    {
      id: "forward8",
      options:
        details[7]?.options && details[7]?.options.length !== 0
          ? details[7]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 9----------
    ...details.slice(8).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward9",
    })),

    {
      id: "forward9",
      options:
        details[8]?.options && details[8]?.options.length !== 0
          ? details[8]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

    // --------ORDER 10----------
    ...details.slice(9).map((detail, index) => ({
      id: String(details && detail?.order && detail.order),
      component: <TestCompo details={detail} />,
      trigger: "forward10",
    })),

    {
      id: "forward10",
      options:
        details[9]?.options && details[9]?.options.length !== 0
          ? details[9]?.options.map((option, index) => ({
              value: index + 1,
              label: String(option?.name),
              trigger: String(option ? option?.order : ""),
            }))
          : [
              {
                value: 10,
                label: "Show next",
                trigger: "show",
              },
            ],
    },

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
  // --------------------------chatbot steps manually--------------------------------

  // -------------dynamically render chats start------------

  const dynamicCode = [];
  for (let i = 0; i < details.length; i++) {
    const order = i + 1;
    dynamicCode.push(
      ...details.slice(i).map((detail, index) => ({
        id: String(details && detail?.order && detail.order),
        component: <TestCompo details={detail} />,
        trigger: `forward${order}`,
      })),
      {
        id: `forward${order}`,
        options:
          details[i]?.options && details[i]?.options.length !== 0
            ? details[i]?.options.map((option, index) => ({
                value: index + 1,
                label: String(option?.name),
                trigger: String(option ? option?.order : ""),
              }))
            : [
                {
                  value: 10,
                  label: "Proceed to the next",
                  trigger: "show",
                },
              ],
      },
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
        message: "Thank you! Hope you will attend and bless us",
        end: true,
      }
    );
  }

  // -------------dynamically render chats start------------

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="boticon">
      <ThemeProvider theme={CHATBOT_THEME}>
        <ChatBot steps={dynamicCode} floating={true} opened={true} />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotHelper;
