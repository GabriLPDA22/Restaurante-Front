<template>
    <div class="admin-dashboard">
        <!-- Header con información del usuario y botón de logout -->
        <div class="dashboard-header">
            <h1 class="dashboard-title">Panel de Administración</h1>
            <div class="dashboard-user">
                <span>{{ adminInfo ? `Bienvenido, ${adminInfo.nombre}` : 'Admin' }}</span>
                <button @click="handleLogout" class="logout-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Cerrar Sesión
                </button>
            </div>
        </div>
        <nav class="dashboard-nav">
            <button v-for="section in sections" :key="section" @click="activeSection = section"
                :class="{ active: activeSection === section }">
                {{ section }}
            </button>
            <v-btn @click="incrementErrorCounterManually" color="warning">
        Contador de Errores: {{ errorCounter }}
    </v-btn>
        </nav>

        <div class="dashboard-content">
            <!-- Sección de Pedidos -->
            <div v-if="activeSection === 'Pedido'" class="section-content">
                <div class="section-header">
                    <h2>Gestión de Pedidos</h2>
                    <div class="section-actions">
                        <button @click="openModal('create', 'Pedido')">Crear Pedido</button>
                    </div>
                </div>
                <div class="items-grid">
                    <div v-for="pedido in pedidos" :key="pedido.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ pedido.id }}</div>
                            <span v-for="(value, key, index) in pedido" :key="index">
                                <strong>{{ key }}:</strong> {{ value }}
                            </span>
                        </div>
                        <div class="item-actions">
                            <button @click="openEditModal('Pedido', pedido)">Editar</button>
                            <button @click="checkAndConfirmDelete('Pedido', pedido)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Productos -->
            <div v-if="activeSection === 'Productos'" class="section-content">
                <div class="section-header">
                    <h2>Gestión de Productos</h2>
                    <div class="section-actions">
                        <button @click="openModal('create', 'Productos')">Crear Producto</button>
                    </div>
                </div>
                <div class="items-grid">
                    <div v-for="producto in productos" :key="producto.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ producto.id }}</div>
                            <span v-for="(value, key, index) in producto" :key="index" v-if="key !== 'id'">
                                <strong>{{ key }}:</strong> {{ value }}
                            </span>
                        </div>
                        <div class="item-actions">
                            <button @click="openEditModal('Productos', producto)">Editar</button>
                            <button @click="checkAndConfirmDelete('Productos', producto)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Reservations  -->
            <div v-if="activeSection === 'Reservations'" class="section-content">
                <div class="section-header">
                    <h2>Gestión de Reservas</h2>
                    <div class="section-actions">
                        <button @click="openModal('create', 'Reservations')">Crear Reserva</button>
                    </div>
                </div>

                <!-- Debug info - para ver si hay datos -->
                <div class="debug-info">
                    <p>Número de reservas: {{ reservations.length }}</p>
                    <button @click="logReservations">Mostrar reservas en consola</button>
                </div>

                <div class="items-grid">
                    <div v-for="reservation in reservations" :key="reservation.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ reservation.id }}</div>
                            <pre>{{ JSON.stringify(reservation, null, 2) }}</pre>
                        </div>
                        <div class="item-actions">
                            <button @click="openEditModal('Reservations', reservation)">Editar</button>
                            <button @click="checkAndConfirmDelete('Reservations', reservation)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Usuarios -->
            <div v-if="activeSection === 'User'" class="section-content">
                <div class="section-header">
                    <h2>Gestión de Usuarios</h2>
                    <div class="section-actions">
                        <button @click="openModal('create', 'User')">Crear Usuario</button>
                    </div>
                </div>
                <div class="items-grid">
                    <div v-for="user in users" :key="user.UserID || user.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ user.UserID || user.id }}</div>
                            <span v-for="(value, key, index) in user" :key="index"
                                v-if="key !== 'UserID' && key !== 'id' && key !== 'GoogleId' && key !== 'PictureUrl' && key !== 'Roles' && key !== 'Password'">
                                <strong>{{ key }}:</strong> {{ value }}
                            </span>
                        </div>
                        <div class="item-actions">
                            <button @click="openEditModal('User', user)">Editar</button>
                            <button @click="checkAndConfirmDelete('User', user)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sección de Items -->
            <div v-if="activeSection === 'Items'" class="section-content">
                <div class="section-header">
                    <h2>Gestión de Items</h2>
                    <div class="section-actions">
                        <button @click="openModal('create', 'Items')">Crear Item</button>
                    </div>
                </div>
                <div class="items-grid">
                    <div v-for="item in items" :key="item.iddetalle" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ item.iddetalle }}</div>
                            <span v-for="(value, key, index) in item" :key="index" v-if="key !== 'iddetalle'">
                                <strong>{{ key }}:</strong> {{ value }}
                            </span>
                        </div>
                        <div class="item-actions">
                            <button @click="openEditModal('Items', item)">Editar</button>
                            <button @click="checkAndConfirmDelete('Items', item)">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para crear/editar -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <h2>{{ modalType === 'create' ? 'Crear' : 'Editar' }} {{ modalSection }}</h2>

                <!-- Formulario específico para usuarios -->
                <form v-if="modalSection === 'User'" @submit.prevent="saveItem">
                    <!-- Campo UserID oculto para referencia interna -->
                    <input type="hidden" v-model="formData.UserID">

                    <div class="form-group">
                        <label for="Nombre">Nombre:</label>
                        <input id="Nombre" v-model="formData.Nombre" type="text" required>
                    </div>

                    <div class="form-group">
                        <label for="Email">Email:</label>
                        <input id="Email" v-model="formData.Email" type="email" required>
                    </div>

                    <div class="form-group">
                        <label for="Telefono">Teléfono:</label>
                        <input id="Telefono" v-model="formData.Telefono" type="text">
                    </div>

                    <div class="form-group">
                        <label for="FechaNacimiento">Fecha de Nacimiento:</label>
                        <input id="FechaNacimiento" v-model="formData.FechaNacimiento" type="datetime-local">
                    </div>

                    <div class="form-group">
                        <label for="Password">Contraseña{{ modalType === 'edit' ? ' (dejar en blanco para mantener)' :
                            '' }}:</label>
                        <input id="Password" v-model="formData.Password" type="password"
                            :required="modalType === 'create'">
                    </div>

                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
                        <button type="submit" class="submit-btn">Guardar</button>
                    </div>
                </form>

                <!-- Formulario específico para Items -->
                <form v-else-if="modalSection === 'Items'" @submit.prevent="saveItem">
                    <div class="form-group" v-if="modalType === 'edit'">
                        <label for="iddetalle">ID Detalle:</label>
                        <input id="iddetalle" v-model="formData.iddetalle" type="number" disabled>
                    </div>

                    <div class="form-group">
                        <label for="idpedidos">ID Pedido:</label>
                        <input id="idpedidos" v-model="formData.idpedidos" type="number" required>
                    </div>

                    <div class="form-group">
                        <label for="idproducto">ID Producto:</label>
                        <input id="idproducto" v-model="formData.idproducto" type="number" required>
                    </div>

                    <div class="form-group">
                        <label for="cantidad">Cantidad:</label>
                        <input id="cantidad" v-model="formData.cantidad" type="number" required min="1">
                    </div>

                    <div class="form-group">
                        <label for="precio">Precio:</label>
                        <input id="precio" v-model="formData.precio" type="number" step="0.01" required min="0">
                    </div>

                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
                        <button type="submit" class="submit-btn">Guardar</button>
                    </div>
                </form>

                <!-- Formulario genérico para otras secciones -->
                <form v-else @submit.prevent="saveItem">
                    <div v-for="(value, key, index) in formData" :key="index" class="form-group">
                        <label :for="key">{{ key }}:</label>
                        <input :id="key" v-model="formData[key]" :type="getInputType(key)"
                            :disabled="key === 'id' || key === 'UserID'">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="closeModal">Cancelar</button>
                        <button type="submit" class="submit-btn">Guardar</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Modal de confirmación de eliminación -->
        <div v-if="showConfirmDelete" class="modal">
            <div class="modal-content">
                <span class="close" @click="showConfirmDelete = false">&times;</span>
                <h2>Confirmar eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este elemento?</p>
                <div class="modal-actions">
                    <button @click="showConfirmDelete = false">Cancelar</button>
                    <button @click="deleteItem">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { adminAuthStore } from '@/stores/adminAuthStore';

