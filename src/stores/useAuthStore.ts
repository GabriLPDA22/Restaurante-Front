import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/login", {
        email,
        password
      });
      console.log("User authenticated:", data);
      
      user.value = data;
      token.value = data.token || "";
      
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token.value ?? "");
      
      await router.push("/");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const register = async (nombre: string, email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/register", {
        nombre,
        email,
        password
      });
      console.log("User registered successfully:", data);
      await router.push("/login");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login").then(() => window.scrollTo(0, 0));
  };

  return {
    user,
    token,
    login,
    register,
    logout,
    loadUser,
  };
}, {
  persist: true
});