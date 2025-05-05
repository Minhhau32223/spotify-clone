import React, {useEffect, useRef} from 'react'
import DisplayHome from './DisplayHome'
import "tailwindcss"
import { Route, Routes, useLocation} from 'react-router-dom'
import DisplayAlbum from './DisplayAlbum'
import DisplayPlaylist from './DisplayPlaylist'
// import { albumsData } from '../assets/assets'
import {   useState} from 'react'
import axios from 'axios'
const Display = () => {

  const displayRef = useRef();
  const location = useLocation();
  const [albumsData , setAlbumsdata] = useState([]);
  useEffect(() => {
    console.log("useEffect is running");
    axios.get("http://localhost:8000/api/albums/")
        .then((res) => {
            console.log("Data 1 playlist received:", res.data);
            setAlbumsdata(res.data);
        })
        .catch((err) => {
            console.log("Error:", err);
        });
  },[])
  const isAlbum = location.pathname.includes("album");
  console.log(isAlbum);
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";

  console.log(albumId);
  const album = albumsData[Number(albumId)];
  const bgColor = album ? album.bgColor : "defaultColor";
  

 

  useEffect(()=>{
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`
    } else {
      displayRef.current.style.background = `#121212`
    }
  })
  
  


  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212} text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/album/:id' element={<DisplayAlbum/>}/>
            <Route path='/playlist/:id' element={<DisplayPlaylist/>}/>
        </Routes>
    </div>
  )
}

export default Display