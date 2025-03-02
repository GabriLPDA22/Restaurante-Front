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

<style lang="scss" scoped>
// Variables - Elixium Foods color scheme
$color-gold: #D4B96A;
$color-dark: #0F1114;
$color-text: #E5E5E5;
$color-background: #121618;
$color-card: #1A1D20;
$font-primary: 'Cormorant Garamond', serif;
$font-secondary: 'Montserrat', sans-serif;

.not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: $color-background;
    padding: 2rem;
    font-family: $font-secondary;
}

.not-found-content {
    text-align: center;
    background-color: $color-card;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
    border: 1px solid rgba($color-gold, 0.1);
}

.error-code {
    font-size: 8rem;
    font-weight: bold;
    color: $color-gold;
    margin-bottom: 1rem;
    font-family: $font-primary;
    line-height: 1;
}

h1 {
    font-size: 2.5rem;
    color: $color-text;
    margin-bottom: 1rem;
    font-family: $font-primary;
}

p {
    font-size: 1.125rem;
    color: rgba($color-text, 0.7);
    margin-bottom: 2rem;
}

.error-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media (max-width: 576px) {
        flex-direction: column;
    }
}

.btn-home,
.btn-back {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 1rem;

    @media (max-width: 576px) {
        width: 100%;
    }
}

.btn-home {
    background-color: $color-gold;
    color: $color-dark;

    &:hover {
        background-color: darken($color-gold, 10%);
        transform: translateY(-2px);
    }
}

.btn-back {
    background-color: rgba($color-gold, 0.1);
    color: $color-gold;
    border: 1px solid $color-gold;

    &:hover {
        background-color: rgba($color-gold, 0.2);
        transform: translateY(-2px);
    }
}
</style>