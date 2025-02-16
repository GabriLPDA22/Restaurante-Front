import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  // 🔹 Login Normal con Email y Password
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/login", {
        email,
        password
      });
      console.log("User authenticated:", data);
      
      user.value = data;
      token.value = data.token || ""; // Evita null en localStorage
      
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token.value ?? "");
      
      // Después del redirect, hacer scroll al top
      await router.push("/");
      window.scrollTo(0, 0);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch user", error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        console.error("Failed to fetch user", error.message);
      } else {
        console.error("Failed to fetch user", error);
      }
    }
  };

  // 🔹 Registro Normal
  const register = async (nombre: string, email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/register", {
        nombre,
        email, // Se envía "email" para que coincida con el backend
        password
      });
      console.log("User registered successfully:", data);
      await router.push("/login");
      window.scrollTo(0, 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Registration failed:", error.response?.data?.message || "Unknown error");
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  // 🔹 Obtener usuario desde la base de datos
  const fetchUserFromDB = async () => {
    try {
      if (!token.value) {
        console.warn("No token found, user is not authenticated.");
        return;
      }
      const { data } = await axios.get("http://localhost:5021/api/user/me", {
        headers: { Authorization: `Bearer ${token.value}` },
        withCredentials: true,
      });
      user.value = data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to fetch user", error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        console.error("Failed to fetch user", error.message);
      } else {
        console.error("Failed to fetch user", error);
      }
    }
  };

  // 🔹 Cargar usuario desde LocalStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  // 🔹 Cerrar sesión
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login").then(() => window.scrollTo(0, 0));
  };

  onMounted(() => {
    loadUser();
    if (token.value) {
      fetchUserFromDB();
    }
  });

  return {
    user,
    token,
    login,
    register,
    fetchUserFromDB,
    logout,
    loadUser,
  };
});
