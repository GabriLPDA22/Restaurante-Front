import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(null);
  const router = useRouter();

  // Función para convertir fecha de DD/MM/YYYY a YYYY-MM-DD
  const formatDateForPostgres = (dateStr) => {
    if (!dateStr) return null;

    // Si ya está en formato YYYY-MM-DD
    if (dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
      return dateStr;
    }

    // Convertir de DD/MM/YYYY a YYYY-MM-DD
    try {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];

        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      console.error("Error al formatear fecha:", e);
    }

    return dateStr;
  };

  // LOGIN
  const login = async (email, password, rememberMe = false) => {
    try {
      const { data } = await axios.post("http://34.196.144.197:8080/api/auth/login", {
        email,
        password
      });
      console.log("Respuesta del backend al login:", data);

      if (data.success === false || data.verificacion === false) {
        return {
          success: false,
          message: data.message || "Credenciales inválidas"
        };
      }

      // De lo contrario, asumimos que el login fue exitoso
      user.value = data.user || data;
      token.value = data.token || "";

      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user.value));
        localStorage.setItem("token", token.value);
      }

      return {
        success: true,
        message: data.message || "Login exitoso"
      };
    } catch (error) {
      console.error("Failed to login user:", error);
      const backendMessage = error.response?.data?.message || "Credenciales inválidas";
      return {
        success: false,
        message: backendMessage
      };
    }
  };

  // REGISTER
  const register = async (nombre, email, password) => {
    try {
      const { data } = await axios.post("http://34.196.144.197:8080/api/auth/register", {
        nombre,
        email,
        password
      });
      console.log("User registered successfully:", data);

      return {
        success: true,
        message: data.message || "Registro exitoso"
      };
    } catch (error) {
      console.error("Registration failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error al registrar"
      };
    }
  };

  // Cargar usuario y token desde localStorage
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      try {
        user.value = JSON.parse(storedUser);
        token.value = storedToken;
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  };

  // LOGOUT
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login").then(() => window.scrollTo(0, 0));
  };

  // ACTUALIZAR PERFIL - USANDO LA RUTA CORRECTA SEGÚN LA DOCUMENTACIÓN
  const updateUserProfile = async (profileData) => {
    try {
      if (!user.value) {
        console.error('Error: No hay usuario logueado');
        return { success: false, message: 'No hay usuario logueado.' };
      }

      // Obtener el ID del usuario
      const userId = user.value.userID || user.value.userId || user.value.id || user.value.ID;

      if (!userId) {
        console.error('Error: No se pudo determinar el ID del usuario', user.value);
        return { success: false, message: 'No se pudo determinar el ID del usuario.' };
      }

      console.log('Datos del usuario actual:', user.value);
      console.log('ID del usuario:', userId);

      // Formatear la fecha de nacimiento
      const formattedBirthdate = formatDateForPostgres(profileData.fechaNacimiento);

      // Crear el objeto de datos para la actualización según el schema de la API
      const updateData = {
        userID: userId,         // Usar el userID existente
        nombre: profileData.nombre,
        email: user.value.email || user.value.Email, // Mantener el email actual
        password: "",          // Campo obligatorio pero no lo actualizamos
        googleID: user.value.googleID || "",
        pictureUrl: user.value.pictureUrl || "",
        roles: user.value.roles || ["string"],
        telefono: profileData.telefono,
        fechaNacimiento: formattedBirthdate
      };

      console.log('Datos para actualizar en la API:', updateData);

      // Llamar al endpoint según la documentación
      const response = await axios.put(
        `http://34.196.144.197:8080/api/User/${userId}`,
        updateData,
        {
          headers: {
            'Authorization': `Bearer ${token.value || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Respuesta del servidor:', response.data);

      // Actualizar en store y localStorage
      user.value = {
        ...user.value,
        nombre: profileData.nombre,
        telefono: profileData.telefono,
        fechaNacimiento: profileData.fechaNacimiento,
        FechaNacimiento: formattedBirthdate
      };

      localStorage.setItem("user", JSON.stringify(user.value));

      return {
        success: true,
        message: "Perfil actualizado correctamente en la base de datos",
        data: response.data
      };
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);

      // Proporcionar mensaje de error detallado
      const errorDetail = error.response?.data?.message || error.message || "Error desconocido";
      const statusCode = error.response?.status || "N/A";

      return {
        success: false,
        message: `Error (${statusCode}) al actualizar el perfil: ${errorDetail}`,
        error: error
      };
    }
  };

  return {
    user,
    token,
    login,
    register,
    loadUser,
    logout,
    updateUserProfile,
  };
}, {
  persist: true
});