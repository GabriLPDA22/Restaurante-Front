import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Declarar Google globalmente
declare const google: {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: { credential: string }) => void;
        ux_mode: string;
        redirect_uri: string;
      }) => void;
      prompt: () => void;
    };
  };
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  // 1. Inicializa la librería de Google (NO abrimos popup aquí)
  const initializeGoogleAuth = () => {
    if (!window.google) {
      console.error("Google API not loaded yet.");
      return;
    }

    google.accounts.id.initialize({
      client_id: "812430762080-ktkqmivkpjo15cnid2ch4dd217r04v4l.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      ux_mode: "popup",  // Usamos popup
      redirect_uri: window.location.origin,
    });
  };

  // 2. Llamado manual para abrir el popup de Google
  const triggerGooglePrompt = () => {
    if (!window.google) {
      console.error("Google API not loaded yet.");
      return;
    }
    google.accounts.id.prompt();
  };

  // Manejo de la respuesta de Google OAuth
  const handleCredentialResponse = async (response: { credential: string }) => {
    console.log("Google Token recibido:", response.credential);

    if (!response.credential) {
      console.error("⚠️ Error: El token de Google es undefined");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/google-login", {
        token: response.credential,
      });

      console.log("User authenticated:", data);

      user.value = data;
      token.value = response.credential;

      // Guardar en LocalStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", token.value);

      // Redirigir automáticamente a Home
      router.push("/");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  // Ejemplo: Obtener usuario desde la base de datos con el token
  const fetchUserFromDB = async () => {
    try {
      if (!token.value) {
        console.warn("No token found, user is not authenticated.");
        return;
      }

      const { data } = await axios.get("http://localhost:5021/api/user/me", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        withCredentials: true,
      });

      user.value = data;
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  // Cargar usuario/ token desde LocalStorage al montar
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  };

  // Cerrar sesión
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  onMounted(() => {
    loadUser();
  });

  return {
    user,
    token,
    initializeGoogleAuth,
    triggerGooglePrompt,
    loginWithGoogle: handleCredentialResponse,
    fetchUserFromDB,
    logout,
    loadUser,
  };
});