export default defineComponent({
    setup() {
        // Obtener instancias del store y router
        const store = adminAuthStore();
        const router = useRouter();

        // Información del administrador
        const adminInfo = computed(() => store.getAdminInfo());

        // Verificar autenticación al entrar al componente (capa adicional de seguridad)
        if (!store.isAuthenticated()) {
            console.log("Acceso no autorizado al dashboard de administración");
            router.push('/admin');
            return {};
        }

        // Configuración de axios
        const api = axios.create({
            baseURL: 'http://localhost:5021/api',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            }
        });

        // Estado reactivo
        const activeSection = ref('Pedido');
        const sections = ['Pedido', 'Productos', 'Reservations', 'User', 'Items'];

        // Colecciones de datos
        const pedidos = ref([]);
        const productos = ref([]);
        const reservations = ref([]);
        const users = ref([]);
        const items = ref([]);
        
        // Contador de errores
        const errorCounter = ref(0);

        // Estado del modal
        const showModal = ref(false);
        const modalType = ref('create');
        const modalSection = ref('');
        const formData = reactive({});

        // Estado de confirmación de eliminación
        const showConfirmDelete = ref(false);
        const deleteItemId = ref(null);
        const deleteItemSection = ref('');

        // Función para obtener el valor actual del contador de errores
        const fetchErrorCounter = async () => {
            try {
                const response = await api.get('/ErrorCounter');
                errorCounter.value = response.data;
                console.log("Valor del contador de errores:", errorCounter.value);
            } catch (error) {
                console.error("Error obteniendo el contador de errores:", error);
            }
        };

        // Función para incrementar el contador de errores manualmente (para el botón)
        const incrementErrorCounterManually = async () => {
            try {
                // Incrementar valor local
                errorCounter.value++;
                console.log("Incrementando contador de errores manualmente a:", errorCounter.value);
                
                // Actualizar en el servidor
                await api.put('/ErrorCounter', errorCounter.value);
            
            } catch (error) {
                console.error("Error incrementando el contador de errores:", error);
                
                // Revertir incremento local si hay error
                errorCounter.value--;
            }
        };

        // Función para formatear items de manera limpia
        const formatItemsMinimal = (items) => {
            try {
                // Convertir a objeto si es string
                let itemsArray = items;
                if (typeof items === 'string') {
                    itemsArray = JSON.parse(items);
                }

                // Si no es un array o está vacío
                if (!Array.isArray(itemsArray) || itemsArray.length === 0) {
                    return "Sin items";
                }

                // Crear texto muy limpio
                return itemsArray.map(item => {
                    // Si hay un nombre de producto, usarlo; si no, mostrar solo "Producto" y el ID
                    const nombre = item.nombreProducto ? item.nombreProducto : `Producto ${item.idProducto}`;
                    return `${nombre} (${item.cantidad}x) $${item.precio}`;
                }).join(" | ");

            } catch (e) {
                return "Error en formato";
            }
        };

        // Función para parsear los items para edición
        const parseItemsForEdit = (itemsString) => {
            try {
                if (!itemsString) return [];

                const items = typeof itemsString === 'string'
                    ? JSON.parse(itemsString)
                    : itemsString;

                return Array.isArray(items) ? items : [];
            } catch (e) {
                console.error("Error parseando items:", e);
                return [];
            }
        };

        // Función para añadir un nuevo item
        const addNewItem = () => {
            try {
                // Parsear los items actuales
                let items = parseItemsForEdit(formData.items);

                // Añadir un nuevo item con valores por defecto
                items.push({
                    idProducto: "",
                    cantidad: 1,
                    precio: 0
                });

                // Actualizar formData.items con el nuevo array
                formData.items = JSON.stringify(items);
            } catch (e) {
                console.error("Error añadiendo item:", e);
            }
        };

        // Función para eliminar un item
        const removeItem = (index) => {
            try {
                // Parsear los items actuales
                let items = parseItemsForEdit(formData.items);

                // Eliminar el item en el índice especificado
                items.splice(index, 1);

                // Actualizar formData.items con el array modificado
                formData.items = JSON.stringify(items);
            } catch (e) {
                console.error("Error eliminando item:", e);
            }
        };

        // Función para formatear JSON para edición
        const formatItems = (items) => {
            try {
                if (typeof items === 'string') {
                    return JSON.stringify(JSON.parse(items), null, 2);
                }
                if (typeof items === 'object') {
                    return JSON.stringify(items, null, 2);
                }
                return String(items);
            } catch (e) {
                return String(items);
            }
        };

        // Función para manejar el cierre de sesión
        const handleLogout = () => {
            console.log("Cerrando sesión de administrador");
            store.logout();
            router.push('/admin');
        };

        // Función para obtener el ID efectivo según el tipo de objeto
        const getEffectiveId = (item, section) => {
            console.log(`Obteniendo ID efectivo para sección ${section}:`, item);

            // Caso especial para Items que usa iddetalle como ID principal
            if (section === 'Items' && item.iddetalle !== undefined) {
                console.log("Usando iddetalle para item:", item.iddetalle);
                return item.iddetalle;
            }

            // Caso especial para User que puede usar UserID en lugar de id
            if (section === 'User' && item.UserID !== undefined) {
                console.log("Usando UserID para usuario:", item.UserID);
                return item.UserID;
            }

            // Caso estándar para otros objetos
            if (item.id !== undefined) {
                console.log("Usando campo id estándar:", item.id);
                return item.id;
            }

            // Búsqueda de cualquier campo que contenga "ID" o "Id" independiente de mayúsculas/minúsculas
            for (const key in item) {
                if (typeof key === 'string' && key.toLowerCase().includes('id')) {
                    console.log(`Encontrado campo ID alternativo: ${key} con valor ${item[key]}`);
                    return item[key];
                }
            }

            console.error("No se encontró ningún ID en el objeto:", item);
            return null;
        };

        // Función para depuración
        const logReservations = () => {
            console.log("Datos de reservaciones:", reservations.value);
            alert(`Reservations tiene ${reservations.value.length} elementos.`);
        };

        const openModal = (type, section) => {
            modalType.value = type;
            modalSection.value = section;

            // Reiniciar formData completamente
            Object.keys(formData).forEach(key => {
                delete formData[key];
            });

            // Configuraciones por sección
            switch (section) {
                case 'Reservations':
                    formData.datetime = new Date().toISOString().slice(0, 16);
                    formData.customername = '';
                    formData.tableid = '';
                    break;

                case 'User':
                    formData.Nombre = '';
                    formData.Email = '';
                    formData.Telefono = '';
                    formData.FechaNacimiento = '';
                    formData.Password = '';
                    break;

                case 'Items':
                    formData.iddetalle = '';
                    formData.idpedidos = '';
                    formData.idproducto = '';
                    formData.cantidad = 1;
                    formData.precio = 0;
                    break;

                case 'Pedido':
                    formData.idPedidos = '';
                    formData.fecha = new Date().toISOString().slice(0, 16);
                    formData.userID = '';
                    formData.items = '[]';
                    break;

                case 'Productos':
                    formData.idProducto = '';
                    formData.nombre = '';
                    formData.precio = 0;
                    formData.descripcion = '';
                    break;

                default:
                    console.warn(`Sección no reconocida: ${section}`);
            }

            console.log("FormData para creación:", formData);
            showModal.value = true;
        };

        const closeModal = () => {
            showModal.value = false;
        };

        // Función para abrir edición
        const openEditModal = (section, item) => {
            console.log(`Verificando item para editar en sección ${section}:`, item);

            // Obtener el ID efectivo según el tipo de objeto
            const effectiveId = getEffectiveId(item, section);

            if (effectiveId === null || effectiveId === undefined) {
                console.error(`Error: El elemento no tiene un ID válido para la sección ${section}`, item);
                alert("No se puede editar este elemento porque no tiene un ID válido");
                return;
            }

            modalType.value = 'edit';
            modalSection.value = section;

            // Limpiar formData
            Object.keys(formData).forEach(key => delete formData[key]);

            if (section === 'User') {
                formData.UserID = item.UserID;
                formData.Nombre = item.Nombre || '';
                formData.Email = item.Email || '';
                formData.Telefono = item.Telefono || ''; // Usar Telefono con T mayúscula
                formData.Password = '';

                // Formatear FechaNacimiento si existe
                if (item.FechaNacimiento) {
                    try {
                        const date = new Date(item.FechaNacimiento);
                        formData.FechaNacimiento = date.toISOString().slice(0, 16);
                    } catch (e) {
                        console.error(`Error formateando FechaNacimiento:`, e);
                        formData.FechaNacimiento = item.FechaNacimiento;
                    }
                } else {
                    formData.FechaNacimiento = '';
                }
            } else if (section === 'Items') {
                // Caso especial para Items
                formData.iddetalle = item.iddetalle;
                formData.idpedidos = item.idpedidos;
                formData.idproducto = item.idproducto;
                formData.cantidad = item.cantidad;
                formData.precio = item.precio;
            } else {
                // Para otras secciones, mantener la lógica original
                Object.keys(item).forEach(key => {
                    // Si es el campo items para Pedido, formatear como JSON
                    if (section === 'Pedido' && key === 'items') {
                        formData[key] = formatItems(item[key]);
                    }
                    // Formatear fechas para inputs datetime-local
                    else if (typeof item[key] === 'string' && item[key] && item[key].includes('T') && getInputType(key) === 'datetime-local') {
                        try {
                            const date = new Date(item[key]);
                            formData[key] = date.toISOString().slice(0, 16);
                        } catch (e) {
                            console.error(`Error formateando fecha ${key}:`, e);
                            formData[key] = item[key];
                        }
                    } else {
                        formData[key] = item[key];
                    }
                });

                // Establecer el ID efectivo para la operación PUT
                if (section === 'Pedido') {
                    formData.idPedidos = effectiveId;
                } else if (section === 'Productos') {
                    formData.idProducto = effectiveId;
                } else {
                    formData.id = effectiveId;
                }
            }

            console.log("FormData para edición:", formData);
            showModal.value = true;
        };

        // Función para determinar el tipo de input
        const getInputType = (key) => {
            const keyLower = key.toLowerCase();
            if (keyLower.includes('fecha') || keyLower === 'datetime' || keyLower === 'fechanacimiento') return 'datetime-local';
            if (keyLower === 'password' || keyLower.includes('contraseña')) return 'password';
            if (keyLower.includes('email')) return 'email';
            if (keyLower.includes('precio') || keyLower.includes('total') || keyLower === 'cantidad') return 'number';
            if (keyLower.includes('id') && keyLower !== 'id' && keyLower !== 'userid' && keyLower !== 'userid') return 'number';
            return 'text';
        };

        // Función para guardar (crear o editar)
        const saveItem = async () => {
            try {
                const section = modalSection.value;
                const data = { ...formData };

                console.log(`Guardando ${modalType.value} en ${section}:`, data);

                // Para Pedido, asegurarse que items sea un objeto y no un string
                if (section === 'Pedido' && typeof data.items === 'string') {
                    try {
                        data.items = JSON.parse(data.items);
                    } catch (e) {
                        console.error("Error al parsear items:", e);
                        alert("El formato del array de items no es válido. Debería ser un JSON array.");
                        return;
                    }
                }

                let response;
                if (modalType.value === 'create') {
                    if (section === 'Items') {
                        data.iddetalle = parseInt(data.iddetalle) || 0;
                        data.idpedidos = parseInt(data.idpedidos) || 0;
                        data.idproducto = parseInt(data.idproducto) || 0;
                        data.cantidad = parseInt(data.cantidad) || 1;
                        data.precio = parseFloat(data.precio) || 0;
                    } else {
                        delete data.id;
                        delete data.UserID;
                    }

                    response = await api.post(`/${section}`, data);
                    console.log("Respuesta de creación:", response.data);
                } else {
                    let itemId = null;
                    let endpoint = `/${section}`;
                    let itemData = { ...data };
                    if (section === 'User' && data.UserID !== undefined) {
                        itemId = data.UserID;

                        itemData = {
                            Nombre: data.Nombre,
                            Email: data.Email,
                            Telefono: data.Telefono, // Usar Telefono con T mayúscula
                            FechaNacimiento: data.FechaNacimiento // Usar FechaNacimiento con F mayúscula
                        };

                        if (data.Password && data.Password.trim() !== '') {
                            itemData.Password = data.Password;
                        } else if (modalType.value === 'create') {
                            const defaultPassword = 'Password123';
                            itemData.Password = defaultPassword;
                        }
                    } else if (section === 'Items') {
                        // Para Items, usar iddetalle como identificador
                        itemId = data.iddetalle;

                        // Asegurarse que los datos numéricos son números
                        itemData.iddetalle = parseInt(data.iddetalle) || 0;
                        itemData.idpedidos = parseInt(data.idpedidos) || 0;
                        itemData.idproducto = parseInt(data.idproducto) || 0;
                        itemData.cantidad = parseInt(data.cantidad) || 1;
                        itemData.precio = parseFloat(data.precio) || 0;
                    } else if (section === 'Pedido') {
                        itemId = data.idPedidos;
                    } else if (section === 'Productos') {
                        itemId = data.idProducto;
                    } else {
                        itemId = data.id;
                    }

                    if (!itemId) {
                        throw new Error(`ID no válido para editar ${section} - no se puede realizar la operación PUT`);
                    }

                    console.log(`Enviando PUT a ${endpoint}/${itemId} con datos:`, itemData)

                    response = await api.put(`${endpoint}/${itemId}`, itemData);
                    console.log("Respuesta de actualización:", response.data);
                }

                // Actualizar datos y cerrar modal
                await fetchData(section);
                showModal.value = false;

                alert(`${section} ${modalType.value === 'create' ? 'creado' : 'actualizado'} correctamente`);
            } catch (error) {
                console.error("Error guardando datos:", error);

                // Incrementar contador de errores
                try {
                    errorCounter.value++;
                    await api.put('/ErrorCounter', errorCounter.value);
                } catch (counterError) {
                    console.error("Error incrementando contador:", counterError);
                }

                // Log detallado para depurar problemas
                if (error.request) {
                    console.error("Request:", error.request);
                }
                if (error.response) {
                    console.error("Response:", error.response);
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                }

                let errorMsg = "Error desconocido";

                if (error.response) {
                    errorMsg = error.response.data?.title ||
                        error.response.data?.message ||
                        `Error ${error.response.status}: ${error.response.statusText}`;
                } else if (error.message) {
                    errorMsg = error.message;
                }

                alert(`Error al guardar: ${errorMsg}`);
            }
        };

        // Función para verificar y confirmar eliminación
        const checkAndConfirmDelete = (section, item) => {
            console.log(`Verificando item para eliminar en sección ${section}:`, item);

            // Obtener el ID efectivo según el tipo de objeto
            const effectiveId = getEffectiveId(item, section);

            if (effectiveId === null || effectiveId === undefined) {
                console.error(`Error: El elemento no tiene un ID válido para la sección ${section}`, item);
                alert("No se puede eliminar este elemento porque no tiene un ID válido");
                return;
            }

            console.log(`ID efectivo encontrado para eliminar: ${effectiveId} en sección ${section}`);

            // Guardar sección e ID para la eliminación
            deleteItemSection.value = section;
            deleteItemId.value = effectiveId;

            // Mostrar modal de confirmación
            showConfirmDelete.value = true;
        };

        // Función para eliminar
        const deleteItem = async () => {
            try {
                const section = deleteItemSection.value;
                const id = deleteItemId.value;

                // Verificación adicional antes de intentar la eliminación
                if (!id) {
                    throw new Error("ID no válido para eliminar - no se puede realizar la operación DELETE");
                }

                console.log(`Eliminando item ${id} de ${section}`);

                // Realizar la petición DELETE
                const response = await api.delete(`/${section}/${id}`);
                console.log("Respuesta de eliminación:", response.data);

                // Actualizar datos y cerrar modal
                await fetchData(section);
                showConfirmDelete.value = false;

                alert(`${section} eliminado correctamente`);
            } catch (error) {
                console.error("Error eliminando:", error);

                // Incrementar contador de errores
                try {
                    errorCounter.value++;
                    await api.put('/ErrorCounter', errorCounter.value);
                } catch (counterError) {
                    console.error("Error incrementando contador:", counterError);
                }

                // Log detallado para depurar problemas
                if (error.request) {
                    console.error("Request:", error.request);
                }
                if (error.response) {
                    console.error("Response:", error.response);
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                }

                let errorMsg = "Error desconocido";

                if (error.response) {
                    errorMsg = error.response.data?.title ||
                        error.response.data?.message ||
                        `Error ${error.response.status}: ${error.response.statusText}`;
                } else if (error.message) {
                    errorMsg = error.message;
                }

                alert(`Error al eliminar: ${errorMsg}`);
                showConfirmDelete.value = false;
            }
        };

        // Función para cargar datos
        const fetchData = async (section) => {
            try {
                console.log(`Cargando datos de ${section}...`);
                const response = await api.get(`/${section}`);

                console.log(`Datos ${section} recibidos:`, response.data);

                // Asignar datos a la referencia correspondiente
                switch (section) {
                    case 'Pedido':
                        pedidos.value = response.data;
                        break;
                    case 'Productos':
                        productos.value = response.data;
                        break;
                    case 'Reservations':
                        // Asegurarnos de que recibimos datos válidos
                        if (Array.isArray(response.data)) {
                            reservations.value = response.data;
                            console.log(`${reservations.value.length} reservaciones cargadas`);
                        } else {
                            console.error("Los datos de reservaciones no son un array:", response.data);
                            reservations.value = [];
                        }
                        break;
                    case 'User':
                        users.value = response.data;
                        break;
                    case 'Items':
                        items.value = response.data;
                        break;
                }
            } catch (error) {
                console.error(`Error cargando ${section}:`, error);
                
                // Incrementar contador de errores
                try {
                    errorCounter.value++;
                    await api.put('/ErrorCounter', errorCounter.value);
                } catch (counterError) {
                    console.error("Error incrementando contador:", counterError);
                }
                
                if (error.response) {
                    console.error("Detalles del error:", error.response);
                }
            }
        };

        // Cargar datos iniciales
        onMounted(async () => {
            // Agregar interceptores para debug
            api.interceptors.request.use(
                config => {
                    console.log(`Enviando ${config.method.toUpperCase()} a ${config.url}`, config.data);
                    return config;
                },
                error => {
                    console.error("Error en interceptor de solicitud:", error);
                    return Promise.reject(error);
                }
            );

            api.interceptors.response.use(
                response => {
                    console.log(`Respuesta de ${response.config.url}:`, response.data);
                    return response;
                },
                error => {
                    console.error("Error en interceptor de respuesta:", error);
                    return Promise.reject(error);
                }
            );

            try {
                // Cargar el valor del contador de errores
                await fetchErrorCounter();
                
                // Cargar datos de todas las secciones
                for (const section of sections) {
                    await fetchData(section);
                }
            } catch (error) {
                console.error("Error cargando datos iniciales:", error);
            }
        });

        return {
            activeSection,
            sections,
            pedidos,
            productos,
            reservations,
            users,
            items,
            errorCounter,
            showModal,
            modalType,
            modalSection,
            formData,
            showConfirmDelete,
            openModal,
            closeModal,
            openEditModal,
            getInputType,
            saveItem,
            checkAndConfirmDelete,
            deleteItem,
            logReservations,
            adminInfo,
            handleLogout,
            formatItems,
            formatItemsMinimal,
            parseItemsForEdit,
            addNewItem,
            removeItem,
            incrementErrorCounterManually
        };
    }
    
});
</script>

