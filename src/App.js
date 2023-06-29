import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ChatBotHelper from "./Chatbot";
import Loading from "./components/Loading/Loading";
import Event from "./pages/Calender/Event";
import Home from "./pages/Home/Home";
import CountDown from "./pages/CountDown/CountDown";
import Calender from "./pages/Calender/Calender";
import GiftRegistry from "./pages/GiftRegistry/GiftRegistry";
import ImageHub from "./pages/ImgHub/ImageHub";
import ImageLists from "./pages/ImgHub/ImageLists";
import Playlist from "./pages/Playlist/Playlist";
import CustomPlaylists from "./pages/Playlist/CustomPlaylists";
import Polls from "./pages/Polls/Polls";
import VotePoll from "./pages/Polls/VotePoll";
import VideoGallery from "./pages/VideoGallery/VideoGallery";
import VideoLists from "./pages/VideoGallery/VideoLists";

// DESLTOP VIEW PAGES
import HomeDesk from "./desktopPages/HomeDesk/HomeDesk";

//bgData
import { bgData } from "./data";


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedType = localStorage.getItem("type");
  // const theme = localStorage.getItem("theme");
  const theme = location.pathname.split("/")[3];

  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const storedPath = localStorage.getItem("pathID");
    const theme = localStorage.getItem("theme");
    if (location.pathname === "/") {
      navigate(`/file/${storedType}/${theme}/${storedPath}`);
    }
  }, [location.pathname, navigate, storedType, theme, backgroundImage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [backgroundImage]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    changeBackgroundImage(theme);
    // localStorage.setItem("theme", theme);
  }, [theme, backgroundImage]);

  const changeBackgroundImage = (name) => {
    const image = bgData.find((item) => item.name === name);
    if (image) {
      setBackgroundImage(image.url);
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex items-center justify-center w-screen mx-auto h-screen">
        {/* -------------------- DESKTOP VIEW START --------------- */}
        <div className="  relative w-full h-full m-auto bg-transparent">
          <Routes>
            {/* Home */}
            <Route
              path={`/file/close/a/:id`}
              element={<HomeDesk backgroundImage={backgroundImage} />}
            />
            <Route
              path={`/file/general/a/:id`}
              element={<HomeDesk backgroundImage={backgroundImage} />}
            />
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
            {/* Calender */}
            <Route path="/calender" element={<Calender />} />
            {/* Calender */}
            <Route path="/event/:id" element={<Event />} />
            {/* Gift Registry */}
            <Route path="/gift_registry" element={<GiftRegistry />} />
            {/* Playlist */}
            <Route path="/playlists" element={<Playlist />} />
            {/* Playlist */}
            <Route path="/playlists/:id" element={<CustomPlaylists />} />
          </Routes>
        </div>
        {/* -------------------- DESKTOP VIEW END --------------- */}
























        {/* -------------------- MOBILE VIEW START --------------- */}
        <div className="hidden relative w-[330px] h-[560px] items-center justify-center border-gray-200 rounded-md bg-white flex-col shadow-[0_3px_30px_rgba(0,0,0,0.25)] overflow-hidden overflow-y-scroll sm:h-full sm:w-full">
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              {/* close */}
              {/* <Route path={`/file/close/a/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/close/b/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/close/c/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/close/d/:id`} element={<Home />} /> */}
              {/* general */}
              {/* <Route path={`/file/general/a/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/general/b/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/general/c/:id`} element={<Home />} /> */}
              {/* <Route path={`/file/general/d/:id`} element={<Home />} /> */}
              {/* Image Hub */}
              {/* <Route path={`/file/${storedType}/${theme}/image_hub`} element={<ImageHub />} /> */}
              {/* <Route path="/image_hub" element={<ImageHub />} /> */}
              {/* <Route path="/image_hub/images/:id" element={<ImageLists />} /> */}
              {/* Video Gallery */}
              {/* <Route path="/video_gallery" element={<VideoGallery />} />
              <Route
                path="/video_gallery/videos/:id"
                element={<VideoLists />}
              /> */}
              {/* Polls */}
              {/* <Route path="/polls" element={<Polls />} />
              <Route path="/poll/:id" element={<VotePoll />} /> */}
              {/* Count Down */}
              {/* <Route path="/count_down" element={<CountDown />} /> */}
              {/* Calender */}
              {/* <Route path="/calender" element={<Calender />} /> */}
              {/* Calender */}
              {/* <Route path="/event/:id" element={<Event />} /> */}
              {/* Gift Registry */}
              {/* <Route path="/gift_registry" element={<GiftRegistry />} /> */}
              {/* Playlist */}
              {/* <Route path="/playlists" element={<Playlist />} /> */}
              {/* Playlist */}
              {/* <Route path="/playlists/:id" element={<CustomPlaylists />} /> */}
            </Routes>
          )}
        </div>
        {/* -------------------- MOBILE VIEW END --------------- */}





















        <ChatBotHelper />
      </div>
    </Suspense>
  );
};

export default App;
