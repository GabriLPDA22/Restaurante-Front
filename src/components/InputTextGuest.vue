<template>
    <div class="input-guest">
        <label v-if="label" class="input-guest__label">{{ label }}</label>

        <div class="input-guest__wrapper">
            <img :src="tableIcon" alt="mesa" class="input-guest__icon" />
            <button type="button" @click="openModal" class="input-guest__button">
                Seleccionar Mesa
            </button>
            <span v-if="selectedTables.length" class="input-guest__selected-tables">
                Mesas seleccionadas: {{ selectedTables.join(', ') }}
            </span>
        </div>

        <!-- Modal -->
        <div v-if="isModalOpen" class="input-guest__modal">
            <div class="input-guest__modal-content">
                <span class="input-guest__close" @click="closeModal">&times;</span>
                <h2>Selecciona una Mesa</h2>

                <!-- Plano del restaurante con imagen de fondo -->
                <div class="restaurant-floor-plan">
                    <div v-for="(table, index) in mesas" :key="index" class="table-spot"
                        :class="{ 'selected': selectedTables.includes(table.id) }"
                        :style="{ top: table.top, left: table.left }" @click="toggleSelection(table.id)">
                        <img :src="tableIcon" alt="mesa" class="table-spot__image" />
                        <div class="table-spot__number">{{ table.id }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import tableIcon from '@/assets/table.svg';

export default {
    props: {
        label: String,
        modelValue: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isModalOpen: false,
            /*
             * 🚀 Posiciones ajustadas con separación adecuada.
             */
            mesas: [
                // Mesas en la zona central gris
                { id: 1, top: '20%', left: '35%' },
                { id: 2, top: '20%', left: '60%' },

                { id: 3, top: '35%', left: '35%' },
                { id: 4, top: '35%', left: '60%' },

                { id: 5, top: '50%', left: '35%' },
                { id: 6, top: '50%', left: '60%' },

                { id: 7, top: '65%', left: '35%' },
                { id: 8, top: '65%', left: '60%' },

                // Mesas contra la pared izquierda
                { id: 9, top: '10%', left: '10%' },
                { id: 10, top: '22%', left: '10%' },
                { id: 11, top: '34%', left: '10%' },
                { id: 12, top: '46%', left: '10%' },
                { id: 13, top: '58%', left: '10%' },
                { id: 14, top: '70%', left: '10%' }
            ],

            selectedTables: this.modelValue,
            tableIcon
        };
    },
    watch: {
        selectedTables(newVal) {
            this.$emit('update:modelValue', newVal.length ? newVal : []);
        },
        modelValue(newVal) {
            this.selectedTables = newVal;
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
            document.body.style.overflow = "hidden"; // Bloquear scroll de la página
        },
        closeModal() {
            this.isModalOpen = false;
            document.body.style.overflow = "auto"; // Restaurar scroll de la página
        },
        toggleSelection(tableId: number) {
            const index = this.selectedTables.indexOf(tableId);
            if (index === -1) {
                this.selectedTables.push(tableId);
            } else {
                this.selectedTables.splice(index, 1);
            }
        }
    }
};
</script>

<style scoped>
/* --- Etiqueta --- */
.input-guest__label {
    font-weight: 600;
    margin-bottom: 4px;
    display: inline-block;
}

/* --- Contenedor principal (icono + botón) --- */
.input-guest__wrapper {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background-color: #f8f8f8;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
}

.input-guest__icon {
    width: 24px;
    height: 24px;
}

.input-guest__button {
    padding: 8px 16px;
    background-color: #d32f2f;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
}

.input-guest__button:hover {
    background-color: #b71c1c;
}

.input-guest__selected-tables {
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
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* Bloquear scroll */
}

.input-guest__modal-content {
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    width: 90%;
    max-width: 800px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.input-guest__close {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 28px;
    font-weight: bold;
    color: #999;
    cursor: pointer;
}

.input-guest__close:hover {
    color: #333;
}

/* --- Plano del restaurante con imagen de fondo --- */
.restaurant-floor-plan {
    position: relative;
    width: 700px;
    height: 400px;
    margin: 20px auto 0 auto;
    border: 2px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    background: url('@/assets/restaurant.jpg') no-repeat center/cover;
}

/* Cada mesa en posición absoluta */
.table-spot {
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

/* 🔥 Cuando la mesa está seleccionada */
.table-spot.selected {
    transform: translate(-50%, -50%) scale(1.1);
    border-radius: 50%;
    box-shadow: 0 0 10px 5px rgba(255, 0, 0, 0.7);
}

/* Mesas más pequeñas */
.table-spot__image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
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
}
</style>