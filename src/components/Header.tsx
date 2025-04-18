
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Home, 
  ShoppingCart, 
  User, 
  Clock
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, cartTotal } = useCart();
  
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-food-primary" />
          <span className="font-bold text-xl text-food-dark">DineDelight</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-food-dark hover:text-food-primary font-medium">
            Home
          </Link>
          <Link to="/restaurants" className="text-food-dark hover:text-food-primary font-medium">
            Restaurants
          </Link>
          <Link to="/orders" className="text-food-dark hover:text-food-primary font-medium">
            My Orders
          </Link>
        </nav>
        
        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex w-full max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="search" 
              placeholder="Search for food or restaurants..." 
              className="pl-10 border-gray-200 focus:border-food-primary" 
            />
          </div>
        </div>
        
        {/* Cart Button & Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="relative inline-flex items-center p-2">
                <ShoppingCart size={24} className="text-food-dark" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-food-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
              </SheetHeader>
              
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <SheetClose asChild>
                    <Button variant="cart" size="lg">Browse Restaurants</Button>
                  </SheetClose>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto py-4">
                    {/* Cart items would go here */}
                    <p className="text-sm text-gray-500 mb-2">Your items appear here</p>
                  </div>
                  
                  <SheetFooter className="border-t pt-4">
                    <div className="w-full space-y-4">
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <SheetClose asChild>
                        <Button variant="cart" size="full" asChild>
                          <Link to="/checkout">Checkout</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetFooter>
                </div>
              )}
            </SheetContent>
          </Sheet>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User size={24} className="text-food-dark" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/orders" className="cursor-pointer">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/favorites" className="cursor-pointer">
                  Favorites
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} className="text-food-dark" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <SheetClose asChild>
                    <Link to="/" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100">
                      <Home className="mr-2 h-5 w-5" />
                      <span>Home</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/restaurants" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      <span>Restaurants</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/orders" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100">
                      <Clock className="mr-2 h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/profile" className="flex items-center py-2 px-4 rounded-lg hover:bg-gray-100">
                      <User className="mr-2 h-5 w-5" />
                      <span>Profile</span>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden border-t border-gray-200 p-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 border-gray-200 w-full"
          />
        </div>
      </div>
    </header>
  );
}
