export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface Food {
  id: string;
  name: string;
  type: FoodType;
  healthIndex: number; // 1-10, 10 being most heart-healthy
  servingSize?: string;
  notes?: string;
}

export type FoodType = 
  | 'protein'
  | 'vegetable'
  | 'fruit'
  | 'grain'
  | 'dairy'
  | 'fat'
  | 'beverage'
  | 'other';

export interface Meal {
  type: MealType;
  time: string; // HH:mm format
  foods: Food[];
}

export interface MealSchedule {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export const FOOD_TYPE_LABELS: Record<FoodType, string> = {
  protein: 'Protein',
  vegetable: 'Vegetable',
  fruit: 'Fruit',
  grain: 'Whole Grain',
  dairy: 'Dairy',
  fat: 'Healthy Fat',
  beverage: 'Beverage',
  other: 'Other',
};

export const FOOD_TYPE_COLORS: Record<FoodType, string> = {
  protein: 'bg-heart text-primary-foreground',
  vegetable: 'bg-sage text-primary-foreground',
  fruit: 'bg-warm text-primary-foreground',
  grain: 'bg-amber-600 text-primary-foreground',
  dairy: 'bg-blue-500 text-primary-foreground',
  fat: 'bg-emerald-600 text-primary-foreground',
  beverage: 'bg-cyan-500 text-primary-foreground',
  other: 'bg-muted-foreground text-primary-foreground',
};

export const DEFAULT_MEAL_TIMES: Record<MealType, string> = {
  breakfast: '07:30',
  lunch: '12:30',
  dinner: '18:30',
};

export const MEAL_ICONS: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
};

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};
