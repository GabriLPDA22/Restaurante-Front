<template>
    <div class="profile-container">
        <div class="profile-wrapper">
            <div class="profile-header">
                <h1>
                    <i class="fas fa-user-circle"></i>
                    Mi Perfil
                </h1>
            </div>

            <div class="profile-content">
                <!-- Información Personal -->
                <div class="profile-section profile-info">
                    <div class="section-header">
                        <h2>Información Personal</h2>
                        <button v-if="!estadoEdicion.info" class="btn-edit" @click="activarEdicion('info')">EDITAR</button>
                    </div>
                    <div class="info-grid">
                        <div class="info-item" v-for="(valor, campo) in infoPersonal" :key="campo">
                            <label>{{ campo.toUpperCase().replace('_', ' ') }}</label>
                            <p v-if="!estadoEdicion.info">{{ valor }}</p>
                            <input v-else v-model="infoPersonal[campo]" type="text" />
                        </div>
                    </div>
                    <div v-if="estadoEdicion.info" class="edit-actions">
                        <button class="btn-secondary" @click="desactivarEdicion('info')">Cancelar</button>
                        <button class="btn-primary" @click="guardarInformacion">Guardar</button>
                    </div>
                </div>

                <!-- Notificación -->
                <div v-if="notificacion.visible" :class="['notification', notificacion.tipo]">
                    <i :class="getNotificationIcon(notificacion.tipo)"></i>
                    {{ notificacion.mensaje }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Estado de edición centralizado
const estadoEdicion = ref({
    info: false
})

// Datos personales
const infoPersonal = ref({
    nombre: 'Juan Pérez Martínez',
    email: 'juan.perez@ejemplo.com',
    telefono: '+54 11 1234 5678',
    fechaNacimiento: '15 de Mayo, 1985'
})

// Notificaciones
const notificacion = ref({
    visible: false,
    mensaje: '',
    tipo: 'success' // success, error, warning, info
})

// Métodos
const activarEdicion = (tipo: string) => {
    estadoEdicion.value[tipo] = true;
}

const desactivarEdicion = (tipo: string) => {
    estadoEdicion.value[tipo] = false;
}

const guardarInformacion = () => {
    estadoEdicion.value.info = false;
    mostrarNotificacion('Información personal guardada correctamente');
}

const mostrarNotificacion = (mensaje: string, tipo: string = 'success', duracion: number = 3000) => {
    notificacion.value = { visible: true, mensaje, tipo };
    setTimeout(() => {
        notificacion.value.visible = false;
    }, duracion);
}

const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        case 'info': return 'fas fa-info-circle';
        default: return 'fas fa-bell';
    }
}
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
            background: linear-gradient(to right, $color-gold);
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

                        p, input {
                            color: $color-text;
                            font-size: 1rem;
                        }

                        input {
                            width: 100%;
                            padding: 0.5rem;
                            background-color: transparent;
                            border: 1px solid rgba($color-text, 0.5);
                            border-radius: 0.25rem;
                        }
                    }
                }

                .edit-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 1rem;

                    .btn-primary, .btn-secondary {
                        padding: 0.75rem 1.5rem;
                        border-radius: 0.5rem;
                        font-weight: 600;
                        cursor: pointer;
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
            }
        }
    }
}
</style>
