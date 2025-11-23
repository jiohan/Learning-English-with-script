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

        {/* Features Section */}
        <section className="py-24 bg-white dark:bg-background-dark relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Text Content */}
              <div className="flex-1 space-y-8 z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                  Smart Learning
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight font-display">
                  드라마에 나오는 대사들을<br/>
                  <span className="text-primary">가장 빠르고 정확하게.</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  인상 깊었던 드라마 속 그 대사, 이젠 DramaLearn에서.<br/>
                  DramaLearn은 당신이 좋아하는 대사를 기록하고,<br/>
                  다른 사람이 기록한 대사를 통해서<br/>
                  언제든 쉽게 공부할 수 있는 보물창고입니다.
                </p>
                
                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                      <span className="material-symbols-outlined text-2xl">edit_note</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">간편한 배움</h3>
                      <p className="text-gray-600 dark:text-gray-400">드라마 제목, 원문, 해석을 직관적인 UI로 빠르게 배워보세요.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <span className="material-symbols-outlined text-2xl">style</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">학습과 활용</h3>
                      <p className="text-gray-600 dark:text-gray-400">학습한 내용을 회화 속에서 사용해보세요.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Content */}
              <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl opacity-50"></div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {/* Browser Mockup Header */}
                  <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="ml-4 bg-white dark:bg-gray-800 rounded-md px-3 py-1 text-xs text-gray-400 flex-1 text-center font-mono">dramalearn.app/list</div>
                  </div>
                  {/* Feature Preview Image */}
                  <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-900 relative group">
                    <img 
                      src="/feature-preview.png" 
                      alt="App Dashboard Preview" 
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <p className="text-white font-medium">나만의 대사 리스트를 만들어보세요</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-16 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark overflow-hidden">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-display">Learn with your favorite shows</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">다양한 미드와 영화로 영어를 마스터하세요</p>
          </div>
          
          <div className="relative w-full flex overflow-hidden mask-linear-gradient">
            <div className="flex animate-scroll hover:pause gap-6 px-3 min-w-full">
              {[
                { title: "Friends", color: "bg-orange-500" },
                { title: "The Office", color: "bg-blue-500" },
                { title: "Big Bang Theory", color: "bg-red-500" },
                { title: "Young Sheldon", color: "bg-yellow-500" },
                { title: "Brooklyn 99", color: "bg-indigo-500" },
                { title: "HIMYM", color: "bg-purple-500" },
                { title: "Modern Family", color: "bg-green-500" },
                { title: "Sherlock", color: "bg-slate-600" },
                { title: "Suits", color: "bg-gray-800" },
                { title: "Stranger Things", color: "bg-red-800" },
              ].map((show, i) => (
                <div key={i} className="flex-shrink-0 w-48 h-72 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer transform transition-transform hover:scale-105">
                  <div className={`w-full h-full ${show.color} flex items-center justify-center p-4`}>
                    <h4 className="text-white font-display font-bold text-xl text-center drop-shadow-md">{show.title}</h4>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { title: "Friends", color: "bg-orange-500" },
                { title: "The Office", color: "bg-blue-500" },
                { title: "Big Bang Theory", color: "bg-red-500" },
                { title: "Young Sheldon", color: "bg-yellow-500" },
                { title: "Brooklyn 99", color: "bg-indigo-500" },
                { title: "HIMYM", color: "bg-purple-500" },
                { title: "Modern Family", color: "bg-green-500" },
                { title: "Sherlock", color: "bg-slate-600" },
                { title: "Suits", color: "bg-gray-800" },
                { title: "Stranger Things", color: "bg-red-800" },
              ].map((show, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 w-48 h-72 rounded-xl overflow-hidden shadow-lg relative group cursor-pointer transform transition-transform hover:scale-105">
                  <div className={`w-full h-full ${show.color} flex items-center justify-center p-4`}>
                    <h4 className="text-white font-display font-bold text-xl text-center drop-shadow-md">{show.title}</h4>
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              ))}
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