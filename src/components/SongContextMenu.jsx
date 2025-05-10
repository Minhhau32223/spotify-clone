import React from 'react';
import axios from 'axios';
import { API_URL } from '../App';

const SongContextMenu = ({ visible, position, onAddToPlaylist, song_id, onDownload, onClose }) => {
  if (!visible) return null;

  const handleAddToFavorite = async () => {
    try {
      const formData = new FormData();
      formData.append("song_id", song_id);
      formData.append("user_id", localStorage.getItem("user_id")); // nếu cần user_id

      await axios.post(API_URL+"api/favorite-songs/create/", formData);
      alert("Đã thêm vào yêu thích!");
    } catch (error) {
      console.error("Lỗi khi thêm vào yêu thích:", error);
      alert("Thêm vào yêu thích thất bại!");
    }
    onClose && onClose(); // đóng menu nếu có
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        zIndex: 1000,
        padding: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}
      className="text-white"
    >
      <p className="cursor-pointer hover:bg-gray-700 p-2" onClick={onAddToPlaylist}>➕ Thêm vào danh sách phát</p>
      <p className="cursor-pointer hover:bg-gray-700 p-2" onClick={handleAddToFavorite}>❤️ Thêm vào yêu thích</p>
      <p className="cursor-pointer hover:bg-gray-700 p-2" onClick={onDownload}>⬇️ Tải xuống</p>
    </div>
  );
};

export default SongContextMenu;
