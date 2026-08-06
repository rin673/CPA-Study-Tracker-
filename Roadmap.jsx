import React, { useState } from 'react';

// サンプルデータ: 財務会計論（計算）のロードマップ
const initialLectures = [
  { id: 1, title: '第 1 講 ｜ 財務会計の基礎概念', stage: '入門', status: 'COMPLETED', attendedAt: '2026-07-10', rotations: ['GREEN', 'GREEN', 'GREEN'] },
  { id: 2, title: '第 2 講 ｜ 現金預金・有価証券', stage: '入門', status: 'COMPLETED', attendedAt: '2026-07-15', rotations: ['GREEN', 'GREEN', 'GREEN'] },
  { id: 5, title: '第 5 講 ｜ 連結キャッシュ・フロー計算書', stage: '入門', status: 'IN_PROGRESS', attendedAt: '2026-08-04', rotations: ['GREEN', 'YELLOW', 'EMPTY'] },
  { id: 6, title: '第 6 講 ｜ 持分法会計', stage: '入門', status: 'IN_PROGRESS', attendedAt: '2026-08-05', rotations: ['GREEN', 'EMPTY', 'EMPTY'] },
  { id: 7, title: '第 7 講 ｜ 組織再編会計①', stage: '入門', status: 'UNATTENDED', attendedAt: null, rotations: ['EMPTY', 'EMPTY', 'EMPTY'] },
  { id: 8, title: '第 8 講 ｜ 組織再編会計②', stage: '入門', status: 'UNATTENDED', attendedAt: null, rotations: ['EMPTY', 'EMPTY', 'EMPTY'] },
];

export default function Roadmap() {
  const [currentStage, setCurrentStage] = useState('入門');
  const [lectures, setLectures] = useState(initialLectures);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // ステージごとのフィルタリング
  const stageLectures = lectures.filter((l) => l.stage === currentStage);
  const completedCount = stageLectures.filter((l) => l.status === 'COMPLETED').length;
  const progressPercent = Math.round((completedCount / stageLectures.length) * 100) || 0;

  // 受講完了ボタンを押した時の処理
  const handleMarkAsAttended = (id) => {
    const today = new Date().toISOString().split('T')[0];
    setLectures((prev) =>
      prev.map((lec) =>
        lec.id === id
          ? { ...lec, status: 'IN_PROGRESS', attendedAt: today, rotations: ['GREEN', 'EMPTY', 'EMPTY'] }
          : lec
      )
    );
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-slate-100 min-h-screen p-4 font-sans pb-24">
      {/* 画面ヘッダー */}
      <header className="mb-4 border-b border-slate-800 pb-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🧭</span> 財務会計論（計算）
        </h1>
        <p className="text-xs text-slate-400 mt-1">授業進行状況（ロードマップ）</p>
      </header>

      {/* カリキュラム（ステージ）切替タブ */}
      <div className="flex gap-2 mb-4 bg-slate-800 p-1 rounded-xl text-sm">
        {['入門', '基礎期', '応用期', '直前答練'].map((stage) => (
          <button
            key={stage}
            onClick={() => setCurrentStage(stage)}
            className={`flex-1 py-1.5 rounded-lg font-medium transition ${
              currentStage === stage
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* プログレスバー */}
      <div className="bg-slate-800/80 border border-slate-700/50 p-4 rounded-2xl mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">{currentStage}の進捗率</span>
          <span className="font-bold text-blue-400">
            {completedCount} / {stageLectures.length} 講 ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-teal-400 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 講義リスト */}
      <div className="space-y-3">
        {stageLectures.map((lec) => {
          const isCompleted = lec.status === 'COMPLETED';
          const isInProgress = lec.status === 'IN_PROGRESS';

          return (
            <div
              key={lec.id}
              onClick={() => setSelectedLecture(lec)}
              className={`p-4 rounded-xl border transition cursor-pointer ${
                isCompleted
                  ? 'bg-slate-800/40 border-slate-700/50 opacity-80'
                  : isInProgress
                  ? 'bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/5'
                  : 'bg-slate-800/20 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded font-bold ${
                    isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : isInProgress
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? '受講済' : isInProgress ? '進行中' : '未受講'}
                </span>

                {/* 3回転スタンプ */}
                <div className="flex gap-1 items-center text-xs">
                  {lec.rotations.map((status, idx) => (
                    <span
                      key={idx}
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        status === 'GREEN'
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : status === 'YELLOW'
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-700 text-slate-500'
                      }`}
                    >
                      {status !== 'EMPTY' ? '✓' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className={`font-semibold text-sm ${isInProgress ? 'text-white' : 'text-slate-300'}`}>
                {lec.title}
              </h3>

              {lec.attendedAt && (
                <p className="text-[11px] text-slate-400 mt-2">受講日: {lec.attendedAt}</p>
              )}

              {/* 未受講時のクイックボタン */}
              {lec.status === 'UNATTENDED' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAsAttended(lec.id);
                  }}
                  className="mt-3 w-full py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-lg transition"
                >
                  ＋ 受講完了を記録
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 講義詳細モータル（タップ時に起動） */}
      {selectedLecture && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50"
          onClick={() => setSelectedLecture(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-base text-white">{selectedLecture.title}</h2>
              <button
                onClick={() => setSelectedLecture(null)}
                className="text-slate-400 text-lg hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 text-xs space-y-2">
              <p className="text-slate-400">📊 3回定着マトリクス</p>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>テキスト③</span>
                <span className="text-emerald-400 font-mono">1回目 🟢 ｜ 2回目 🟢</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>ミニテスト</span>
                <span className="text-amber-400 font-mono">1回目 🔴 ｜ 2回目 🟡</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>トレーニング</span>
                <span className="text-slate-500 font-mono">1回目 🟢 ｜ 2回目 未</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedLecture(null)}
              className="w-full py-2 bg-blue-600 text-white font-bold text-sm rounded-xl hover:bg-blue-500 transition"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}