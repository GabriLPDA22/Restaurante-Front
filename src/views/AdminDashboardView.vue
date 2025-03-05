<template>
    <div class="admin-dashboard">
        <nav class="dashboard-nav">
            <button 
                v-for="section in sections" 
                :key="section"
                @click="activeSection = section"
                :class="{ active: activeSection === section }"
            >
                {{ section }}
            </button>
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
                    <div v-for="user in users" :key="user.userID || user.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ user.userID || user.id }}</div>
                            <span v-for="(value, key, index) in user" :key="index" v-if="key !== 'userID' && key !== 'id' && key !== 'googleId' && key !== 'pictureUrl' && key !== 'roles' && key !== 'password'">
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
                    <div v-for="item in items" :key="item.id" class="item-card">
                        <div class="item-details">
                            <div><strong>ID:</strong> {{ item.id }}</div>
                            <span v-for="(value, key, index) in item" :key="index" v-if="key !== 'id'">
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
                    <!-- Campo userID oculto para referencia interna -->
                    <input type="hidden" v-model="formData.userID">
                    
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input id="nombre" v-model="formData.nombre" type="text" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input id="email" v-model="formData.email" type="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="telefono">Teléfono:</label>
                        <input id="telefono" v-model="formData.telefono" type="text">
                    </div>
                    
                    <div class="form-group">
                        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                        <input id="fechaNacimiento" v-model="formData.fechaNacimiento" type="datetime-local">
                    </div>
                    
                    <div class="form-group" v-if="modalType === 'edit'">
                        <label for="password">Contraseña (dejar en blanco para mantener):</label>
                        <input id="password" v-model="formData.password" type="password">
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
                        <input 
                            :id="key" 
                            v-model="formData[key]" 
                            :type="getInputType(key)" 
                            :disabled="key === 'id' || key === 'userID'"
                        >
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

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
    setup() {
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

        // Estado del modal
        const showModal = ref(false);
        const modalType = ref('create');
        const modalSection = ref('');
        const formData = reactive({});

        // Estado de confirmación de eliminación
        const showConfirmDelete = ref(false);
        const deleteItemId = ref(null);
        const deleteItemSection = ref('');

        // Función para obtener el ID efectivo según el tipo de objeto
        const getEffectiveId = (item, section) => {
            // Caso especial para User que puede usar userID en lugar de id
            if (section === 'User' && item.userID !== undefined) {
                console.log("Usando userID para usuario:", item.userID);
                return item.userID;
            }
            
            // Caso estándar para otros objetos
            if (item.id !== undefined) {
                return item.id;
            }
            
            // Búsqueda de cualquier campo que termine con "ID" o "Id" independiente de mayúsculas/minúsculas
            for (const key in item) {
                if (typeof key === 'string' && key.toLowerCase().endsWith('id')) {
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

        // Función para abrir el modal para crear
        const openModal = (type, section) => {
            modalType.value = type;
            modalSection.value = section;
            
            // Limpiar formData
            Object.keys(formData).forEach(key => delete formData[key]);
            
            // Campos por defecto para creación
            if (section === 'Reservations') {
                formData.datetime = new Date().toISOString().slice(0, 16);
                formData.customername = '';
                formData.tableid = '';
            } else if (section === 'User') {
                formData.nombre = '';
                formData.email = '';
                formData.telefono = '';
                formData.fechaNacimiento = new Date().toISOString().slice(0, 16);
                formData.password = '';
            }
            
            console.log("FormData para creación:", formData);
            showModal.value = true;
        };

        // Función para cerrar el modal
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
                // Para User, solo copiar los campos relevantes (excluir googleId, pictureUrl, roles)
                formData.userID = item.userID; // Mantener el ID para referencia
                formData.nombre = item.nombre || '';
                formData.email = item.email || '';
                formData.telefono = item.telefono || '';
                formData.password = ''; // Campo vacío para la contraseña
                
                // Formatear fechaNacimiento si existe
                if (item.fechaNacimiento) {
                    try {
                        const date = new Date(item.fechaNacimiento);
                        formData.fechaNacimiento = date.toISOString().slice(0, 16);
                    } catch (e) {
                        console.error(`Error formateando fechaNacimiento:`, e);
                        formData.fechaNacimiento = item.fechaNacimiento;
                    }
                } else {
                    formData.fechaNacimiento = new Date().toISOString().slice(0, 16);
                }
            } else {
                // Para otras secciones, mantener la lógica original
                Object.keys(item).forEach(key => {
                    // Formatear fechas para inputs datetime-local
                    if (typeof item[key] === 'string' && item[key] && item[key].includes('T') && getInputType(key) === 'datetime-local') {
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
                
                // Asegurarnos de que el ID esté correctamente establecido para la operación PUT
                formData.id = effectiveId;
            }
            
            console.log("FormData para edición:", formData);
            showModal.value = true;
        };

        // Función para determinar el tipo de input
        const getInputType = (key) => {
            const keyLower = key.toLowerCase();
            if (keyLower.includes('fecha') || keyLower === 'datetime' || keyLower === 'fechanacimiento') return 'datetime-local';
            if (keyLower.includes('password') || keyLower.includes('contraseña')) return 'password';
            if (keyLower.includes('email')) return 'email';
            if (keyLower.includes('precio') || keyLower.includes('total')) return 'number';
            if (keyLower.includes('id') && keyLower !== 'id' && keyLower !== 'userid') return 'number';
            return 'text';
        };

        // Función para guardar (crear o editar)
        const saveItem = async () => {
            try {
                const section = modalSection.value;
                const data = { ...formData }; // Copia para no modificar el original
                
                console.log(`Guardando ${modalType.value} en ${section}:`, data);
                
                let response;
                if (modalType.value === 'create') {
                    // Para crear, eliminar los posibles campos de ID
                    delete data.id;
                    delete data.userID;
                    
                    response = await api.post(`/${section}`, data);
                    console.log("Respuesta de creación:", response.data);
                } else {
                    // Para editar, usamos el ID específico en la URL
                    let itemId = null;
                    
                    // Determinar el ID correcto según la sección
                    if (section === 'User' && data.userID !== undefined) {
                        itemId = data.userID;
                    } else {
                        itemId = data.id;
                    }
                    
                    if (!itemId) {
                        throw new Error(`ID no válido para editar ${section} - no se puede realizar la operación PUT`);
                    }
                    
                    // Preparar datos específicos para cada sección
                    let itemData;
                    
                    if (section === 'User') {
                        // Para User, solo incluir los campos del DTO
                        itemData = {
                            nombre: data.nombre,
                            email: data.email,
                            telefono: data.telefono,
                            fechaNacimiento: data.fechaNacimiento
                        };
                        
                        // Solo incluir password si no está vacío
                        if (data.password && data.password.trim() !== '') {
                            itemData.password = data.password;
                        }
                        
                        console.log("Datos específicos para User PUT:", itemData);
                    } else {
                        // Para otras secciones, enviar todos los campos excepto ID
                        itemData = { ...data };
                        delete itemData.id;
                        delete itemData.userID;
                    }
                    
                    console.log(`Enviando PUT a /${section}/${itemId} con datos:`, itemData);
                    
                    // PUT con ID en la URL y datos específicos en el body
                    response = await api.put(`/${section}/${itemId}`, itemData);
                    console.log("Respuesta de actualización:", response.data);
                }
                
                // Actualizar datos y cerrar modal
                await fetchData(section);
                showModal.value = false;
                
                alert(`${section} ${modalType.value === 'create' ? 'creado' : 'actualizado'} correctamente`);
            } catch (error) {
                console.error("Error guardando datos:", error);
                
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
            logReservations
        };
    }
});
</script>
<style lang="scss" scoped>
// Variables
$primary-color: #4a6ee0;
$primary-color-dark: #3a55b4; // Versión oscura predefinida
$secondary-color: #6c757d;
$success-color: #28a745;
$success-color-dark: #1e7e34; // Versión oscura predefinida
$danger-color: #dc3545;
$danger-color-dark: #bd2130; // Versión oscura predefinida
$warning-color: #ffc107;
$light-color: #f8f9fa;
$dark-color: #343a40;
$border-radius: 8px;
$box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
$transition: all 0.3s ease;

// Mixins
@mixin button($bg-color, $bg-color-dark, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: $border-radius;
  padding: 10px 15px;
  cursor: pointer;
  transition: $transition;
  font-weight: 500;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $box-shadow;
    background-color: $bg-color-dark;
  }
}

@mixin card {
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  transition: $transition;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

// Main Styles
.admin-dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fc;
  color: #333;
  min-height: 100vh;
  
  // Navigation
  .dashboard-nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
    flex-wrap: wrap;
    
    button {
      @include button(white, #f0f0f0, $dark-color);
      border: 1px solid #e1e5eb;
      position: relative;
      padding: 12px 25px;
      font-size: 15px;
      overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 3px;
        background-color: $primary-color;
        transition: width 0.3s ease;
      }
      
      &:hover::after {
        width: 100%;
      }
      
      &.active {
        background-color: $primary-color;
        color: white;
        
        &::after {
          width: 100%;
          background-color: white;
        }
      }
    }
  }
  
  // Content sections
  .section-content {
    margin-bottom: 30px;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 20px;
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      border-bottom: 1px solid #e1e5eb;
      padding-bottom: 15px;
      
      h2 {
        margin: 0;
        font-size: 1.5rem;
        color: $dark-color;
        font-weight: 600;
      }
      
      .section-actions button {
        @include button($success-color, $success-color-dark);
        padding: 10px 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        
        &::before {
          content: '+';
          font-size: 1.2rem;
          font-weight: bold;
        }
      }
    }
    
    // Debug section
    .debug-info {
      margin-bottom: 20px;
      padding: 10px 15px;
      background-color: #e8f4fd;
      border-radius: $border-radius;
      border-left: 4px solid $primary-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      p {
        margin: 0;
        font-weight: 500;
        color: $primary-color;
      }
      
      button {
        @include button($primary-color, $primary-color-dark);
        padding: 5px 10px;
        font-size: 0.9rem;
      }
    }
    
    // Grid of items
    .items-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      
      .item-card {
        @include card;
        display: flex;
        flex-direction: column;
        
        .item-details {
          padding: 15px;
          flex-grow: 1;
          
          span {
            display: block;
            margin-bottom: 8px;
            line-height: 1.5;
            color: $secondary-color;
            word-break: break-word;
            
            strong {
              color: $dark-color;
              font-weight: 600;
              margin-right: 5px;
            }
          }
          
          pre {
            background-color: #f7f9fc;
            padding: 12px;
            border-radius: 5px;
            font-size: 0.9rem;
            overflow: auto;
            margin: 0;
            max-height: 200px;
            color: $dark-color;
            border: 1px solid #e1e5eb;
          }
        }
        
        .item-actions {
          display: flex;
          border-top: 1px solid #e1e5eb;
          
          button {
            flex: 1;
            padding: 12px;
            border: none;
            background: none;
            cursor: pointer;
            transition: $transition;
            font-weight: 500;
            
            &:first-child {
              color: $primary-color;
              border-right: 1px solid #e1e5eb;
              
              &:hover {
                background-color: rgba($primary-color, 0.1);
              }
            }
            
            &:last-child {
              color: $danger-color;
              
              &:hover {
                background-color: rgba($danger-color, 0.1);
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
    
    .modal-content {
      background-color: white;
      border-radius: $border-radius;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      animation: modalFadeIn 0.3s ease;
      
      @keyframes modalFadeIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        color: $secondary-color;
        transition: $transition;
        
        &:hover {
          color: $dark-color;
          transform: rotate(90deg);
        }
      }
      
      h2 {
        font-size: 1.5rem;
        color: $dark-color;
        margin: 0;
        padding: 20px;
        border-bottom: 1px solid #e1e5eb;
      }
      
      form {
        padding: 20px;
        
        .form-group {
          margin-bottom: 20px;
          
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: $dark-color;
          }
          
          input, select, textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #e1e5eb;
            border-radius: 6px;
            font-size: 1rem;
            transition: $transition;
            background-color: #f7f9fc;
            
            &:focus {
              outline: none;
              border-color: $primary-color;
              box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
              background-color: white;
            }
            
            &:disabled {
              background-color: #e9ecef;
              cursor: not-allowed;
            }
          }
        }
        
        button[type="submit"] {
          @include button($primary-color, $primary-color-dark);
          float: right;
        }
      }
      
      .modal-actions {
        padding: 15px 20px;
        background-color: #f7f9fc;
        border-top: 1px solid #e1e5eb;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        
        button {
          &:first-child {
            @include button(white, #f0f0f0, $dark-color);
            border: 1px solid #e1e5eb;
          }
          
          &:last-child {
            @include button($danger-color, $danger-color-dark);
          }
        }
      }
    }
  }
}

// Responsive adaptations
@media (max-width: 768px) {
  .admin-dashboard {
    padding: 10px;
    
    .dashboard-nav {
      button {
        padding: 10px 15px;
        font-size: 14px;
      }
    }
    
    .section-content {
      padding: 15px;
      
      .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        
        .section-actions {
          width: 100%;
          button {
            width: 100%;
          }
        }
      }
      
      .items-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>