import React from 'react';
import axios from 'axios';
import { API_URL } from "../App";

const AddToPlaylistModal = ({ visible, playlists, onClose, song_id }) => {
  if (!visible) return null;
  const handleSelect = async (playlistId) => {
    try {
      // POST dữ liệu lên API
      const formData = new FormData();
      formData.append('playlist_id', playlistId);
         formData.append('song_id', song_id); // Thay đổi tên key nếu cần thiết
      await axios.post(API_URL+'api/playlist-songs/create/',   formData);

      // Đóng modal sau khi thêm thành công
      onClose();
    } catch (error) {
      console.error('Lỗi khi thêm bài hát vào playlist:', error);
      alert('Thêm bài hát thất bại!');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#000000a0] z-[1001]">
      <div className="bg-[#222] p-5 rounded-lg w-[300px] text-white">
        <h2 className="text-lg font-bold mb-3">Chọn danh sách phát</h2>
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="cursor-pointer hover:bg-gray-600 p-2 rounded"
            onClick={() => handleSelect(playlist.id)}
          >
            {playlist.name}
          </div>
        ))}
        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 p-2 rounded" onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
