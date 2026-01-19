
import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './AppContext';
import { AdminPanel } from './components/AdminPanel';
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
  Quote
} from 'lucide-react';

const Navbar = ({ onAdminOpen }: { onAdminOpen: () => void }) => {
  const { state } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass-dark shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-bold tracking-tighter flex items-center gap-2 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: state.config.accentColor }}>
            <Zap size={18} fill="white" stroke="white" />
          </div>
          {state.config.brandName}
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {['Portfolio', 'Process', 'Reviews', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={onAdminOpen}
            className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            title="Admin Login"
          >
            <Lock size={18} />
          </button>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 animate-fade-up shadow-xl">
          {['Portfolio', 'Process', 'Reviews', 'Contact'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              onClick={() => setMobileMenu(false)}
              className="text-lg font-bold text-slate-800"
            >
              {item}
            </a>
          ))}
          <button onClick={() => { onAdminOpen(); setMobileMenu(false); }} className="flex items-center gap-2 text-slate-400 text-sm">
            <Lock size={16} /> 관리자 모드
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const { state } = useApp();
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50/50">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-slate-200 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-8 bg-white border border-slate-200 shadow-sm"
            style={{ color: state.config.accentColor }}
          >
            홈페이지 제작 전문 서비스
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight animate-fade-up">
            {state.config.heroTitle}
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {state.config.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <a 
              href="#contact"
              className="px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-600/20 active:scale-95"
              style={{ backgroundColor: state.config.accentColor, color: 'white' }}
            >
              홈페이지 제작 문의하기 <ArrowRight size={20} />
            </a>
            <a href="#portfolio" className="px-8 py-4 rounded-xl font-bold bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center shadow-sm">
              제작 사례 확인
            </a>
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
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">산업의 전문성을 담은 포트폴리오</h2>
            <p className="text-slate-500 text-lg">업종의 특성을 깊이 이해하고 비즈니스 모델에 최적화된 설계를 제공합니다.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {state.portfolios.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-100 transition-all duration-500 group-hover:shadow-2xl">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                   <span className="text-white font-bold flex items-center gap-2">상세 보기 <ChevronRight size={18} /></span>
                </div>
              </div>
              <div className="mt-6 px-2">
                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">{item.category}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed line-clamp-2">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { icon: <MessageSquare />, title: "01. 상담 및 분석", desc: "업종별 특수성과 타겟 고객의 성향을 철저히 분석하여 제작 방향을 설정합니다." },
    { icon: <Search />, title: "02. 기획 고도화", desc: "사용자가 행동하게 만드는 인터페이스와 구조를 설계합니다." },
    { icon: <Monitor />, title: "03. 맞춤형 디자인", desc: "기업의 신뢰도를 높여주는 고유의 비주얼 아이덴티티를 구축합니다." },
    { icon: <Zap />, title: "04. 최적화 및 런칭", desc: "검색 엔진 최적화(SEO)와 빠른 로딩 속도로 비즈니스 성과를 극대화합니다." },
  ];

  return (
    <section id="process" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">디지털 혁신 프로세스</h2>
          <p className="text-slate-500 max-w-xl mx-auto">전통적인 산업군도 드로우웹을 만나면 강력한 디지털 경쟁력을 갖추게 됩니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-8">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewSection = () => {
  const reviews = [
    { name: "이*석", role: "대표이사", content: "제지 업종의 복잡한 공정을 이렇게 깔끔한 인포그래픽과 디자인으로 풀어낼 줄 몰랐습니다. 홈페이지 리뉴얼 후 신뢰도가 높아져 자부심이 생겼습니다.", rating: 5 },
    { name: "박*연", role: "마케팅 팀장", content: "B2B 영업의 핵심은 신뢰인데, 드로우웹 덕분에 문의 전환율이 이전보다 30% 이상 상승했습니다. 디자인뿐만 아니라 마케팅 전략까지 고려해주셔서 감사합니다.", rating: 5 },
    { name: "최*훈", role: "운영 매니저", content: "금속 제조라는 딱딱한 이미지를 탈피하고 싶었는데 결과물이 기대 이상입니다. 모바일에서도 제품 카탈로그가 매끄럽게 작동해서 현장에서 쓰기 매우 편합니다.", rating: 5 }
  ];

  return (
    <section id="reviews" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">파트너사 리뷰</h2>
          <p className="text-slate-500">드로우웹과 함께한 수많은 기업들이 성공적인 디지털 전환을 경험하고 있습니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 text-blue-200" size={32} />
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-8 italic">"{rev.content}"</p>
              <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                   {rev.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{rev.name}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { state, addInquiry } = useApp();
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">당신의 비즈니스를 <br/><span className="text-blue-400">디지털로 드로잉하세요.</span></h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-md">
              견적 문의부터 전략 수립까지, 드로우웹의 전문가가 함께합니다. 지금 바로 시작해 보세요.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><Mail className="text-blue-400" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">문의 이메일</p>
                  <p className="text-xl font-medium">contact@drawweb.co.kr</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><Smartphone className="text-blue-400" /></div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">상담 전화</p>
                  <p className="text-xl font-medium">070-4400-1234</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl text-slate-900">
            {sent ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center animate-fade-up">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-8">
                  <Zap className="text-blue-600" fill="currentColor" />
                </div>
                <h3 className="text-3xl font-bold mb-4">접수 완료!</h3>
                <p className="text-slate-500 text-lg">기재해주신 연락처로 곧 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold mb-8">프로젝트 상담 신청</h3>
                <div className="space-y-4">
                  <div>
                    <input 
                      required
                      placeholder="성함/기업명"
                      type="text" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 outline-none transition-all"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <input 
                      required
                      placeholder="이메일 주소"
                      type="email" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 outline-none transition-all"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="문의 내용 (업종, 필요 기능 등)"
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:border-blue-500 outline-none transition-all resize-none"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 text-white hover:brightness-110 transition-all shadow-xl shadow-blue-600/30"
                  style={{ backgroundColor: state.config.accentColor }}
                >
                  무료 견적 받기 <ArrowRight size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { state } = useApp();
  return (
    <footer className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
          <div className="max-w-xs">
            <div className="text-2xl font-bold tracking-tighter text-slate-900 flex items-center gap-2 mb-6">
               <Zap size={22} fill={state.config.accentColor} stroke={state.config.accentColor} />
               {state.config.brandName}
            </div>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              기업의 가치를 시각화하고 디지털 경험을 설계하는 홈페이지 제작 전문 에이전시 드로우웹입니다.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Business</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">기업 홈페이지</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">B2B 플랫폼</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">브랜드 사이트</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">포트폴리오</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">리뷰</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Follow</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 transition-all"><Github size={18} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-medium">© 2024 DrawWeb Studio. All rights reserved.</p>
          <div className="flex gap-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900 transition-colors">이용약관</a>
            <a href="#" className="hover:text-slate-900 transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MainContent = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onAdminOpen={() => setIsAdminOpen(true)} />
      <main>
        <Hero />
        <PortfolioSection />
        <ProcessSection />
        <ReviewSection />
        <ContactSection />
      </main>
      <Footer />
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
