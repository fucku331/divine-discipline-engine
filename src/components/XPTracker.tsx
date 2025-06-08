import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CustomTaskDialog } from '@/components/CustomTaskDialog';

interface XPTrackerProps {
  onAddXP: (amount: number) => void;
}

interface CustomTask {
  id: string;
  name: string;
  xp: number;
  description?: string;
}

export const XPTracker = ({ onAddXP }: XPTrackerProps) => {
  const { toast } = useToast();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [customTasks, setCustomTasks] = useState<CustomTask[]>(() => {
    const saved = localStorage.getItem('customTasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('customTasks', JSON.stringify(customTasks));
  }, [customTasks]);

  const domains = [
    {
      id: 'body',
      name: '💪 BODY DOMINANCE',
      maxXP: 35,
      color: 'from-red-500 to-orange-500',
      tasks: [
        { id: 'morning-ritual', name: '🚀 Morning Ritual (ice, drink, brush, stretch, meditate)', xp: 5 },
        { id: 'workout', name: '🔥 Workout (calisthenics/abs/cardio)', xp: 10 },
        { id: 'flexibility', name: '🧘 Flexibility Flow', xp: 5 },
        { id: 'clean-eating', name: '🍽️ Clean Eating + Supplements', xp: 5 },
        { id: 'night-routine', name: '🧎‍♂️ Night Stretch + Grooming', xp: 5 },
        { id: 'no-bad-habits', name: '❌ No Bad Habits', xp: 5 },
      ]
    },
    {
      id: 'warrior',
      name: '🥷 WARRIOR CODE',
      maxXP: 30,
      color: 'from-green-500 to-emerald-500',
      tasks: [
        { id: 'combat-training', name: '🥋 Combat Training (30+ min)', xp: 8 },
        { id: 'vehicle-skill', name: '🛻 Vehicle Skill Practice', xp: 5 },
        { id: 'biohacking', name: '🧬 Biohacking Routine (sun, cold shower, T-boost)', xp: 5 },
        { id: 'meditation', name: '🧘 Meditation / Emotional Control', xp: 4 },
        { id: 'dynamic-flex', name: '🔁 Dynamic Flexibility + Recovery', xp: 4 },
      ]
    },
    {
      id: 'hacker',
      name: '👨‍💻 HACKER DOMINANCE',
      maxXP: 30,
      color: 'from-cyan-500 to-blue-500',
      tasks: [
        { id: 'coding', name: '💻 Coding/Hacking (scripting, CTF, recon)', xp: 10 },
        { id: 'reverse-eng', name: '🔍 Reverse Engineering or Malware Analysis', xp: 5 },
        { id: 'new-tool', name: '🔧 Study New Hacking Tool', xp: 5 },
        { id: 'osint', name: '🌐 OSINT Training (30+ min)', xp: 5 },
        { id: 'cyber-hygiene', name: '🛡️ Cyber Hygiene + Hardening', xp: 5 },
      ]
    },
    {
      id: 'seduction',
      name: '🎭 MIND, SEDUCTION & DARK ARTS',
      maxXP: 30,
      color: 'from-purple-500 to-pink-500',
      tasks: [
        { id: 'voice-training', name: '🎤 Voice Training (deep tone, rhythm, slow talk)', xp: 5 },
        { id: 'seduction-training', name: '🧠 Seduction / Gaze / Touch Training', xp: 5 },
        { id: 'dark-psychology', name: '💋 Practice Dark Psychology / Persuasion', xp: 5 },
        { id: 'body-language', name: '🧍 Body Language Mastery', xp: 5 },
        { id: 'emotional-mastery', name: '🧠 Emotional Mastery Meditations', xp: 4 },
        { id: 'storytelling', name: '🗣️ Storytelling/Conversation Flow', xp: 5 },
      ]
    },
    {
      id: 'brain',
      name: '🧬 MIND GROWTH & BRAIN HACKING',
      maxXP: 25,
      color: 'from-violet-500 to-purple-500',
      tasks: [
        { id: 'nootropics', name: '🧠 Nootropic Stack / Smart Fuel', xp: 5 },
        { id: 'chess', name: '♟️ Chess or Strategy Training', xp: 5 },
        { id: 'memory-palace', name: '🏛️ Memory Palace Practice', xp: 5 },
        { id: 'sleep-optimization', name: '🔆 Sunlight / Sleep Optimization', xp: 5 },
        { id: 'reading', name: '📖 Book Reading (human nature, finance, politics)', xp: 5 },
      ]
    },
    {
      id: 'intel',
      name: '💼 INTEL & NETWORKING DOMINANCE',
      maxXP: 25,
      color: 'from-yellow-500 to-orange-500',
      tasks: [
        { id: 'finance', name: '💵 Finance Study / Crypto / Trading', xp: 5 },
        { id: 'politics', name: '🧠 Political Power Analysis', xp: 5 },
        { id: 'language', name: '🌍 Language Practice (new or mastery)', xp: 5 },
        { id: 'networking', name: '🌐 Networking or Social Engineering', xp: 5 },
        { id: 'emotional-infiltration', name: '🤝 Make someone open up fully', xp: 5 },
      ]
    },
    {
      id: 'custom',
      name: '⚡ CUSTOM TASKS',
      maxXP: 0,
      color: 'from-emerald-500 to-teal-500',
      tasks: customTasks.map(task => ({ id: task.id, name: task.name, xp: task.xp }))
    }
  ];

  const handleTaskToggle = (domainId: string, taskId: string, xp: number, taskName: string) => {
    const taskKey = `${domainId}-${taskId}`;
    
    if (completedTasks.has(taskKey)) {
      setCompletedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskKey);
        return newSet;
      });
      onAddXP(-xp);
      toast({
        title: "XP Removed",
        description: `Removed ${xp} XP for: ${taskName}`,
        variant: "destructive",
      });
    } else {
      setCompletedTasks(prev => new Set([...prev, taskKey]));
      onAddXP(xp);
      toast({
        title: "XP Gained! 🔥",
        description: `+${xp} XP for: ${taskName}`,
        className: "bg-gradient-to-r from-purple-800 to-cyan-800 text-white border-purple-500",
      });
    }
  };

  const handleAddCustomTask = (newTask: CustomTask) => {
    setCustomTasks(prev => [...prev, newTask]);
    toast({
      title: "Custom Task Added! 🎯",
      description: `Added "${newTask.name}" worth ${newTask.xp} XP`,
      className: "bg-gradient-to-r from-emerald-800 to-teal-800 text-white border-emerald-500",
    });
  };

  const handleDeleteCustomTask = (taskId: string) => {
    setCustomTasks(prev => prev.filter(task => task.id !== taskId));
    
    // Remove from completed tasks if it was completed
    const taskKey = `custom-${taskId}`;
    if (completedTasks.has(taskKey)) {
      setCompletedTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskKey);
        return newSet;
      });
    }
    
    toast({
      title: "Custom Task Deleted",
      description: "Task removed from your list",
      variant: "destructive",
    });
  };

  const getDomainXP = (domainId: string) => {
    return domains.find(d => d.id === domainId)?.tasks.reduce((total, task) => {
      const taskKey = `${domainId}-${task.id}`;
      return total + (completedTasks.has(taskKey) ? task.xp : 0);
    }, 0) || 0;
  };

  // Update custom domain maxXP
  const customDomain = domains.find(d => d.id === 'custom');
  if (customDomain) {
    customDomain.maxXP = customTasks.reduce((total, task) => total + task.xp, 0);
  }

  return (
    <Card className="p-6 bg-slate-900/50 border-purple-500/30 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        ⚔️ DIVINE DISCIPLINE TRACKER ⚔️
      </h2>
      
      <Tabs defaultValue="body" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-7 mb-6 bg-purple-900/50">
          {domains.map(domain => (
            <TabsTrigger 
              key={domain.id} 
              value={domain.id}
              className="text-xs data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              {domain.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {domains.map(domain => {
          const currentXP = getDomainXP(domain.id);
          const progress = domain.maxXP > 0 ? (currentXP / domain.maxXP) * 100 : 0;
          
          return (
            <TabsContent key={domain.id} value={domain.id} className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className={`text-xl font-bold bg-gradient-to-r ${domain.color} bg-clip-text text-transparent`}>
                  {domain.name}
                </h3>
                <div className="flex items-center justify-center gap-4">
                  <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
                    {currentXP}/{domain.maxXP || currentXP} XP
                  </Badge>
                  {domain.maxXP > 0 && (
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r ${domain.color} rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {domain.id === 'custom' && (
                <div className="mb-4">
                  <CustomTaskDialog onAddTask={handleAddCustomTask} />
                </div>
              )}

              <div className="grid gap-3">
                {domain.tasks.map(task => {
                  const taskKey = `${domain.id}-${task.id}`;
                  const isCompleted = completedTasks.has(taskKey);
                  const isCustomTask = domain.id === 'custom';
                  
                  return (
                    <div 
                      key={task.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                        isCompleted 
                          ? 'bg-green-900/20 border-green-500/50' 
                          : 'bg-purple-900/20 border-purple-500/30 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className={`text-sm ${isCompleted ? 'line-through text-green-400' : 'text-purple-200'}`}>
                          {task.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={isCompleted ? "default" : "secondary"}
                          className={isCompleted ? "bg-green-600" : "bg-purple-700"}
                        >
                          {task.xp} XP
                        </Badge>
                        
                        <Button
                          size="sm"
                          variant={isCompleted ? "destructive" : "default"}
                          onClick={() => handleTaskToggle(domain.id, task.id, task.xp, task.name)}
                          className="h-8 w-8 p-0"
                        >
                          {isCompleted ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </Button>

                        {isCustomTask && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteCustomTask(task.id)}
                            className="h-8 w-8 p-0 border-red-500/50 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </Card>
  );
};
