import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Furniture {
  _id:string;
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  inStock: boolean;
  image: string;
  sale?: number;
}

export default function SearchBar(){
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Furniture[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (!input.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/furniture");
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        console.log("Fetched data:", json); // Debugging

        const filteredResults = json.filter((item : Furniture) =>
          item?.name?.toLowerCase().includes(input.toLowerCase())
        );

        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // Prevent UI crashes on error
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // Debounce for 500ms
    return () => clearTimeout(timeoutId);
  }, [input]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <input
        id="item-search"
        className="w-full p-3 pl-4 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        type="text"
        placeholder="🔍 Search for furniture..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Search Results */}
      {input && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((item, index) => (
              <li
                key={index}
                className="px-4 py-3 text-gray-700 hover:bg-blue-500 hover:text-white cursor-pointer transition-all"
              >
                <Link href={`/furniture/${item._id}`}>
                {item.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
