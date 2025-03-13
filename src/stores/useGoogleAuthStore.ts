import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Declarar Google globalmente (opcional)
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

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const user = ref<any>(null);
  const token = ref<string | null>(null);
  const router = useRouter();

  const initializeGoogleAuth = () => {
    if (!window.google) {
      console.error("Google API not loaded yet.");
      return;
    }
    google.accounts.id.initialize({
      client_id: "812430762080-ktkqmivkpjo15cnid2ch4dd217r04v4l.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      ux_mode: "popup",
      redirect_uri: window.location.origin,
    });
  };

  const triggerGooglePrompt = () => {
    if (!window.google) {
      console.error("Google API not loaded yet.");
      return;
    }
    google.accounts.id.prompt();
  };

  const handleCredentialResponse = async (response: { credential: string }) => {
    console.log("Google Token recibido:", response.credential);
    if (!response.credential) {
      console.error("⚠️ Error: El token de Google es undefined");
      return { success: false, message: "El token de Google es undefined" };
    }
    try {
      const { data } = await axios.post("http://localhost:5021/api/auth/google-login", {
        token: response.credential,
      });
      console.log("User authenticated (Google):", data);

      // Si el backend indica error, retornamos success = false
      if (data.success === false) {
        return { success: false, message: data.message || "Error en login con Google" };
      }

      // Se asume que el backend retorna { user: {...}, token: "...", success: true, message: "Login con Google exitoso" }
      user.value = data.user || data;
      token.value = data.token || response.credential;
      localStorage.setItem("user", JSON.stringify(user.value));
      localStorage.setItem("token", token.value);

      // Redirigir automáticamente a home
      router.push('/');
      console.log("Redirigiendo a home después de login con Google");

      return { success: true, message: data.message || "Login con Google exitoso" };
    } catch (error: any) {
      console.error("Google login failed:", error);
      return { success: false, message: error.response?.data?.message || "Error al iniciar sesión con Google" };
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
    initializeGoogleAuth,
    triggerGooglePrompt,
    loginWithGoogle: handleCredentialResponse,
    logout,
  };
}, {
  persist: true
});