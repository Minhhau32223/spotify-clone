import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets  } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios';
import SongContextMenu from './SongContextMenu';
import AddToPlaylistModal from './AddToPlaylistModal';
import { API_URL } from "../App";
const DisplayAlbum = () => {

  const {id} = useParams();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const u_id = localStorage.getItem('user_id');
  const fetchPlaylist=  async () => {
    try{
      axios.get(API_URL+"api/playlists/user/"+u_id+"/")
          .then((res) => {
         
            setPlaylists(res.data);
          })
          .catch((err) => {
            console.log('Error:', err);
          });
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchPlaylist();
  }, []);
  const handleRightClick = (e) => {
    e.preventDefault();
    setMenuPosition({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
  };

  
    console.log(id)
  
    const {playWithId} = useContext(PlayerContext);
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        console.log('useEffect is running');
        axios.get(API_URL+"api/albums/"+id+"/")
          .then((res) => {
            console.log('Data 1 album received:', res.data);
            setAlbum(res.data);
          })
          .catch((err) => {
            console.log('Error:', err);
          });
      }, []);

    const [songs,setSongs] = useState([]);
     useEffect(() => {
    console.log('useEffect is running');
    axios.get("http://localhost:8000/api/albums/"+id+"/songs/")
      .then((res) => {
        console.log('Song data album:', res.data);
        setSongs(res.data);
     
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);
  return (
    <>
    <Navbar/>
    <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={album.image} alt=""/>
        <div className='flex flex-col'>
            <p>Album</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{album.name}</h2>
            <h4>{album.description}</h4>
            <p className='mt-1'>
                <img className='inline-block w-5' src={assets.spotify_logo} alt=""/>
                <b>Spotify </b>
                • 1,000,000 likes
                • <b>50 songs, </b>
                • about 1h 20 mins               
            </p>
        </div>
    </div>
    <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt=""/>
    </div>
    <hr/>
    {
        songs.map((item, index)=>(
            <div onContextMenu={handleRightClick}  onClick={()=>playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className='text-white'>
                    <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                    <img className='inline w-10 mr-5' src={item.image} alt=""/>
                    {item.name}
                </p>
                <p className='text-[15px]'>{album.name}</p>
                <p className='text-[15px] hidden sm:block'>2 days ago</p>
                <p className='text-[15px] text-center'>{item.duration}</p>
                <SongContextMenu
  visible={menuVisible}
  position={menuPosition}
  song_id={id} // bạn cần có biến lưu bài hát đang chọn
  onAddToPlaylist={() => {
    setMenuVisible(false);
    setShowPlaylistModal(true);
  }}
  onDownload={() => {
    setMenuVisible(false);
    console.log("Đang tải bài hát");
  }}
  onClose={() => setMenuVisible(false)} // để dùng trong handleAddToFavorite
/>

      <AddToPlaylistModal
        visible={showPlaylistModal}
        playlists={playlists}
        song_id={id}
        onClose={() => setShowPlaylistModal(false)}
        onSelect={(playlistId) => {
          console.log(`Thêm bài ${id} vào playlist ${playlistId}`);
        }}
      />
            </div>
        ))
    }
    </>
  )
}

export default DisplayAlbum