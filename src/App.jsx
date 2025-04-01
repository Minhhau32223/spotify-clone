import React from 'react'
import Slidebar from './components/Slidebar'
import "tailwindcss" ;

const App = () => {
  return (
    <div> <div className='bg-black h-screen w-full'>
    <div className="h-[90%] flex  w-max-[100%]"> 
      <Slidebar />
    </div>
</div></div>
  )
}

export default App