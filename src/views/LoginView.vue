<template>
    <div class="auth">
        <div class="auth__container">
            <!-- Sidebar izquierdo con animación de fondo -->
            <div class="auth__sidebar">
                <div class="auth__sidebar-bg"></div>
                <div class="auth__brand">
                    <h1 class="fade-in">ELIXIUM FOODS</h1>
                    <p class="fade-in-delay">RESTAURANT</p>
                </div>
                <div class="auth__info">
                    <h2 class="slide-in-left">Bienvenido de nuevo</h2>
                    <p class="slide-in-left-delay">Accede a tu cuenta para gestionar tus reservas y disfrutar de ofertas
                        exclusivas</p>
                    <div class="auth__feature-list">
                        <div class="auth__feature slide-in-bottom">
                            <span class="auth__feature-icon">✓</span>
                            <span>Reservas prioritarias</span>
                        </div>
                        <div class="auth__feature slide-in-bottom-delay-1">
                            <span class="auth__feature-icon">✓</span>
                            <span>Menús exclusivos</span>
                        </div>
                        <div class="auth__feature slide-in-bottom-delay-2">
                            <span class="auth__feature-icon">✓</span>
                            <span>Promociones especiales</span>
                        </div>
                    </div>
                </div>
                <div class="auth__hours">
                    <p>DOMINGO – JUEVES: 11:30AM – 11PM</p>
                    <p>VIERNES & SÁBADO: 11:30AM – 12AM</p>
                </div>
            </div>

            <!-- Formulario de login con animaciones y validaciones -->
            <div class="auth__form-container">
                <div class="auth__form-wrapper fade-in-up">
                    <h2 class="auth__title">
                        Login <span class="auth__icon">👤</span>
                    </h2>
                    <p class="auth__subtitle">Welcome back, User</p>

                    <h3 class="auth__heading">Enter Your Details</h3>

                    <transition name="fade">
                        <div v-if="loginSuccess" class="auth__success-message">
                            <span class="auth__success-icon">✓</span>
                            <span>¡Login exitoso! Redirigiendo...</span>
                        </div>
                    </transition>

                    <transition name="fade">
                        <div v-if="errorMessage" class="auth__error-message">
                            <span class="auth__error-icon">!</span>
                            <span>{{ errorMessage }}</span>
                        </div>
                    </transition>

                    <form @submit.prevent="handleLogin" class="auth__form">
                        <div class="input-group" :class="{ 'input-group--error': emailError }">
                            <label for="email" class="input-group__label">
                                <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                    </path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </label>
                            <input id="email" v-model="email" type="email" class="input-group__field"
                                placeholder="Email" @focus="emailFocus = true; emailError = ''" @blur="validateEmail"
                                required />
                            <transition name="fade">
                                <div v-if="emailError" class="input-group__error">{{ emailError }}</div>
                            </transition>
                        </div>

                        <div class="input-group" :class="{ 'input-group--error': passwordError }">
                            <label for="password" class="input-group__label">
                                <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </label>
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                class="input-group__field" placeholder="Password"
                                @focus="passwordFocus = true; passwordError = ''" @blur="validatePassword" required />
                            <button type="button" class="input-group__toggle" @click="showPassword = !showPassword"
                                :title="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                                    </path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <transition name="fade">
                                <div v-if="passwordError" class="input-group__error">{{ passwordError }}</div>
                            </transition>
                        </div>

                        <div class="auth__remember">
                            <label class="checkbox">
                                <input type="checkbox" v-model="rememberMe">
                                <span class="checkbox__mark"></span>
                                <span>Remember me</span>
                            </label>
                            <a href="#" class="auth__forgot">Forgot password?</a>
                        </div>

                        <button type="submit" class="auth__button" :disabled="isSubmitting"
                            :class="{ 'auth__button--loading': isSubmitting }">
                            <span v-if="!isSubmitting">Login</span>
                            <span v-else class="auth__loader"></span>
                        </button>
                    </form>

                    <div class="auth__divider">Or Login with</div>

                    <button class="auth__google-button" @click="onGoogleLoginClick">
                        <img :src="googleIcon" alt="Google Logo" class="auth__google-image" />
                        Continue with Google
                    </button>

                    <p class="auth__footer">
                        You don't have an account?
                        <router-link to="/register" class="auth__link">Sign up</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import googleIcon from '@/assets/google.png';  // tu icono de Google
import { useAuthStore } from '@/stores/useAuthStore';
import { useGoogleAuthStore } from '@/stores/useGoogleAuthStore';

// Router para redirigir después del login
const router = useRouter();

// Stores
const authStore = useAuthStore();
const googleAuthStore = useGoogleAuthStore();

// Campos de formulario
const email = ref('');
const password = ref('');
const rememberMe = ref(false);

// Mostrar/ocultar contraseña
const showPassword = ref(false);

