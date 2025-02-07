<template>
    <form class="contact-form">
        <input type="text" placeholder="Name *" class="contact-form__input" />
        <input type="email" placeholder="Email *" class="contact-form__input" />
        <input type="tel" placeholder="Phone number *" class="contact-form__input" />
        <select class="contact-form__select">
            <option>How did you find us?</option>
        </select>
        <button type="submit" class="contact-form__button">Send</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactForm",
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__input,
    &__select {
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
    }

    &__button {
        background-color: $primary-color;
        color: #fff;
        padding: 0.75rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;

        &:hover {
            background-color: $primary-color;
        }
    }
}
</style>