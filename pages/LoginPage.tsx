import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/storageService';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (loginUser(email, password)) {
      onLogin();
      navigate('/app');
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark font-sans">
      <header className="w-full absolute top-0 left-0 z-10 bg-transparent">
        <nav className="w-full px-6 md:px-12 lg:px-24 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <span className="material-symbols-outlined text-gray-800 dark:text-gray-200 text-4xl">movie_filter</span>
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">DramaLearn</span>
            </Link>
            <div className="flex items-center space-x-8">
              <button className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent border-none cursor-pointer hidden sm:block">소개</button>
              <button className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent border-none cursor-pointer hidden sm:block">기능</button>
              <Link to="/signup" className="px-6 py-2.5 text-base font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm">회원가입</Link>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-grow">
        <section className="relative w-full h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[#C8A995] opacity-20 z-0"></div>
          <div className="absolute inset-0 z-[-1] bg-cover bg-center filter blur-[2px] scale-105" style={{ backgroundImage: 'url(https://picsum.photos/id/366/1920/1080)' }}></div>
          
          <div className="relative w-full h-full px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
            <div className="text-left z-10">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                해외 드라마로<br />영어 학습의 시작
              </h1>
              <p className="mt-8 max-w-xl text-xl text-gray-800 dark:text-gray-100 font-medium drop-shadow-md leading-relaxed">
                좋아하는 드라마, 영화의 명대사로 살아있는 영어를 배우세요. <br className="hidden md:block"/>DramaLearn이 당신의 영어 학습을 즐겁게 만들어 드립니다.
              </p>
            </div>
            
            <div className="w-full max-w-md lg:justify-self-end z-10">
              <div className="bg-white dark:bg-gray-800 bg-opacity-95 dark:bg-opacity-95 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">로그인</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">이메일</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-[#A98964] focus:ring-[#A98964] sm:text-sm p-3 border transition-colors" 
                      placeholder="you@example.com" 
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">비밀번호</label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-[#A98964] focus:ring-[#A98964] sm:text-sm p-3 border transition-colors" 
                      placeholder="••••••••" 
                      required
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#A98964] focus:ring-[#A98964]" />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">로그인 유지</label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="font-medium text-[#A98964] hover:text-[#8c7050]">비밀번호를 잊으셨나요?</a>
                    </div>
                  </div>
                  
                  <div>
                    <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#A98964] hover:bg-[#8c7050] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A98964] transition-all transform hover:-translate-y-0.5">
                      로그인
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 absolute bottom-0 w-full z-10">
        <div className="w-full px-6 md:px-12 lg:px-24 py-6 text-left text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2024 DramaLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};