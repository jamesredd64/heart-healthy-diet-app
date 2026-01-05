import { useState, useCallback, useEffect } from 'react';
import { MealSchedule, Meal, Food, MealType, DEFAULT_MEAL_TIMES } from '@/types/meal';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'heart-healthy-meal-schedule';

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
    setSchedule(prev => ({
      ...prev,
      [mealType]: {
        ...prev[mealType],
        time,
      },
    }));
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

  return {
    schedule,
    updateMealTime,
    addFood,
    updateFood,
    removeFood,
    getMealHealthScore,
    resetToDefaults,
  };
};
