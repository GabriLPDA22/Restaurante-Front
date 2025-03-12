import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:5021/api';

export const adminAuthStore = defineStore('adminAuth', () => {
  const admin = ref(null);
  const token = ref(null);

  const login = async (nombre, password) => {
    try {
      if (!nombre || !password) {
        return {
          success: false,
          message: "Missing credentials"
        };
      }

      const { data: adminList } = await axios.get(`${API_URL}/admins`);

      const foundAdmin = adminList.find((adm) => adm.nombre === nombre);

      if (!foundAdmin) {
        return {
          success: false,
          message: "User not found"
        };
      }

      if (foundAdmin.contraseña !== password) {
        return {
          success: false,
          message: "Incorrect password"
        };
      }

      admin.value = {
        id: foundAdmin.id,
        nombre: foundAdmin.nombre
      };

      token.value = `demo-token-${Date.now()}`;

      localStorage.setItem("admin", JSON.stringify(admin.value));
      localStorage.setItem("adminToken", token.value);

      console.log("Successful login:", admin.value);

      return {
        success: true,
        message: "Successful login"
      };
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Error logging in";

      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "Service unavailable";
        } else {
          errorMessage = error.response.data?.message || "Server error";
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
        console.log("Loaded admin session:", admin.value);
        return true;
      }
    } catch (e) {
      console.error("Error loading admin data:", e);
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
    console.log("Admin session closed");
  };

  const isAuthenticated = () => {
    const authenticated = !!admin.value && !!token.value;
    console.log("Authentication status:", authenticated);
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