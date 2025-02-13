<template>
    <div class="product-card">
        <div class="product-card__image">
            <img src="@/assets/RisottoaiFunghi.png" alt="Risotto ai Funghi" />
            <div class="product-card__price">$24</div>
        </div>
        <div class="product-card__content">
            <h3 class="product-card__title">Risotto ai Funghi</h3>
            <p class="product-card__description">
                Creamy Arborio rice infused with a medley of wild mushrooms, Parmesan cheese, and a hint of truffle oil.
            </p>
            <div class="product-card__icons">
                <font-awesome-icon icon="fa-solid fa-info-circle" class="product-card__icon" @click="showInfo" />
                <font-awesome-icon icon="fa-solid fa-heart" class="product-card__icon"
                    :class="{ 'product-card__icon--active': isFavorite }" @click="toggleFavorite" />
            </div>
            <div class="product-card__rating">
                <font-awesome-icon v-for="n in 5" :key="n" icon="fa-solid fa-star" class="star star--active" />
            </div>
            <button class="product-card__button">ORDER NOW</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const isFavorite = ref(false);

const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
};

const showInfo = () => {
    alert("Información sobre: Risotto ai Funghi");
};
</script>

<style lang="scss" scoped>
.product-card {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    &__image {
        position: relative;

        img {
            width: 100%;
            border-radius: 12px;
        }
    }

    &__price {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #064e3b;
        color: #fff;
        padding: 8px;
        border-radius: 50px;
        font-weight: bold;
    }

    &__content {
        padding: 16px;
    }

    &__title {
        font-size: 18px;
        font-weight: bold;
    }

    &__description {
        font-size: 14px;
        color: #666;
    }

    &__icons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin: 10px 0;
    }

    &__icon {
        font-size: 18px;
        cursor: pointer;
        transition: color 0.3s;

        &--active {
            color: red;
        }
    }

    &__rating {
        .star {
            font-size: 20px;
            color: #facc15;
        }
    }

    &__button {
        background: #064e3b;
        color: white;
        padding: 12px;
        width: 100%;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background: #043d2a;
        }
    }
}
</style>