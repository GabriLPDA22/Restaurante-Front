<template>
    <div class="cart">
      <div v-if="selectedProduct" class="cart__details">
        <h2 class="cart__details-title">{{ selectedProduct.name }}</h2>
        <p class="cart__details-description">{{ selectedProduct.description }}</p>
        <p class="cart__details-price">Precio: ${{ selectedProduct.price }}</p>
        <button class="cart__details-close" @click="closeDetails">Cerrar</button>
        <button class="cart__details-cart" @click="addToCart(selectedProduct)">Añadir</button>
        <button class="cart__details-cart cart__details-cart--remove" @click="removeFromCart(selectedProduct)" v-if="cart[selectedProduct.id]">Quitar</button>
      </div>
      <div class="cart__grid-wrapper">
        <div class="cart__grid">
          <div
            v-for="product in products"
            :key="product.id"
            class="cart__item"
            @click="selectProduct(product)"
          >
            <img :src="product.image" :alt="product.name" class="cart__image" />
            <span v-if="cart[product.id]" class="cart__count">{{ cart[product.id] }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  type Product = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
  };
  
  const products = ref<Product[]>(Array.from({ length: 10 }, (_, i) => ({
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
  </script>
  
  <style lang="scss" scoped>
  .cart {
    &__grid-wrapper {
      max-height: 400px; // Ajustable según diseño
      overflow-y: auto;
      border: 1px solid #ddd;
      padding: 8px;
    }
  
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
    }
  
    &__item {
      cursor: pointer;
      text-align: center;
      position: relative;
    }
  
    &__image {
      width: 100%;
      max-width: 400px;
      height: auto;
      border-radius: 8px;
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
      background: #fff;
      padding: 12px;
      border-bottom: 1px solid #ddd;
      left: 0;
      width: 100%;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1000;
    }
  
    &__details-title {
      font-size: 18px;
      margin: 0 0 5px;
    }
  
    &__details-description {
      font-size: 14px;
      margin-bottom: 5px;
    }
  
    &__details-price {
      font-size: 16px;
      font-weight: bold;
    }
  
    &__details-close,
    &__details-cart {
      margin-top: 5px;
      background: #28a745;
      color: white;
      padding: 6px 10px;
      border: none;
      cursor: pointer;
      border-radius: 5px;
    }
    &__details-cart--remove {
      background: #dc3545;
    }
  }
  </style>
  