import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { useContext, useState } from "react";
import axios from "axios";

const DisplayPlaylist = () => {

    const[Playlists, setPlaylists] = useState([]);
    const [songs,setSongs] = useState([]);
    const { id } = useParams();
    const { playWithId } = useContext(PlayerContext);
    const fetchPlaylists = async () => {
       
        axios.get("http://127.0.0.1:8000/api/playlists/" + id + "/")
            .then((res) => {
                console.log("Data 1 playlist received:", res.data);
                setPlaylists(res.data);
            })
            .catch((err) => {
                console.log("Error:", err);
            });
    }
    const fetchSongs = async () => {
        console.log("useEffect is running");
        axios.get("http://127.0.0.1:8000/api/playlists/" + id + "/songs/")
            .then((res) => {
                console.log("Song data playlist:", res.data);
                setSongs(res.data);
            })
            .catch((err) => {
                console.log("Error:", err);
            }); 
    }
    
    useEffect(() => {
       fetchPlaylists();
       fetchSongs();
    },[]);

    return(<>
        <Navbar/>
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img className='w-48 rounded' src={Playlists.im} alt=""/>
                <div className='flex flex-col'>
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{Playlists.name}</h2>
                  
                    <p className='mt-1'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt=""/>
                        <b>Spotify </b>
                        • 1,000,000 likes
                        • <b>50 songs, </b>
                                     
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
                    <div onClick={()=>playWithId(item.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                            <img className='inline w-10 mr-5' src={item.image} alt=""/>
                            {item.name}
                        </p>
                        <p className='text-[15px]'>{Playlists.name}</p>
                        <p className='text-[15px] hidden sm:block'>2 days ago</p>
                        <p className='text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
    </>

    )
}
export default DisplayPlaylist