<template>
    <div class="not-found-container">
        <div class="not-found-content">
            <div class="error-code">404</div>
            <h1>Página no encontrada</h1>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <div class="error-actions">
                <router-link to="/" class="btn-home">
                    Volver al Inicio
                </router-link>
                <button @click="goBack" class="btn-back">
                    Ir Atrás
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
    router.go(-1)
}
</script>

<style scoped>
.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f2f5;
    padding: 2rem;
}

.not-found-content {
    text-align: center;
    background-color: white;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
}

.error-code {
    font-size: 8rem;
    font-weight: bold;
    color: #3B82F6;
    margin-bottom: 1rem;
}

h1 {
    font-size: 2.5rem;
    color: #1F2937;
    margin-bottom: 1rem;
}

p {
    font-size: 1.125rem;
    color: #6B7280;
    margin-bottom: 2rem;
}

.error-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.btn-home,
.btn-back {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
}

.btn-home {
    background-color: #3B82F6;
    color: white;

    &:hover {
        background-color: #2563EB;
    }
}

.btn-back {
    background-color: #F3F4F6;
    color: #1F2937;

    &:hover {
        background-color: #E5E7EB;
    }
}
</style>