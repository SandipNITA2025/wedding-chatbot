import React, { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { API } from "../utils/URL";
import { Link } from "react-router-dom";

const TestCompo = ({ details }) => {
  console.log(details);
  if (details) {
    return (
      <div>
        <p>messages</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>date</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>time</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>photos</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>videos</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>options</p>
      </div>
    );
  }
  if (details) {
    return (
      <div>
        <p>textInput</p>
      </div>
    );
  }
};

const BotImage = ({ Imgurl }) => {
  if (!Imgurl) {
    return <div className="imagebox bg-[#f8bb7e]">NO PHOTO AVAILABLE</div>;
  }

  return (
    <div className="imagebox bg-[#f8bb7e]">
      <img className=" bg-[#f8bb7e]" src={Imgurl} alt="wedimg" width="300px" />
    </div>
  );
};
const BotVideo = ({ Imgurl }) => {
  if (!Imgurl) {
    return <div className="imagebox bg-[#f8bb7e]">NO PHOTO AVAILABLE</div>;
  }

  return (
    <div className="imagebox bg-[#f8bb7e]">
      <video
        controls
        className=" bg-[#f8bb7e]"
        src={Imgurl}
        alt="wedimg"
        width="300px"
      />
    </div>
  );
};

// const BotLocation = ({ url, message }) => {
//   return (
//     <div>
//       {message}
//       <iframe src={url} title="location"></iframe>
//     </div>
//   );
// };
const BotLocation = ({ venue }) => {
  return (
    <div className=" flex items-center flex-col">
      <p>{venue}</p>
      <iframe
        title="Google Maps"
        className=" w-[100%] h-[200px]"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${`AIzaSyCqbdL5YFZ01wrU29cN-P-UQrxdBPLLUic&q`}=${encodeURIComponent(
          venue
        )}`}
        allowFullScreen
      ></iframe>
      <div className="mt-4">
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            venue
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white p-2 px-2 bg-[#F53C75] rounded-2xl"
        >
          Follow Map
        </Link>
      </div>
    </div>
  );
};

const Review = ({ steps }) => {
  const { guestName, guestEmail } = steps;

  const handleSubmit = () => {
    const pathID = localStorage.getItem("pathID");
    // console.log(storedPath);

    const storedType = localStorage.getItem("type");
    const formData = {
      guestName: guestName.value,
      guestEmail: guestEmail.value,
      guestStatus: "Yes",
      inviteType: storedType,
      loginId: pathID,
    };

    axios
      .post(`${API}/api/adduser`, formData)
      .then((response) => {
        console.log("User data stored successfully:", response.data);
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
  background: "#F0D7BE",
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
  const [moreVids, setMoreVids] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false); // Track chatbot completion
  const [chatbotOpened, setChatbotOpened] = useState(true);

  useEffect(() => {
    const pathID = localStorage.getItem("pathID");

    axios
      .get(`${API}/api/auth/chatdetails?authId=${pathID}`)
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
  }, []);

  console.log(details);

  useEffect(() => {
    if (details?.mergedData && details.mergedData.length > 0) {
      const messages =
        details.mergedData[0].welcomeDetails[
          details.mergedData[0].welcomeDetails.length - 1
        ].messages;
      // console.log(details.mergedData[0].welcomeDetails.length - 1);
      // console.log(messages);
      setConversation(messages);
      const photos =
        details?.mergedData[3]?.photosVideos[
          details?.mergedData[3]?.photosVideos.length - 1
        ]?.photos;
      setMorePics(photos);
      const videos =
        details?.mergedData[3]?.photosVideos[
          details?.mergedData[3]?.photosVideos.length - 1
        ]?.videos;
      setMoreVids(videos);
    }
  }, [details.mergedData]);

  if (loading) {
    return <div></div>;
  }

  if (details?.mergedData?.length === 0) {
    return <div></div>;
  }

  //URLS START:
  const photoUrl =
    details.mergedData[0].welcomeDetails[
      details.mergedData[0].welcomeDetails.length - 1
    ].photo.url;
  const venue =
    details?.mergedData?.[1]?.venue[details?.mergedData?.[1]?.venue.length - 1]
      ?.venue;
  // const locationUrl =
  //   details?.mergedData?.[1]?.venue[details?.mergedData?.[1]?.venue.length - 1]
  //     ?.location;
  const date =
    details?.mergedData?.[2]?.dateTime[
      details?.mergedData?.[2]?.dateTime.length - 1
    ]?.date || "";
  const time =
    details?.mergedData?.[2]?.dateTime[
      details?.mergedData?.[2]?.dateTime.length - 1
    ]?.time || "";

  // console.log("Photo", photoUrl);
  // console.log("venue", venue);
  // console.log("locationUrl", locationUrl);
  // console.log("date", date);
  // console.log("time", time);

  //URLS END:


  // -------------------------- ChatBot Steps-----------------------------
console.log(details);
  const steps = [
    {
          id: "1",
          message: "Hi, There! 👋",
          component: details ? (
                  <>
                    <TestCompo details={details} />
                  </>
                ) : <div></div>,
          trigger: "2",
        },
  ]
  // const steps = [
  //   {
  //     id: "1",
  //     message: "Hi, There! 👋",
  //     trigger: "2",
  //   },
  //   // dynamic msg
  //   ...(conversation || []).map((msg, index) => ({
  //     id: String(index + 2),
  //     message: msg,
  //     trigger: String(index + 3),
  //   })),

  //   {
  //     id: String(conversation.length + 2),
  //     component: photoUrl ? (
  //       <>
  //         <BotImage Imgurl={photoUrl} />
  //       </>
  //     ) : null,
  //     trigger: "date-details",
  //   },
  //   {
  //     id: "date-details",
  //     options: [{ value: 1, label: "When is the wedding?", trigger: "date" }],
  //   },
  //   {
  //     id: "date",
  //     message: `It's ${date}, ${time}`,
  //     trigger: "location-details",
  //   },
  //   {
  //     id: "location-details",
  //     options: [
  //       { value: 1, label: "Where is the wedding?", trigger: "location" },
  //     ],
  //   },
  //   {
  //     id: "location",
  //     component: <BotLocation venue={venue} />,
  //     trigger: "more-photos",
  //   },
  //   {
  //     id: "more-photos",
  //     options: [
  //       { value: 1, label: "Show photos and Videos!", trigger: "more-pics" },
  //     ],
  //   },
  //   {
  //     id: "more-pics",
  //     component: photoUrl ? (
  //       <div className="image-container">
  //         {morePics.map((pic, index) => (
  //           <BotImage key={index} Imgurl={pic.url} />
  //         ))}
  //         {moreVids.map((pic, index) => (
  //           <BotVideo key={index} Imgurl={pic.url} />
  //         ))}
  //       </div>
  //     ) : null,
  //     trigger: "blessing",
  //   },
  //   {
  //     id: "blessing",
  //     message: "Will you be joining and blessing us?",
  //     trigger: "yesNo",
  //   },
  //   {
  //     id: "yesNo",
  //     options: [
  //       { value: 1, label: "Yeah! How can I miss this.", trigger: "yes" },
  //       { value: 2, label: "Nope. I'm super busy", trigger: "no" },
  //     ],
  //   },
  //   {
  //     id: "no",
  //     message: "Okay! No problem.",
  //   },
  //   {
  //     id: "yes",
  //     message: "Nice! Please provide your name",
  //     trigger: "guestName", //
  //   },
  //   {
  //     id: "guestName",
  //     user: true,
  //     trigger: "next",
  //     validator: (value) => {
  //       if (!value || value.trim() === "") {
  //         return "Please enter your name.";
  //       }
  //       return true;
  //     },
  //     user: true,
  //     trigger: "next",
  //     validator: (value) => {
  //       if (!value || value.trim() === "") {
  //         return "Please enter your name.";
  //       }
  //       return true;
  //     },
  //     user: true,
  //     trigger: "next",
  //   },
  //   {
  //     id: "next",
  //     message: "Hi {previousValue}! What is your email?",
  //     trigger: "guestEmail",
  //   },
  //   {
  //     id: "guestEmail",
  //     user: true,
  //     trigger: "next2",
  //     validator: (value) => {
  //       if (!value || value.trim() === "") {
  //         return "Please enter your email.";
  //       }
  //       return true;
  //     },
  //     user: true,
  //     trigger: "next2",
  //     validator: (value) => {
  //       if (!value || value.trim() === "") {
  //         return "Please enter your email.";
  //       }
  //       return true;
  //     },
  //     user: true,
  //     trigger: "next2",
  //   },
  //   {
  //     id: "next2",
  //     message: "Great! Check out your summary",
  //     trigger: "review",
  //   },
  //   {
  //     id: "review",
  //     component: <Review />,
  //     asMessage: true,
  //     trigger: "update",
  //   },
  //   {
  //     id: "update",
  //     message: "Thanks! Registration Successful. 😀",
  //     end: true,
  //   },
  // ];

  // -------------------------- ChatBot Steps-----------------------------

  // Callback function to handle chatbot completion
  const handleChatbotComplete = (steps, values) => {
    setTimeout(() => {
      setCompleted(true);
    }, 1500);
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="boticon">
      {completed ? (
        <div>
          <p></p>
          {/* Additional content after chatbot completion */}
          <ThemeProvider theme={CHATBOT_THEME}>
            <ChatBot
              steps={steps}
              floating={true}
              botAvatar="https://i.postimg.cc/pXNPHXhp/robot-9706469.png"
              opened={false}
              handleEnd={handleChatbotComplete}
            />
          </ThemeProvider>
        </div>
      ) : (
        <ThemeProvider theme={CHATBOT_THEME}>
          <ChatBot
            steps={steps}
            floating={true}
            opened={true}
            handleEnd={handleChatbotComplete} // Call handleChatbotComplete when chatbot completes
          />
        </ThemeProvider>
      )}
    </div>
  );
};

export default ChatBotHelper;
