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
    Items: Array<{
        IdDetalle: number;
        IdPedidos: number;
        IdProducto: number;
        Cantidad: number;
        Precio: number;
        Nombre?: string;
    }>;
    Total?: number;
    Estado?: string;
}

export interface ProductoCarrito {
    id: number;
    nombre: string;
    precio: number | string;
    cantidad?: number;
    quantity?: number;
    imagenUrl?: string;
}

// Manejo de errores API
interface ApiError {
    response?: {
        data?: any;
        status?: number;
        statusText?: string;
    };
    request?: any;
    message?: string;
    config?: any;
}

export const usePedidoStore = defineStore('pedido', () => {
    const authStore = useAuthStore();
    const pedidos = ref<Pedido[]>([]);
    const pedidoActual = ref<Pedido | null>(null);
    const cargando = ref(false);
    const error = ref('');
    const debugInfo = ref<any>(null); // Para depuración

    // Obtener el ID del usuario autenticado
    const getUserId = () => {
        const user = authStore.user;
        if (!user) return null;
        return user?.id || user?.userId || user?.userid || user?.UserID || user?.userID || user?.user_id || null;
    };

    // Obtener pedidos del usuario
    const obtenerPedidosUsuario = async () => {
        const userId = getUserId();
        if (!userId) {
            error.value = 'Usuario no autenticado';
            return [];
        }
        cargando.value = true;
        error.value = '';
        debugInfo.value = null;

        try {
            console.log(`Obteniendo pedidos para el usuario: ${userId}`);
            const { data } = await axios.get(`http://localhost:5021/api/Pedido/usuario/${userId}`);
            console.log('Pedidos recibidos:', data);
            // Si la respuesta viene envuelta en un objeto, ajusta la siguiente línea:
            pedidos.value = Array.isArray(data) ? data : (data.pedidos || []);
            calcularTotalesPedidos();
            return pedidos.value;
        } catch (err: any) {
            handleApiError(err, 'Error al cargar los pedidos');
            return [];
        } finally {
            cargando.value = false;
        }
    };

    // Obtener un pedido específico por ID
    const obtenerPedidoPorId = async (pedidoId: number) => {
        cargando.value = true;
        error.value = '';
        debugInfo.value = null;
        try {
            console.log(`Obteniendo pedido con ID: ${pedidoId}`);
            const { data } = await axios.get(`http://localhost:5021/api/Pedido/${pedidoId}`);
            console.log('Pedido recibido:', data);
            pedidoActual.value = data;
            if (pedidoActual.value && pedidoActual.value.Items) {
                pedidoActual.value.Total = pedidoActual.value.Items.reduce(
                    (sum, item) => sum + (item.Precio * item.Cantidad),
                    0
                );
            }
            return pedidoActual.value;
        } catch (err: any) {
            handleApiError(err, 'Error al cargar el pedido');
            return null;
        } finally {
            cargando.value = false;
        }
    };

    // Función para calcular los totales de todos los pedidos
    const calcularTotalesPedidos = () => {
        pedidos.value.forEach(pedido => {
            if (pedido.Items && pedido.Items.length > 0) {
                pedido.Total = pedido.Items.reduce(
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
        if (!productosCarrito || productosCarrito.length === 0) {
            error.value = 'No hay productos en el carrito';
            return null;
        }
        const userId = getUserId();
        if (!userId) {
            error.value = 'Usuario no autenticado';
            return null;
        }
        return procesarPedido(productosCarrito, userId);
    };

    // Procesar el pedido
    const procesarPedido = async (productosCarrito: ProductoCarrito[], userId: number) => {
        cargando.value = true;
        error.value = '';
        debugInfo.value = null;
        try {
            const items = productosCarrito.map(p => ({
                IdProducto: p.id,
                Cantidad: p.cantidad || p.quantity || 1,
                Precio: parseFloat(p.precio.toString().replace('€', '').replace(',', '.')) || 0
            }));
            const pedidoDto = { UserID: userId, Items: items };
            console.log('Enviando pedido:', JSON.stringify(pedidoDto, null, 2));
            const { data } = await axios.post(
                'http://localhost:5021/api/Pedido',
                pedidoDto,
                { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
            );
            console.log('Pedido exitoso:', data);
            await obtenerPedidosUsuario();
            return data;
        } catch (err: any) {
            handleApiError(err, 'Error al crear el pedido');
            return null;
        } finally {
            cargando.value = false;
        }
    };

    // Manejo de errores de API
    const handleApiError = (err: any, defaultMessage: string) => {
        const apiError = err as ApiError;
        debugInfo.value = { message: apiError.message, status: apiError.response?.status, responseData: apiError.response?.data };
        if (apiError.response) {
            const status = apiError.response.status;
            if (status === 401) error.value = 'No autorizado. Inicia sesión nuevamente.';
            else if (status === 404) error.value = 'Recurso no encontrado.';
            else error.value = apiError.response.data?.message || `Error ${status}: ${apiError.response.statusText || defaultMessage}`;
        } else if (apiError.request) error.value = 'No se recibió respuesta del servidor. Verifica la conexión.';
        else error.value = apiError.message || defaultMessage;
    };

    // Formatear fecha
    const formatearFecha = (fechaStr: string) => {
        try {
            const fecha = new Date(fechaStr);
            return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch (error) {
            console.error('Error al formatear fecha:', error);
            return fechaStr;
        }
    };

    // Formatear precio
    const formatearPrecio = (precio: number) => {
        try {
            return '€' + precio.toFixed(2);
        } catch (error) {
            console.error('Error al formatear precio:', error);
            return '€0.00';
        }
    };

    return {
        pedidos,
        pedidoActual,
        cargando,
        error,
        debugInfo,
        obtenerPedidosUsuario,
        obtenerPedidoPorId,
        crearPedido,
        calcularTotalesPedidos,
        formatearFecha,
        formatearPrecio
    };
});
