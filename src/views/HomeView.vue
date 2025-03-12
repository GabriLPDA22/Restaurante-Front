<script setup lang="ts">
import { useRouter } from 'vue-router';
import MenuCard from "@/components/MenuCard.vue";
import ChefRecommendation from "@/components/ChefRecommendation.vue";

const router = useRouter();
const menuItems = [
  { title: "Appetizers", image: "/src/assets/products/3_Aperitivo_pane-3-bastoni.jpg", mappedCategory: "Aperitivos" },
  { title: "Main Courses", image: "/src/assets/products/2_Main_lomo-cosenza.jpg", mappedCategory: "Plato Principal" },
  { title: "Pasta", image: "/src/assets/products/1_Pasta_Ripiena_Mezzaluna.jpg", mappedCategory: "Pasta" },
  { title: "Dessert", image: "/src/assets/products/4_Dessert_di-carote.jpg", mappedCategory: "Postre" },
];
const chefSpecial = {
  title: "Risotto ai Funghi",
  description:
    "Creamy Arborio rice infused with a medley of wild mushrooms, Parmesan cheese, and a hint of truffle oil. This exquisite dish promises a symphony of flavors, meticulously crafted to elevate your dining experience. Immerse yourself in the taste of Italy, one delightful spoonful at a time.",
  price: "$24",
  image: "/chef-special.png",
};

const navigateToCategory = (title: string, mappedCategory: string) => {
  router.push({
    path: '/cart',
    query: { selectedCategory: mappedCategory }
  });

  window.scrollTo(0, 0);
};
</script>

<template>
  <main class="home-view">
    <!-- Sección Hero -->
    <section class="home-view__hero">
      <!-- Texto arriba -->
      <div class="home-view__hero-texts">
        <p class="home-view__hero-subtitle">FRESH INGREDIENTS SOURCED GLOBALLY</p>
        <h1 class="home-view__hero-title">ITALIAN INSPIRED CUISINE</h1>
      </div>

      <!-- Botones debajo -->
      <div class="home-view__hero-actions">
        <router-link to="/reservation" class="home-view__hero-btn home-view__hero-btn--reserve"
          style="text-decoration: none;">
          RESERVE NOW
        </router-link>
        <router-link to="/contact" class="home-view__hero-btn home-view__hero-btn--contact"
          style="text-decoration: none;">
          CONTACT US
        </router-link>
      </div>
    </section>

    <!-- Sección Menú -->
    <section class="menu-section">
      <h2 class="menu-section__title">View Our Menu</h2>
      <div class="menu-section__grid">
        <MenuCard v-for="item in menuItems" :key="item.title" :title="item.title" :image="item.image"
          @click="navigateToCategory(item.title, item.mappedCategory)" />
      </div>
    </section>

    <!-- Recomendación del Chef -->
    <div id="chef-special">
      <ChefRecommendation :title="chefSpecial.title" :description="chefSpecial.description" :price="chefSpecial.price"
        :image="chefSpecial.image" />
    </div>
  </main>
</template>

<style lang="scss" scoped>
// =======================
// Variables de ejemplo
// =======================
$color-white: #fff;
$color-gold: #d3b486;
$color-dark: #093035;
$color-gold-hover: #af8c3a;

.home-view {
  overflow: visible;

  .home-view__hero {
    position: relative;
    background: url('/public/hero-background.jpg') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 5vh 5vw;
    text-align: center;
    color: $color-white;
    padding-top: 10vh;
  }

  .home-view__hero-texts {
    margin-bottom: 2vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }


  &__hero-subtitle {
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  &__hero-title {
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
    color: $color-gold;
    line-height: 1.2;
    max-width: 600px;
    margin: 0 auto;
  }

  &__hero-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3vh;
    align-items: center;
  }

  &__hero-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    text-align: center;
    display: inline-block;

    &--reserve {
      background-color: $color-gold;
      color: $color-dark;
      transition: background-color 0.3s;

      &:hover {
        background-color: $color-gold-hover;
      }
    }

    &--contact {
      background-color: transparent;
      color: $color-white;
      border: 2px solid $color-white;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: $color-white;
        color: $color-dark;
      }
    }
  }
}

// =======================
// Menu Section
// =======================
.menu-section {
  text-align: center;
  background: #000;
  padding-top: 40px;

  &__title {
    color: $color-gold;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    gap: 20px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

// =======================
// Breakpoints
// =======================
@media (min-width: 768px) {
  .home-view__hero-subtitle {
    font-size: 3.5rem;
  }

  .home-view__hero-title {
    font-size: 5rem;
    max-width: 800px;
  }

  .home-view__hero-btn {
    font-size: 2.1rem;

  }

  .home-view__hero-actions {
    flex-direction: row;
    margin-top: 30%;
  }


}

@media (min-width: 992px) {
  .home-view__hero {
    mask-image: linear-gradient(black 100%, transparent);
    background: url('/public/hero-background.jpg') no-repeat center;
    background-position: center top;
    background-position: center 20%;
  }
}
</style>