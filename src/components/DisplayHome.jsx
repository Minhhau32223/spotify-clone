import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import "tailwindcss"
// import { albumsData } from '../assets/assets'
// import { songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import axios from 'axios'
import { API_URL } from "../App";
const DisplayHome = () => {
  const [albums,setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    console.log('useEffect is running');
    axios.get(API_URL+"api/albums/")
      .then((res) => {
        setAlbums(res.data);
     
      
        console.log('albumdata api:', res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  useEffect(() => {
    
    console.log('useEffect is running');
    axios.get(API_URL+"api/songs/")
      .then((res) => {
        setSongs(res.data);
        console.log('songdata api:', res.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  },[]);

  
  return (
    <>
    <Navbar />
    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
      <div className='flex overflow-auto'>
        {albums.map((item, index)=>(<AlbumItem key={index} name={item.name} desc={item.description} id={item.id} image={item.image}/>))}
      </div>
    </div>

    <div className='mb-4'>
      <h1 className='my-5 font-bold text-2xl'>Today's Top Hits</h1>
      <div className='flex overflow-auto'>
        {songs.map((item, index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
      </div>
    </div>
    </>
  )
}

export default DisplayHome