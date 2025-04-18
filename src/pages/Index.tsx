
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { RestaurantCard } from "@/components/RestaurantCard";
import { CategoryCard } from "@/components/CategoryCard";
import { categories, restaurants } from "@/data/mockData";
import { Category, Restaurant } from "@/types/food";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronRight } from "lucide-react";

const Index = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [allRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Filter featured restaurants
    const featured = restaurants.filter(restaurant => restaurant.featured);
    setFeaturedRestaurants(featured);
    
    // Set all restaurants
    setAllRestaurants(restaurants);
  }, []);
  
  const handleCategoryClick = (category: Category) => {
    // This would filter restaurants by category
    console.log(`Category clicked: ${category.name}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-food-primary/90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200)" }}
          ></div>
          <div className="relative py-12 px-6 md:py-16 md:px-12 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Delicious food delivered to your door
            </h1>
            <p className="text-lg mb-6 max-w-xl">
              Order from the best local restaurants with easy, on-demand delivery.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="search" 
                placeholder="Search for food or restaurants..." 
                className="pl-10 bg-white text-black border-none h-12 pr-24"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-food-primary hover:bg-food-primary/90 text-white"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-food-dark">Categories</h2>
            <Button variant="ghost" className="text-food-primary flex items-center">
              View All <ChevronRight size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => handleCategoryClick(category)}
              />
            ))}
          </div>
        </section>
        
        {/* Featured Restaurants Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-food-dark">Featured Restaurants</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
        
        {/* All Restaurants Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-food-dark">All Restaurants</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
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

export default Index;
