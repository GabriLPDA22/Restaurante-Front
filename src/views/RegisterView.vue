<template>
    <div class="auth">
        <div class="auth__container">
            <h2 class="auth__title">Register <span class="auth__icon">🧑‍💻</span></h2>
            <p class="auth__subtitle">Join us today!</p>

            <h3 class="auth__heading">Enter Your Details</h3>

            <form @submit.prevent="handleSubmit" class="auth__form">
                <div class="input-group">
                    <input v-model="form.nombre" type="text" class="input-group__field" placeholder="Full Name"
                        required />
                </div>
                <div class="input-group">
                    <input v-model="form.email" type="email" class="input-group__field" placeholder="Email" required />
                </div>
                <div class="input-group">
                    <input v-model="form.password" type="password" class="input-group__field" placeholder="Password"
                        required />
                </div>
                <div class="input-group">
                    <input v-model="form.confirmPassword" type="password" class="input-group__field"
                        placeholder="Confirm Password" required />
                </div>
                <button class="auth__button">Register</button>
            </form>

            <p class="auth__toggle">
                Already have an account? <router-link to="/login" class="auth__link">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

const form = ref({ nombre: '', email: '', password: '', confirmPassword: '' });

const handleSubmit = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        await authStore.register(form.value.nombre, form.value.email, form.value.password);
    } catch (error) {
        console.error('Error en el registro:', error);
    }
};

</script>


<style lang="scss" scoped>
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #0d1b1e;

    &__container {
        background: #1a2b2f;
        padding: 2rem;
        border-radius: 20px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 4px 10px rgba(216, 178, 104, 0.3);
    }

    &__title {
        font-size: 1.8rem;
        font-weight: bold;
        color: #d8b268;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__icon {
        margin-left: 8px;
    }

    &__subtitle {
        font-size: 1rem;
        color: #ccc;
        margin-bottom: 1rem;
    }

    &__heading {
        font-size: 1.2rem;
        font-weight: bold;
        color: #d8b268;
        margin-bottom: 1rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .input-group {
        position: relative;
        width: 100%;

        &__field {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #d8b268;
            border-radius: 8px;
            font-size: 1rem;
            text-align: center;
            background: transparent;
            color: #fff;
            transition: 0.3s;

            &:focus {
                border-color: #b8965f;
                outline: none;
            }
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

        &:hover {
            background: #b8965f;
        }
    }

    &__toggle {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #d8b268;
    }

    &__link {
        color: #d8b268;
        font-weight: bold;
        text-decoration: none;
    }
}
</style>