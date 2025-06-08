
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Check, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyEntry {
  date: string;
  totalXP: number;
  completedTasks: string[];
  notes: string;
  mood: 'fire' | 'good' | 'okay' | 'struggle';
}

interface DailyRecordProps {
  todayXP: number;
  completedTasks: Set<string>;
}

export const DailyRecord = ({ todayXP, completedTasks }: DailyRecordProps) => {
  const { toast } = useToast();
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>(() => {
    const saved = localStorage.getItem('dailyRecords');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [todayNotes, setTodayNotes] = useState('');
  const [todayMood, setTodayMood] = useState<'fire' | 'good' | 'okay' | 'struggle'>('good');

  const today = new Date().toDateString();

  useEffect(() => {
    localStorage.setItem('dailyRecords', JSON.stringify(dailyEntries));
  }, [dailyEntries]);

  const saveTodayRecord = () => {
    const todayEntry: DailyEntry = {
      date: today,
      totalXP: todayXP,
      completedTasks: Array.from(completedTasks),
      notes: todayNotes,
      mood: todayMood
    };

    setDailyEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== today);
      return [...filtered, todayEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    toast({
      title: "Daily Record Saved! 📝",
      description: `Your ${todayXP} XP day has been recorded`,
      className: "bg-gradient-to-r from-green-800 to-emerald-800 text-white border-green-500",
    });
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'fire': return '🔥';
      case 'good': return '💪';
      case 'okay': return '😐';
      case 'struggle': return '😤';
      default: return '💪';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'fire': return 'from-red-500 to-orange-500';
      case 'good': return 'from-green-500 to-emerald-500';
      case 'okay': return 'from-yellow-500 to-orange-500';
      case 'struggle': return 'from-purple-500 to-pink-500';
      default: return 'from-green-500 to-emerald-500';
    }
  };

  const recentEntries = dailyEntries.slice(0, 5);

  return (
    <Card className="p-6 bg-slate-900/50 border-purple-500/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          DAILY DIVINE RECORD
        </h2>
      </div>

      {/* Today's Record Form */}
      <div className="space-y-4 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-200 mb-2 text-sm font-medium">Today's Vibe</label>
            <div className="grid grid-cols-4 gap-2">
              {(['fire', 'good', 'okay', 'struggle'] as const).map((mood) => (
                <Button
                  key={mood}
                  size="sm"
                  variant={todayMood === mood ? "default" : "outline"}
                  onClick={() => setTodayMood(mood)}
                  className={`h-12 ${todayMood === mood ? `bg-gradient-to-r ${getMoodColor(mood)}` : 'border-purple-500/30'}`}
                >
                  <div className="text-center">
                    <div className="text-lg">{getMoodEmoji(mood)}</div>
                    <div className="text-xs capitalize">{mood}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-purple-200 mb-2 text-sm font-medium">Today's XP</label>
            <div className="flex items-center gap-2">
              <Badge className="bg-gradient-to-r from-cyan-600 to-purple-600 text-lg px-4 py-2">
                {todayXP} XP
              </Badge>
              <Badge variant="outline" className="border-purple-500/30 text-purple-200">
                {completedTasks.size} tasks
              </Badge>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-purple-200 mb-2 text-sm font-medium">Daily Reflection</label>
          <textarea
            value={todayNotes}
            onChange={(e) => setTodayNotes(e.target.value)}
            placeholder="What did you conquer today? What will you dominate tomorrow?"
            className="w-full p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg text-purple-100 placeholder-purple-400 resize-none h-20"
          />
        </div>

        <Button 
          onClick={saveTodayRecord}
          className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          RECORD TODAY'S DOMINANCE
        </Button>
      </div>

      {/* Recent Records */}
      {recentEntries.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-purple-200 mb-4">Recent Records</h3>
          <div className="space-y-3">
            {recentEntries.map((entry, index) => (
              <div key={entry.date} className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-300">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                  </div>
                  <Badge className={`bg-gradient-to-r ${getMoodColor(entry.mood)}`}>
                    {entry.totalXP} XP
                  </Badge>
                </div>
                
                {entry.notes && (
                  <p className="text-sm text-purple-200 mb-2">{entry.notes}</p>
                )}
                
                <div className="flex items-center gap-2 text-xs text-purple-300">
                  <Check className="w-3 h-3" />
                  {entry.completedTasks.length} tasks completed
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
