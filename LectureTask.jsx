import React, { useState } from 'react';

// サンプルデータ: 講義直後の3回定着タスク一覧
const initialTasks = [
  { id: 1, subject: '財務計算', title: '第5講 連結CF ｜ テキスト③ P.80〜105', rotation: 2, dueDate: '今日', evaluation: null, memo: '' },
  { id: 2, subject: '財務計算', title: '第5講 連結CF ｜ ミニテスト第5回', rotation: 2, dueDate: '今日', evaluation: null, memo: '' },
  { id: 3, subject: '財務計算', title: '第5講 連結CF ｜ トレーニング① 問10,12', rotation: 1, dueDate: '今日', evaluation: 'GREEN', memo: '子会社株式売却の投資CFでミス注意' },
  { id: 4, subject: '企業法', title: '第3講 設立 ｜ テキスト① P.30〜50', rotation: 3, dueDate: '明日', evaluation: null, memo: '' },
];

export default function LectureTask() {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingMemoId, setEditingMemoId] = useState(null);
  const [tempMemo, setTempMemo] = useState('');

  // 評価ボタンを押したときの判定処理
  const handleEvaluation = (id, evalColor) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, evaluation: evalColor } : task))
    );
  };

  // メモ保存処理
  const handleSaveMemo = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, memo: tempMemo } : task))
    );
    setEditingMemoId(null);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-slate-100 min-h-screen p-4 font-sans pb-24">
      {/* 画面ヘッダー */}
      <header className="mb-4 border-b border-slate-800 pb-3 flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span>🎓</span> 講義消化 (3回定着)
          </h1>
          <p className="text-xs text-slate-400 mt-1">受講後 1〜3 回目の初期復習タスク</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
          残 3 件
        </span>
      </header>

      {/* タスクリスト */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border transition ${
              task.evaluation
                ? 'bg-slate-800/30 border-slate-800 opacity-75'
                : 'bg-slate-800 border-slate-700 shadow-md'
            }`}
          >
            {/* 上段情報 (科目ラベル & 回数) */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  {task.subject}
                </span>
                <span className="text-xs font-semibold text-amber-400">
                  【 {task.rotation} 回目復習 】
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{task.dueDate}</span>
            </div>

            {/* タスクタイトル */}
            <h3 className="font-semibold text-sm text-slate-100 mb-3">{task.title}</h3>

            {/* ワンタップ評価エリア */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
              <span className="text-xs text-slate-400">定着度評価:</span>
              <div className="flex gap-2">
                {/* 🔴 赤評価 */}
                <button
                  onClick={() => handleEvaluation(task.id, 'RED')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                    task.evaluation === 'RED'
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400'
                      : 'bg-slate-700 text-rose-400 hover:bg-rose-500/20'
                  }`}
                >
                  🔴
                </button>
                {/* 🟡 黄評価 */}
                <button
                  onClick={() => handleEvaluation(task.id, 'YELLOW')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                    task.evaluation === 'YELLOW'
                      ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30 ring-2 ring-amber-300'
                      : 'bg-slate-700 text-amber-300 hover:bg-amber-400/20'
                  }`}
                >
                  🟡
                </button>
                {/* 🟢 緑評価 */}
                <button
                  onClick={() => handleEvaluation(task.id, 'GREEN')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                    task.evaluation === 'GREEN'
                      ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400'
                      : 'bg-slate-700 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                >
                  🟢
                </button>
              </div>
            </div>

            {/* メモ表示・編集エリア */}
            <div className="mt-3 pt-2 border-t border-slate-700/30 text-xs">
              {editingMemoId === task.id ? (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={tempMemo}
                    onChange={(e) => setTempMemo(e.target.value)}
                    placeholder="ひっかけポイントや反省メモ..."
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-2.5 py-1 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleSaveMemo(task.id)}
                    className="bg-blue-600 text-white font-semibold px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setEditingMemoId(task.id);
                    setTempMemo(task.memo);
                  }}
                  className="flex items-center justify-between text-slate-400 hover:text-slate-200 cursor-pointer py-1"
                >
                  <span className="truncate">
                    {task.memo ? `📝 ${task.memo}` : '＋ ひっかけ・反省メモを追加'}
                  </span>
                  <span className="text-[10px] text-slate-500">編集</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}