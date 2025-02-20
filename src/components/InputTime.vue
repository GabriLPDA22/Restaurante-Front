<template>
    <div class="input-time">
        <label class="input-time__label">{{ label }}</label>
        <div class="input-time__wrapper">
            <select v-model="selectedHour" @change="$emit('update:modelValue', selectedHour)" class="input-time__field">
                <option value="09:00">09:00</option>
                <option value="12:00">12:00</option>
                <option value="15:00">15:00</option>
                <option value="18:00">18:00</option>
            </select>
            <span class="input-time__icon">🕒</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ label: string, modelValue: string }>();
const emit = defineEmits(['update:modelValue']);

const selectedHour = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    selectedHour.value = newValue;
});
</script>

<style lang="scss">
.input-time {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    color: #333;
}

.input-time__label {
    font-size: 1.2rem;
    text-align: center;
    color: #253e2c;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.input-time__wrapper {
    position: relative;
}

.input-time__field {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background: #fff;
    outline: none;
    transition: border 0.3s;
    color: #253e2c;
}

.input-time__field:focus {
    border-color: #2c3e2e;
}

.input-time__icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #007BFF;
}
</style>