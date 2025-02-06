<template>
    <footer class="footer">
      <div class="footer__top">
        <h1 class="footer__title">RESTAURANT</h1>
        <nav class="footer__nav">
          <ul class="footer__menu">
            <li class="footer__menu-item"><a href="#menu">Menu</a></li>
            <li class="footer__menu-item"><a href="#events">Events</a></li>
            <li class="footer__menu-item"><a href="#about-us">About US</a></li>
            <li class="footer__menu-item"><a href="#reservation">Reservation</a></li>
            <li class="footer__menu-item"><a href="#order">Order</a></li>
            <li class="footer__menu-item"><a href="#contact-us">Contact us</a></li>
          </ul>
        </nav>
        <p class="footer__description">
          Lorem ipsum dolor sit amet consectetur. Sagittis mattis mauris at condimentum arcu eget. Sed posuere cursus pharetra tortor eu purus rhoncus lectus. Enim ut ligula sit nec donec. Hendrerit in.
        </p>
        <p class="footer__hours">
          SUNDAY - THURSDAY: 11:30AM - 11PM | FRIDAY & SATURDAY: 11:30AM - 12AM
        </p>
      </div>
      <div class="footer__bottom">
        <button class="footer__button footer__button--reserve">Reserve Now</button>
        <button class="footer__button footer__button--contact">Contact Us</button>
        <div class="footer__social">
          <a href="#" class="footer__social-icon">🔗</a>
          <a href="#" class="footer__social-icon">🔗</a>
        </div>
      </div>
      <p class="footer__copyright">COPYRIGHT 2024</p>
    </footer>
  </template>
  
  <script lang="ts">
 
  </script>
  
  <style lang="scss" scoped>
  .footer {
    padding: 1.5rem;
    background-color: #032b31;
    color: #f3d2a4;
    text-align: center;
  
    &__top {
      margin-bottom: 2rem;
    }
  
    &__title {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    &__nav {
      margin-bottom: 1.5rem;
    }
  
    &__menu {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
  
      &-item a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
        transition: color 0.3s;
  
        &:hover {
          color: #ffad33;
        }
      }
    }
  
    &__description {
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }
  
    &__hours {
      margin-bottom: 2rem;
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
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
  
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
      font-size: 0.75rem;
    }
  
    @media (max-width: 768px) {
      &__menu {
        flex-direction: column;
        align-items: center;
      }
  
      &__title {
        font-size: 1.25rem;
      }
  
      &__button {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
      }
    }
  
    @media (max-width: 480px) {
      &__title {
        font-size: 1rem;
      }
  
      &__description {
        font-size: 0.75rem;
      }
  
      &__button {
        padding: 0.5rem;
        font-size: 0.75rem;
      }
    }
  }
  </style>
  