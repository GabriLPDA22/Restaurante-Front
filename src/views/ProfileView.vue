<template>
    <div class="perfil-container">
        <div class="perfil-wrapper">
            <div class="perfil-header">
                <h1>
                    <i class="icon-user"></i>
                    Mi Perfil
                </h1>
            </div>

            <div class="perfil-content">
                <div class="perfil-personal">
                    <h2>Información Personal</h2>
                    <div class="perfil-item">
                        <label>Nombre Completo</label>
                        <p>Juan Pérez Martínez</p>
                    </div>
                    <div class="perfil-item">
                        <label>Correo Electrónico</label>
                        <p>juan.perez@ejemplo.com</p>
                    </div>
                    <div class="perfil-item">
                        <label>Teléfono</label>
                        <p>+54 11 1234 5678</p>
                    </div>
                </div>

                <div class="perfil-direcciones">
                    <h2>Mis Direcciones</h2>
                    <div class="direccion-item">
                        <h3>Dirección Principal</h3>
                        <p>Av. Siempre Viva 742</p>
                        <p>Buenos Aires, Argentina</p>
                    </div>
                    <div class="direccion-item">
                        <h3>Dirección de Envío</h3>
                        <p>Calle Falsa 123</p>
                        <p>CABA, Argentina</p>
                    </div>
                </div>

                <div class="perfil-pagos">
                    <h2>Métodos de Pago</h2>
                    <div class="pagos-grid">
                        <div class="pago-item">
                            <div class="pago-header">
                                <h3>Tarjeta de Crédito</h3>
                                <span class="editar">Editar</span>
                            </div>
                            <div class="pago-detalle">
                                <i class="icon-credit-card"></i>
                                <div>
                                    <p>**** **** **** 1234</p>
                                    <p class="expiracion">Vence 12/26</p>
                                </div>
                            </div>
                        </div>
                        <div class="pago-item">
                            <div class="pago-header">
                                <h3>PayPal</h3>
                                <span class="editar">Editar</span>
                            </div>
                            <div class="pago-detalle">
                                <i class="icon-paypal"></i>
                                <p>juan.perez@ejemplo.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="perfil-acciones">
                    <button class="btn-cancelar">Cancelar</button>
                    <button class="btn-guardar">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
    name: 'ProfileView',
})
</script>

<style lang="scss">
$color-primary: #3B82F6;
$color-secondary: #10B981;
$color-background: #F3F4F6;
$color-text-dark: #1F2937;
$color-text-light: #6B7280;

.perfil-container {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem;

    .perfil-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .perfil-header {
            background: linear-gradient(to right, $color-primary, darken($color-primary, 10%));
            color: white;
            padding: 1.5rem;
            display: flex;
            align-items: center;

            h1 {
                font-size: 1.5rem;
                font-weight: bold;
                display: flex;
                align-items: center;

                .icon-user {
                    margin-right: 1rem;
                }
            }
        }

        .perfil-content {
            padding: 2rem;
            display: grid;
            gap: 2rem;

            h2 {
                font-size: 1.25rem;
                font-weight: semibold;
                border-bottom: 2px solid $color-background;
                padding-bottom: 0.5rem;
                margin-bottom: 1rem;
                color: $color-text-dark;
            }

            .perfil-personal,
            .perfil-direcciones {
                background-color: $color-background;
                border-radius: 0.75rem;
                padding: 1.5rem;

                .perfil-item,
                .direccion-item {
                    background-color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

                    label {
                        color: $color-text-light;
                        font-size: 0.875rem;
                        margin-bottom: 0.5rem;
                        display: block;
                    }

                    p {
                        color: $color-text-dark;
                        font-weight: medium;
                    }
                }
            }

            .perfil-pagos {
                .pagos-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;

                    .pago-item {
                        background-color: white;
                        border-radius: 0.75rem;
                        padding: 1.5rem;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

                        .pago-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 1rem;

                            h3 {
                                color: $color-text-dark;
                                font-weight: semibold;
                            }

                            .editar {
                                color: $color-primary;
                                cursor: pointer;
                                transition: color 0.3s;

                                &:hover {
                                    color: darken($color-primary, 10%);
                                }
                            }
                        }

                        .pago-detalle {
                            display: flex;
                            align-items: center;
                            gap: 1rem;

                            .expiracion {
                                color: $color-text-light;
                                font-size: 0.875rem;
                            }
                        }
                    }
                }
            }

            .perfil-acciones {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;

                .btn-cancelar,
                .btn-guardar {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: semibold;
                    transition: all 0.3s;
                }

                .btn-cancelar {
                    background-color: $color-background;
                    color: $color-text-dark;

                    &:hover {
                        background-color: darken($color-background, 5%);
                    }
                }

                .btn-guardar {
                    background-color: $color-primary;
                    color: white;

                    &:hover {
                        background-color: darken($color-primary, 10%);
                    }
                }
            }
        }
    }
}
</style>