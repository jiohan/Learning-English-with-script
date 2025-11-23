import React, { useState, useMemo } from 'react';
import { Dialogue } from '../types';

interface ListPageProps {
  dialogues: Dialogue[];
}

export const ListPage: React.FC<ListPageProps> = ({ dialogues }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDialogues = useMemo(() => {
    if (!searchTerm) return dialogues;
    const lower = searchTerm.toLowerCase();
    return dialogues.filter(d => 
      d.title.toLowerCase().includes(lower) || 
      d.original.toLowerCase().includes(lower) || 
      d.translation.toLowerCase().includes(lower)
    );
  }, [dialogues, searchTerm]);

  return (
    <div className="animate-fadeIn">
      <section className="mb-12 md:mb-16">
        <div className="flex flex-col gap-2 mb-8 text-center">
          <h1 className="text-text-light dark:text-white text-3xl md:text-4xl font-display font-bold tracking-tight">대사 목록</h1>
          <p className="text-text-light/80 dark:text-text-dark/80 text-base leading-relaxed">등록된 드라마 대사를 검색하고 학습하세요.</p>
        </div>
        
        <div className="relative max-w-xl mx-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-light/50 dark:text-text-dark/50">search</span>
          <input 
            id="search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex w-full rounded-md border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-light/50 dark:placeholder:text-text-dark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary h-12 pl-10" 
            placeholder="드라마 제목, 대사 내용으로 검색..."
          />
        </div>
      </section>

      <section>
        <div className="space-y-4">
          {filteredDialogues.length === 0 ? (
             <div className="rounded-lg border-2 border-dashed border-border-light dark:border-border-dark bg-card-light/50 dark:bg-card-dark/50 text-center p-12">
             <span className="material-symbols-outlined text-5xl text-text-light/40 dark:text-text-dark/40 mx-auto">search_off</span>
             <h3 className="mt-4 text-lg font-medium text-text-light dark:text-text-dark">검색 결과가 없습니다.</h3>
             <p className="mt-1 text-base text-text-light/80 dark:text-text-dark/80">다른 검색어를 입력해보세요.</p>
           </div>
          ) : (
            filteredDialogues.map((dialogue) => (
              <details key={dialogue.id} className="group">
                <summary className="cursor-pointer rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 transition-all hover:shadow-md hover:border-primary/50 group-open:rounded-b-none group-open:border-b-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 overflow-hidden">
                      <h3 className="text-lg font-display font-semibold text-primary whitespace-nowrap">{dialogue.title}</h3>
                      <p className="text-base text-text-light dark:text-text-dark line-clamp-1 truncate opacity-90">"{dialogue.original}"</p>
                    </div>
                    <span className="material-symbols-outlined text-text-light/70 dark:text-text-dark/70 transition-transform group-open:rotate-180 shrink-0">expand_more</span>
                  </div>
                </summary>
                <div className="rounded-b-lg border border-t-0 border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 animate-slideDown">
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
              </details>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
