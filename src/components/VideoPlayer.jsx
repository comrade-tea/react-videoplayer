import {useState, useEffect, useRef, useCallback, useMemo} from "react";
import {clamp} from "../utils/clamp.js";

const VideoPlayer = ({currentSrc, videoOptions}) => {
    const videoRef = useRef(null);
    const progressBarEl = useRef(null);
    const [playerState, setPlayerState] = useState({
        duration: 0,
        currentTime: 0,
        isPaused: true,
        prevStateIsPaused: null,
        clickPressed: false,
    });

    

    // const getProgressPercent = () => playerState.currentTime / playerState.duration * 100
    const getProgressPercent = useCallback(() => {
        console.log("----", "rebuild get progress..")
        return playerState.currentTime / playerState.duration * 100
    }, [playerState]);

    useEffect(() => {
        const videoEl = videoRef?.current;
        
        if (videoEl) {
            videoEl.src = currentSrc;
            videoEl.load();
            
            setPlayerState(prev => ({
                ...prev,
                duration: videoEl.duration,
                currentTime: 0
            }))

            return () => {
                videoEl.src = "";
                videoEl.load();
            }
        }
    }, [currentSrc]);

    useEffect(() => {
        if (playerState.clickPressed) {
            videoRef.current.currentTime = playerState.currentTime
        }
    }, [playerState.currentTime]);
    
    useEffect(() => {
        if (playerState.clickPressed) {
            document.addEventListener("mousemove", rewindRunning)
            document.addEventListener("mouseup", rewindRunningDisable)
        }
        return () => {
            document.removeEventListener("mousemove", rewindRunning)
            document.removeEventListener("mouseup", rewindRunningDisable)
        }
    }, [playerState.clickPressed]);

    function rewindRunning(e) {
        const progressLeftOffset = progressBarEl.current.offsetLeft;
        const progressWidthPx = progressBarEl.current.offsetWidth;

        const positionPx = clamp(e.pageX - progressLeftOffset, 0, progressWidthPx);
        const positionPercent = positionPx / progressWidthPx * 100;
        const timeForSet = playerState.duration / 100 * positionPercent;

        setPlayerState(prev => ({...prev, currentTime: timeForSet}))
    }

    function rewindRunningDisable() {
        setPlayerState(prev => ({...prev, clickPressed: false}))
        
        if (!playerState.prevStateIsPaused)
            videoRef.current.play();
    }

    const handlePlayToggle = () => {
        const videoEl = videoRef?.current;

        if (videoEl?.paused)
            videoEl?.play()
        else
            videoEl?.pause()
    }

    const handleVideoTimeUpdate = () => {
        const videoEl = videoRef?.current
        if (videoEl) {
            setPlayerState(prev => ({...prev, currentTime: videoEl.currentTime}))
        }
    }

    const handleRewind = (e) => {
        setPlayerState(prev => ({
            ...prev,
            prevStateIsPaused: prev.isPaused,
            clickPressed: true,
        }))

        videoRef?.current?.pause()
        rewindRunning(e); // handle click
    };
    

    return (
        <div className="max-w-[600px]">
            <video className="block aspect-[600/338] w-full mt-[10vh] bg-black/60]"
                   ref={videoRef}
                   onLoadedData={() => setPlayerState(prev => ({...prev, duration: videoRef.current.duration}))}
                   onPlay={() => {
                       setPlayerState(prev => ({...prev, isPaused: false}))
                   }}
                   onPause={() => {
                       setPlayerState(prev => ({...prev, isPaused: true}))
                   }}
                   autoPlay={videoOptions.autoplay}
                   controls={videoOptions.controls}
                   onTimeUpdate={handleVideoTimeUpdate}
                   loop={videoOptions.loop} playsInline muted>
                <source src={currentSrc} type={"video/mp4"}/>
            </video>

            <div className="controls">
                <button className={`play controls__play ${playerState.isPaused ? "" : "paused"}`}
                        onClick={handlePlayToggle}
                        type="button"></button>

                <div className="controls__bar"
                     ref={progressBarEl}
                     onMouseDown={handleRewind}
                >
                    <div className="controls__progress"
                         style={{width: `${getProgressPercent()}%`}}
                    ></div>
                </div>
            </div>
            
            <div className={"fixed top-0 right-0 bg-amber-100 p-3"}>
                <div className="">current: {playerState.currentTime.toFixed(2)}</div>
                <div>duration: {playerState.duration.toFixed(2)}</div>
            </div>
        </div>
    )
}
export default VideoPlayer
