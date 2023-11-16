import React from 'react'
import Messages from "@/components/views/messages" 
import ChatInput from "@/components/views/chatInput"

interface Props {
  params:{
    id: string
  }
}

const ChatPage = ({params:{id}}:Props) => {

  return (
    <div className='flex flex-col h-screen'>
      {/* All messages in a current chat  */}
      <Messages chatId={id}/>


      {/* Input */}
      <ChatInput chatId={id}/>

    </div>
  )
}

export default ChatPage