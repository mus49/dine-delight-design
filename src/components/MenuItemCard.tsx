
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/types/food";
import { Plus, Minus, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const { addToCart } = useCart();
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  const handleOptionChange = (optionId: string, choiceId: string, multiSelect: boolean) => {
    setSelectedOptions(prev => {
      // Find if this option is already selected
      const existingOptionIndex = prev.findIndex(opt => opt.optionId === optionId);
      
      if (existingOptionIndex >= 0) {
        // Option exists
        const existingOption = prev[existingOptionIndex];
        
        if (multiSelect) {
          // For multi-select options, toggle the choice
          const choiceIndex = existingOption.choiceIds.indexOf(choiceId);
          let newChoiceIds;
          
          if (choiceIndex >= 0) {
            // Remove choice if already selected
            newChoiceIds = existingOption.choiceIds.filter((id: string) => id !== choiceId);
          } else {
            // Add choice if not selected
            newChoiceIds = [...existingOption.choiceIds, choiceId];
          }
          
          const updatedOption = {
            ...existingOption,
            choiceIds: newChoiceIds
          };
          
          return [
            ...prev.slice(0, existingOptionIndex),
            updatedOption,
            ...prev.slice(existingOptionIndex + 1)
          ];
        } else {
          // For single select, replace the choice
          return [
            ...prev.slice(0, existingOptionIndex),
            { optionId, choiceIds: [choiceId] },
            ...prev.slice(existingOptionIndex + 1)
          ];
        }
      } else {
        // Option doesn't exist, add it
        return [...prev, { optionId, choiceIds: [choiceId] }];
      }
    });
  };
  
  const handleAddToCart = () => {
    addToCart(item, quantity, selectedOptions);
    setQuantity(1);
    setSelectedOptions([]);
  };
  
  const isOptionSelected = (optionId: string, choiceId: string) => {
    const option = selectedOptions.find(opt => opt.optionId === optionId);
    return option && option.choiceIds.includes(choiceId);
  };
  
  return (
    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div className="relative">
              {item.popular && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="default" className="bg-food-primary text-white font-medium">
                    Popular
                  </Badge>
                </div>
              )}
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.description}</p>
              <p className="font-medium text-food-primary">${item.price.toFixed(2)}</p>
            </CardContent>
          </div>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-64 object-cover rounded-md -mt-6 -mx-6 sm:rounded-t-lg mb-4"
              style={{ width: 'calc(100% + 48px)' }}
            />
            <DialogTitle className="text-xl font-bold">{item.name}</DialogTitle>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="font-medium text-food-primary text-lg mt-2">${item.price.toFixed(2)}</p>
          </DialogHeader>
          
          <div className="mt-4 space-y-6">
            {item.options?.map(option => (
              <div key={option.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-900">{option.name}</h4>
                  {option.required && (
                    <Badge variant="outline" className="text-xs">Required</Badge>
                  )}
                </div>
                
                <div className="grid gap-2">
                  {option.choices.map(choice => (
                    <div 
                      key={choice.id}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
                        isOptionSelected(option.id, choice.id) 
                          ? 'border-food-primary bg-food-primary/5' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => handleOptionChange(option.id, choice.id, option.multiSelect)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border ${
                          isOptionSelected(option.id, choice.id) 
                            ? 'border-food-primary' 
                            : 'border-gray-300'
                        } flex items-center justify-center mr-3`}>
                          {isOptionSelected(option.id, choice.id) && (
                            <div className="w-3 h-3 rounded-full bg-food-primary" />
                          )}
                        </div>
                        <span>{choice.name}</span>
                      </div>
                      {choice.price && choice.price > 0 && (
                        <span className="text-gray-600">+${choice.price.toFixed(2)}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="text-food-primary"
              >
                <Minus size={18} />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={incrementQuantity}
                className="text-food-primary"
              >
                <Plus size={18} />
              </Button>
            </div>
            
            <Button 
              variant="cart" 
              onClick={handleAddToCart}
            >
              Add to Cart - ${(item.price * quantity).toFixed(2)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
