import React, { useEffect, useRef, useState } from "react";
import dummyChats from "../../utils/DummyData";
import ChatItem from "./ChatItem";
import NewChatModal from "./NewChatModal";
import NewGroupModal from "./NewGroupModal";

export default function ChatList(){
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  const handleChatClick = (chat) => {
      console.log('Chat selected:', chat);
      // setActiveChat(chat); // you can store in Zustand or local state
  };

  const filteredChats = dummyChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClear = () => setSearchTerm('');

  return(
      <div className="flex flex-col h-full bg-gray-100">
          <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-gray-700 cursor-default">Chats</h2>
          {/* + Icon Dropdown */}
          <div className="relative" ref={dropdownRef}>
              {/* Toggle Button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-9 h-9 flex items-center justify-center border rounded-lg text-lg font-bold text-gray-600 hover:bg-gray-200"
              >
                +
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow z-20 p-1">
                  <button
                    onClick={() => {setShowNewChatModal(true)
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                  >
                    New Chat
                  </button>
                  <button
                    onClick={() => {
                      setShowNewGroupModal(true);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                  >
                    New Group
                  </button>
                </div>
              )}
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative p-3">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-3 pr-9 rounded bg-gray-200 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500 hover:text-black text-lg"
            >
              &times;
            </button>
          )}
        </div>

        {/* Chat Items */}
        <div className="overflow-y-auto flex-1">
          {filteredChats.length > 0 ? (
              filteredChats.map((chat) => <ChatItem key={chat.id} chat={chat} />)
            ) : (
              <p className="text-center text-gray-500 mt-4">No chats found</p>
          )}
        </div>
        {showNewChatModal && <NewChatModal onClose={() => setShowNewChatModal(false)} />}
        {showNewGroupModal && <NewGroupModal onClose={() => setShowNewGroupModal(false)} />}
      </div>

  )
}