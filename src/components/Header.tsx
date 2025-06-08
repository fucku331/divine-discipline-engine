
import { Crown, Zap } from 'lucide-react';

export const Header = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-800 via-violet-900 to-purple-800 border-b border-purple-500/30">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fbbf24%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
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
