<script setup lang="ts">
import MenuCard from "@/components/MenuCard.vue";
import ChefRecommendation from "@/components/ChefRecommendation.vue";

const menuItems = [
  { title: "Appetizers", image: "/src/assets/appetizers.jpg" },
  { title: "Main Courses", image: "/src/assets/main-courses.jpg" },
  { title: "Drinks", image: "/src/assets/drinks.jpg" },
  { title: "Dessert", image: "/src/assets/dessert.jpg" },
];

const chefSpecial = {
  title: "Risotto ai Funghi",
  description:
    "Creamy Arborio rice infused with a medley of wild mushrooms, Parmesan cheese, and a hint of truffle oil...",
  price: "$24",
  image: "/src/assets/chef-special.png",
};
</script>

<template>
  <main class="home-view">
    <section class="home-view__hero">
      <div class="home-view__content">
        <p class="home-view__tagline">Fresh Ingredients Sourced Globally</p>
        <h1 class="home-view__title">ITALIAN INSPIRED CUISINE</h1>
      </div>
      <div class="home-view__actions">
        <button class="home-view__button home-view__button--reserve">Reserve Now</button>
        <button class="home-view__button home-view__button--contact">Contact Us</button>
      </div>
    </section>

    <section class="menu-section">
      <h2 class="menu-section__title">View Our Menu</h2>
      <div class="menu-section__grid">
        <MenuCard v-for="item in menuItems" :key="item.title" :title="item.title" :image="item.image" />
      </div>
    </section>

    <ChefRecommendation :title="chefSpecial.title" :description="chefSpecial.description" :price="chefSpecial.price"
      :image="chefSpecial.image" />
  </main>
</template>

<style lang="scss" scoped>
.home-view {
  &__hero {
    background: url('/src/assets/hero-background.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10vh 5vw;
    min-height: 100vh;
    color: #f9efe6;
    text-align: center;

    @media (min-width: 768px) {
      padding: 13vh 10vw;
    }
  }

  &__content {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 8vh;

    @media (min-width: 768px) {
      max-width: 600px;
    }
  }

  &__tagline {
    font-size: 4vw;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 1vh;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__title {
    font-size: 8vw;
    font-weight: 700;
    text-transform: uppercase;
    color: #d3b486;
    line-height: 1.1;
    margin-bottom: 6vh;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    gap: 24px;
    margin-top: 10vh;

    @media (min-width: 768px) {
      flex-direction: row;
      max-width: 100%;
      justify-content: center;
    }
  }

  &__button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;

    &--reserve {
      background-color: #d3b486;
      color: #093035;
      transition: background-color 0.3s;

      &:hover {
        background-color: #bf9a22;
      }
    }

    &--contact {
      background-color: transparent;
      color: #fff;
      border: 2px solid #fff;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #fff;
        color: #093035;
      }
    }
  }
}

.menu-section {
  text-align: center;
  padding: 40px 16px;
  background: #000;

  &__title {
    color: #d3b486;
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-content: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .chef-section {
    text-align: center;
    padding: 60px 20px;
    background: #000;

    &__title {
      color: #d3b486;
      font-size: 2rem;
      margin-bottom: 20px;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: left;
    }
  }

}
</style>