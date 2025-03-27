<template>
  <div class="restaurant-app">
    <header class="restaurant-app__header">
      <div class="header-content">
        <h1 class="header-content__title">Buon Appetito!</h1>
        <p class="header-content__subtitle">Exceptional Gastronomic Experience</p>

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
            <div class="product-card__header">
              <h3 class="product-card__name" style="color: #2b7a78;">{{ product.nombre }}</h3>
              <button class="favorite-button" @click="toggleFavorite(product)"
                :class="{ 'is-favorite': isFavorite(product.id) }">
                <!-- Icono SVG de corazón en lugar de Font Awesome -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                  <path
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
              </button>
            </div>
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

    <!-- Redesigned Cart Float Button -->
    <div class="cart-float-button" @click="toggleCart">
      <div class="cart-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cart-icon__svg">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span v-if="totalCartItems > 0" class="cart-count">
          {{ totalCartItems }}
        </span>
      </div>
      <span v-if="totalCartItems > 0" class="cart-float-total">€{{ calculateTotal().toFixed(2) }}</span>
    </div>

    <div v-if="cart.length" v-show="cartVisible" class="small-cart-preview">
      <div class="small-cart-preview__header">
        <span style="color: white;">Tu Carrito</span>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

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
const route = useRoute();
const authStore = useAuthStore();
const products = ref<Product[]>([])
const cart = ref<CartItem[]>([])
const searchQuery = ref('')
const selectedCategory = ref('Todos')
const cartVisible = ref(false);
const favorites = ref<number[]>([]);

// Mapeo de categorías del home a las categorías exactas de la BBDD
const categoryMapping = {
  'Appetizers': 'Aperitivos',
  'Main Courses': 'Plato Principal',
  'Pasta': 'Pasta',
  'Dessert': 'Postre',
};

// Computado para obtener todas las categorías disponibles
const categories = computed(() => {
  const allCategories = products.value.flatMap(p => p.categorias);
  return ['Todos', ...new Set(allCategories)];
});

// Función para registrar información de depuración sobre las categorías
const logCategoryInfo = () => {
  console.log("--- Category Debug Info ---");
  console.log("Available categories:", categories.value);
  console.log("Current selected category:", selectedCategory.value);
  console.log("URL query params:", route.query);
  console.log("---------------------------");
};

// Observar cambios en la ruta para actualizar la categoría seleccionada (viejo método)
watch(() => route.query.category, (newCategory) => {
  if (!products.value.length || !newCategory) return;

  if (typeof newCategory === 'string') {
    console.log("Category from URL:", newCategory);

    // Intentar mapear la categoría desde el Home a las categorías disponibles en el carrito
    const mappedCategory = categoryMapping[newCategory] || newCategory;
    console.log("Mapped category:", mappedCategory);

    // Comprobar si esta categoría exacta existe en nuestras categorías disponibles
    if (categories.value.includes(mappedCategory)) {
      console.log("Category exists, setting to:", mappedCategory);
      selectedCategory.value = mappedCategory;
      return;
    }

    // Si no existe una coincidencia exacta, buscar la mejor aproximación
    // 1. Primero buscamos una categoría que incluya el término parcialmente
    const partialMatch = categories.value.find(cat =>
      cat.toLowerCase().includes(mappedCategory.toLowerCase())
    );

    if (partialMatch) {
      console.log("Partial match found, setting to:", partialMatch);
      selectedCategory.value = partialMatch;
      return;
    }

    // 2. Si no hay coincidencias parciales en las categorías, buscar en los productos
    const productsWithCategory = products.value.filter(product =>
      product.categorias.some(cat =>
        cat.toLowerCase().includes(mappedCategory.toLowerCase())
      )
    );

    if (productsWithCategory.length > 0) {
      // Tomar la primera categoría del primer producto que coincida
      const firstMatchCategory = productsWithCategory[0].categorias[0];
      console.log("Found category from products, setting to:", firstMatchCategory);
      selectedCategory.value = firstMatchCategory;
    }
  }
}, { immediate: true });

