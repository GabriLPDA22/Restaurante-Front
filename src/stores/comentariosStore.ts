import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:5021/api/comentario'

export interface Comentario {
  idComentario: number;
  nombre: string;
  email: string;
  comentarioTexto: string;
  fecha: string;
  productoId: number;
}

interface ComentariosState {
  comentarios: Comentario[];
  comentariosByProducto: Record<number, Comentario[]>;
  comentario: Comentario | null;
  loading: boolean;
  error: string | null;
}

export const useComentariosStore = defineStore('comentarios', {
  state: (): ComentariosState => ({
    comentarios: [],
    comentariosByProducto: {},
    comentario: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getComentariosByProductoId: (state) => (productoId: number): Comentario[] => {
      return state.comentariosByProducto[productoId] || []
    }
  },
  
  actions: {
    async fetchComentarios() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get<Comentario[]>(API_URL)
        this.comentarios = response.data
      } catch (error) {
        this.error = 'Error al cargar comentarios'
        console.error('Error fetching comentarios:', error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchComentarioById(id: number) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get<Comentario>(`${API_URL}/${id}`)
        this.comentario = response.data
        return response.data
      } catch (error) {
        this.error = `Error al cargar comentario con ID ${id}`
        console.error(`Error fetching comentario id ${id}:`, error)
        return null
      } finally {
        this.loading = false
      }
    },
    
    async fetchComentariosByProductoId(productoId: number) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get<Comentario[]>(`${API_URL}/producto/${productoId}`)
        this.comentariosByProducto[productoId] = response.data
        return response.data
      } catch (error) {
        this.error = `Error al cargar comentarios para el producto ${productoId}`
        console.error(`Error fetching comentarios for producto ${productoId}:`, error)
        return []
      } finally {
        this.loading = false
      }
    },
    
    async createComentario(comentario: Omit<Comentario, 'idComentario'> & { idComentario?: number }) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post<Comentario>(API_URL, comentario)
        this.comentarios.push(response.data)
        
        if (this.comentariosByProducto[comentario.productoId]) {
          this.comentariosByProducto[comentario.productoId].push(response.data)
        }
        
        return response.data
      } catch (error) {
        this.error = 'Error al crear comentario'
        console.error('Error creating comentario:', error)
        return null
      } finally {
        this.loading = false
      }
    },
    
    async updateComentario(comentario: Comentario) {
      this.loading = true
      this.error = null
      
      try {
        await axios.put(`${API_URL}/${comentario.idComentario}`, comentario)
        
        const index = this.comentarios.findIndex(c => c.idComentario === comentario.idComentario)
        if (index !== -1) {
          this.comentarios[index] = comentario
        }
        
        if (this.comentariosByProducto[comentario.productoId]) {
          const productIndex = this.comentariosByProducto[comentario.productoId].findIndex(c => c.idComentario === comentario.idComentario)
          if (productIndex !== -1) {
            this.comentariosByProducto[comentario.productoId][productIndex] = comentario
          }
        }
        
        return true
      } catch (error) {
        this.error = `Error al actualizar comentario con ID ${comentario.idComentario}`
        console.error(`Error updating comentario id ${comentario.idComentario}:`, error)
        return false
      } finally {
        this.loading = false
      }
    },
    
    async deleteComentario(id: number, productoId: number) {
      this.loading = true
      this.error = null
      
      try {
        await axios.delete(`${API_URL}/${id}`)
        
        this.comentarios = this.comentarios.filter(c => c.idComentario !== id)
        
        if (this.comentariosByProducto[productoId]) {
          this.comentariosByProducto[productoId] = this.comentariosByProducto[productoId].filter(c => c.idComentario !== id)
        }
        
        return true
      } catch (error) {
        this.error = `Error al eliminar comentario con ID ${id}`
        console.error(`Error deleting comentario id ${id}:`, error)
        return false
      } finally {
        this.loading = false
      }
    }
  }
})