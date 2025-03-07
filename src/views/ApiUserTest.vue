<template>
    <div class="test-api-container">
        <h2>Prueba de API de Usuario</h2>

        <div class="section user-info">
            <h3>Información de usuario actual</h3>
            <pre>{{ userInfoFormatted }}</pre>
        </div>

        <div class="section test-update">
            <h3>Actualizar perfil</h3>
            <div class="form-group">
                <label>Nombre:</label>
                <input v-model="formData.nombre" type="text" />
            </div>
            <div class="form-group">
                <label>Teléfono:</label>
                <input v-model="formData.telefono" type="text" />
            </div>
            <div class="form-group">
                <label>Fecha de nacimiento (DD/MM/AAAA):</label>
                <input v-model="formData.fechaNacimiento" type="text" placeholder="DD/MM/AAAA" />
            </div>

            <div class="buttons">
                <button @click="testUpdateProfile" :disabled="loading">
                    {{ loading ? 'Actualizando...' : 'Probar Actualización' }}
                </button>
            </div>
        </div>

        <div v-if="lastApiCall" class="section api-result">
            <h3>Resultado de la última llamada API</h3>
            <div :class="['result', lastApiCall.success ? 'success' : 'error']">
                <p><strong>Éxito:</strong> {{ lastApiCall.success ? 'Sí' : 'No' }}</p>
                <p><strong>Mensaje:</strong> {{ lastApiCall.message }}</p>

                <div v-if="lastApiCall.requestData">
                    <h4>Datos enviados:</h4>
                    <pre>{{ JSON.stringify(lastApiCall.requestData, null, 2) }}</pre>
                </div>

                <div v-if="lastApiCall.responseData">
                    <h4>Respuesta:</h4>
                    <pre>{{ JSON.stringify(lastApiCall.responseData, null, 2) }}</pre>
                </div>

                <div v-if="lastApiCall.error">
                    <h4>Error:</h4>
                    <pre>{{ lastApiCall.error }}</pre>
                </div>
            </div>
        </div>

        <div class="section action-buttons">
            <button @click="reloadUserData" class="btn-secondary">Recargar datos de usuario</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import axios from 'axios';

const authStore = useAuthStore();
const loading = ref(false);
const lastApiCall = ref(null);

// Datos del formulario
const formData = ref({
    nombre: '',
    telefono: '',
    fechaNacimiento: ''
});

// Cargar datos iniciales del usuario
onMounted(() => {
    loadUserDataToForm();
});

// Formatear información de usuario para mostrar
const userInfoFormatted = computed(() => {
    return JSON.stringify(authStore.user, null, 2);
});

// Cargar datos del usuario al formulario
function loadUserDataToForm() {
    if (authStore.user) {
        formData.value.nombre = authStore.user.nombre || authStore.user.Nombre || '';
        formData.value.telefono = authStore.user.telefono || authStore.user.Telefono || '';
        formData.value.fechaNacimiento = authStore.user.fechaNacimiento || authStore.user.FechaNacimiento || '';
    }
}

// Recargar datos de usuario
function reloadUserData() {
    authStore.loadUser();
    loadUserDataToForm();
}

// Prueba directa con Axios
async function testUpdateProfileDirect() {
    loading.value = true;
    lastApiCall.value = null;

    const userEmail = authStore.user.email || authStore.user.Email;
    const token = authStore.token;

    if (!userEmail) {
        lastApiCall.value = {
            success: false,
            message: 'No se pudo determinar el email del usuario',
            error: 'Email no disponible en el objeto de usuario'
        };
        loading.value = false;
        return;
    }

    // Formatear fecha (DD/MM/YYYY a YYYY-MM-DD)
    let formattedDate = formData.value.fechaNacimiento;
    if (formData.value.fechaNacimiento && formData.value.fechaNacimiento.includes('/')) {
        const parts = formData.value.fechaNacimiento.split('/');
        if (parts.length === 3) {
            formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
    }

    // Probar primero con claves en minúsculas
    const requestData = {
        email: userEmail,
        nombre: formData.value.nombre,
        telefono: formData.value.telefono,
        fechaNacimiento: formattedDate
    };

    try {
        const response = await axios.put(
            'http://34.196.144.197:8080/api/User/update-by-email',
            requestData,
            {
                headers: {
                    'Authorization': `Bearer ${token || ''}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        lastApiCall.value = {
            success: true,
            message: 'Perfil actualizado correctamente',
            requestData,
            responseData: response.data
        };

        // Actualizar datos en la store
        authStore.loadUser();  // O actualizar manualmente
    } catch (error) {
        console.error('Error en la prueba directa con minúsculas:', error);

        // Intentar con claves en mayúsculas si el primer intento falló
        const alternativeData = {
            Email: userEmail,
            Nombre: formData.value.nombre,
            Telefono: formData.value.telefono,
            FechaNacimiento: formattedDate
        };

        try {
            const response = await axios.put(
                'http://34.196.144.197:8080/api/User/update-by-email',
                alternativeData,
                {
                    headers: {
                        'Authorization': `Bearer ${token || ''}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            lastApiCall.value = {
                success: true,
                message: 'Perfil actualizado correctamente (usando formato alternativo)',
                requestData: alternativeData,
                responseData: response.data
            };

            // Actualizar datos en la store
            authStore.loadUser();
        } catch (altError) {
            // Si ambos intentos fallan, mostrar el error
            lastApiCall.value = {
                success: false,
                message: 'Error al actualizar el perfil',
                requestData: requestData,
                error: `${altError.response?.status || ''} ${altError.response?.statusText || ''}: ${altError.response?.data?.message || altError.message || 'Error desconocido'
                    }`
            };
        }
    } finally {
        loading.value = false;
    }
}

// Prueba usando el método del store
async function testUpdateProfile() {
    loading.value = true;
    lastApiCall.value = null;

    try {
        const updateData = {
            nombre: formData.value.nombre,
            telefono: formData.value.telefono,
            fechaNacimiento: formData.value.fechaNacimiento
        };

        const result = await authStore.updateUserProfile(updateData);

        lastApiCall.value = {
            success: result.success,
            message: result.message,
            requestData: updateData
        };
    } catch (error) {
        lastApiCall.value = {
            success: false,
            message: 'Error al ejecutar updateUserProfile',
            error: error.message || 'Error desconocido'
        };
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.test-api-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.section {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
    margin-top: 0;
    color: #555;
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 15px;
}

pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 14px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.btn-secondary {
    background-color: #6c757d;
}

.btn-secondary:hover {
    background-color: #5a6268;
}

.buttons {
    margin-top: 15px;
}

.result {
    padding: 15px;
    border-radius: 4px;
    margin-top: 10px;
}

.result.success {
    background-color: rgba(40, 167, 69, 0.1);
    border: 1px solid #28a745;
}

.result.error {
    background-color: rgba(220, 53, 69, 0.1);
    border: 1px solid #dc3545;
}

h4 {
    margin-top: 15px;
    margin-bottom: 5px;
    color: #555;
    font-size: 16px;
}
</style>