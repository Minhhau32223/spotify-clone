import React, { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import SongContextMenu from './SongContextMenu';
import AddToPlaylistModal from './AddToPlaylistModal';
import axios from 'axios';
const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const u_id = localStorage.getItem('user_id');
  const fetchPlaylist=  async () => {
    try{
      axios.get("http://localhost:8000/api/playlists/user/"+u_id+"/")
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

  

  return (
    <div
      onClick={() => playWithId(id)}
      onContextMenu={handleRightClick}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff25] relative"
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>

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
  );
};

export default SongItem;
