
import React, { useState, useCallback } from 'react';
import { LogoIcon } from './icons.tsx';

interface WelcomeScreenProps {
  onJoin: (username: string, roomCode: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');

  const generateRoomCode = useCallback(() => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && roomCode.trim()) {
      onJoin(username, roomCode);
    } else {
      setError('Please enter a username and a room code.');
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-slate-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900 rounded-2xl shadow-2xl">
        <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
                <LogoIcon className="h-10 w-10 text-cyan-400" />
                <h1 className="text-3xl font-bold text-slate-100">Ephemeral Chat</h1>
            </div>
          <p className="text-slate-400">Join a room or create a new one.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleJoin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 bg-slate-800 text-slate-100 placeholder-slate-500 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="room-code" className="sr-only">Room Code</label>
              <input
                id="room-code"
                name="room-code"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 bg-slate-800 text-slate-100 placeholder-slate-500 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
            </div>
          </div>

           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={generateRoomCode}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors"
            >
              Create Room
            </button>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;