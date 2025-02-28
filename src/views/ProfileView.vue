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
                <div class="profile-section profile-info">
                    <div class="section-header">
                        <h2>Información Personal</h2>
                        <button class="btn-edit" @click="editarInformacion">
                            EDITAR
                        </button>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>NOMBRE COMPLETO</label>
                            <p>Juan Pérez Martínez</p>
                        </div>
                        <div class="info-item">
                            <label>CORREO ELECTRÓNICO</label>
                            <p>juan.perez@ejemplo.com</p>
                        </div>
                        <div class="info-item">
                            <label>TELÉFONO</label>
                            <p>+54 11 1234 5678</p>
                        </div>
                        <div class="info-item">
                            <label>FECHA DE NACIMIENTO</label>
                            <p>15 de Mayo, 1985</p>
                        </div>
                    </div>
                </div>

                <div class="profile-section profile-addresses">
                    <div class="section-header">
                        <h2>Mis Direcciones</h2>
                        <button class="btn-add" @click="agregarDireccion">
                            AGREGAR
                        </button>
                    </div>
                    <div class="addresses-grid">
                        <div class="address-card" v-for="(direccion, index) in direcciones" :key="index">
                            <div v-if="direccion.principal" class="address-badge primary">PRINCIPAL</div>
                            <div class="address-content">
                                <h3>{{ direccion.nombre }}</h3>
                                <p class="address-street">{{ direccion.calle }}</p>
                                <p class="address-city">{{ direccion.ciudad }}</p>
                                <p class="address-postal">{{ direccion.codigoPostal }}</p>
                            </div>
                            <div class="address-actions">
                                <button class="btn-icon" @click="editarDireccion(index)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn-icon" @click="eliminarDireccion(index)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-section profile-payment">
                    <div class="section-header">
                        <h2>Métodos de Pago</h2>
                        <button class="btn-add" @click="agregarMetodoPago">
                            AGREGAR
                        </button>
                    </div>
                    <div class="payment-grid">
                        <div class="payment-card" v-for="(metodo, index) in metodosPago" :key="index">
                            <div class="payment-logo" :class="metodo.tipo.toLowerCase()">
                                <i :class="getIconoTarjeta(metodo.tipo)"></i>
                            </div>
                            <div class="payment-content">
                                <h3>{{ metodo.nombre }}</h3>
                                <p v-if="metodo.vencimiento" class="payment-expiry">Vence: {{ metodo.vencimiento }}</p>
                                <p v-if="metodo.titular" class="payment-name">{{ metodo.titular }}</p>
                                <p v-if="metodo.email" class="payment-email">{{ metodo.email }}</p>
                            </div>
                            <div v-if="metodo.predeterminado" class="payment-badge default">PREDETERMINADA</div>
                            <div class="payment-actions">
                                <button class="btn-icon" @click="editarMetodoPago(index)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn-icon" @click="eliminarMetodoPago(index)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-section profile-preferences">
                    <div class="section-header">
                        <h2>Preferencias</h2>
                    </div>
                    <div class="preferences-list">
                        <div class="preference-item" v-for="(preferencia, index) in preferencias" :key="index">
                            <div>
                                <h3>{{ preferencia.titulo }}</h3>
                                <p>{{ preferencia.descripcion }}</p>
                            </div>
                            <label class="toggle">
                                <input type="checkbox" v-model="preferencia.activo"
                                    @change="cambiarPreferencia(index)" />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="profile-actions">
                    <button class="btn-secondary" @click="cerrarSesion">Cerrar Sesión</button>
                    <button class="btn-primary" @click="guardarCambios">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue'

defineComponent({
    name: 'ProfileView',
})

const direcciones = ref([
    {
        nombre: 'Casa',
        calle: 'Av. Siempre Viva 742',
        ciudad: 'Buenos Aires, Argentina',
        codigoPostal: 'C.P. 1001',
        principal: true
    },
    {
        nombre: 'Oficina',
        calle: 'Calle Falsa 123',
        ciudad: 'CABA, Argentina',
        codigoPostal: 'C.P. 1425',
        principal: false
    }
])

