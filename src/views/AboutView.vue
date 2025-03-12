<template>
  <section class="about">
    <!-- Hero Banner -->
    <div class="about__hero">
      <div class="about__hero-overlay">
        <h1 class="about__hero-title">Elixium</h1>
        <p class="about__hero-subtitle">Authentic Italian Cuisine</p>
      </div>
    </div>

    <!-- About Us Section -->
    <div class="about__container">
      <div class="about__image">
        <img src="/public/chef-special.png" class="chef" alt="Chef presenting" />
        <div class="about__image-accent"></div>
      </div>
      <div class="about__text">
        <div class="section-heading">
          <span class="section-subheading">Welcome</span>
          <h2 class="section-title">About Us</h2>
          <div class="section-divider">
            <span class="divider-icon">●</span>
          </div>
        </div>
        <p class="about__description">
          Welcome to a culinary journey through the heart of Italy at <span class="highlight">Elixium</span>. Immerse
          yourself in the rich flavors and warm hospitality that define our authentic Italian dining experience.
        </p>
        <div class="section-heading">
          <h2 class="section-title">Our Story</h2>
          <div class="section-divider">
            <span class="divider-icon">●</span>
          </div>
        </div>
        <p class="about__description">
          Founded with a passion for preserving Italian culinary traditions, Elixium emerged as a labor of love. Our
          story is woven with family recipes, generations of expertise, and a commitment to sharing the true essence of
          Italy.
        </p>
        <div class="about__signature">
          <span>The Elixium Family</span>
        </div>
      </div>
    </div>

    <!-- Mission Section with Parallax -->
    <div class="mission">
      <div class="mission__container">
        <div class="mission__text">
          <div class="section-heading mission-heading">
            <span class="section-subheading">Our Purpose</span>
            <h2 class="section-title">Our Mission</h2>
            <div class="section-divider">
              <span class="divider-icon">●</span>
            </div>
          </div>
          <p class="mission__description">
            At Elixium, our mission is to transport you to the sun-kissed landscapes of Italy through every bite. We
            strive to deliver an unparalleled dining experience, where passion meets perfection in crafting memorable
            moments for our guests.
          </p>
          <div class="mission__values">
            <div class="mission__value-item">
              <div class="mission__value-icon">🌿</div>
              <div class="mission__value-text">
                <h3>Authentic Ingredients</h3>
                <p>We source the finest ingredients directly from Italy.</p>
              </div>
            </div>
            <div class="mission__value-item">
              <div class="mission__value-icon">👨‍🍳</div>
              <div class="mission__value-text">
                <h3>Expert Craftsmanship</h3>
                <p>Our chefs bring generations of Italian cooking expertise.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mission__image">
          <img src="/public/OurMission.jpeg" alt="Gourmet dish" />
          <div class="mission__image-accent"></div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="testimonials">
      <div class="section-heading centered">
        <span class="section-subheading">Reviews</span>
        <h2 class="section-title">What Our Clients Say</h2>
        <div class="section-divider">
          <span class="divider-icon">●</span>
        </div>
      </div>
      <div class="testimonials__container">
        <div class="testimonials__card">
          <div class="testimonials__quote-mark">"</div>
          <p class="testimonials__text">
            I felt transported to Italy the moment I stepped into Bella Italia. The cozy ambiance, attentive staff, and
            exquisite pasta made it an enchanting evening. Each bite felt like a culinary symphony, and I left with a
            heart full of warmth. A true gem for those seeking an authentic Italian dining experience.
          </p>
          <div class="testimonials__author-box">
            <div class="testimonials__author-avatar">
              <span>M</span>
            </div>
            <div class="testimonials__author-info">
              <p class="testimonials__author-name">Maria Rossi</p>
              <p class="testimonials__author-title">Food Enthusiast</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chef Spotlight Section -->
    <div class="chef-spotlight">
      <div class="chef-spotlight__container">
        <div class="chef-spotlight__image">
          <img src="/public/chef-special.png" alt="Head Chef" />
        </div>
        <div class="chef-spotlight__text">
          <div class="section-heading">
            <span class="section-subheading">Culinary Excellence</span>
            <h2 class="section-title">Meet Our Chef</h2>
            <div class="section-divider">
              <span class="divider-icon">●</span>
            </div>
          </div>
          <p>With over 20 years of experience in traditional Italian cuisine, our head chef brings the authentic flavors
            of Italy to your table. Every dish is crafted with passion, precision, and the finest ingredients.</p>
          <div class="chef-spotlight__signature">
            <span>Chef Alessandro</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="cta-section">
      <div class="cta-overlay">
        <h2>Experience the Taste of Italy</h2>
        <p>Make a reservation today and embark on a culinary journey.</p>
        <router-link to="/reservation" class="cta-button" style="text-decoration: none;">Book a Table</router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
// Variables
$primary-color: #D4B96A;
$dark-color: #1A1D20;
$light-color: #F8F3EE;
$accent-color: #E0C49E;
$text-color: #333;
$heading-font: 'Cormorant Garamond', serif;
$body-font: 'Montserrat', sans-serif;

// Global styles
.section-heading {
  margin-bottom: 1.5rem;

  &.centered {
    text-align: center;
  }

  &.mission-heading {
    color: $dark-color;

    .section-title {
      color: $dark-color;
    }
  }
}

