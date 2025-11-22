import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const RecommendationBar = ({ title, items }) => {
  const { addToCart } = useCart();

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-3 p-4 bg-muted/30 rounded-xl shadow-sm animate-fade-in">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {items.map((item) => (
          <Card
            key={item._id}
            className="w-48 min-w-[12rem] border-border/30 hover:shadow-md transition-all"
          >
            <img
              src={"/assets/" + item.image}
              alt={item.name}
              className="h-28 w-full object-cover rounded-t-lg"
            />

            <CardContent className="p-3 space-y-1">
              <p className="font-medium text-sm line-clamp-1">{item.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              <p className="text-primary font-bold text-sm mt-1">${item.price}</p>

              <Button
                className="w-full h-8 mt-2 text-xs bg-primary hover:bg-primary/90"
                onClick={() => addToCart(item)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationBar;
