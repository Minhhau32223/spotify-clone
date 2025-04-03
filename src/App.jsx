import React from 'react'
import Player from './components/Player';
import Slidebar from './components/Slidebar'
import "tailwindcss" ;
import Display from './components/Display';

const App = () => {
  return (
    <div>
         <div className='bg-black h-screen w-full'>
  
          <div className="h-[90%] flex  w-max-[100%]"> 
    
          < Slidebar />
          <Display/>
          </div>
          <Player />
    </div>

</div>
  )
}

export default App