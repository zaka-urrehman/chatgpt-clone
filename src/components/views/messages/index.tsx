'use client'
import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from '../message'

interface props{
    chatId:string
}

const Messages = ({chatId}:props) => {
    const {data:session} = useSession()
    const [messages] = useCollection(session && query(
        collection(db,"users",session?.user?.email!,"chats",chatId,"messages"),
        orderBy("createdAt","asc")
    ))

 
    return (
        <div className='overflow-y-scroll  scrollbar-thin scrollbar-thumb-slate-500 flex-1 px-4 pt-16' >
            {messages?.docs.map((message:any)=>(
                <Message  key={message.id}  message={message.data()} />
            ))}
        </div>
    )
}

export default Messages