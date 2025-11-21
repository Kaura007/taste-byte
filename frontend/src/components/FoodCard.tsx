import { useCart } from "@/context/CartContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { getComboRecommendations } from "@/api/recommendations";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RecommendationBar from "./RecommendationBar";
import { FoodItem } from "@/types/food";

interface FoodCardProps {
  item : FoodItem
}

const FoodCard = ({ item }: FoodCardProps) => {
  const { addToCart } = useCart();
  const [recommendations, setRecommendations] = useState([]);

  const handleAddToCart = async () => {
    addToCart(item);

    // 🔥 Get AI recommendations
    const recos = await getComboRecommendations(item._id);
    setRecommendations(recos);
  };

  return (
    <>
      <Card className="overflow-hidden group border-border/40 rounded-lg shadow-sm hover:shadow-md transition-all">
        <div className="h-48 overflow-hidden">
          <img
            src={"/assets/" + item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-base font-semibold">{item.name}</CardTitle>
          <CardDescription className="text-xs line-clamp-2">{item.description}</CardDescription>
        </CardHeader>

        <CardContent className="p-3 pt-1">
          <p className="text-lg font-bold text-primary">₹{item.price}</p>
        </CardContent>

        <CardFooter className="p-3 pt-1">
          <Button
            className="w-full gap-1 bg-primary hover:bg-primary/90 h-9 text-xs"
            onClick={handleAddToCart}
          >
            <Plus className="h-3 w-3" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>

      {/* 🔥 Inline AI Recommendations */}
      {recommendations.length > 0 && (
        <RecommendationBar title="Perfect Pairings" items={recommendations} />
      )}
    </>
  );
};

export default FoodCard;
