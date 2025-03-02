<template>
    <div class="thank-you">
        <div class="thank-you__wrapper">
            <div class="thank-you__header">
                <h1>¡Gracias por tu pedido!</h1>
                <p>Tu pedido ha sido confirmado correctamente</p>
            </div>

            <div class="thank-you__content">
                <div class="thank-you__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>

                <div class="thank-you__message">
                    <p v-if="orderData">
                        <strong>{{ orderData.customerName }}</strong>, te confirmamos que hemos recibido tu pedido #{{
                        orderData.orderNumber }}.
                    </p>
                    <p>Te enviaremos un email con los detalles a tu correo electrónico.</p>
                </div>

                <div v-if="orderData" class="thank-you__order-summary">
                    <h2>Resumen del pedido</h2>

                    <div class="order-details">
                        <div class="order-detail-row">
                            <span>Fecha:</span>
                            <span>{{ formatDate(orderData.date) }}</span>
                        </div>
                        <div class="order-detail-row">
                            <span>Productos:</span>
                            <span>{{ orderData.totalItems }}</span>
                        </div>
                        <div class="order-detail-row total">
                            <span>Total:</span>
                            <span>€{{ orderData.total.toFixed(2) }}</span>
                        </div>
                    </div>
                </div>

                <div class="thank-you__actions">
                    <button @click="goToOrders" class="btn-secondary">
                        Ver mis pedidos
                    </button>
                    <button @click="goToHome" class="btn-primary">
                        Volver al inicio
                    </button>
                </div>

                <div class="thank-you__redirect-message">
                    <p>Serás redirigido automáticamente a la página principal en {{ countdown }} segundos...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

interface OrderInfo {
    customerName: string;
    totalItems: number;
    total: number;
    date: string;
    orderNumber: number;
    items?: OrderItem[];
}

export default defineComponent({
    name: 'ThanksView',
    setup() {
        const router = useRouter();
        const countdown = ref(10); // Contador de 10 segundos
        const orderData = ref<OrderInfo | null>(null);
        let countdownInterval: number | null = null;

        // Función para volver a la página principal
        const goToHome = () => {
            router.push('/');
        };

        // Función para ir a la página de pedidos
        const goToOrders = () => {
            router.push('/orders');
        };

        // Formatear fecha
        const formatDate = (dateString: string) => {
            if (!dateString) return '';

            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };

        // Al montar el componente
        onMounted(() => {
            // Obtener datos del pedido del localStorage
            const savedData = localStorage.getItem('lastOrder');
            if (savedData) {
                try {
                    orderData.value = JSON.parse(savedData);
                    console.log('Datos de pedido cargados:', orderData.value);
                } catch (e) {
                    console.error('Error parsing order data:', e);
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
            orderData,
            goToHome,
            goToOrders,
            formatDate
        };
    }
});
</script>

<style lang="scss" scoped>
.thank-you {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 1rem;

    &__wrapper {
        max-width: 800px;
        margin: 0 auto;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    &__header {
        background: #2B7A78;
        color: white;
        padding: 1.5rem;
        text-align: center;

        h1 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
        }

        p {
            opacity: 0.9;
            font-size: 1rem;
        }
    }

    &__content {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__icon {
        margin-bottom: 1.5rem;
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(43, 122, 120, 0.1);
        border-radius: 50%;

        svg {
            stroke: #2B7A78;
        }
    }

    &__message {
        text-align: center;
        margin-bottom: 2rem;

        p {
            margin-bottom: 0.75rem;
            font-size: 1rem;
            line-height: 1.6;
        }
    }

    &__order-summary {
        background-color: #e8f4f1;
        padding: 1.5rem;
        border-radius: 0.5rem;
        width: 100%;
        max-width: 500px;
        margin-bottom: 2rem;

        h2 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #2B7A78;
            font-weight: 600;
        }

        .order-details {
            .order-detail-row {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);

                &:last-child {
                    border-bottom: none;
                }

                &.total {
                    font-weight: bold;
                    font-size: 1.1rem;
                    margin-top: 0.5rem;
                    color: #2B7A78;
                }
            }
        }
    }

    &__actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;

        @media (max-width: 576px) {
            flex-direction: column;
        }

        button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.25rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;

            @media (max-width: 576px) {
                width: 100%;
            }
        }

        .btn-secondary {
            background-color: #f1f1f1;
            color: #2B7A78;
            border: 1px solid #2B7A78;

            &:hover {
                background-color: #e4e4e4;
            }
        }

        .btn-primary {
            background-color: #2B7A78;
            color: white;

            &:hover {
                background-color: darken(#2B7A78, 10%);
            }
        }
    }

    &__redirect-message {
        font-size: 0.9rem;
        color: #6c757d;
        text-align: center;
    }
}
</style>