import React from 'react'
import "tailwindcss"
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
const Login = ({onLogin}) => {
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
                className='w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'/>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <input type='password'
                placeholder='Enter your password'
                className='w-full px-3 py-2 rounded bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500'/>

                <button className='w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded transition-colors' onClick={onLogin}>Log in</button>
            </div>
            <div className='mt-6 text-sm flex justify-between items-center'>
                <a href='#' className='text-zinc-400 hover:underline'>Forgot your password</a>
                <a href='#' className='text-white hover:underline'>Sign up for Spotify</a>
            </div>
            <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-600"></div>
            </div>
           
            <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded">
                <FaFacebookF className="text-lg" />
                Continue with Facebook
            </button>
            <button className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 font-medium py-2 rounded">
                <FaGoogle className="text-lg" />
                Continue with Google
            </button>
            </div>  
        </div>
    </div>
  )
}

export default Login