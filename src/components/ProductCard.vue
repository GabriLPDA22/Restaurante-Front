<template>
    <div class="product-card">
        <div class="product-card__image">
            <img :src="image" :alt="name" />
            <div class="product-card__price">${{ price }}</div>
        </div>
        <div class="product-card__content">
            <h3 class="product-card__title">{{ name }}</h3>
            <p class="product-card__description">
                {{ description }}
            </p>
            <div class="product-card__icons">
                <transition name="icon-animation">
                    <font-awesome-icon :icon="['fas', 'bell']" class="product-card__icon"
                        :class="{ 'product-card__icon--active': isNotificationClicked }" @click="toggleNotification" />
                </transition>
                <font-awesome-icon :icon="['fas', 'heart']" class="product-card__icon"
                    :class="{ 'product-card__icon--active': isFavorite }" @click="toggleFavorite" />
            </div>
            <div class="product-card__rating">
                <font-awesome-icon v-for="n in rating" :key="n" :icon="['fas', 'star']" class="star star--active" />
            </div>
            <button class="product-card__button">ORDER NOW</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps<{
    image: string;
    price: number;
    name: string;
    description: string;
    rating: number;
}>();

const isFavorite = ref(false);
const isNotificationClicked = ref(false);
const isClicked = ref(false);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};
const toggleNotification = () => {
    isNotificationClicked.value = !isNotificationClicked.value;
};
const handleClick = () => {
    isClicked.value = true;
};
</script>


<style lang="scss" scoped>
.product-card {
    background: #fef3c7;
    border-radius: 12px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column; // Distribuye el contenido verticalmente
    justify-content: space-between; // Asegura que los elementos se distribuyan bien
    height: 100%; // Todas las tarjetas tendrán la misma altura

    &:hover {
        transform: scale(1.05);
    }

    &__image {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        width: 100%;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 12px;
        }
    }

    &__price {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #064e3b;
        color: #fff;
        padding: 6px 10px;
        border-radius: 50px;
        font-weight: bold;
        font-size: 14px;
    }

    &__content {
        flex-grow: 1; // Permite que la descripción ocupe espacio sin empujar los otros elementos
        display: flex;
        flex-direction: column;
        justify-content: space-between; // Mantiene el botón e íconos en la parte inferior
        padding: 16px;
    }

    &__title {
        font-size: 20px;
        font-weight: bold;
        color: #2d2d2d;
    }

    &__description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        min-height: 60px; // Asegura que todas las descripciones tengan la misma altura mínima
        max-height: 80px; // Evita que las descripciones sean demasiado largas
        overflow: hidden; // Oculta el texto que exceda la altura máxima
        text-overflow: ellipsis; // Muestra "..." si el texto es muy largo
        display: -webkit-box;
        -webkit-line-clamp: 3; // Limita la descripción a 3 líneas
        -webkit-box-orient: vertical;
    }

    &__bottom {
        margin-top: auto; // Empuja estos elementos a la parte inferior
        padding-top: 10px;
    }

    &__icons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    &__icon {
        font-size: 20px;
        cursor: pointer;
        transition: color 0.3s;

        &--active {
            color: red;
        }
    }

    &__rating {
        display: flex;
        justify-content: center;
        gap: 4px;
        margin-bottom: 10px;

        .star {
            font-size: 18px;
            color: #facc15;
        }
    }

    &__button {
        background: #064e3b;
        color: white;
        padding: 12px;
        width: 100%;
        border: none;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s;

        &:hover {
            background: #043d2a;
        }
    }
}
</style>