// Nuevo método: Watch para selectedCategory directamente en URL
watch(() => route.query.selectedCategory, (newCategory) => {
  if (newCategory && typeof newCategory === 'string') {
    console.log("Direct category from URL:", newCategory);
    logCategoryInfo();

    // Primero, verificar si la categoría existe exactamente como está
    if (categories.value.includes(newCategory)) {
      console.log("Setting category directly to:", newCategory);
      selectedCategory.value = newCategory;
      return;
    }

    // Si no existe, buscar coincidencias parciales (insensible a mayúsculas/minúsculas)
    const partialMatches = categories.value.filter(category =>
      category.toLowerCase() === newCategory.toLowerCase() ||
      category.toLowerCase().includes(newCategory.toLowerCase()) ||
      newCategory.toLowerCase().includes(category.toLowerCase())
    );

    if (partialMatches.length > 0) {
      console.log("Setting category to partial match:", partialMatches[0]);
      selectedCategory.value = partialMatches[0];
    }
  }
}, { immediate: true });

// Asegurarse de verificar la categoría después de cargar los productos
watch(() => products.value.length, (newLength) => {
  if (newLength > 0) {
    console.log("Products loaded, checking categories...");
    logCategoryInfo();

    // Verificar selectedCategory primero (nuevo método)
    if (route.query.selectedCategory) {
      const categoryParam = route.query.selectedCategory;
      if (typeof categoryParam === 'string') {
        // Comprobar si coincide exactamente con alguna categoría
        if (categories.value.includes(categoryParam)) {
          console.log("Setting category after products loaded:", categoryParam);
          selectedCategory.value = categoryParam;
          return;
        }

        // Buscar coincidencias parciales
        const partialMatches = categories.value.filter(category =>
          category.toLowerCase() === categoryParam.toLowerCase() ||
          category.toLowerCase().includes(categoryParam.toLowerCase()) ||
          categoryParam.toLowerCase().includes(category.toLowerCase())
        );

        if (partialMatches.length > 0) {
          console.log("Setting category to partial match after products loaded:", partialMatches[0]);
          selectedCategory.value = partialMatches[0];
          return;
        }
      }
    }

    // Si no hay selectedCategory, verificar category (viejo método)
    checkCategoryFromQuery();
  }
});

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
    console.log("Products loaded:", products.value.length);

    // Cargar favoritos después de cargar productos
    loadFavorites();
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

// Función para verificar y aplicar la categoría desde la URL después de cargar productos
const checkCategoryFromQuery = () => {
  const categoryParam = route.query.category;
  console.log("Checking category from query:", categoryParam);

  if (!categoryParam || !categories.value.length) return;

  if (typeof categoryParam === 'string') {
    // Intentar mapear la categoría primero
    const mappedCategory = categoryMapping[categoryParam] || categoryParam;
    console.log("Mapped category:", mappedCategory);

    // Comprobar si esta categoría exacta existe en nuestras categorías
    if (categories.value.includes(mappedCategory)) {
      console.log("Category exists, setting to:", mappedCategory);
      selectedCategory.value = mappedCategory;
      return;
    }

    // Si no existe una coincidencia exacta, buscar la mejor aproximación
    // 1. Primero buscamos una categoría que incluya el término parcialmente
    const partialMatch = categories.value.find(cat =>
      cat.toLowerCase().includes(mappedCategory.toLowerCase())
    );

    if (partialMatch) {
      console.log("Partial match found, setting to:", partialMatch);
      selectedCategory.value = partialMatch;
      return;
    }

    // 2. Si no hay coincidencias parciales en las categorías, buscar en los productos
    const productsWithCategory = products.value.filter(product =>
      product.categorias.some(cat =>
        cat.toLowerCase().includes(mappedCategory.toLowerCase())
      )
    );

    if (productsWithCategory.length > 0) {
      // Tomar la primera categoría del primer producto que coincida
      const firstMatchCategory = productsWithCategory[0].categorias[0];
      console.log("Found category from products, setting to:", firstMatchCategory);
      selectedCategory.value = firstMatchCategory;
    }
  }
}

// Comprobar si un producto está en favoritos
const isFavorite = (productId) => {
  return favorites.value.includes(productId);
};

// Depurar información del usuario
const logUserInfo = () => {
  console.log("===== INFORMACIÓN DEL USUARIO =====");
  console.log("authStore existe:", !!authStore);
  console.log("authStore.user:", authStore.user);
  console.log("authStore.isAuthenticated:", authStore.isAuthenticated);
  
  if (authStore.user) {
    console.log("UserID:", authStore.user.UserID);
    console.log("Email:", authStore.user.Email);
    console.log("Nombre:", authStore.user.Nombre);
    console.log("Valores disponibles:", Object.keys(authStore.user));
  }
  console.log("===================================");
};

