<template>
    <div class="unauthorized-container">
        <div class="error-card">
            <div class="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    <line x1="4" y1="4" x2="20" y2="20"></line>
                </svg>
            </div>
            <h1 class="error-code">401</h1>
            <h2 class="error-title">Access Denied</h2>
            <p class="error-message">You do not have permission to access this page. This area is restricted to administrators only.</p>
            <div class="action-buttons">
                <button @click="goBack" class="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Go Back
                </button>
                <button @click="goToLogin" class="btn-login">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Log In
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Función para volver a la página anterior
const goBack = () => {
    router.go(-1);
};

// Función para ir a la página de login de administrador
const goToLogin = () => {
    router.push('/admin');
};
</script>

<style scoped>
.unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1e3a40, #0d1b1e, #2c3e50, #182830);
    padding: 20px;
}

.error-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    padding: 2.5rem;
    text-align: center;
    max-width: 500px;
    width: 100%;
    position: relative;
    overflow: hidden;
    animation: fadeInUp 0.6s ease-out forwards;
}

.error-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(to right, #f5365c, #e14eca);
}

.error-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
}

.error-icon svg {
    width: 80px;
    height: 80px;
    color: #f5365c;
    animation: pulse 2s infinite;
}

.error-code {
    font-size: 5rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(to right, #f5365c, #e14eca);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
}

.error-title {
    font-size: 2rem;
    margin: 0.5rem 0 1.5rem;
    color: #3d4465;
}

.error-message {
    color: #6e7891;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
}

.action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.btn-back,
.btn-login {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
}

.btn-back {
    background-color: #f8f9fc;
    color: #4f566b;
    border: 1px solid #e5e9f2;
}

.btn-back:hover {
    background-color: #edf2f9;
    transform: translateY(-2px);
}

.btn-login {
    background: linear-gradient(to right, #f5365c, #e14eca);
    color: white;
    box-shadow: 0 4px 12px rgba(245, 54, 92, 0.3);
}

.btn-login:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(245, 54, 92, 0.4);
}

.btn-back svg,
.btn-login svg {
    width: 20px;
    height: 20px;
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

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

/* Estilos responsivos */
@media (max-width: 600px) {
    .error-card {
        padding: 2rem 1.5rem;
    }

    .error-code {
        font-size: 4rem;
    }

    .error-title {
        font-size: 1.5rem;
    }

    .error-message {
        font-size: 1rem;
    }

    .action-buttons {
        flex-direction: column;
        gap: 0.75rem;
    }

    .btn-back,
    .btn-login {
        width: 100%;
    }
}
</style>