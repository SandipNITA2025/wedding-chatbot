import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ChatBotHelper from "./Chatbot";
import CountDown from "./pages/CountDown/CountDown";
import Events from "./pages/CountDown/Events";
import Home from "./pages/Home/Home";
import ImageHub from "./pages/ImgHub/ImageHub";
import ImageLists from "./pages/ImgHub/ImageLists";
import Polls from "./pages/Polls/Polls";
import VotePoll from "./pages/Polls/VotePoll";
import VideoGallery from "./pages/VideoGallery/VideoGallery";
import VideoLists from "./pages/VideoGallery/VideoLists";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedType = localStorage.getItem("type");

  React.useEffect(() => {
    const storedPath = localStorage.getItem("path");
    if (location.pathname === "/") {
      navigate(`/file/${storedType}/${storedPath}`);
    }
  }, [location.pathname, navigate]);

  return (
    <div className="relative flex items-center justify-center w-screen mx-auto h-screen">
      <div className="relative w-[330px] h-[540px] items-center justify-center border-gray-200 rounded-md bg-white flex-col shadow-[0_3px_30px_rgba(0,0,0,0.25)] overflow-y-scroll sm:h-full sm:w-full">
        <Routes>
          <Route path={`/file/close/:id`} element={<Home />} />
          <Route path={`/file/general/:id`} element={<Home />} />
          {/* Image Hub */}
          <Route path="/image_hub" element={<ImageHub />} />
          <Route path="/image_hub/images/:id" element={<ImageLists />} />
          {/* Video Gallery */}
          <Route path="/video_gallery" element={<VideoGallery />} />
          <Route path="/video_gallery/videos/:id" element={<VideoLists />} />
          {/* Polls */}
          <Route path="/polls" element={<Polls />} />
          <Route path="/poll/:id" element={<VotePoll />} />
          {/* Count Down */}
          <Route path="/count_down" element={<CountDown />} />
          <Route path="/events" element={<Events />} />
        </Routes>

        <ChatBotHelper />
      </div>
    </div>
  );
};

export default App;
