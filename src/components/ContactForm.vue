<template>
    <form class="contact-form">
        <input type="text" placeholder="Name *" class="contact-form__input" />
        <input type="email" placeholder="Email *" class="contact-form__input" />
        <input type="tel" placeholder="Phone number *" class="contact-form__input" />
        <select class="contact-form__select">
            <option value="" disabled selected>How did you find us?</option>
        </select>
        <button type="submit" class="contact-form__button">SEND</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactForm",
});
</script>

<style lang="scss" scoped>
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;

    &__input,
    &__select {
        padding: 0.75rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        background-color: #fff;
        width: 100%;
    }

    &__button {
        background-color: #004d40;
        color: #fff;
        padding: 0.75rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;

        &:hover {
            background-color: #00332d;
        }
    }
}
</style>