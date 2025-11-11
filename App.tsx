import React, { useState, useEffect } from 'react';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import RenameChatModal from './components/RenameChatModal'; // Import the new modal
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Conversation, Message } from './types';
import { sendMessageToGemini } from './services/geminiService';

console.log('App.tsx loading...');

// --- Side Menu Component ---
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      ></div>
      {/* Panel */}
      <div className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-zinc-900 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pt-12 flex flex-col h-full text-white">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-semibold">Menu</h2>
            <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-zinc-800">
              <CloseIcon />
            </button>
          </div>
          <nav className="flex flex-col space-y-2 text-lg">
            <a href="#" className="py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors">Home</a>
            <a href="#" className="py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors">Profile</a>
            <a href="#" className="py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors">Settings</a>
            <a href="#" className="py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors">Help & Feedback</a>
          </nav>
          <div className="mt-auto">
            <a href="#" className="py-3 px-4 rounded-lg hover:bg-zinc-800 transition-colors block">Log Out</a>
          </div>
        </div>
      </div>
    </>
  );
};
// --- End Side Menu Component ---

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'chat'>('home');
  const [conversations, setConversations] = useLocalStorage<Conversation[]>('conversations', []);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);

  const handleNewChat = () => {
    const initialModelMessage: Message = {
      id: `msg-${Date.now()}-initial`,
      role: 'model',
      text: 'Hello! How can I help you today?',
    };
    const newConversation: Conversation = {
      id: `convo-${Date.now()}`,
      title: 'New Chat',
      messages: [initialModelMessage],
      createdAt: new Date().toISOString(),
      category: 'Text writer',
      suggestions: []
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
    setView('chat');
  };

  const handleOpenChat = (id: string) => {
    setActiveConversationId(id);
    setView('chat');
  };

  const handleGoHome = () => {
    setActiveConversationId(null);
    setView('home');
  };
  
  const handleSendMessage = async (messageText: string) => {
    if (!activeConversationId) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: messageText,
    };
    
    // Get history from state before optimistic update
    const conversationForApi = conversations.find(c => c.id === activeConversationId);
    if (!conversationForApi) return;
    const historyForApi = [...conversationForApi.messages, userMessage];

    const loadingMessage: Message = {
        id: `msg-${Date.now()}-loading`,
        role: 'model',
        text: '...',
        isLoading: true,
    };

    // Optimistic UI update: add user message, loading indicator, and clear old suggestions
    setConversations(prevConvos => prevConvos.map(convo => {
        if (convo.id === activeConversationId) {
            const updatedMessages = [...convo.messages, userMessage, loadingMessage];
            const isFirstUserMessage = convo.messages.every(m => m.role !== 'user');
            const newTitle = isFirstUserMessage ? messageText.substring(0, 30) : convo.title;
            return { ...convo, messages: updatedMessages, title: newTitle, suggestions: [] };
        }
        return convo;
    }));

    try {
        const { mainResponse, suggestions } = await sendMessageToGemini(historyForApi);
        
        const modelMessage: Message = {
            id: `msg-${Date.now()}`,
            role: 'model',
            text: mainResponse,
        };

        // Final UI update: replace loading indicator with model message and add new suggestions
        setConversations(prev => prev.map(convo => {
            if (convo.id === activeConversationId) {
                console.log('🔍 Receiving API response:');
                console.log('   Messages before:', convo.messages.length, 'messages');
                console.log('   Messages details:', convo.messages.map(m => `${m.role}(${m.isLoading ? 'loading' : 'done'})`).join(' → '));
                
                const messagesWithoutLoading = convo.messages.slice(0, -1);
                console.log('   After removing loading:', messagesWithoutLoading.length, 'messages');
                console.log('   Adding AI response, total:', messagesWithoutLoading.length + 1);
                
                return { ...convo, messages: [...messagesWithoutLoading, modelMessage], suggestions: suggestions };
            }
            return convo;
        }));

    } catch (error) {
        console.error("Failed to send message to Gemini:", error);
        const errorMessage: Message = {
            id: `msg-${Date.now()}-error`,
            role: 'model',
            text: "Sorry, I couldn't get a response. Please try again.",
        };
        // Error UI update: replace loading indicator with error message
        setConversations(prev => prev.map(convo => {
            if (convo.id === activeConversationId) {
                console.log('❌ Error handling:');
                console.log('   Messages before error:', convo.messages.length);
                const messagesWithoutLoading = convo.messages.slice(0, -1);
                console.log('   Keeping:', messagesWithoutLoading.length);
                return { ...convo, messages: [...messagesWithoutLoading, errorMessage], suggestions: [] };
            }
            return convo;
        }));
    }
  };

  const handleRenameConversation = (newTitle: string) => {
    if (!activeConversationId) return;
    setConversations(prev => prev.map(convo => {
      if (convo.id === activeConversationId) {
        return { ...convo, title: newTitle };
      }
      return convo;
    }));
    setIsRenameModalOpen(false);
  };

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="bg-black text-white h-screen w-screen font-sans overflow-hidden">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {activeConversation && (
        <RenameChatModal
          isOpen={isRenameModalOpen}
          currentTitle={activeConversation.title}
          onSave={handleRenameConversation}
          onClose={() => setIsRenameModalOpen(false)}
        />
      )}
      <div className="w-full max-w-3xl mx-auto h-full flex flex-col">
        {view === 'home' ? (
          <HomeScreen 
            conversations={conversations} 
            onNewChat={handleNewChat} 
            onOpenChat={handleOpenChat} 
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        ) : activeConversation ? (
          <ChatScreen 
            conversation={activeConversation} 
            onSendMessage={handleSendMessage} 
            onGoBack={handleGoHome}
            onOpenRename={() => setIsRenameModalOpen(true)} 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <button onClick={handleGoHome} className="px-4 py-2 bg-purple-600 rounded-lg">Go Home</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;