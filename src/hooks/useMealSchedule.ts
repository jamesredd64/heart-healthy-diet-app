import { useState, useCallback, useEffect } from 'react';
import { MealSchedule, Meal, Food, MealType, DEFAULT_MEAL_TIMES } from '@/types/meal';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'heart-healthy-meal-schedule';

// Time offset constants (in minutes from breakfast)
const LUNCH_OFFSET_MIN = 240; // 4 hours
const LUNCH_OFFSET_MAX = 270; // 4.5 hours (uses 4:30 offset)
const DINNER_OFFSET_MIN = 570; // 9.5 hours
const DINNER_OFFSET_MAX = 600; // 10 hours (uses 10 hours offset)

const parseTime = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const formatTime = (totalMinutes: number): string => {
  // Handle overflow past midnight
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const calculateCascadingTimes = (breakfastTime: string): { lunch: string; dinner: string } => {
  const breakfastMinutes = parseTime(breakfastTime);
  
  // Lunch: 4-4.5 hours after breakfast (targeting around 12:00-12:30 PM for 8 AM breakfast)
  const lunchMinutes = breakfastMinutes + 240; // 4 hours after breakfast
  
  // Dinner: 9.5-10 hours after breakfast (targeting around 5:30-6:00 PM for 8 AM breakfast)
  const dinnerMinutes = breakfastMinutes + 570; // 9.5 hours after breakfast
  
  return {
    lunch: formatTime(lunchMinutes),
    dinner: formatTime(dinnerMinutes),
  };
};

const createDefaultMeal = (type: MealType): Meal => ({
  type,
  time: DEFAULT_MEAL_TIMES[type],
  foods: [],
});

const createDefaultSchedule = (): MealSchedule => ({
  breakfast: createDefaultMeal('breakfast'),
  lunch: createDefaultMeal('lunch'),
  dinner: createDefaultMeal('dinner'),
});

export const useMealSchedule = () => {
  const [schedule, setSchedule] = useState<MealSchedule>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return createDefaultSchedule();
      }
    }
    return createDefaultSchedule();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
  }, [schedule]);

  const updateMealTime = useCallback((mealType: MealType, time: string) => {
    setSchedule(prev => {
      if (mealType === 'breakfast') {
        // Cascade changes to lunch and dinner
        const { lunch, dinner } = calculateCascadingTimes(time);
        return {
          ...prev,
          breakfast: { ...prev.breakfast, time },
          lunch: { ...prev.lunch, time: lunch },
          dinner: { ...prev.dinner, time: dinner },
        };
      }
      // For lunch and dinner, just update that meal
      return {
        ...prev,
        [mealType]: {
          ...prev[mealType],
          time,
        },
      };
    });
  }, []);

  const addFood = useCallback((mealType: MealType, food: Omit<Food, 'id'>) => {
    const newFood: Food = {
      ...food,
      id: uuidv4(),
    };
    setSchedule(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: [...prev[mealType].foods, newFood],
      },
    }));
  }, []);

  const updateFood = useCallback((mealType: MealType, foodId: string, updates: Partial<Food>) => {
    setSchedule(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: prev[mealType].foods.map(food =>
          food.id === foodId ? { ...food, ...updates } : food
        ),
      },
    }));
  }, []);

  const removeFood = useCallback((mealType: MealType, foodId: string) => {
    setSchedule(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: prev[mealType].foods.filter(food => food.id !== foodId),
      },
    }));
  }, []);

  const getMealHealthScore = useCallback((mealType: MealType): number => {
    const foods = schedule[mealType].foods;
    if (foods.length === 0) return 0;
    const totalScore = foods.reduce((sum, food) => sum + food.healthIndex, 0);
    return Math.round(totalScore / foods.length);
  }, [schedule]);

  const resetToDefaults = useCallback(() => {
    setSchedule(createDefaultSchedule());
  }, []);

  const setMealFoods = useCallback((mealType: MealType, foods: Omit<Food, 'id'>[]) => {
    const newFoods: Food[] = foods.map(food => ({
      ...food,
      id: uuidv4(),
    }));
    setSchedule(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        foods: newFoods,
      },
    }));
  }, []);

  const resetAllMenus = useCallback(() => {
    setSchedule(prev => ({
      breakfast: { ...prev.breakfast, foods: [] },
      lunch: { ...prev.lunch, foods: [] },
      dinner: { ...prev.dinner, foods: [] },
    }));
  }, []);

  return {
    schedule,
    updateMealTime,
    addFood,
    updateFood,
    removeFood,
    getMealHealthScore,
    resetToDefaults,
    setMealFoods,
    resetAllMenus,
  };
};
