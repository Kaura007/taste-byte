import { FoodItem } from '@/types/food';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface FoodCardProps {
  item: FoodItem;
}

const FoodCard = ({ item }: FoodCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden group border-border/40 rounded-lg shadow-sm hover:shadow-md transition-all">
      
      {/* Smaller Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={"/assets/" + item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Compact Header */}
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      {/* Compact Price */}
      <CardContent className="p-3 pt-1">
        <p className="text-lg font-bold text-primary">
          ₹{item.price}
        </p>
      </CardContent>

      {/* Smaller Button */}
      <CardFooter className="p-3 pt-1">
        <Button
          className="w-full gap-1 bg-primary hover:bg-primary/90 h-9 text-xs"
          onClick={() => addToCart(item)}
        >
          <Plus className="h-3 w-3" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
