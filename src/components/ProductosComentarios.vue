<template>
    <div class="container">
      <h1>Productos</h1>
      
      <div v-if="cargando">Cargando...</div>
      
      <div v-else class="productos-grid">
        <div v-for="producto in productos" :key="producto.id" class="producto-card">
          <img :src="producto.imagenUrl" :alt="producto.nombre">
          <h3>{{ producto.nombre }}</h3>
          <p>${{ producto.precio.toFixed(2) }}</p>
          <button @click="seleccionarProducto(producto)">Ver detalles</button>
        </div>
      </div>
      
      <!-- Detalles del producto y comentarios -->
      <div v-if="productoSeleccionado" class="detalle-producto">
        <h2>{{ productoSeleccionado.nombre }}</h2>
        <img :src="productoSeleccionado.imagenUrl" :alt="productoSeleccionado.nombre">
        <p>{{ productoSeleccionado.descripcion }}</p>
        <p>Precio: ${{ productoSeleccionado.precio.toFixed(2) }}</p>
        
        <div class="comentarios-seccion">
          <h3>Comentarios</h3>
          
          <div v-if="comentarios.length === 0">
            <p>No hay comentarios para este producto.</p>
          </div>
          
          <div v-else class="comentarios-lista">
            <div v-for="comentario in comentarios" :key="comentario.idComentario" class="comentario">
              <h4>{{ comentario.nombre }}</h4>
              <p>{{ comentario.comentarioTexto }}</p>
              <small>{{ new Date(comentario.fecha).toLocaleString() }}</small>
            </div>
          </div>
          
          <!-- Formulario simple de comentarios -->
          <div class="form-comentario">
            <h3>Dejar un comentario</h3>
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
              
              <button type="submit">Enviar comentario</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenUrl: string;
    categorias: string[];
    alergenos: string[];
  }
  
  interface Comentario {
    idComentario: number;
    nombre: string;
    email: string;
    comentarioTexto: string;
    fecha: string;
    productoId: number;
  }
  
  export default defineComponent({
    name: 'ProductosBasico',
    
    setup() {
      const apiUrl = 'http://localhost:5021/api';
      const productos = ref<Producto[]>([]);
      const comentarios = ref<Comentario[]>([]);
      const productoSeleccionado = ref<Producto | null>(null);
      const cargando = ref(true);
      
      const nuevoComentario = ref<Comentario>({
        idComentario: 0,
        nombre: '',
        email: '',
        comentarioTexto: '',
        fecha: new Date().toISOString(),
        productoId: 0
      });
  
      // Cargar productos
      onMounted(async () => {
        try {
          const response = await fetch(`${apiUrl}/productos`);
          productos.value = await response.json();
        } catch (error) {
          console.error('Error cargando productos:', error);
        } finally {
          cargando.value = false;
        }
      });
  
      // Seleccionar producto y cargar sus comentarios
      const seleccionarProducto = async (producto: Producto) => {
        productoSeleccionado.value = producto;
        nuevoComentario.value.productoId = producto.id;
        
        try {
          const response = await fetch(`${apiUrl}/comentario/producto/${producto.id}`);
          comentarios.value = await response.json();
        } catch (error) {
          console.error('Error cargando comentarios:', error);
          comentarios.value = [];
        }
      };
  
      // Enviar un comentario
      const enviarComentario = async () => {
        if (!productoSeleccionado.value) return;
        
        try {
          const response = await fetch(`${apiUrl}/comentario`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...nuevoComentario.value,
              fecha: new Date().toISOString()
            })
          });
          
          if (response.ok) {
            // Recargar comentarios
            const comentariosResponse = await fetch(`${apiUrl}/comentario/producto/${productoSeleccionado.value.id}`);
            comentarios.value = await comentariosResponse.json();
            
            // Limpiar formulario
            nuevoComentario.value.nombre = '';
            nuevoComentario.value.email = '';
            nuevoComentario.value.comentarioTexto = '';
            
            alert('Comentario añadido');
          } else {
            alert('Error al enviar el comentario');
          }
        } catch (error) {
          console.error('Error enviando comentario:', error);
          alert('Error al enviar el comentario');
        }
      };
  
      return {
        productos,
        comentarios,
        productoSeleccionado,
        cargando,
        nuevoComentario,
        seleccionarProducto,
        enviarComentario
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
  }
  
  .producto-card img {
    max-width: 100%;
    height: auto;
  }
  
  .detalle-producto {
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .detalle-producto img {
    max-width: 300px;
    height: auto;
  }
  
  .comentarios-seccion {
    margin-top: 20px;
  }
  
  .comentario {
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .form-comentario {
    margin-top: 20px;
  }
  
  .form-comentario div {
    margin-bottom: 10px;
  }
  
  .form-comentario label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-comentario input, 
  .form-comentario textarea {
    width: 100%;
    padding: 8px;
  }
  
  .form-comentario textarea {
    height: 100px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>