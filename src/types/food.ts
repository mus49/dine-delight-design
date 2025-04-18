
// Food and Restaurant Types

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  deliveryTime: string;
  rating: number;
  deliveryFee: string;
  categories: string[];
  tags: string[];
  featured: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: {
    id: string;
    name: string;
    price?: number;
  }[];
  required: boolean;
  multiSelect: boolean;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  quantity: number;
  selectedOptions: {
    optionId: string;
    choiceIds: string[];
  }[];
  specialInstructions?: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  deliveryAddress: DeliveryAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  createdAt: string;
  estimatedDeliveryTime: string;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  additionalInfo?: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'debit_card' | 'cash' | 'paypal';
  lastFourDigits?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: DeliveryAddress[];
  paymentMethods: PaymentMethod[];
  favoriteRestaurants: string[];
}
