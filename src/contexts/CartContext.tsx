
import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem, Restaurant } from "@/types/food";
import { v4 as uuidv4 } from 'uuid';
import { IndianRupee } from "lucide-react";

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addToCart: (menuItem: MenuItem, quantity: number, selectedOptions: any[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  deliveryFee: number;
  tax: number;
  getItemById: (itemId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const deliveryFee = restaurant ? parseFloat(restaurant.deliveryFee.replace('$', '')) * 80 : 0; // Convert to INR
  const tax = calculateSubtotal() * 0.05; // 5% GST
  
  function calculateSubtotal() {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function getItemById(itemId: string) {
    return items.find(item => item.id === itemId);
  }
  
  function addToCart(menuItem: MenuItem, quantity: number, selectedOptions: any[] = []) {
    const { restaurantId } = menuItem;
    
    if (restaurant && restaurant.id !== restaurantId) {
      clearCart();
    }
    
    if (!restaurant) {
      import('@/data/mockData').then(({ restaurants }) => {
        const newRestaurant = restaurants.find(r => r.id === restaurantId);
        if (newRestaurant) {
          setRestaurant(newRestaurant);
        }
      });
    }
    
    let itemPrice = menuItem.price * 80; // Convert USD to INR
    selectedOptions.forEach(option => {
      option.choiceIds.forEach((choiceId: string) => {
        const optionDef = menuItem.options?.find(o => o.id === option.optionId);
        const choiceDef = optionDef?.choices.find(c => c.id === choiceId);
        if (choiceDef && choiceDef.price) {
          itemPrice += choiceDef.price * 80; // Convert USD to INR
        }
      });
    });
    
    const newItem: CartItem = {
      id: uuidv4(),
      menuItemId: menuItem.id,
      name: menuItem.name,
      quantity,
      selectedOptions,
      price: itemPrice,
    };
    
    setItems([...items, newItem]);
  }
  
  function removeFromCart(itemId: string) {
    setItems(items.filter(item => item.id !== itemId));
    
    // If cart becomes empty, clear restaurant
    if (items.length === 1) {
      setRestaurant(null);
    }
  }
  
  function updateQuantity(itemId: string, quantity: number) {
    setItems(
      items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }
  
  function clearCart() {
    setItems([]);
    setRestaurant(null);
  }
  
  const cartSubtotal = calculateSubtotal();
  const cartTotal = cartSubtotal + deliveryFee + tax;
  
  return (
    <CartContext.Provider
      value={{
        items,
        restaurant,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartSubtotal,
        deliveryFee,
        tax,
        getItemById
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
