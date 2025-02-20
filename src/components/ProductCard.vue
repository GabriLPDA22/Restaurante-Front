<template>
    <div class="product-card" :class="{ 'product-card--flipped': isFlipped }">
        <!-- Contenedor que maneja la perspectiva 3D -->
        <div class="product-card__inner">
            <!-- Cara frontal -->
            <div class="product-card__face product-card__face--front">
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
                        <font-awesome-icon :icon="['fas', 'bell']" class="product-card__icon" />
                        <font-awesome-icon :icon="['fas', 'heart']" class="product-card__icon"
                            :class="{ 'product-card__icon--active': isFavorite }" @click="toggleFavorite" />
                    </div>
                    <div class="product-card__rating">
                        <font-awesome-icon v-for="n in rating" :key="n" :icon="['fas', 'star']"
                            class="star star--active" />
                    </div>
                    <div class="product-card__bottom">
                        <button class="product-card__button" @click="flipCard">Details</button>
                    </div>
                </div>
            </div>

            <!-- Cara trasera -->
            <div class="product-card__face product-card__face--back">
                <h3 class="product-card__title">{{ name }}</h3>
                <p>
                    Aquí iría una descripción más larga del producto,
                    ingredientes, recomendaciones, etc.
                </p>
                <div class="allergens">
                    <h4>Alérgenos</h4>
                    <div class="allergen-list">
                        <!-- Ejemplo: podrías tener un array "allergens" con iconos -->
                        <div class="allergen-item">
                            <img src="../assets/gluten.svg" alt="Gluten" />
                            <span>Gluten</span>
                        </div>
                        <div class="allergen-item">
                            <img src="../assets/peanuts.svg" alt="Cacahuetes" />
                            <span>Cacahuetes</span>
                        </div>
                        <!-- Agrega más según necesites -->
                    </div>
                </div>
                <button class="product-card__button" @click="flipCard">
                    Volver
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Definimos las props que recibe la tarjeta
const props = defineProps<{
    image: string;
    price: number;
    name: string;
    description: string;
    rating: number;
}>();

// Estado del favorito
const isFavorite = ref(false);
const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};

// Estado para el flip
const isFlipped = ref(false);
const flipCard = () => {
    isFlipped.value = !isFlipped.value;
};
</script>

<style lang="scss" scoped>
.product-card {
    width: 300px; // Ajusta el tamaño que quieras
    height: 420px; // Ajusta el tamaño que quieras
    perspective: 1000px; // Para el efecto 3D
    position: relative; // Ayuda a posicionar las caras

    &__inner {
        width: 100%;
        height: 100%;
        transition: transform 0.6s;
        transform-style: preserve-3d; // Necesario para 3D
        position: relative;
    }

    // Si la tarjeta está "flipped", rota 180º
    &--flipped &__inner {
        transform: rotateY(180deg);
    }

    &__face {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden; // Impide que se vea la cara trasera
        top: 0;
        left: 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__face--front {
        background-color: #fef3c7;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 16px;
        // Si tenías animación de hover, ojo con "transform: scale()" aquí,
        // puede chocar con el flip. Mejor deshabilitarlo por ahora:
        // &:hover {
        //   transform: scale(1.05);
        // }
    }

    &__face--back {
        background-color: #fffbe0;
        transform: rotateY(180deg); // Oculta la cara trasera por defecto
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 16px;
    }

    &__image {
        position: relative;
        width: 100%;
        height: 200px;
        border-radius: 12px;
        overflow: hidden;

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
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 16px;
    }

    &__title {
        font-size: 20px;
        font-weight: bold;
        color: #2d2d2d;
        margin-bottom: 10px;
    }

    &__description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        min-height: 60px;
        max-height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    &__bottom {
        margin-top: auto;
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

/* Ejemplo de estilos para la sección de alérgenos */
.allergens {
    margin-top: 20px;
    margin-bottom: 20px;

    h4 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    .allergen-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;

        .allergen-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 70px;

            img {
                width: 40px;
                height: 40px;
            }

            span {
                margin-top: 4px;
                font-size: 14px;
            }
        }
    }
}
</style>