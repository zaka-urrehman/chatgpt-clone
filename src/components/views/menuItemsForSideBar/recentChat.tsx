/* This component displays recent chats based on the Id provided
 by its parent component where it is mapped */
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BiMessageSquareDetail, BiSolidTrash } from 'react-icons/bi'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore"
import { db } from "@/firebase"

interface props {
  id: string,
}

const RecentChat = ({ id }: props) => {

  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const [active, setActive] = useState(false)

  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")  
  )

  useEffect(() => {
    if (!pathname) return
    setActive(pathname.includes(id))
  }, [pathname])


 const removeChat = async()=>{
  await deleteDoc(doc(db, "users" , session?.user?.email!, "chats" , id))
  router.replace("/")
 }

  return (
    <Link href={`/chat/${id}`} className={``}>
      <div className={`recent-chat-box ${active ? "bg-gray-500" : "bg-gray-800"}`}>
        <BiMessageSquareDetail size={20} />
        <p className='w-[200px]  p-2 overflow-hidden truncate'>
          {messages?.docs[messages.docs.length - 1]?.data().text || " New Chat "}
        </p>
        <BiSolidTrash size={20} onClick={removeChat}/>
      </div>

    </Link>
  )
}

export default RecentChat