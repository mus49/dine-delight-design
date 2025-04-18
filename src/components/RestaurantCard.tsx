
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/types/food";
import { Star, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <Card className="overflow-hidden h-full transition-transform duration-200 hover:scale-105 hover:shadow-md">
        <div className="relative">
          {restaurant.featured && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="default" className="bg-food-primary text-white font-medium">
                Featured
              </Badge>
            </div>
          )}
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-48 object-cover"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 text-food-dark">{restaurant.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            <Star className="h-4 w-4 text-food-warning fill-food-warning" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-sm text-gray-500 ml-1">(200+)</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.tags.map((tag, index) => (
              <Badge key={index} variant="tag" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-4 py-3 flex justify-between">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            <span>{restaurant.deliveryFee}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
