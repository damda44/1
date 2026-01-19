
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { X, Save, Plus, Trash2, Mail, Layout, Settings } from 'lucide-react';

export const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { state, updateConfig, addPortfolio, removePortfolio, markInquiryRead } = useApp();
  const [activeTab, setActiveTab] = useState<'settings' | 'portfolio' | 'inquiries'>('settings');

  // Form states
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
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800">
          <div>
            <h2 className="text-xl font-bold text-white">관리자 대시보드</h2>
            <p className="text-sm text-slate-400">드로우웹 사이트 실시간 편집 및 관리</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-slate-900 border-r border-slate-700 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Settings size={18} /> 사이트 설정
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'portfolio' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Layout size={18} /> 포트폴리오
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${activeTab === 'inquiries' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <Mail size={18} /> 문의 내역
              {state.inquiries.filter(i => i.status === 'new').length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {state.inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">히어로 제목</label>
                  <input
                    type="text"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={tempConfig.heroTitle}
                    onChange={e => setTempConfig({ ...tempConfig, heroTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">히어로 설명</label>
                  <textarea
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={tempConfig.heroSub}
                    onChange={e => setTempConfig({ ...tempConfig, heroSub: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">포인트 컬러</label>
                  <div className="flex gap-4 items-center">
                    <input
                      type="color"
                      className="w-12 h-12 bg-transparent rounded cursor-pointer"
                      value={tempConfig.accentColor}
                      onChange={e => setTempConfig({ ...tempConfig, accentColor: e.target.value })}
                    />
                    <span className="text-sm font-mono text-slate-400 uppercase">{tempConfig.accentColor}</span>
                  </div>
                </div>
                <button
                  onClick={handleSaveConfig}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  <Save size={18} /> 설정 변경 저장
                </button>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-8">
                <form onSubmit={handleAddPf} className="bg-slate-800 p-4 rounded-xl space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Plus size={18} /> 새 프로젝트 추가
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="제목"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                      value={newPf.title}
                      onChange={e => setNewPf({ ...newPf, title: e.target.value })}
                    />
                    <input
                      placeholder="카테고리"
                      className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                      value={newPf.category}
                      onChange={e => setNewPf({ ...newPf, category: e.target.value })}
                    />
                  </div>
                  <input
                    placeholder="이미지 URL (https://...)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                    value={newPf.imageUrl}
                    onChange={e => setNewPf({ ...newPf, imageUrl: e.target.value })}
                  />
                  <textarea
                    placeholder="설명"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                    value={newPf.description}
                    onChange={e => setNewPf({ ...newPf, description: e.target.value })}
                  />
                  <button type="submit" className="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg text-sm transition-all font-medium">
                    프로젝트 등록
                  </button>
                </form>

                <div className="space-y-3">
                  <h3 className="font-semibold text-white">기존 프로젝트</h3>
                  {state.portfolios.map(p => (
                    <div key={p.id} className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <img src={p.imageUrl} className="w-12 h-12 object-cover rounded" alt="" />
                      <div className="flex-1">
                        <div className="text-sm font-bold">{p.title}</div>
                        <div className="text-xs text-slate-400">{p.category}</div>
                      </div>
                      <button onClick={() => removePortfolio(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-white">고객 상담 문의 목록</h3>
                {state.inquiries.length === 0 ? (
                  <p className="text-center text-slate-500 py-12">접수된 문의가 없습니다.</p>
                ) : (
                  state.inquiries.map(inq => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-xl border transition-all ${inq.status === 'new' ? 'bg-blue-500/5 border-blue-500/30' : 'bg-slate-800 border-slate-700'}`}
                      onClick={() => markInquiryRead(inq.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-bold text-white">{inq.name}</span>
                          <span className="text-xs text-slate-400 ml-2">{inq.email}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">{inq.date}</span>
                      </div>
                      <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg">{inq.message}</p>
                      {inq.status === 'new' && (
                        <div className="mt-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">New Message</div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
