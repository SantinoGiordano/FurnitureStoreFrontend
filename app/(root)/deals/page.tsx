"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [items, setItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const favorites = useFavoritedStore((state) => state.favorites);
  const toggleFavorite = useFavoritedStore((state) => state.toggleFavorite);

  useEffect(() => {
    async function fetchFurniture() {
      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch furniture data.");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching furniture:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFurniture();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hot Deals</h1>
          <p className="text-lg text-gray-600">
            Limited-time offers on our best furniture
          </p>
        </div>
        {dealsChecker(items, favorites, toggleFavorite)}
      </div>
    </div>
  );
}

function dealsChecker(
  items: Furniture[],
  favorites: Record<string, boolean>,
  toggleFavorite: (id: string) => void
) {
  const saleItems = items.filter(
    (item) => item.sale !== undefined && item.sale > 0
  );

  if (saleItems.length === 0) {
    return (
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
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-medium text-gray-900">
          No deals available
        </h2>
        <p className="mt-2 text-gray-500">
          Check back later for special offers
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {saleItems.map((item) => {
        const salePrice = item.price * (1 - (item.sale || 0) / 100);

        return (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
          >
            <div className="relative aspect-square">
              <Image
                fill
                src={item.image}
                alt={item.name}
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.sale}% OFF
              </div>
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
                    favorites[item._id]
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {favorites[item._id] ? "❤️" : "🤍"}
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-gray-900">
                      ${salePrice.toFixed(2)}
                    </span>
                    <span className="text-gray-400 line-through ml-2 text-sm">
                      ${item.price.toFixed(2)}
                    </span>
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

                <RatingSystem rating={item.rating} />

                <div className="mt-4 flex items-center justify-between space-x-3">
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
      })}
    </div>
  );
}
