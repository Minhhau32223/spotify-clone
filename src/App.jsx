import React, { useContext } from 'react'
import Player from './components/Player';
import Slidebar from './components/Slidebar'
import "tailwindcss" ;
import Display from './components/Display';
import {PlayerContext} from './context/PlayerContext'


const App = () => {

  const {audioRef,track} = useContext(PlayerContext);
  console.log("Audio source:", track.file);

  return (
    <div>
         <div className='bg-black h-screen w-full'>
  
          <div className="h-[90%] flex  w-max-[100%]"> 
    
           <Slidebar/>
          <Display/>
          </div>
          <Player />
          <audio ref={audioRef} src={track.file} ></audio>
    </div>

</div>
  )
}

export default App