<template>
    <div class="input-guest">
        <label v-if="label" class="input-guest__label">{{ label }}</label>

        <div class="input-guest__wrapper">
            <div class="input-guest__selector" :class="{ 'disabled': !hasValidDateAndTime }">
                <img :src="tableIcon" alt="mesa" class="input-guest__icon" />
                <button type="button" @click="openModal" class="input-guest__button"
                    :class="{ 'disabled': !hasValidDateAndTime }" :disabled="!hasValidDateAndTime">
                    <span class="button-text">Seleccionar Mesa</span>
                    <span class="button-icon">›</span>
                </button>
            </div>
            <div v-if="selectedTables.length" class="input-guest__selected-tables">
                <span class="selected-label">Mesas:</span>
                <span class="selected-numbers">{{ selectedTables.join(', ') }}</span>
            </div>
            <div v-if="!hasValidDateAndTime" class="input-guest__helper-text">
                Selecciona fecha y hora para continuar
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="input-guest__modal" @wheel.prevent @touchmove.prevent>
            <div class="input-guest__modal-content">
                <span class="input-guest__close" @click="closeModal">&times;</span>
                <h2>Selecciona una Mesa</h2>

                <!-- Mensaje indicando que debe seleccionar fecha y hora primero -->
                <div v-if="!hasValidDateAndTime" class="input-guest__warning">
                    Por favor, selecciona una fecha y hora de reserva primero para ver las mesas disponibles.
                </div>

                <!-- Leyenda de disponibilidad -->
                <div v-else class="input-guest__availability-legend">
                    <div class="legend-item">
                        <span class="legend-color available"></span>
                        <span>Disponible</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color occupied"></span>
                        <span>Ocupada</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color selected"></span>
                        <span>Seleccionada</span>
                    </div>
                </div>

                <!-- Plano del restaurante con imagen de fondo -->
                <div class="restaurant-floor-plan">
                    <div v-for="(table, index) in mesas" :key="index" class="table-spot" :class="{
                        'selected': selectedTables.includes(table.id),
                        'occupied': !isTableAvailable(table.id),
                        'available': isTableAvailable(table.id)
                    }" :style="{ top: table.top, left: table.left }" @click="toggleSelection(table.id)">
                        <img :src="tableIcon" alt="mesa" class="table-spot__image" />
                        <div class="table-spot__number">{{ table.id }}</div>
                    </div>
                </div>

                <!-- Mensajes de información -->
                <div v-if="hasValidDateAndTime" class="input-guest__info">
                    <p v-if="isLoadingReservations">Cargando información de disponibilidad...</p>
                    <p v-else-if="loadingError" class="error-message">{{ loadingError }}</p>
                    <p v-else-if="occupiedTables.length === 0" class="success-message">¡Todas las mesas están
                        disponibles!</p>
                    <p v-else>Las mesas marcadas en rojo no están disponibles para la hora seleccionada.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, defineComponent } from 'vue';
import tableIcon from '@/assets/table.svg';
import { useReservationStore } from '@/stores/reservationStore'; // Ruta corregida

