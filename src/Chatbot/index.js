import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { API } from "../utils/URL";

const BotImage = ({ Imgurl }) => {
  if (!Imgurl) {
    return <div className="imagebox">NO PHOTO AVAILABLE</div>;
  }

  return (
    <div className="imagebox">
      <img src={Imgurl} alt="wedimg" width="300px" />
    </div>
  );
};

const BotLocation = ({ url, message }) => {
  return (
    <div>
      {message}
      <iframe src={url} title="location"></iframe>
    </div>
  );
};

const Review = ({ steps }) => {
  const { guestName, guestEmail } = steps;

  const handleSubmit = () => {
    const storedPath = localStorage.getItem("path");
    const storedType = localStorage.getItem("type");
    const formData = {
      loginId: storedPath,
      guestName: guestName.value,
      guestEmail: guestEmail.value,
      guestStatus: "Yes",
      inviteType: storedType,
    };

    axios
      .post(`${API}/api/adduser`, formData)
      .then((response) => {
        // console.log("User data stored successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (guestEmail.value) {
      handleSubmit();
    }
  }, [guestEmail.value]);

  return (
    <div style={{ width: "100%" }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name : </td>
            <td>{guestName.value}</td>
          </tr>
          <tr>
            <td>Email : </td>
            <td>{guestEmail.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const CHATBOT_THEME = {
  background: "#FFFEFC",
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
  const [conversation, setConversation] = useState([]);
  const [morePics, setMorePics] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPath = localStorage.getItem("path");

    axios
      .get(`${API}/api/mergedetails?authId=${storedPath}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (details?.mergedData && details.mergedData.length > 0) {
      const messages = details?.mergedData[0]?.messages;
      setConversation(messages);
      const photos = details?.mergedData[0]?.eventDetails?.photos;
      setMorePics(photos);
    }
  }, [details.mergedData]);

  if (loading) {
    return <div></div>;
  }

  if (details?.mergedData?.length === 0) {
    return <div></div>;
  }

  //URLS START:
  const photoUrl = details?.mergedData && details.mergedData[0]?.photo?.url;

  const venue = details?.mergedData?.[0]?.eventDetails?.venue || "";
  const locationUrl = details?.mergedData?.[0]?.eventDetails?.location || "";
  const date = details?.mergedData?.[0]?.eventDetails?.date || "";
  const time = details?.mergedData?.[0]?.eventDetails?.time || "";

  //URLS END:

  const steps = [
    {
      id: "1",
      message: "Hi, There! 👋",
      trigger: "2",
    },
    // dynamic msg
    ...(conversation || []).map((msg, index) => ({
      id: String(index + 2),
      message: msg,
      trigger: String(index + 3),
    })),

    {
      id: String(conversation.length + 2),
      component: photoUrl ? (
        <>
          <BotImage Imgurl={photoUrl} />
        </>
      ) : null,
      trigger: "date-details",
    },
    {
      id: "date-details",
      options: [{ value: 1, label: "When is the wedding?", trigger: "date" }],
    },
    {
      id: "date",
      message: `It's ${date}, ${time}`,
      trigger: "location-details",
    },
    {
      id: "location-details",
      options: [
        { value: 1, label: "Where is the wedding?", trigger: "location" },
      ],
    },
    {
      id: "location",
      component: <BotLocation message={venue} url={locationUrl} />,
      trigger: "more-photos",
    },
    {
      id: "more-photos",
      options: [
        { value: 1, label: "Show me more photos!", trigger: "more-pics" },
      ],
    },
    {
      id: "more-pics",
      component: photoUrl ? (
        <div className="image-container">
          {morePics.map((pic, index) => (
            <BotImage key={index} Imgurl={pic.url} />
          ))}
        </div>
      ) : null,
      trigger: "blessing",
    },
    {
      id: "blessing",
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
      trigger: "guestName", //
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
      trigger: "review",
    },
    {
      id: "review",
      component: <Review />,
      asMessage: true,
      trigger: "update",
    },
    {
      id: "update",
      message: "Thanks! Registration Successful. 😀",
      end: true,
    },
  ];

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
