import React, { useContext } from "react";
import { assets} from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { seekBar, seekBg, playState, play, pause,time,track,previous,next,seekSong } = useContext(PlayerContext);
  console.log(playState);
  return (
    <div className="h-[10%] bg-black flex justify-between items-center p-4 text-white">
      <div className="hidden lg:flex item-center gap-4">
        <img className="w-12" src={track?.image} alt="" />
        <div>
          <p>{track?.name}</p>
          <p> {track?.desc.slice(0, 12)}</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex  gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
          {!playState ? (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          ) : (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          )}
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className=" flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div
            ref={seekBg} onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer "
          >
            <hr
              ref={seekBar}
              className="bg-green-800 h-1 rounded-full   border-none w-0  "
            />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-70">
        <img src={assets.play_icon} alt="" className="w-4" />
        <img src={assets.mic_icon} alt="" className="w-4" />
        <img src={assets.queue_iconn} alt="" className="w-4" />
        <img src={assets.speaker_icon} alt="" className="w-4" />
        <img src={assets.volume_icon} alt="" className="w-4" />
        <div className="w-20 bg-slate-50  h-1 rounded"></div>
        <img src={assets.mini_player_icon} alt="" className="w-4" />
        <img src={assets.zoom_icon} alt="" className="w-4" />
      </div>
    </div>
  );
};

export default Player;
