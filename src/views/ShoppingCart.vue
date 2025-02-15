<template>
  <div class="cart">
    <div v-if="selectedProduct" class="cart__details">
      <div class="cart__details-left">
        <div class="cart__details-image-container">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" class="cart__details-image" />
          <p class="cart__details-price">Precio: ${{ selectedProduct.price }}</p>
        </div>
        <div class="cart__details-info">
          <h2 class="cart__details-title">{{ selectedProduct.name }}</h2>
          <p class="cart__details-description">{{ selectedProduct.description }}</p>
        </div>
      </div>
      <div class="cart__details-right">
        <button class="cart__details-close" @click="closeDetails">Cerrar</button>
        <button class="cart__details-cart" @click="addToCart(selectedProduct)">Añadir</button>
        <button class="cart__details-cart cart__details-cart--remove" @click="removeFromCart(selectedProduct)" :disabled="!cart[selectedProduct.id]">Quitar</button>
        <p class="cart__details-total">Total: ${{ cartTotal }}</p>
        <button class="cart__details-checkout" @click="goToCheckout">Ir al pago</button>
      </div>
    </div>
    <div class="cart__grid-container">
      <h2 class="cart__category">Apetizers</h2>
      <div class="cart__grid">
        <div v-for="product in products.slice(0, 5)" :key="product.id" class="cart__item" @click="selectProduct(product)">
          <img :src="product.image" :alt="product.name" class="cart__image" />
          <span v-if="cart[product.id]" class="cart__count">{{ cart[product.id] }}</span>
        </div>
      </div>
      <h2 class="cart__category">Main Courses</h2>
      <div class="cart__grid">
        <div v-for="product in products.slice(5, 10)" :key="product.id" class="cart__item" @click="selectProduct(product)">
          <img :src="product.image" :alt="product.name" class="cart__image" />
          <span v-if="cart[product.id]" class="cart__count">{{ cart[product.id] }}</span>
        </div>
      </div>
      <h2 class="cart__category">Drinks</h2>
      <div class="cart__grid">
        <div v-for="product in products.slice(10, 13)" :key="product.id" class="cart__item" @click="selectProduct(product)">
          <img :src="product.image" :alt="product.name" class="cart__image" />
          <span v-if="cart[product.id]" class="cart__count">{{ cart[product.id] }}</span>
        </div>
      </div>
      <h2 class="cart__category">Desserts</h2>
      <div class="cart__grid">
        <div v-for="product in products.slice(13, 17)" :key="product.id" class="cart__item" @click="selectProduct(product)">
          <img :src="product.image" :alt="product.name" class="cart__image" />
          <span v-if="cart[product.id]" class="cart__count">{{ cart[product.id] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

const products = ref<Product[]>(Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  image: 'https://cdn.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4.jpg',
  description: `Descripción del producto ${i + 1}`,
  price: (i + 1) * 5
})));

const selectedProduct = ref<Product | null>(null);
const cart = ref<{ [key: number]: number }>({});

const selectProduct = (product: Product) => {
  selectedProduct.value = product;
};

const closeDetails = () => {
  selectedProduct.value = null;
};

const addToCart = (product: Product | null) => {
  if (!product) return;
  if (cart.value[product.id]) {
    cart.value[product.id]++;
  } else {
    cart.value[product.id] = 1;
  }
};

const removeFromCart = (product: Product | null) => {
  if (!product || !cart.value[product.id]) return;
  if (cart.value[product.id] > 1) {
    cart.value[product.id]--;
  } else {
    delete cart.value[product.id];
  }
};

const cartTotal = computed(() => {
  return Object.keys(cart.value).reduce((total, productId) => {
    const product = products.value.find(p => p.id === Number(productId));
    return product ? total + product.price * cart.value[Number(productId)] : total;
  }, 0);
});

const goToCheckout = () => {
  alert("Ir al pago - Total: $" + cartTotal.value);
};
</script>

<style lang="scss" scoped>
.cart {
  &__grid-container {
    padding-left: 50px;
    padding-right: 50px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 16px;
    transition: transform 0.3s ease;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

  }

  &__category {
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
  }

  &__item {
    cursor: pointer;
    text-align: center;
    position: relative;
  }

  &__image {
    width: 100%;
    max-width: 300px;
    height: auto;
    border-radius: 8px;
    object-fit: cover;

    @media (max-width: 768px) {
      max-width: 200px;
    }
}

  &__count {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 14px;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 16px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1000;
  }

  &__details-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__details-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    object-fit: cover;
  }

  &__details-info {
    display: flex;
    flex-direction: column;
  }

  &__details-right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
  }

  &__details-close,
  &__details-cart,
  &__details-cart--remove,
  &__details-checkout {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  &__details-close {
    background-color: #dc3545;
    color: white;
  }

  &__details-cart {
    background-color: #28a745;
    color: white;
  }

  &__details-cart--remove {
    background-color: #ffc107;
    opacity: 1;
    transition: opacity 0.3s ease;
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.6;
    }
    color: black;
  }

  &__details-checkout {
    background-color: #007bff;
    color: white;
  }
}
</style>

