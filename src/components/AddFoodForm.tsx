import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FoodType, FOOD_TYPE_LABELS, Food } from '@/types/meal';
import { Plus, Heart } from 'lucide-react';

interface AddFoodFormProps {
  onAdd: (food: Omit<Food, 'id'>) => void;
}

export const AddFoodForm = ({ onAdd }: AddFoodFormProps) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<FoodType>('protein');
  const [healthIndex, setHealthIndex] = useState(5);
  const [servingSize, setServingSize] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      type,
      healthIndex,
      servingSize: servingSize.trim() || undefined,
    });

    // Reset form
    setName('');
    setType('protein');
    setHealthIndex(5);
    setServingSize('');
  };

  const getHealthLabel = (index: number) => {
    if (index >= 8) return 'Excellent';
    if (index >= 6) return 'Good';
    if (index >= 4) return 'Moderate';
    return 'Limited';
  };

  const getHealthColor = (index: number) => {
    if (index >= 8) return 'text-sage';
    if (index >= 5) return 'text-warm';
    return 'text-heart';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl bg-card/50 p-5 shadow-soft">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Food Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Grilled Salmon"
            className="border-border/50 bg-background focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-foreground">
            Food Type
          </Label>
          <Select value={type} onValueChange={(v) => setType(v as FoodType)}>
            <SelectTrigger className="border-border/50 bg-background focus:border-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(FOOD_TYPE_LABELS) as [FoodType, string][]).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-foreground">
            Heart Health Index
          </Label>
          <div className={`flex items-center gap-2 font-semibold ${getHealthColor(healthIndex)}`}>
            <Heart className="h-4 w-4 fill-current" />
            <span>{healthIndex}/10</span>
            <span className="text-xs font-normal text-muted-foreground">
              ({getHealthLabel(healthIndex)})
            </span>
          </div>
        </div>
        <Slider
          value={[healthIndex]}
          onValueChange={([v]) => setHealthIndex(v)}
          min={1}
          max={10}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Less healthy</span>
          <span>Heart healthy</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="serving" className="text-sm font-medium text-foreground">
          Serving Size (optional)
        </Label>
        <Input
          id="serving"
          value={servingSize}
          onChange={(e) => setServingSize(e.target.value)}
          placeholder="e.g., 4 oz"
          className="border-border/50 bg-background focus:border-primary"
        />
      </div>

      <Button
        type="submit"
        disabled={!name.trim()}
        className="w-full bg-gradient-heart text-primary-foreground shadow-soft transition-all hover:shadow-glow"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Food
      </Button>
    </form>
  );
};
