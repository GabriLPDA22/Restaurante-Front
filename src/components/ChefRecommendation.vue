<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  title: string;
  description: string;
  price: string;
  image: string;
}>();
</script>

<template>
  <section class="chef-rec">
    <!-- Encabezado de la sección -->
    <h2 class="chef-rec__heading">Today's Chef-Recommended Delight</h2>

    <div class="chef-rec__content">
      <!-- BLOQUE TEXTO -->
      <div class="chef-rec__text">
        <!-- Plato y precio -->
        <h3 class="chef-rec__dish-title">{{ title }}</h3>
        <div class="chef-rec__rating-price">

          <div class="chef-rec__stars">
            <span class="chef-rec__star">★</span>
            <span class="chef-rec__star">★</span>
            <span class="chef-rec__star">★</span>
            <span class="chef-rec__star">★</span>
            <span class="chef-rec__star">★</span>
          </div>
          <p class="chef-rec__price">{{ price }}</p>
        </div>

        <p class="chef-rec__description">
          {{ description }}
        </p>

        <!-- Firma -->
        <p class="chef-rec__signature">Buon Appetito!</p>

        <!-- Botones CTA -->
        <div class="chef-rec__buttons">
          <button class="chef-rec__btn chef-rec__btn--buy">BUY NOW</button>
          <button class="chef-rec__btn chef-rec__btn--learn">LEARN MORE</button>
        </div>
      </div>

      <!-- IMAGEN DE LA CHEF -->
      <div class="chef-rec__image-container">
        <img :src="image" alt="Chef recommended" class="chef-rec__image" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// ==========================
// Variables de color/tamaño
// ==========================
$color-bg: #000;
$color-gold: #d3b486;
$color-white: #eaeaea;
$color-dark: #093035;
$color-gold-hover: #af8c3a;

// ===============
// MOBILE-FIRST
// ===============
.chef-rec {
  background-color: $color-bg;
  color: $color-white;
  padding: 2rem 1rem;

  &__heading {
    font-size: 3.2rem;
    color: $color-gold;
    margin-bottom: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  &__content {
    display: flex;
    flex-direction: column; // En móvil, apilado
    align-items: center;
    gap: 2rem;
  }

  &__text {
    max-width: 600px;
    text-align: center;
  }

  &__dish-title {
    font-size: 1.8rem;
    color: $color-gold;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  &__price {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: $color-gold;
  }

  &__stars {
    margin-bottom: 1rem;

    .chef-rec__star {
      color: #f9c74f;
      font-size: 1.1rem;
      margin-right: 0.2rem;
    }
  }

  &__description {
    line-height: 1.5;
    margin-bottom: 1.2rem;
  }

  &__signature {
    font-family: 'Lucida Handwriting', cursive, sans-serif;
    /* O la que desees */
    font-size: 1.1rem;
    color: $color-gold;
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  &__buttons {
    display: flex;
    justify-content: center; // Centrado en móvil
    gap: 1rem;
  }

  &__btn {
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    font-size: 0.9rem;
    text-transform: uppercase;
    transition: all 0.3s;

    &--buy {
      background-color: $color-gold;
      color: $color-dark;

      &:hover {
        background-color: $color-gold-hover;
      }
    }

    &--learn {
      background-color: transparent;
      color: $color-white;
      border: 2px solid $color-white;

      &:hover {
        background-color: $color-white;
        color: $color-dark;
      }
    }
  }

  // Imagen de la chef (en móvil 300px)
  &__image-container {
    max-width: 300px;
    text-align: center;
  }

  &__image {
    width: 100%;
    display: block;
  }
}

// =======================
// DESKTOP (≥ 992px)
// =======================
@media (min-width: 992px) {
  .chef-rec__heading {
    font-size: 3.2rem;
    text-align: center;
    margin-bottom: 2.5rem;
  }

  .chef-rec__buttons {
    justify-content: left;
  }

  .chef-rec__content {
    max-width: 1200px;
    margin: 0 auto; // Centra el contenedor
    flex-direction: row; // Texto izq, chef der
    align-items: center;
    justify-content: space-between;
  }

  .chef-rec__text {
    text-align: left;
    flex: 1 1 auto;
    margin-right: 2rem;
    max-width: 700px;
  }

  .chef-rec__dish-title {
    font-size: 2.2rem;
  }

  .chef-rec__price {
    font-size: 2.1rem;
  }

  .chef-rec__rating-price {
    display: flex;
    font-size: 2.1rem;
    justify-content: space-between;
  }

  .chef-rec__image-container {
    max-width: 450px; // Imagen más grande en escritorio
  } .chef-rec__image{
    mask-image: linear-gradient(black 80%, transparent);
  }
  .chef-rec__stars{
    margin-bottom: 1.5rem;

    .chef-rec__star {
      font-size: 2.1rem;
    }
  }

  .chef-rec__description {
    font-size: 1.2rem;
    line-height: 1.6;
  }
}
</style>