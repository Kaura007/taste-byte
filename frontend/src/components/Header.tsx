import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-gradient cursor-pointer hover:opacity-80 transition-opacity"
        >
          ByteMonk
        </button>
        
        {location.pathname !== '/cart' && location.pathname !== '/checkout' && (
          <Button
            variant="outline"
            size="icon"
            className="relative hover-glow border-primary/20"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                {totalItems}
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
