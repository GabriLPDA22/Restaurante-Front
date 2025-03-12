<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="footer__logo">
        <router-link to="/" aria-label="Go to homepage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet"
            style="width:200px;">
            <text x="50%" y="50%" text-anchor="middle"
              style="font-family: 'Poppins', sans-serif; font-size:60px; fill:#d1a75f; font-weight:700;">
              ELIXIUM FOODS
            </text>
            <text x="50%" y="75%" text-anchor="middle"
              style="font-family: 'Poppins', sans-serif; font-size:40px; fill:#eaeaea;">
              RESTAURANT
            </text>
          </svg>
        </router-link>
      </div>


      <!-- Navigation (desktop only) -->
      <nav class="footer__nav">
        <ul class="footer__nav-list">
          <li class="footer__nav-item">
            <router-link to="/cart" class="footer__nav-link">Menu</router-link>
          </li>
          <li class="footer__nav-item">
            <a class="footer__nav-link">Events</a>
          </li>
          <li class="footer__nav-item">
            <router-link to="/about" class="footer__nav-link">About Us</router-link>
          </li>
          <li class="footer__nav-item">
            <router-link to="/reservation" class="footer__nav-link">Reservation</router-link>
          </li>
          <li class="footer__nav-item">
            <router-link to="/cart" class="footer__nav-link">Order</router-link>
          </li>
          <li class="footer__nav-item">
            <router-link to="/contact" class="footer__nav-link">Contact Us</router-link>
          </li>
        </ul>
      </nav>

      <!-- Description -->
      <p class="footer__description">
        Lorem ipsum dolor sit amet consectetur. Sagittis mattis mauris at condimentum arcu eget.
        Sed posuere cursus pharetra tortor eu purus rhoncus lectus. Enim ut ligula sit nec donec.
        Hendrerit in.
      </p>

      <!-- Hours -->
      <p class="footer__hours">
        MONDAY – SUNDAY: 9:00AM – 12PM
      </p>

      <!-- Buttons -->
      <div class="footer__actions">
        <router-link to="/reservation" class="footer__button footer__button--reserve"
          style="text-decoration: none;">Reserve
          Now</router-link>
        <router-link to="/contact" class="footer__button footer__button--contact" style="text-decoration: none;">
          Contact Us
        </router-link>
      </div>

      <!-- Social media -->
      <div class="footer__social">
        <a href="https://www.facebook.com" class="footer__social-icon">
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
        <a href="https://www.instagram.com" class="footer__social-icon">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
      </div>
    </div>

    <!-- Bottom part (copyright) -->
    <div class="footer__bottom">
      <p class="footer__copyright">
        COPYRIGHT 2025
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: 'FooterComponent',
  components: {
    FontAwesomeIcon
  }
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 3rem 2rem;
  background-color: #032b31;
  color: #f3d2a4;
  text-align: center;
  font-family: 'Arial', sans-serif;

  &__top {
    margin-bottom: 2.5rem;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: bold;
  }

  &__logo {
    margin-bottom: 1.5rem;
  }

  &__subtitle {
    font-size: 1.2rem;
    letter-spacing: 0.2rem;
    margin-bottom: 1.5rem;
  }

  &__description {
    margin-bottom: 2rem;
    font-size: 1rem;
    line-height: 1.6;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  &__hours {
    margin-bottom: 2rem;
    font-size: 1rem;
    font-weight: bold;
  }

  /* Nav visible solo en escritorio */
  &__nav {
    display: none;
    /* Oculto en mobile */
    margin-bottom: 2rem;

    &-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 2rem;
      justify-content: center;
    }

    &-link {
      color: #f3d2a4;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      transition: color 0.3s;

      &:hover {
        color: #ffad33;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
  }

  &__button {
    border: none;
    padding: 0.7rem 1.3rem;
    border-radius: 2rem;
    font-size: 1rem;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;

    &--reserve {
      background-color: #f3d2a4;
      /* Dorado */
      color: #032b31;

      /* Verde oscuro */
      &:hover {
        background-color: #ffad33;
      }
    }

    &--contact {
      background-color: transparent;
      color: #f3d2a4;
      border: 2px solid #f3d2a4;

      &:hover {
        background-color: #ffad33;
        color: #032b31;
      }
    }
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;

    &-icon {
      font-size: 1.8rem;
      color: #BF9A22;
      transition: color 0.3s ease-in-out, transform 0.2s ease-in-out;

      &:hover {
        color: #ffad33;
        transform: scale(1.1);
      }
    }
  }

  /* Copyright */
  &__copyright {
    margin-top: 2.5rem;
    font-size: 0.875rem;
    letter-spacing: 0.05rem;
  }
}

/* Estilos escritorio (≥ 1024px): mostramos nav y agrandamos botones */
@media (min-width: 1024px) {
  .footer__top {
    max-width: 900px;
    margin: 0 auto 2.5rem;
    text-align: center;
  }

  .footer__title {
    font-size: 3rem;
  }

  .footer__subtitle {
    font-size: 1.4rem;
  }

  .footer__description,
  .footer__hours {
    font-size: 1.2rem;
    max-width: 800px;
  }

  .footer__hours {
    display: ruby;
  }


  .footer__nav {
    display: block;
    margin-top: 4px;
  }

  .footer__nav-link {
    font-size: 1.1rem;
  }

  .footer__button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .footer__social {
    display: flex;
    justify-content: center;
  }


}
</style>
