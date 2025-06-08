
import { useState, useEffect } from 'react';
import { XPDashboard } from '@/components/XPDashboard';
import { XPTracker } from '@/components/XPTracker';
import { LevelDisplay } from '@/components/LevelDisplay';
import { Header } from '@/components/Header';
import { DailyRecord } from '@/components/DailyRecord';
import { StreakDisplay } from '@/components/StreakDisplay';

const Index = () => {
  const [totalXP, setTotalXP] = useState(() => {
    const saved = localStorage.getItem('divineXP');
    return saved ? JSON.parse(saved) : 0;
  });

  const [todayXP, setTodayXP] = useState(() => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`dailyXP-${today}`);
    return saved ? JSON.parse(saved) : 0;
  });

  const [weeklyXP, setWeeklyXP] = useState(() => {
    const saved = localStorage.getItem('weeklyXP');
    return saved ? JSON.parse(saved) : 0;
  });

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    localStorage.setItem('divineXP', JSON.stringify(totalXP));
  }, [totalXP]);

  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`dailyXP-${today}`, JSON.stringify(todayXP));
  }, [todayXP]);

  useEffect(() => {
    localStorage.setItem('weeklyXP', JSON.stringify(weeklyXP));
  }, [weeklyXP]);

  const addXP = (amount: number) => {
    setTotalXP(prev => prev + amount);
    setTodayXP(prev => prev + amount);
    setWeeklyXP(prev => prev + amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <LevelDisplay totalXP={totalXP} />
        <XPDashboard todayXP={todayXP} weeklyXP={weeklyXP} totalXP={totalXP} />
        <StreakDisplay totalXP={totalXP} />
        <XPTracker onAddXP={addXP} />
        <DailyRecord todayXP={todayXP} completedTasks={completedTasks} />
      </div>
    </div>
  );
};

export default Index;
