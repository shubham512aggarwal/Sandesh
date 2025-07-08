import React, { useState, useEffect } from 'react';

export default function NewChatModal({ onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
        const res = await fetch(`https://localhost:7175/auth/search-users?query=${searchTerm}`);
        const data = await res.json();
        setUserResults(data);
        } catch (error) {
        console.error('Search failed', error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
        handleSearch();
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    const handleStartChat = (userId) => {
        console.log('Start chat with userId:', userId);
        onClose();
        // TODO: Navigate to /chat/:userId or call API to create chat room if not exists
    };

    return (
    <div className="fixed inset-0 bg-[#000000a8] bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-96 max-w-full rounded-lg shadow-lg p-5 relative">
        <h2 className="text-lg font-bold mb-4">Start New Chat</h2>

        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name, phone or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {loading ? (
          <p className="text-center text-sm text-gray-500">Searching...</p>
        ) : userResults.length === 0 && searchTerm ? (
          <p className="text-center text-sm text-gray-400">No users found</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {userResults.map((user) => (
              <li
                key={user.id}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleStartChat(user.id)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePic || 'https://i.pravatar.cc/40'}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className="text-sm text-blue-500 font-medium">Start</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
