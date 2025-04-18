
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShoppingBag, Clock, Truck, Check, ChefHat, MapPin, Phone } from "lucide-react";

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState<'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered'>('confirmed');
  const [progress, setProgress] = useState(25);
  const [estimatedTime, setEstimatedTime] = useState("30-45");
  
  useEffect(() => {
    // Simulate order progress
    const timer = setTimeout(() => {
      if (orderStatus === 'confirmed') {
        setOrderStatus('preparing');
        setProgress(50);
      } else if (orderStatus === 'preparing') {
        setOrderStatus('ready');
        setProgress(75);
      } else if (orderStatus === 'ready') {
        setOrderStatus('delivering');
        setProgress(90);
      } else if (orderStatus === 'delivering') {
        setOrderStatus('delivered');
        setProgress(100);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [orderStatus]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>
        
        {/* Order Status */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order #123456</h2>
                <p className="text-gray-500 text-sm">Placed at 2:30 PM today</p>
              </div>
              <Button variant="outline">View Details</Button>
            </div>
            
            <Progress value={progress} className="h-2 mb-6" />
            
            <div className="grid grid-cols-5 gap-2 text-center relative">
              <div className={`flex flex-col items-center ${orderStatus === 'confirmed' ? 'text-food-primary font-medium' : 'text-food-success'}`}>
                <div className={`rounded-full p-2 mb-2 ${orderStatus === 'confirmed' ? 'bg-food-primary/10 text-food-primary' : 'bg-food-success/10 text-food-success'}`}>
                  {orderStatus === 'confirmed' ? <ShoppingBag className="h-5 w-5" /> : <Check className="h-5 w-5" />}
                </div>
                <span className="text-xs">Confirmed</span>
              </div>
              
              <div className={`flex flex-col items-center ${orderStatus === 'preparing' ? 'text-food-primary font-medium' : orderStatus === 'ready' || orderStatus === 'delivering' || orderStatus === 'delivered' ? 'text-food-success' : ''}`}>
                <div className={`rounded-full p-2 mb-2 ${orderStatus === 'preparing' ? 'bg-food-primary/10 text-food-primary' : orderStatus === 'ready' || orderStatus === 'delivering' || orderStatus === 'delivered' ? 'bg-food-success/10 text-food-success' : 'bg-gray-100'}`}>
                  {orderStatus === 'ready' || orderStatus === 'delivering' || orderStatus === 'delivered' ? <Check className="h-5 w-5" /> : <ChefHat className="h-5 w-5" />}
                </div>
                <span className="text-xs">Preparing</span>
              </div>
              
              <div className={`flex flex-col items-center ${orderStatus === 'ready' ? 'text-food-primary font-medium' : orderStatus === 'delivering' || orderStatus === 'delivered' ? 'text-food-success' : ''}`}>
                <div className={`rounded-full p-2 mb-2 ${orderStatus === 'ready' ? 'bg-food-primary/10 text-food-primary' : orderStatus === 'delivering' || orderStatus === 'delivered' ? 'bg-food-success/10 text-food-success' : 'bg-gray-100'}`}>
                  {orderStatus === 'delivering' || orderStatus === 'delivered' ? <Check className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <span className="text-xs">Ready</span>
              </div>
              
              <div className={`flex flex-col items-center ${orderStatus === 'delivering' ? 'text-food-primary font-medium' : orderStatus === 'delivered' ? 'text-food-success' : ''}`}>
                <div className={`rounded-full p-2 mb-2 ${orderStatus === 'delivering' ? 'bg-food-primary/10 text-food-primary' : orderStatus === 'delivered' ? 'bg-food-success/10 text-food-success' : 'bg-gray-100'}`}>
                  {orderStatus === 'delivered' ? <Check className="h-5 w-5" /> : <Truck className="h-5 w-5" />}
                </div>
                <span className="text-xs">Delivering</span>
              </div>
              
              <div className={`flex flex-col items-center ${orderStatus === 'delivered' ? 'text-food-success font-medium' : ''}`}>
                <div className={`rounded-full p-2 mb-2 ${orderStatus === 'delivered' ? 'bg-food-success/10 text-food-success' : 'bg-gray-100'}`}>
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-xs">Delivered</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-food-secondary/10 flex items-center">
              <Clock className="h-5 w-5 text-food-primary mr-2" />
              <span>Estimated delivery time: <strong>{estimatedTime} minutes</strong></span>
            </div>
          </CardContent>
        </Card>
        
        {/* Order Items */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-3">
                <div className="flex">
                  <span className="text-food-primary mr-2">1x</span>
                  <div>
                    <p className="font-medium">Margherita Pizza</p>
                    <p className="text-sm text-gray-500">Medium, Thin Crust</p>
                  </div>
                </div>
                <span>$14.99</span>
              </div>
              
              <div className="flex justify-between border-b pb-3">
                <div className="flex">
                  <span className="text-food-primary mr-2">2x</span>
                  <div>
                    <p className="font-medium">Garlic Bread</p>
                    <p className="text-sm text-gray-500">With Cheese</p>
                  </div>
                </div>
                <span>$8.99</span>
              </div>
              
              <div className="flex justify-between">
                <div className="flex">
                  <span className="text-food-primary mr-2">1x</span>
                  <div>
                    <p className="font-medium">Tiramisu</p>
                    <p className="text-sm text-gray-500">Classic Italian Dessert</p>
                  </div>
                </div>
                <span>$6.99</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>$30.97</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Tax</span>
                <span>$2.48</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>$36.44</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Delivery Details */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-food-primary mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-gray-600">123 Main Street, Apt 4B, Cityville, CA 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 text-food-primary mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Person</p>
                  <p className="text-gray-600">John D.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-food-primary mt-0.5" />
                <div>
                  <p className="font-medium">Contact</p>
                  <Button variant="outline" size="sm" className="mt-1">
                    Call Delivery Person
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex-1">
            Cancel Order
          </Button>
          <Button variant="cart" className="flex-1">
            Help & Support
          </Button>
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

export default OrderTracking;
