import { Food, FOOD_TYPE_LABELS, FOOD_TYPE_COLORS } from '@/types/meal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Heart } from 'lucide-react';

interface FoodCardProps {
  food: Food;
  onRemove: () => void;
}

export const FoodCard = ({ food, onRemove }: FoodCardProps) => {
  const getHealthColor = (index: number) => {
    if (index >= 8) return 'text-sage';
    if (index >= 5) return 'text-warm';
    return 'text-heart';
  };

  return (
    <Card className="group relative overflow-hidden border-border/30 bg-card/80 shadow-soft transition-all duration-200 hover:shadow-card">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Badge className={`${FOOD_TYPE_COLORS[food.type]} text-xs font-medium`}>
            {FOOD_TYPE_LABELS[food.type]}
          </Badge>
          
          <div>
            <h4 className="font-medium text-foreground">{food.name}</h4>
            {food.servingSize && (
              <p className="text-sm text-muted-foreground">{food.servingSize}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-1 ${getHealthColor(food.healthIndex)}`}>
            <Heart className="h-4 w-4 fill-current" />
            <span className="font-semibold">{food.healthIndex}</span>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="h-8 w-8 p-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
