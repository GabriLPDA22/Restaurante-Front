import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Admin {
  id: number | string;
  nombre: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  id?: number;
  nombre?: string;
  token?: string;
}

const API_URL = 'http://localhost:5021/api';

export const adminAuthStore = defineStore('adminAuth', () => {
  const admin = ref<Admin | null>(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  // LOGIN
  const login = async (nombre: string, contraseña: string): Promise<LoginResponse> => {
    try {
      console.log("Intentando login con nombre:", nombre);
      
      const { data } = await axios.post(`${API_URL}/admins/login`, {
        nombre: nombre,
        contraseña: contraseña
      });
      
      console.log("Respuesta del backend:", data);

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Credenciales incorrectas"
        };
      }

      admin.value = {
        id: data.id!,
        nombre: data.nombre!
      };
      token.value = data.token || "";

      localStorage.setItem("admin", JSON.stringify(admin.value));
      localStorage.setItem("adminToken", token.value);

      return {
        success: true,
        message: data.message || "Login exitoso"
      };
    } catch (error: any) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error al conectar con el servidor";
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "URL del servicio no encontrada. Verifica la dirección.";
        } else {
          errorMessage = error.response.data?.message || 
                         `Error ${error.response.status}: ${error.response.statusText}`;
        }
      } else if (error.request) {
        errorMessage = "No se recibió respuesta del servidor";
      }
      
      return {
        success: false,
        message: errorMessage
      };
    }
  };

  const loadAdmin = (): boolean => {
    const storedAdmin = localStorage.getItem("admin");
    const storedToken = localStorage.getItem("adminToken");
    if (storedAdmin && storedToken) {
      try {
        admin.value = JSON.parse(storedAdmin);
        token.value = storedToken;
        return true;
      } catch (e) {
        console.error("Error al parsear admin:", e);
        localStorage.removeItem("admin");
        localStorage.removeItem("adminToken");
      }
    }
    return false;
  };

  // LOGOUT
  const logout = (): void => {
    admin.value = null;
    token.value = null;
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  // Verificar si hay un admin logueado
  const isAuthenticated = (): boolean => {
    return !!admin.value && !!token.value;
  };

  // Obtener información del admin
  const getAdminInfo = (): Admin | null => {
    return admin.value;
  };

  return {
    admin,
    token,
    login,
    logout,
    loadAdmin,
    isAuthenticated,
    getAdminInfo
  };
});
