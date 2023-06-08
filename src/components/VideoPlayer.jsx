import {useState, forwardRef, useEffect, useCallback} from "react";

const VideoPlayer = forwardRef(({currentSrc, videoRef, videoOptions}, ref) => {
    const [videoState, setVideoState] = useState({
        isPaused: true,
        progress: 0,
    });
    
    useEffect(() => {
        const videoEl = ref?.current;
        if (!videoEl)
            return

        if (videoState.isPaused) {
            videoEl.pause()
        } else {
            videoEl.play()
        }
    }, [videoState.isPaused])
    
    useEffect(() => {
        
    }, [videoState.progress])
    
    const handlePlay = () => {
        setVideoState(prev => ({...prev, isPaused: !prev.isPaused}))
    }

    const handleProgress = () => {
        const videoEl = ref?.current
        if (videoEl) {
            setVideoState(prev => ({
                ...prev, 
                progress: (videoEl?.currentTime / videoEl?.duration) * 100}
            ))
        }
    }
    
    return (
        <div className="max-w-[600px]">
            <video className="block aspect-[600/338] w-full mt-[10vh] bg-black/60]"
                   ref={ref}
                   autoPlay={videoOptions.autoplay}
                   controls={videoOptions.controls}
                   onTimeUpdate={handleProgress}
                   loop={videoOptions.loop} playsInline muted preload="true">
                <source src={currentSrc} type={"video/mp4"}/>
            </video>

            <div className="controls">
                <button className={`play controls__play ${videoState.isPaused ? "" : "paused"}`} 
                        onClick={handlePlay}
                        type="button"
                ></button>

                <div className="controls__bar">
                    <div className="controls__progress"
                         style={{width: `${videoState.progress}%`}}
                         onClick={() => {}}
                    ></div>
                </div>
            </div>
        </div>
    )
})
export default VideoPlayer
