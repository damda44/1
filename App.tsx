
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import { 
  ChevronRight, 
  Monitor, 
  Smartphone, 
  Zap, 
  Search, 
  MessageSquare, 
  ArrowRight, 
  Lock,
  Menu,
  X,
  Instagram,
  Facebook,
  Github,
  Mail,
  Star,
  Quote,
  Settings,
  Layout,
  Plus,
  Trash2,
  Save
} from 'lucide-react';

// --- AdminPanel (Integrated for Stability) ---
const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state, updateConfig, addPortfolio, removePortfolio, markInquiryRead } = useApp();
  const [activeTab, setActiveTab] = useState<'settings' | 'portfolio' | 'inquiries'>('settings');
  const [tempConfig, setTempConfig] = useState(state.config);
  const [newPf, setNewPf] = useState({ title: '', category: '', imageUrl: '', description: '' });

  const handleSaveConfig = () => {
    updateConfig(tempConfig);
    alert('설정이 저장되었습니다.');
  };

  const handleAddPf = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPf.title || !newPf.imageUrl) return;
    addPortfolio(newPf);
    setNewPf({ title: '', category: '', imageUrl: '', description: '' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800">
          <div>
            <h2 className="text-xl font-bold">관리자 대시보드</h2>
            <p className="text-sm text-slate-400">사이트 콘텐츠 실시간 관리</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors"><X size={24} /></button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-48 bg-slate-950 border-r border-slate-800 p-4 space-y-2">
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><Settings size={18} /> 설정</button>
            <button onClick={() => setActiveTab('portfolio')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'portfolio' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><Layout size={18} /> 포트폴리오</button>
            <button onClick={() => setActiveTab('inquiries')} className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'inquiries' ? 'bg-blue-600' : 'hover:bg-slate-800 text-slate-400'}`}><Mail size={18} /> 문의함</button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
            {activeTab === 'settings' && (
              <div className="space-y-6 text-slate-300">
                <div>
                  <label className="block text-sm font-medium mb-1">히어로 제목</label>
                  <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500" value={tempConfig.heroTitle} onChange={e => setTempConfig({ ...tempConfig, heroTitle: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">히어로 설명</label>
                  <textarea rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 outline-none focus:border-blue-500" value={tempConfig.heroSub} onChange={e => setTempConfig({ ...tempConfig, heroSub: e.target.value })} />
                </div>
                <button onClick={handleSaveConfig} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"><Save size={18} /> 변경사항 저장</button>
              </div>
            )}
            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <form onSubmit={handleAddPf} className="bg-slate-800 p-4 rounded-xl space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="제목" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm" value={newPf.title} onChange={e => setNewPf({ ...newPf, title: e.target.value })} />
                    <input placeholder="카테고리" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm" value={newPf.category} onChange={e => setNewPf({ ...newPf, category: e.target.value })} />
                  </div>
                  <input placeholder="이미지 URL" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm" value={newPf.imageUrl} onChange={e => setNewPf({ ...newPf, imageUrl: e.target.value })} />
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-medium">새 프로젝트 추가</button>
                </form>
                <div className="space-y-2">
                  {state.portfolios.map(p => (
                    <div key={p.id} className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <div className="flex-1 text-sm font-bold">{p.title}</div>
                      <button onClick={() => removePortfolio(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                {state.inquiries.length === 0 ? <p className="text-center py-12 text-slate-500 font-medium">문의 내역이 없습니다.</p> : 
                  state.inquiries.map(inq => (
                    <div key={inq.id} className={`p-4 rounded-xl border transition-all ${inq.status === 'new' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-800 border-slate-700'}`} onClick={() => markInquiryRead(inq.id)}>
                      <div className="font-bold flex justify-between items-center">
                        {inq.name} <span className="text-xs text-slate-500 font-normal">{inq.date}</span>
                      </div>
                      <div className="text-xs text-blue-400 mb-2">{inq.email}</div>
                      <p className="text-sm text-slate-400">{inq.message}</p>
                    </div>
                  ))
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Components ---
const Navbar = ({ onAdminOpen }: { onAdminOpen: () => void }) => {
  const { state } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-dark shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-slate-900">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: state.config.accentColor }}>
            <Zap size={18} fill="white" stroke="white" />
          </div>
          {state.config.brandName}
        </a>
        <div className="hidden md:flex items-center gap-10">
          {['Portfolio', 'Process', 'Reviews', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">{item}</a>
          ))}
          <button onClick={onAdminOpen} className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><Lock size={18} /></button>
        </div>
        <button className="md:hidden text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { state } = useApp();
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 bg-blue-50 text-blue-600 border border-blue-100 shadow-sm animate-fade-up">맞춤형 홈페이지 제작 전문 서비스</div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight animate-fade-up">{state.config.heroTitle}</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>{state.config.heroSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <a href="#contact" className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20 active:scale-95 text-white" style={{ backgroundColor: state.config.accentColor }}>제작 상담 시작하기 <ArrowRight size={20} /></a>
            <a href="#portfolio" className="px-8 py-4 rounded-xl font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm">제작 사례 보기</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const { state } = useApp();
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">산업의 전문성을 담은 제작 사례</h2>
          <p className="text-slate-500 text-lg">업종의 특성을 깊이 이해하고 비즈니스 모델에 최적화된 결과물을 제공합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {state.portfolios.map((item) => (
            <article key={item.id} className="group">
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-xl">
                <img src={item.imageUrl} alt={item.title} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 text-white font-bold">상세 보기 <ChevronRight size={18} /></div>
              </div>
              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{item.category}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewSection = () => {
  const reviews = [
    { name: "이*석", role: "대표이사", content: "복잡한 공정 과정을 홈페이지 하나로 명확하게 보여줄 수 있게 되었습니다. 신뢰도가 높아져 자부심이 생겼습니다.", rating: 5 },
    { name: "박*연", role: "마케팅 팀장", content: "디자인뿐만 아니라 마케팅 전략까지 고려해주셔서 문의 전환율이 이전보다 30% 이상 상승했습니다.", rating: 5 },
    { name: "최*훈", role: "운영 매니저", content: "모바일에서도 제품 카탈로그가 매끄럽게 작동해서 현장에서 사용하기 매우 편리합니다. 강력 추천합니다.", rating: 5 }
  ];

  return (
    <section id="reviews" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 tracking-tight">파트너사 실제 리뷰</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative text-left">
              <Quote className="absolute top-6 right-6 text-blue-50" size={32} />
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />)}
              </div>
              <p className="text-slate-700 mb-8 italic">"{rev.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">{rev.name[0]}</div>
                <div><div className="font-bold text-slate-900">{rev.name}</div><div className="text-xs text-slate-400 uppercase tracking-wider">{rev.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { addInquiry, state } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addInquiry(formData);
    setSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">비즈니스의 가치를 <br/><span className="text-blue-400">디지털로 완성하세요.</span></h2>
          <p className="text-slate-400 mb-10 text-lg max-w-md">문의부터 제작까지 전문가가 직접 소통하며 최상의 결과물을 보장합니다.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-300 font-medium"><Mail className="text-blue-400" /> contact@drawweb.co.kr</div>
            <div className="flex items-center gap-4 text-slate-300 font-medium"><Smartphone className="text-blue-400" /> 070-4400-1234</div>
          </div>
        </div>
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl text-slate-900">
          {sent ? <div className="text-center py-20 animate-fade-up"><Zap className="mx-auto text-blue-600 mb-4" /> <h3 className="text-2xl font-bold">상담 접수 완료!</h3><p className="text-slate-500 mt-2">전문가가 곧 연락드리겠습니다.</p></div> : 
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="성함 / 업체명" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input required placeholder="연락처 또는 이메일" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <textarea placeholder="간략한 문의 내용 (필요한 기능 등)" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 resize-none outline-none focus:border-blue-500" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
              <button type="submit" className="w-full py-4 rounded-xl font-bold text-white transition-all hover:brightness-110 shadow-xl" style={{ backgroundColor: state.config.accentColor }}>무료 상담 신청하기</button>
            </form>
          }
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Navbar onAdminOpen={() => setIsAdminOpen(true)} />
        <main>
          <Hero />
          <PortfolioSection />
          <ReviewSection />
          <ContactSection />
        </main>
        <footer className="py-12 bg-slate-50 border-t border-slate-200 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold">
          © 2024 DrawWeb Studio. All rights reserved.
        </footer>
        {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
      </div>
    </AppProvider>
  );
};

export default App;
