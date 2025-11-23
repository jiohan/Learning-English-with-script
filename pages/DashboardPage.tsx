import React, { useState } from 'react';
import { Dialogue } from '../types';

interface DashboardPageProps {
  dialogues: Dialogue[];
  onAddDialogue: (dialogue: Omit<Dialogue, 'id' | 'createdAt'>) => void;
  onDeleteDialogue: (id: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ dialogues, onAddDialogue, onDeleteDialogue }) => {
  const [title, setTitle] = useState('');
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !original.trim() || !translation.trim()) return;
    
    onAddDialogue({
      title,
      original,
      translation
    });

    setTitle('');
    setOriginal('');
    setTranslation('');
  };

  return (
    <div className="animate-fadeIn">
      <section className="mb-12 md:mb-16">
        <div className="flex flex-col gap-2 mb-8 text-center">
          <h1 className="text-text-light dark:text-white text-3xl md:text-4xl font-display font-bold tracking-tight">대사 학습 및 등록</h1>
          <p className="text-text-light/80 dark:text-text-dark/80 text-base leading-relaxed">학습하고 싶은 드라마 대사를 등록하고 관리하세요.</p>
        </div>
        
        <div className="space-y-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark p-6 md:p-8 rounded-lg shadow-sm">
          <div className="space-y-2">
            <label htmlFor="drama-title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">드라마 제목</label>
            <input 
              id="drama-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary h-10" 
              placeholder="예: Friends"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="original-dialogue" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">대사 원문</label>
            <textarea 
              id="original-dialogue" 
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="예: How you doin'?"
            ></textarea>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="translation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">해석</label>
            <textarea 
              id="translation" 
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary" 
              placeholder="예: 어떻게 지내?"
            ></textarea>
          </div>
          
          <div className="flex justify-end pt-2">
            <button 
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span>대사 추가</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="border-b border-border-light dark:border-border-dark pb-4 mb-8">
          <h2 className="text-text-light dark:text-white text-2xl font-display font-bold tracking-tight">나의 대사 목록</h2>
        </div>
        
        <div className="space-y-4">
          {dialogues.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 text-center p-12">
              <span className="material-symbols-outlined text-5xl text-text-light/40 dark:text-text-dark/40 mx-auto">forum</span>
              <h3 className="mt-4 text-lg font-medium text-text-light dark:text-text-dark">아직 등록된 대사가 없습니다.</h3>
              <p className="mt-1 text-base text-text-light/80 dark:text-text-dark/80">위 양식을 사용해 첫 대사를 추가해 보세요.</p>
            </div>
          ) : (
            dialogues.map((dialogue) => (
              <div key={dialogue.id} className="rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 transition-all hover:shadow-md hover:border-primary/50">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-display font-semibold text-primary">{dialogue.title}</h3>
                  <div className="flex items-center gap-1 text-text-light/70 dark:text-text-dark/70">
                    <button className="flex items-center justify-center size-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button 
                      onClick={() => onDeleteDialogue(dialogue.id)}
                      className="flex items-center justify-center size-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-red-500 hover:text-red-600"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <p className="text-sm font-medium text-text-light/60 dark:text-text-dark/60 mb-1">Original</p>
                    <p className="text-base text-text-light dark:text-text-dark leading-relaxed">"{dialogue.original}"</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-light/60 dark:text-text-dark/60 mb-1">Translation</p>
                    <p className="text-base text-text-light dark:text-text-dark leading-relaxed">"{dialogue.translation}"</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
