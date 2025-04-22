// import { Furniture } from "@/app/(root)/page";
import { Furniture } from "@/types/furiture";
import { API_ENDPOINT } from "@/util/env";
import { useState } from "react";

export const useFurnitureApi = () => {
  const [items, setItems] = useState<Furniture[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchFurniture() {
    try {
      const response = await fetch(`${API_ENDPOINT}/furniture`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError("Unable to load furniture items. Please try again later.");
      console.log(err);
    }
  }

  return {
    items,
    fetchFurniture,
    error,
  };
};
