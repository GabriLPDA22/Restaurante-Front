<template>
    <div class="auth">
        <div class="auth__container">
            <!-- Left sidebar with background animation -->
            <div class="auth__sidebar">
                <div class="auth__sidebar-bg"></div>
                <div class="auth__brand">
                    <h1 class="fade-in">ELIXIUM FOODS</h1>
                    <p class="fade-in-delay">RESTAURANT</p>
                </div>
                <div class="auth__info">
                    <h2 class="slide-in-left">Join us</h2>
                    <p class="slide-in-left-delay">Create an account to access priority reservations and exclusive offers</p>
                    <div class="auth__feature-list">
                        <div class="auth__feature slide-in-bottom">
                            <span class="auth__feature-icon">✓</span>
                            <span>Priority reservations</span>
                        </div>
                        <div class="auth__feature slide-in-bottom-delay-1">
                            <span class="auth__feature-icon">✓</span>
                            <span>Exclusive discounts</span>
                        </div>
                        <div class="auth__feature slide-in-bottom-delay-2">
                            <span class="auth__feature-icon">✓</span>
                            <span>Special events</span>
                        </div>
                    </div>
                </div>
                <div class="auth__hours">
                    <p>MONDAY – SUNDAY: 9:00AM – 12PM</p>
                    <p></p>
                </div>
            </div>

            <!-- Registration form with animations and validations -->
            <div class="auth__form-container">
                <div class="auth__form-wrapper fade-in-up">
                    <h2 class="auth__title">Register <span class="auth__icon">🧑‍💻</span></h2>
                    <p class="auth__subtitle">Join us today!</p>

                    <h3 class="auth__heading">Enter Your Details</h3>

                    <!-- Success message -->
                    <transition name="fade">
                        <div v-if="registerSuccess" class="auth__success-message">
                            <span class="auth__success-icon">✓</span>
                            <span>Registration successful! Redirecting to login...</span>
                        </div>
                    </transition>

                    <!-- Error message (now with light red background) -->
                    <transition name="fade">
                        <div v-if="errorMessage" class="auth__error-message">
                            <span class="auth__error-icon">!</span>
                            <span>{{ errorMessage }}</span>
                        </div>
                    </transition>

                    <form @submit.prevent="handleSubmit" class="auth__form">
                        <!-- Name -->
                        <div class="input-group" :class="{ 'input-group--error': nombreError }">
                            <div class="input-group__field-wrapper">
                                <label for="nombre" class="input-group__label">
                                    <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </label>
                                <input id="nombre" v-model="form.nombre" type="text" class="input-group__field"
                                    placeholder="Full Name" @focus="nombreFocus = true; nombreError = ''"
                                    @blur="validateNombre" required />
                            </div>
                            <transition name="fade">
                                <div v-if="nombreError" class="input-group__error">{{ nombreError }}</div>
                            </transition>
                        </div>

                        <!-- Email -->
                        <div class="input-group" :class="{ 'input-group--error': emailError }">
                            <div class="input-group__field-wrapper">
                                <label for="email" class="input-group__label">
                                    <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path
                                            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                        </path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </label>
                                <input id="email" v-model="form.email" type="email" class="input-group__field"
                                    placeholder="Email" @focus="emailFocus = true; emailError = ''"
                                    @blur="validateEmail" required />
                            </div>
                            <transition name="fade">
                                <div v-if="emailError" class="input-group__error">{{ emailError }}</div>
                            </transition>
                        </div>

                        <!-- Password -->
                        <div class="input-group" :class="{ 'input-group--error': passwordError }">
                            <div class="input-group__field-wrapper">
                                <label for="password" class="input-group__label">
                                    <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </label>
                                <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                    class="input-group__field" placeholder="Password"
                                    @focus="passwordFocus = true; passwordError = ''" @blur="validatePassword"
                                    @input="updatePasswordStrength" required />
                                <button type="button" class="input-group__toggle" @click="showPassword = !showPassword"
                                    :title="showPassword ? 'Hide password' : 'Show password'">
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
                            </div>
                            <transition name="fade">
                                <div v-if="passwordError" class="input-group__error">{{ passwordError }}</div>
                            </transition>
                        </div>

                        <!-- Password strength bar -->
                        <div class="auth__password-strength" v-if="form.password">
                            <span>Password strength:</span>
                            <span class="auth__strength-meter">
                                <!-- The bar advances with width: passwordStrength + '%' -->
                                <span class="auth__strength-bar" :style="{ width: passwordStrength + '%' }"
                                    :class="passwordStrengthClass"></span>
                            </span>
                            <!-- Fixed text in neutral color -->
                            <span class="auth__strength-text">{{ passwordStrengthText }}</span>
                        </div>

                        <!-- Confirm Password -->
                        <div class="input-group" :class="{ 'input-group--error': confirmPasswordError }">
                            <div class="input-group__field-wrapper">
                                <label for="confirmPassword" class="input-group__label">
                                    <svg class="input-group__icon" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </label>
                                <input id="confirmPassword" v-model="form.confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'" class="input-group__field"
                                    placeholder="Confirm Password"
                                    @focus="confirmPasswordFocus = true; confirmPasswordError = ''"
                                    @blur="validateConfirmPassword" required />
                                <button type="button" class="input-group__toggle"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                    :title="showConfirmPassword ? 'Hide password' : 'Show password'">
                                    <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round">
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
                            </div>
                            <transition name="fade">
                                <div v-if="confirmPasswordError" class="input-group__error">{{ confirmPasswordError }}
                                </div>
                            </transition>
                        </div>

                        <!-- Terms -->
                        <div class="auth__terms">
                            <label class="checkbox">
                                <input type="checkbox" v-model="acceptTerms" @change="validateTerms">
                                <span class="checkbox__mark"></span>
                                <span>I accept the <a href="#" class="auth__link"
                                        @click.prevent="showTerms = true">Terms and Conditions</a></span>
                            </label>
                            <transition name="fade">
                                <div v-if="termsError" class="input-group__error terms-error">{{ termsError }}</div>
                            </transition>
                        </div>

                        <!-- Register button -->
                        <button type="submit" class="auth__button" :disabled="isSubmitting || !formValid"
                            :class="{ 'auth__button--loading': isSubmitting }">
                            <span v-if="!isSubmitting">Register</span>
                            <span v-else class="auth__loader"></span>
                        </button>
                    </form>

                    <p class="auth__toggle">
                        Already have an account?
                        <router-link to="/login" class="auth__link">Login</router-link>
                    </p>
                </div>
            </div>
        </div>

        <!-- Modal for terms and conditions -->
        <transition name="modal">
            <div v-if="showTerms" class="auth__modal">
                <div class="auth__modal-content">
                    <div class="auth__modal-header">
                        <h3>Terms and Conditions</h3>
                        <button class="auth__modal-close" @click="showTerms = false">×</button>
                    </div>
                    <div class="auth__modal-body">
                        <p>By using our services, you accept our terms and conditions...</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                            lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                            lacinia, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.</p>
                        <p>Last updated: March 2025</p>
                    </div>
                    <div class="auth__modal-footer">
                        <button class="auth__button auth__button--sm"
                            @click="acceptTerms = true; showTerms = false; validateTerms()">Accept</button>
                        <button class="auth__button auth__button--outline" @click="showTerms = false">Close</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
});

