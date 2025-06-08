
import { Crown, Zap, Shield, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LevelDisplayProps {
  totalXP: number;
}

export const LevelDisplay = ({ totalXP }: LevelDisplayProps) => {
  const getLevelInfo = (xp: number) => {
    if (xp >= 5001) return { level: 5, title: "GODMODE 👑💀", icon: Crown, color: "from-yellow-400 to-orange-500", bgColor: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20" };
    if (xp >= 3001) return { level: 4, title: "Chaos Commander ⚡", icon: Zap, color: "from-purple-400 to-pink-500", bgColor: "bg-gradient-to-r from-purple-500/20 to-pink-500/20" };
    if (xp >= 1501) return { level: 3, title: "Supreme Architect 🧠", icon: Brain, color: "from-cyan-400 to-blue-500", bgColor: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20" };
    if (xp >= 501) return { level: 2, title: "Warrior Shadow 🥷", icon: Shield, color: "from-green-400 to-emerald-500", bgColor: "bg-gradient-to-r from-green-500/20 to-emerald-500/20" };
    return { level: 1, title: "Rookie Phantom 👻", icon: Shield, color: "from-gray-400 to-slate-500", bgColor: "bg-gradient-to-r from-gray-500/20 to-slate-500/20" };
  };

  const getNextLevelXP = (xp: number) => {
    if (xp >= 5001) return 5001;
    if (xp >= 3001) return 5001;
    if (xp >= 1501) return 3001;
    if (xp >= 501) return 1501;
    return 501;
  };

  const levelInfo = getLevelInfo(totalXP);
  const nextLevelXP = getNextLevelXP(totalXP);
  const progress = totalXP >= 5001 ? 100 : ((totalXP / nextLevelXP) * 100);
  const Icon = levelInfo.icon;

  return (
    <Card className={`p-4 sm:p-6 ${levelInfo.bgColor} border-2 border-purple-500/30 backdrop-blur-sm`}>
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <Icon className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`} />
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
            LEVEL {levelInfo.level}
          </h2>
        </div>
        
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white px-2">
          {levelInfo.title}
        </h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs sm:text-sm text-purple-200 px-2">
            <span>{totalXP} XP</span>
            <span>{totalXP >= 5001 ? "MAX LEVEL" : `${nextLevelXP} XP`}</span>
          </div>
          
          <div className="w-full bg-purple-900/50 rounded-full h-2 sm:h-3 overflow-hidden mx-2">
            <div 
              className={`h-full bg-gradient-to-r ${levelInfo.color} transition-all duration-500 ease-out relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {totalXP < 5001 && (
          <p className="text-purple-300 text-xs sm:text-sm">
            {nextLevelXP - totalXP} XP until next level
          </p>
        )}
      </div>
    </Card>
  );
};
