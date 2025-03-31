// Store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define types for the store states
interface FavoriteStoreState {
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void;
}

interface CartStoreState {
  inCart: Record<string, boolean>;
  toggleInCart: (id: string) => void;
}

// Favorite Store with Persistence
export const useFavoritedStore = create<FavoriteStoreState>()(
  persist(
    (set) => ({
      favorites: {},
      toggleFavorite: (id: string) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            [id]: !state.favorites[id],
          },
        })),
    }),
    {
      name: "favorites-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

// Cart Store with Persistence
export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      inCart: {},
      toggleInCart: (id: string) =>
        set((state) => ({
          inCart: {
            ...state.inCart,
            [id]: !state.inCart[id],
          },
        })),
    }),
    {
      name: "cart-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);
