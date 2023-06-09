import {useState, forwardRef, useEffect, useRef} from "react";
import {clamp} from "../utils/clamp.js";

const VideoPlayer = forwardRef(({currentSrc, videoRef, videoOptions}, ref) => {
    const progressBarEl = useRef(null);

    const [playerState, setPlayerState] = useState({
        duration: 0,
        currentTime: 0,
        
        isPaused: true,
        clickPressed: false,
    });

    const getProgressPercent = () => playerState.currentTime / playerState.duration * 100 
        
    
    useEffect(() => {
        if (ref?.current) {
            setPlayerState(prev => ({
                ...prev,
                duration: ref.current.duration,
                currentTime: ref.current.currentTime
            }))
        }
    }, [ref?.current?.duration, currentSrc]);


    useEffect(() => {
        // native player pause
        // setPlayerState(prev => ({...prev, isPaused: !prev.isPaused}))
        
        
    }, [ref?.current?.paused, playerState.isPaused])
    
    useEffect(() => {
        if (playerState.clickPressed) {
            document.addEventListener("mousemove", rewindEnable)
            document.addEventListener("mouseup", rewindDisable)
        }
        return () => {
            document.removeEventListener("mousemove", rewindEnable)
            document.removeEventListener("mouseup", rewindDisable)
        }
    }, [playerState.clickPressed]);

    useEffect(() => {
        if (playerState.clickPressed) {
            ref.current.currentTime = playerState.currentTime
        }
    }, [playerState.currentTime]);


    function rewindEnable(e) {
        const progressLeftOffset = progressBarEl.current.offsetLeft;
        const progressWidthPx = progressBarEl.current.offsetWidth;
        
        const positionPx = clamp(e.pageX - progressLeftOffset, 0, progressWidthPx);
        const positionPercent = positionPx / progressWidthPx * 100;
        const timeForSet = playerState.duration / 100 * positionPercent;
        
        setPlayerState(prev => ({...prev, currentTime: timeForSet}))
    }

    function rewindDisable() {
        // todo ispaused dodelat'
        setPlayerState(prev => ({...prev, clickPressed: false, isPaused: false}))
    }

    const handlePlayToggle = () => {
        const videoEl = ref?.current;
        if (videoEl?.paused)
            videoEl?.play()
        else
            videoEl?.pause()
    }

    const handleProgress = () => {
        const videoEl = ref?.current
        if (videoEl) {
            // const percent = (videoEl.currentTime / videoEl.duration) * 100;
            setPlayerState(prev => ({...prev, currentTime: videoEl.currentTime}))
        }
    }

    const handleRewind = (e) => {
        setPlayerState(prev => ({
            ...prev,
            clickPressed: true,
            isPaused: true
        }))
    };


    return (
        <div className="max-w-[600px]">
            <video className="block aspect-[600/338] w-full mt-[10vh] bg-black/60]"
                   ref={ref}
                   autoPlay={videoOptions.autoplay}
                   controls={videoOptions.controls}
                   onTimeUpdate={handleProgress}
                   loop={videoOptions.loop} playsInline muted>
                <source src={currentSrc} type={"video/mp4"}/>
            </video>

            <div className="controls">
                <button className={`play controls__play ${playerState.isPaused ? "paused" : ""}`}
                        onClick={handlePlayToggle}
                        type="button"></button>

                <div className="controls__bar"
                     ref={progressBarEl}
                     onMouseDown={handleRewind}
                >
                    <div className="controls__progress"
                         style={{width: `${getProgressPercent()}%`}}
                    ></div>


                    <div className={"fixed top-0 right-0 bg-amber-100 p-3"}>
                        <div className="">current: {playerState.currentTime}</div>
                        <div>duration: {playerState.duration}</div>
                    </div>
                </div>
            </div>
        </div>
    )
})
export default VideoPlayer
