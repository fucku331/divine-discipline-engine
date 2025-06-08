
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface CustomTask {
  id: string;
  name: string;
  xp: number;
  description?: string;
}

interface CustomTaskDialogProps {
  onAddTask: (task: CustomTask) => void;
}

export const CustomTaskDialog = ({ onAddTask }: CustomTaskDialogProps) => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskXP, setTaskXP] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim() || !taskXP.trim()) return;
    
    const xpValue = parseInt(taskXP);
    if (isNaN(xpValue) || xpValue <= 0) return;

    const newTask: CustomTask = {
      id: `custom-${Date.now()}`,
      name: taskName.trim(),
      xp: xpValue,
      description: taskDescription.trim() || undefined,
    };

    onAddTask(newTask);
    
    // Reset form
    setTaskName('');
    setTaskXP('');
    setTaskDescription('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full bg-purple-800/50 border-purple-500/50 text-purple-200 hover:bg-purple-700/50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Create Custom Task
          </DialogTitle>
          <DialogDescription className="text-purple-300">
            Add your own task with custom XP value to track your unique goals.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name" className="text-purple-200">
              Task Name
            </Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., 🎯 Complete side project"
              className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task-xp" className="text-purple-200">
              XP Value
            </Label>
            <Input
              id="task-xp"
              type="number"
              min="1"
              max="50"
              value={taskXP}
              onChange={(e) => setTaskXP(e.target.value)}
              placeholder="5"
              className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task-description" className="text-purple-200">
              Description (Optional)
            </Label>
            <Textarea
              id="task-description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Additional details about this task..."
              className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-400 resize-none"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
