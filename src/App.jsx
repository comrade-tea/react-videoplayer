import {useEffect, useRef, useState} from 'react'
import './App.css'
import VideoList from "./components/VideoList.jsx";
import OptionsEditor from "./components/OptionsEditor.jsx";
import {videos} from "./api/data.js";

function App() {
    const [videoOptions, setVideoOptions] = useState({autoplay: false, loop: false, controls: true});

    const videoRef = useRef(null);
    const [selectedVideoName, setSelectedVideoName] = useState(Object.keys(videos)[0]);
    const [currentSrc, setCurrentSrc] = useState("")

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
            <h1 className="text-3xl mb-[6vh]">Videoplayer</h1>
            
            <div className="grid grid-cols-2 gap-3">
                
                <div>
                    <h4 className="text-2xl mb-5">Choose video:</h4>
                    <VideoList 
                        videos={videos} 
                        selectedVideoName={selectedVideoName}
                        selectedVideoHandler={selectedVideoHandler} />
                </div>

                <div>
                    <h4 className="text-2xl mb-5">Player options:</h4>
                    <OptionsEditor videoOptions={videoOptions} toggleHandler={toggleHandler}/>
                </div>

            </div>

            <video className={"block aspect-[600/338] w-full max-w-[600px] mt-[10vh] bg-black/60]"}
                   ref={videoRef}
                   autoPlay={videoOptions.autoplay}
                   controls={videoOptions.controls}
                   loop={videoOptions.loop} playsInline>
                <source src={currentSrc} type={"video/mp4"}/>
            </video>
        </>
    )
}

export default App
