<template>
    <div class="contact-info">
        <div class="contact-info__item">
            <i class="contact-info__icon">📞</i>
            <span class="contact-info__text">+6011 5381 0610</span>
        </div>
        <div class="contact-info__item">
            <i class="contact-info__icon">📧</i>
            <span class="contact-info__text">info@partowads.com</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactInfo",
});
</script>

<style lang="scss" scoped>
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        color: #e63950;
    }

    &__icon {
        font-size: 1.5rem;
    }
}
</style>