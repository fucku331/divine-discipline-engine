
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface XPDashboardProps {
  todayXP: number;
  weeklyXP: number;
  totalXP: number;
}

export const XPDashboard = ({ todayXP, weeklyXP, totalXP }: XPDashboardProps) => {
  const dailyTarget = 100;
  const weeklyTarget = 700;
  
  const dailyProgress = Math.min((todayXP / dailyTarget) * 100, 100);
  const weeklyProgress = Math.min((weeklyXP / weeklyTarget) * 100, 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-800/50 to-blue-800/50 border-purple-500/30 backdrop-blur-sm">
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-purple-200">Today's Power</h3>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{todayXP} XP</div>
            <div className="text-xs sm:text-sm text-purple-300">Target: {dailyTarget} XP</div>
          </div>
          
          <Progress 
            value={dailyProgress} 
            className="h-2 sm:h-3 bg-purple-900/50"
          />
          
          <div className="text-center text-xs sm:text-sm">
            {dailyProgress >= 100 ? (
              <span className="text-green-400 font-semibold">🔥 DAILY DOMINANCE ACHIEVED! 🔥</span>
            ) : (
              <span className="text-purple-300">{dailyTarget - todayXP} XP to dominate today</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-800/50 to-pink-800/50 border-purple-500/30 backdrop-blur-sm">
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-purple-200">Weekly Conquest</h3>
            <div className="text-2xl sm:text-3xl font-bold text-pink-400">{weeklyXP} XP</div>
            <div className="text-xs sm:text-sm text-purple-300">Target: {weeklyTarget} XP</div>
          </div>
          
          <Progress 
            value={weeklyProgress} 
            className="h-2 sm:h-3 bg-purple-900/50"
          />
          
          <div className="text-center text-xs sm:text-sm">
            {weeklyProgress >= 100 ? (
              <span className="text-green-400 font-semibold">⚡ WEEKLY WARRIOR ACHIEVED! ⚡</span>
            ) : (
              <span className="text-purple-300">{weeklyTarget - weeklyXP} XP to conquer week</span>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-800/50 to-yellow-800/50 border-purple-500/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
        <div className="space-y-3 sm:space-y-4">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-purple-200">Total Sovereignty</h3>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{totalXP} XP</div>
            <div className="text-xs sm:text-sm text-purple-300">
              {totalXP >= 5001 ? "GODMODE UNLOCKED!" : `${5001 - totalXP} XP to GODMODE`}
            </div>
          </div>
          
          <div className="text-center text-xs sm:text-sm">
            {totalXP >= 5001 ? (
              <span className="text-yellow-400 font-semibold animate-pulse">👑 DIVINE SOVEREIGNTY ACHIEVED 👑</span>
            ) : (
              <span className="text-purple-300">Continue your ascension...</span>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
