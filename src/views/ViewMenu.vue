<template>
    <div class="menu">
        <FloatingDecor />
        <div class="menu__container">
            <!-- Barra de navegación SOLO en escritorio -->
            <nav class="menu__desktop-nav">
                <!-- Título a la izquierda -->
                <div class="menu__nav-left">
                    <h2 class="menu__title">View Our Menu</h2>
                </div>

                <!-- Categorías en el centro -->
                <ul class="menu__nav-list">
                    <li v-for="cat in categories" :key="cat" class="menu__nav-item" @click="selectCategory(cat)">
                        {{ cat }}
                    </li>
                </ul>

                <!-- Botón de búsqueda e input -->
                <div class="menu__search">
                    <button class="header__icon" aria-label="Search" @click="toggleSearch">
                        <font-awesome-icon :icon="['fas', 'search']" class="icon" />
                    </button>
                    <!-- Input visible solo si showSearch es true -->
                    <input v-if="showSearch" v-model="searchTerm" class="menu__search-input" type="text"
                        placeholder="Search..." @keyup.enter="searchTermEntered" />
                </div>
            </nav>

            <!-- Carrusel en móvil (oculto en desktop) -->
            <CategoryCarousel :categories="categories" :selectedCategory="selectedCategory.toString()"
                @update:category="selectCategory" />

            <!-- SECCIONES POR CATEGORÍA -->
            <div class="menu__categories">
                <!-- Appetizers -->
                <div v-if="(selectedCategory === 'All' || selectedCategory === 'Appetizers')
                    && appetizers.length > 0" class="menu__category">
                    <h2 class="menu__category-title">Appetizers</h2>
                    <div class="menu__cards-grid">
                        <ProductCard v-for="(item, index) in appetizers" :key="index" :image="item.image"
                            :price="item.price" :name="item.name" :description="item.description"
                            :rating="item.rating" />
                    </div>
                </div>

                <!-- Main Courses -->
                <div v-if="(selectedCategory === 'All' || selectedCategory === 'Main Courses')
                    && mainCourses.length > 0" class="menu__category">
                    <h2 class="menu__category-title">Main Courses</h2>
                    <div class="menu__cards-grid">
                        <ProductCard v-for="(item, index) in mainCourses" :key="index" :image="item.image"
                            :price="item.price" :name="item.name" :description="item.description"
                            :rating="item.rating" />
                    </div>
                </div>

                <!-- Drinks -->
                <div v-if="(selectedCategory === 'All' || selectedCategory === 'Drinks')
                    && drinks.length > 0" class="menu__category">
                    <h2 class="menu__category-title">Drinks</h2>
                    <div class="menu__cards-grid">
                        <ProductCard v-for="(item, index) in drinks" :key="index" :image="item.image"
                            :price="item.price" :name="item.name" :description="item.description"
                            :rating="item.rating" />
                    </div>
                </div>

                <!-- Dessert -->
                <div v-if="(selectedCategory === 'All' || selectedCategory === 'Dessert')
                    && dessert.length > 0" class="menu__category">
                    <h2 class="menu__category-title">Dessert</h2>
                    <div class="menu__cards-grid">
                        <ProductCard v-for="(item, index) in dessert" :key="index" :image="item.image"
                            :price="item.price" :name="item.name" :description="item.description"
                            :rating="item.rating" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import CategoryCarousel from '../components/CategoryCasousel.vue'
import ProductCard from '@/components/ProductCard.vue'
import FloatingDecor from '@/components/FloatingDecor.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const categories = ref(["All", "Appetizers", "Main Courses", "Drinks", "Dessert"])
const route = useRoute()
const selectedCategory = ref(route.query.category || categories.value[0])

