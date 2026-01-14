import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MealType, Food, MEAL_LABELS, MEAL_ICONS } from '@/types/meal';
import { INITIAL_MENUS, InitialFoodItem } from '@/data/initialMenus';
import { FoodImageCard } from './FoodImageCard';
import { UtensilsCrossed, RotateCcw, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface InitialMenuSelectorProps {
  onSetInitialMenu: (mealType: MealType, foods: Omit<Food, 'id'>[]) => void;
  onResetAllMenus: () => void;
  currentFoods: Record<MealType, Food[]>;
}

export const InitialMenuSelector = ({ 
  onSetInitialMenu, 
  onResetAllMenus,
  currentFoods 
}: InitialMenuSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('breakfast');
  const [selectedFoods, setSelectedFoods] = useState<Record<MealType, string[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const toggleFoodSelection = (mealType: MealType, foodName: string) => {
    setSelectedFoods(prev => ({
      ...prev,
      [mealType]: prev[mealType].includes(foodName)
        ? prev[mealType].filter(f => f !== foodName)
        : [...prev[mealType], foodName],
    }));
  };

  const handleApplySelection = (mealType: MealType) => {
    const menu = INITIAL_MENUS[mealType];
    const selected = selectedFoods[mealType];
    const foods = menu
      .filter(item => selected.includes(item.name))
      .map(item => ({
        name: item.name,
        type: item.type,
        healthIndex: item.healthIndex,
        servingSize: item.servingSize,
      }));
    
    onSetInitialMenu(mealType, foods);
  };

  const handleResetAll = () => {
    // Reset all meals to their initial menus
    (Object.keys(INITIAL_MENUS) as MealType[]).forEach(mealType => {
      const menu = INITIAL_MENUS[mealType];
      const foods = menu.map(item => ({
        name: item.name,
        type: item.type,
        healthIndex: item.healthIndex,
        servingSize: item.servingSize,
      }));
      onSetInitialMenu(mealType, foods);
    });
    setIsOpen(false);
  };

  const handleQuickReset = () => {
    onResetAllMenus();
  };

  return (
    <div className="flex gap-2">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-sage/50 text-sage hover:border-sage hover:bg-sage-soft"
          >
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Initial Menu
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              Set Initial Food Menu
            </DialogTitle>
          </DialogHeader>

          <Tabs value={selectedMeal} onValueChange={(v) => setSelectedMeal(v as MealType)}>
            <TabsList className="grid w-full grid-cols-3">
              {(['breakfast', 'lunch', 'dinner'] as MealType[]).map(type => (
                <TabsTrigger key={type} value={type} className="gap-2">
                  <span>{MEAL_ICONS[type]}</span>
                  {MEAL_LABELS[type]}
                  {selectedFoods[type].length > 0 && (
                    <span className="ml-1 rounded-full bg-primary/20 px-1.5 text-xs">
                      {selectedFoods[type].length}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {(['breakfast', 'lunch', 'dinner'] as MealType[]).map(mealType => (
              <TabsContent key={mealType} value={mealType} className="mt-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {INITIAL_MENUS[mealType].map((food) => (
                      <FoodImageCard
                        key={food.name}
                        food={food}
                        isSelected={selectedFoods[mealType].includes(food.name)}
                        onSelect={() => toggleFoodSelection(mealType, food.name)}
                      />
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="mt-4 flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFoods(prev => ({ ...prev, [mealType]: [] }))}
                  >
                    Clear Selection
                  </Button>
                  <Button
                    onClick={() => handleApplySelection(mealType)}
                    disabled={selectedFoods[mealType].length === 0}
                    className="bg-gradient-heart"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Apply to {MEAL_LABELS[mealType]}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-4 flex justify-center border-t pt-4">
            <Button
              variant="outline"
              onClick={handleResetAll}
              className="border-heart/50 text-heart hover:border-heart hover:bg-heart/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset All Meals to Initial Menu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-border/50 text-muted-foreground hover:border-primary hover:text-primary"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset All Menus?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear all foods from breakfast, lunch, and dinner. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuickReset}>
              Reset All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