// UI states
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isSubmitting = ref(false);
const acceptTerms = ref(false);
const showTerms = ref(false);
const registerSuccess = ref(false);
const errorMessage = ref('');

// Validation states
const nombreError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const termsError = ref('');

const nombreFocus = ref(false);
const emailFocus = ref(false);
const passwordFocus = ref(false);
const confirmPasswordFocus = ref(false);

// Password strength
const passwordStrength = ref(0);

/* ========================================
   VALIDATIONS
======================================== */
const validateNombre = () => {
    if (!form.value.nombre) {
        nombreError.value = 'Full name is required';
        return false;
    }
    if (form.value.nombre.length < 3) {
        nombreError.value = 'Name must be at least 3 characters';
        return false;
    }
    nombreError.value = '';
    return true;
};

const validateEmail = () => {
    if (!form.value.email) {
        emailError.value = 'Email is required';
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.value.email)) {
        emailError.value = 'Invalid email format';
        return false;
    }
    emailError.value = '';
    return true;
};

const validatePassword = () => {
    if (!form.value.password) {
        passwordError.value = 'Password is required';
        return false;
    }
    if (form.value.password.length < 6) {
        passwordError.value = 'Password must be at least 6 characters';
        return false;
    }
    // If there's already a confirmPassword, we validate again
    if (form.value.confirmPassword) {
        validateConfirmPassword();
    }
    passwordError.value = '';
    return true;
};

