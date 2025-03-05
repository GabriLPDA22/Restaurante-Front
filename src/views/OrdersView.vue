<template>
    <div class="pedidos-container">
        <div class="pedidos-wrapper">
            <div class="pedidos-header">
                <div class="header-content">
                    <h1>
                        <i class="fas fa-shopping-bag"></i>
                        Mis Pedidos
                    </h1>
                    <div class="header-actions">
                        <div class="search-container">
                            <input type="text" placeholder="Buscar pedido" v-model="searchTerm"
                                @input="buscarPedidos" />
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="filter-container">
                            <button @click="toggleDropdown" class="filter-button">
                                {{ filtroSeleccionado }}
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div v-if="mostrarDropdown" class="dropdown-menu">
                                <div v-for="estado in estados" :key="estado" @click="seleccionarFiltro(estado)"
                                    class="dropdown-item">
                                    {{ estado }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="cargando" class="pedidos-loading">
                <div class="loading-spinner"></div>
                <p>Cargando tus pedidos...</p>
            </div>

            <div v-else-if="error" class="error-container">
                <i class="fas fa-exclamation-circle"></i>
                <p>{{ error }}</p>
                <button @click="cargarPedidos" class="btn-retry">
                    Reintentar
                    <i class="fas fa-redo"></i>
                </button>
            </div>

            <div v-else-if="!pedidosFiltrados || pedidosFiltrados.length === 0" class="no-pedidos">
                <i class="fas fa-search"></i>
                <p v-if="searchTerm">No se encontraron pedidos que coincidan con tu búsqueda</p>
                <p v-else>Aún no has realizado ningún pedido</p>
                <button @click="cargarPedidos" class="btn-retry margin-top">
                    Recargar Pedidos
                    <i class="fas fa-redo"></i>
                </button>
                <button @click="depurarPedidos" class="btn-debug margin-top">
                    Diagnosticar Problema
                    <i class="fas fa-bug"></i>
                </button>
            </div>

            <div v-else class="pedidos-content">
                <div v-for="pedido in pedidosFiltrados" :key="pedido.IdPedidos || 'temp-' + Math.random()"
                    class="pedido-item">
                    <div class="pedido-header">
                        <div class="pedido-info">
                            <span class="pedido-numero">Pedido #{{ pedido.IdPedidos || 'Nuevo' }}</span>
                            <span class="pedido-fecha">{{ formatearFecha(pedido.Fecha) }}</span>
                        </div>
                        <span :class="`pedido-estado ${getEstadoClase(pedido.Estado || 'Preparando')}`">
                            {{ pedido.Estado || 'Preparando' }}
                        </span>
                    </div>

                    <div class="pedido-detalle">
                        <div v-if="pedido.Items && pedido.Items.length > 0" class="productos-lista">
                            <h3>Productos</h3>
                            <div v-for="(producto, index) in pedido.Items" :key="index" class="producto-item"
                                @click="verDetalleProducto(producto)">
                                <span class="producto-nombre">{{ producto.Nombre || `Producto ${producto.IdProducto}`
                                    }}</span>
                                <span class="producto-precio">{{ producto.Cantidad || 1 }} x {{
                                    formatearPrecio(producto.Precio || 0) }}</span>
                            </div>
                        </div>
                        <div v-else class="productos-lista">
                            <h3>Productos</h3>
                            <div class="producto-item">
                                <span class="producto-nombre">Información de productos no disponible</span>
                            </div>
                        </div>

                        <div class="pedido-resumen">
                            <div class="total-container">
                                <p class="total-label">Total</p>
                                <p class="total-monto">{{ formatearPrecio(pedido.Total || 0) }}</p>
                            </div>
                            <button class="btn-detalles" @click="verDetallePedido(pedido)">
                                Ver Detalles
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Detalles del Pedido -->
        <div v-if="mostrarModal && pedidoSeleccionado" class="modal-overlay">
            <div class="modal-container">
                <div class="modal-header">
                    <h2>Detalles del Pedido #{{ pedidoSeleccionado.IdPedidos }}</h2>
                    <button @click="cerrarModal" class="btn-cerrar">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="modal-content">
                    <div class="detalles-seccion">
                        <h3>Información General</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Fecha:</span>
                                <span class="info-value">{{ formatearFecha(pedidoSeleccionado.Fecha) }}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Estado:</span>
                                <span
                                    :class="`estado-badge ${getEstadoClase(pedidoSeleccionado.Estado || 'Preparando')}`">
                                    {{ pedidoSeleccionado.Estado || 'Preparando' }}
                                </span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">ID de Pedido:</span>
                                <span class="info-value">#{{ pedidoSeleccionado.IdPedidos }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detalles-seccion">
                        <h3>Productos</h3>
                        <table class="productos-tabla">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in pedidoSeleccionado.Items" :key="index">
                                    <td>{{ item.Nombre || `Producto ${item.IdProducto}` }}</td>
                                    <td>{{ item.Cantidad }}</td>
                                    <td>{{ formatearPrecio(item.Precio) }}</td>
                                    <td>{{ formatearPrecio(item.Cantidad * item.Precio) }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" class="total-label">Total</td>
                                    <td class="total-value">{{ formatearPrecio(pedidoSeleccionado.Total || 0) }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div class="modal-actions">
                        <button class="btn-secundario" @click="cerrarModal">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePedidoStore, Pedido } from '../stores/usePedidoStore';

// Estado local
const searchTerm = ref('');
const filtroSeleccionado = ref('Todos');
const mostrarDropdown = ref(false);
const estados = ['Todos', 'Entregado', 'En proceso', 'Preparando'];

// Estado del modal
const pedidoSeleccionado = ref<Pedido | null>(null);
const mostrarModal = ref(false);

// Store de pedidos
const pedidoStore = usePedidoStore();

// Acceder a las propiedades reactivas del store
const pedidos = computed(() => pedidoStore.pedidos);
const cargando = computed(() => pedidoStore.cargando);
const error = computed(() => pedidoStore.error);

// Filtrar pedidos
const pedidosFiltrados = computed<Pedido[]>(() => {
    if (!pedidos.value || !pedidos.value.length) return [];

    return pedidos.value.filter(pedido => {
        // Verificar si el pedido es válido
        if (!pedido) return false;

        const idPedido = String(pedido.IdPedidos || '');
        const productos = pedido.Items || [];

        const matchSearch =
            searchTerm.value === '' ||
            idPedido.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            productos.some(p => (p.Nombre || '').toLowerCase().includes(searchTerm.value.toLowerCase()));

        const estadoPedido = pedido.Estado || 'Preparando';
        const matchEstado =
            filtroSeleccionado.value === 'Todos' ||
            estadoPedido === filtroSeleccionado.value;

        return matchSearch && matchEstado;
    });
});

// Función de depuración para diagnóstico
function depurarPedidos() {
    console.log('=== DIAGNÓSTICO DE PEDIDOS ===');
    console.log('Estado del store de pedidos:');
    console.log('Pedidos cargados:', pedidos.value ? pedidos.value.length : 0);

    if (pedidos.value && pedidos.value.length > 0) {
        console.log('Primeros 2 pedidos:', JSON.stringify(pedidos.value.slice(0, 2), null, 2));

        // Verificar estructura de Items
        const primerPedido = pedidos.value[0];
        console.log('Estructura del primer pedido:', Object.keys(primerPedido));

        if (primerPedido.Items) {
            console.log('¿Items es un array?', Array.isArray(primerPedido.Items));
            console.log('Cantidad de Items:', primerPedido.Items.length);

            if (primerPedido.Items.length > 0) {
                console.log('Estructura del primer Item:', Object.keys(primerPedido.Items[0]));
            }
        } else {
            console.log('No se encontraron Items en el pedido');

            // Buscar propiedades que puedan contener los items
            const posiblesItems = Object.keys(primerPedido).filter(k =>
                k.toLowerCase().includes('item') ||
                k.toLowerCase().includes('detalle') ||
                k.toLowerCase().includes('producto')
            );

            if (posiblesItems.length > 0) {
                console.log('Posibles propiedades que contienen items:', posiblesItems);
            }
        }
    } else {
        console.log('No hay pedidos cargados en el store');
    }

    console.log('Pedidos filtrados:', pedidosFiltrados.value ? pedidosFiltrados.value.length : 0);
    console.log('Estado de carga:', cargando.value);
    console.log('Error:', error.value);
    console.log('Debug info:', pedidoStore.debugInfo);

    // Intenta recargar los pedidos
    console.log('Intentando recargar pedidos...');
    cargarPedidos();
}

// Cargar pedidos al montar
onMounted(async () => {
    console.log('Cargando pedidos en OrderView');
    await cargarPedidos();

    // Si no hay pedidos después de cargar, hacer diagnóstico automático
    if (!pedidos.value || pedidos.value.length === 0) {
        console.log('No se encontraron pedidos después de la carga inicial. Ejecutando diagnóstico...');
        depurarPedidos();
    }
});

// Función para cargar pedidos con diagnóstico
async function cargarPedidos() {
    let intentos = 0;
    const maxIntentos = 2;

    while (intentos < maxIntentos) {
        try {
            const resultado = await pedidoStore.obtenerPedidosUsuario();
            console.log(`Se cargaron ${resultado.length} pedidos en el intento ${intentos + 1}`);

            if (resultado.length > 0) {
                // Si tenemos pedidos, salir del bucle
                break;
            } else {
                console.log(`No se encontraron pedidos en la respuesta (intento ${intentos + 1}/${maxIntentos})`);
                intentos++;

                if (intentos < maxIntentos) {
                    // Esperar brevemente antes de reintentar
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        } catch (err) {
            console.error(`Error al cargar pedidos (intento ${intentos + 1}/${maxIntentos}):`, err);
            intentos++;

            if (intentos < maxIntentos) {
                // Esperar antes de reintentar
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
}

// Funciones para el modal
function verDetallePedido(pedido: Pedido) {
    console.log(`Ver detalles completos del pedido #${pedido.IdPedidos}`);
    pedidoSeleccionado.value = pedido;
    mostrarModal.value = true;
}

function cerrarModal() {
    mostrarModal.value = false;
    pedidoSeleccionado.value = null;
}

// Funciones auxiliares
function buscarPedidos() {
    console.log(`Buscando: ${searchTerm.value}`);
}

function toggleDropdown() {
    mostrarDropdown.value = !mostrarDropdown.value;
}

function seleccionarFiltro(estado: string) {
    filtroSeleccionado.value = estado;
    mostrarDropdown.value = false;
}

function getEstadoClase(estado: string) {
    switch (estado) {
        case 'Entregado': return 'estado-entregado';
        case 'En proceso': return 'estado-proceso';
        case 'Preparando': return 'estado-preparando';
        default: return '';
    }
}

function verDetalleProducto(producto: any) {
    console.log(`Detalles del producto: ${producto.Nombre || producto.IdProducto}`);
    // Aquí podrías navegar a la vista de detalle del producto
}

// Usar funciones del store para formateo
const formatearFecha = pedidoStore.formatearFecha;
const formatearPrecio = pedidoStore.formatearPrecio;
</script>

<style lang="scss">
// Variables - Elixium Foods color scheme
$color-gold: #D4B96A;
$color-dark: #0F1114;
$color-text: #E5E5E5;
$color-background: #121618;
$color-card: #1A1D20;
$font-primary: 'Cormorant Garamond', serif;
$font-secondary: 'Montserrat', sans-serif;

.pedidos-container {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem;
    font-family: $font-secondary;

    .pedidos-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        background-color: $color-card;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        border: 1px solid rgba($color-gold, 0.1);

        .pedidos-header {
            background:  $color-gold;
            color: $color-dark;

            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;

                h1 {
                    font-family: $font-primary;
                    font-size: 2rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    letter-spacing: 1px;

                    i {
                        margin-right: 1rem;
                    }
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    .search-container {
                        position: relative;

                        input {
                            padding: 0.75rem 1rem 0.75rem 2.5rem;
                            border-radius: 0.25rem;
                            border: 1px solid rgba($color-dark, 0.2);
                            background-color: rgba($color-dark, 0.1);
                            color: $color-dark;
                            width: 250px;
                            font-family: $font-secondary;

                            &::placeholder {
                                color: rgba($color-dark, 0.6);
                            }

                            &:focus {
                                outline: none;
                                box-shadow: 0 0 0 2px rgba($color-dark, 0.2);
                            }
                        }

                        i {
                            position: absolute;
                            left: 0.75rem;
                            top: 50%;
                            transform: translateY(-50%);
                            color: rgba($color-dark, 0.7);
                        }
                    }

                    .filter-container {
                        position: relative;

                        .filter-button {
                            display: flex;
                            align-items: center;
                            background-color: $color-dark;
                            color: $color-gold;
                            padding: 0.75rem 1.5rem;
                            border-radius: 0.25rem;
                            gap: 0.5rem;
                            border: 1px solid $color-gold;
                            font-family: $font-secondary;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            font-size: 0.9rem;

                            &:hover {
                                background-color: $color-dark;
                            }

                            i {
                                margin-left: 0.5rem;
                            }
                        }

                        .dropdown-menu {
                            position: absolute;
                            top: 100%;
                            right: 0;
                            background-color: $color-card;
                            border-radius: 0.25rem;
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                            margin-top: 0.5rem;
                            z-index: 10;
                            overflow: hidden;
                            width: 200px;
                            border: 1px solid rgba($color-gold, 0.2);

                            .dropdown-item {
                                padding: 0.75rem 1rem;
                                cursor: pointer;
                                transition: background-color 0.3s;
                                color: $color-text;

                                &:hover {
                                    background-color: rgba($color-gold, 0.1);
                                    color: $color-gold;
                                }
                            }
                        }
                    }
                }
            }
        }

        .pedidos-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            color: $color-text;

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

            p {
                font-size: 1.1rem;
            }
        }

        .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            color: #EF4444;

            i {
                font-size: 3rem;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.2rem;
                margin-bottom: 1.5rem;
                text-align: center;
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
                transition: all 0.3s ease;

                &:hover {
                    background-color: rgba(#EF4444, 0.2);
                }
            }
        }

        .no-pedidos {
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

            p {
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }

            .margin-top {
                margin-top: 1rem;
            }

            .btn-retry {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background-color: rgba($color-gold, 0.1);
                color: $color-gold;
                padding: 0.75rem 1.5rem;
                border-radius: 0.25rem;
                border: 1px solid $color-gold;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background-color: rgba($color-gold, 0.2);
                }
            }

            .btn-debug {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background-color: rgba(#3B82F6, 0.1);
                color: #3B82F6;
                padding: 0.75rem 1.5rem;
                border-radius: 0.25rem;
                border: 1px solid #3B82F6;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    background-color: rgba(#3B82F6, 0.2);
                }
            }
        }

        .pedidos-content {
            padding: 2rem;
            display: grid;
            gap: 1.5rem;

            .pedido-item {
                background-color: $color-card;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                border: 1px solid rgba($color-gold, 0.1);

                .pedido-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background-color: $color-dark;
                    border-bottom: 1px solid rgba($color-gold, 0.1);

                    .pedido-info {
                        display: flex;
                        align-items: center;
                        gap: 1rem;

                        .pedido-numero {
                            font-weight: 600;
                            color: $color-gold;
                            font-family: $font-primary;
                            font-size: 1.2rem;
                            letter-spacing: 0.5px;
                        }

                        .pedido-fecha {
                            color: rgba($color-text, 0.7);
                            font-size: 0.875rem;
                        }
                    }

                    .pedido-estado {
                        padding: 0.5rem 1rem;
                        border-radius: 0.25rem;
                        font-size: 0.75rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;

                        &.estado-entregado {
                            background-color: rgba(16, 185, 129, 0.1);
                            color: #10B981;
                            border: 1px solid rgba(16, 185, 129, 0.3);
                        }

                        &.estado-proceso {
                            background-color: rgba(245, 158, 11, 0.1);
                            color: #F59E0B;
                            border: 1px solid rgba(245, 158, 11, 0.3);
                        }

                        &.estado-preparando {
                            background-color: rgba(59, 130, 246, 0.1);
                            color: #3B82F6;
                            border: 1px solid rgba(59, 130, 246, 0.3);
                        }
                    }
                }

                .pedido-detalle {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 1.5rem;
                    padding: 1.5rem;

                    @media (max-width: 768px) {
                        grid-template-columns: 1fr;
                    }

                    .productos-lista {
                        h3 {
                            font-family: $font-primary;
                            color: $color-gold;
                            margin-bottom: 1.2rem;
                            font-weight: 500;
                            font-size: 1.5rem;
                            letter-spacing: 0.5px;
                        }

                        .producto-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 0.75rem 1rem;
                            background-color: rgba($color-dark, 0.5);
                            border-radius: 0.25rem;
                            margin-bottom: 0.5rem;
                            border: 1px solid rgba($color-gold, 0.05);
                            cursor: pointer;
                            transition: all 0.2s ease;

                            &:hover {
                                background-color: rgba($color-dark, 0.7);
                                border-color: rgba($color-gold, 0.2);
                            }

                            .producto-nombre {
                                color: $color-text;
                                font-weight: 500;
                            }

                            .producto-precio {
                                color: rgba($color-text, 0.8);
                            }
                        }
                    }

                    .pedido-resumen {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-end;
                        padding: 1.25rem;
                        background-color: rgba($color-dark, 0.5);
                        border-radius: 0.5rem;
                        border: 1px solid rgba($color-gold, 0.1);

                        .total-container {
                            text-align: right;
                            margin-bottom: 1.5rem;

                            .total-label {
                                color: rgba($color-text, 0.7);
                                font-size: 0.9rem;
                                text-transform: uppercase;
                                letter-spacing: 1px;
                                margin-bottom: 0.25rem;
                            }

                            .total-monto {
                                font-family: $font-primary;
                                font-size: 1.75rem;
                                font-weight: 600;
                                color: $color-gold;
                            }
                        }

                        .btn-detalles {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            background-color: $color-gold;
                            color: $color-dark;
                            padding: 0.75rem 1.25rem;
                            border-radius: 0.25rem;
                            font-weight: 600;
                            border: none;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            text-transform: uppercase;
                            font-size: 0.8rem;
                            letter-spacing: 0.5px;

                            &:hover {
                                background-color: $color-gold;
                            }

                            i {
                                margin-left: 0.5rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

// Estilos para el modal
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color-dark, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999999999999999;
    padding: 1rem;
}

// Continuación de los estilos del modal
.modal-container {
    background-color: $color-card;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba($color-gold, 0.2);

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid rgba($color-gold, 0.1);
        background-color: $color-dark;

        h2 {
            font-family: $font-primary;
            color: $color-gold;
            font-size: 1.5rem;
            font-weight: 600;
        }

        .btn-cerrar {
            background: none;
            border: none;
            color: rgba($color-text, 0.7);
            font-size: 1.25rem;
            cursor: pointer;
            transition: color 0.2s;

            &:hover {
                color: $color-text;
            }
        }
    }

    .modal-content {
        padding: 1.5rem;

        .detalles-seccion {
            margin-bottom: 2rem;

            h3 {
                font-family: $font-primary;
                color: $color-gold;
                margin-bottom: 1rem;
                font-size: 1.25rem;
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;

                .info-item {
                    display: flex;
                    flex-direction: column;
                    background-color: rgba($color-dark, 0.3);
                    padding: 0.75rem 1rem;
                    border-radius: 0.25rem;
                    border: 1px solid rgba($color-gold, 0.05);

                    .info-label {
                        color: rgba($color-text, 0.7);
                        font-size: 0.875rem;
                        margin-bottom: 0.25rem;
                    }

                    .info-value {
                        color: $color-text;
                        font-weight: 500;
                    }

                    .estado-badge {
                        display: inline-block;
                        padding: 0.35rem 0.75rem;
                        border-radius: 0.25rem;
                        font-size: 0.75rem;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;

                        &.estado-entregado {
                            background-color: rgba(16, 185, 129, 0.1);
                            color: #10B981;
                            border: 1px solid rgba(16, 185, 129, 0.3);
                        }

                        &.estado-proceso {
                            background-color: rgba(245, 158, 11, 0.1);
                            color: #F59E0B;
                            border: 1px solid rgba(245, 158, 11, 0.3);
                        }

                        &.estado-preparando {
                            background-color: rgba(59, 130, 246, 0.1);
                            color: #3B82F6;
                            border: 1px solid rgba(59, 130, 246, 0.3);
                        }
                    }
                }
            }

            .productos-tabla {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid rgba($color-gold, 0.1);
                border-radius: 0.25rem;
                overflow: hidden;

                th,
                td {
                    padding: 0.75rem 1rem;
                    text-align: left;
                    color: $color-text;
                }

                th {
                    background-color: rgba($color-dark, 0.6);
                    color: $color-gold;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                tbody tr {
                    border-bottom: 1px solid rgba($color-gold, 0.05);

                    &:nth-child(even) {
                        background-color: rgba($color-dark, 0.2);
                    }

                    &:hover {
                        background-color: rgba($color-dark, 0.4);
                    }
                }

                tfoot {
                    background-color: rgba($color-dark, 0.6);

                    .total-label {
                        text-align: right;
                        font-weight: 600;
                        color: $color-gold;
                    }

                    .total-value {
                        font-family: $font-primary;
                        font-weight: 700;
                        font-size: 1.1rem;
                        color: $color-gold;
                    }
                }
            }
        }
    }

    .modal-actions {
        display: flex;
        justify-content: flex-end;
        padding: 0 1.5rem 1.5rem;

        .btn-secundario {
            background-color: rgba($color-dark, 0.7);
            color: $color-text;
            border: 1px solid rgba($color-text, 0.2);
            padding: 0.75rem 1.5rem;
            border-radius: 0.25rem;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background-color: rgba($color-dark, 0.9);
                border-color: rgba($color-text, 0.4);
            }
        }
    }
}
</style>