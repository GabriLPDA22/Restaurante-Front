<template>
    <div class="auth">
        <div class="auth__container">
            <h2 class="auth__title">Login <span class="auth__icon">👤</span></h2>
            <p class="auth__subtitle">Welcome back, User</p>

            <h3 class="auth__heading">Enter Your Details</h3>

            <form @submit.prevent="handleLogin" class="auth__form">
                <div class="input-group">
                    <input v-model="email" type="email" class="input-group__field" placeholder="Email" required />
                </div>

                <div class="input-group">
                    <input v-model="password" type="password" class="input-group__field" placeholder="Password"
                        required />
                </div>

                <div class="auth__options">
                    <a href="#" class="auth__link">Forgot Password?</a>
                </div>

                <button class="auth__button">Login</button>
            </form>

            <div class="auth__divider">Or Login with</div>

            <button class="auth__google-button" @click="loginWithGoogle">
                <img :src="googleIcon" alt="Google Logo" class="auth__google-image">
                Continue with Google
            </button>

            <p class="auth__footer">
                You don’t have an account? <router-link to="/register" class="auth__link">Sign up</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import googleIcon from '@/assets/google.png';

const email = ref('');
const password = ref('');

const handleLogin = () => {
    console.log('Logging in with', email.value, password.value);
};

const loginWithGoogle = () => {
    console.log('Logging in with Google');
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

    &__options {
        text-align: right;
    }

    &__link {
        color: #d8b268;
        font-weight: bold;
        text-decoration: none;
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
        }
    }

    &__footer {
        margin-top: 1rem;
        font-size: 0.9rem;
        color: #ccc;
    }
}
</style>