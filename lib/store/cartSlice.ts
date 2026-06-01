import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/lib/types';

export type CartState = {
  items: CartItem[];
  isOpen: boolean;
  upsellDismissed: boolean;
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  upsellDismissed: false,
};

function sameLine(a: CartItem, b: CartItem): boolean {
  if (a.productId !== b.productId) return false;
  // Customised items are unique per song — never merge lines
  if (a.customisation || b.customisation) return false;
  return true;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const incoming = action.payload;
      const existing = state.items.find((item) => sameLine(item, incoming));
      if (existing) {
        existing.quantity += incoming.quantity;
      } else {
        state.items.push(incoming);
      }
      state.isOpen = true;
    },
    removeItem(state, action: PayloadAction<{ productId: string; index?: number }>) {
      const { productId, index } = action.payload;
      if (typeof index === 'number') {
        state.items.splice(index, 1);
      } else {
        state.items = state.items.filter((item) => item.productId !== productId);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ index: number; quantity: number }>,
    ) {
      const { index, quantity } = action.payload;
      const item = state.items[index];
      if (!item) return;
      if (quantity <= 0) {
        state.items.splice(index, 1);
      } else {
        item.quantity = quantity;
      }
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    dismissUpsell(state) {
      state.upsellDismissed = true;
    },
    clearCart(state) {
      state.items = [];
      state.upsellDismissed = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  openCart,
  closeCart,
  toggleCart,
  dismissUpsell,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
