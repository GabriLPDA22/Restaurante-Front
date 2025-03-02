import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useAuthStore } from './useAuthStore';
import axios from 'axios';

// Interfaces
export interface ItemPedido {
    IdProducto: number;
    Nombre?: string;
    Cantidad: number;
    Precio: number;
}

export interface Pedido {
    IdPedidos: number;
    Fecha: string;
    UserID: number;
    Itmes: Array<{
        IdDetalle: number;
        IdPedidos: number;
        IdProducto: number;
        Cantidad: number;
        Precio: number;
        Nombre?: string;
    }>;
    Total?: number;
    simulado?: boolean;
}

export interface ProductoCarrito {
    id: number;
    nombre: string;
    precio: number | string;
    cantidad?: number;
    quantity?: number;
    imagenUrl?: string;
}

// Tipo para errores de API
interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
    request?: unknown; // Cambiado de 'any' a 'unknown' para evitar el error
    message?: string;
}

export const usePedidoStore = defineStore('pedido', () => {
    const authStore = useAuthStore();
    const pedidos = ref<Pedido[]>([]);
    const pedidoActual = ref<Pedido | null>(null);
    const cargando = ref(false);
    const error = ref('');

    // Obtener pedidos del usuario actual
    const obtenerPedidosUsuario = async () => {
        if (!authStore.user) {
            error.value = 'Usuario no autenticado';
            await cargarPedidosSimulados(); // Cargar pedidos simulados si no hay usuario
            return pedidos.value;
        }

        // Uso de "as any" para evitar errores de tipo
        const user = authStore.user as any;
        const userId = user?.id || user?.userId || user?.userid || user?.UserID || user?.userID || user?.user_id;

        if (!userId) {
            console.warn('ID de usuario no disponible, usando ID temporal para desarrollo');
            const tempUserId = 1; // ID temporal para desarrollo
            await cargarPedidosSimulados(); // Cargar pedidos simulados si no hay ID
            return pedidos.value;
        }

        cargando.value = true;
        error.value = '';

        try {
            const { data } = await axios.get(`http://localhost:5021/api/Pedido/usuario/${userId}`);
            pedidos.value = data || [];

            // Calcular el total para cada pedido
            calcularTotalesPedidos();

            // Si no hay pedidos de la API, intentar cargar del localStorage
            if (pedidos.value.length === 0) {
                await cargarPedidosSimulados();
            }

            return pedidos.value;
        } catch (err: any) {
            console.error('Error al obtener pedidos:', err);
            error.value = err.response?.data?.message || 'Error al cargar los pedidos';

            // En caso de error, intentar cargar del localStorage
            await cargarPedidosSimulados();

            return pedidos.value;
        } finally {
            cargando.value = false;
        }
    };

    // Cargar pedidos simulados desde localStorage
    const cargarPedidosSimulados = async () => {
        try {
            // 1. Intentar cargar el último pedido
            const lastOrderStr = localStorage.getItem('lastOrder');
            if (lastOrderStr) {
                const lastOrder = JSON.parse(lastOrderStr);

                // Convertir al formato de pedido
                const pedidoLastOrder: Pedido = {
                    IdPedidos: lastOrder.orderNumber || Date.now(),
                    Fecha: lastOrder.date || new Date().toISOString(),
                    UserID: 1, // ID temporal
                    simulado: true,
                    Itmes: (lastOrder.items || []).map((item: any, index: number) => ({
                        IdDetalle: index + 1,
                        IdPedidos: lastOrder.orderNumber || Date.now(),
                        IdProducto: item.id || item.IdProducto || 0,
                        Cantidad: item.cantidad || item.quantity || 1,
                        Precio: parseFloat(typeof item.precio === 'string' ?
                            item.precio.replace('€', '').replace(',', '.') : String(item.precio)) || 0,
                        Nombre: item.nombre || ''
                    }))
                };

                // Calcular total
                if (pedidoLastOrder.Itmes && pedidoLastOrder.Itmes.length > 0) {
                    pedidoLastOrder.Total = pedidoLastOrder.Itmes.reduce(
                        (sum, item) => sum + (item.Precio * item.Cantidad), 0
                    );
                } else {
                    pedidoLastOrder.Total = 0;
                }

                // Añadir a la lista de pedidos si no existe ya
                if (!pedidos.value.some(p => p.IdPedidos === pedidoLastOrder.IdPedidos)) {
                    pedidos.value.push(pedidoLastOrder);
                }
            }

            // 2. Intentar cargar pedidos simulados
            const simulatedOrdersStr = localStorage.getItem('simulatedOrders');
            if (simulatedOrdersStr) {
                const simulatedOrders = JSON.parse(simulatedOrdersStr);

                // Añadir cada pedido simulado a la lista
                simulatedOrders.forEach((order: any) => {
                    // Evitar duplicados
                    if (!pedidos.value.some(p => p.IdPedidos === order.IdPedidos)) {
                        pedidos.value.push({
                            ...order,
                            simulado: true
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error al cargar pedidos simulados:', error);
        }
    };

    // Obtener un pedido específico por ID
    const obtenerPedidoPorId = async (pedidoId: number) => {
        cargando.value = true;
        error.value = '';

        try {
            const { data } = await axios.get(`http://localhost:5021/api/Pedido/${pedidoId}`);
            pedidoActual.value = data;

            // Calcular el total del pedido
            if (pedidoActual.value && pedidoActual.value.Itmes) {
                pedidoActual.value.Total = pedidoActual.value.Itmes.reduce(
                    (sum, item) => sum + (item.Precio * item.Cantidad),
                    0
                );
            }

            return pedidoActual.value;
        } catch (err: any) {
            console.error('Error al obtener pedido:', err);
            error.value = err.response?.data?.message || 'Error al cargar el pedido';

            // Intentar cargar del localStorage
            const pedidoLocal = buscarPedidoEnLocalStorage(pedidoId);
            if (pedidoLocal) {
                pedidoActual.value = pedidoLocal;
                return pedidoLocal;
            }

            return null;
        } finally {
            cargando.value = false;
        }
    };

    // Buscar un pedido en localStorage
    const buscarPedidoEnLocalStorage = (pedidoId: number): Pedido | null => {
        try {
            // Buscar en lastOrder
            const lastOrderStr = localStorage.getItem('lastOrder');
            if (lastOrderStr) {
                const lastOrder = JSON.parse(lastOrderStr);
                if (lastOrder.orderNumber === pedidoId) {
                    return {
                        IdPedidos: lastOrder.orderNumber,
                        Fecha: lastOrder.date,
                        UserID: 1, // ID temporal
                        simulado: true,
                        Itmes: (lastOrder.items || []).map((item: any, index: number) => ({
                            IdDetalle: index + 1,
                            IdPedidos: lastOrder.orderNumber,
                            IdProducto: item.id || item.IdProducto || 0,
                            Cantidad: item.cantidad || item.quantity || 1,
                            Precio: parseFloat(typeof item.precio === 'string' ?
                                item.precio.replace('€', '').replace(',', '.') : String(item.precio)) || 0,
                            Nombre: item.nombre || ''
                        })),
                        Total: lastOrder.total || 0
                    };
                }
            }

            // Buscar en simulatedOrders
            const simulatedOrdersStr = localStorage.getItem('simulatedOrders');
            if (simulatedOrdersStr) {
                const simulatedOrders = JSON.parse(simulatedOrdersStr);
                const order = simulatedOrders.find((o: any) => o.IdPedidos === pedidoId);
                if (order) {
                    return {
                        ...order,
                        simulado: true
                    };
                }
            }

            return null;
        } catch (error) {
            console.error('Error al buscar pedido en localStorage:', error);
            return null;
        }
    };

    // Función para calcular los totales de todos los pedidos
    const calcularTotalesPedidos = () => {
        pedidos.value.forEach(pedido => {
            if (pedido.Itmes && pedido.Itmes.length > 0) {
                pedido.Total = pedido.Itmes.reduce(
                    (sum, item) => sum + (item.Precio * item.Cantidad),
                    0
                );
            } else {
                pedido.Total = 0;
            }
        });
    };

    // Crear un nuevo pedido
    const crearPedido = async (productosCarrito: ProductoCarrito[]) => {
        // 0. Verificar que hay productos en el carrito
        if (!productosCarrito || productosCarrito.length === 0) {
            console.error('Error: Carrito vacío');
            error.value = 'No hay productos en el carrito';
            return null;
        }

        // 1. Verificar autenticación
        if (!authStore.user) {
            console.error('Error: Usuario no autenticado');
            error.value = 'Usuario no autenticado';
            return crearPedidoSimulado(productosCarrito, 1);
        }

        // 2. Inspeccionar el objeto de usuario para depuración
        console.log('Objeto de usuario completo (crearPedido):', JSON.stringify(authStore.user));

        // 3. Intentar extraer el ID de usuario de diferentes propiedades comunes
        const user = authStore.user as any;
        const userId = user?.id || user?.userId || user?.userid || user?.UserID || user?.userID || user?.user_id;

        // 4. Verificar si se encontró un ID válido
        if (!userId) {
            console.error('Error: ID de usuario no disponible. Objeto de usuario:', user);
            error.value = 'ID de usuario no disponible';

            // SOLUCIÓN TEMPORAL PARA DESARROLLO
            // Asignar un ID temporal para pruebas
            const temporalUserId = 1;
            console.warn('Usando ID temporal para desarrollo:', temporalUserId);

            return crearPedidoSimulado(productosCarrito, temporalUserId);
        }

        return procesarPedido(productosCarrito, userId);
    };

    // Crear un pedido simulado (cuando no hay usuario o hay error en la API)
    const crearPedidoSimulado = (productosCarrito: ProductoCarrito[], userId: number): Pedido => {
        const pedidoId = Date.now();
        const fecha = new Date().toISOString();

        // Convertir items al formato del backend
        const items = productosCarrito.map((p, index) => ({
            IdDetalle: index + 1,
            IdPedidos: pedidoId,
            IdProducto: p.id,
            Cantidad: p.cantidad || p.quantity || 1,
            Precio: parseFloat(typeof p.precio === 'string' ?
                p.precio.replace('€', '').replace(',', '.') : String(p.precio)) || 0,
            Nombre: p.nombre || ''
        }));

        // Crear objeto de pedido
        const pedido: Pedido = {
            IdPedidos: pedidoId,
            Fecha: fecha,
            UserID: userId,
            Itmes: items,
            simulado: true
        };

        // Calcular total
        pedido.Total = pedido.Itmes.reduce(
            (sum, item) => sum + (item.Precio * item.Cantidad), 0
        );

        // Guardar en localStorage para futuras referencias
        try {
            // Guardar en simulatedOrders
            const simulatedOrdersStr = localStorage.getItem('simulatedOrders');
            const simulatedOrders = simulatedOrdersStr ? JSON.parse(simulatedOrdersStr) : [];
            simulatedOrders.push(pedido);
            localStorage.setItem('simulatedOrders', JSON.stringify(simulatedOrders));

            // Añadir a la lista de pedidos
            pedidos.value.push(pedido);
        } catch (error) {
            console.error('Error al guardar pedido simulado en localStorage:', error);
        }

        return pedido;
    };

    // Función auxiliar para procesar el pedido (extraída para mayor claridad)
    const procesarPedido = async (productosCarrito: ProductoCarrito[], userId: number) => {
        cargando.value = true;
        error.value = '';

        try {
            console.log('Productos recibidos:', productosCarrito);

            // Transformar productos al formato esperado por el backend
            const items = productosCarrito.map(p => ({
                IdProducto: p.id,
                Cantidad: p.cantidad || p.quantity || 1,
                Precio: parseFloat(
                    typeof p.precio === 'string'
                        ? p.precio.replace('€', '').replace(',', '.')
                        : String(p.precio)
                ) || 0
            }));

            console.log('Items transformados:', items);

            // Crear objeto de pedido
            const pedidoDto = {
                UserID: userId,
                Items: items
            };

            console.log('Pedido a enviar:', pedidoDto);

            // Intentar enviar el pedido a la API
            try {
                const { data } = await axios.post('http://localhost:5021/api/Pedido', pedidoDto);
                console.log('Respuesta de la API:', data);

                // Recargar los pedidos del usuario
                await obtenerPedidosUsuario();

                return data;
            } catch (err) {
                // Tratar como ApiError para manejar correctamente los tipos
                const apiError = err as ApiError;
                console.error('Error en la API:', apiError);

                // Verificar el tipo de error de manera segura
                if (apiError && apiError.response) {
                    console.error('Respuesta de error:', apiError.response.data);
                    console.error('Estado HTTP:', apiError.response.status);

                    // Lanzar el error específico si existe
                    error.value = apiError.response.data?.message || 'Error al comunicarse con el servidor';
                } else if (apiError && apiError.request) {
                    console.error('No se recibió respuesta del servidor');
                    error.value = 'No se recibió respuesta del servidor. Verifica tu conexión.';
                } else if (apiError && apiError.message) {
                    console.error('Error al configurar la solicitud:', apiError.message);
                    error.value = 'Error al configurar la solicitud';
                } else {
                    console.error('Error desconocido:', apiError);
                    error.value = 'Error desconocido al procesar el pedido';
                }

                // En caso de error, crear un pedido simulado para desarrollo
                console.log('CREANDO PEDIDO SIMULADO PARA DESARROLLO');
                return crearPedidoSimulado(productosCarrito, userId);
            }
        } catch (err: any) {
            console.error('Error general al crear pedido:', err);
            error.value = err.response?.data?.message || 'Error al crear el pedido';
            return crearPedidoSimulado(productosCarrito, userId);
        } finally {
            cargando.value = false;
        }
    };

    // Formatear fecha para mostrar
    const formatearFecha = (fechaStr: string) => {
        try {
            const fecha = new Date(fechaStr);
            return fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Error al formatear fecha:', error);
            return fechaStr;
        }
    };

    // Formatear precio para mostrar
    const formatearPrecio = (precio: number) => {
        try {
            return '€' + precio.toFixed(2);
        } catch (error) {
            console.error('Error al formatear precio:', error);
            return '€0.00';
        }
    };

    // Propiedades computadas
    const pedidosOrdenados = computed(() => {
        return [...pedidos.value].sort((a, b) =>
            new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime()
        );
    });

    return {
        pedidos,
        pedidosOrdenados,
        pedidoActual,
        cargando,
        error,
        obtenerPedidosUsuario,
        obtenerPedidoPorId,
        crearPedido,
        formatearFecha,
        formatearPrecio
    };
});