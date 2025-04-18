import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playState, setPlayState] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });
  const play = () => {
    audioRef.current.play();
    setPlayState(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setPlayState(false);
  };

  useEffect(()=>{
    setTimeout(() => {
        audioRef.current.ontimeupdate =() => {
            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration* 100))  + "%";
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60),
                  },
                  totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60),
                  },
                }
            )
        }
    },1000)
  },[audioRef])

  const contextvalue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playState,
    setPlayState,
    time,
    setTime,
    play,
    pause,
  };
  return (
    <PlayerContext.Provider value={contextvalue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