<style lang="scss">
$primary-color: #3a57e8;
$primary-gradient: linear-gradient(135deg, #3a57e8 0%, #2b48d1 100%);
$secondary-color: #6c7293;
$accent-color: #00d0bd;
$accent-gradient: linear-gradient(135deg, #00d0bd 0%, #00a99d 100%);
$success-color: #1ee0ac;
$danger-color: #f1416c;
$warning-color: #ffc700;
$info-color: #0dcaf0;
$light-color: #f8f9fa;
$dark-color: #202342;
$body-bg: #f5f6fa;
$card-bg: #ffffff;

// Typography
$font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
$font-size-base: 0.95rem;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-bold: 600;
$font-weight-bolder: 700;

// Shadows & Effects
$shadow-sm: 0 2px 4px rgba(31, 45, 61, 0.1);
$shadow-md: 0 5px 12px rgba(31, 45, 61, 0.15);
$shadow-lg: 0 10px 25px rgba(31, 45, 61, 0.18);
$shadow-float: 0 15px 35px rgba(31, 45, 61, 0.18), 0 5px 15px rgba(31, 45, 61, 0.1);
$shadow-inner: inset 0 1px 2px rgba(31, 45, 61, 0.05);
$shadow-focus: 0 0 0 0.25rem rgba(58, 87, 232, 0.25);

// Border radius
$radius-sm: 0.35rem;
$radius-md: 0.5rem;
$radius-lg: 0.75rem;
$radius-pill: 50rem;

// Transitions
$transition-base: all 0.3s ease;
$transition-slide: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
$transition-pop: all 0.25s cubic-bezier(0.68, -0.55, 0.265, 1.55);

// Mixins
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

@mixin button-base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: $font-weight-medium;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 0;
    padding: 0.55rem 1.25rem;
    font-size: $font-size-base;
    border-radius: $radius-md;
    transition: $transition-base;
    position: relative;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        background-color: rgba(255, 255, 255, 0.15);
        transition: $transition-base;
    }

    &:hover::after {
        opacity: 1;
    }

    &:active {
        transform: translateY(1px);
    }
}

