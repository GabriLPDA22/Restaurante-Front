<template>
    <div class="pedidos-container">
        <div class="pedidos-wrapper">
            <div class="pedidos-header">
                <div class="header-content">
                    <h1>
                        <i class="icon-shopping-bag"></i>
                        Mis Pedidos
                    </h1>
                    <div class="header-actions">
                        <div class="search-container">
                            <input type="text" placeholder="Buscar pedido" v-model="searchTerm" />
                            <i class="icon-search"></i>
                        </div>
                        <div class="filter-container">
                            <button @click="toggleDropdown" class="filter-button">
                                {{ filtroSeleccionado }}
                                <i class="icon-chevron-down"></i>
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
                            <div v-for="(producto, index) in pedido.productos" :key="index" class="producto-item">
                                <span class="producto-nombre">{{ producto.nombre }}</span>
                                <span class="producto-precio">{{ producto.cantidad }} x {{ producto.precio }}</span>
                            </div>
                        </div>
                        <div class="pedido-resumen">
                            <div class="total-container">
                                <p class="total-label">Total</p>
                                <p class="total-monto">{{ pedido.total }}</p>
                            </div>
                            <button class="btn-detalles">
                                Ver Detalles
                                <i class="icon-arrow-right"></i>
                            </button>
                        </div>
                    </div>
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

const toggleDropdown = () => {
    mostrarDropdown.value = !mostrarDropdown.value
}

const seleccionarFiltro = (estado) => {
    filtroSeleccionado.value = estado
    mostrarDropdown.value = false
}

const getEstadoClase = (estado) => {
    switch (estado) {
        case 'Entregado': return 'estado-entregado'
        case 'En proceso': return 'estado-proceso'
        case 'Preparando': return 'estado-preparando'
        default: return ''
    }
}
</script>

<style lang="scss">
$color-primary: #10B981;
$color-secondary: #3B82F6;
$color-background: #F3F4F6;
$color-text-dark: #1F2937;
$color-text-light: #6B7280;

.pedidos-container {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem;

    .pedidos-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        border-radius: 1rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .pedidos-header {
            background: linear-gradient(to right, $color-primary, darken($color-primary, 10%));
            color: white;

            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;

                h1 {
                    font-size: 1.5rem;
                    font-weight: bold;
                    display: flex;
                    align-items: center;

                    .icon-shopping-bag {
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
                            padding: 0.5rem 1rem 0.5rem 2.5rem;
                            border-radius: 0.5rem;
                            border: none;
                            background-color: rgba(255, 255, 255, 0.2);
                            color: white;
                            width: 250px;

                            &::placeholder {
                                color: rgba(255, 255, 255, 0.7);
                            }

                            &:focus {
                                outline: none;
                                box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
                            }
                        }

                        .icon-search {
                            position: absolute;
                            left: 0.75rem;
                            top: 50%;
                            transform: translateY(-50%);
                            color: rgba(255, 255, 255, 0.7);
                        }
                    }

                    .filter-container {
                        position: relative;

                        .filter-button {
                            display: flex;
                            align-items: center;
                            background-color: rgba(255, 255, 255, 0.2);
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 0.5rem;
                            gap: 0.5rem;

                            .icon-chevron-down {
                                margin-left: 0.5rem;
                            }
                        }

                        .dropdown-menu {
                            position: absolute;
                            top: 100%;
                            right: 0;
                            background-color: white;
                            border-radius: 0.5rem;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            margin-top: 0.5rem;
                            z-index: 10;
                            overflow: hidden;
                            width: 200px;

                            .dropdown-item {
                                padding: 0.75rem 1rem;
                                cursor: pointer;
                                transition: background-color 0.3s;

                                &:hover {
                                    background-color: $color-background;
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
                background-color: white;
                border-radius: 1rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                overflow: hidden;

                .pedido-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    background-color: $color-background;
                    border-bottom: 1px solid darken($color-background, 5%);

                    .pedido-info {
                        display: flex;
                        align-items: center;
                        gap: 1rem;

                        .pedido-numero {
                            font-weight: semibold;
                            color: $color-text-dark;
                        }

                        .pedido-fecha {
                            color: $color-text-light;
                            font-size: 0.875rem;
                        }
                    }

                    .pedido-estado {
                        padding: 0.25rem 0.75rem;
                        border-radius: 9999px;
                        font-size: 0.75rem;
                        font-weight: semibold;

                        &.estado-entregado {
                            background-color: rgba(16, 185, 129, 0.1);
                            color: darken(#10B981, 10%);
                        }

                        &.estado-proceso {
                            background-color: rgba(245, 158, 11, 0.1);
                            color: darken(#F59E0B, 10%);
                        }

                        &.estado-preparando {
                            background-color: rgba(59, 130, 246, 0.1);
                            color: darken(#3B82F6, 10%);
                        }
                    }
                }

                .pedido-detalle {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    padding: 1.5rem;

                    .productos-lista {
                        h3 {
                            font-weight: semibold;
                            color: $color-text-dark;
                            margin-bottom: 1rem;
                        }

                        .producto-item {
                            display: flex;
                            justify-content: space-between;
                            padding: 0.75rem;
                            background-color: $color-background;
                            border-radius: 0.5rem;
                            margin-bottom: 0.5rem;

                            .producto-nombre {
                                color: $color-text-dark;
                            }

                            .producto-precio {
                                color: $color-text-light;
                            }
                        }
                    }

                    .pedido-resumen {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-end;

                        .total-container {
                            text-align: right;
                            margin-bottom: 1rem;

                            .total-label {
                                color: $color-text-light;
                                font-size: 0.875rem;
                            }

                            .total-monto {
                                font-size: 1.25rem;
                                font-weight: bold;
                                color: $color-text-dark;
                            }
                        }

                        .btn-detalles {
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            background-color: $color-primary;
                            color: white;
                            padding: 0.75rem 1.25rem;
                            border-radius: 0.5rem;
                            transition: background-color 0.3s;

                            &:hover {
                                background-color: darken($color-primary, 10%);
                            }

                            .icon-arrow-right {
                                margin-left: 0.5rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>