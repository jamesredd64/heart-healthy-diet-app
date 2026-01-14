import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Heart, ChevronDown, RotateCcw } from 'lucide-react';
import { HEART_HEALTHY_SUGGESTIONS } from '@/data/initialMenus';
import { FoodImageCard } from './FoodImageCard';
import { Food, MealType, MEAL_LABELS, MEAL_ICONS } from '@/types/meal';
import { useState } from 'react';

interface HeartHealthSuggestionsProps {
  onAddFood?: (mealType: MealType, food: Omit<Food, 'id'>) => void;
  addedSuggestions?: Record<MealType, string[]>;
  onUpdateAddedSuggestions?: (mealType: MealType, foodNames: string[]) => void;
}

export const HeartHealthSuggestions = ({ 
  onAddFood,
  addedSuggestions: externalAddedSuggestions,
  onUpdateAddedSuggestions,
}: HeartHealthSuggestionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [internalAddedSuggestions, setInternalAddedSuggestions] = useState<Record<MealType, string[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  // Use external state if provided, otherwise use internal state
  const addedSuggestions = externalAddedSuggestions || internalAddedSuggestions;
  
  const updateAddedSuggestions = (mealType: MealType, foodNames: string[]) => {
    if (onUpdateAddedSuggestions) {
      onUpdateAddedSuggestions(mealType, foodNames);
    } else {
      setInternalAddedSuggestions(prev => ({ ...prev, [mealType]: foodNames }));
    }
  };

  const handleAddSuggestion = (suggestion: typeof HEART_HEALTHY_SUGGESTIONS[0]) => {
    // Check if already added to this meal
    if (addedSuggestions[selectedMeal].includes(suggestion.name)) {
      return;
    }

    if (onAddFood) {
      onAddFood(selectedMeal, {
        name: suggestion.name,
        type: suggestion.type,
        healthIndex: suggestion.healthIndex,
        servingSize: suggestion.servingSize,
      });
      
      // Track that this suggestion was added to this meal
      updateAddedSuggestions(selectedMeal, [...addedSuggestions[selectedMeal], suggestion.name]);
    }
  };

  const handleResetMeal = () => {
    updateAddedSuggestions(selectedMeal, []);
  };

  const getAddedCount = (mealType: MealType) => addedSuggestions[mealType].length;

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
                    {getAddedCount(type) > 0 && (
                      <span className="ml-1 rounded-full bg-primary/20 px-1.5 text-xs">
                        {getAddedCount(type)}
                      </span>
                    )}
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
                  isSelected={addedSuggestions[selectedMeal].includes(item.name)}
                  showAddButton={!!onAddFood && !addedSuggestions[selectedMeal].includes(item.name)}
                  onSelect={() => handleAddSuggestion(item)}
                />
              ))}
            </div>

            {getAddedCount(selectedMeal) > 0 && (
              <div className="mt-4 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset {MEAL_LABELS[selectedMeal]} Suggestions
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset {MEAL_LABELS[selectedMeal]} Suggestions?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will clear all {getAddedCount(selectedMeal)} added suggestion{getAddedCount(selectedMeal) !== 1 ? 's' : ''} for {MEAL_LABELS[selectedMeal].toLowerCase()}. 
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetMeal}>
                        Reset
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
