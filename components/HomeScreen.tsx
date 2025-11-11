import React from 'react';
import type { Conversation, ConversationCategory } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ArrowUpRightIcon } from './icons/ArrowUpRightIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { CodeIcon } from './icons/CodeIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { ImageIcon } from './icons/ImageIcon';

interface HomeScreenProps {
  conversations: Conversation[];
  onNewChat: () => void;
  onOpenChat: (id: string) => void;
  onOpenMenu: () => void;
}

const CategoryIcon: React.FC<{ category: ConversationCategory }> = ({ category }) => {
    const iconProps = { className: "w-5 h-5" };
    switch (category) {
        case 'Code tutor':
            return <CodeIcon {...iconProps} />;
        case 'Text writer':
            return <SparklesIcon {...iconProps} />;
        case 'Image generator':
            return <ImageIcon {...iconProps} />;
        default:
            return <SparklesIcon {...iconProps} />;
    }
};

const HomeScreen: React.FC<HomeScreenProps> = ({ conversations, onNewChat, onOpenChat, onOpenMenu }) => {
  return (
    <div className="h-full flex flex-col bg-black text-white pt-12 px-4 pb-4 overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <button onClick={onOpenMenu} className="p-2 rounded-full bg-zinc-800">
          <MenuIcon />
        </button>
      </header>
      
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-br from-purple-900 via-pink-700 to-black opacity-30 blur-3xl -z-10"></div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">Paediatric</h1>
        <h1 className="text-4xl font-bold tracking-tight">Clinical Companion</h1>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          placeholder="Search..."
          className="w-full bg-zinc-800/80 border border-zinc-700 rounded-full py-3 pl-12 pr-4 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Action Boxes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div onClick={onNewChat} className="bg-zinc-900/70 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between cursor-pointer hover:bg-zinc-800 transition-colors">
          <h2 className="font-semibold">New chat</h2>
          <div className="self-end">
            <ArrowUpRightIcon />
          </div>
        </div>
        <div className="bg-zinc-900/70 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between cursor-pointer hover:bg-zinc-800 transition-colors">
          <h2 className="font-semibold">New image</h2>
          <div className="self-end">
            <ArrowUpRightIcon />
          </div>
        </div>
      </div>
      
      {/* History */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">History</h3>
          <button className="text-sm text-zinc-400">See all</button>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            {conversations.length > 0 ? (
                <ul className="space-y-2">
                    {conversations.map(convo => (
                    <li key={convo.id} onClick={() => onOpenChat(convo.id)} className="flex items-center justify-between p-3 bg-zinc-900/70 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex-shrink-0">
                                <CategoryIcon category={convo.category} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-medium truncate max-w-48 md:max-w-md">{convo.title}</p>
                                {(() => {
                                    // Find the last message that isn't a loading indicator and has content
                                    const lastMessage = [...convo.messages].reverse().find(m => !m.isLoading && m.text.trim());
                                    const subtitleText = lastMessage ? `${lastMessage.role === 'user' ? 'You: ' : ''}${lastMessage.text}` : 'Chat started';
                                    return <p className="text-xs text-zinc-400 truncate">{subtitleText}</p>;
                                })()}
                            </div>
                        </div>
                        <ChevronRightIcon />
                    </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center text-zinc-500 py-10">
                    No history yet. Start a new chat to begin!
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;