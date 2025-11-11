import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, Message } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { SendIcon } from './icons/SendIcon';
import { MicIcon } from './icons/MicIcon';
import { marked } from 'marked';

interface ChatScreenProps {
  conversation: Conversation;
  onSendMessage: (messageText: string) => void;
  onGoBack: () => void;
  onOpenRename: () => void;
}

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.role === 'user';
    
    if (message.isLoading) {
        return (
            <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg bg-zinc-800 text-white rounded-bl-none">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        );
    }
    
    const content = isUser ? message.text : marked.parse(message.text) as string;

    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`px-4 py-3 rounded-2xl max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl ${isUser ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-br-none' : 'bg-zinc-800 text-white rounded-bl-none'}`}>
          {isUser ? (
             <div className="whitespace-pre-wrap break-words">{message.text}</div>
          ) : (
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
    );
};

const SuggestedReplies: React.FC<{ suggestions: string[], onSend: (text: string) => void }> = ({ suggestions, onSend }) => {
    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    return (
        <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-2 py-1">
                {suggestions.map((text, index) => (
                    <button
                        key={index}
                        onClick={() => onSend(text)}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-full transition-colors ${
                            index === 0 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                            : 'bg-zinc-800 hover:bg-zinc-700'
                        }`}
                    >
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
};


const ChatScreen: React.FC<ChatScreenProps> = ({ conversation, onSendMessage, onGoBack, onOpenRename }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [inputText]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleSuggestedSend = (text: string) => {
    onSendMessage(text);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0">
        <button onClick={onGoBack} className="p-2 -ml-2 rounded-full hover:bg-zinc-800">
          <ChevronLeftIcon />
        </button>
        <div className="text-center cursor-pointer" onClick={onOpenRename}>
            <h1 className="text-lg font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg">{conversation.title === 'New Chat' ? 'Paediatric clinical companion' : conversation.title}</h1>
            <p className="text-xs text-zinc-400">{conversation.title === 'New Chat' ? 'New Chat' : conversation.category}</p>
        </div>
        <button onClick={onOpenRename} className="p-2 -mr-2 rounded-full hover:bg-zinc-800">
          <MoreHorizontalIcon />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map(msg => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions and Input */}
      <footer className="shrink-0">
        <SuggestedReplies suggestions={conversation.suggestions || []} onSend={handleSuggestedSend} />
        <div className="p-4 border-t border-zinc-800">
            <div className="flex items-end bg-zinc-900 border border-zinc-700 rounded-2xl p-2">
                <button className="p-2 text-zinc-400 hover:text-white self-center">
                    <PlusCircleIcon />
                </button>
                <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    className="flex-1 bg-transparent px-2 text-white placeholder-zinc-400 focus:outline-none resize-none"
                    rows={1}
                    style={{maxHeight: '120px'}}
                />
                <button className="p-2 text-zinc-400 hover:text-white self-center">
                    <MicIcon />
                </button>
                <button
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className="p-2 rounded-full bg-purple-600 text-white disabled:bg-zinc-700 disabled:text-zinc-400 transition-colors self-center"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatScreen;