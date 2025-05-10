import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import ChatBox from "./ChatBox";
import PlaylistItem from "./PlaylistItem";
import axios from "axios";
import AddPlaylistForm from "./AddPlaylistForm"; // Import form
import { API_URL } from "../App";

const Slidebar = () => {
    const user_id = localStorage.getItem("user_id");
    const [playlists, setPlaylists] = useState([]);
    const [showForm, setShowForm] = useState(false); // State to show form

    const fetchPlaylists = async () => {
        axios.get(`${API_URL}api/playlists/user/${user_id}/`)
            .then((res) => {
                console.log('Danh sách phát:', res.data);
                setPlaylists(res.data);
            })
            .catch((err) => {
                console.log('Lỗi khi lấy playlist:', err);
            });
    };

    const handleCreatePlaylist = (name) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('user_id', user_id); 
        axios.post( API_URL+"api/playlists/create/", 
           formData).then(() => {
            setShowForm(false); // Close form
            fetchPlaylists(); // refresh danh sách
        }).catch((err) => {
            console.error("Lỗi tạo playlist:", err);
        });
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <div className='w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.home_icon} alt="" />
                    <p className="font-bold">Home</p>
                </div>
                <div className="flex items-center gap-3 pl-8 cursor-pointer">
                    <img className="w-6" src={assets.search_icon} alt="" />
                    <p className="font-bold">Tìm kiếm</p>
                </div>
            </div>

            <div className='bg-[#121212] h-[85%] rounded'>
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 ">
                        <img className="w-6" src={assets.stack_icon} alt="" />
                        <p className="font-bold">Thư viện</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <img className="w-5" src={assets.arrow_icon} alt=" " />
                        <img 
                            className="w-5 cursor-pointer" 
                            src={assets.plus_icon} 
                            alt=" " 
                            onClick={() => setShowForm(true)} // Show form
                        />
                    </div>
                </div>

                <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col gap-1 pl-4 justify-start items-start">
                    <h1>Tạo danh sách phát đầu tiên của bạn</h1>
                    <p className="font-light">Rất dễ! Chúng tôi sẽ giúp bạn</p>
                    <button
                        onClick={() => setShowForm(true)} // Show form
                        className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
                    >
                        Tạo danh sách phát
                    </button>
                </div>

                <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col gap-1 pl-4 justify-start items-start">
                    <h1>Hãy cùng tìm và theo dõi một số podcast</h1>
                    <p className="font-light">Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
                    <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                        Duyệt xem podcast
                    </button>
                </div>

                <div>
                    <p className="m-2.5 p-1 ">Danh sách phát của bạn</p>
                    <div className="flex  space-y-2 w-[95%] flex-col  h-[70%] ml-3">
                        {playlists.map((item, index) => (
                            <PlaylistItem key={index} id={item.id} name={item.name} />
                        ))}
                    </div>
                </div>

                <ChatBox />
            </div>

            {/* Render form if showForm is true */}
            {showForm && (
                <AddPlaylistForm
                    onSubmit={handleCreatePlaylist}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
};

export default Slidebar;
