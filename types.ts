export type Role = 'user' | 'model';

export interface Message {
  id: string;
  role: Role;
  text: string;
  isLoading?: boolean;
}

export type ConversationCategory = 'Code tutor' | 'Text writer' | 'Image generator';

export interface Conversation {
  id:string;
  title: string;
  messages: Message[];
  createdAt: string;
  category: ConversationCategory;
  suggestions?: string[];
}
