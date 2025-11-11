import React, { useState, useEffect } from 'react';

interface RenameChatModalProps {
  isOpen: boolean;
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onClose: () => void;
}

const RenameChatModal: React.FC<RenameChatModalProps> = ({ isOpen, currentTitle, onSave, onClose }) => {
  const [title, setTitle] = useState(currentTitle);

  useEffect(() => {
    if (isOpen) {
      setTitle(currentTitle);
    }
  }, [isOpen, currentTitle]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rename-modal-title"
    >
      <div 
        className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="rename-modal-title" className="text-lg font-semibold mb-4 text-white">Rename Chat</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-zinc-800 border border-zinc-600 rounded-lg py-2 px-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          placeholder="Enter new chat name"
          aria-label="New chat name"
          autoFocus
        />
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50"
            disabled={!title.trim() || title.trim() === currentTitle}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenameChatModal;