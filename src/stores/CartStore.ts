import { defineStore } from 'pinia';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [] as CartItem[],
  }),
  getters: {
    totalQuantity: (state) => state.cart.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(product: CartItem) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productId: number) {
      this.cart = this.cart.filter((item) => item.id !== productId);
    },
    updateQuantity(productId: number, quantity: number) {
      const item = this.cart.find((item) => item.id === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
      } else {
        this.removeFromCart(productId);
      }
    },
  },
});
