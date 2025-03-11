import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

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
const API_URL = 'http://elixiumapi.retocsv.es//api';

export const adminAuthStore = defineStore('adminAuth', () => {
  const admin = ref(null);
  const token = ref(null);

  const login = async (nombre, password) => {
    try {
      if (!nombre || !password) {
        return {
          success: false,
          message: "Los campos usuario y contraseña son obligatorios"
        };
      }

      const { data: adminList } = await axios.get(`${API_URL}/admins`);

      const foundAdmin = adminList.find((adm) => adm.nombre === nombre);

      if (!foundAdmin) {
        return {
          success: false,
          message: "Usuario no encontrado"
        };
      }

      if (foundAdmin.contraseña !== password) {
        return {
          success: false,
          message: "Contraseña incorrecta"
        };
      }

      admin.value = {
        id: foundAdmin.id,
        nombre: foundAdmin.nombre
      };

      token.value = `demo-token-${Date.now()}`;

      localStorage.setItem("admin", JSON.stringify(admin.value));
      localStorage.setItem("adminToken", token.value);

      console.log("Login exitoso:", admin.value);

      return {
        success: true,
        message: "Login exitoso"
      };
    } catch (error) {
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

  const loadAdmin = () => {
    try {
      const storedAdmin = localStorage.getItem("admin");
      const storedToken = localStorage.getItem("adminToken");

      if (storedAdmin && storedToken) {
        admin.value = JSON.parse(storedAdmin);
        token.value = storedToken;
        console.log("Sesión de administrador cargada:", admin.value);
        return true;
      }
    } catch (e) {
      console.error("Error al cargar datos de administrador:", e);
      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
    }
    return false;
  };

  const logout = () => {
    admin.value = null;
    token.value = null;
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    console.log("Sesión de administrador cerrada");
  };

  const isAuthenticated = () => {
    const authenticated = !!admin.value && !!token.value;
    console.log("Estado de autenticación:", authenticated);
    return authenticated;
  };

  const getAdminInfo = () => {
    return admin.value;
  };

  loadAdmin();

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