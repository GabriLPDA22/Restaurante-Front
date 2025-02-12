<template>
    <div class="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18..." class="contact-map__iframe" allowfullscreen
            loading="lazy"></iframe>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContactMap",
});
</script>

<style lang="scss" scoped>
.contact-map {
    width: 100%;
    height: 250px;
    border-radius: 0.5rem;
    overflow: hidden;

    &__iframe {
        width: 100%;
        height: 100%;
        border: none;
    }
}
</style>