<template>
    <div class="contact-page">
        <div class="contact-page__left">
            <contact-header />
            <contact-form />
            <contact-info />
        </div>
        <div class="contact-page__right">
            <contact-map />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactHeader from "@/components/ContactHeader.vue";
import ContactForm from "@/components/ContactForm.vue";
import ContactInfo from "@/components/ContactInfo.vue";
import ContactMap from "@/components/ContactMap.vue";

export default defineComponent({
    name: "ContactPage",
    components: {
        ContactHeader,
        ContactForm,
        ContactInfo,
        ContactMap,
    },
});
</script>

<style lang="scss" scoped>
.contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 1rem;
    max-width: 500px;
    margin: 0 auto;

    &__left {
        width: 100%;
    }

    &__right {
        width: 100%;
    }

    @media (min-width: 768px) {
        flex-direction: row;
        max-width: 900px;
        justify-content: space-between;

        &__left {
            width: 50%;
        }

        &__right {
            width: 50%;
        }
    }
}
</style>