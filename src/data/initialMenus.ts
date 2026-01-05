import { Food, FoodType, MealType } from '@/types/meal';

export interface InitialFoodItem {
  name: string;
  type: FoodType;
  healthIndex: number;
  servingSize?: string;
  imageUrl: string;
  variants?: string[];
}

export const INITIAL_BREAKFAST_MENU: InitialFoodItem[] = [
  {
    name: 'Scrambled Eggs',
    type: 'protein',
    healthIndex: 7,
    servingSize: '2 eggs',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&h=200&fit=crop',
    variants: ['1 egg', '2 eggs', '3 eggs'],
  },
  {
    name: 'Whole Wheat Toast',
    type: 'grain',
    healthIndex: 8,
    servingSize: '2 slices',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    variants: ['1 slice', '2 slices'],
  },
  {
    name: 'Potatoes',
    type: 'vegetable',
    healthIndex: 6,
    servingSize: '1/2 cup',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82ber40f?w=200&h=200&fit=crop',
    variants: ['Baked', 'Steamed', 'Hash Browns', 'Roasted'],
  },
  {
    name: 'Oatmeal',
    type: 'grain',
    healthIndex: 9,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=200&h=200&fit=crop',
  },
  {
    name: 'Fresh Berries',
    type: 'fruit',
    healthIndex: 10,
    servingSize: '1/2 cup',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop',
    variants: ['Blueberries', 'Strawberries', 'Mixed'],
  },
  {
    name: 'Greek Yogurt',
    type: 'dairy',
    healthIndex: 8,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop',
  },
];

export const INITIAL_LUNCH_MENU: InitialFoodItem[] = [
  {
    name: 'Grilled Chicken',
    type: 'protein',
    healthIndex: 9,
    servingSize: '4 oz',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=200&h=200&fit=crop',
  },
  {
    name: 'Garden Salad',
    type: 'vegetable',
    healthIndex: 10,
    servingSize: '2 cups',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop',
  },
  {
    name: 'Brown Rice',
    type: 'grain',
    healthIndex: 8,
    servingSize: '1/2 cup',
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=200&h=200&fit=crop',
  },
  {
    name: 'Salmon Fillet',
    type: 'protein',
    healthIndex: 10,
    servingSize: '4 oz',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  {
    name: 'Steamed Vegetables',
    type: 'vegetable',
    healthIndex: 9,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop',
    variants: ['Broccoli', 'Carrots', 'Mixed'],
  },
  {
    name: 'Quinoa',
    type: 'grain',
    healthIndex: 9,
    servingSize: '1/2 cup',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
  },
];

export const INITIAL_DINNER_MENU: InitialFoodItem[] = [
  {
    name: 'Grilled Fish',
    type: 'protein',
    healthIndex: 9,
    servingSize: '5 oz',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop',
    variants: ['Tilapia', 'Cod', 'Halibut'],
  },
  {
    name: 'Sweet Potato',
    type: 'vegetable',
    healthIndex: 9,
    servingSize: '1 medium',
    imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63a7e0c9e?w=200&h=200&fit=crop',
    variants: ['Baked', 'Mashed', 'Roasted'],
  },
  {
    name: 'Asparagus',
    type: 'vegetable',
    healthIndex: 9,
    servingSize: '6 spears',
    imageUrl: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?w=200&h=200&fit=crop',
  },
  {
    name: 'Lean Beef',
    type: 'protein',
    healthIndex: 6,
    servingSize: '4 oz',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=200&h=200&fit=crop',
  },
  {
    name: 'Spinach',
    type: 'vegetable',
    healthIndex: 10,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop',
  },
  {
    name: 'Olive Oil Drizzle',
    type: 'fat',
    healthIndex: 9,
    servingSize: '1 tbsp',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
  },
];

export const HEART_HEALTHY_SUGGESTIONS: InitialFoodItem[] = [
  {
    name: 'Salmon',
    type: 'protein',
    healthIndex: 10,
    servingSize: '4 oz',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop',
  },
  {
    name: 'Almonds',
    type: 'fat',
    healthIndex: 9,
    servingSize: '1/4 cup',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200&h=200&fit=crop',
  },
  {
    name: 'Avocado',
    type: 'fat',
    healthIndex: 9,
    servingSize: '1/2 avocado',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=200&h=200&fit=crop',
  },
  {
    name: 'Blueberries',
    type: 'fruit',
    healthIndex: 10,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop',
  },
  {
    name: 'Walnuts',
    type: 'fat',
    healthIndex: 9,
    servingSize: '1/4 cup',
    imageUrl: 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=200&h=200&fit=crop',
  },
  {
    name: 'Kale',
    type: 'vegetable',
    healthIndex: 10,
    servingSize: '1 cup',
    imageUrl: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=200&h=200&fit=crop',
  },
  {
    name: 'Chia Seeds',
    type: 'fat',
    healthIndex: 10,
    servingSize: '2 tbsp',
    imageUrl: 'https://images.unsplash.com/photo-1541990146878-8faef79f1c52?w=200&h=200&fit=crop',
  },
  {
    name: 'Sardines',
    type: 'protein',
    healthIndex: 9,
    servingSize: '3 oz',
    imageUrl: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=200&h=200&fit=crop',
  },
];

export const INITIAL_MENUS: Record<MealType, InitialFoodItem[]> = {
  breakfast: INITIAL_BREAKFAST_MENU,
  lunch: INITIAL_LUNCH_MENU,
  dinner: INITIAL_DINNER_MENU,
};
