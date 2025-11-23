import { Dialogue } from '../types';

const STORAGE_KEY_DIALOGUES = 'dramalearn_dialogues';
const STORAGE_KEY_THEME = 'dramalearn_theme';

export const getStoredDialogues = (): Dialogue[] => {
  const stored = localStorage.getItem(STORAGE_KEY_DIALOGUES);
  if (!stored) {
    // Default initial data
    return [
      {
        id: '1',
        title: 'The Office',
        original: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
        translation: "두려움의 대상이 될까, 사랑받는 대상이 될까? 쉬운 질문이야. 둘 다. 사람들이 나를 얼마나 사랑하는지 두려워했으면 좋겠어.",
        createdAt: Date.now()
      },
      {
        id: '2',
        title: 'Stranger Things',
        original: "Friends don't lie.",
        translation: "친구는 거짓말 안 해.",
        createdAt: Date.now() - 10000
      }
    ];
  }
  return JSON.parse(stored);
};

export const saveDialogues = (dialogues: Dialogue[]) => {
  localStorage.setItem(STORAGE_KEY_DIALOGUES, JSON.stringify(dialogues));
};

export const getStoredTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem(STORAGE_KEY_THEME) as 'light' | 'dark') || 'light';
};

export const saveTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem(STORAGE_KEY_THEME, theme);
};

// User Authentication Services - Dummy Implementation for UI Dev
export const registerUser = (email: string, password: string): boolean => {
  // Logic removed for backend integration later
  return true;
};

export const loginUser = (email: string, password: string): boolean => {
  // Logic removed for backend integration later
  return true;
};