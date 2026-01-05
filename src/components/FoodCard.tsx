import { Food, FOOD_TYPE_LABELS, FOOD_TYPE_COLORS } from '@/types/meal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Heart } from 'lucide-react';

// Food image mapping
const FOOD_IMAGES: Record<string, string> = {
  'Scrambled Eggs': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100&h=100&fit=crop',
  'Whole Wheat Toast': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
  'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82ber40f?w=100&h=100&fit=crop',
  'Oatmeal': 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=100&h=100&fit=crop',
  'Fresh Berries': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=100&h=100&fit=crop',
  'Greek Yogurt': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100&h=100&fit=crop',
  'Grilled Chicken': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=100&h=100&fit=crop',
  'Garden Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&h=100&fit=crop',
  'Brown Rice': 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=100&h=100&fit=crop',
  'Salmon Fillet': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop',
  'Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=100&h=100&fit=crop',
  'Steamed Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&h=100&fit=crop',
  'Quinoa': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop',
  'Grilled Fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=100&h=100&fit=crop',
  'Sweet Potato': 'https://images.unsplash.com/photo-1596097635121-14b63a7e0c9e?w=100&h=100&fit=crop',
  'Asparagus': 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?w=100&h=100&fit=crop',
  'Lean Beef': 'https://images.unsplash.com/photo-1558030006-450675393462?w=100&h=100&fit=crop',
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop',
  'Olive Oil Drizzle': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop',
  'Almonds': 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=100&h=100&fit=crop',
  'Avocado': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop',
  'Blueberries': 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=100&h=100&fit=crop',
  'Walnuts': 'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=100&h=100&fit=crop',
  'Kale': 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=100&h=100&fit=crop',
  'Chia Seeds': 'https://images.unsplash.com/photo-1541990146878-8faef79f1c52?w=100&h=100&fit=crop',
  'Sardines': 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=100&h=100&fit=crop',
};

const DEFAULT_FOOD_IMAGE = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';

interface FoodCardProps {
  food: Food;
  onRemove: () => void;
}

export const FoodCard = ({ food, onRemove }: FoodCardProps) => {
  const getHealthColor = (index: number) => {
    if (index >= 8) return 'bg-sage text-primary-foreground';
    if (index >= 5) return 'bg-warm text-primary-foreground';
    return 'bg-heart text-primary-foreground';
  };

  const imageUrl = FOOD_IMAGES[food.name] || DEFAULT_FOOD_IMAGE;

  return (
    <Card className="group relative overflow-hidden border-border/30 bg-card/80 shadow-soft transition-all duration-200 hover:shadow-card">
      <CardContent className="flex items-center gap-4 p-3">
        {/* Food Image with Health Index Overlay */}
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={food.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_FOOD_IMAGE;
              }}
            />
          </div>
          {/* Health Index Badge */}
          <div className={`absolute -bottom-1 -right-1 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-bold shadow-lg ${getHealthColor(food.healthIndex)}`}>
            <Heart className="h-3 w-3 fill-current" />
            <span>{food.healthIndex}</span>
          </div>
        </div>

        {/* Food Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-foreground truncate">{food.name}</h4>
              {food.servingSize && (
                <p className="text-xs text-muted-foreground">{food.servingSize}</p>
              )}
            </div>
            <Badge className={`${FOOD_TYPE_COLORS[food.type]} text-xs font-medium flex-shrink-0`}>
              {FOOD_TYPE_LABELS[food.type]}
            </Badge>
          </div>
        </div>

        {/* Remove Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onRemove}
          className="h-8 w-8 p-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive flex-shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