const metodosPago = ref([
    {
        tipo: 'Visa',
        nombre: 'Visa terminada en 1234',
        vencimiento: '12/26',
        titular: 'Juan Pérez Martínez',
        predeterminado: true
    },
    {
        tipo: 'PayPal',
        nombre: 'PayPal',
        email: 'juan.perez@ejemplo.com',
        predeterminado: false
    }
])

const preferencias = ref([
    {
        titulo: 'Recibir notificaciones por correo',
        descripcion: 'Mantente informado sobre nuevas promociones y eventos',
        activo: true
    },
    {
        titulo: 'Recordar mi información de pago',
        descripcion: 'Para un proceso de pago más rápido',
        activo: false
    }
])

const editarInformacion = () => {
    alert('Editando información personal')
}

const agregarDireccion = () => {
    alert('Agregando nueva dirección')
}

const editarDireccion = (index) => {
    alert(`Editando dirección: ${direcciones.value[index].nombre}`)
}

const eliminarDireccion = (index) => {
    if (confirm(`¿Estás seguro de eliminar la dirección: ${direcciones.value[index].nombre}?`)) {
        direcciones.value.splice(index, 1)
    }
}

const agregarMetodoPago = () => {
    alert('Agregando nuevo método de pago')
}

const editarMetodoPago = (index) => {
    alert(`Editando método de pago: ${metodosPago.value[index].nombre}`)
}

const eliminarMetodoPago = (index) => {
    if (confirm(`¿Estás seguro de eliminar el método de pago: ${metodosPago.value[index].nombre}?`)) {
        metodosPago.value.splice(index, 1)
    }
}

const cambiarPreferencia = (index) => {
    const estado = preferencias.value[index].activo ? 'activada' : 'desactivada'
    console.log(`Preferencia "${preferencias.value[index].titulo}" ${estado}`)
}

const guardarCambios = () => {
    alert('Guardando cambios...')
}

const cerrarSesion = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        alert('Sesión cerrada')
    }
}

const getIconoTarjeta = (tipo) => {
    switch (tipo.toLowerCase()) {
        case 'visa': return 'fas fa-credit-card'
        case 'paypal': return 'fab fa-paypal'
        default: return 'fas fa-credit-card'
    }
}
</script>

