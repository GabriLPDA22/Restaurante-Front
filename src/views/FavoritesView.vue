<template>
    <div class="favorites-container">
        <div class="favorites-wrapper">
            <div class="favorites-header">
                <h1>
                    <i class="fas fa-heart"></i>
                    Mis Favoritos
                </h1>
            </div>

            <div class="favorites-content">
                <div v-if="loading" class="favorites-message">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Cargando tus favoritos...</p>
                </div>

                <div v-else-if="!favoritos.length" class="favorites-message">
                    <i class="fas fa-heart-broken"></i>
                    <p>Aún no tienes productos en favoritos</p>
                    <router-link to="/cart" class="btn-primary">Ver productos</router-link>
                </div>

                <div v-else class="favorites-grid">
                    <div v-for="favorito in favoritos" :key="favorito.id" class="favorite-card">
                        <div class="favorite-card__image">
                            <img :src="favorito.imagenUrl" :alt="favorito.nombreProducto" />
                            <div class="favorite-card__remove" @click="removeFavorite(favorito.productoId)">
                                <i class="fas fa-times"></i>
                            </div>
                        </div>
                        <div class="favorite-card__content">
                            <h3 class="favorite-card__title">{{ favorito.nombreProducto }}</h3>
                            <p class="favorite-card__description">{{ favorito.descripcionProducto }}</p>
                            <div class="favorite-card__price">€{{ formatPrice(favorito.precioProducto) }}</div>
                            <button class="btn-primary" @click="addToCart(favorito)">
                                <i class="fas fa-shopping-cart"></i> Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const favoritos = ref([]);
const loading = ref(true);

const logUserInfo = () => {
    console.log("===== INFORMACIÓN DEL USUARIO (FavoritesView) =====");
    console.log("authStore existe:", !!authStore);
    console.log("authStore.user:", authStore.user);
    console.log("authStore.isAuthenticated:", authStore.isAuthenticated);

    if (authStore.user) {
        console.log("UserID:", authStore.user.UserID);
        console.log("Email:", authStore.user.Email);
        console.log("Nombre:", authStore.user.Nombre);
        console.log("Valores disponibles:", Object.keys(authStore.user));
    }
    console.log("=======================================");
};

const getCurrentUserId = () => {
    logUserInfo();

    if (authStore.user) {
        const possibleIds = ['UserID', 'userId', 'userID', 'id', 'Id', 'ID'];

        for (const prop of possibleIds) {
            if (authStore.user[prop] !== undefined) {
                console.log(`Encontrado ID de usuario en propiedad: ${prop} = ${authStore.user[prop]}`);
                return authStore.user[prop];
            }
        }

        for (const key in authStore.user) {
            if (key.toLowerCase().includes('id') && typeof authStore.user[key] === 'number') {
                console.log(`Encontrado posible ID de usuario en propiedad: ${key} = ${authStore.user[key]}`);
                return authStore.user[key];
            }
        }

        console.log("No se encontró ID de usuario. Objeto completo:", JSON.stringify(authStore.user));
    }

    console.error("No se pudo determinar el ID del usuario");
    return null;
};

onMounted(async () => {
    console.log("Componente Favoritos montado");
    logUserInfo();
    await loadFavorites();
});

const loadFavorites = async () => {
    try {
        loading.value = true;
        const userId = getCurrentUserId();

        if (!userId) {
            console.error("No se pudo obtener el ID del usuario para cargar favoritos");
            loading.value = false;
            loadLocalFavorites();
            return;
        }

        console.log(`Cargando favoritos para usuario ID: ${userId}`);

        const response = await fetch(`http://localhost:5021/api/Favoritos/usuario/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(`Respuesta de la API (status ${response.status}):`, response);

        if (response.ok) {
            const data = await response.json();
            console.log("Datos recibidos de la API:", data);
            favoritos.value = data;
            console.log("Favoritos cargados:", favoritos.value.length);

            saveLocalFavorites();
        } else {
            const errorText = await response.text();
            console.error(`Error ${response.status} al cargar favoritos:`, errorText);

            loadLocalFavorites();
        }
    } catch (error) {
        console.error('Error al cargar favoritos:', error);

        loadLocalFavorites();
    } finally {
        loading.value = false;
    }
};

const removeFavorite = async (productoId) => {
    try {
        const userId = getCurrentUserId();
        if (!userId) {
            console.error("No se pudo obtener el ID del usuario para eliminar favorito");
            removeLocalFavorite(productoId);
            return;
        }

        console.log(`Eliminando favorito para usuario ID: ${userId}, producto ID: ${productoId}`);

        const response = await fetch(`http://localhost:5021/api/Favoritos/usuario/${userId}/producto/${productoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(`Respuesta de la API (status ${response.status}):`, response);

        if (response.ok) {
            favoritos.value = favoritos.value.filter(fav => fav.productoId !== productoId);
            console.log(`Producto ${productoId} eliminado de favoritos`);

            const localFavorites = JSON.parse(localStorage.getItem('local_favorites') || '[]');
            localStorage.setItem('local_favorites', JSON.stringify(localFavorites.filter(id => id !== productoId)));
        } else {
            const errorText = await response.text();
            console.error(`Error ${response.status} al eliminar favorito:`, errorText);

            removeLocalFavorite(productoId);
        }
    } catch (error) {
        console.error('Error al eliminar favorito:', error);

        removeLocalFavorite(productoId);
    }
};

const loadLocalFavorites = () => {
    try {
        console.log("Cargando favoritos desde localStorage");
        const savedFavorites = localStorage.getItem('local_favorites');

        if (savedFavorites) {
            const favoriteIds = JSON.parse(savedFavorites);
            console.log("IDs de favoritos encontrados:", favoriteIds);

            favoritos.value = favoriteIds.map(id => ({
                id: id,
                productoId: id,
                nombreProducto: `Producto ${id}`,
                descripcionProducto: 'Información no disponible',
                precioProducto: 0,
                imagenUrl: '/assets/placeholder.jpg'
            }));
        } else {
            favoritos.value = [];
        }
    } catch (e) {
        console.error('Error al cargar favoritos desde localStorage:', e);
        favoritos.value = [];
    }
};

const saveLocalFavorites = () => {
    if (favoritos.value && favoritos.value.length > 0) {
        const favoriteIds = favoritos.value.map(fav => fav.productoId);
        localStorage.setItem('local_favorites', JSON.stringify(favoriteIds));
    } else {
        localStorage.setItem('local_favorites', '[]');
    }
};

const removeLocalFavorite = (productoId) => {
    favoritos.value = favoritos.value.filter(fav => fav.productoId !== productoId);

    const localFavorites = JSON.parse(localStorage.getItem('local_favorites') || '[]');
    localStorage.setItem('local_favorites', JSON.stringify(localFavorites.filter(id => id !== productoId)));
};

const addToCart = (favorito) => {
    const producto = {
        id: favorito.productoId,
        nombre: favorito.nombreProducto,
        descripcion: favorito.descripcionProducto,
        precio: favorito.precioProducto,
        imagenUrl: favorito.imagenUrl,
        quantity: 1
    };

    let cart = [];
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error parsing cart from localStorage:', e);
        }
    }

    const existingItem = cart.find(item => item.id === producto.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(producto);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('¡Producto añadido al carrito!');
};

