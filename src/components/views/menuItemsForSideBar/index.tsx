'use client'
// This component display all the items in the side bar 
// It is used in largeScreenBar and smallScreenBar component

import NewChat from './newChat'
import ModuleSelection from './moduleSelection'
import RecentChat from './recentChat'
import Profile from './profile'
import { useCollection } from "react-firebase-hooks/firestore"
import { useSession } from 'next-auth/react'
import { db } from '@/firebase'
import { collection, orderBy, query } from 'firebase/firestore'


const MenuItemsForSideBar = () => {
    const { data: session } = useSession()
    const [chats, loading, error] = useCollection(
        session &&
        query(
            collection(db, "users", session.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )

    )

    return (
        <div className=' h-full py-4 flex flex-col justify-between'>
            <div>
                {/* <ModuleSelection /> */}
                <div className='mb-4'>
                    <ModuleSelection />
                </div>

                <div>
                    <NewChat />
                </div>

                {/* map through recent chats */}
                <div className='max-h-[550px] overflow-scroll scrollbar-thin scrollbar-thumb-slate-600 scrollbar-h-16 scrollbar-thumb-rounded-lg'>
                    {
                        chats?.docs.map((chat) => (
                            <RecentChat key={chat.id} id={chat.id} />
                        ))
                    }
                </div>

            </div>

            <div >
                <Profile />
            </div>
        </div>
    )
}

export default MenuItemsForSideBar