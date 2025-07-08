import React, { useState, useEffect } from 'react';

export default function NewGroupModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState('');

  // 🔍 Fetch users based on search term
  useEffect(() => {
    if (!searchTerm.trim()) return;
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`https://localhost:7175/auth/search-users?query=${searchTerm}`);
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const toggleSelect = (user) => {
    setSelectedUsers((prev) =>
      prev.find((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length < 2) {
      alert('Enter group name & select at least 2 members');
      return;
    }
    const dto = {
      name: groupName,
      memberIds: selectedUsers.map((u) => u.id),
      imageUrl: groupImage || null,
    };
    try {
      const res = await fetch(`https://localhost:7175/chat/create-group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      const data = await res.json();
      onClose();
      // 🔁 Navigate to chat window of new group (if using router)
      window.location.href = `/chat/${data.groupId}`;
    } catch (error) {
      console.error('Group creation failed', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000a8] bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-[400px] max-w-full rounded-lg shadow-lg p-5 relative">
        <button
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Select Group Members</h2>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <div className="max-h-60 overflow-y-auto space-y-2">
              {allUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
                    selectedUsers.find((u) => u.id === user.id)
                      ? 'bg-blue-100'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleSelect(user)}
                >
                  <div className="flex items-center gap-2">
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
                  <input
                    type="checkbox"
                    readOnly
                    checked={!!selectedUsers.find((u) => u.id === user.id)}
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Group Info</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={groupImage}
              onChange={(e) => setGroupImage(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
