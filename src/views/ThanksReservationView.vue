<template>
    <div class="thank-you">
        <div class="thank-you__container">
            <h1 class="thank-you__title">¡Gracias por tu reserva!</h1>

            <div class="thank-you__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none"
                    stroke="#223022" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            </div>

            <div class="thank-you__message">
                <p>Tu reserva ha sido confirmada correctamente.</p>
                <p v-if="reservationData">
                    <strong>{{ reservationData.customerName }}</strong>, te esperamos el día
                    <strong>{{ formatDate(reservationData.date) }}</strong> a las
                    <strong>{{ reservationData.time }}</strong> en
                    <strong>{{ getTableText(reservationData.tables) }}</strong>.
                </p>
            </div>

            <div class="thank-you__actions">
                <button @click="goToHome" class="thank-you__button">Volver al inicio</button>
            </div>

            <div class="thank-you__redirect-message">
                <p>Serás redirigido automáticamente a la página principal en {{ countdown }} segundos...</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

interface ReservationData {
    customerName: string;
    date: string;
    time: string;
    tables: number[];
}

export default defineComponent({
    name: 'ThanksView',
    setup() {
        const router = useRouter();
        const countdown = ref(10); // Contador de 10 segundos
        const reservationData = ref<ReservationData | null>(null);
        let countdownInterval: number | null = null;

        // Función para volver a la página principal
        const goToHome = () => {
            router.push('/');
        };

        // Formatear fecha (de YYYY-MM-DD a formato legible)
        const formatDate = (dateString: string) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };

        // Texto para las mesas (singular o plural)
        const getTableText = (tables: number[]) => {
            if (!tables || tables.length === 0) return '';

            if (tables.length === 1) {
                return `la mesa ${tables[0]}`;
            } else {
                return `las mesas ${tables.join(', ')}`;
            }
        };

        // Al montar el componente
        onMounted(() => {
            // Obtener datos de la reserva del localStorage
            const savedData = localStorage.getItem('lastReservation');
            if (savedData) {
                try {
                    reservationData.value = JSON.parse(savedData);
                } catch (e) {
                    console.error('Error parsing reservation data:', e);
                }
            }

            // Iniciar cuenta regresiva
            countdownInterval = window.setInterval(() => {
                countdown.value--;

                if (countdown.value <= 0) {
                    if (countdownInterval) {
                        clearInterval(countdownInterval);
                    }
                    goToHome();
                }
            }, 1000);
        });

        // Limpiar al desmontar
        onBeforeUnmount(() => {
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
        });

        return {
            countdown,
            reservationData,
            goToHome,
            formatDate,
            getTableText
        };
    }
});
</script>

<style lang="scss" scoped>
.thank-you {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;

    &__container {
        background-color: white;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        @media (min-width: 768px) {
            padding: 3rem;
        }
    }

    &__title {
        color: #223022;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;

        @media (min-width: 768px) {
            font-size: 2rem;
        }
    }

    &__icon {
        margin: 1.5rem auto;
        width: 64px;
        height: 64px;

        @media (min-width: 768px) {
            width: 80px;
            height: 80px;
        }

        svg {
            width: 100%;
            height: 100%;
            stroke: #223022;
        }
    }

    &__message {
        margin-bottom: 2rem;

        p {
            margin-bottom: 0.75rem;
            font-size: 1rem;
            line-height: 1.6;

            @media (min-width: 768px) {
                font-size: 1.1rem;
            }
        }
    }

    &__actions {
        margin-bottom: 1.5rem;
    }

    &__button {
        background-color: #223022;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;

        &:hover {
            background-color: #223022;
            transform: translateY(-2px);
        }
    }

    &__redirect-message {
        font-size: 0.9rem;
        color: #666;
        margin-top: 1.5rem;
    }
}
</style>