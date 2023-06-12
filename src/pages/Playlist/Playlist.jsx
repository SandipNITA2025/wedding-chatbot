import React, { useEffect, useState } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { BsSpotify } from "react-icons/bs";
import { API } from "../../utils/URL";
import axios from "axios";
import { Link } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

const Playlist = () => {
  const [details, setDetails] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPath = localStorage.getItem("path");
        const response = await axios.get(
          `${API}/api/auth/get-playlists?authId=${storedPath}`
        );
        const data = response.data;
        setDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchSpotify = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=playlist&limit=50`;
    const clientId = "11fd30880b5f44f8bde303ac14349ed8";
    const clientSecret = "23dd884fab5942d9828577dde559c984";

    const auth = btoa(`${clientId}:${clientSecret}`);
    const headers = {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: headers,
        }
      )
      .then((response) => {
        const accessToken = response.data.access_token;

        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            setResults(response.data.playlists.items);
            console.log(response.data.playlists.items);
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
      })
      .catch((error) => {
        console.error("Error obtaining access token:", error);
      });
  };

  useEffect(() => {
    searchSpotify();
  }, [query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const showSearchLists = query.trim() !== "";

  const selectSong = (playlist) => {
    setSelectedSongs([...selectedSongs, playlist]);
    setQuery("");
  };

  const removeSong = (songId) => {
    setSelectedSongs(selectedSongs.filter((song) => song.id !== songId));
  };

  return (
    <TopNav routeLink={"/"} barTitle={"Playlists"}>
      <div className="w-full px-3 mt-3 flex items-center gap-3 flex-col">
        <div className="w-full ">
          <form className="w-full relative">
            <h2 className="w-full mb-1 block">Suggest Song </h2>
            <input
              className="rounded-sm p-[.4rem] w-full border"
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search for a playlist"
            />
            {/* SELECTED SONG */}
            {selectedSongs.map((song) => (
              <div
                key={song.id}
                className="selectedSong border border-green-200 p-1 mt-2 rounded-3xl flex items-center gap-2"
              >
                <RxCrossCircled
                  className="active:scale-95 text-red-500 cursor-pointer"
                  onClick={() => removeSong(song.id)}
                />
                <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  {song?.name}
                </p>
              </div>
            ))}
            {selectedSongs.length > 0 && (
              <div className=" w-full flex mt-2 items-center justify-center">
                <button className="active:scale-95 text-center cursor-pointer p-[.35rem] px-2 text-white rounded-[3px] bg-green-500">
                Add to playlist
              </button>
              </div>
            )}

            {/* SELECTED SONG */}
            {/* SEARCH LISTS */}
            {showSearchLists && (
              <div className="searchLists w-full border border-gray-200 rounded-[4px] absolute top-[70px] overflow-y-scroll bg-gray-50 h-[250px] p-1">
                {results?.length > 0 ? (
                  <ul className="space-y-2">
                    {results.map((playlist) => (
                      <li
                        className="bg-white p-1 border border-white hover:border-gray-300 cursor-pointer rounded-md flex items-center gap-2 active:scale-95"
                        key={playlist?.id}
                        onClick={() => selectSong(playlist)}
                      >
                        <img
                          alt=""
                          className="rounded-md object-cover w-9 h-9"
                          src={playlist?.images[0]?.url}
                        />
                        <p className="text-[13px] w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                          {playlist?.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Search results not found.</p>
                )}
              </div>
            )}
            {/* SEARCH LISTS */}
          </form>
        </div>
      </div>

      <h2 className="w-full px-3 mt-6 block">Spotify Playlists</h2>
      <div className="w-full grid grid-cols-2 place-items-center content-center p-2 px-3 gap-3 overflow-y-scroll">
        {details?.map((i) => (
          <Link
            key={i._id}
            target="_blank"
            to={i.playListUrl}
            className="active:scale-95 cursor-pointer w-[95%] flex items-center gap-3 border border-green-200 rounded-[4px] hover:bg-green-50 p-[.4rem] px-3"
          >
            <BsSpotify size={20} className="text-green-500" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {i.playListName}
            </span>
          </Link>
        ))}
      </div>
    </TopNav>
  );
};

export default Playlist;
