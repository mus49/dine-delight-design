
import { Category, Restaurant, MenuItem, Order } from "@/types/food";

// Categories
export const categories: Category[] = [
  { id: "c1", name: "Pizza", image: "/images/categories/pizza.jpg" },
  { id: "c2", name: "Burgers", image: "/images/categories/burgers.jpg" },
  { id: "c3", name: "Sushi", image: "/images/categories/sushi.jpg" },
  { id: "c4", name: "Pasta", image: "/images/categories/pasta.jpg" },
  { id: "c5", name: "Desserts", image: "/images/categories/desserts.jpg" },
  { id: "c6", name: "Healthy", image: "/images/categories/healthy.jpg" },
  { id: "c7", name: "Breakfast", image: "/images/categories/breakfast.jpg" },
  { id: "c8", name: "Coffee", image: "/images/categories/coffee.jpg" },
];

// Restaurants
export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Pizza Paradise",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800",
    deliveryTime: "20-35 min",
    rating: 4.7,
    deliveryFee: "$1.99",
    categories: ["c1"],
    tags: ["Italian", "Vegetarian options"],
    featured: true,
  },
  {
    id: "r2",
    name: "Burger Bliss",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800",
    deliveryTime: "15-30 min",
    rating: 4.5,
    deliveryFee: "$2.49",
    categories: ["c2"],
    tags: ["American", "Fast Food"],
    featured: true,
  },
  {
    id: "r3",
    name: "Sushi Sensation",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=800",
    deliveryTime: "25-40 min",
    rating: 4.8,
    deliveryFee: "$3.99",
    categories: ["c3"],
    tags: ["Japanese", "Healthy"],
    featured: true,
  },
  {
    id: "r4",
    name: "Pasta Palace",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800",
    deliveryTime: "30-45 min",
    rating: 4.3,
    deliveryFee: "$2.99",
    categories: ["c4"],
    tags: ["Italian", "Family-friendly"],
    featured: false,
  },
  {
    id: "r5",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1551404973-761c5756d872?q=80&w=800",
    deliveryTime: "20-35 min",
    rating: 4.6,
    deliveryFee: "$1.99",
    categories: ["c5"],
    tags: ["Desserts", "Bakery"],
    featured: false,
  },
  {
    id: "r6",
    name: "Green Goodness",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800",
    deliveryTime: "20-35 min",
    rating: 4.4,
    deliveryFee: "$2.99",
    categories: ["c6"],
    tags: ["Healthy", "Organic", "Vegan"],
    featured: false,
  },
];

// Menu Items for Pizza Paradise
export const menuItems: MenuItem[] = [
  {
    id: "m1",
    restaurantId: "r1",
    name: "Margherita Pizza",
    description: "Classic tomato sauce, fresh mozzarella, basil, and olive oil",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800",
    category: "Pizzas",
    popular: true,
    options: [
      {
        id: "o1",
        name: "Size",
        choices: [
          { id: "c1", name: "Small", price: 0 },
          { id: "c2", name: "Medium", price: 2 },
          { id: "c3", name: "Large", price: 4 }
        ],
        required: true,
        multiSelect: false
      },
      {
        id: "o2",
        name: "Crust",
        choices: [
          { id: "c4", name: "Thin", price: 0 },
          { id: "c5", name: "Regular", price: 0 },
          { id: "c6", name: "Thick", price: 1 }
        ],
        required: true,
        multiSelect: false
      },
      {
        id: "o3",
        name: "Extra Toppings",
        choices: [
          { id: "c7", name: "Mushrooms", price: 1.5 },
          { id: "c8", name: "Pepperoni", price: 1.5 },
          { id: "c9", name: "Bell Peppers", price: 1 },
          { id: "c10", name: "Olives", price: 1 },
          { id: "c11", name: "Extra Cheese", price: 2 }
        ],
        required: false,
        multiSelect: true
      }
    ]
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Pepperoni Pizza",
    description: "Tomato sauce, mozzarella, and plenty of pepperoni",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800",
    category: "Pizzas",
    popular: true,
    options: [
      {
        id: "o1",
        name: "Size",
        choices: [
          { id: "c1", name: "Small", price: 0 },
          { id: "c2", name: "Medium", price: 2 },
          { id: "c3", name: "Large", price: 4 }
        ],
        required: true,
        multiSelect: false
      },
      {
        id: "o2",
        name: "Crust",
        choices: [
          { id: "c4", name: "Thin", price: 0 },
          { id: "c5", name: "Regular", price: 0 },
          { id: "c6", name: "Thick", price: 1 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Vegetarian Supreme",
    description: "Tomato sauce, mozzarella, bell peppers, onions, mushrooms, olives, and spinach",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d382?q=80&w=800",
    category: "Pizzas",
    popular: false,
    options: [
      {
        id: "o1",
        name: "Size",
        choices: [
          { id: "c1", name: "Small", price: 0 },
          { id: "c2", name: "Medium", price: 2 },
          { id: "c3", name: "Large", price: 4 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Garden Salad",
    description: "Fresh mixed greens, tomatoes, cucumbers, and house dressing",
    price: 7.99,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800",
    category: "Sides",
    popular: false
  },
  {
    id: "m5",
    restaurantId: "r1",
    name: "Garlic Bread",
    description: "Freshly baked bread topped with garlic butter and herbs",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=800",
    category: "Sides",
    popular: true
  },
  {
    id: "m6",
    restaurantId: "r1",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800",
    category: "Desserts",
    popular: true
  },
];

// Menu Items for Burger Bliss
export const burgerMenuItems: MenuItem[] = [
  {
    id: "b1",
    restaurantId: "r2",
    name: "Classic Cheeseburger",
    description: "Beef patty, cheddar cheese, lettuce, tomato, onion, and house sauce on a brioche bun",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
    category: "Burgers",
    popular: true,
    options: [
      {
        id: "o1",
        name: "Patty",
        choices: [
          { id: "c1", name: "Regular", price: 0 },
          { id: "c2", name: "Double", price: 3 }
        ],
        required: true,
        multiSelect: false
      },
      {
        id: "o2",
        name: "Cheese",
        choices: [
          { id: "c3", name: "Cheddar", price: 0 },
          { id: "c4", name: "American", price: 0 },
          { id: "c5", name: "Swiss", price: 0.5 }
        ],
        required: true,
        multiSelect: false
      }
    ]
  },
  {
    id: "b2",
    restaurantId: "r2",
    name: "Bacon BBQ Burger",
    description: "Beef patty, BBQ sauce, crispy bacon, caramelized onions, and cheddar cheese",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=800",
    category: "Burgers",
    popular: true
  }
];

// Menu Items for Sushi Sensation
export const sushiMenuItems: MenuItem[] = [
  {
    id: "s1",
    restaurantId: "r3",
    name: "California Roll",
    description: "Crab, avocado, and cucumber rolled in sushi rice and seaweed",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800",
    category: "Rolls",
    popular: true
  },
  {
    id: "s2",
    restaurantId: "r3",
    name: "Salmon Nigiri",
    description: "Fresh salmon on pressed sushi rice",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1648146299056-df4620d84f88?q=80&w=800",
    category: "Nigiri",
    popular: true
  }
];
