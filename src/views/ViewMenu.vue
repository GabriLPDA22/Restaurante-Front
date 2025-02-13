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
    { id: 1, category: "Appetizers", name: "Bruschetta", price: 12, image: "image1.png", description: "Delicious Italian starter", rating: 5 },
    { id: 2, category: "Main Courses", name: "Pasta Carbonara", price: 18, image: "image2.png", description: "Classic creamy pasta", rating: 4 },
    { id: 3, category: "Drinks", name: "Mojito", price: 10, image: "image3.png", description: "Refreshing mint cocktail", rating: 5 },
    { id: 4, category: "Dessert", name: "Tiramisu", price: 8, image: "image4.png", description: "Sweet Italian dessert", rating: 5 }
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