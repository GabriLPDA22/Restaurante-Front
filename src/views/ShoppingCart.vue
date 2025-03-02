<template>
  <div class="restaurant-app">
    <header class="restaurant-app__header">
      <div class="header-content">
        <h1 class="header-content__title">Buon Appetito!</h1>
        <p class="header-content__subtitle">Experiencia gastronómica excepcional</p>

        <div class="search-container">
          <input type="text" placeholder="Buscar platos..." v-model="searchQuery" class="search-container__input" />
        </div>

        <div class="category-filters">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="{
            'category-filters__button': true,
            'category-filters__button--active': selectedCategory === category
          }">
            {{ category }}
          </button>
        </div>
      </div>
    </header>

    <main class="restaurant-app__content">
      <div class="product-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-card__image-container">
            <img :src="product.imagenUrl" :alt="product.nombre" class="product-card__image" />
          </div>

          <div class="product-card__details">
            <h3 class="product-card__name" style="color: #2b7a78;">{{ product.nombre }}</h3>
            <div class="product-card__rating">★★★★★</div>
            <p class="product-card__description">{{ product.descripcion }}</p>

            <div class="product-card__footer">
              <span class="product-card__price">€{{ product.precio.toFixed(2) }}</span>
              <button @click="addToCart(product)" class="product-card__add-button">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="cart-float-button" @click="toggleCart">
      <div class="cart-icon">
        <span class="cart-icon-emoji">🛒</span>
        <span v-if="cart.length" class="cart-count">
          {{ totalCartItems }}
        </span>
      </div>
    </div>

    <div v-if="cart.length" v-show="cartVisible" class="small-cart-preview">
      <div class="small-cart-preview__header">
        <span>Tu Carrito</span>
        <span class="cart-count">{{ cart.length }}</span>
      </div>
      <div class="small-cart-preview__content">
        <div v-for="item in cart" :key="item.id" class="small-cart-preview__item">
          <div class="cart-item-details">
            <span class="small-cart-preview__name">{{ item.nombre }}</span>
            <div class="cart-item-quantity">
              <button @click="updateQuantity(item.id, item.quantity - 1)" class="quantity-button">
                -
              </button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-button">
                +
              </button>
            </div>
            <span class="small-cart-preview__price">€{{ (item.precio * item.quantity).toFixed(2) }}</span>
            <button @click="removeFromCart(item.id)" class="remove-item-button">
              🗑️
            </button>
          </div>
        </div>
        <div class="small-cart-preview__total">
          <span>Total:</span>
          <span>€{{ calculateTotal().toFixed(2) }}</span>
        </div>
        <button class="small-cart-preview__checkout" @click="irAlCheckout">
          Ir al Pago
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categorias: string[];
  imagenUrl?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const router = useRouter();
const products = ref<Product[]>([])
const cart = ref<CartItem[]>([])
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const cartVisible = ref(false);

const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:5021/api/Productos', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No se pudo cargar los productos');
    }

    products.value = await response.json();
  } catch (err) {
    console.error('Error fetching products:', err);
    // Cargar datos de ejemplo si la API falla
    products.value = [
      {
        id: 1,
        nombre: 'Pizza Margherita',
        descripcion: 'Tomate, mozzarella, albahaca',
        precio: 10.50,
        categorias: ['Pizzas', 'Vegetariano'],
        imagenUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 2,
        nombre: 'Pasta Carbonara',
        descripcion: 'Espaguetis, huevo, panceta, queso',
        precio: 12.75,
        categorias: ['Pastas'],
        imagenUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 3,
        nombre: 'Tiramisú',
        descripcion: 'Postre italiano con café y mascarpone',
        precio: 6.50,
        categorias: ['Postres'],
        imagenUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
      },
      {
        id: 4,
        nombre: 'Ensalada César',
        descripcion: 'Lechuga, pollo, picatostes, parmesano',
        precio: 8.95,
        categorias: ['Ensaladas'],
        imagenUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
      }
    ];
  }
}

// Cargar carrito guardado del localStorage
const loadCart = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
    }
  }
}

// Guardar carrito en localStorage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
}

