<template>
    <div class="container">
      <h1>Productos</h1>
      
      <div v-if="cargando">Cargando...</div>
      
      <div v-else class="productos-grid">
        <div v-for="producto in productos" :key="producto.id" class="producto-card">
          <img :src="producto.imagenUrl" :alt="producto.nombre">
          <h3>{{ producto.nombre }}</h3>
          <p>${{ producto.precio.toFixed(2) }}</p>
          <button @click="seleccionarProducto(producto)">Ver comentarios</button>
        </div>
      </div>
      
      <div v-if="productoSeleccionado" class="detalle-producto">
        <h2>{{ productoSeleccionado.nombre }}</h2>
        <img :src="productoSeleccionado.imagenUrl" :alt="productoSeleccionado.nombre">
        <p>{{ productoSeleccionado.descripcion }}</p>
        <p>Precio: ${{ productoSeleccionado.precio.toFixed(2) }}</p>
        
        <div class="comentarios-seccion">
          <h3>Comentarios</h3>
          
          <div v-if="loadingComentarios">
            <p>Cargando comentarios...</p>
          </div>
          
          <div v-else-if="comentarios.length === 0">
            <p>No hay comentarios para este producto.</p>
          </div>
          
          <div v-else class="comentarios-lista">
            <div v-for="comentario in comentarios" :key="comentario.idComentario" class="comentario">
              <div class="comentario-header">
                <h4>{{ comentario.nombre }}</h4>
                <div>
                  <button @click="editarComentario(comentario)">Editar</button>
                  <button @click="confirmarEliminar(comentario)">Eliminar</button>
                </div>
              </div>
              <p>{{ comentario.comentarioTexto }}</p>
              <small>{{ new Date(comentario.fecha).toLocaleString() }}</small>
            </div>
          </div>
          
          <div class="form-comentario">
            <h3>{{ modoEdicion ? 'Editar comentario' : 'Dejar un comentario' }}</h3>
            <form @submit.prevent="enviarComentario">
              <div>
                <label for="nombre">Nombre:</label>
                <input id="nombre" v-model="nuevoComentario.nombre" required>
              </div>
              
              <div>
                <label for="email">Email:</label>
                <input id="email" type="email" v-model="nuevoComentario.email" required>
              </div>
              
              <div>
                <label for="comentario">Comentario:</label>
                <textarea id="comentario" v-model="nuevoComentario.comentarioTexto" required></textarea>
              </div>
              
              <div>
                <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Enviar' }}</button>
                <button v-if="modoEdicion" type="button" @click="cancelarEdicion">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <div v-if="mostrarModalEliminar" class="modal-overlay">
        <div class="modal-content">
          <h3>Confirmar eliminación</h3>
          <p>¿Estás seguro de que deseas eliminar este comentario?</p>
          <div>
            <button @click="mostrarModalEliminar = false">Cancelar</button>
            <button @click="eliminarComentario">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useComentariosStore } from '@/stores/comentariosStore';
import type { Comentario } from '@/stores/comentariosStore';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  categorias: string[];
  alergenos: string[];
}

export default defineComponent({
  name: 'ProductosView',
  
  setup() {
    const apiUrl = 'http://localhost:5021/api';
    const comentariosStore = useComentariosStore();
    
    const productos = ref<Producto[]>([]);
    const productoSeleccionado = ref<Producto | null>(null);
    const cargando = ref(true);
    const loadingComentarios = computed(() => comentariosStore.loading);
    
    const modoEdicion = ref(false);
    const mostrarModalEliminar = ref(false);
    const comentarioAEliminar = ref<Comentario | null>(null);
    
    const nuevoComentario = ref<Comentario>({
      idComentario: 0,
      nombre: '',
      email: '',
      comentarioTexto: '',
      fecha: new Date().toISOString(),
      productoId: 0
    });
    
    const comentarios = computed(() => {
      if (!productoSeleccionado.value) return [];
      return comentariosStore.getComentariosByProductoId(productoSeleccionado.value.id);
    });

    onMounted(async () => {
      try {
        const response = await axios.get<Producto[]>(`${apiUrl}/productos`);
        productos.value = response.data;
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        cargando.value = false;
      }
    });

    const seleccionarProducto = async (producto: Producto) => {
      productoSeleccionado.value = producto;
      resetForm();
      await comentariosStore.fetchComentariosByProductoId(producto.id);
    };
    
    const resetForm = () => {
      nuevoComentario.value = {
        idComentario: 0,
        nombre: '',
        email: '',
        comentarioTexto: '',
        fecha: new Date().toISOString(),
        productoId: productoSeleccionado.value?.id || 0
      };
      modoEdicion.value = false;
    };

    const enviarComentario = async () => {
      if (!productoSeleccionado.value) return;
      
      nuevoComentario.value.productoId = productoSeleccionado.value.id;
      nuevoComentario.value.fecha = new Date().toISOString();
      
      try {
        if (modoEdicion.value) {
          await comentariosStore.updateComentario(nuevoComentario.value);
        } else {
          await comentariosStore.createComentario(nuevoComentario.value);
        }
        
        resetForm();
      } catch (error) {
        console.error('Error con el comentario:', error);
      }
    };
    
    const editarComentario = (comentario: Comentario) => {
      nuevoComentario.value = { ...comentario };
      modoEdicion.value = true;
    };
    
    const cancelarEdicion = () => {
      resetForm();
    };
    
    const confirmarEliminar = (comentario: Comentario) => {
      comentarioAEliminar.value = comentario;
      mostrarModalEliminar.value = true;
    };
    
    const eliminarComentario = async () => {
      if (comentarioAEliminar.value && productoSeleccionado.value) {
        await comentariosStore.deleteComentario(
          comentarioAEliminar.value.idComentario,
          productoSeleccionado.value.id
        );
        
        mostrarModalEliminar.value = false;
        comentarioAEliminar.value = null;
      }
    };

    return {
      productos,
      comentarios,
      productoSeleccionado,
      cargando,
      loadingComentarios,
      nuevoComentario,
      modoEdicion,
      mostrarModalEliminar,
      seleccionarProducto,
      enviarComentario,
      editarComentario,
      cancelarEdicion,
      confirmarEliminar,
      eliminarComentario
    };
  }
});
</script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .productos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
  
  .producto-card {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
  }
  
  .producto-card img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  
  .detalle-producto {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .detalle-producto img {
    max-width: 300px;
    height: auto;
    border-radius: 8px;
  }
  
  .comentarios-seccion {
    margin-top: 20px;
  }
  
  .comentario {
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .comentario-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .form-comentario {
    margin-top: 30px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .form-comentario div {
    margin-bottom: 15px;
  }
  
  .form-comentario label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-comentario input, 
  .form-comentario textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-comentario textarea {
    height: 120px;
    resize: vertical;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-right: 5px;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 25px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
  }
  </style>