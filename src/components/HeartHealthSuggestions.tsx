import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, ChevronDown } from 'lucide-react';
import { HEART_HEALTHY_SUGGESTIONS } from '@/data/initialMenus';
import { FoodImageCard } from './FoodImageCard';
import { Food, MealType, MEAL_LABELS, MEAL_ICONS } from '@/types/meal';
import { useState } from 'react';

interface HeartHealthSuggestionsProps {
  onAddFood?: (mealType: MealType, food: Omit<Food, 'id'>) => void;
}

export const HeartHealthSuggestions = ({ onAddFood }: HeartHealthSuggestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');

  const handleAddSuggestion = (suggestion: typeof HEART_HEALTHY_SUGGESTIONS[0]) => {
    if (onAddFood) {
      onAddFood(selectedMeal, {
        name: suggestion.name,
        type: suggestion.type,
        healthIndex: suggestion.healthIndex,
        servingSize: suggestion.servingSize,
      });
    }
  };

  return (
    <Card className="border-sage/30 bg-gradient-to-br from-sage-soft to-accent/50 shadow-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 sm:p-5 hover:bg-muted/30 transition-colors rounded-t-xl">
            <div className="flex items-center gap-2 sm:gap-3">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-current text-sage" />
              <span className="text-base sm:text-lg font-semibold text-sage">
                Heart-Healthy Suggestions
              </span>
            </div>
            <ChevronDown 
              className={`h-4 w-4 sm:h-5 sm:w-5 text-sage transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 pb-4 sm:pb-5 px-4 sm:px-5">
            <p className="mb-4 text-xs sm:text-sm text-muted-foreground">
              Select a meal type and add heart-healthy foods:
            </p>
            
            <Tabs value={selectedMeal} onValueChange={(v) => setSelectedMeal(v as MealType)} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                {(['breakfast', 'lunch', 'dinner'] as MealType[]).map(type => (
                  <TabsTrigger key={type} value={type} className="gap-1 sm:gap-2 text-xs sm:text-sm">
                    <span>{MEAL_ICONS[type]}</span>
                    <span className="hidden sm:inline">{MEAL_LABELS[type]}</span>
                    <span className="sm:hidden">{MEAL_LABELS[type].slice(0, 1)}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {HEART_HEALTHY_SUGGESTIONS.map((item) => (
                <FoodImageCard
                  key={item.name}
                  food={item}
                  compact
                  showAddButton={!!onAddFood}
                  onSelect={() => handleAddSuggestion(item)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
