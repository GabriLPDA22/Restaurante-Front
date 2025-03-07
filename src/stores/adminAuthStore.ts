import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Definimos tipos para TypeScript
interface Admin {
  id: number | string;
  nombre: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  error?: any;
}

// Definimos la URL base - ajusta esto según tu backend
const API_URL = 'http://34.196.144.197:8080/api';

export const adminAuthStore = defineStore('adminAuth', () => {
  const admin = ref<Admin | null>(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  // LOGIN
  const login = async (nombre: string, password: string): Promise<LoginResponse> => {
    try {
      // Validación simple de campos vacíos
      if (!nombre || !password) {
        return {
          success: false,
          message: "Los campos usuario y contraseña son obligatorios"
        };
      }

      // Obtenemos todos los administradores
      const { data: adminList } = await axios.get(`${API_URL}/admins`);
      
      // Buscamos un administrador que coincida con el nombre
      const foundAdmin = adminList.find((adm: any) => adm.nombre === nombre);
      
      // Si no encontramos al administrador, retornamos error
      if (!foundAdmin) {
        return {
          success: false,
          message: "Usuario no encontrado"
        };
      }
      
      // Verificamos la contraseña
      // Nota: En una aplicación real, NUNCA se debería manejar la autenticación de esta forma
      // La contraseña debería verificarse en el backend y nunca exponer contraseñas en el frontend
      if (foundAdmin.contraseña !== password) {
        return {
          success: false,
          message: "Contraseña incorrecta"
        };
      }
      
      // Login exitoso
      admin.value = {
        id: foundAdmin.id,
        nombre: foundAdmin.nombre
      };
      
      // Generamos un token simple (esto es solo para demo, no seguro para producción)
      token.value = `demo-token-${Date.now()}`;

      // Guardamos en localStorage
      localStorage.setItem("admin", JSON.stringify(admin.value));
      localStorage.setItem("adminToken", token.value);

      return {
        success: true,
        message: "Login exitoso"
      };
    } catch (error: any) {
      console.error("Error en login:", error);
      
      let errorMessage = "Error al iniciar sesión";
      
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Servicio no disponible";
        } else {
          errorMessage = error.response.data?.message || "Error del servidor";
        }
      }
      
      return {
        success: false,
        message: errorMessage,
        error: error
      };
    }
  };

  // Cargar admin y token desde localStorage
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