
import React, { useState, useCallback, useEffect } from 'react';
import { Message } from '../types.ts';
import UserList from './UserList.tsx';
import MessageList from './MessageList.tsx';
import MessageInput from './MessageInput.tsx';
import { getAIResponse } from '../services/geminiService.ts';

interface ChatRoomProps {
  username: string;
  roomCode: string;
  onLeave: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ username, roomCode, onLeave }) => {
  // In a real application, users would come from a backend service.
  // Here we simulate it with the current user and a bot.
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  
  useEffect(() => {
    setUsers([username, 'AI Assistant']);
    setMessages([{
        id: Date.now(),
        user: 'System',
        text: `Welcome ${username}! You've joined room ${roomCode}. Try asking the AI Assistant a question by starting your message with '@ai'.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }, [username, roomCode]);

  const handleSendMessage = useCallback(async (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      user: username,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);

    if (text.toLowerCase().startsWith('@ai ')) {
      setIsAiTyping(true);
      const prompt = text.substring(4);
      const aiResponse = await getAIResponse(prompt);
      const aiMessage: Message = {
        id: Date.now() + 1,
        user: 'AI Assistant',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);
    }
  }, [username]);

  return (
    <div className="flex h-full bg-slate-800">
      <UserList users={users} roomCode={roomCode} onLeave={onLeave} />
      <div className="flex flex-col flex-1">
        <MessageList messages={messages} currentUser={username} isAiTyping={isAiTyping} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;