.section-subheading {
  font-family: $body-font;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 0.8rem;
  color: $primary-color;
  display: block;
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: $heading-font;
  font-size: 2.5rem;
  font-weight: 600;
  color: $dark-color;
  margin: 0 0 0.5rem;
  position: relative;
}

.section-divider {
  display: flex;
  align-items: center;
  margin: 0.5rem 0 1.5rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: rgba($primary-color, 0.3);
  }

  .divider-icon {
    font-size: 0.5rem;
    color: $primary-color;
    margin: 0 0.75rem;
  }
}

.highlight {
  color: $primary-color;
  font-weight: 600;
}

// Hero Section
.about__hero {
  height: 60vh;
  background-image: url('/public/OurMission.jpeg');
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;

  &-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
  }

  &-title {
    font-family: $heading-font;
    font-size: 3.5rem;
    font-weight: 700;
    color: white;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 5px;

    @media (min-width: 768px) {
      font-size: 5rem;
    }
  }

  &-subtitle {
    font-family: $body-font;
    font-size: 1.2rem;
    color: $primary-color;
    margin: 0.5rem 0 0;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
}

// About Section
.about {
  font-family: $body-font;
  color: $text-color;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto 4rem;

    @media (min-width: 1024px) {
      flex-direction: row;
      text-align: left;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
    }
  }

  &__image {
    position: relative;
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      margin-bottom: 0;
      flex: 1;
    }

    .chef {
      display: none;

      @media (min-width: 768px) {
        display: block;
        height: auto;
        max-width: 100%;
        border-radius: 5px;
        position: relative;
        z-index: 2;
      }
    }

    &-accent {
      display: none;

      @media (min-width: 768px) {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: $primary-color;
        top: 20px;
        left: 20px;
        border-radius: 5px;
        z-index: 1;
      }
    }
  }

  &__text {
    flex: 1;

    @media (min-width: 1024px) {
      padding-left: 2rem;
    }
  }

  &__description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    color: $text-color;
  }

  &__signature {
    font-family: $heading-font;
    font-style: italic;
    font-size: 1.5rem;
    color: $primary-color;
    margin-top: 2rem;
    text-align: right;
  }
}

// Mission Section
.mission {
  background-color: $accent-color;
  padding: 4rem 2rem;
  margin: 4rem 0;
  position: relative;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
    }
  }

  &__text {
    flex: 1;
    margin-top: 2rem;

    @media (min-width: 1024px) {
      margin-top: 0;
    }
  }

  &__description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
  }

  &__values {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  &__value-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__value-icon {
    font-size: 1.8rem;
    background-color: $primary-color;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__value-text {
    h3 {
      font-family: $heading-font;
      font-size: 1.3rem;
      margin: 0 0 0.5rem;
      color: $dark-color;
    }

    p {
      margin: 0;
      font-size: 1rem;
      line-height: 1.5;
    }
  }

  &__image {
    flex: 1;
    position: relative;

    img {
      max-width: 100%;
      height: auto;
      border-radius: 5px;
      position: relative;
      z-index: 2;
    }

    &-accent {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid $primary-color;
      top: 15px;
      left: -15px;
      border-radius: 5px;
      z-index: 1;
    }
  }
}

// Testimonials Section
.testimonials {
  padding: 4rem 2rem;
  background-color: $light-color;

  &__container {
    max-width: 800px;
    margin: 0 auto;
  }

  &__card {
    background-color: white;
    border-radius: 8px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    position: relative;
    margin-top: 2rem;
  }

  &__quote-mark {
    font-family: Georgia, serif;
    position: absolute;
    top: -30px;
    left: 30px;
    font-size: 6rem;
    color: $primary-color;
    height: 40px;
    line-height: 1;
    overflow: hidden;
  }

  &__text {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    text-align: left;
    font-style: italic;
  }

  &__author-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    border-top: 1px solid rgba($dark-color, 0.1);
    padding-top: 1.5rem;
  }

  &__author-avatar {
    width: 50px;
    height: 50px;
    background-color: $primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.2rem;
  }

  &__author-info {
    text-align: left;
  }

  &__author-name {
    font-weight: 600;
    margin: 0;
    font-size: 1rem;
  }

  &__author-title {
    color: $primary-color;
    margin: 0;
    font-size: 0.9rem;
  }
}

// Chef Spotlight Section
.chef-spotlight {
  padding: 4rem 2rem;
  background-color: white;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      gap: 3rem;
    }
  }

  &__image {
    margin-bottom: 2rem;

    @media (min-width: 1024px) {
      flex: 1;
      margin-bottom: 0;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 50%;
      border: 5px solid $primary-color;
    }
  }

  &__text {
    @media (min-width: 1024px) {
      flex: 1;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  &__signature {
    font-family: $heading-font;
    font-style: italic;
    font-size: 1.5rem;
    color: $primary-color;
    margin-top: 2rem;
    text-align: right;
  }
}

// Call to Action Section
.cta-section {
  background-image: url('/public/OurMission.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 300px;
  position: relative;
  margin-bottom: -2rem;

  .cta-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;

    h2 {
      font-family: $heading-font;
      font-size: 2.5rem;
      color: white;
      margin: 0 0 1rem;
    }

    p {
      color: $light-color;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }

    .cta-button {
      background-color: $primary-color;
      color: $dark-color;
      font-family: $body-font;
      font-weight: 600;
      font-size: 1rem;
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;

      &:hover {
        background-color: $primary-color;
        transform: translateY(-2px);
      }
    }
  }
}
</style>