import React from "react";
import dummyChats from "../../utils/DummyData";
import ChatItem from "./ChatItem";

export default function ChatList(){

    const handleChatClick = (chat) => {
        console.log('Chat selected:', chat);
        // setActiveChat(chat); // you can store in Zustand or local state
    };

    return(
        <div className="flex flex-col h-full bg-gray-100">
            <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold text-gray-700">Chats</h2>
        <button className="text-sm text-blue-600 hover:underline">New Chat</button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 rounded bg-gray-200 focus:outline-none"
        />
      </div>

      {/* Chat Items */}
      <div className="overflow-y-auto flex-1">
        {dummyChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} onClick={handleChatClick} />
        ))}
      </div>
        </div>
    )
}