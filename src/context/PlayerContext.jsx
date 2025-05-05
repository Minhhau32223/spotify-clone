import { createContext, useEffect, useRef, useState } from "react";


import axios from "axios";
export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  // const [track, setTrack] = useState([]);
  // const [track, setTrack] = useState(songsData[0]);

  // console.log(songsData);
  const [trackList, setTrackList] = useState([]);
  const [track, setTrack] = useState(null);
  // const [trackIndex, setTrackIndex] = useState(0);
  
  useEffect(() => {
    console.log('useEffect is running');
    axios.get("http://localhost:8000/api/songs/")
      .then((res) => {
        console.log('Data received:', res.data);
        setTrackList(res.data);
        setTrack(res.data[0]);
        console.log('Track set:', res.data[0]);
        console.log('Track list:', res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);
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

  const playWithId = async (id) => {
    await trackList.map((item) => {
      if (item.id === id) {
        setTrack(item);
  
      }
    })
    await audioRef.current.play();
    setPlayState(true);
  }

  const previous =async () => {
    await trackList.map((item, index) => {
    if(track.id === item.id && index > 0){
       setTrack(trackList[index-1]);
       audioRef.current.play();
       setPlayState(true);

    }
    
   })
  }
  const next =async () => {
    await trackList.map((item, index) => {
      if(track.id === item.id && index < trackList.length-1){
         setTrack(trackList[index+1]);
         audioRef.current.play();
         setPlayState(true);
  
      }
      
     })
  }
  const seekSong =(e) =>{
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.clientWidth) * audioRef.current.duration;
  
  }

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
    playWithId,
    previous,
    next,
    seekSong,
    trackList,
    setTrackList
  
  };
  return (
    <PlayerContext.Provider value={contextvalue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
