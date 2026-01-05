import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Meal, MealType, MEAL_ICONS, MEAL_LABELS } from '@/types/meal';
import { Clock, Edit2, Check } from 'lucide-react';

interface MealTimeCardProps {
  meal: Meal;
  onTimeChange: (mealType: MealType, time: string) => void;
  healthScore: number;
}

export const MealTimeCard = ({ meal, onTimeChange, healthScore }: MealTimeCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTime, setTempTime] = useState(meal.time);

  const handleSave = () => {
    onTimeChange(meal.type, tempTime);
    setIsEditing(false);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-sage';
    if (score >= 5) return 'text-warm';
    return 'text-heart';
  };

  return (
    <Card className="group relative overflow-hidden border-border/50 shadow-card transition-all duration-300 hover:shadow-glow">
      <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-accent/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-float">{MEAL_ICONS[meal.type]}</span>
            <CardTitle className="text-xl font-semibold text-foreground">
              {MEAL_LABELS[meal.type]}
            </CardTitle>
          </div>
          {healthScore > 0 && (
            <div className={`text-lg font-bold ${getScoreColor(healthScore)}`}>
              {healthScore}/10
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-muted-foreground" />
          
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                type="time"
                value={tempTime}
                onChange={(e) => setTempTime(e.target.value)}
                className="w-32 border-primary/30 focus:border-primary"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSave}
                className="h-8 w-8 p-0 text-sage hover:bg-sage-soft"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-foreground">
                {formatTime(meal.time)}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {meal.foods.length === 0 ? (
            <span className="italic">No foods added yet</span>
          ) : (
            <span>{meal.foods.length} food{meal.foods.length !== 1 ? 's' : ''} planned</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
