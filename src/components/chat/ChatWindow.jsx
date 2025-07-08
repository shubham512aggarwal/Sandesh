import React, { useRef, useState } from 'react';
import MessageInput from './MessageInput';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?  cvcxvxcvxcvjhxcvh xcljvhx hjh jvxv   dhg hgf hfghfghdf dgh dfh dh dfgh fg df gfgh fg hdf hgfhfdhdg hfg hdhdfgh df hf gf hdghfdh dfghnvbn ch?', sender: 'them', time: '10:30 AM' },
    { id: 2, text: 'I’m good! What about you', sender: 'me', time: '10:31 AM' },
    { id: 3, text: 'Same here! Ready for our meeting?', sender: 'them', time: '10:32 AM' },
  ]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomImage, setZoomImage] = useState(false);
  const messageRef = useRef(null);
  
  const phoneNumber = '+919876543210'; // Replace with actual phone number

  const highlightText = (text) =>{
    if(!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, `gi`);
    return text.split(regex).map((part, i) => 
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={i} className='bg-yellow-300'>{part}</span>
        ):
        (part)
    );
  }

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 shadow-sm border-b border-gray-300">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="User"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setZoomImage(true)}
          />
          <div className='cursor-default'>
            <h4 className="text-sm font-semibold">Shubham Sharma</h4>
            <p className="text-xs text-gray-500 text-left">Online</p>
          </div>
        </div>

        <div className="flex gap-6 text-gray-600 items-center relative">            

          {/* Phone Icon */}
          <a href={`tel:${phoneNumber}`} title="Call User">
            <i className="ri-phone-line text-xl"></i>
          </a>
          {/* Search Dropdown */}
          <div className="relative">
            <button onClick={() => setSearchOpen((prev) => !prev)} title="Search">
              <i className="ri-search-line text-xl"></i>
            </button>
            {searchOpen && (
              <div className="absolute bg-white p-3 right-0 rounded shadow-md top-14 w-72 z-10">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search messages"
                    className="w-full p-1 outline-0 rounded text-sm"
                  />
                  <button onClick={() => {setSearchTerm(''); setSearchOpen(false)} }>
                    <i className="ri-close-line text-xl text-gray-500 hover:text-black cursor-pointer"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div ref={messageRef} className="flex-1 overflow-y-auto px-4 py-3 bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 max-w-[40%] px-4 py-2 rounded-lg text-sm ${
              msg.sender === 'me'
                ? 'bg-[#3e7743] text-white ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-left">{highlightText(msg.text)}</p>
            <span className="block text-[10px] text-right text-gray-300 mt-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <MessageInput
        onSend={(text) => {
          const newMsg = {
            id: messages.length + 1,
            text,
            sender: 'me',
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages((prev) => [...prev, newMsg]);
        }}
      />

      {/* Zoom Image Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 bg-[#000000a8] bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setZoomImage(false)}
        >
          <img
            src="https://i.pravatar.cc/150?img=1"
            alt="Zoomed"
            className="w-72 h-72 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