onMounted(() => {
  fetchProducts();
  loadCart();
})

const categories = computed(() => {
  const allCategories = products.value.flatMap(p => p.categorias);
  return ['Todos', ...new Set(allCategories)];
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch =
      product.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selectedCategory.value === 'Todos' ||
      product.categorias.includes(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });
})

const totalCartItems = computed(() =>
  cart.value.reduce((total, item) => total + item.quantity, 0)
)

const addToCart = (product: Product) => {
  const existingItem = cart.value.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }

  saveCart();

  // Mostrar el carrito automáticamente al añadir un producto
  cartVisible.value = true;
}

const removeFromCart = (productId: number) => {
  const index = cart.value.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.value.splice(index, 1);
    saveCart();
  }
}

const updateQuantity = (productId: number, newQuantity: number) => {
  const item = cart.value.find(item => item.id === productId);

  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      saveCart();
    }
  }
}

const calculateTotal = () => {
  return cart.value.reduce((total, item) => total + (item.precio * item.quantity), 0);
}

const toggleCart = () => {
  cartVisible.value = !cartVisible.value;
}

const irAlCheckout = () => {
  // Guardar el carrito en localStorage para que el componente de checkout pueda acceder
  saveCart();

  // Redirigir a la página de checkout
  router.push('/checkout');
}
</script>

<style lang="scss">
:root {
  --primary-color: #2B7A78;
  --secondary-color: #DEF2F1;
  --accent-color: #FFC107;
  --text-dark: #17252A;
  --white: #FFFFFF;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

.restaurant-app {
  max-width: 1400px;
  margin: 0 auto;

  &__header {
    position: relative;
    background: linear-gradient(135deg, rgba(black, 0.5) 0%, rgba(white, 0.4) 100%),
      url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80');
    background-size: cover;
    background-position: center;
    color: var(--white);
    padding: 2rem;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    text-align: center;
  }

  &__content {
    display: flex;
    padding: 2rem;
    gap: 2rem;
  }
}

.header-content {
  &__title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  &__subtitle {
    font-size: 1.2rem;
  }
}

.search-container {
  max-width: 600px;
  margin: 1rem auto;

  &__input {
    width: 100%;
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 50px;
    background: var(--white);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &__button {
    background-color: rgba(255, 255, 255, 0.2);
    color: var(--white);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    opacity: 0.7;

    &--active {
      background-color: var(--white);
      color: var(--primary-color);
      opacity: 1;
    }
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  flex: 1;
}

.product-card {
  background: var(--white);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &__image-container {
    position: relative;
    height: 250px;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__details {
    padding: 1rem;
  }

  &__name {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  &__rating {
    color: var(--accent-color);
    margin-bottom: 0.5rem;
  }

  &__description {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__add-button {
    background-color: var(--accent-color);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.cart-float-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
}

.cart-icon {
  position: relative;
}

.cart-icon-emoji {
  font-size: 1.5rem;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--accent-color);
  color: var(--text-dark);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.small-cart-preview {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: var(--primary-color);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideUp 0.3s ease-out;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: var(--primary-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: var(--white);
  }

  &__content {
    background-color: var(--white);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 1rem;
    max-height: 60vh;
    overflow-y: auto;
  }

  &__item {
    .cart-item-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .cart-item-quantity {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .quantity-button {
        background-color: var(--primary-color);
        color: var(--white);
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }

    .remove-item-button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
    }
  }

  &__name {
    color: var(--text-dark);
    font-weight: bold;
  }

  &__price {
    color: var(--primary-color);
  }

  &__total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid #eee;
  }

  &__checkout {
    width: 100%;
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    padding: 0.75rem;
    border-radius: 5px;
    margin-top: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: darken(#2B7A78, 10%);
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .restaurant-app__content {
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .small-cart-preview {
    width: calc(100% - 2rem);
    margin: 0 1rem;
  }

  .header-content {
    &__title {
      font-size: 2rem;
    }

    &__subtitle {
      font-size: 1rem;
    }
  }

  .category-filters {
    flex-wrap: wrap;
    gap: 0.5rem;

    &__button {
      flex-grow: 1;
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
  }
}
</style>