@mixin button-variant($bg, $color: white) {
    background: $bg;
    color: $color;

}

@mixin card {
    background-color: $card-bg;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
    transition: $transition-base;
    border: 1px solid rgba(231, 234, 243, 0.7);
    overflow: hidden;

    &:hover {
        transform: translateY(-3px);
        box-shadow: $shadow-lg;
    }
}

// Reset & Base
.admin-dashboard {
    font-family: $font-family;
    font-size: $font-size-base;
    line-height: 1.5;
    color: $dark-color;
    background-color: $body-bg;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 100vh;

    * {
        box-sizing: border-box;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-weight: $font-weight-bold;
        line-height: 1.2;
    }

    // Navigation
    .dashboard-nav {
        display: flex;
        justify-content: center;
        gap: 0.25rem;
        margin-bottom: 2rem;
        padding: 0.375rem;
        background: $card-bg;
        border-radius: $radius-lg;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        position: sticky;
        top: 1rem;
        z-index: 90;

        button {
            @include button-base;
            background: transparent;
            color: #6e7891;
            padding: 0.75rem 1.25rem;
            font-weight: 500;
            font-size: 0.925rem;
            position: relative;
            z-index: 1;
            box-shadow: none;
            transition: all 0.2s ease;
            border-radius: $radius-md;

            &:hover {
                color: $primary-color;
                background-color: rgba($primary-color, 0.04);
            }

            &.active {
                color: white;
                font-weight: 600;
                background: $primary-gradient;
                box-shadow: 0 4px 10px rgba($primary-color, 0.25);

                &:hover {
                    box-shadow: 0 4px 12px rgba($primary-color, 0.35);
                    transform: translateY(-1px);
                }
            }
        }
    }

    // Content sections
    .dashboard-content {
        position: relative;
    }

    .section-content {
        margin-bottom: 2.5rem;
        @include card;
        padding: 0;

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 1.75rem;
            border-bottom: 1px solid #edf2f9;
            background: white;

            h2 {
                margin: 0;
                font-size: 1.25rem;
                color: #3d4465;
                font-weight: 600;
                display: flex;
                align-items: center;
                position: relative;

                &::before {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 24px;
                    background: $primary-gradient;
                    border-radius: 4px;
                    margin-right: 12px;
                }
            }

            .section-actions button {
                @include button-base;
                background: $primary-color;
                color: white;
                padding: 0.65rem 1.5rem;
                border-radius: $radius-md;
                font-weight: 500;
                font-size: 0.9375rem;
                position: relative;
                box-shadow: 0 3px 5px rgba($primary-color, 0.25);
                display: flex;
                align-items: center;

                &::before {
                    content: '+';
                    font-size: 1.25rem;
                    margin-right: 0.5rem;
                    font-weight: 400;
                    line-height: 0.75;
                }

                &:hover {
                    background: $primary-color;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba($primary-color, 0.3);
                }
            }
        }

        // Debug section
        .debug-info {
            margin: 1.25rem 1.75rem;
            padding: 1rem 1.25rem;
            background-color: rgba($info-color, 0.1);
            border-radius: $radius-md;
            border-left: 4px solid $info-color;
            display: flex;
            justify-content: space-between;
            align-items: center;

            p {
                margin: 0;
                font-weight: $font-weight-medium;
                color: $info-color;
            }

            button {
                @include button-base;
                @include button-variant($info-color);
                padding: 0.45rem 0.95rem;
                font-size: 0.85rem;
            }
        }

        // Grid of items
        .items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
            padding: 1.75rem;

            .item-card {
                display: flex;
                flex-direction: column;
                border-radius: $radius-md;
                background-color: white;
                border: 1px solid #edf2f9;
                box-shadow: 0 0.75rem 1.5rem rgba(18, 38, 63, 0.03);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
                overflow: hidden;

                &:hover {
                    box-shadow: 0 0.75rem 2rem rgba(18, 38, 63, 0.06);
                    transform: translateY(-2px);
                    border-color: #e5e9f2;
                }

                .item-details {
                    padding: 1.5rem;
                    flex-grow: 1;

                    div:first-child {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background: #eef3ff;
                        color: $primary-color;
                        padding: 0.5rem 0.75rem;
                        border-radius: $radius-sm;
                        margin-bottom: 1.25rem;
                        font-weight: 600;
                        font-size: 0.875rem;
                        box-shadow: 0 2px 4px rgba($primary-color, 0.1);
                        border-left: 3px solid $primary-color;
                    }

                    span {
                        display: flex;
                        align-items: baseline;
                        margin-bottom: 0.75rem;
                        line-height: 1.5;
                        color: #6e7891;
                        font-size: 0.875rem;
                        border-bottom: 1px dashed rgba(#6e7891, 0.1);
                        padding-bottom: 0.5rem;

                        strong {
                            color: #3d4465;
                            font-weight: 600;
                            width: 120px;
                            flex-shrink: 0;
                        }
                    }

                    pre {
                        background-color: #f8f9fc;
                        padding: 1rem;
                        border-radius: $radius-sm;
                        font-size: 0.8125rem;
                        font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
                        overflow: auto;
                        margin: 0.75rem 0 0;
                        max-height: 180px;
                        color: #4b5675;
                        border: 1px solid #edf2f9;
                        line-height: 1.6;
                    }
                }

                .item-actions {
                    display: flex;
                    margin-top: auto;
                    background: #f8f9fc;

                    button {
                        flex: 1;
                        padding: 0.75rem;
                        border: none;
                        background: none;
                        cursor: pointer;
                        transition: all 0.15s ease;
                        font-weight: 500;
                        font-size: 0.875rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        color: #4f566b;

                        &:hover {
                            background-color: #eef3ff;
                        }

                        &:active {
                            transform: translateY(1px);
                        }

                        &:first-child {
                            color: $primary-color;
                            border-right: 1px solid #edf2f9;

                            &::before {
                                content: '';
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' stroke='%233a57e8' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'%3E%3C/path%3E%3C/svg%3E");
                                background-repeat: no-repeat;
                            }
                        }

                        &:last-child {
                            color: $danger-color;

                            &::before {
                                content: '';
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16' stroke='%23f1416c' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='3 6 5 6 21 6'%3E%3C/polyline%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'%3E%3C/path%3E%3C/svg%3E");
                                background-repeat: no-repeat;
                            }
                        }
                    }
                }
            }
        }
    }

    // Modals
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($dark-color, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(8px);

        .modal-content {
            background-color: white;
            border-radius: $radius-lg;
            width: 90%;
            max-width: 550px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            position: relative;
            box-shadow: $shadow-float;
            animation: modalFadeIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            border: 1px solid rgba(231, 234, 243, 0.7);

            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px) scale(0.95);
                }

                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            .close {
                position: absolute;
                top: 1.25rem;
                right: 1.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                color: $secondary-color;
                transition: $transition-pop;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                z-index: 2;

                &:hover {
                    color: $danger-color;
                    transform: rotate(90deg);
                    background-color: rgba($danger-color, 0.1);
                }
            }

            h2 {
                font-size: 1.25rem;
                color: $dark-color;
                margin: 0;
                padding: 1.5rem 1.75rem;
                border-bottom: 1px solid rgba(231, 234, 243, 0.7);
                background-color: white;
                z-index: 1;
            }

            form {
                padding: 1.5rem 1.75rem 2rem;
                overflow-y: auto;

                .form-group {
                    margin-bottom: 1.5rem;

                    label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: $font-weight-medium;
                        color: $dark-color;
                        font-size: 0.95rem;
                    }

                    input,
                    select,
                    textarea {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        border: 1px solid rgba($secondary-color, 0.2);
                        border-radius: $radius-md;
                        font-size: 0.95rem;
                        transition: $transition-base;
                        background-color: rgba($light-color, 0.5);
                        color: $dark-color;

                        &:focus {
                            outline: none;
                            border-color: $primary-color;
                            box-shadow: $shadow-focus;
                            background-color: white;
                        }

                        &:disabled {
                            background-color: rgba($secondary-color, 0.1);
                            cursor: not-allowed;
                            opacity: 0.75;
                        }
                    }
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;

                    .cancel-btn {
                        @include button-base;
                        background-color: transparent;
                        color: $secondary-color;
                        border: 1px solid rgba($secondary-color, 0.2);

                        &:hover {
                            color: $dark-color;
                            border-color: $secondary-color;
                        }
                    }

                    .submit-btn {
                        @include button-base;
                        @include button-variant($primary-gradient);
                        padding-left: 1.75rem;
                        padding-right: 1.75rem;
                        box-shadow: 0 4px 12px rgba($primary-color, 0.3);

                        &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 15px rgba($primary-color, 0.4);
                        }
                    }
                }
            }

            .modal-actions {
                padding: 1.25rem 1.75rem;
                background-color: rgba($light-color, 0.5);
                border-top: 1px solid rgba(231, 234, 243, 0.7);
                display: flex;
                justify-content: flex-end;
                gap: 1rem;

                button {
                    @include button-base;

                    &:first-child {
                        background-color: transparent;
                        color: $secondary-color;
                        border: 1px solid rgba($secondary-color, 0.2);

                        &:hover {
                            color: $dark-color;
                            border-color: $secondary-color;
                        }
                    }

                    &:last-child {
                        @include button-variant($danger-color);
                        box-shadow: 0 4px 12px rgba($danger-color, 0.3);

                        &:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 15px rgba($danger-color, 0.4);
                        }
                    }
                }
            }
        }
    }
}

