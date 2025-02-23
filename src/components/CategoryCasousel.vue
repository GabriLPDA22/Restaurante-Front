<template>
    <div class="category-carousel">
        <button class="category-carousel__btn category-carousel__btn--left" @click="scrollLeft">&#8249;</button>
        <div class="category-carousel__wrapper" ref="carousel">
            <span v-for="category in categories" :key="category"
                :class="['category-carousel__item', { 'category-carousel__item--active': category === selectedCategory }]"
                @click="$emit('update:category', category)">
                {{ category }}
            </span>
        </div>
        <button class="category-carousel__btn category-carousel__btn--right" @click="scrollRight">&#8250;</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    categories: string[];
    selectedCategory: string;
}>();

const carousel = ref<HTMLElement | null>(null);

const scrollLeft = () => {
    if (carousel.value) {
        carousel.value.scrollBy({ left: -100, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (carousel.value) {
        carousel.value.scrollBy({ left: 100, behavior: 'smooth' });
    }
};
</script>

<style lang="scss" scoped>
.category-carousel {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 8px 0;

    &__wrapper {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        white-space: nowrap;
        gap: 16px;
        flex: 1;
    }

    &__item {
        font-size: 16px;
        font-weight: bold;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 20px;
        background: #f0f0f0;
        transition: 0.3s;
        flex: none;

        &--active {
            background: #064e3b;
            color: white;
        }
    }

    &__btn {
        background: transparent;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;

        &--left {
            margin-right: 8px;
        }

        &--right {
            margin-left: 8px;
        }
    }
}

/* Ocultar carrusel en desktop (≥ 992px) */
@media (min-width: 992px) {
    .category-carousel {
        display: none;
    }
}
</style>
