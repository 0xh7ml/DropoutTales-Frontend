// context/AppContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  upvotes: number;
  downvotes: number;
}

interface AppContextType {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <AppContext.Provider value={{ comments, setComments }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
