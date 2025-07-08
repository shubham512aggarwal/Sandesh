import React from "react";

export default function ChatItem({ chat, onClick }) {
  return (
    <div
      onClick={() => onClick?.(chat)}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 cursor-pointer"
    >
      {/* Profile Picture */}
      <img
        src={chat.profilePic}
        alt={chat.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Chat Info */}
      <div className="flex-1">
        {/* Top Row: Name + Time */}
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-medium text-gray-800">{chat.name}</h4>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>

        {/* Bottom Row: Message + Unread Count */}
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-600 truncate max-w-[180px]">
            {chat.lastMessage}
          </p>

          {chat.unread > 0 && (
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}