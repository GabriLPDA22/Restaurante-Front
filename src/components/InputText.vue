<template>
    <div class="input-text">
        <label v-if="label">{{ label }}</label>
        <input :type="type" :value="modelValue"
            @input="$event.target && $emit('update:modelValue', $event.target.value)" class="input-text__input" />
    </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string; modelValue: string; type: string }>();
defineEmits(['update:modelValue']);
</script>

<style lang="scss">
.input-text {
    display: flex;
    flex-direction: column;

    &__input {
        padding: 0.8rem;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
    }
}
</style>