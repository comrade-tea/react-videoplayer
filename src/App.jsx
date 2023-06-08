import {videos} from "./api/data.js";
import {useEffect, useRef, useState} from 'react'
import VideoList from "./components/VideoList.jsx";
import OptionsEditor from "./components/OptionsEditor.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";

function App() {
    const videoRef = useRef(null);
    const [currentSrc, setCurrentSrc] = useState("")

    const [videoOptions, setVideoOptions] = useState({autoplay: true, loop: false, controls: true});
    const [selectedVideoName, setSelectedVideoName] = useState(Object.keys(videos)[0]);

    useEffect(() => {
        setCurrentSrc(videos[selectedVideoName])
        videoRef.current.load();
    }, [selectedVideoName]);

    const selectedVideoHandler = (name) => {
        setSelectedVideoName(name)
    }

    const toggleHandler = (key, value) => {
        setVideoOptions(prev => {
            return {...prev, [key]: !value}
        })
    };


    return (
        <>
            <div className="mb-[4vh]">
                <h1 className="text-3xl mb-10">Videoplayer + custom controls</h1>
                <p><b>Features</b>:</p>
                <ul className="list-inside list-disc">
                    <li>custom progress bar</li>
                </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-[900px]">
                <div>
                    <h4 className="text-2xl mb-5">Choose video:</h4>
                    <VideoList
                        videos={videos}
                        selectedVideoName={selectedVideoName}
                        selectedVideoHandler={selectedVideoHandler}/>
                </div>

                <div>
                    <h4 className="text-2xl mb-5">Player options:</h4>
                    <OptionsEditor videoOptions={videoOptions} toggleHandler={toggleHandler}/>
                </div>

            </div>
            
            <VideoPlayer
                currentSrc={currentSrc}
                ref={videoRef}
                videoOptions={videoOptions}
            />
        </>
    )
}

export default App
