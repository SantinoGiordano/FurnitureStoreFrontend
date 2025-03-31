"use client";

import { useCartStore } from "@/app/Store";

export default function RemoveFromCart({ itemId }: { itemId: string }) {
  const toggleInCart = useCartStore((state) => state.toggleInCart);
  const inCart = useCartStore((state) => state.inCart[itemId]);

  return (
    <div className="">
      <button
        onClick={() => toggleInCart(itemId)}
        className={`p-2 mt-2 rounded ${
          inCart ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}