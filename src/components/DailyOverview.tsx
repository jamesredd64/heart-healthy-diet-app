import { MealSchedule, MealType, MEAL_LABELS, MEAL_ICONS } from '@/types/meal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, TrendingUp } from 'lucide-react';

interface DailyOverviewProps {
  schedule: MealSchedule;
  getHealthScore: (mealType: MealType) => number;
}

export const DailyOverview = ({ schedule, getHealthScore }: DailyOverviewProps) => {
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];
  
  const scores = mealTypes.map(type => getHealthScore(type));
  const validScores = scores.filter(s => s > 0);
  const averageScore = validScores.length > 0 
    ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
    : 0;

  const totalFoods = mealTypes.reduce(
    (sum, type) => sum + schedule[type].foods.length, 
    0
  );

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-heart-soft via-card to-warm-soft shadow-card">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sage/5 blur-3xl" />
      
      <CardHeader className="relative pb-3">
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Daily Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-6">
        {/* Overall Score */}
        <div className="flex items-center justify-between rounded-xl bg-card/70 p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-heart shadow-glow">
              <Heart className="h-6 w-6 fill-current text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Heart Health Score</p>
              <p className="text-2xl font-bold text-foreground">
                {averageScore > 0 ? `${averageScore}/10` : 'No data'}
              </p>
            </div>
          </div>
          {averageScore > 0 && (
            <Progress 
              value={averageScore * 10} 
              className="h-2 w-24 bg-muted"
            />
          )}
        </div>

        {/* Meal Timeline */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">Today's Schedule</h3>
          <div className="space-y-2">
            {mealTypes.map((type) => (
              <div
                key={type}
                className="flex items-center justify-between rounded-lg bg-card/50 px-4 py-3 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{MEAL_ICONS[type]}</span>
                  <span className="font-medium text-foreground">{MEAL_LABELS[type]}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {formatTime(schedule[type].time)}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {schedule[type].foods.length} foods
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-card/70 p-4 text-center shadow-soft">
            <p className="text-3xl font-bold text-primary">{totalFoods}</p>
            <p className="text-xs text-muted-foreground">Total Foods Planned</p>
          </div>
          <div className="rounded-xl bg-card/70 p-4 text-center shadow-soft">
            <p className="text-3xl font-bold text-sage">{validScores.length}</p>
            <p className="text-xs text-muted-foreground">Meals with Foods</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
