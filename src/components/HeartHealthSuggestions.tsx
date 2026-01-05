import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Leaf, Droplets, Fish, Apple, Carrot } from 'lucide-react';

interface SuggestionItem {
  name: string;
  benefit: string;
  icon: React.ReactNode;
}

const HEART_HEALTHY_SUGGESTIONS: SuggestionItem[] = [
  {
    name: 'Salmon',
    benefit: 'Rich in omega-3 fatty acids',
    icon: <Fish className="h-4 w-4" />,
  },
  {
    name: 'Oatmeal',
    benefit: 'Lowers cholesterol levels',
    icon: <Leaf className="h-4 w-4" />,
  },
  {
    name: 'Blueberries',
    benefit: 'High in antioxidants',
    icon: <Apple className="h-4 w-4" />,
  },
  {
    name: 'Spinach',
    benefit: 'Packed with heart-healthy nutrients',
    icon: <Carrot className="h-4 w-4" />,
  },
  {
    name: 'Olive Oil',
    benefit: 'Healthy monounsaturated fats',
    icon: <Droplets className="h-4 w-4" />,
  },
  {
    name: 'Almonds',
    benefit: 'Reduces bad cholesterol',
    icon: <Leaf className="h-4 w-4" />,
  },
];

export const HeartHealthSuggestions = () => {
  return (
    <Card className="border-sage/30 bg-gradient-to-br from-sage-soft to-accent/50 shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-sage">
          <Heart className="h-5 w-5 fill-current" />
          Heart-Healthy Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Add these foods to your meals for better heart health:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HEART_HEALTHY_SUGGESTIONS.map((item) => (
            <div
              key={item.name}
              className="group flex items-start gap-3 rounded-lg bg-card/70 p-3 shadow-soft transition-all duration-200 hover:bg-card hover:shadow-card"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage transition-colors group-hover:bg-sage group-hover:text-primary-foreground">
                {item.icon}
              </div>
              <div>
                <h4 className="font-medium text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
