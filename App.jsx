import React, { useState } from 'react';
import Roadmap from './Roadmap';
import LectureTask from './LectureTask';
import CalendarView from './CalendarView';
import Analytics from './Analytics'; // 次に作る成績管理画面

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between">
      {/* メインコンテンツ表示エリア */}
      <main className="flex-1">
        {activeTab === 'roadmap' && <Roadmap />}
        {activeTab === 'tasks' && <LectureTask />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'analytics' && <Analytics />}
      </main>

      {/* 下部固定ナビゲーションバー */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex justify-around items-center z-40">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex flex-col items-center gap-1 text-xs transition ${
            activeTab === 'roadmap' ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="text-lg">🧭</span>
          <span>ロードマップ</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 text-xs transition ${
            activeTab === 'tasks' ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="text-lg">🎓</span>
          <span>3回定着</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center gap-1 text-xs transition ${
            activeTab === 'calendar' ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="text-lg">📅</span>
          <span>日程調整</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex flex-col items-center gap-1 text-xs transition ${
            activeTab === 'analytics' ? 'text-blue-400 font-bold' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <span className="text-lg">📊</span>
          <span>答練成績</span>
        </button>
      </nav>
    </div>
  );
}