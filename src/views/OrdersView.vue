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

            <div class="pedidos-content">
                <div v-for="pedido in pedidosFiltrados" :key="pedido.id" class="pedido-item">
                    <div class="pedido-header">
                        <div class="pedido-info">
                            <span class="pedido-numero">Pedido #{{ pedido.id }}</span>
                            <span class="pedido-fecha">{{ pedido.fecha }}</span>
                        </div>
                        <span :class="`pedido-estado ${getEstadoClase(pedido.estado)}`">
                            {{ pedido.estado }}
                        </span>
                    </div>

                    <div class="pedido-detalle">
                        <div class="productos-lista">
                            <h3>Productos</h3>
                            <div v-for="(producto, index) in pedido.productos" :key="index" class="producto-item"
                                @click="verDetalleProducto(producto)">
                                <span class="producto-nombre">{{ producto.nombre }}</span>
                                <span class="producto-precio">{{ producto.cantidad }} x {{ producto.precio }}</span>
                            </div>
                        </div>
                        <div class="pedido-resumen">
                            <div class="total-container">
                                <p class="total-label">Total</p>
                                <p class="total-monto">{{ pedido.total }}</p>
                            </div>
                            <button class="btn-detalles" @click="verDetallePedido(pedido)">
                                Ver Detalles
                                <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="pedidosFiltrados.length === 0" class="no-pedidos">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron pedidos que coincidan con tu búsqueda</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const filtroSeleccionado = ref('Todos')
const mostrarDropdown = ref(false)
const estados = ['Todos', 'Entregado', 'En proceso', 'Preparando']

const pedidos = ref([
    {
        id: '001',
        fecha: '15 Feb 2025',
        total: '$1,500',
        estado: 'Entregado',
        productos: [
            { nombre: 'Producto A', cantidad: 2, precio: '$750' },
            { nombre: 'Producto B', cantidad: 1, precio: '$450' }
        ]
    },
    {
        id: '002',
        fecha: '22 Feb 2025',
        total: '$2,300',
        estado: 'En proceso',
        productos: [
            { nombre: 'Producto C', cantidad: 3, precio: '$650' },
            { nombre: 'Producto D', cantidad: 1, precio: '$950' }
        ]
    },
    {
        id: '003',
        fecha: '27 Feb 2025',
        total: '$980',
        estado: 'Preparando',
        productos: [
            { nombre: 'Producto E', cantidad: 1, precio: '$980' }
        ]
    }
])

const pedidosFiltrados = computed(() => {
    return pedidos.value.filter(pedido => {
        const matchSearch = pedido.id.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            pedido.productos.some(p =>
                p.nombre.toLowerCase().includes(searchTerm.value.toLowerCase())
            )

        const matchEstado = filtroSeleccionado.value === 'Todos' ||
            pedido.estado === filtroSeleccionado.value

        return matchSearch && matchEstado
    })
})

const buscarPedidos = () => {
    console.log(`Buscando: ${searchTerm.value}`)
}

const toggleDropdown = () => {
    mostrarDropdown.value = !mostrarDropdown.value
}

const seleccionarFiltro = (estado) => {
    filtroSeleccionado.value = estado
    mostrarDropdown.value = false
    console.log(`Filtro seleccionado: ${estado}`)
}

const getEstadoClase = (estado) => {
    switch (estado) {
        case 'Entregado': return 'estado-entregado'
        case 'En proceso': return 'estado-proceso'
        case 'Preparando': return 'estado-preparando'
        default: return ''
    }
}

const verDetallePedido = (pedido) => {
    console.log(`Viendo detalles del pedido #${pedido.id}`)
    alert(`Ver detalles completos del pedido #${pedido.id}`)
}

const verDetalleProducto = (producto) => {
    console.log(`Viendo detalles del producto: ${producto.nombre}`)
    alert(`Detalles del producto: ${producto.nombre}`)
}
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
            background: linear-gradient(to right, darken($color-gold, 15%), $color-gold);
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
                                background-color: lighten($color-dark, 5%);
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

        .pedidos-content {
            padding: 2rem;
            display: grid;
            gap: 1.5rem;

            .pedido-item {
                background-color: darken($color-card, 3%);
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
                                background-color: darken($color-gold, 10%);
                            }

                            i {
                                margin-left: 0.5rem;
                            }
                        }
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
                }
            }
        }
    }
}
</style>