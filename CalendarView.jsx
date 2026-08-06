import React, { useState } from 'react';

// サンプルデータ: 日付ごとの予定タスク
const initialTasks = [
  { id: 101, date: '2026-08-06', subject: '財務計算', title: '第5講 連結CF ｜ トレーニング', rotation: 2 },
  { id: 102, date: '2026-08-06', subject: '企業法', title: '第3講 設立 ｜ テキスト', rotation: 1 },
  { id: 103, date: '2026-08-08', subject: '財務計算', title: '第5講 連結CF ｜ 復習3回目', rotation: 3 },
  { id: 104, date: '2026-08-12', subject: '財務計算', title: '第5講 連結CF ｜ 周回回転1回目', rotation: 4 },
];

export default function CalendarView() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [shiftDays, setShiftDays] = useState(1);

  // 単発移動処理
  const handleSingleShift = (taskId, days) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const current = new Date(task.date);
          current.setDate(current.getDate() + days);
          return { ...task, date: current.toISOString().split('T')[0] };
        }
        return task;
      })
    );
    setSelectedTask(null);
  };

  // 連動スライド処理 (忘却曲線の間隔を保って後続タスクも未来へ一括移動)
  const handleChainShift = (targetTask, days) => {
    setTasks((prev) =>
      prev.map((task) => {
        // 同じ教材・講義で、かつ選択したタスク以降の予定をすべて追従スライド
        if (task.subject === targetTask.subject && task.date >= targetTask.date) {
          const current = new Date(task.date);
          current.setDate(current.getDate() + days);
          return { ...task, date: current.toISOString().split('T')[0] };
        }
        return task;
      })
    );
    setSelectedTask(null);
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-slate-100 min-h-screen p-4 font-sans pb-24">
      {/* 画面ヘッダー */}
      <header className="mb-4 border-b border-slate-800 pb-3">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>📅</span> スケジュール & 動的スライド
        </h1>
        <p className="text-xs text-slate-400 mt-1">復習間隔を崩さずに自動で予定を再計算</p>
      </header>

      {/* 今日の予定リスト */}
      <div className="mb-6">
        <h2 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-1.5">
          <span>今週の予定タスク</span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
            タップして日程調整
          </span>
        </h2>

        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="p-3.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl flex items-center justify-between cursor-pointer transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {task.subject}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">📅 {task.date}</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">{task.title}</p>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
                {task.rotation}回転目
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* タスク移動・連動スライドモーダル（ダイアログ） */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                {selectedTask.subject}
              </span>
              <h2 className="font-bold text-sm text-white mt-1.5">{selectedTask.title}</h2>
              <p className="text-xs text-slate-400 mt-1">現在の予定日: {selectedTask.date}</p>
            </div>

            {/* 移動日数選択 */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
              <label className="text-xs text-slate-400 block mb-2 font-medium">
                何日うしろへずらしますか？
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => setShiftDays(days)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                      shiftDays === days
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ＋{days}日
                  </button>
                ))}
              </div>
            </div>

            {/* 2種類のアクションボタン */}
            <div className="space-y-2 pt-1">
              {/* 連動スライドボタン（メイン機能） */}
              <button
                onClick={() => handleChainShift(selectedTask, shiftDays)}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-blue-600/20 flex items-center justify-center gap-1.5"
              >
                <span>🔄</span> 以降の復習予定もまとめて連動スライド (+{shiftDays}日)
              </button>

              {/* 単発移動ボタン */}
              <button
                onClick={() => handleSingleShift(selectedTask.id, shiftDays)}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-xl transition"
              >
                このタスクだけ移動する
              </button>
            </div>

            <button
              onClick={() => setSelectedTask(null)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-400 pt-1"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}