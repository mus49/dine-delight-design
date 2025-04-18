
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/food";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 shadow-sm hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: category.image 
                ? `url(${category.image})` 
                : "url(https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400)" 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold text-lg">{category.name}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
