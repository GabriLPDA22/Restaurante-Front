<template>
    <div class="api-tester">
        <h2>API Tester</h2>

        <div class="panel">
            <h3>Probar GET Pedidos</h3>
            <button @click="probarGetPedidos" :disabled="cargando">
                {{ cargando ? 'Cargando...' : 'Obtener Pedidos' }}
            </button>
        </div>

        <div class="panel">
            <h3>Probar POST Pedido</h3>
            <div class="form-group">
                <label>UserID:</label>
                <input type="number" v-model.number="userId" />
            </div>
            <div class="test-items">
                <div v-for="(item, index) in items" :key="index" class="item-row">
                    <div class="form-group">
                        <label>ID Producto:</label>
                        <input type="number" v-model.number="item.IdProducto" />
                    </div>
                    <div class="form-group">
                        <label>Cantidad:</label>
                        <input type="number" v-model.number="item.Cantidad" min="1" />
                    </div>
                    <div class="form-group">
                        <label>Precio:</label>
                        <input type="number" v-model.number="item.Precio" step="0.01" />
                    </div>
                    <button @click="removeItem(index)" class="remove-btn">×</button>
                </div>
                <button @click="addItem" class="add-btn">+ Añadir Producto</button>
            </div>
            <button @click="probarPostPedido" :disabled="cargando">
                {{ cargando ? 'Enviando...' : 'Crear Pedido' }}
            </button>
        </div>

        <div class="panel" v-if="resultado">
            <h3>Resultado:</h3>
            <div class="result" :class="{ error: hayError }">
                <pre>{{ resultadoFormateado }}</pre>
            </div>
        </div>

        <div class="panel" v-if="debugInfo">
            <h3>Información de Depuración:</h3>
            <div class="debug-info">
                <pre>{{ JSON.stringify(debugInfo, null, 2) }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';

const cargando = ref(false);
const resultado = ref<any>(null);
const hayError = ref(false);
const debugInfo = ref<any>(null);

// Estado para el formulario de creación
const userId = ref(1);
const items = ref([
    { IdProducto: 1, Cantidad: 1, Precio: 19.99 }
]);

const addItem = () => {
    items.value.push({ IdProducto: 1, Cantidad: 1, Precio: 19.99 });
};

const removeItem = (index: number) => {
    items.value.splice(index, 1);
    if (items.value.length === 0) {
        addItem();
    }
};

const resultadoFormateado = computed(() => {
    if (!resultado.value) return '';
    return typeof resultado.value === 'object'
        ? JSON.stringify(resultado.value, null, 2)
        : resultado.value;
});

const probarGetPedidos = async () => {
    cargando.value = true;
    hayError.value = false;
    resultado.value = null;
    debugInfo.value = null;

    try {
        const response = await axios.get('http://elixiumapi.retocsv.es//api/Pedido/usuario/1', {
            headers: {
                'Accept': 'application/json'
            }
        });

        resultado.value = response.data;
        console.log('GET exitoso:', response);
    } catch (error: any) {
        hayError.value = true;
        handleError(error);
    } finally {
        cargando.value = false;
    }
};

const probarPostPedido = async () => {
    cargando.value = true;
    hayError.value = false;
    resultado.value = null;
    debugInfo.value = null;

    try {
        const pedidoData = {
            UserID: userId.value,
            Items: items.value
        };

        console.log('Enviando datos:', JSON.stringify(pedidoData, null, 2));

        const response = await axios.post('http://elixiumapi.retocsv.es//api/Pedido', pedidoData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        resultado.value = response.data;
        console.log('POST exitoso:', response);
    } catch (error: any) {
        hayError.value = true;
        handleError(error);
    } finally {
        cargando.value = false;
    }
};

const handleError = (error: any) => {
    console.error('Error en la solicitud:', error);

    debugInfo.value = {
        message: error.message,
        name: error.name,
        code: error.code,
        stack: error.stack,
        response: error.response ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data
        } : 'No response',
        request: error.request ? 'Request object present' : 'No request',
        config: error.config
    };

    if (error.response) {
        // El servidor respondió con un código de error
        resultado.value = `Error ${error.response.status}: ${error.response.statusText}`;
        if (error.response.data) {
            if (typeof error.response.data === 'string') {
                resultado.value += `\n${error.response.data}`;
            } else {
                resultado.value += `\n${JSON.stringify(error.response.data, null, 2)}`;
            }
        }
    } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        resultado.value = `No se recibió respuesta del servidor.\nVerifica que el servidor esté funcionando en http://elixiumapi.retocsv.es/`;
    } else {
        // Error al configurar la solicitud
        resultado.value = `Error: ${error.message}`;
    }
};
</script>

<style scoped>
.api-tester {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.panel {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 18px;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.result {
    background-color: #e8f5e9;
    border-radius: 4px;
    padding: 10px;
    overflow: auto;
    max-height: 300px;
}

.result.error {
    background-color: #ffebee;
}

pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
}

.test-items {
    margin-bottom: 15px;
}

.item-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    align-items: flex-end;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 4px;
}

.add-btn {
    background-color: #2196F3;
    margin-bottom: 15px;
}

.remove-btn {
    background-color: #f44336;
    padding: 8px 12px;
    min-width: 40px;
}

.debug-info {
    background-color: #fff8e1;
    border-radius: 4px;
    padding: 10px;
    overflow: auto;
    max-height: 300px;
}
</style>