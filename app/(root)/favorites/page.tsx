"use client";

import { useState, useEffect } from "react";
import { useFavoritedStore } from "@/app/Store";
import Image from "next/image";
import Link from "next/link";
import AddCartButton from "@/componets/AddCartButton";

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

export default function Favorites() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [error, setError] = useState<string | null>(null);
  const favorites = useFavoritedStore((state) => state.favorites);
  const toggleFavorite = useFavoritedStore((state) => state.toggleFavorite);

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

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg max-w-md text-center">
          {error}
        </p>
      </div>
    );

  const favoriteItems = items.filter((item) => favorites[item._id]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Favorites
          </h1>
          <p className="text-gray-500">
            {favoriteItems.length} saved item
            {favoriteItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {favoriteItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 relative text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 mb-6">Start saving items you love</p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Furniture
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="relative aspect-square">
                  <Image
                    fill
                    src={item.image}
                    alt={item.name}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <button
                    onClick={() => toggleFavorite(item._id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                  {item.sale && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.sale}% OFF
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        $
                        {item.sale
                          ? (item.price * (1 - item.sale / 100)).toFixed(2)
                          : item.price.toFixed(2)}
                      </span>
                      {/* {item.sale && (
                        <span className="text-gray-400 line-through ml-2 text-sm">
                          ${item.price.toFixed(2)}
                        </span>
                      )} */}
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between space-x-3">
                    <Link
                      href={`/furniture/${item._id}`}
                      className="flex text-blue-400"
                    >
                      More
                    </Link>
                    <AddCartButton itemId={item._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
