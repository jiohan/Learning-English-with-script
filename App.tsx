import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListPage } from './pages/ListPage';
import { Layout } from './components/Layout';
import { getStoredDialogues, saveDialogues, getStoredTheme, saveTheme, isUserLoggedIn, logoutUser } from './services/storageService';
import { Dialogue } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [darkMode, setDarkMode] = useState(false);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);

  useEffect(() => {
    // Load initial state
    const theme = getStoredTheme();
    setDarkMode(theme === 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setDialogues(getStoredDialogues());
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      saveTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      saveTheme('light');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };

  const handleAddDialogue = (newDialogue: Omit<Dialogue, 'id' | 'createdAt'>) => {
    const dialogue: Dialogue = {
      ...newDialogue,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    const updated = [dialogue, ...dialogues];
    setDialogues(updated);
    saveDialogues(updated);
  };

  const handleDeleteDialogue = (id: string) => {
    const updated = dialogues.filter(d => d.id !== id);
    setDialogues(updated);
    saveDialogues(updated);
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/app/*" element={
          isLoggedIn ? (
            <Layout darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={
                  <ListPage dialogues={dialogues} />
                } />
                <Route path="/add" element={
                  <DashboardPage 
                    dialogues={dialogues.slice(0, 5)} // Show recent 5 in dashboard
                    onAddDialogue={handleAddDialogue}
                    onDeleteDialogue={handleDeleteDialogue}
                  />
                } />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;