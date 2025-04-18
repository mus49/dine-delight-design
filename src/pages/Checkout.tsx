
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { CreditCard, Truck, Clock, MapPin, ChevronRight, Check, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, restaurant, cartSubtotal, cartTotal, deliveryFee, tax, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "cash">("credit_card");
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    additionalInfo: ""
  });
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes("card")) {
      const cardField = name.split(".")[1];
      setCardDetails(prev => ({ ...prev, [cardField]: value }));
    } else {
      setDeliveryAddress(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate placing an order
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed.",
      duration: 5000,
    });
    
    // Clear cart and redirect to order tracking
    setTimeout(() => {
      clearCart();
      navigate("/orders");
    }, 1500);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-500 mb-8">Add items to your cart before proceeding to checkout.</p>
          <Button variant="cart" size="lg" onClick={() => navigate("/")}>
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary - Right Side */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              {restaurant && (
                <div className="flex items-center mb-4 pb-4 border-b">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-16 h-16 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h3 className="font-medium">{restaurant.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex items-start">
                      <span className="text-food-primary mr-2">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      <span>{(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    <span>{cartSubtotal.toFixed(0)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    <span>{deliveryFee.toFixed(0)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <div className="flex items-center">
                    <IndianRupee className="h-3 w-3 mr-1" />
                    <span>{tax.toFixed(0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold border-t pt-4">
                <span>Total</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-1" />
                  <span>{cartTotal.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Checkout Form - Left Side */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-food-primary" />
                  Delivery Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input 
                      id="street" 
                      name="street" 
                      value={deliveryAddress.street} 
                      onChange={handleInputChange} 
                      placeholder="123 Main St" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={deliveryAddress.city} 
                      onChange={handleInputChange} 
                      placeholder="Cityville" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={deliveryAddress.state} 
                      onChange={handleInputChange} 
                      placeholder="California" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      value={deliveryAddress.zipCode} 
                      onChange={handleInputChange} 
                      placeholder="12345" 
                      required 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="additionalInfo">Additional Information (optional)</Label>
                    <Textarea 
                      id="additionalInfo" 
                      name="additionalInfo" 
                      value={deliveryAddress.additionalInfo} 
                      onChange={handleInputChange} 
                      placeholder="Apartment number, building, etc."
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-food-primary" />
                  Payment Method
                </h2>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={(value) => setPaymentMethod(value as any)}
                  className="mb-6"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card" className="flex items-center cursor-pointer">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center cursor-pointer">
                      <Truck className="h-5 w-5 mr-2" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
                
                {paymentMethod === "credit_card" && (
                  <div className="space-y-4 pt-2 border-t">
                    <div>
                      <Label htmlFor="card.number">Card Number</Label>
                      <Input 
                        id="card.number" 
                        name="card.number" 
                        value={cardDetails.number} 
                        onChange={handleInputChange} 
                        placeholder="1234 5678 9012 3456" 
                        required={paymentMethod === "credit_card"} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="card.name">Cardholder Name</Label>
                      <Input 
                        id="card.name" 
                        name="card.name" 
                        value={cardDetails.name} 
                        onChange={handleInputChange} 
                        placeholder="John Doe" 
                        required={paymentMethod === "credit_card"} 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="card.expiry">Expiry Date</Label>
                        <Input 
                          id="card.expiry" 
                          name="card.expiry" 
                          value={cardDetails.expiry} 
                          onChange={handleInputChange} 
                          placeholder="MM/YY" 
                          required={paymentMethod === "credit_card"} 
                        />
                      </div>
                      <div>
                        <Label htmlFor="card.cvc">CVC</Label>
                        <Input 
                          id="card.cvc" 
                          name="card.cvc" 
                          value={cardDetails.cvc} 
                          onChange={handleInputChange} 
                          placeholder="123" 
                          required={paymentMethod === "credit_card"} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Place Order Button */}
              <Button variant="cart" size="full" type="submit" className="mt-6 py-6 text-lg">
                Place Order - ${cartTotal.toFixed(2)}
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-food-dark text-white py-8 mt-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} DineDelight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
