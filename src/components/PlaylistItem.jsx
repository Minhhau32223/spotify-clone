import React from "react";
import { useNavigate } from "react-router-dom";

const PlaylistItem = ({  name,  id }) => {
    const navigate = useNavigate();
    return(
        <div onClick={() => navigate(`/playlist/${id}`)} className="w-full min-w-[180px] p-2 px-3 rounded-2xl cursor-pointer hover:bg-[#ffffff26] border-2 border-[#ffffff26] relative mr-0.5">
            <p className="font-bold mt-2 mb-1">{name}</p>
        </div>
    )
}
export default PlaylistItem;