<style lang="scss">
// Variables - Elixium Foods color scheme
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
        overflow: hidden;
        border: 1px solid rgba($color-gold, 0.1);

        .profile-header {
            background: linear-gradient(to right, darken($color-gold, 15%), $color-gold);
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
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid rgba($color-gold, 0.2);

                    h2 {
                        font-family: $font-primary;
                        font-size: 1.5rem;
                        font-weight: 500;
                        color: $color-gold;
                        letter-spacing: 0.5px;
                    }

                    .btn-edit,
                    .btn-add {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: transparent;
                        color: $color-gold;
                        border: 1px solid $color-gold;
                        padding: 0.5rem 1rem;
                        border-radius: 0.25rem;
                        font-weight: 500;
                        transition: all 0.3s ease;
                        cursor: pointer;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        font-size: 0.75rem;

                        &:hover {
                            background-color: $color-gold;
                            color: $color-dark;
                        }
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
                        letter-spacing: 0.5px;
                    }

                    p {
                        color: $color-text;
                        font-weight: 500;
                        font-size: 1rem;
                    }
                }
            }

            .addresses-grid,
            .payment-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;

                .address-card,
                .payment-card {
                    position: relative;
                    background-color: rgba($color-dark, 0.5);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    border: 1px solid rgba($color-gold, 0.1);
                    transition: all 0.3s ease;

                    &:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                        border-color: rgba($color-gold, 0.3);
                    }

                    h3 {
                        color: $color-gold;
                        font-family: $font-primary;
                        font-weight: 500;
                        font-size: 1.25rem;
                        margin-bottom: 0.75rem;
                        letter-spacing: 0.5px;
                    }

                    p {
                        color: $color-text;
                        margin-bottom: 0.25rem;
                    }

                    .address-actions,
                    .payment-actions {
                        display: flex;
                        justify-content: flex-end;
                        gap: 0.5rem;
                        margin-top: 1rem;

                        .btn-icon {
                            background-color: rgba($color-dark, 0.7);
                            color: rgba($color-text, 0.7);
                            width: 2rem;
                            height: 2rem;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s ease;
                            border: none;
                            cursor: pointer;

                            &:hover {
                                background-color: rgba($color-gold, 0.1);
                                color: $color-gold;
                            }
                        }
                    }

                    .address-badge,
                    .payment-badge {
                        position: absolute;
                        top: 0.75rem;
                        right: 0.75rem;
                        padding: 0.25rem 0.5rem;
                        border-radius: 0.25rem;
                        font-size: 0.6rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        background-color: rgba($color-gold, 0.1);
                        color: $color-gold;
                        border: 1px solid rgba($color-gold, 0.3);
                    }
                }
            }

            .payment-card {
                display: flex;
                align-items: flex-start;

                .payment-logo {
                    width: 3rem;
                    height: 3rem;
                    border-radius: 0.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 1rem;
                    font-size: 1.5rem;
                    color: white;

                    &.visa {
                        background: linear-gradient(135deg, #1A1F71, #436CAA);
                    }

                    &.paypal {
                        background: linear-gradient(135deg, #003087, #009cde);
                    }
                }

                .payment-content {
                    flex: 1;
                }
            }

            .preferences-list {
                display: grid;
                gap: 1rem;

                .preference-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.25rem;
                    background-color: rgba($color-dark, 0.5);
                    border-radius: 0.5rem;
                    border: 1px solid rgba($color-gold, 0.1);
                    transition: all 0.3s ease;

                    &:hover {
                        border-color: rgba($color-gold, 0.3);
                    }

                    h3 {
                        color: $color-gold;
                        font-weight: 500;
                        margin-bottom: 0.25rem;
                        font-family: $font-primary;
                        font-size: 1.15rem;
                    }

                    p {
                        color: rgba($color-text, 0.8);
                        font-size: 0.875rem;
                    }

                    .toggle {
                        position: relative;
                        display: inline-block;
                        width: 3.5rem;
                        height: 1.75rem;

                        input {
                            opacity: 0;
                            width: 0;
                            height: 0;

                            &:checked+.toggle-slider {
                                background-color: $color-gold;
                            }

                            &:checked+.toggle-slider:before {
                                transform: translateX(1.75rem);
                            }
                        }

                        .toggle-slider {
                            position: absolute;
                            cursor: pointer;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-color: rgba($color-text, 0.3);
                            transition: .4s;
                            border-radius: 34px;

                            &:before {
                                position: absolute;
                                content: "";
                                height: 1.25rem;
                                width: 1.25rem;
                                left: 0.25rem;
                                bottom: 0.25rem;
                                background-color: $color-text;
                                transition: .4s;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }

            .profile-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1rem;

                .btn-primary,
                .btn-secondary {
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                }

                .btn-primary {
                    background-color: $color-gold;
                    color: $color-dark;
                    border: none;

                    &:hover {
                        background-color: darken($color-gold, 10%);
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

@media (max-width: 768px) {
    .profile-container {
        padding: 1rem;

        .profile-wrapper {
            .profile-content {
                padding: 1.5rem;

                .info-grid,
                .addresses-grid,
                .payment-grid {
                    grid-template-columns: 1fr;
                }

                .preference-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;

                    .toggle {
                        align-self: flex-start;
                    }
                }

                .profile-actions {
                    flex-direction: column-reverse;

                    button {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>