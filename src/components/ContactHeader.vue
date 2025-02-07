<template>
    <div class="contact-header">
        <h1 class="contact-header__title">
            Get In <span class="contact-header__highlight">Touch</span>
        </h1>
        <p class="contact-header__description">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit
            netus.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactHeader",
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.contact-header {
    text-align: center;

    &__title {
        font-size: 2rem;
        font-weight: bold;
    }

    &__highlight {
        color: $secondary-color;
    }

    &__description {
        margin-top: 0.5rem;
        font-size: 1rem;
        color: $text-color;
    }
}
</style>
