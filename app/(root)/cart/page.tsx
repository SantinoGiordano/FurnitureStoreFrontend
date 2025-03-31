"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/app/Store";
import Image from "next/image";
import RemoveFromCart from "@/componets/RemoveFromCart";

interface Furniture {
  _id: string;
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
}

export default function Cart() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const inCart = useCartStore((state) => state.inCart);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError("Unable to load furniture items. Please try again later.");
        console.log(err);
      }
    }

    fetchFurniture();
  }, []);

  if (error) return <p className="text-red-500 p-4">{error}</p>;

  const isInCart = items.filter((item) => inCart[item._id]);
  const subtotal = isInCart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Summary</h1>
        
        {isInCart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="mt-4 text-xl font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Start adding some items to your cart</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Cart Items ({isInCart.length})</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {isInCart.map((item) => (
                <div key={item._id} className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        width={80}
                        height={80}
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                        <p className="ml-4 text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-500">{item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        <RemoveFromCart itemId={item._id}/>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between py-3">
                <h3 className="text-lg font-medium text-gray-900">Subtotal</h3>
                <p className="text-xl font-semibold text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="mt-2 flex items-center justify-between py-3 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Shipping</h3>
                <p className="text-lg font-medium text-gray-900">Free</p>
              </div>
              
              <div className="mt-4 flex items-center justify-between py-4 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Total</h3>
                <p className="text-2xl font-bold text-gray-900">${subtotal.toFixed(2)}</p>
              </div>
              
              <button
                type="button"
                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}