const menuData = ref([
    // APPETIZERS
    { id: 1, category: "Appetizers", name: "Bruschetta", price: 8, image: "/src/assets/appetizers.jpg", description: "Grilled bread with tomato and basil.", rating: 4 },
    { id: 2, category: "Appetizers", name: "Fingers", price: 10, image: "/src/assets/Fingers.png", description: "Crispy finger food for snacking.", rating: 5 },
    { id: 3, category: "Appetizers", name: "Caprese Skewers", price: 7, image: "/src/assets/appetizers.jpg", description: "Tomato, mozzarella, and basil skewers.", rating: 4 },

    // MAIN COURSES
    { id: 4, category: "Main Courses", name: "Risotto ai Funghi", price: 24, image: "/src/assets/main-courses.jpg", description: "Creamy Arborio rice with mushrooms.", rating: 5 },
    { id: 5, category: "Main Courses", name: "Pasta Salad", price: 15, image: "/src/assets/EnsaladaPasta.png", description: "Light and refreshing pasta salad.", rating: 3 },
    { id: 6, category: "Main Courses", name: "Grilled Chicken", price: 18, image: "/src/assets/main-courses.jpg", description: "Tender chicken with herbs.", rating: 4 },

    // DRINKS
    { id: 7, category: "Drinks", name: "Citrus Cocktail", price: 8, image: "/src/assets/CoctelCitrico.png", description: "Tangy, zesty citrus cocktail.", rating: 4 },
    { id: 8, category: "Drinks", name: "Iced Tea", price: 5, image: "/src/assets/drinks.jpg", description: "Refreshing tea with lemon.", rating: 3 },
    { id: 9, category: "Drinks", name: "Smoothie", price: 6, image: "/src/assets/drinks.jpg", description: "Fruit blend smoothie.", rating: 5 },

    // DESSERT
    { id: 10, category: "Dessert", name: "Tiramisu", price: 12, image: "/src/assets/dessert.jpg", description: "Classic Italian dessert.", rating: 5 },
    { id: 11, category: "Dessert", name: "Waffle", price: 12, image: "/src/assets/Gofre.png", description: "Waffle with cream & berries.", rating: 4 },
    { id: 12, category: "Dessert", name: "Cheesecake", price: 10, image: "/src/assets/dessert.jpg", description: "Rich, creamy cheesecake.", rating: 5 },
])

// Para mostrar/ocultar el input de búsqueda
const showSearch = ref(false)
const searchTerm = ref("")

function toggleSearch() {
    showSearch.value = !showSearch.value
    if (!showSearch.value) {
        searchTerm.value = ""
    }
}

function searchTermEntered() {
    // Acción al pulsar Enter en el input
    console.log("Searching for:", searchTerm.value)
}

// Filtrar por categoría Y searchTerm (ahora solo por nombre)
const filteredData = computed(() => {
    // Primero filtra por categoría
    let base = (selectedCategory.value === "All")
        ? menuData.value
        : menuData.value.filter(item => item.category === selectedCategory.value)

    // Luego filtra por searchTerm (solo en el nombre del producto)
    if (searchTerm.value.trim()) {
        const term = searchTerm.value.toLowerCase()
        base = base.filter(item =>
            item.name.toLowerCase().includes(term)
        )
    }
    return base
})

// Computed por categoría
const appetizers = computed(() => filteredData.value.filter(i => i.category === "Appetizers"))
const mainCourses = computed(() => filteredData.value.filter(i => i.category === "Main Courses"))
const drinks = computed(() => filteredData.value.filter(i => i.category === "Drinks"))
const dessert = computed(() => filteredData.value.filter(i => i.category === "Dessert"))

function selectCategory(cat: string) {
    selectedCategory.value = cat
}
</script>

<style lang="scss" scoped>
.menu {
    padding: 16px;

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
    }

    &__desktop-nav {
        display: none;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        .menu__title {
            font-size: 2.5rem;
            margin: 0;
            color: #093035;
        }

        .menu__nav-list {
            list-style: none;
            display: flex;
            gap: 1.5rem;
            margin: 0;
            padding: 0;

            .menu__nav-item {
                cursor: pointer;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 1.2rem;
                color: #d3b486;
                transition: color 0.3s;

                &:hover {
                    color: #bf9a22;
                }
            }
        }

        .menu__search {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            .header__icon {
                background: transparent;
                border: none;
                cursor: pointer;
                font-size: 1.5rem;
                color: #093035;
            }

            .menu__search-input {
                width: 160px;
                padding: 0.4rem 0.8rem;
                border: 2px solid #d3b486;
                border-radius: 20px;
                font-size: 1rem;
                background: #fff;
                color: #093035;
                transition: border 0.3s;

                &:focus {
                    outline: none;
                    border-color: #bf9a22;
                }
            }
        }
    }

    &__categories {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    &__category-title {
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #d3b486;
    }

    &__cards-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}


/* En escritorio (≥ 992px):
     - Oculta carrusel
     - Muestra nav
     - 3 col ~300px centradas
  */
@media (min-width: 992px) {
    .category-carousel {
        display: none;
    }

    .menu__desktop-nav {
        display: flex;
    }

    .menu__cards-grid {
        grid-template-columns: repeat(3, 300px);
        justify-content: center;
    }
}
</style>