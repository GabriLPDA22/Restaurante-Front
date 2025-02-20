```vue
<template>
    <div class="input-guest">
        <label v-if="label">{{ label }}</label>
        <div class="input-guest__wrapper">
            <img :src="tableIcon" alt="mesa" class="input-guest__icon">
            <button type="button" @click="openModal" class="input-guest__button">Seleccionar Mesa</button>
            <span v-if="selectedTables.length" class="input-guest__selected-tables">
                Mesas seleccionadas: {{ selectedTables.join(', ') }}
            </span>
        </div>
        <div v-if="isModalOpen" class="input-guest__modal">
            <div class="input-guest__modal-content">
                <span class="input-guest__close" @click="closeModal">&times;</span>
                <h2>Selecciona una Mesa</h2>
                <div class="input-guest__tables">
                    <div v-for="(mesa, index) in mesas" :key="index" class="input-guest__table">
                        <img :src="tableIcon" alt="mesa" class="input-guest__table-icon">
                        <div class="input-guest__table-number">{{ mesa }}</div>
                        <input type="checkbox" :id="'mesa-' + index" :value="mesa" v-model="selectedTables"
                            class="input-guest__checkbox">
                    </div>
                </div>
                <p v-if="reservationMessage">{{ reservationMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import tableIcon from '@/assets/table.svg';

export default {
    data() {
        return {
            isModalOpen: false,
            mesas: [1, 2, 3, 4, 5],
            selectedTables: [],
            reservationMessage: '',
            tableIcon
        };
    },
    props: {
        label: String
    },
    watch: {
        selectedTables(newVal) {
            this.$emit('update:modelValue', newVal.length ? newVal : null);
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        }
    }
};
</script>

<style scoped>
.input-guest__wrapper {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    background-color: #f9f9f9;
}

.input-guest__icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}

.input-guest__button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.input-guest__button:hover {
    background-color: #0056b3;
}

.input-guest__modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
}

.input-guest__modal-content {
    background-color: #fff;
    padding: 40px;
    border-radius: 4px;
    width: 90%;
    max-width: 700px;
    height: 250px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
}

.input-guest__close {
    color: #aaa;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.input-guest__close:hover,
.input-guest__close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.input-guest__tables {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}

.input-guest__table {
    position: relative;
    width: 50px;
    height: 50px;
    text-align: center;
}

.input-guest__table-icon {
    width: 100%;
    height: 100%;
}

.input-guest__table-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 10px;
    font-weight: bold;
}

.input-guest__checkbox {
    margin-top: 5px;
}
</style>