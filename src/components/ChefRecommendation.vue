<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  price: String,
  image: String,
});
</script>

<template>
  <section class="chef-recommendation">
    <h2 class="chef-recommendation__title">Today's <br /> Chef-Recommended <br /> Delight</h2>
    <div class="chef-recommendation__content">
      
      <div class="chef-recommendation__details">
        <div class="chef-recommendation__header">
          <h3 class="chef-recommendation__dish">{{ title }}</h3>
          <span class="chef-recommendation__price">{{ price }}</span>
        </div>
        <div class="chef-recommendation__rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
        <p class="chef-recommendation__description">{{ description }}</p>
        <p class="chef-recommendation__signature">Buon Appetito!</p>
        <div class="chef-recommendation__actions">
          <button class="chef-recommendation__button chef-recommendation__button--buy">Buy Now</button>
          <button class="chef-recommendation__button chef-recommendation__button--learn">Learn More</button>
        </div>
      </div>
      <img :src="image" :alt="title" class="chef-recommendation__image" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chef-recommendation {
  background: #000;
  color: #f9efe6;
  text-align: center;
  padding: 40px 20px;

  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #d3b486;
    margin-bottom: 20px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media (min-width: 768px) {
      flex-direction: row;
      justify-content: center;
    }
  }

  &__image {
    max-width: 250px;
    height: auto;
    object-fit: contain;
  }

  &__details {
    max-width: 400px;
    text-align: left;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__dish {
    font-size: 1.5rem;
    font-weight: 700;
    color: #d3b486;
  }

  &__price {
    font-size: 1.3rem;
    font-weight: bold;
    color: #d3b486;
  }

  &__rating {
    margin: 10px 0;
  }

  &__description {
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  &__signature {
    font-family: "Reey", cursive;
    font-size: 1rem;
    font-weight: 400;
    color: #d3b486;
    margin-bottom: 20px;
  }

  &__actions {
    display: flex;
    gap: 15px;
  }

  &__button {
    padding: 10px 20px;
    font-size: 14px;
    border: 2px solid #d3b486;
    border-radius: 25px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    background: transparent;
    color: #d3b486;

    &--buy {
      background-color: #d3b486;
      color: #000;

      &:hover {
        background-color: #bf9a22;
      }
    }
  }
}
</style>