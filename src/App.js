import React, { useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ChatBotHelper from "./Chatbot";
import Loading from "./components/Loading/Loading";
import Event from "./pages/Calender/Event";
import Home from "./pages/Home/Home";

// Lazy loaded components
const CountDown = lazy(() => import("./pages/CountDown/CountDown"));
const Calender = lazy(() => import("./pages/Calender/Calender"));
const GiftRegistry = lazy(() => import("./pages/GiftRegistry/GiftRegistry"));
const ImageHub = lazy(() => import("./pages/ImgHub/ImageHub"));
const ImageLists = lazy(() => import("./pages/ImgHub/ImageLists"));
const Playlist = lazy(() => import("./pages/Playlist/Playlist"));
const Polls = lazy(() => import("./pages/Polls/Polls"));
const VotePoll = lazy(() => import("./pages/Polls/VotePoll"));
const VideoGallery = lazy(() => import("./pages/VideoGallery/VideoGallery"));
const VideoLists = lazy(() => import("./pages/VideoGallery/VideoLists"));
const CustomPlaylists = lazy(() => import("./pages/Playlist/CustomPlaylists"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedType = localStorage.getItem("type");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPath = localStorage.getItem("path");
    if (location.pathname === "/") {
      navigate(`/file/${storedType}/${storedPath}`);
    }
  }, [location.pathname, navigate, storedType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex items-center justify-center w-screen mx-auto h-screen">
        <div className="relative w-[330px] h-[560px] items-center justify-center border-gray-200 rounded-md bg-white flex-col shadow-[0_3px_30px_rgba(0,0,0,0.25)] overflow-hidden overflow-y-scroll sm:h-full sm:w-full">
          {loading ? (
            <Loading />
          ) : (
            <Routes>
              <Route path={`/file/close/:id`} element={<Home />} />
              <Route path={`/file/general/:id`} element={<Home />} />
              {/* Image Hub */}
              <Route path="/image_hub" element={<ImageHub />} />
              <Route path="/image_hub/images/:id" element={<ImageLists />} />
              {/* Video Gallery */}
              <Route path="/video_gallery" element={<VideoGallery />} />
              <Route
                path="/video_gallery/videos/:id"
                element={<VideoLists />}
              />
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
          )}

          <ChatBotHelper />
        </div>
      </div>
    </Suspense>
  );
};

export default App;