export default defineComponent({
    props: {
        label: {
            type: String,
            default: ""
        },
        modelValue: {
            type: Array,
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const isModalOpen = ref(false);
        const selectedTables = ref(props.modelValue as number[]);
        const scrollY = ref(0);

        // Obtener el store de reservas
        const reservationStore = useReservationStore();

        // Referencias calculadas a propiedades del store
        const reservationDate = computed(() => reservationStore.form.date);
        const reservationTime = computed(() => reservationStore.form.time);
        const isLoadingReservations = computed(() => reservationStore.isLoadingReservations);
        const loadingError = computed(() => reservationStore.loadingError);

        // Verificar si hay fecha y hora válidas
        const hasValidDateAndTime = computed(() => {
            return Boolean(reservationDate.value && reservationTime.value);
        });

        // Función para verificar si una mesa está disponible
        const isTableAvailable = (tableId: number) => {
            return reservationStore.isTableAvailable(tableId);
        };

        // Obtener mesas ocupadas
        const getOccupiedTables = () => {
            return reservationStore.getOccupiedTables();
        };

        // Calcular un valor computado para la lista de mesas ocupadas (para el template)
        const occupiedTables = computed(() => {
            return getOccupiedTables();
        });

        // Actualizar cuando cambia el modelValue desde el padre
        watch(() => props.modelValue, (newVal) => {
            selectedTables.value = newVal as number[];
        });

        // Emitir cambios de selección hacia el padre
        watch(selectedTables, (newVal) => {
            emit('update:modelValue', newVal.length ? newVal : []);

            // Actualizar también el store para mantener sincronización
            reservationStore.form.selectedTables = newVal;
        }, { deep: true });

        // Manejar la apertura del modal
        const openModal = () => {
            // Solo permitir abrir el modal si hay fecha y hora válidas
            if (!hasValidDateAndTime.value) {
                return;
            }

            isModalOpen.value = true;
            disableScroll();

            // Verificar si tenemos fecha y hora seleccionadas y realizar la carga
            if (reservationStore.fetchReservationsByDate) {
                reservationStore.fetchReservationsByDate(reservationDate.value);
            } else if (reservationStore.simulateReservations) {
                // Fallback a simulación si no existe el método de API
                reservationStore.simulateReservations();
            }
        };

        // Manejar el cierre del modal
        const closeModal = () => {
            isModalOpen.value = false;
            enableScroll();
        };

        // Manejar la selección/deselección de una mesa
        const toggleSelection = (tableId: number) => {
            // No permitir seleccionar mesas ocupadas
            if (!isTableAvailable(tableId)) {
                return;
            }

            const index = selectedTables.value.indexOf(tableId);
            if (index === -1) {
                selectedTables.value.push(tableId);
            } else {
                selectedTables.value.splice(index, 1);
            }
        };

        // Prevenir scroll cuando el modal está abierto
        const handleScrollEvent = (e: Event) => {
            if (isModalOpen.value) {
                e.preventDefault();
            }
        };

        // Deshabilitar scroll
        const disableScroll = () => {
            scrollY.value = window.scrollY;
            document.documentElement.classList.add('modal-open');
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.width = '100%';
            document.documentElement.style.top = `-${scrollY.value}px`;
        };

        // Habilitar scroll
        const enableScroll = () => {
            document.documentElement.classList.remove('modal-open');
            document.documentElement.style.position = '';
            document.documentElement.style.width = '';
            document.documentElement.style.top = '';
            window.scrollTo(0, scrollY.value);
        };

        // Configurar los event listeners al montar el componente
        onMounted(() => {
            window.addEventListener('wheel', handleScrollEvent, { passive: false });
            window.addEventListener('touchmove', handleScrollEvent, { passive: false });
        });

        // Limpiar event listeners al desmontar
        onBeforeUnmount(() => {
            window.removeEventListener('wheel', handleScrollEvent);
            window.removeEventListener('touchmove', handleScrollEvent);

            if (isModalOpen.value) {
                enableScroll();
            }
        });

        // Definir las mesas y sus posiciones
        const mesas = [
            // Mesas en la zona central gris
            { id: 1, top: '29%', left: '40%' },
            { id: 2, top: '19%', left: '55%' },
            { id: 3, top: '39%', left: '45%' },
            { id: 4, top: '19%', left: '62%' },
            { id: 5, top: '49%', left: '40%' },
            { id: 6, top: '19%', left: '69%' },
            { id: 7, top: '59%', left: '45%' },
            { id: 8, top: '19%', left: '76%' },
            // Mesas contra la pared izquierda
            { id: 9, top: '35%', left: '61%' },
            { id: 10, top: '35%', left: '72%' },
            { id: 11, top: '48%', left: '55%' },
            { id: 12, top: '48%', left: '65%' },
            { id: 13, top: '59%', left: '60%' },
            { id: 14, top: '59%', left: '70%' },
            { id: 15, top: '48%', left: '75%' }
        ];

        return {
            isModalOpen,
            mesas,
            selectedTables,
            tableIcon,
            reservationDate,
            reservationTime,
            hasValidDateAndTime,
            isLoadingReservations,
            loadingError,
            occupiedTables,
            isTableAvailable,
            getOccupiedTables,
            openModal,
            closeModal,
            toggleSelection
        };
    }
});
</script>

<style scoped>
/* --- Etiqueta --- */
.input-guest__label {
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #333;
    font-size: 14px;
}

/* --- Contenedor principal --- */
.input-guest__wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.input-guest__selector {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
}

.input-guest__selector:hover:not(.disabled) {
    border-color: #d1d5db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.input-guest__selector.disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.input-guest__icon {
    width: 24px;
    height: 24px;
}

.input-guest__button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background-color: #223022;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    flex-grow: 1;
    box-shadow: 0 2px 4px rgba(34, 48, 34, 0.2);
}

.input-guest__button:hover:not(.disabled) {
    background-color: #223022;
    box-shadow: 0 3px 6px rgb(34, 44, 34);
    transform: translateY(-1px);
}

.input-guest__button.disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

.button-text {
    flex-grow: 1;
    text-align: center;
}

.button-icon {
    font-size: 18px;
    font-weight: bold;
    margin-left: 8px;
    transform: rotate(90deg);
}

.input-guest__selected-tables {
    background-color: #e8f4fd;
    border-radius: 6px;
    padding: 10px 16px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-left: 3px solid #2196f3;
}

