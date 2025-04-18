
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { MenuItemCard } from "@/components/MenuItemCard";
import { Restaurant, MenuItem } from "@/types/food";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, Info, DollarSign, Filter } from "lucide-react";
import { restaurants, menuItems, burgerMenuItems, sushiMenuItems } from "@/data/mockData";

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Find the restaurant by ID
    const foundRestaurant = restaurants.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
      
      // Get the appropriate menu items based on restaurant ID
      let restaurantMenu: MenuItem[] = [];
      if (id === "r1") {
        restaurantMenu = menuItems;
      } else if (id === "r2") {
        restaurantMenu = burgerMenuItems;
      } else if (id === "r3") {
        restaurantMenu = sushiMenuItems;
      }
      
      setMenu(restaurantMenu);
      
      // Extract unique categories from menu items
      const uniqueCategories = Array.from(
        new Set(restaurantMenu.map(item => item.category))
      );
      setCategories(uniqueCategories);
      
      // Set the first category as active by default
      if (uniqueCategories.length > 0) {
        setActiveCategory(uniqueCategories[0]);
      }
    }
  }, [id]);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-gray-500">Loading restaurant details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-6">
        {/* Restaurant Hero */}
        <section className="mb-8">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img 
              src={restaurant.image} 
              alt={restaurant.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-food-warning fill-food-warning mr-1" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-gray-200 ml-1">(200+)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{restaurant.deliveryFee} delivery</span>
                </div>
              </div>
              
              <div className="flex flex-wrap mt-3 gap-2">
                {restaurant.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white border-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Restaurant Info & Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Restaurant Info */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2" /> Restaurant Info
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Address</h4>
                  <p className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-food-primary" />
                    <span>123 Main Street, Downtown, City</span>
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Hours</h4>
                  <p className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-food-primary" />
                    <span>Monday - Sunday: 11:00 AM - 10:00 PM</span>
                  </p>
                </div>
                
                <div className="pt-3 border-t">
                  <Button variant="outline" className="w-full mb-2">
                    View on Map
                  </Button>
                  <Button variant="ghost" className="w-full border border-gray-200">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Menu */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Category Tabs */}
            <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
              <div className="bg-white sticky top-16 z-20 rounded-t-xl shadow-sm">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter size={16} />
                    <span>Filter</span>
                  </Button>
                </div>
                <TabsList className="w-full justify-start px-4 py-2 bg-white h-auto overflow-x-auto flex space-x-2">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="px-4 py-2 rounded-full data-[state=active]:bg-food-primary data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Menu Items by Category */}
              {categories.map(category => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="p-4 bg-white rounded-b-xl shadow-sm mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {menu
                        .filter(item => item.category === category)
                        .map(item => (
                          <MenuItemCard key={item.id} item={item} />
                        ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-food-dark text-white py-10 mt-10">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DineDelight</h3>
              <p className="text-gray-300">
                The best food ordering platform with the widest selection of restaurants.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Partner With Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DineDelight. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDetails;