// Estados de UI
const isSubmitting = ref(false);
const loginSuccess = ref(false);
const errorMessage = ref('');

// Validaciones
const emailError = ref('');
const passwordError = ref('');
const emailFocus = ref(false);
const passwordFocus = ref(false);

// VALIDAR EMAIL
function validateEmail() {
    if (!email.value) {
        emailError.value = 'Email es requerido';
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.value = 'Formato de email inválido';
        return false;
    }
    emailError.value = '';
    return true;
}

// VALIDAR PASSWORD
function validatePassword() {
    if (!password.value) {
        passwordError.value = 'Contraseña es requerida';
        return false;
    }
    if (password.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
        return false;
    }
    passwordError.value = '';
    return true;
}

// LOGIN
async function handleLogin() {
    // 1. Validar campos
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    if (!validEmail || !validPassword) return;

    try {
        isSubmitting.value = true;
        errorMessage.value = '';

        // 2. Simulamos un tiempo de carga (opcional)
        await new Promise(resolve => setTimeout(resolve, 500));

        // 3. Llamamos a la store => retorna { success: boolean, message: string }
        const response = await authStore.login(email.value, password.value, rememberMe.value);

        // 4. Chequeamos si success = false
        if (!response.success) {
            errorMessage.value = response.message || 'Credenciales incorrectas.';
            return;
        }

        // 5. Si es true, mostramos éxito
        loginSuccess.value = true;

        // 6. Redirigimos tras 2s
        setTimeout(() => {
            router.push('/');
        }, 2000);

    } catch (error) {
        console.error('Error en el login:', error);
        errorMessage.value = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    } finally {
        isSubmitting.value = false;
    }
}

// LOGIN CON GOOGLE
function onGoogleLoginClick() {
    googleAuthStore.triggerGooglePrompt();
}

// Inicializamos GoogleAuth en onMounted
onMounted(() => {
    googleAuthStore.initializeGoogleAuth();
});
</script>

