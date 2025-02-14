<template>
    <div class="menu">
        <CategoryCarousel :categories="categories" :selectedCategory="selectedCategory.toString()"
            @update:category="selectCategory" />
        <div class="menu__content">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :image="product.image"
                :price="product.price" :name="product.name" :description="product.description"
                :rating="product.rating" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CategoryCarousel from '../components/CategoryCasousel.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useRoute } from 'vue-router';

const categories = ref(["All", "Appetizers", "Main Courses", "Drinks", "Dessert"]);
const route = useRoute();
const selectedCategory = ref(route.query.category || categories.value[0]);

const menuData = ref([
    { id: 1, category: "Appetizers", name: "Fingers", price: 10, image: "src/assets/Fingers.png", description: "Deliciously crispy finger food, perfect for snacking and sharing.", rating: 4 },

    { id: 2, category: "Main Courses", name: "Pasta Salad with Cherry Tomatoes", price: 15, image: "src/assets/EnsaladaPasta.png", description: "A light and refreshing pasta salad with juicy cherry tomatoes and a flavorful dressing.", rating: 3 },

    { id: 3, category: "Drinks", name: "Citrus Cocktail", price: 8, image: "src/assets/CoctelCitrico.png", description: "A zesty and invigorating citrus cocktail, bursting with tangy flavors.", rating: 4 },

    { id: 4, category: "Dessert", name: "Waffle with Whipped Cream, Blueberries, and Caramel Syrup", price: 12, image: "src/assets/Gofre.png", description: "A warm, golden waffle topped with fluffy whipped cream, fresh blueberries, and drizzled with rich caramel syrup.", rating: 5 }

]);

const filteredProducts = computed(() => {
    return selectedCategory.value === "All"
        ? menuData.value
        : menuData.value.filter(product => product.category === selectedCategory.value);
});

const selectCategory = (category: string) => {
    selectedCategory.value = category;
};
</script>

<style lang="scss" scoped>
.menu {
    padding: 16px;

    &__content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
        margin-top: 16px;
    }
}
</style>