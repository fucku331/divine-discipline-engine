
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Trophy, Zap } from 'lucide-react';

interface StreakDisplayProps {
  totalXP: number;
}

export const StreakDisplay = ({ totalXP }: StreakDisplayProps) => {
  // Calculate streaks from localStorage
  const getDailyStreak = () => {
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = checkDate.toDateString();
      const dailyXP = localStorage.getItem(`dailyXP-${dateKey}`);
      
      if (dailyXP && JSON.parse(dailyXP) >= 100) {
        streak++;
      } else if (i === 0) {
        // If today hasn't hit 100 yet, don't break streak
        continue;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getWeeklyStreak = () => {
    // Simple weekly streak based on total XP milestones
    return Math.floor(totalXP / 700);
  };

  const dailyStreak = getDailyStreak();
  const weeklyStreak = getWeeklyStreak();
  const totalMilestone = Math.floor(totalXP / 1000);

  const streaks = [
    {
      icon: Flame,
      title: 'Daily Fire',
      count: dailyStreak,
      description: '100+ XP days',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Target,
      title: 'Weekly Conquest',
      count: weeklyStreak,
      description: '700+ XP weeks',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Trophy,
      title: 'Milestone Master',
      count: totalMilestone,
      description: '1K XP achievements',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: Zap,
      title: 'Divine Level',
      count: Math.floor(totalXP / 500),
      description: 'Level progression',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  return (
    <Card className="p-6 bg-slate-900/50 border-purple-500/30 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        🔥 DIVINE STREAKS 🔥
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {streaks.map((streak) => {
          const Icon = streak.icon;
          
          return (
            <div 
              key={streak.title}
              className={`p-4 rounded-lg bg-gradient-to-br ${streak.bgColor} border border-purple-500/30`}
            >
              <div className="text-center space-y-2">
                <Icon className={`w-8 h-8 mx-auto bg-gradient-to-r ${streak.color} bg-clip-text text-transparent`} />
                
                <div className={`text-2xl font-bold bg-gradient-to-r ${streak.color} bg-clip-text text-transparent`}>
                  {streak.count}
                </div>
                
                <h3 className="font-semibold text-white text-sm">
                  {streak.title}
                </h3>
                
                <p className="text-xs text-purple-300">
                  {streak.description}
                </p>
                
                {streak.count > 0 && (
                  <Badge 
                    className={`bg-gradient-to-r ${streak.color} text-xs`}
                  >
                    ON FIRE!
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {dailyStreak >= 7 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">
              LEGENDARY STREAK! You're unstoppable! 👑
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};