// Dark mode adjustments - apply these classes when dark mode is active
.dark-mode {
    .admin-dashboard {
        background-color: #151521;
        color: #e2e5ec;

        .dashboard-nav {
            background: #1c1c2d;

            button {
                color: #9397ab;

                &:hover {
                    color: #fff;
                }

                &.active {
                    color: #fff;
                    background: rgba(#fff, 0.05);
                }
            }
        }

        .section-content {
            background-color: #1c1c2d;
            border-color: rgba(#fff, 0.05);

            .section-header {
                background: linear-gradient(to right, rgba(#000, 0.2), transparent);
                border-color: rgba(#fff, 0.05);

                h2 {
                    color: #fff;
                }
            }

            .items-grid {
                .item-card {
                    background-color: #252538;
                    border-color: rgba(#fff, 0.05);

                    .item-details {
                        div:first-child {
                            background: rgba($primary-color, 0.2);
                        }

                        span {
                            color: #9397ab;

                            &:nth-child(odd) {
                                background-color: rgba(#000, 0.15);
                            }

                            strong {
                                color: #fff;
                            }
                        }

                        pre {
                            background-color: rgba(#000, 0.3);
                            border-color: rgba(#fff, 0.1);
                            color: #e2e5ec;
                        }
                    }

                    .item-actions {
                        border-color: rgba(#fff, 0.05);

                        button:first-child {
                            border-color: rgba(#fff, 0.05);
                        }
                    }
                }
            }
        }

        .modal {
            .modal-content {
                background-color: #1c1c2d;
                border-color: rgba(#fff, 0.05);

                h2 {
                    color: #fff;
                    background-color: #1c1c2d;
                    border-color: rgba(#fff, 0.05);
                }

                form {
                    .form-group {
                        label {
                            color: #e2e5ec;
                        }

                        input,
                        select,
                        textarea {
                            background-color: #252538;
                            border-color: rgba(#fff, 0.05);
                            color: #e2e5ec;

                            &:focus {
                                background-color: #303045;
                            }

                            &:disabled {
                                background-color: rgba(#000, 0.3);
                            }
                        }
                    }
                }

                .modal-actions {
                    background-color: #151521;
                    border-color: rgba(#fff, 0.05);
                }
            }
        }
    }
}

// Responsive adaptations
@media (max-width: 992px) {
    .admin-dashboard {
        padding: 1rem;

        .dashboard-nav {
            button {
                padding: 0.6rem 1.2rem;
                font-size: 0.9rem;
            }
        }

        .section-content {
            .section-header {
                padding: 1.25rem;

                h2 {
                    font-size: 1.2rem;

                    &::before {
                        left: -1.25rem;
                    }
                }
            }

            .items-grid {
                padding: 1.25rem;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }
        }
    }
}

@media (max-width: 768px) {
    .admin-dashboard {
        padding: 0.75rem;

        .dashboard-nav {
            flex-wrap: nowrap;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 0.5rem;

            button {
                padding: 0.5rem 1rem;
                font-size: 0.85rem;
                white-space: nowrap;
            }
        }

        .section-content {
            .section-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;

                h2 {
                    &::before {
                        height: 100%;
                    }
                }

                .section-actions {
                    width: 100%;

                    button {
                        width: 100%;
                    }
                }
            }

            .items-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }

        .modal {
            .modal-content {
                width: 95%;
                max-height: 95vh;

                form {
                    padding: 1.25rem;

                    .form-actions {
                        flex-direction: column;

                        button {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}

// Animations and transitions
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.fade-in {
    animation: fadeIn 0.3s ease forwards;
}

.slide-up {
    animation: slideUp 0.5s ease forwards;
}

// Custom scrollbar for the entire dashboard
.admin-dashboard {
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }

    &::-webkit-scrollbar-track {
        background: rgba($secondary-color, 0.05);
    }

    &::-webkit-scrollbar-thumb {
        background: rgba($primary-color, 0.3);
        border-radius: $radius-pill;
        border: 3px solid $body-bg;

        &:hover {
            background: rgba($primary-color, 0.5);
        }
    }
}

// Utilities for item status indicators
.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.35rem 0.75rem;
    border-radius: $radius-pill;
    font-size: 0.8rem;
    font-weight: $font-weight-medium;

    &::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 0.5rem;
    }

    &.status-active {
        background-color: rgba($success-color, 0.1);
        color: $success-color;

        &::before {
            background-color: $success-color;
        }
    }

    &.status-pending {
        background-color: rgba($warning-color, 0.1);
        color: $warning-color;

        &::before {
            background-color: $warning-color;
        }
    }

    &.status-inactive {
        background-color: rgba($danger-color, 0.1);
        color: $danger-color;

        &::before {
            background-color: $danger-color;
        }
    }
}

// Hover effects for cards
.hover-lift {
    transition: $transition-base;

    &:hover {
        transform: translateY(-5px);
        box-shadow: $shadow-lg;
    }
}

// Additional polish
.section-content {
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba($primary-color, 0.06) 0%, rgba($primary-color, 0) 50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: $radius-lg;
    }

    &:hover::before {
        opacity: 1;
    }
}

// Dashboard header styles
.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.25rem 1.75rem;
    background: $card-bg;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
}

.dashboard-title {
    font-size: 1.75rem;
    color: $dark-color;
    margin: 0;
    position: relative;
    padding-left: 1rem;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 70%;
        width: 5px;
        background: $primary-gradient;
        border-radius: 3px;
    }
}

.dashboard-user {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    span {
        font-weight: $font-weight-medium;
        color: $secondary-color;
    }

    .logout-button {
        @include button-base;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: $danger-color;
        background-color: rgba($danger-color, 0.08);
        padding: 0.5rem 1rem;
        border-radius: $radius-md;
        font-weight: 500;
        font-size: 0.875rem;

        &:hover {
            background-color: rgba($danger-color, 0.15);
            box-shadow: 0 3px 5px rgba($danger-color, 0.2);
        }

        svg {
            stroke: $danger-color;
        }
    }
}

// Añadir estos estilos dentro de la sección de media queries
@media (max-width: 768px) {
    .admin-dashboard {
        .dashboard-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            padding: 1rem;
        }

        .dashboard-user {
            width: 100%;
            justify-content: space-between;
        }
    }
}
</style>