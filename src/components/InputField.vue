<template>
    <div class="input">
        <div class="input__wrapper">
            <input :type="type" v-model="model" class="input__field" required placeholder=" " />
            <label class="input__label" :class="{ 'input__label--active': model }">{{ label }}</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

defineProps({
    label: String,
    type: {
        type: String,
        default: 'text',
    },
});

const model = defineModel<string>();
</script>

<style lang="scss" scoped>
.input {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__wrapper {
        position: relative;
        width: 100%;
        border-bottom: 2px solid #d8b268;
    }

    &__field {
        width: 100%;
        padding: 1rem 0;
        border: none;
        font-size: 1rem;
        background: transparent;
        color: #fff;
        text-align: center;
        outline: none;

        &:focus {
            border-color: #b8965f;
        }

        &:focus+.input__label,
        &:not(:placeholder-shown)+.input__label {
            top: -12px;
            font-size: 0.85rem;
            color: #d8b268;
        }
    }

    &__label {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
        transition: 0.3s ease;
        pointer-events: none;
    }

    &__label--active {
        top: -12px;
        font-size: 0.85rem;
        color: #d8b268;
    }
}
</style>