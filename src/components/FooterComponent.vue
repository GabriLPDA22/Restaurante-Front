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
      <button class="footer__button footer__button--reserve">Reserve Now</button>
      <button class="footer__button footer__button--contact">Contact Us</button>
      <div class="footer__social">
        <a href="#" class="footer__social-icon">📷</a>
        <a href="#" class="footer__social-icon">📷</a>
      </div>
    </div>
    <p class="footer__copyright">COPYRIGHT 2024</p>
  </footer>
</template>

<script lang="ts">
export default {
  name: 'FooterComponent',
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 2rem 1rem;
  background-color: #032b31;
  color: #f3d2a4;
  text-align: center;
  font-family: 'Arial', sans-serif;

  &__top {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 1rem;
    letter-spacing: 0.2rem;
    margin-bottom: 1rem;
  }

  &__description {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.5;
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
    gap: 1rem;
  }

  &__button {
    border: none;
    padding: 1rem 2rem;
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
    gap: 1rem;
    margin-top: 1rem;

    &-icon {
      font-size: 1.5rem;
      color: inherit;
      transition: color 0.3s;

      &:hover {
        color: #ffad33;
      }
    }
  }

  &__copyright {
    margin-top: 2rem;
    font-size: 0.875rem;
    letter-spacing: 0.05rem;
  }
}
</style>
