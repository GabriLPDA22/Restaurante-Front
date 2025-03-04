<template>
  <section class="about">
    <div class="about__container">
      <div class="about__image">
        <img src="../assets/chef-special.png" class="chef" alt="Chef presenting" />
      </div>
      <div class="about__text">
        <h2 class="about__title">About Us</h2>
        <p class="about__description">
          Welcome to a culinary journey through the heart of Italy at Elixium. Immerse yourself in the rich flavors and
          warm hospitality that define our authentic Italian dining experience.
        </p>
        <h2 class="about__title">Our Story</h2>
        <p class="about__description">
          Founded with a passion for preserving Italian culinary traditions, Elixium emerged as a labor of love. Our
          story is woven with family recipes, generations of expertise, and a commitment to sharing the true essence of
          Italy.
        </p>
      </div>
    </div>
    <div class="mission">
      <div class="mission__container">
        <div class="mission__text">
          <h2 class="mission__title">Our Mission</h2>
          <p class="mission__description">
            At Elixium, our mission is to transport you to the sun-kissed landscapes of Italy through every bite. We
            strive to deliver an unparalleled dining experience, where passion meets perfection in crafting memorable
            moments for our guests.
          </p>
        </div>
        <div class="mission__image">
          <img src="../assets/OurMission.jpeg" alt="Gourmet dish" />
        </div>
      </div>
    </div>
    <div class="testimonials">
      <h2 class="testimonials__title">What Our Clients Say</h2>
      <div class="testimonials__container">
        <div class="testimonials__card">
          <p class="testimonials__text">
            I felt transported to Italy the moment I stepped into Bella Italia. The cozy ambiance, attentive staff, and
            exquisite pasta made it an enchanting evening. Each bite felt like a culinary symphony, and I left with a
            heart full of warmth. A true gem for those seeking an authentic Italian dining experience.
          </p>
          <p class="testimonials__author">Bella Italia’s Charm</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.chef {
  display: none;

  @media (min-width: 1024px) {
    display: block;
    height: 600px;
  }
}

.about {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (min-width: 1024px) {
      flex-direction: row;
      text-align: left;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
  }
}

.mission {
  background-color: #e0c49e;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;

    @media (min-width: 1024px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
    }
  }

  &__text {
    flex: 1;
  }

  &__image {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
      height: auto;
    }
  }
}

.testimonials {
  background-color: #f8f3ee;
  padding: 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
