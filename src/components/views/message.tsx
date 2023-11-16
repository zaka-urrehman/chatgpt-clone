import { DocumentData } from 'firebase/firestore'
import React from 'react'


interface props {
    message: DocumentData
}


const Message = ({ message }: props) => {
    const isGPT = message.user.name==="MyGPT"
    
    return (
        <div className={`text-white px-2 sm:mx-4 ${isGPT && "bg-gray-700"}`}>

            <div className='flex gap-x-4 py-6 '>
                <img src={message.user.avatar} alt={"avatar"} className='w-9 h-9'/>
                <p>
                {message.text}
                </p>
            </div>

        </div>
    )
}

export default Message