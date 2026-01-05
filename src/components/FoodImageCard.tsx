import { InitialFoodItem } from '@/data/initialMenus';
import { FOOD_TYPE_LABELS, FOOD_TYPE_COLORS } from '@/types/meal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodImageCardProps {
  food: InitialFoodItem;
  isSelected?: boolean;
  onSelect?: () => void;
  showAddButton?: boolean;
  compact?: boolean;
}

export const FoodImageCard = ({ 
  food, 
  isSelected, 
  onSelect, 
  showAddButton = true,
  compact = false 
}: FoodImageCardProps) => {
  const getHealthColor = (index: number) => {
    if (index >= 8) return 'bg-sage text-primary-foreground';
    if (index >= 5) return 'bg-warm text-primary-foreground';
    return 'bg-heart text-primary-foreground';
  };

  const getHealthTextColor = (index: number) => {
    if (index >= 8) return 'text-sage';
    if (index >= 5) return 'text-warm';
    return 'text-heart';
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer",
        isSelected 
          ? "border-primary ring-2 ring-primary/30 shadow-glow" 
          : "border-border/30 hover:border-primary/50 hover:shadow-card",
        compact ? "p-2" : "p-3"
      )}
      onClick={onSelect}
    >
      {/* Health Index Badge - Top of card */}
      <div className={cn(
        "absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full px-2 py-1 font-bold shadow-lg",
        getHealthColor(food.healthIndex),
        compact ? "text-xs" : "text-sm"
      )}>
        <Heart className={cn("fill-current", compact ? "h-3 w-3" : "h-4 w-4")} />
        <span>{food.healthIndex}</span>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Check className="h-4 w-4" />
        </div>
      )}

      {/* Food Image */}
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-muted",
        compact ? "h-20 w-full" : "h-28 w-full"
      )}>
        <img
          src={food.imageUrl}
          alt={food.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop';
          }}
        />
      </div>

      {/* Food Info */}
      <div className={cn("mt-2 space-y-1", compact ? "" : "space-y-2")}>
        <h4 className={cn(
          "font-semibold text-foreground line-clamp-1",
          compact ? "text-xs" : "text-sm"
        )}>
          {food.name}
        </h4>
        
        <div className="flex items-center justify-between gap-2">
          <Badge 
            className={cn(
              FOOD_TYPE_COLORS[food.type],
              compact ? "text-[10px] px-1.5 py-0" : "text-xs"
            )}
          >
            {FOOD_TYPE_LABELS[food.type]}
          </Badge>
          
          {food.servingSize && !compact && (
            <span className="text-xs text-muted-foreground">{food.servingSize}</span>
          )}
        </div>

        {/* Variants */}
        {food.variants && food.variants.length > 0 && !compact && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            Options: {food.variants.join(', ')}
          </p>
        )}
      </div>

      {/* Add Button */}
      {showAddButton && onSelect && (
        <Button
          size="sm"
          variant={isSelected ? "default" : "outline"}
          className={cn(
            "mt-2 w-full",
            compact ? "h-7 text-xs" : "h-8",
            isSelected && "bg-primary"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? (
            <>
              <Check className="mr-1 h-3 w-3" />
              Added
            </>
          ) : (
            <>
              <Plus className="mr-1 h-3 w-3" />
              Add
            </>
          )}
        </Button>
      )}
    </div>
  );
};
