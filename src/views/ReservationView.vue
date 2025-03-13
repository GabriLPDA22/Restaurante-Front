<template>
    <div class="reservation-container">
        <div class="reservation">
            <h2 class="reservation__title">Reservation</h2>
            <!-- Mantenemos exactamente la misma estructura -->
            <form class="reservation__form" @submit.prevent="submitReservation">
                <div class="reservation__row">
                    <div class="reservation__field">
                        <!-- Usamos InputDate con placeholder y un rango de fechas -->
                        <InputDate v-model="form.date" label="Date*" placeholder="dd/mm/yyyy" required />
                        <span v-if="errors.date" class="reservation__error">
                            {{ errors.date }}
                        </span>
                    </div>
                    <div class="reservation__field">
                        <InputTime v-model="form.time" :selectedDate="form.date" label="Time*" placeholder="HH:mm"
                            minTime="09:00" maxTime="23:00" :step="1800" required />
                        <span v-if="errors.time" class="reservation__error">
                            {{ errors.time }}
                        </span>
                    </div>
                </div>

                <InputTextGuest v-model="form.selectedTables" label="Select Table" required />
                <span v-if="errors.selectedTables" class="reservation__error">
                    {{ errors.selectedTables }}
                </span>

                <div class="reservation__field reservation__row">
                    <div class="reservation__column">
                        <InputText v-model="form.firstName" label="First Name" type="text" required />
                        <span v-if="errors.firstName" class="reservation__error">
                            {{ errors.firstName }}
                        </span>
                    </div>
                    <div class="reservation__column">
                        <InputText v-model="form.lastName" label="Last Name" type="text" required />
                        <span v-if="errors.lastName" class="reservation__error">
                            {{ errors.lastName }}
                        </span>
                    </div>
                </div>

                <div class="reservation__row">
                    <div class="reservation__column">
                        <InputText v-model="form.email" label="Email" type="email" required />
                        <span v-if="errors.email" class="reservation__error">
                            {{ errors.email }}
                        </span>
                    </div>
                    <div class="reservation__column">
                        <InputText v-model="form.phone" label="Phone" type="tel" required />
                        <span v-if="errors.phone" class="reservation__error">
                            {{ errors.phone }}
                        </span>
                    </div>
                </div>

                <InputText v-model="form.comment" label="Comment" type="textarea" />

                <button type="submit" class="reservation__button"
                    :class="{ 'reservation__button--disabled': !isFormValid }" :disabled="!isFormValid">
                    BOOK NOW
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'
import { useReservationStore } from '@/stores/reservationStore'

import InputDate from '@/components/InputDate.vue'
import InputTime from '@/components/InputTime.vue'
import InputTextGuest from '../components/InputTextGuest.vue'
import InputText from '@/components/InputText.vue'

const reservationStore = useReservationStore()
const form = reservationStore.form
const errors = reservationStore.errors

// Computamos si el formulario es válido
const isFormValid = computed(() => {
    return Boolean(
        form.date &&
        form.time &&
        form.selectedTables.length > 0 &&
        form.firstName &&
        form.lastName &&
        form.email &&
        form.phone
    );
});

function submitReservation() {
    reservationStore.submitReservation()
}

watch(form, (newVal) => {
    console.log('Current form values:', newVal)
}, { deep: true })
</script>


<style lang="scss">
.reservation__error {
    color: red;
    font-size: 0.8em;
}

.reservation-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    @media (min-width: 768px) {
        background: url('../assets/ordders.png') center center / cover no-repeat;
        padding: 0;

        .reservation {
            border-radius: 0;
            width: 100%;
            margin: 0;
        }
    }

    @media (max-width: 767px) {
        background: none;
    }
}

.reservation {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;

    &__title {
        font-size: 2rem;
        text-align: center;
        color: #253e2c;
        margin-bottom: 1.5rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    &__row {
        display: flex;
        gap: 1.5rem;
        justify-content: space-between;

        >* {
            flex: 1;
        }

        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    &__button {
        background: #2c3e2e;
        color: #fff;
        padding: 1rem;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        width: 100%;
        transition: all 0.3s;

        &:hover {
            background: #223022;
        }

        /* Estilo para cuando el botón está deshabilitado */
        &--disabled {
            background: #a0a0a0;
            cursor: not-allowed;
            opacity: 0.7;

            &:hover {
                background: #a0a0a0;
                transform: none;
            }
        }
    }

    input,
    textarea {
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

    input::placeholder,
    textarea::placeholder {
        color: #999;
    }

    input:focus,
    textarea:focus {
        border-color: #2c3e2e;
    }

    textarea {
        min-height: 120px;
        resize: vertical;
    }
}
</style>