import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem, ColorOption } from './types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, color: ColorOption, size: string, quantity?: number) => void;
  removeItem: (productId: string, colorName: string, size: string) => void;
  updateQuantity: (productId: string, colorName: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

interface WishlistStore {
  items: string[]; // product IDs
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, color, size, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor.name === color.name &&
              item.selectedSize === size
          );

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  product,
                  selectedColor: color,
                  selectedSize: size,
                  quantity,
                },
              ],
            };
          }
        });
      },

      removeItem: (productId, colorName, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor.name === colorName &&
                item.selectedSize === size
              )
          ),
        }));
      },

      updateQuantity: (productId, colorName, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, colorName, size);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          );
          return { items: updatedItems };
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId) => {
        set((state) => {
          if (!state.items.includes(productId)) {
            return { items: [...state.items, productId] };
          }
          return state;
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
