import { useMealSchedule } from '@/hooks/useMealSchedule';
import { MealSection } from '@/components/MealSection';
import { DailyOverview } from '@/components/DailyOverview';
import { HeartHealthSuggestions } from '@/components/HeartHealthSuggestions';
import { InitialMenuSelector } from '@/components/InitialMenuSelector';
import { MealType } from '@/types/meal';
import { Heart } from 'lucide-react';

const Index = () => {
  const {
    schedule,
    updateMealTime,
    addFood,
    removeFood,
    getMealHealthScore,
    resetToDefaults,
    setMealFoods,
    resetAllMenus,
  } = useMealSchedule();

  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner'];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-heart shadow-glow">
              <Heart className="h-5 w-5 fill-current text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HeartMeal</h1>
              <p className="text-xs text-muted-foreground">Heart-Healthy Diet Planner</p>
            </div>
          </div>
          <InitialMenuSelector
            onSetInitialMenu={setMealFoods}
            onResetAllMenus={resetAllMenus}
            currentFoods={{
              breakfast: schedule.breakfast.foods,
              lunch: schedule.lunch.foods,
              dinner: schedule.dinner.foods,
            }}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Plan Your <span className="text-gradient-heart">Heart-Healthy</span> Meals
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Set your meal times, add nutritious foods, and track your heart health score throughout the day.
            <span className="block mt-1 text-sm text-sage">
              💡 Tip: Edit breakfast time to automatically adjust lunch and dinner times!
            </span>
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Meals */}
          <div className="space-y-6 lg:col-span-2">
            {mealTypes.map((type) => (
              <MealSection
                key={type}
                meal={schedule[type]}
                onTimeChange={updateMealTime}
                onAddFood={addFood}
                onRemoveFood={removeFood}
                healthScore={getMealHealthScore(type)}
              />
            ))}
          </div>

          {/* Right Column - Overview & Suggestions */}
          <div className="space-y-6">
            <DailyOverview 
              schedule={schedule} 
              getHealthScore={getMealHealthScore}
            />
            <HeartHealthSuggestions onAddFood={addFood} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            ❤️ Eat well, live well. Your heart will thank you.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
