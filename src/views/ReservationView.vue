<template>
    <div class="reservation-container">
        <div class="reservation">
            <h2 class="reservation__title">Reservation</h2>
            <form class="reservation__form" @submit.prevent="submitReservation">
                <div class="reservation__row">
                    <div class="reservation__field">
                        <InputDate v-model="form.date" label="Date*" required />
                        <span v-if="errors.date" class="reservation__error">{{ errors.date }}</span>
                    </div>
                    <div class="reservation__field">
                        <InputTime v-model="form.time" label="Time*" required />
                        <span v-if="errors.time" class="reservation__error">{{ errors.time }}</span>
                    </div>
                </div>

                <InputTextGuest v-model="form.guests" label="Guest" type="number" required />
                <span v-if="errors.guests" class="reservation__error">{{ errors.guests }}</span>

                <div class="reservation__field reservation__row">
                    <div class="reservation__column">
                        <InputText v-model="form.firstName" label="First Name" type="text" required />
                        <span v-if="errors.firstName" class="reservation__error">{{ errors.firstName }}</span>
                    </div>
                    <div class="reservation__column">
                        <InputText v-model="form.lastName" label="Last Name" type="text" required />
                        <span v-if="errors.lastName" class="reservation__error">{{ errors.lastName }}</span>
                    </div>
                </div>

                <div class="reservation__row">
                    <div class="reservation__column">
                        <InputText v-model="form.email" label="Email" type="email" required />
                        <span v-if="errors.email" class="reservation__error">{{ errors.email }}</span>
                    </div>
                    <div class="reservation__column">
                        <InputText v-model="form.phone" label="Phone" type="tel" required />
                        <span v-if="errors.phone" class="reservation__error">{{ errors.phone }}</span>
                    </div>
                </div>

                <InputText v-model="form.comment" label="Comment" type="textarea" />

                <button type="submit" class="reservation__button">BOOK NOW</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import InputDate from '@/components/InputDate.vue'
import InputTime from '@/components/InputTime.vue'
import InputTextGuest from '@/components/InputTextGuest.vue'
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

const errors = ref({})

const validateForm = () => {
    errors.value = {}

    if (!form.value.date) errors.value.date = "Date required."
    if (!form.value.time) errors.value.time = "Time required."
    if (!form.value.guests) errors.value.guests = "Guest required."
    if (!form.value.firstName) errors.value.firstName = "First Name required."
    if (!form.value.lastName) errors.value.lastName = "Last Name required."
    if (!form.value.email) errors.value.email = "Email required."
    if (!form.value.phone) errors.value.phone = "Phone required."

    return Object.keys(errors.value).length === 0
}

const submitReservation = () => {
    if (validateForm()) {
        const reservationData = {
            id: 0,
            dateTime: new Date().toISOString(),
            customerName: `${form.value.firstName} ${form.value.lastName}`,
            tableId: parseInt(form.value.guests) // Parse the guests field as an integer

        }

        console.log('Reservation Data:', reservationData) // Add this line to log the reservation data

        fetch('http://localhost:5021/api/Reservations', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', // Set the Accept header to application/json
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
            .then(response => {
                if (response.ok) {
                    alert('Reservation submitted successfully!')
                } else {
                    alert('Failed to submit reservation.')
                }
            })
            .catch(error => {
                console.error('Error submitting reservation:', error)
                alert('An error occurred while submitting the reservation.')
            })
    } else {
        alert('Please fill in all required fields.')
    }
}
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
        transition: background 0.3s;

        &:hover {
            background: #223022;
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
