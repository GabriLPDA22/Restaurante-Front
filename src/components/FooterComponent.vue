<template>
  <footer class="footer">
    <div class="footer__top">
      <h1 class="footer__title">PARTOW FOODS</h1>
      <p class="footer__subtitle">RESTAURANT</p>
      <p class="footer__description">
        Lorem ipsum dolor sit amet consectetur. Sagittis mattis mauris at condimentum arcu eget. Sed posuere cursus
        pharetra tortor eu purus rhoncus lectus. Enim ut ligula sit nec donec. Hendrerit in.
      </p>
      <p class="footer__hours">
        SUNDAY - THURSDAY: 11:30AM - 11PM <br />
        FRIDAY & SATURDAY: 11:30AM - 12AM
      </p>
    </div>
    <div class="footer__bottom">
      <div class="footer__actions">
        <button class="footer__button footer__button--reserve">Reserve Now</button>
        <button class="footer__button footer__button--contact">Contact Us</button>
      </div>
      <div class="footer__social">
        <a href="https://www.facebook.com" class="footer__social-icon">
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
        <a href="https://www.instagram.com" class="footer__social-icon">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
      </div>
    </div>
    <p class="footer__copyright">COPYRIGHT 2024</p>
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

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media (min-width: 1024px) {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
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
      color: #032b31;

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
    gap: 1.5rem;
    margin-top: 1rem;

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

  &__copyright {
    margin-top: 2.5rem;
    font-size: 0.875rem;
    letter-spacing: 0.05rem;
  }
}
</style>
