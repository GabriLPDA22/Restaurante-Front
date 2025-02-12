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
.contact-header {
    text-align: center;
    margin-bottom: 1.5rem;

    &__title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    &__highlight {
        color: #d4af37; // Dorado
    }

    &__description {
        font-size: 1rem;
        color: #333;
        line-height: 1.6;
    }
}
</style>