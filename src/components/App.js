import React from 'react';
import Searchbar from './Searchbar';
import youtube from '../apis/Youtube';
import VideoList from '../components/VideoList';
import VideoDetail from './VideoDetail';

const API_KEY = 'AIzaSyAHhp6pn72yNgq_Xw6bqlgUFyu6zWi3fNQ';

class App extends React.Component {

    state = { videos: [], selectedVideo: null };

    videoSearch = async (term) => {
        const response = await youtube.get('/search', {
            params: {
                q: term,
                key: API_KEY,
                part: 'snippet',
                type: 'video',
                maxResults: 5,
            }
        });

        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }

    render() {
        return (
            <div className="ui container">
                <Searchbar videoSearch={this.videoSearch} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo} />
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;