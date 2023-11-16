'use client'
import React from 'react'
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">

      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-xl"
        >
        Login to MyGPT
      </button>


    </div>
  );
}

export default Login;