const formatPrice = (price) => {
    if (!price && price !== 0) return '0.00';
    return parseFloat(price).toFixed(2);
};
</script>

<style lang="scss" scoped>
$color-gold: #D4B96A;
$color-dark: #0F1114;
$color-text: #E5E5E5;
$color-background: #121618;
$color-card: #1A1D20;
$color-light-card: #232529;
$font-primary: 'Cormorant Garamond', serif;
$font-secondary: 'Montserrat', sans-serif;

.favorites-container {
    background-color: $color-background;
    min-height: 100vh;
    padding: 2rem;
    font-family: $font-secondary;
    color: $color-text;

    .favorites-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        background-color: $color-card;
        border-radius: 0.5rem;
        border: 1px solid rgba($color-gold, 0.1);

        .favorites-header {
            background: $color-gold;
            color: $color-dark;
            padding: 2rem;

            h1 {
                font-family: $font-primary;
                font-size: 2rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                letter-spacing: 1px;

                i {
                    margin-right: 1rem;
                    font-size: 2rem;
                }
            }
        }

        .favorites-content {
            padding: 2rem;

            .favorites-message {
                text-align: center;
                padding: 3rem;
                color: $color-text;

                i {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                    color: $color-gold;

                    &.fa-heart-broken {
                        color: #E74C3C;
                    }
                }

                p {
                    font-size: 1.2rem;
                    margin-bottom: 1.5rem;
                }

                .btn-primary {
                    background-color: $color-gold;
                    color: $color-dark;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.25rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: inline-block;
                    transition: background-color 0.3s;

                    &:hover {
                        background-color: darken($color-gold, 10%);
                    }
                }
            }

            .favorites-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
            }

            .favorite-card {
                background-color: $color-light-card;
                border-radius: 0.5rem;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s, box-shadow 0.3s;

                &:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                }

                &__image {
                    position: relative;
                    height: 180px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        transition: transform 0.5s;
                    }

                    &:hover img {
                        transform: scale(1.05);
                    }

                    .favorite-card__remove {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background-color: rgba($color-dark, 0.7);
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        opacity: 0;
                        transition: opacity 0.3s;

                        i {
                            color: white;
                            font-size: 14px;
                        }
                    }

                    &:hover .favorite-card__remove {
                        opacity: 1;
                    }
                }

                &__content {
                    padding: 1.25rem;
                }

                &__title {
                    font-family: $font-primary;
                    color: $color-gold;
                    font-size: 1.3rem;
                    margin-bottom: 0.5rem;
                }

                &__description {
                    color: $color-text;
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    opacity: 0.8;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                &__price {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: $color-gold;
                }

                .btn-primary {
                    width: 100%;
                    background-color: $color-gold;
                    color: $color-dark;
                    border: none;
                    padding: 0.75rem;
                    border-radius: 0.25rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;

                    &:hover {
                        background-color: darken($color-gold, 10%);
                    }
                }
            }
        }
    }
}

// Media queries para responsive
@media (max-width: 768px) {
    .favorites-container {
        padding: 1rem;
    }

    .favorites-wrapper .favorites-header {
        padding: 1.5rem;

        h1 {
            font-size: 1.7rem;

            i {
                font-size: 1.7rem;
            }
        }
    }

    .favorites-grid {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    }
}

@media (max-width: 480px) {
    .favorites-wrapper .favorites-content {
        padding: 1rem;
    }

    .favorites-grid {
        grid-template-columns: 1fr;
    }
}
</style>