import { useState, createContext, useCallback, useMemo } from 'react';
import HomePage from './src/pages/HomePage';
import ProductsPage from './src/pages/ProductsPage';
import SellerDashboard from './src/pages/SellerDashboard'; 

export type UserRole = 'client' | 'vendeur' | null;
export type CurrentPage = 'home' | 'products' | 'seller-dashboard';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartItemsCount: 0,
});

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userName, setUserName] = useState<string>('User');

  const handleLogin = (role: UserRole, username?: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setUserName(username || 'User');
    if (role === 'vendeur') {
      setCurrentPage('seller-dashboard');
    } else {
      setCurrentPage('products');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
    setUserName('User');
  };

  const navigate = (page: CurrentPage) => {
    setCurrentPage(page);
  };

  // useCallback hook - memoizes the addToCart function
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // useMemo hook - memoizes computed values
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const cartContextValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      cartItemsCount,
    }),
    [cart, addToCart, removeFromCart, clearCart, cartTotal, cartItemsCount]
  );

  return (
    <CartContext.Provider value={cartContextValue}>
      <div>
        {currentPage === 'home' && (
          <HomePage 
          isLoggedIn={isLoggedIn} 
          userRole={userRole}
          userName={userName}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'products' && (
        <ProductsPage 
          isLoggedIn={isLoggedIn} 
          userRole={userRole}
          userName={userName}
          onLogin={handleLogin}
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
      {currentPage === 'seller-dashboard' && userRole === 'vendeur' && (
        <SellerDashboard 
          userName={userName}
          onLogout={handleLogout}
          onNavigate={navigate}
        />
      )}
      </div>
    </CartContext.Provider>
  );
}

export default App;
