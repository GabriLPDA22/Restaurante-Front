<template>
    <div class="contact-page">
        <contact-header />
        <div class="contact-page__content">
            <div class="contact-page__left">
                <contact-form />
                <contact-info />
            </div>
            <div class="contact-page__right">
                <contact-map />
            </div>
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
@import "@/assets/styles/_mixins.scss";

.contact-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__content {
        display: flex;
        flex-direction: column;

        @include respond-to(md) {
            flex-direction: row;
            gap: 2rem;
        }
    }

    &__left {
        flex: 1;
    }

    &__right {
        flex: 1;
    }
}
</style>