const validateConfirmPassword = () => {
    if (!form.value.confirmPassword) {
        confirmPasswordError.value = 'Password confirmation is required';
        return false;
    }
    if (form.value.password !== form.value.confirmPassword) {
        confirmPasswordError.value = 'Passwords do not match';
        return false;
    }
    confirmPasswordError.value = '';
    return true;
};

const validateTerms = () => {
    if (!acceptTerms.value) {
        termsError.value = 'You must accept the terms and conditions';
        return false;
    }
    termsError.value = '';
    return true;
};

/* ========================================
   PASSWORD STRENGTH
======================================== */
function calculatePasswordStrength(password: string) {
    if (!password) return 0;

    let strength = 0;

    // Length
    if (password.length >= 12) {
        strength += 30;
    } else if (password.length >= 8) {
        strength += 20;
    } else if (password.length >= 6) {
        strength += 10;
    }

    // Numbers
    if (/\d/.test(password)) {
        strength += 20;
    }

    // Upper and lowercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength += 25;
    } else if (/[a-z]/.test(password) || /[A-Z]/.test(password)) {
        strength += 10;
    }

    // Special characters
    if (/[^a-zA-Z0-9]/.test(password)) {
        strength += 25;
    }

    return Math.min(strength, 100);
}

const updatePasswordStrength = () => {
    passwordStrength.value = calculatePasswordStrength(form.value.password);
};

const passwordStrengthClass = computed(() => {
    const val = passwordStrength.value;
    if (val >= 80) return 'strength-high';
    if (val >= 50) return 'strength-medium';
    return 'strength-low';
});

const passwordStrengthText = computed(() => {
    const val = passwordStrength.value;
    if (val >= 80) return 'Strong';
    if (val >= 50) return 'Medium';
    return 'Weak';
});

/* ========================================
   COMPUTED: Valid form
======================================== */
const formValid = computed(() => {
    return (
        !nombreError.value &&
        !emailError.value &&
        !passwordError.value &&
        !confirmPasswordError.value &&
        !termsError.value &&
        form.value.nombre &&
        form.value.email &&
        form.value.password &&
        form.value.confirmPassword &&
        acceptTerms.value
    );
});

