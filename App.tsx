
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import ChatRoom from './components/ChatRoom.tsx';

type AppState = 'welcome' | 'chat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [username, setUsername] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('');

  const handleJoin = useCallback((name: string, code: string) => {
    setUsername(name.trim());
    setRoomCode(code.trim().toUpperCase());
    setAppState('chat');
  }, []);

  const handleLeave = useCallback(() => {
    setUsername('');
    setRoomCode('');
    setAppState('welcome');
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col antialiased">
      {appState === 'welcome' ? (
        <WelcomeScreen onJoin={handleJoin} />
      ) : (
        <ChatRoom username={username} roomCode={roomCode} onLeave={handleLeave} />
      )}
    </div>
  );
};

export default App;