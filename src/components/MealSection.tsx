import { Meal, MealType, Food, MEAL_ICONS, MEAL_LABELS } from '@/types/meal';
import { MealTimeCard } from './MealTimeCard';
import { FoodCard } from './FoodCard';
import { AddFoodForm } from './AddFoodForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UtensilsCrossed } from 'lucide-react';

interface MealSectionProps {
  meal: Meal;
  onTimeChange: (mealType: MealType, time: string) => void;
  onAddFood: (mealType: MealType, food: Omit<Food, 'id'>) => void;
  onRemoveFood: (mealType: MealType, foodId: string) => void;
  healthScore: number;
}

export const MealSection = ({ 
  meal, 
  onTimeChange, 
  onAddFood, 
  onRemoveFood,
  healthScore 
}: MealSectionProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <MealTimeCard 
        meal={meal} 
        onTimeChange={onTimeChange}
        healthScore={healthScore}
      />

      <Accordion type="single" collapsible className="rounded-xl border border-border/30 bg-card/30">
        <AccordionItem value="foods" className="border-none">
          <AccordionTrigger className="px-5 py-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">
                {MEAL_LABELS[meal.type]} Foods
              </span>
              {meal.foods.length > 0 && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {meal.foods.length}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 px-5 pb-5">
            {meal.foods.length > 0 && (
              <div className="space-y-2">
                {meal.foods.map((food) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onRemove={() => onRemoveFood(meal.type, food.id)}
                  />
                ))}
              </div>
            )}

            <AddFoodForm onAdd={(food) => onAddFood(meal.type, food)} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