<style lang="scss" scoped>
// Animaciones
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInBottom {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes gradientBg {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0% {
        opacity: 0.8;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.8;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-in {
    animation: fadeIn 0.8s forwards;
}

.fade-in-delay {
    animation: fadeIn 0.8s 0.2s forwards;
    opacity: 0;
}

.slide-in-left {
    animation: slideInLeft 0.8s 0.3s forwards;
    opacity: 0;
}

.slide-in-left-delay {
    animation: slideInLeft 0.8s 0.5s forwards;
    opacity: 0;
}

.slide-in-bottom {
    animation: slideInBottom 0.8s 0.7s forwards;
    opacity: 0;
}

.slide-in-bottom-delay-1 {
    animation: slideInBottom 0.8s 0.9s forwards;
    opacity: 0;
}

.slide-in-bottom-delay-2 {
    animation: slideInBottom 0.8s 1.1s forwards;
    opacity: 0;
}

.fade-in-up {
    animation: fadeInUp 0.8s forwards;
}

.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 1rem;
    background: #0d1b1e;
    background: radial-gradient(circle at center, #182830 0%, #0d1b1e 70%);

    &__container {
        background: #1a2b2f;
        border-radius: 20px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(216, 178, 104, 0.3);
        overflow: hidden;
        transform-style: preserve-3d;
        perspective: 1000px;
    }

    &__form-container {
        padding: 2rem;
    }

    &__form-wrapper {
        animation: fadeInUp 0.8s ease-out forwards;
    }

    &__sidebar {
        display: none; // Oculto en móvil
        position: relative;
        overflow: hidden;
    }

    &__sidebar-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-45deg, #1e3a40, #0d1b1e, #2c3e50, #182830);
        background-size: 400% 400%;
        animation: gradientBg 15s ease infinite;
        opacity: 0.6;
        z-index: 0;
    }

    &__title {
        font-size: 1.8rem;
        font-weight: bold;
        color: #d8b268;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
    }

    &__icon {
        margin-left: 8px;
    }

    &__subtitle {
        font-size: 1rem;
        color: #ccc;
        margin-bottom: 1.5rem;
    }

    &__heading {
        font-size: 1.2rem;
        font-weight: bold;
        color: #d8b268;
        margin-bottom: 1.5rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
    }

    &__success-message {
        background-color: rgba(46, 204, 113, 0.2);
        border: 1px solid #2ecc71;
        color: #2ecc71;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        animation: fadeInUp 0.5s forwards;
    }

    &__success-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #2ecc71;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
    }

    &__error-message {
        background-color: rgba(231, 76, 60, 0.2);
        border: 1px solid #e74c3c;
        color: #e74c3c;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        animation: fadeInUp 0.5s forwards;
    }

    &__error-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #e74c3c;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
    }

    .input-group {
        position: relative;
        width: 100%;
        transition: all 0.3s ease;
        margin-bottom: 1rem;

        &__label {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            color: #d8b268;
            display: flex;
            align-items: center;
        }

        &__icon {
            width: 20px;
            height: 20px;
            stroke: #d8b268;
        }

        &__field {
            width: 100%;
            padding: 0.75rem 0.75rem 0.75rem 45px;
            border: 2px solid #d8b268;
            border-radius: 8px;
            font-size: 1rem;
            background: rgba(13, 27, 30, 0.3);
            color: #fff;
            transition: all 0.3s;

            &:focus {
                border-color: #b8965f;
                outline: none;
                box-shadow: 0 0 0 3px rgba(216, 178, 104, 0.25);
            }

            &::placeholder {
                color: rgba(204, 204, 204, 0.5);
            }
        }

        &__toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: #d8b268;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;

            svg {
                width: 20px;
                height: 20px;
                stroke: #d8b268;
            }

            &:hover svg {
                stroke: #b8965f;
            }
        }

        &__error {
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.5rem;
            position: absolute;
            left: 0;
            bottom: -1.3rem;
            text-align: left;
            padding-left: 45px;
        }

        &--error &__field {
            border-color: #e74c3c;
        }
    }

    &__remember {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.85rem;
        color: #ccc;
        margin-bottom: 0.5rem;
    }

    .checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        &__mark {
            position: relative;
            height: 18px;
            width: 18px;
            background-color: transparent;
            border: 2px solid #d8b268;
            border-radius: 4px;
            margin-right: 8px;
            transition: all 0.2s;

            &:after {
                content: "";
                position: absolute;
                display: none;
                left: 5px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
            }
        }

        input:checked~&__mark {
            background-color: #d8b268;
        }

        input:checked~&__mark:after {
            display: block;
        }
    }

    &__forgot {
        color: #d8b268;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    &__button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        background: #d8b268;
        color: #0d1b1e;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s ease;
        position: relative;
        overflow: hidden;

        &:hover {
            background: #b8965f;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            background: #a99a76;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        &--loading {
            color: transparent;
        }
    }

    &__loader {
        position: absolute;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(13, 27, 30, 0.3);
        border-radius: 50%;
        border-top-color: #0d1b1e;
        animation: spin 1s linear infinite;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -10px;
    }

    &__divider {
        margin: 1.5rem 0;
        font-size: 0.9rem;
        color: #888;
        position: relative;
    }

    &__divider::before,
    &__divider::after {
        content: "";
        width: 30%;
        height: 1px;
        background: #ddd;
        position: absolute;
        top: 50%;
    }

    &__divider::before {
        left: 0;
    }

    &__divider::after {
        right: 0;
    }

    &__google-button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        background: transparent;
        color: #d8b268;
        border: 2px solid #d8b268;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
        transition: 0.3s ease;

        .auth__google-image {
            width: 20px;
            height: 20px;
        }

        &:hover {
            background: rgba(216, 178, 104, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        &:active {
            transform: translateY(0);
        }
    }

    &__footer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        color: #ccc;
    }

    &__link {
        color: #d8b268;
        font-weight: bold;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
            color: #b8965f;
            text-decoration: underline;
        }
    }

    &__feature-list {
        margin-top: 2rem;
    }

    &__feature {
        display: flex;
        align-items: center;
        color: #ccc;
        margin-bottom: 0.8rem;

        &-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            background: rgba(216, 178, 104, 0.2);
            border-radius: 50%;
            margin-right: 10px;
            color: #d8b268;
            font-size: 0.8rem;
        }
    }

    // Media query para escritorio (≥768px)
    @media (min-width: 768px) {
        &__container {
            display: flex;
            max-width: 900px;
            height: 600px;
            transform: translateZ(0);
            transition: transform 0.3s ease, box-shadow 0.3s ease;

            &:hover {
                transform: translateZ(10px);
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6),
                    0 0 25px rgba(216, 178, 104, 0.4);
            }
        }

        &__sidebar {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 50%;
            padding: 3rem 2rem;
            text-align: left;
            z-index: 1;
        }

        &__brand {
            position: relative;
            z-index: 1;

            h1 {
                font-size: 1.8rem;
                color: #d8b268;
                margin: 0;
            }

            p {
                font-size: 0.8rem;
                color: #ccc;
                letter-spacing: 2px;
                margin-top: 0;
            }
        }

        &__info {
            margin-top: 2rem;
            position: relative;
            z-index: 1;

            h2 {
                font-size: 2rem;
                color: #d8b268;
                margin-bottom: 1rem;
            }

            p {
                color: #ccc;
                font-size: 1rem;
                line-height: 1.6;
            }
        }

        &__hours {
            margin-top: auto;
            font-size: 0.7rem;
            color: #999;
            letter-spacing: 1px;
            line-height: 1.4;
            position: relative;
            z-index: 1;
        }

        &__form-container {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2.5rem;
            max-height: 100%;
            scrollbar-width: thin;

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgba(216, 178, 104, 0.5);
                border-radius: 3px;
            }
        }
    }
}
</style>