import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';
import { HEART_HEALTHY_SUGGESTIONS } from '@/data/initialMenus';
import { FoodImageCard } from './FoodImageCard';
import { Food, MealType } from '@/types/meal';

interface HeartHealthSuggestionsProps {
  onAddFood?: (mealType: MealType, food: Omit<Food, 'id'>) => void;
}

export const HeartHealthSuggestions = ({ onAddFood }: HeartHealthSuggestionsProps) => {
  const handleAddSuggestion = (suggestion: typeof HEART_HEALTHY_SUGGESTIONS[0]) => {
    if (onAddFood) {
      // Add to dinner by default - user can move it later
      onAddFood('dinner', {
        name: suggestion.name,
        type: suggestion.type,
        healthIndex: suggestion.healthIndex,
        servingSize: suggestion.servingSize,
      });
    }
  };

  return (
    <Card className="border-sage/30 bg-gradient-to-br from-sage-soft to-accent/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-sage">
          <Heart className="h-5 w-5 fill-current" />
          Heart-Healthy Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Add these foods to your meals for better heart health:
        </p>
        <ScrollArea className="w-full">
          <div className="flex gap-3 pb-4">
            {HEART_HEALTHY_SUGGESTIONS.map((item) => (
              <div key={item.name} className="w-32 flex-shrink-0">
                <FoodImageCard
                  food={item}
                  compact
                  showAddButton={!!onAddFood}
                  onSelect={() => handleAddSuggestion(item)}
                />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
