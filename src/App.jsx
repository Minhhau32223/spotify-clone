import React from 'react'
// import Header from './components/Header';
import Slidebar from './components/Slidebar'
import "tailwindcss" ;
import Display from './components/Display';

const App = () => {
  return (
    <div> <div className='bg-black h-screen w-full'>
    {/* <Header /> */}
    <div className="h-[90%] flex  w-max-[100%]"> 
    
      <Slidebar />
      <Display />
    </div>
</div></div>
  )
}

export default App