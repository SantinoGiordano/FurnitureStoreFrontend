"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFavoritedStore } from "@/app/Store";
import RatingSystem from "@/componets/ratingSystem";
import SearchBar from "@/componets/SearchBar";
import Link from "next/link";
import AddCartButton from "@/componets/AddCartButton";

export interface Furniture {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
}

export default function FurnitureSystem() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const response = await fetch(
          "https://santinofurniturestore.onrender.com/api/furniture"
        );
        if (!response.ok) throw new Error("Failed to fetch furniture data.");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchFurniture();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg max-w-md text-center">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Furniture Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our curated selection of premium furniture
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {items.map((item) => (
            <FurnitureItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FurnitureItem({ item }: { item: Furniture }) {
  const favorites = useFavoritedStore((state) => state.favorites);
  const toggleFavorite = useFavoritedStore((state) => state.toggleFavorite);
  const isFavorited = favorites[item._id] || false;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="relative aspect-square">
        <Image
          draggable="false"
          fill
          src={item.image}
          alt={item.name}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {item.sale && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {item.sale}% OFF
          </div>
        )}
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {item.name}
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(item._id);
            }}
            className="text-2xl focus:outline-none"
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorited ? "❤️" : "🤍"}
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${item.price.toFixed(2)}
            </span>
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

          <RatingSystem rating={item.rating} />

          <div className="mt-4 space-x-3 flex items-center justify-between">
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
    </div>
  );
}
