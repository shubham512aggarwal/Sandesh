import React, { useState } from 'react';

export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-100 border-t border-gray-300 flex items-center gap-3">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 p-2 rounded-full bg-gray-100 outline-0"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-1.5 rounded-full hover:bg-blue-600"
      >Send</button>
    </div>
  );
}
