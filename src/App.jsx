import React, { useContext ,useState} from 'react'
import Player from './components/Player';
import Slidebar from './components/Slidebar'
import "tailwindcss" ;
import Display from './components/Display';
import {PlayerContext} from './context/PlayerContext'
import Login from './components/Login';



const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // dùng [] không phải {}

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />; // dùng setIsLoggedIn
  }

  return (
    <div className="bg-black h-screen w-full">
      <div className="h-[90%] flex w-max-[100%]">
        <Slidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track?.file}></audio>
    </div>
  );
};

export default App;