/* ========================================
   SUBMIT
======================================== */
const handleSubmit = async () => {
  // 1. Field validations before submitting
  const isNombreValid = validateNombre();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isTermsValid = validateTerms();

  // If any validation fails, we stop the submit
  if (
    !isNombreValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isConfirmPasswordValid ||
    !isTermsValid
  ) {
    return;
  }

  try {
    // 2. Start the submission process
    isSubmitting.value = true;
    errorMessage.value = '';

    // (Optional) Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 500));

    // 3. Call the store to register
    const response = await authStore.register(
      form.value.nombre,
      form.value.email,
      form.value.password
    );
    console.log("Response in component:", response);

    // 4. Check if registration was successful
    if (!response || !response.success) {
      // Check if the backend indicates that the email already exists
      if (response?.message?.toLowerCase().includes("already registered")) {
        errorMessage.value = "Email is already registered. Please log in with your account.";
      } else {
        errorMessage.value =
          response?.message || "Error registering. Please try again.";
      }
      return;
    }

    // 5. If we get here, success = true
    registerSuccess.value = true;

    // 6. (Optional) Redirect to login after 2s
    setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (error: any) {
    // General error handling (e.g., network errors, etc.)
    console.error("Error in registration:", error);
    errorMessage.value = "Error registering. Please try again.";
  } finally {
    // 7. End loading
    isSubmitting.value = false;
  }
};


/* Listen for changes in the password to recalculate strength */
watch(() => form.value.password, () => {
    updatePasswordStrength();
});

/* Initialize the strength bar */
updatePasswordStrength();
</script>

<style lang="scss" scoped>
/* ===================== */
/*   ANIMACIONES / KEYFRAMES
/* ===================== */
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* ===================== */
/*   CONTENEDOR PRINCIPAL
/* ===================== */
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
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

    /* Títulos */
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
        gap: 1rem;
    }

    /* Mensajes de éxito y error */
    .auth__success-message {
        background-color: rgba(46, 204, 113, 0.2);
        color: #2ecc71;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;

        .auth__success-icon {
            margin-right: 0.5rem;
        }
    }

    .auth__error-message {
        background-color: rgba(231, 76, 60, 0.2);
        color: #e74c3c;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;

        .auth__error-icon {
            margin-right: 0.5rem;
            font-weight: bold;
        }
    }

    /* ===================== */
    /*    GRUPOS DE INPUT    */
    /* ===================== */
    .input-group {
        width: 100%;
        transition: all 0.3s ease;

        &__field-wrapper {
            position: relative;
            height: 48px; // Evita que el icono "salte" cuando aparezca error
        }

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
            border-radius: 16px;
            /* Más redondeado */
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
            text-align: left;
            padding-left: 45px;
        }

        &--error &__field {
            border-color: #e74c3c;
        }
    }

    /* ===================== */
    /* BARRA FORTALEZA PASS  */
    /* ===================== */
    &__password-strength {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
        font-size: 0.85rem;
        color: #ccc;
        flex-wrap: wrap;
        justify-content: center;
    }

    &__strength-meter {
        position: relative;
        width: 100px;
        height: 6px;
        background: #444;
        /* Fondo neutro */
        border-radius: 3px;
        overflow: hidden;
    }

    &__strength-bar {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        transition: width 0.3s ease;
    }

    /* Texto de fortaleza en color neutro */
    &__strength-text {
        font-weight: bold;
        color: #ccc;
        transition: color 0.3s ease;
    }

    /* Colores de la barra según fortaleza */
    .strength-low {
        background-color: #e74c3c;
    }

    .strength-medium {
        background-color: #f39c12;
    }

    .strength-high {
        background-color: #2ecc71;
    }

    /* ===================== */
    /* CHECKBOX DE TÉRMINOS  */
    /* ===================== */
    &__terms {
        margin-top: 0.5rem;
        text-align: left;
    }

    .terms-error {
        padding-left: 30px;
    }

    .checkbox {
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #ccc;
        font-size: 0.85rem;

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

    /* ===================== */
    /*   BOTÓN REGISTRARSE   */
    /* ===================== */
    &__button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        font-weight: bold;
        background: #d8b268;
        color: #0d1b1e;
        border: none;
        border-radius: 16px;
        cursor: pointer;
        transition: 0.3s ease;
        position: relative;
        overflow: hidden;
        margin-top: 1rem;

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

    &__toggle {
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

    /* ===================== */
    /*   MEDIA QUERIES       */
    /* ===================== */
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
                animation: fadeIn 0.8s forwards;
            }

            p {
                font-size: 0.8rem;
                color: #ccc;
                letter-spacing: 2px;
                margin-top: 0;
                animation: fadeIn 0.8s 0.2s forwards;
                opacity: 0;
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
                animation: slideInLeft 0.8s 0.3s forwards;
                opacity: 0;
            }

            p {
                color: #ccc;
                font-size: 1rem;
                line-height: 1.6;
                animation: slideInLeft 0.8s 0.5s forwards;
                opacity: 0;
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
            opacity: 0;
            animation: slideInBottom 0.8s 0.7s forwards;

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

        .slide-in-bottom-delay-1 {
            animation-delay: 0.9s;
        }

        .slide-in-bottom-delay-2 {
            animation-delay: 1.1s;
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
            padding: 3rem;
            overflow-y: auto;

            /* Scrollbar custom */
            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-track {
                background: rgba(26, 43, 47, 0.5);
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb {
                background: #1a2b2f;
                border: 2px solid rgba(216, 178, 104, 0.3);
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb:hover {
                background: #253b43;
            }
        }
    }
}

/* Clases para animaciones */
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

.fade-in-up {
    animation: fadeInUp 0.8s forwards;
}
</style>
