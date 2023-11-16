'use client'
import { db } from '@/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { BiSend } from 'react-icons/bi'
import useSWR from 'swr'

interface props {
    chatId: string
}

const ChatInput = ({ chatId }: props) => {

    const [prompt, setPrompt] = useState("")
    const { data: session } = useSession()
 
    // use swr to fetch model and then send that modle with the text input to openai 
    const {data:model } = useSWR("model",{
        fallbackData : "text-davinci-003"
      })


    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return
        const input = prompt.trim()
        setPrompt("")

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image!
            }
        }

        await addDoc(
            collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
            message)

        // toast notification to say Loading 
        const notification = toast.loading("Please Wait! MyGPT is thinking....")

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session
            })
        }).then(() => {
            // toast notification to say successful
            toast.success("MyGPT has responded!",{
                id : notification
            })
        })

    }

    return (
        <div className='my-4 w-full'>
            <form onSubmit={sendMessage} className='flex items-center justify-center '>
                <input
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    type="text" placeholder='Enter your text here...'
                    className='w-1/2 max-md:w-3/4 p-2 bg-gray-700 text-white rounded-md m-2 md:m-4'
                />

                <button disabled={!prompt || !session} type='submit' className='disabled:cursor-not-allowed'>
                    <BiSend size={32} className="hover:scale-110 active:scale-90 " />
                </button>

            </form>

           
        </div>
    )
}

export default ChatInput