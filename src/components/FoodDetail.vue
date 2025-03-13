<template>
    <div class="food-detail">
      <div class="food-detail__header">
        <h2 class="food-detail__title">Buon Appetito!</h2>
      </div>
  
      <div class="food-detail__content">
        <div class="food-detail__image">
          <img src="https://cdn.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4.jpg" alt="Risotto Ai Funghi" />
        </div>
  
        <div class="food-detail__info">
          <h3 class="food-detail__name">Tortilla Ai Patati</h3>
          <p class="food-detail__price">$24</p>
  
          <div class="food-detail__rating">
            <span>⭐⭐⭐⭐⭐</span>
          </div>
  
          <p class="food-detail__description">
            tortilla de patata tortilla de patata  tortilla de patata tortilla de patata  tortilla de patata tortilla de patata  tortilla de patata tortilla de patata  tortilla de patata tortilla de patata .
          </p>
  
          <div class="food-detail__quantity">
            <button class="food-detail__quantity-btn">-</button>
            <span class="food-detail__quantity-value">1</span>
            <button class="food-detail__quantity-btn">+</button>
          </div>
  
          <button class="food-detail__order-btn">Order Now</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FoodDetail',
    props: {
      imageUrl: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  });
  </script>
  
  <style lang="scss" scoped>
  .food-detail {
    &__header {
      text-align: center;
      margin-bottom: 1rem;
      font-family: 'Cursive';
      font-size: 1.8rem;
      color: #a0522d;
    }
  
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
  
      @media (min-width: 768px) {
        flex-direction: row;
      }
    }
  
    &__image {
      margin-bottom: 1rem;
      img {
        max-width: 100%;
        border-radius: 8px;
      }
    }
  
    &__info {
      text-align: center;
  
      @media (min-width: 768px) {
        text-align: left;
        margin-left: 2rem;
      }
    }
  
    &__name {
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    &__price {
      font-size: 1.2rem;
      color: #006400;
    }
  
    &__rating {
      font-size: 1rem;
      margin: 0.5rem 0;
    }
  
    &__description {
      margin-bottom: 1rem;
      font-size: 1rem;
      line-height: 1.5;
    }
  
    &__quantity {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
  
      &-btn {
        background-color: #dcdcdc;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
  
        &:hover {
          background-color: #a9a9a9;
        }
      }
  
      &-value {
        margin: 0 1rem;
        font-size: 1.2rem;
      }
    }
  
    &__order-btn {
      background-color: #006400;
      color: #fff;
      border: none;
      padding: 0.7rem 1.5rem;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 4px;
  
      &:hover {
        background-color: #228b22;
      }
    }
  }
  </style>
  