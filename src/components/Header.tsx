
import { Crown, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 border-b border-purple-500/30">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23fbbf24" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              DIVINE DISCIPLINE ENGINE
            </h1>
            <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-purple-200 font-medium">
            ⚔️💎 Track. Level. Dominate. Forget self-help. This is self-SOVEREIGNTY. 💎⚔️
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-purple-300 mt-4">
            <span className="bg-purple-800/50 px-3 py-1 rounded-full border border-purple-500/30">
              📊 Daily Target: 100+ XP
            </span>
            <span className="bg-purple-800/50 px-3 py-1 rounded-full border border-purple-500/30">
              📈 Weekly Goal: 700+ XP
            </span>
            <span className="bg-purple-800/50 px-3 py-1 rounded-full border border-purple-500/30">
              🎯 GodMode: 5,001+ XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
