import {videos} from "./api/data.js";
import {useEffect, useState} from 'react'
import VideoList from "./components/VideoList.jsx";
import OptionsEditor from "./components/OptionsEditor.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";

function App() {
    const [currentSrc, setCurrentSrc] = useState("")
    const [selectedVideoName, setSelectedVideoName] = useState(Object.keys(videos)[0]);
    const [videoOptions, setVideoOptions] = useState({
        autoplay: false,
        loop: false,
        controls: true
    });

    useEffect(() => {
        setCurrentSrc(videos[selectedVideoName])
    }, [selectedVideoName]);

    const handleSelectVideo = (name) => {
        setSelectedVideoName(name)
    }

    const handleToggleCheckbox = (key, value) => {
        setVideoOptions(prev => {
            return {...prev, [key]: !value}
        })
    };


    return (
        <>
            <em>{import.meta.env.BASE_URL}</em>
            <div className="mb-[4vh]">
                <h1 className="text-3xl mb-10">Videoplayer + custom controls</h1>
                <p><b>Features</b>:</p>
                <ul className="list-inside list-disc mt-2">
                    <li>Selecting a video by changing the src of the video</li>
                    <li>Configuring video options</li>
                    <li>Custom video controls that behave like native ones (click/drag)</li>
                </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-[900px]">
                <div>
                    <h4 className="text-2xl mb-5">Choose video:</h4>
                    <VideoList
                        videos={videos}
                        selectedVideoName={selectedVideoName}
                        selectedVideoHandler={handleSelectVideo}/>
                </div>

                <div>
                    <h4 className="text-2xl mb-5">Player options:</h4>
                    <OptionsEditor videoOptions={videoOptions} toggleHandler={handleToggleCheckbox}/>
                </div>

            </div>

            <VideoPlayer
                currentSrc={currentSrc}
                videoOptions={videoOptions}
            />
        </>
    )
}

export default App
