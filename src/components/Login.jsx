import React, { useState } from 'react'
import "tailwindcss"
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../App";
const Login = ({onLogin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
          const response = await axios.post(API_URL+'api/token/', {
            email,
            password,
          });
      
          const accessToken = response.data.access;
          localStorage.setItem('access_token', accessToken);
      
          navigate('/');
          onLogin();
          const token = localStorage.getItem('access_token');

            await axios.get(API_URL+'api/users/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            const userRes = await axios.get(`${API_URL}api/users/email/${email}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const userData = userRes.data;
      
            // Lưu user info
            localStorage.setItem('user_email', userData.email);
            localStorage.setItem('user_id', userData.id); //
        } catch (error) {
          alert('Invalid email or password');
          console.error('Login failed', error);
        }
      };
        


  return (
    <div className='min-h-screen bg-black text-white flex items-center justify-center'>
        <div className='w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl'>
            <h1 className='text-3xl font-bold md-6 text-center'> 
                Log in to Spotify 
            </h1>
            <div className='space-y-4'>
                <label className="block text-sm text-gray-400 mb-1">Email address or username</label>
                <input type='email'
                placeholder='Email address or username ' 
                className='w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                onChange={(e) => setEmail(e.target.value)}/>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <input type='password'
                placeholder='Enter your password'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'/>

                <button className='w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded transition-colors' onClick={handleLogin}>Log in</button>
            </div>
            <div className='mt-6 text-sm flex justify-between items-center'>
                <a href='#' className='text-zinc-400 hover:underline'>Forgot your password</a>
                <a href='#' className='text-white hover:underline'>Sign up for Spotify</a>
            </div>
            
        </div>
    </div>
  )
}

export default Login