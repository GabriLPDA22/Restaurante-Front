<template>
    <div class="profile-container">
        <div class="profile-wrapper">
            <div class="profile-header">
                <h1>
                    <i class="fas fa-user-circle"></i>
                    My Profile
                </h1>
            </div>

            <div class="profile-content">
                <!-- Notificación -->
                <div v-if="notificacion.visible" :class="['notification', notificacion.tipo]">
                    <i :class="getNotificationIcon(notificacion.tipo)"></i>
                    {{ notificacion.mensaje }}
                </div>

                <!-- Información Personal -->
                <div class="profile-section profile-info">
                    <div class="section-header">
                        <h2>Información Personal</h2>
                        <button v-if="!estadoEdicion.info" class="btn-edit"
                            @click="activarEdicion('info')">EDITAR</button>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>NOMBRE</label>
                            <p v-if="!estadoEdicion.info">{{ infoPersonal.nombre || 'No especificado' }}</p>
                            <input v-else v-model="infoPersonal.nombre" type="text" />
                        </div>
                        <div class="info-item">
                            <label>CORREO ELECTRÓNICO</label>
                            <p v-if="!estadoEdicion.info">{{ infoPersonal.email || 'No especificado' }}</p>
                            <input v-else v-model="infoPersonal.email" type="text" disabled />
                        </div>
                        <div class="info-item">
                            <label>TELÉFONO</label>
                            <p v-if="!estadoEdicion.info">{{ infoPersonal.telefono || 'No especificado' }}</p>
                            <input v-else v-model="infoPersonal.telefono" type="text" />
                        </div>
                        <div class="info-item">
                            <label>FECHA DE NACIMIENTO</label>
                            <p v-if="!estadoEdicion.info">{{ formatearFecha(infoPersonal.fechaNacimiento) ||
                                'No especificado' }}</p>
                            <input v-else v-model="infoPersonal.fechaNacimiento" type="text" placeholder="DD/MM/AAAA" />
                        </div>
                    </div>
                </div>

                <!-- Botones de acción de edición -->
                <div v-if="estadoEdicion.info" class="edit-actions">
                    <button class="btn-secondary" @click="desactivarEdicion('info')">Cancel</button>
                    <button class="btn-primary" @click="guardarInformacion">Save</button>
                </div>

                <!-- Historial -->
                <div class="profile-section history-section">
                    <div class="section-header">
                        <h2>Mi Historial de Reservas</h2>
                    </div>

                    <!-- Contenido del Historial de Reservas -->
                    <div class="history-content">
                        <!-- Historial de Reservas -->
                        <div class="reservations-history">
                            <div v-if="loadingReservations" class="loading-state">
                                <div class="loading-spinner"></div>
                                <p>Cargando reservas...</p>
                            </div>

                            <div v-else-if="errorReservations" class="error-state">
                                <i class="fas fa-exclamation-circle"></i>
                                <p>{{ errorReservations }}</p>
                                <button @click="loadReservations" class="btn-retry">
                                    Reintentar
                                    <i class="fas fa-redo"></i>
                                </button>
                            </div>

                            <div v-else-if="!reservations.length" class="empty-state">
                                <i class="fas fa-calendar-xmark"></i>
                                <p>No tienes reservas en tu historial</p>
                            </div>

                            <div v-else class="reservations-list">
                                <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
                                    <div class="reservation-header">
                                        <span class="reservation-number">Reserva #{{ reservation.id }}</span>
                                        <span class="reservation-date">{{ formatDate(reservation.fecha) }}</span>
                                    </div>
                                    <div class="reservation-details">
                                        <div class="detail-item">
                                            <i class="fas fa-chair"></i>
                                            <span>Mesa {{ reservation.numeroMesa }}</span>
                                        </div>
                                        <div class="detail-item">
                                            <i class="fas fa-clock"></i>
                                            <span>{{ formatTime(reservation.fecha) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

// Obtenemos la store
const authStore = useAuthStore();

// Estado de edición
const estadoEdicion = ref({
    info: false
});

// Datos personales locales
const infoPersonal = ref({
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: ''
});

// Notificaciones
const notificacion = ref({
    visible: false,
    mensaje: '',
    tipo: 'success'
});

interface Reservation {
    id: number;
    fecha: string;
    numeroMesa: number;
}

const reservations = ref<Reservation[]>([]);
const loadingReservations = ref<boolean>(false);
const errorReservations = ref<string | null>(null);

// Formatear fecha para mostrar
const formatearFecha = (fecha: string | undefined): string => {
    if (!fecha) return '';

    // Si es formato ISO o YYYY-MM-DD
    if (typeof fecha === 'string' && fecha.includes('-') && fecha.split('-')[0].length === 4) {
        const parts = fecha.split('-');
        if (parts.length === 3) {
            return `${parts[2].split('T')[0]}/${parts[1]}/${parts[0]}`;
        }
    }

    return fecha;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const recargarUsuario = async (): Promise<void> => {
    mostrarNotificacion('Reload info of User...', 'info');
    await authStore.loadUser();
    loadUserData();
    mostrarNotificacion('Data reloaded', 'success');
};

onMounted(async () => {
    await authStore.loadUser();
    loadUserData();
    loadReservations();
});

// Función para cargar datos del usuario
const loadUserData = (): void => {
    if (authStore.user) {
        const user = authStore.user as any;

        // Intentar obtener el nombre (puede estar en cualquiera de las dos propiedades)
        infoPersonal.value.nombre = user.nombre || user.Nombre || '';

        // Intentar obtener el email
        infoPersonal.value.email = user.email || user.Email || '';

        // Intentar obtener el teléfono
        infoPersonal.value.telefono = user.telefono || user.Telefono || '';

        // Intentar obtener la fecha de nacimiento
        let fechaValue = user.fechaNacimiento || user.FechaNacimiento;

        // Formatear fecha si es necesario
        if (fechaValue) {
            if (typeof fechaValue === 'string' && fechaValue.includes('-') && fechaValue.split('-')[0].length === 4) {
                const parts = fechaValue.split('-');
                if (parts.length === 3) {
                    infoPersonal.value.fechaNacimiento = `${parts[2].split('T')[0]}/${parts[1]}/${parts[0]}`;
                } else {
                    infoPersonal.value.fechaNacimiento = fechaValue;
                }
            } else {
                infoPersonal.value.fechaNacimiento = String(fechaValue);
            }
        } else {
            infoPersonal.value.fechaNacimiento = '';
        }
    }
};

/* Métodos de edición */
const activarEdicion = (tipo: string): void => {
    estadoEdicion.value[tipo as keyof typeof estadoEdicion.value] = true;
};

const desactivarEdicion = (tipo: string): void => {
    estadoEdicion.value[tipo as keyof typeof estadoEdicion.value] = false;
    loadUserData(); // Restaurar valores originales
};

/* Guardar la info en el backend */
const guardarInformacion = async (): Promise<void> => {
    try {
        // Mostramos notificación de carga
        mostrarNotificacion('Guardando información...', 'info');

        // Preparamos los datos a enviar
        const datosActualizados = {
            nombre: infoPersonal.value.nombre,
            email: infoPersonal.value.email,
            telefono: infoPersonal.value.telefono,
            fechaNacimiento: infoPersonal.value.fechaNacimiento
        };

        console.log('Enviando datos para actualizar:', datosActualizados);

        // Llamamos a la store para actualizar
        const response = await authStore.updateUserProfile(datosActualizados);

        console.log('Respuesta de actualización:', response);

        if (response.success) {
            mostrarNotificacion('Información personal guardada correctamente', 'success');
            estadoEdicion.value.info = false;

            // Recargar los datos actualizados
            loadUserData();
        } else {
            mostrarNotificacion(response.message || 'Error al guardar la información', 'error');
        }
    } catch (error) {
        console.error('Error al guardar información:', error);
        mostrarNotificacion('Error inesperado al guardar la información', 'error');
    }
};

/* Notificaciones */
const mostrarNotificacion = (mensaje: string, tipo: string = 'success', duracion: number = 3000): void => {
    notificacion.value = { visible: true, mensaje, tipo };

    // Solo establecemos un temporizador para mensajes que no son de error
    if (tipo !== 'error') {
        setTimeout(() => {
            notificacion.value.visible = false;
        }, duracion);
    }
};

const getNotificationIcon = (tipo: string): string => {
    switch (tipo) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-bell';
    }
};

const loadReservations = async () => {
    loadingReservations.value = true;
    errorReservations.value = null;

    try {
        const userId = getUserId();
        console.log(`Cargando reservas para el usuario ID: ${userId}`);
        const response = await axios.get(`http://localhost:5021/api/Historial/reservas/usuario/${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Respuesta de la API de reservas:', response.data);
        if (Array.isArray(response.data)) {
            const reservasTransformadas = response.data.map(reserva => {
                return {
                    id: reserva.Id || reserva.id || 0,
                    fecha: reserva.Fecha || reserva.fecha || '',
                    numeroMesa: reserva.NumeroMesa || reserva.numeroMesa || 0
                };
            });

            reservations.value = reservasTransformadas;

            if (reservasTransformadas.length === 0) {
                console.log('No se encontraron reservas en la respuesta');
                mostrarNotificacion('No tienes reservas pendientes', 'info');
            }
        } else {
            console.error('La respuesta no es un array:', response.data);
            throw new Error('La respuesta no tiene el formato esperado');
        }

        loadingReservations.value = false;
    } catch (err) {
        console.error('Error al cargar reservas:', err);
        errorReservations.value = `Error: ${err.message || 'No se pudieron cargar las reservas'}`;
        loadingReservations.value = false;
    }
};

const getUserId = () => {
    console.log('Datos del usuario en authStore:', authStore.user);

    let userId = null;

    if (authStore.user) {
        userId = authStore.user.UserID ||
            authStore.user.userId ||
            authStore.user.userID ||
            authStore.user.userid ||
            authStore.user.id ||
            authStore.user.Id;
        if (!userId && typeof authStore.user === 'object') {
            for (const key in authStore.user) {
                const value = authStore.user[key];
                if (
                    (key.toLowerCase().includes('id') && typeof value === 'number') ||
                    (key.toLowerCase().includes('id') && !isNaN(Number(value)))
                ) {
                    console.log(`Posible ID encontrado en ${key}:`, value);
                    userId = Number(value);
                    break;
                }
            }
        }
    }

    if (!userId) {
        console.warn('No se pudo encontrar un ID de usuario válido. Usando valor por defecto.');
    }

    return userId;
};
</script>

<style lang="scss">
// Variables
$color-gold: #D4B96A;
$color-dark: #0F1114;
$color-text: #E5E5E5;
$color-background: #121618;
$color-card: #1A1D20;
$color-light-card: #232529;
$font-primary: 'Cormorant Garamond', serif;
$font-secondary: 'Montserrat', sans-serif;

.profile-container {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem;
    font-family: $font-secondary;
    color: $color-text;

    .profile-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        background-color: $color-card;
        border-radius: 0.5rem;
        border: 1px solid rgba($color-gold, 0.1);

        .profile-header {
            background: $color-gold;
            color: $color-dark;
            padding: 2rem;

            h1 {
                font-family: $font-primary;
                font-size: 2rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                letter-spacing: 1px;

                i {
                    margin-right: 1rem;
                    font-size: 2rem;
                }
            }
        }

        .profile-content {
            padding: 2rem;
            display: grid;
            gap: 2rem;

            // Estilos para la notificación
            .notification {
                padding: 1rem;
                border-radius: 0.5rem;
                display: flex;
                align-items: center;

                i {
                    margin-right: 0.75rem;
                    font-size: 1.25rem;
                }

                &.success {
                    background-color: rgba(39, 174, 96, 0.2);
                    border: 1px solid #27AE60;
                    color: #2ECC71;
                }

                &.error {
                    background-color: rgba(231, 76, 60, 0.2);
                    border: 1px solid #E74C3C;
                    color: #F85D4B;
                }

                &.warning {
                    background-color: rgba(241, 196, 15, 0.2);
                    border: 1px solid #F1C40F;
                    color: #F1C40F;
                }

                &.info {
                    background-color: rgba(52, 152, 219, 0.2);
                    border: 1px solid #3498DB;
                    color: #3498DB;
                }
            }

            .profile-section {
                background-color: $color-light-card;
                border-radius: 0.5rem;
                padding: 1.5rem;
                border: 1px solid rgba($color-gold, 0.1);

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;

                    h2 {
                        font-family: $font-primary;
                        font-size: 1.5rem;
                        color: $color-gold;
                        letter-spacing: 0.5px;
                    }

                    .btn-edit {
                        background-color: transparent;
                        color: $color-gold;
                        border: 1px solid $color-gold;
                        padding: 0.5rem 1rem;
                        border-radius: 0.25rem;
                        font-weight: 500;
                        cursor: pointer;
                        text-transform: uppercase;
                        transition: all 0.3s ease;

                        &:hover {
                            background-color: $color-gold;
                            color: $color-dark;
                        }
                    }
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1.5rem;

                    .info-item {
                        label {
                            display: block;
                            color: rgba($color-text, 0.6);
                            font-size: 0.75rem;
                            margin-bottom: 0.5rem;
                            text-transform: uppercase;
                        }

                        p,
                        input {
                            color: $color-text;
                            font-size: 1rem;
                        }

                        input {
                            width: 100%;
                            padding: 0.5rem;
                            background-color: rgba($color-dark, 0.5);
                            border: 1px solid rgba($color-text, 0.5);
                            border-radius: 0.25rem;
                            color: $color-text;

                            &:focus {
                                outline: none;
                                border-color: $color-gold;
                                box-shadow: 0 0 0 2px rgba($color-gold, 0.3);
                            }

                            &:disabled {
                                opacity: 0.6;
                                cursor: not-allowed;
                            }
                        }
                    }
                }
            }

            .edit-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;

                .btn-primary,
                .btn-secondary {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background-color: $color-gold;
                    color: $color-dark;
                    border: none;

                    &:hover {
                        background-color: $color-gold;
                    }
                }

                .btn-secondary {
                    background-color: transparent;
                    border: 1px solid rgba($color-text, 0.5);
                    color: $color-text;

                    &:hover {
                        border-color: $color-text;
                        background-color: rgba($color-text, 0.1);
                    }
                }
            }

            // Sección de historial
            .history-section {

                // Estado de carga
                .loading-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;

                    .loading-spinner {
                        border: 4px solid rgba($color-gold, 0.1);
                        border-radius: 50%;
                        border-top: 4px solid $color-gold;
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }

                        100% {
                            transform: rotate(360deg);
                        }
                    }
                }

                // Estado de error
                .error-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    color: #EF4444;

                    i {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                    }

                    .btn-retry {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        background-color: rgba(#EF4444, 0.1);
                        color: #EF4444;
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.25rem;
                        border: 1px solid #EF4444;
                        cursor: pointer;
                        margin-top: 1rem;

                        &:hover {
                            background-color: rgba(#EF4444, 0.2);
                        }
                    }
                }

                // Estado vacío
                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem;
                    color: rgba($color-text, 0.6);

                    i {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                    }
                }

                // Estilos para reservas
                .reservations-list {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;

                    .reservation-card {
                        background-color: rgba($color-dark, 0.5);
                        border-radius: 0.5rem;
                        overflow: hidden;
                        border: 1px solid rgba($color-gold, 0.1);
                        transition: transform 0.2s;

                        &:hover {
                            transform: translateY(-4px);
                            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
                        }

                        .reservation-header {
                            background-color: $color-dark;
                            padding: 1rem;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid rgba($color-gold, 0.1);

                            .reservation-number {
                                font-weight: 600;
                                color: $color-gold;
                                font-family: $font-primary;
                            }

                            .reservation-date {
                                color: rgba($color-text, 0.7);
                                font-size: 0.9rem;
                            }
                        }

                        .reservation-details {
                            padding: 1.25rem;

                            .detail-item {
                                display: flex;
                                align-items: center;
                                margin-bottom: 0.75rem;

                                i {
                                    color: $color-gold;
                                    margin-right: 0.75rem;
                                    width: 20px;
                                    text-align: center;
                                }

                                &:last-child {
                                    margin-bottom: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>