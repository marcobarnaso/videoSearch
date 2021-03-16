import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import youtube from "../apis/Youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const API_KEY = "AIzaSyAHhp6pn72yNgq_Xw6bqlgUFyu6zWi3fNQ";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    videoSearch("React JS");
  },[]);

  const videoSearch = async (term) => {
    const {
      data: { items },
    } = await youtube.get("/search", {
      params: {
        q: term,
        key: API_KEY,
        part: "snippet",
        type: "video",
        maxResults: 5,
      },
    });

    setVideos(items);
    setSelectedVideo(items[0]);
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div>
      <div className="ui container">
        <Searchbar videoSearch={videoSearch} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList videos={videos} onVideoSelect={onVideoSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
