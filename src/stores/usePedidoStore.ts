import { defineStore } from 'pinia';
import { ref } from 'vue';
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

    // Caché de nombres de productos
    const productosCache = ref<Map<number, string>>(new Map());

    // Obtener el ID del usuario autenticado
    const getUserId = () => {
        const user = authStore.user;
        if (!user) return null;
        return user?.id || user?.userId || user?.userid || user?.UserID || user?.userID || user?.user_id || null;
    };

    // Cargar todos los productos de una vez
    const cargarTodosLosProductos = async () => {
        if (productosCache.value.size > 0) {
            // Ya tenemos productos cargados
            return;
        }

        try {
            // Intenta obtener todos los productos con una sola llamada
            const { data } = await axios.get('http://elixiumapi.retocsv.es//api/Productos');

            if (Array.isArray(data)) {
                // Asumiendo que la respuesta es un array de productos
                data.forEach(producto => {
                    const id = producto.id || producto.Id || producto.ID || producto.IdProducto || producto.idProducto;
                    const nombre = producto.nombre || producto.Nombre || `Producto ${id}`;

                    if (id) {
                        productosCache.value.set(Number(id), nombre);
                    }
                });

                console.log(`Cargados ${productosCache.value.size} productos en caché`);
            } else {
                console.warn('La respuesta de API para productos no es un array:', data);
            }
        } catch (err) {
            console.error('Error al cargar todos los productos:', err);

            // Intentemos cargar la lista de categorías que podría tener productos anidados
            try {
                const { data } = await axios.get('http://elixiumapi.retocsv.es//api/Categorias');

                if (Array.isArray(data)) {
                    // Intentar encontrar productos en las categorías
                    data.forEach(categoria => {
                        if (categoria.productos && Array.isArray(categoria.productos)) {
                            categoria.productos.forEach((producto: any) => {
                                const id = producto.id || producto.Id || producto.ID || producto.IdProducto || producto.idProducto;
                                const nombre = producto.nombre || producto.Nombre || `Producto ${id}`;

                                if (id) {
                                    productosCache.value.set(Number(id), nombre);
                                }
                            });
                        }
                    });

                    console.log(`Cargados ${productosCache.value.size} productos desde categorías`);
                }
            } catch (err2) {
                console.error('También falló la carga desde categorías:', err2);
            }
        }
    };

    // Obtener nombre de producto (usando la caché)
    const obtenerNombreProducto = async (productoId: number) => {
        // Si ya tenemos el producto en caché, lo devolvemos directamente
        if (productosCache.value.has(productoId)) {
            return productosCache.value.get(productoId);
        }

        // Si no está en caché, intentamos cargar todos los productos primero
        await cargarTodosLosProductos();

        // Verificar nuevamente si ahora está en caché
        if (productosCache.value.has(productoId)) {
            return productosCache.value.get(productoId);
        }

        // Si todavía no está, usar un valor predeterminado
        return `Producto ${productoId}`;
    };

    // Función para cargar nombres de productos de todos los pedidos
    const cargarNombresProductos = async () => {
        await cargarTodosLosProductos();

        // Actualizar los nombres en los pedidos
        pedidos.value.forEach(pedido => {
            if (pedido.Items && pedido.Items.length > 0) {
                pedido.Items.forEach(item => {
                    if (item.IdProducto && productosCache.value.has(item.IdProducto)) {
                        item.Nombre = productosCache.value.get(item.IdProducto);
                    }
                });
            }
        });
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
            const { data } = await axios.get(`http://elixiumapi.retocsv.es//api/Pedido/usuario/${userId}`);
            console.log('Pedidos recibidos:', data);

            // Guardar datos completos para depuración
            debugInfo.value = { rawData: data };

            // Transformar los datos para ajustarlos a la estructura esperada
            let pedidosTransformados: Pedido[] = [];

            if (Array.isArray(data)) {
                // Es un array directo de pedidos
                pedidosTransformados = data.map(transformarPedido);
            } else if (data && typeof data === 'object') {
                // Tratar de encontrar el array de pedidos en alguna propiedad del objeto
                const posibleArrayProps = Object.keys(data);
                for (const prop of posibleArrayProps) {
                    if (Array.isArray(data[prop])) {
                        pedidosTransformados = data[prop].map(transformarPedido);
                        break;
                    }
                }

                // Si sigue siendo un objeto y tiene IdPedidos, es un pedido único
                if (pedidosTransformados.length === 0 && data.IdPedidos) {
                    pedidosTransformados = [transformarPedido(data)];
                }
            }

            // Actualizar el estado
            pedidos.value = pedidosTransformados;
            calcularTotalesPedidos();

            // Cargar nombres de productos
            await cargarNombresProductos();

            // Log para depuración
            if (pedidos.value.length > 0) {
                console.log('Primer pedido procesado con nombres:', pedidos.value[0]);
            }

            return pedidosTransformados;
        } catch (err: any) {
            handleApiError(err, 'Error al cargar los pedidos');
            return [];
        } finally {
            cargando.value = false;
        }
    };

    // Función auxiliar para transformar el formato de cada pedido
    function transformarPedido(pedidoData: any): Pedido {
        console.log('Transformando pedido:', pedidoData);

        // Verificar que los Items sean un array
        let items = [];

        // Opción 1: Buscar por propiedad Items/items
        if (pedidoData.Items && Array.isArray(pedidoData.Items)) {
            items = pedidoData.Items;
        } else if (pedidoData.items && Array.isArray(pedidoData.items)) {
            items = pedidoData.items;
        } else {
            // Opción 2: Extraer items del JSON plano basado en patrones de nombres
            console.log('Buscando items en formato plano');

            // 2.1 Si hay items en un formato aplanado (como mostró tu consola)
            const itemsPlanos = [];

            // Buscar patrones de IdDetalle, idDetalle, etc.
            const detalleKeys = Object.keys(pedidoData).filter(key =>
                key.startsWith('IdDetalle') ||
                key.startsWith('idDetalle') ||
                key.includes('detalle')
            );

            if (detalleKeys.length > 0) {
                console.log('Encontrados posibles detalles:', detalleKeys);
                // Extraer datos de este formato aplanado
                for (const key of detalleKeys) {
                    // Extraer el índice o número del detalle
                    const match = key.match(/\d+/);
                    if (!match) continue;

                    const index = match[0];
                    const idProductoKey = Object.keys(pedidoData).find(k =>
                        (k.includes('IdProducto') || k.includes('idProducto')) && k.includes(index)
                    );
                    const cantidadKey = Object.keys(pedidoData).find(k =>
                        (k.includes('Cantidad') || k.includes('cantidad')) && k.includes(index)
                    );
                    const precioKey = Object.keys(pedidoData).find(k =>
                        (k.includes('Precio') || k.includes('precio')) && k.includes(index)
                    );
                    const nombreKey = Object.keys(pedidoData).find(k =>
                        (k.includes('Nombre') || k.includes('nombre')) && k.includes(index)
                    );

                    const item = {
                        IdDetalle: pedidoData[key],
                        IdPedidos: pedidoData.IdPedidos || pedidoData.idPedidos || 0,
                        IdProducto: idProductoKey ? pedidoData[idProductoKey] : 0,
                        Cantidad: cantidadKey ? pedidoData[cantidadKey] : 1,
                        Precio: precioKey ? pedidoData[precioKey] : 0,
                        Nombre: nombreKey ? pedidoData[nombreKey] : `Producto ${index}`
                    };
                    itemsPlanos.push(item);
                }
            }

            // 2.2: Si encontramos un único "items" que parece una cadena JSON
            if (itemsPlanos.length === 0 && typeof pedidoData.items === 'string') {
                try {
                    const parsedItems = JSON.parse(pedidoData.items);
                    if (Array.isArray(parsedItems)) {
                        itemsPlanos.push(...parsedItems);
                    }
                } catch (e) {
                    console.log('Error al parsear items como JSON:', e);
                }
            }

            // 2.3: Buscar en toda la estructura a ver si encontramos arrays con apariencia de items
            if (itemsPlanos.length === 0) {
                Object.keys(pedidoData).forEach(key => {
                    if (Array.isArray(pedidoData[key])) {
                        const arr = pedidoData[key];
                        if (arr.length > 0 && (
                            arr[0].IdProducto !== undefined ||
                            arr[0].idProducto !== undefined ||
                            arr[0].Cantidad !== undefined ||
                            arr[0].cantidad !== undefined
                        )) {
                            // Parece ser una colección de items
                            itemsPlanos.push(...arr);
                        }
                    }
                });
            }

            items = itemsPlanos;
        }

        // Opción 3: Si todavía no hay items, crear uno por defecto basado en lo que encontremos
        if (items.length === 0) {
            console.log('Creando item por defecto');
            // Buscar cualquier propiedad que contenga IdProducto o Producto
            const idProductoKey = Object.keys(pedidoData).find(k =>
                k.includes('IdProducto') || k.includes('idProducto')
            );

            // Si encontramos un ID de producto, crear un item
            if (idProductoKey) {
                const cantidadKey = Object.keys(pedidoData).find(k =>
                    k.includes('Cantidad') || k.includes('cantidad')
                );
                const precioKey = Object.keys(pedidoData).find(k =>
                    k.includes('Precio') || k.includes('precio')
                );
                const nombreKey = Object.keys(pedidoData).find(k =>
                    k.includes('Nombre') || k.includes('nombre')
                );

                items.push({
                    IdDetalle: 1,
                    IdPedidos: pedidoData.IdPedidos || pedidoData.idPedidos || 0,
                    IdProducto: pedidoData[idProductoKey] || 0,
                    Cantidad: cantidadKey ? pedidoData[cantidadKey] : 1,
                    Precio: precioKey ? pedidoData[precioKey] : 0,
                    Nombre: nombreKey ? pedidoData[nombreKey] : `Producto ${pedidoData[idProductoKey] || 0}`
                });
            }
        }

        console.log('Items identificados:', items);

        // Normalizar la estructura de los items
        const itemsNormalizados = items.map(item => {
            // Asegurar que los nombres de propiedad estén correctos (primera letra mayúscula)
            const itemNormalizado: any = {};

            // ID del detalle
            itemNormalizado.IdDetalle = item.IdDetalle || item.idDetalle || 0;

            // ID del pedido
            itemNormalizado.IdPedidos = item.IdPedidos || item.idPedidos ||
                pedidoData.IdPedidos || pedidoData.idPedidos || 0;

            // ID del producto
            itemNormalizado.IdProducto = item.IdProducto || item.idProducto || 0;

            // Cantidad
            itemNormalizado.Cantidad = typeof item.Cantidad !== 'undefined' ? item.Cantidad :
                (typeof item.cantidad !== 'undefined' ? item.cantidad : 1);

            // Precio
            itemNormalizado.Precio = typeof item.Precio !== 'undefined' ? Number(item.Precio) :
                (typeof item.precio !== 'undefined' ? Number(item.precio) : 0);

            // Nombre
            itemNormalizado.Nombre = item.Nombre || item.nombre ||
                item.nombreProducto || item.NombreProducto ||
                `Producto ${itemNormalizado.IdProducto}`;

            return itemNormalizado;
        });

        // Calcular el total del pedido
        const total = itemsNormalizados.reduce((sum, item) => {
            return sum + (Number(item.Cantidad) * Number(item.Precio));
        }, 0);

        console.log('Total calculado para el pedido:', total);

        // Armar el pedido con la estructura esperada
        return {
            IdPedidos: pedidoData.IdPedidos || pedidoData.idPedidos || 0,
            Fecha: pedidoData.Fecha || pedidoData.fecha || new Date().toISOString(),
            UserID: pedidoData.UserID || pedidoData.userID || pedidoData.userId || 0,
            Items: itemsNormalizados,
            Total: total,
            Estado: pedidoData.Estado || pedidoData.estado || 'Preparando'
        };
    }

    // Obtener un pedido específico por ID
    const obtenerPedidoPorId = async (pedidoId: number) => {
        cargando.value = true;
        error.value = '';
        debugInfo.value = null;
        try {
            console.log(`Obteniendo pedido con ID: ${pedidoId}`);
            const { data } = await axios.get(`http://elixiumapi.retocsv.es//api/Pedido/${pedidoId}`);
            console.log('Pedido recibido:', data);

            // Transformar el pedido para normalizar su estructura
            const pedidoTransformado = transformarPedido(data);
            pedidoActual.value = pedidoTransformado;

            // Cargar nombres de productos para este pedido
            if (pedidoActual.value && pedidoActual.value.Items) {
                // Asegurarnos de tener los productos cargados
                await cargarTodosLosProductos();

                // Actualizar los nombres
                for (const item of pedidoActual.value.Items) {
                    if (item.IdProducto && productosCache.value.has(item.IdProducto)) {
                        item.Nombre = productosCache.value.get(item.IdProducto);
                    }
                }
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
                    (sum, item) => sum + (Number(item.Precio) * Number(item.Cantidad)),
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
                'http://elixiumapi.retocsv.es//api/Pedido',
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
            if (!fechaStr) return 'Fecha no disponible';

            // Verificar si la fecha tiene formato específico de tu API
            if (fechaStr.includes('T00:00:00')) {
                // Formato común en APIs .NET
                const partes = fechaStr.split('T')[0].split('-');
                if (partes.length === 3) {
                    const [año, mes, dia] = partes;
                    const fecha = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
                    return fecha.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });
                }
            }

            // Intentar con formato ISO
            const fecha = new Date(fechaStr);

            // Verificar si la fecha es válida
            if (isNaN(fecha.getTime())) {
                console.warn(`Fecha inválida: ${fechaStr}`);
                return 'Fecha pendiente';
            }

            return fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        } catch (error) {
            console.error('Error al formatear fecha:', error);
            return 'Fecha pendiente';
        }
    };

    // Formatear precio
    const formatearPrecio = (precio: number) => {
        try {
            return '€' + Number(precio).toFixed(2);
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
        formatearPrecio,
        obtenerNombreProducto,
        cargarTodosLosProductos
    };
});