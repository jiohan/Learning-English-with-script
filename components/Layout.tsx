import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleTheme, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative flex min-h-screen w-full flex-col font-serif-kr">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light dark:border-border-dark px-4 sm:px-6 md:px-10 py-4 bg-background-light/80 dark:bg-background-dark/80 sticky top-0 z-20 backdrop-blur-sm">
        <Link to="/app" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="size-7 text-primary">
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <h2 className="font-display text-text-light dark:text-white text-xl font-semibold tracking-tight hidden sm:block">
            Drama Dialogue Note
          </h2>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1 mr-2">
            <Link 
              to="/app" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/app') ? 'bg-primary text-white' : 'text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              목록
            </Link>
            <Link 
              to="/app/add" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/app/add') ? 'bg-primary text-white' : 'text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              등록
            </Link>
          </nav>

          <div className="h-6 w-px bg-border-light dark:bg-border-dark mx-1"></div>

          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 h-9 w-9"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined text-xl">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 h-9 w-9"
            aria-label="Logout"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
          </button>
        </div>
      </header>
      <main className="flex-1 px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          {children}
        </div>
      </main>
    </div>
  );
};