<template>
    <div class="input-time">
        <label v-if="label" class="input-time__label">{{ label }}</label>
        <div class="input-time__wrapper">
            <select v-model="selectedHour" @change="handleChange" class="input-time__field">
                <option v-for="time in filteredTimes" :key="time" :value="time">
                    {{ time }}
                </option>
            </select>
            <span class="input-time__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Definición de props
const props = defineProps<{
    label?: string
    modelValue: string
    /** Fecha seleccionada en formato "YYYY-MM-DD" */
    selectedDate?: string
}>()

const emit = defineEmits(['update:modelValue'])

// Array de horas disponibles (ajústalo según lo que ofrezca tu restaurante)
const AVAILABLE_TIMES = [
    '09:00',
    '12:00',
    '15:00',
    '18:00',
    '21:00',
    '23:00'
]

// Valor interno para la hora seleccionada
const selectedHour = ref(props.modelValue)

// Sincronizar cambios desde el padre
watch(() => props.modelValue, (newVal) => {
    selectedHour.value = newVal
})

// Handle change event using the defined emit
const handleChange = () => {
    emit('update:modelValue', selectedHour.value)
}

// Computed que filtra las horas según la fecha seleccionada y la hora actual
const filteredTimes = computed(() => {
    // Si no se ha seleccionado fecha, mostramos todas las opciones
    if (!props.selectedDate) {
        return AVAILABLE_TIMES
    }

    // Parseamos la fecha seleccionada (se espera "YYYY-MM-DD")
    const [year, month, day] = props.selectedDate.split('-').map(Number)
    const selectedDateObj = new Date(year, month - 1, day)

    // Obtenemos la fecha actual
    const now = new Date()
    const isToday = now.toDateString() === selectedDateObj.toDateString()

    // Si la fecha seleccionada no es hoy, se muestran todas las horas disponibles
    if (!isToday) {
        return AVAILABLE_TIMES
    }

    // Si es hoy, convertimos la hora actual a minutos
    const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes()

    // Filtramos las horas: solo se incluyen las que sean posteriores a la hora actual
    return AVAILABLE_TIMES.filter((timeStr) => {
        const [hourStr, minuteStr] = timeStr.split(':')
        const hour = Number(hourStr)
        const minute = Number(minuteStr)
        const optionTimeInMinutes = hour * 60 + minute
        return optionTimeInMinutes > currentTimeInMinutes
    })
})
</script>

<style scoped>
.input-time {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    color: #333;
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

    /* Eliminar apariencia nativa del select */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
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
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Para Firefox */
.input-time__field::-moz-focus-inner {
    border: 0;
}

/* Personalización de la flecha desplegable */
.input-time__field::-ms-expand {
    display: none;
}
</style>