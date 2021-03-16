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

  // const onVideoSelect = (video) => { // we were providing this function to VideoList component to pass the video to setSelected video
  //   setSelectedVideo(video); // but we could just use setSelectedVideo and it will work the same
  // };

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
              <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