.selected-label {
    font-weight: 600;
    color: #1976d2;
}

.selected-numbers {
    color: #333;
}

/* --- Texto de ayuda --- */
.input-guest__helper-text {
    font-size: 13px;
    color: #666;
    margin-top: -4px;
    font-style: italic;
}

/* --- Modal --- */
.input-guest__modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    backdrop-filter: blur(3px);
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.input-guest__modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 12px;
    width: 95%;
    max-width: 800px;
    max-height: 90vh;
    text-align: center;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease-out;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.input-guest__modal-content h2 {
    margin-top: 0;
    color: #333;
    font-size: 20px;
    margin-bottom: 15px;
}

.input-guest__close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    font-weight: bold;
    color: #999;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
    z-index: 10;
}

.input-guest__close:hover {
    background-color: #f5f5f5;
    color: #333;
}

/* --- Leyenda de disponibilidad --- */
.input-guest__availability-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 15px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
}

.legend-color {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.legend-color.available {
    background-color: #4caf50;
    border: 1px solid #388e3c;
}

.legend-color.occupied {
    background-color: #f44336;
    border: 1px solid #d32f2f;
}

.legend-color.selected {
    background-color: #2196f3;
    border: 1px solid #1976d2;
}

/* --- Mensajes de información --- */
.input-guest__warning {
    background-color: #fff3cd;
    color: #856404;
    padding: 12px;
    margin-bottom: 15px;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
}

.input-guest__info {
    margin-top: 15px;
    font-size: 14px;
    text-align: center;
}

.error-message {
    color: #d32f2f;
}

.success-message {
    color: #388e3c;
}

/* --- Plano del restaurante con imagen de fondo --- */
.restaurant-floor-plan {
    position: relative;
    width: 100%;
    /* Cambiado a 100% para responsividad */
    height: 0;
    /* Altura establecida a 0 */
    padding-bottom: 60%;
    /* Mantiene relación de aspecto */
    margin: 10px auto 0 auto;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    overflow: hidden;
    background: url('@/assets/restaurant.jpg') no-repeat center/cover;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Cada mesa en posición absoluta */
.table-spot {
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
}

.table-spot:hover {
    transform: translate(-50%, -50%) scale(1.1);
}

/* Mesa disponible */
.table-spot.available {
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.5);
}

.table-spot.available:hover {
    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.7);
}

.table-spot.available .table-spot__image {
    border: 2px solid #4caf50;
}

/* Mesa ocupada */
.table-spot.occupied {
    box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.5);
    cursor: not-allowed;
    opacity: 0.8;
}

.table-spot.occupied:hover {
    transform: translate(-50%, -50%);
    /* No permitir scale en hover */
    box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.7);
}

.table-spot.occupied .table-spot__image {
    border: 2px solid #f44336;
    background-color: rgba(244, 67, 54, 0.3);
}

/* Mesa seleccionada */
.table-spot.selected {
    transform: translate(-50%, -50%) scale(1.05);
    animation: pulse 1.5s infinite;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.7);
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(33, 150, 243, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(33, 150, 243, 0);
    }
}

.table-spot.selected .table-spot__image {
    border: 2px solid #2196f3;
    background-color: rgba(33, 150, 243, 0.8);
}

/* Imágenes de las mesas */
.table-spot__image {
    width: 32px;
    height: 32px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Número de mesa en el centro */
.table-spot__number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;
    pointer-events: none;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    font-size: 12px;
}

/* Media queries para responsividad */
@media (max-width: 768px) {
    .input-guest__modal-content {
        padding: 15px;
    }

    .restaurant-floor-plan {
        padding-bottom: 70%;
        /* Mayor relación de aspecto en móviles */
    }

    .table-spot__image {
        width: 28px;
        height: 28px;
    }

    .table-spot__number {
        font-size: 11px;
    }

    .input-guest__modal-content h2 {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .input-guest__availability-legend {
        gap: 10px;
    }

    .legend-item {
        font-size: 12px;
    }
}

@media (max-width: 480px) {
    .input-guest__modal-content {
        padding: 12px;
        border-radius: 10px;
    }

    .restaurant-floor-plan {
        padding-bottom: 80%;
        /* Aún mayor relación de aspecto para móviles pequeños */
        border-radius: 8px;
    }

    .table-spot__image {
        width: 24px;
        height: 24px;
    }

    .table-spot__number {
        font-size: 10px;
    }

    .input-guest__close {
        top: 8px;
        right: 8px;
        font-size: 20px;
        width: 26px;
        height: 26px;
    }

    .input-guest__availability-legend {
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .input-guest__warning {
        font-size: 12px;
        padding: 8px;
    }
}
</style>