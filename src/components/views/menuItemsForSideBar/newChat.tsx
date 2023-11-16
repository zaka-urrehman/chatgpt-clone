'use client'
import { useSession } from 'next-auth/react'
import {AiOutlinePlus} from 'react-icons/ai'
import {useRouter} from "next/navigation"
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'



const NewChat = () => {
    const router = useRouter()
    const  { data : session } = useSession()
    const createNewChat = async () =>{
         const doc = await addDoc(
            collection(db, "users", session?.user?.email!,"chats"),{
                messages : [] ,
                userId : session?.user?.email,
                createdAt : serverTimestamp()
            })

            router.push(`/chat/${doc.id}`)
    }

  return (
    <div className='p-2'>
        <button
        onClick={createNewChat}
        className='menuItem  flex justify-center items-center gap-x-4 py-3 '>
          <AiOutlinePlus/>  New Chat 
        </button>
    </div>
  )
}

export default NewChat