<template>
    <div class="input-date">
        <label class="input-date__label">{{ label }}</label>
        <div class="input-date__wrapper">
            <input type="date" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                class="input-date__field" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ label: string, modelValue: string }>();
defineEmits(['update:modelValue']);
</script>

<style lang="scss">
.input-date {
    display: flex;
    flex-direction: column;

    &__label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    &__wrapper {
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 0.5rem;
        background: white;
    }

    &__field {
        border: none;
        flex: 1;
        outline: none;
    }

    &__icon {
        margin-left: 0.5rem;
    }
}
</style>