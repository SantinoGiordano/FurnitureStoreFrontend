"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RatingSystem from "@/componets/ratingSystem";
import { useFavoritedStore } from "@/app/Store";
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
  favorite: boolean;
  inCart: boolean;
}

export default function FurnitureDetail() {
  const { _id } = useParams();
  const [item, setItem] = useState<Furniture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFurnitureItem() {
      try {
        const response = await fetch(`http://localhost:8080/api/furniture/${_id}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load item");
      } finally {
        setLoading(false);
      }
    }

    if (_id) {
      fetchFurnitureItem();
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg max-w-md text-center">
          {error}
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Item not found</p>
      </div>
    );
  }

  return <MorePage item={item} />;
}

function MorePage({ item }: { item: Furniture }) {
  const favorites = useFavoritedStore((state) => state.favorites);
  const toggleFavorite = useFavoritedStore((state) => state.toggleFavorite);
  const isFavorited = favorites[item._id] || false;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-100">
              <Image
                fill
                src={item.image}
                alt={item.name}
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {item.sale && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {item.sale}% OFF
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
                <button
                  onClick={() => toggleFavorite(item._id)}
                  className="text-2xl focus:outline-none"
                  aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorited ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="text-gray-600 mb-6">{item.description}</p>

              <div className="mb-6">
                <RatingSystem rating={item.rating} />
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.sale && (
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      ${(item.price / (1 - item.sale/100)).toFixed(2)}
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  item.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-200">
                <AddCartButton 
                  itemId={item._id}  
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}