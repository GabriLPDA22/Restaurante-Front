<template>
    <div class="input-date">
        <label v-if="label">{{ label }}</label>
        <input type="date" :min="minDate" :max="maxDate" v-model="internalValue" @input="emitValue" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)

// Fecha mínima: hoy
const now = new Date()
const yyyy = now.getFullYear()
const mm = String(now.getMonth() + 1).padStart(2, '0')
const dd = String(now.getDate()).padStart(2, '0')
const minDate = `${yyyy}-${mm}-${dd}`

// Fecha máxima: hoy + 7 días (ajustable)
const maxDateObj = new Date(now)
maxDateObj.setDate(maxDateObj.getDate() + 30)
const yyyyMax = maxDateObj.getFullYear()
const mmMax = String(maxDateObj.getMonth() + 1).padStart(2, '0')
const ddMax = String(maxDateObj.getDate()).padStart(2, '0')
const maxDate = `${yyyyMax}-${mmMax}-${ddMax}`

watch(() => props.modelValue, newVal => {
    internalValue.value = newVal
})

function emitValue() {
    emit('update:modelValue', internalValue.value)
}
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