// Función para obtener el ID del usuario actual
const getCurrentUserId = () => {
  logUserInfo();
  
  // Intentamos diferentes propiedades posibles para el ID de usuario
  if (authStore.user) {
    // Probar diferentes nombres de propiedades para el ID
    const possibleIds = ['UserID', 'userId', 'userID', 'id', 'Id', 'ID'];
    
    for (const prop of possibleIds) {
      if (authStore.user[prop] !== undefined) {
        console.log(`Encontrado ID de usuario en propiedad: ${prop} = ${authStore.user[prop]}`);
        return authStore.user[prop];
      }
    }
    
    // Si no se encontró por nombre específico, buscar cualquier propiedad que contenga 'id'
    for (const key in authStore.user) {
      if (key.toLowerCase().includes('id') && typeof authStore.user[key] === 'number') {
        console.log(`Encontrado posible ID de usuario en propiedad: ${key} = ${authStore.user[key]}`);
        return authStore.user[key];
      }
    }
    
    // Si todo falla, imprimir todo el objeto
    console.log("No se encontró ID de usuario. Objeto completo:", JSON.stringify(authStore.user));
  }
  
  console.error("No se pudo determinar el ID del usuario");
  return null;
};

// Función para cargar favoritos desde la API
const loadFavorites = async () => {
  try {
    const userId = getCurrentUserId();
    
    if (!userId) {
      console.error("No se pudo obtener el ID del usuario para cargar favoritos");
      return;
    }
    
    console.log(`Cargando favoritos para usuario ID: ${userId}`);
    
    const response = await fetch(`http://localhost:5021/api/Favoritos/usuario/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Loguear la respuesta completa para depuración
    console.log(`Respuesta de la API (status ${response.status}):`, response);
    
    if (response.ok) {
      const data = await response.json();
      console.log("Datos recibidos de la API:", data);
      
      if (Array.isArray(data)) {
        favorites.value = data.map(fav => fav.productoId);
        console.log("Favoritos cargados:", favorites.value);
      } else {
        console.error("Respuesta inesperada de la API:", data);
      }
    } else {
      const errorText = await response.text();
      console.error(`Error ${response.status} al cargar favoritos:`, errorText);
      
      // Si la API falla, podríamos cargar desde localStorage como respaldo
      loadLocalFavorites();
    }
  } catch (error) {
    console.error('Error al cargar favoritos:', error);
    
    // Si hay un error de conexión, podríamos cargar desde localStorage como respaldo
    loadLocalFavorites();
  }
};

// Función para añadir/quitar un producto de favoritos
const toggleFavorite = async (product) => {
  const userId = getCurrentUserId();
  
  if (!userId) {
    console.error("No se pudo obtener el ID del usuario para toggle de favorito");
    alert('Para añadir productos a favoritos, inicia sesión primero');
    return;
  }
  
  console.log(`Toggle favorito para usuario ID: ${userId}, producto ID: ${product.id}`);
  
  try {
    const url = `http://localhost:5021/api/Favoritos/usuario/${userId}/producto/${product.id}/toggle`;
    console.log("URL de la solicitud:", url);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Respuesta de la API (status ${response.status})`, response);
    
    if (response.ok) {
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      
      if (data.isFavorito) {
        if (!favorites.value.includes(product.id)) {
          favorites.value.push(product.id);
        }
        console.log(`Producto ${product.nombre} añadido a favoritos`);
      } else {
        favorites.value = favorites.value.filter(id => id !== product.id);
        console.log(`Producto ${product.nombre} eliminado de favoritos`);
      }
      
      // También actualizamos localStorage como respaldo
      saveLocalFavorites();
    } else {
      const errorText = await response.text();
      console.error(`Error ${response.status} al modificar favorito:`, errorText);
      
      // Si la API falla, realizamos el cambio localmente
      toggleLocalFavorite(product);
    }
  } catch (error) {
    console.error('Error al modificar favorito:', error);
    
    // Si hay un error de conexión, realizamos el cambio localmente
    toggleLocalFavorite(product);
  }
};

// Funciones de respaldo usando localStorage
const loadLocalFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem('local_favorites');
    if (savedFavorites) {
      favorites.value = JSON.parse(savedFavorites);
      console.log("Favoritos cargados desde localStorage:", favorites.value);
    }
  } catch (e) {
    console.error('Error al cargar favoritos desde localStorage:', e);
    favorites.value = [];
  }
};

const saveLocalFavorites = () => {
  localStorage.setItem('local_favorites', JSON.stringify(favorites.value));
};

const toggleLocalFavorite = (product) => {
  const index = favorites.value.indexOf(product.id);
  
  if (index === -1) {
    favorites.value.push(product.id);
    console.log(`Producto ${product.nombre} añadido a favoritos localmente`);
  } else {
    favorites.value.splice(index, 1);
    console.log(`Producto ${product.nombre} eliminado de favoritos localmente`);
  }
  
  saveLocalFavorites();
};

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
  console.log("Component mounted, fetching products");
  fetchProducts();
  loadCart();
  
  // Depurar información del usuario
  logUserInfo();
  
  // Intentar cargar favoritos
  loadFavorites();
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

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }

  saveCart();

  cartVisible.value = true;
  const cartButton = document.querySelector('.cart-float-button');
  if (cartButton) {
    cartButton.classList.add('cart-float-button--pulse');
    setTimeout(() => {
      cartButton.classList.remove('cart-float-button--pulse');
    }, 1000);
  }
}

const removeFromCart = (productId) => {
  const index = cart.value.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.value.splice(index, 1);
    saveCart();
  }
}

const updateQuantity = (productId, newQuantity) => {
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
  saveCart();
  router.push('/checkout');
}
</script>

<style lang="scss" scoped>
:root {
  --primary-color: #2B7A78;
  --secondary-color: #DEF2F1;
  --accent-color: #FFC107;
  --text-dark: #17252A;
  --white: #FFFFFF;
  --heart-color: #ff6b6b;
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
    color: white;
  }

  &__subtitle {
    font-size: 1.2rem;
    color: white;
  }
}

.search-container {
  max-width: 600px;
  margin: 1rem auto;

  &__input {
    width: 100%;
    padding: 0.75rem 1.25rem;
    border: none;
    color: white;
    border-radius: 50px;
    background: rgb(255, 255, 255, 0.4);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &__input::placeholder {
    color: white;
  }
}

.category-filters {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: white;

  &__button {
    background-color: rgba(255, 255, 255, 0.4);
    color: var(--white);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    opacity: 0.9;

    &--active {
      background-color: var(--white);
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

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  &__name {
    font-size: 1rem;
    margin: 0;
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

/* Estilos para el botón de favoritos */
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  &.is-favorite svg path {
    fill: #ff6b6b;
  }

  &:not(.is-favorite) svg path {
    fill: #ccc;
  }

  svg {
    vertical-align: middle;
  }
}

/* Redesigned Cart Float Button */
.cart-float-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  padding: 12px 20px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s ease;
  color: white;
  min-width: 60px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    background-color: #2B7A78;
  }

  &--pulse {
    animation: pulse 1s 1;
  }
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__svg {
    color: white;
    stroke-width: 2px;
  }
}

.cart-float-total {
  margin-left: 15px;
  font-weight: 600;
  font-size: 1rem;
  white-space: nowrap;
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

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.small-cart-preview {
  position: fixed;
  bottom: 90px;
  right: 20px;
  max-width: 500px;
  z-index: 999;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
  max-height: calc(80vh - 90px);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: var(--primary-color);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: var(--white);
    position: sticky;
    top: 0;
  }

  &__content {
    padding: 1rem;
    overflow-y: auto;
    background-color: white;
    max-height: 20vh;
    flex-grow: 1;
    z-index: 9999;

    // Improved scrollbar styling
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--secondary-color);
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: 10px;
    }
  }

  &__item {
    .cart-item-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.75rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #eee;
      gap: 10px;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
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
        transition: background-color 0.2s;

        &:hover {
          background-color: #2B7A78;
        }
      }
    }

    .remove-item-button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.2rem;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__name {
    color: var(--text-dark);
    font-weight: bold;
    flex-grow: 1;
    padding-right: 0.5rem;
  }

  &__price {
    color: var(--primary-color);
    font-weight: bold;
  }

  &__footer {
    background-color: var(--secondary-color);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 1rem;
    position: sticky;
    bottom: 0;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 0.75rem;
    font-size: 1.1rem;
    color: var(--text-dark);
  }

  &__checkout {
    border: none;
    background: var(--primary-color);
    padding: 0.85rem;
    border-radius: 8px;
    margin: 10px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: white;

    &:hover {
      background-color: #2B7A78;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
    bottom: 80px;

    &__content {
      max-height: 35vh;
    }
  }

  .cart-float-button {
    width: calc(100% - 40px);
    justify-content: space-between;

    .cart-float-total {
      font-size: 1.1rem;
    }
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