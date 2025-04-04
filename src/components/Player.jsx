import React ,{ useContext }from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext';

const Player = () => {

  const{seekBar,seekBg,playState,play,pause} = useContext(PlayerContext);
  console.log(playState)
  return ( 
    <div className='h-[10%] bg-black flex justify-between items-center p-4 text-white'>
        <div className='hidden lg:flex item-center gap-4'>
            <img className='w-12' src={songsData[0].image} alt=''/>
              <div>
                <p>{songsData[0].name}</p>
                <p> {songsData[0].desc.slice(0,12)}</p>
              </div>  
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex  gap-4'>
                <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt=""/>
                <img className='w-4 cursor-pointer' src={assets.prev_icon} alt=""/>
                {!playState
                ?<img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt=""/>
                :<img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt=""/>
                  
                }
                <img className='w-4 cursor-pointer' src={assets.next_icon} alt=""/>
                <img className='w-4 cursor-pointer' src={assets.loop_icon} alt=""/>

            </div>
             <div className=' flex items-center gap-5'>
             <p>1:06</p>
             <div ref={seekBg} className='w-[60vw] w-max-[500px] bg-gray-300 rounded-full cursor-pointer ' >
                <hr  ref={seekBar} className='bg-green-800 h-1 rounded-full w-[50%]  border-none  w-0'/> 
                </div>
                <p>3:06</p>
              </div>
             
        </div>
        <div className='hidden lg:flex items-center gap-2 opacity-70'>
            <img src={assets.play_icon} alt="" className='w-4'/>
            <img src={assets.mic_icon} alt="" className='w-4'/>
            <img src={assets.queue_iconn} alt="" className='w-4'/>
            <img src={assets.speaker_icon} alt="" className='w-4'/>
            <img src={assets.volume_icon} alt="" className='w-4'/>
            <div className='w-20 bg-slate-50  h-1 rounded'>

            </div>
            <img src={assets.mini_player_icon} alt="" className='w-4'/>
            <img src={assets.zoom_icon} alt="" className='w-4'/>

        </div>

    </div>
  ) 
}

export default Player 