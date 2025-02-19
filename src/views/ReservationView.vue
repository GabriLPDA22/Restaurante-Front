<template>
    <!-- Contenedor general que controlará el fondo en escritorio -->
    <div class="reservation-container">
        <div class="reservation">
            <h2 class="reservation__title">Reservation</h2>
            <form class="reservation__form" @submit.prevent="submitReservation">
                <!-- FILA: Date y Time -->
                <div class="reservation__row">
                    <InputDate v-model="form.date" label="Date*" />
                    <InputTime v-model="form.time" label="Time*" />
                </div>

                <!-- Guests -->
                <InputText v-model="form.guests" label="Guest*" type="number" />

                <!-- FILA: First Name y Last Name -->
                <div class="reservation__row">
                    <InputText v-model="form.firstName" label="First Name" type="text" />
                    <InputText v-model="form.lastName" label="Last Name" type="text" />
                </div>

                <!-- FILA: Email y Phone -->
                <div class="reservation__row">
                    <InputText v-model="form.email" label="Email" type="email" />
                    <InputText v-model="form.phone" label="Phone" type="tel" />
                </div>

                <!-- Comment -->
                <InputText v-model="form.comment" label="Comment" type="textarea" />

                <!-- Botón -->
                <button type="submit" class="reservation__button">BOOK NOW</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Ajusta las rutas de tus componentes personalizados
import InputDate from '@/components/InputDate.vue'
import InputTime from '@/components/InputTime.vue'
import InputText from '@/components/InputText.vue'

const form = ref({
    date: '',
    time: '',
    guests: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: ''
})

const submitReservation = () => {
    console.log('Reservation submitted', form.value)
    // Aquí tu lógica de envío (API, etc.)
}
</script>

<style lang="scss">
/* 
    1. Contenedor principal (fondo solo en escritorio).
    2. Centramos el formulario vertical/horizontalmente.
  */
.reservation-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    /* Fondo de imagen solo en escritorio (>=768px) */
    @media (min-width: 768px) {
        background: url('../assets/ordders.png') center center / cover no-repeat;
        padding: 0;

        .reservation {
            border-radius: 0;
            width: 100%;
            margin: 0;
        }
    }

    /* En móvil (<=767px), sin fondo */
    @media (max-width: 767px) {
        background: none;
    }
}

/* 
    El formulario como "tarjeta" encima del fondo.
    Ajusta colores y transparencias a tu gusto.
  */
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
        /* Verde oscuro (aprox.) */
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

        /* En pantallas pequeñas, cada input en su propia fila */
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }

    &__button {
        background: #2c3e2e;
        /* Botón verde oscuro */
        color: #fff;
        padding: 1rem;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        width: 100%;
        transition: background 0.3s;

        &:hover {
            background: #223022;
        }
    }

    /* Inputs y textarea (si tus componentes no llevan estilos propios) */
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