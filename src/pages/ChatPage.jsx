import React from "react"
import ChatList from "../components/chat/ChatList"
import ChatWindow from "../components/chat/ChatWindow"

export default function ChatPage(){
    return(
        <div className="h-screen flex">
            <div className="w-1/4 border-r border-gray-300 bg-white overflow-y-auto">
                <ChatList/>
            </div>

            <div className="w-3/4 bg-gray-50 flex flex-col">
                <ChatWindow/>
            </div>
        </div>
    )
}