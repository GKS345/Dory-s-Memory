
import React from 'react';
import { UsersIcon, HashIcon, LogoutIcon, UserCircleIcon, BotIcon } from './icons.tsx';

interface UserListProps {
  users: string[];
  roomCode: string;
  onLeave: () => void;
}

const UserList: React.FC<UserListProps> = ({ users, roomCode, onLeave }) => {
  return (
    <aside className="w-64 bg-slate-900 flex flex-col p-4 border-r border-slate-700">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-100">Ephemeral Chat</h1>
        <div className="flex items-center text-cyan-400 mt-2">
            <HashIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold text-lg">{roomCode}</span>
        </div>
      </div>

      <div className="flex items-center mb-4 text-slate-400">
        <UsersIcon className="w-5 h-5 mr-2" />
        <h2 className="text-sm font-bold uppercase tracking-wider">Users ({users.length})</h2>
      </div>

      <ul className="flex-1 space-y-3 overflow-y-auto pr-2">
        {users.map((user, index) => (
          <li key={index} className="flex items-center space-x-3 text-slate-300">
            {user === 'AI Assistant' ? <BotIcon className="w-8 h-8 text-green-400" /> : <UserCircleIcon className="w-8 h-8 text-slate-500" />}
            <span className="font-medium">{user}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onLeave}
        className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
      >
        <LogoutIcon className="w-5 h-5 mr-2" />
        Leave Room
      </button>
    </aside>
  );
};

export default UserList;