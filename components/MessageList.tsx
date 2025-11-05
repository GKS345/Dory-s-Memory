
import React, { useEffect, useRef } from 'react';
import { Message } from '../types.ts';
import { BotIcon, UserCircleIcon } from './icons.tsx';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
  isAiTyping: boolean;
}

const MessageBubble: React.FC<{ message: Message; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => {
  const isSystem = message.user === 'System';
  const isAI = message.user === 'AI Assistant';

  if (isSystem) {
    return (
      <div className="text-center my-2">
        <span className="text-xs text-slate-500 bg-slate-700 px-3 py-1 rounded-full">{message.text}</span>
      </div>
    );
  }

  const alignment = isCurrentUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isCurrentUser ? 'bg-cyan-600' : 'bg-slate-700';
  const textColor = 'text-slate-100';

  return (
    <div className={`flex items-end gap-2 ${alignment} my-2`}>
      {!isCurrentUser && (
        <div className="flex-shrink-0">
          {isAI ? <BotIcon className="w-8 h-8 text-green-400" /> : <UserCircleIcon className="w-8 h-8 text-slate-500" />}
        </div>
      )}
      <div className={`max-w-md lg:max-w-2xl px-4 py-2 rounded-xl ${bubbleColor}`}>
        <div className="flex items-baseline gap-2">
          {!isCurrentUser && <p className="font-bold text-sm text-slate-300">{message.user}</p>}
          <p className="text-xs text-slate-400">{message.timestamp}</p>
        </div>
        <p className={`text-sm ${textColor} whitespace-pre-wrap`}>{message.text}</p>
      </div>
    </div>
  );
};

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser, isAiTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAiTyping]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.user === currentUser} />
      ))}
      {isAiTyping && (
        <div className="flex items-end gap-2 justify-start my-2">
          <div className="flex-shrink-0">
             <BotIcon className="w-8 h-8 text-green-400" />
          </div>
          <div className="px-4 py-3 rounded-xl bg-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;