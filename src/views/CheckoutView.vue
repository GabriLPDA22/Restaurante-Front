<template>
    <div class="checkout">
      <div class="checkout__wrapper">
        <div class="checkout__header">
          <h1>Finalizar Pedido</h1>
          <p>Confirma tu pedido y completa la información de entrega</p>
        </div>
  
        <div class="checkout__content">
          <div class="checkout__summary">
            <div class="summary-header">
              <h2>Resumen del Pedido</h2>
              <span class="items-count">{{ totalItems }} artículos</span>
            </div>
  
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <div class="summary-item__image-container">
                  <img :src="item.imagenUrl || '/placeholder-food.jpg'" :alt="item.nombre" class="summary-item__image" />
                </div>
                <div class="summary-item__details">
                  <h3 class="summary-item__name">{{ item.nombre }}</h3>
                  <div class="summary-item__quantity">
                    Cantidad: {{ item.cantidad || item.quantity || 1 }}
                  </div>
                </div>
                <div class="summary-item__price">
                  €{{ ((item.precio || 0) * (item.cantidad || item.quantity || 1)).toFixed(2) }}
                </div>
              </div>
            </div>
  
            <div class="summary-totals">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>€{{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="summary-row">
                <span>Gastos de envío</span>
                <span>€{{ deliveryCost.toFixed(2) }}</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>€{{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
  
          <div class="checkout__form">
            <h2>Información de Entrega</h2>
  
            <form @submit.prevent="procesarPedido" class="delivery-form">
              <div class="form-group">
                <label for="name">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="customerInfo.name" 
                  required 
                  placeholder="Tu nombre completo"
                />
              </div>
  
              <div class="form-group">
                <label for="phone">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="customerInfo.phone" 
                  required 
                  placeholder="Tu número de teléfono"
                />
              </div>
  
              <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="customerInfo.email" 
                  required 
                  placeholder="Tu correo electrónico"
                />
              </div>
  
              <div class="form-group">
                <label for="address">Dirección de entrega</label>
                <input 
                  type="text" 
                  id="address" 
                  v-model="customerInfo.address" 
                  required 
                  placeholder="Tu dirección completa"
                />
              </div>
  
              <div class="form-row">
                <div class="form-group">
                  <label for="postalcode">Código postal</label>
                  <input 
                    type="text" 
                    id="postalcode" 
                    v-model="customerInfo.postalCode" 
                    required 
                    placeholder="Código postal"
                  />
                </div>
                <div class="form-group">
                  <label for="city">Ciudad</label>
                  <input 
                    type="text" 
                    id="city" 
                    v-model="customerInfo.city" 
                    required 
                    placeholder="Ciudad"
                  />
                </div>
              </div>
  
              <div class="form-group">
                <label for="notes">Notas adicionales (opcional)</label>
                <textarea 
                  id="notes"
                  v-model="customerInfo.notes" 
                  placeholder="Instrucciones especiales para la entrega"
                ></textarea>
              </div>
  
              <div class="form-group payment-methods">
                <label>Método de pago</label>
                <div class="payment-options">
                  <div 
                    class="payment-option"
                    :class="{ 'selected': customerInfo.paymentMethod === 'card' }"
                    @click="customerInfo.paymentMethod = 'card'"
                  >
                    <div class="payment-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                    </div>
                    <div class="payment-label">Tarjeta de crédito</div>
                  </div>
                  <div 
                    class="payment-option"
                    :class="{ 'selected': customerInfo.paymentMethod === 'paypal' }"
                    @click="customerInfo.paymentMethod = 'paypal'"
                  >
                    <div class="payment-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 10V8a5 5 0 0 1 10 0v2"></path>
                        <line x1="12" y1="10" x2="12" y2="16"></line>
                        <circle cx="17" cy="10" r="2"></circle>
                        <circle cx="7" cy="10" r="2"></circle>
                      </svg>
                    </div>
                    <div class="payment-label">PayPal</div>
                  </div>
                  <div 
                    class="payment-option"
                    :class="{ 'selected': customerInfo.paymentMethod === 'cash' }"
                    @click="customerInfo.paymentMethod = 'cash'"
                  >
                    <div class="payment-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                    </div>
                    <div class="payment-label">Efectivo al entregar</div>
                  </div>
                </div>
              </div>
  
              <div class="checkout-actions">
                <button type="button" class="btn-secondary" @click="volverAlMenu">
                  Volver al Menú
                </button>
                <button 
                  type="submit" 
                  class="btn-primary" 
                  :disabled="submitting"
                >
                  {{ submitting ? 'Procesando...' : 'Confirmar Pedido' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePedidoStore, ProductoCarrito } from '../stores/usePedidoStore';
  
  const router = useRouter();
  const pedidoStore = usePedidoStore();
  
  // Estado local
  const cartItems = ref<ProductoCarrito[]>([]);
  const submitting = ref(false);
  const deliveryCost = ref(3.99);
  
  // Información del cliente
  const customerInfo = ref({
    name: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    notes: '',
    paymentMethod: 'card'
  });
  
  // Calcular totales
  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => {
      // Verificar si tenemos cantidad o quantity
      const cantidad = item.cantidad !== undefined ? item.cantidad : (item.quantity || 1);
      // Verificar que precio sea un número válido
      const precio = typeof item.precio === 'number' ? item.precio : 0;
      console.log(`Item: ${item.nombre}, Precio: ${precio}, Cantidad: ${cantidad}`);
      return sum + (precio * cantidad);
    }, 0);
  });
  
  const total = computed(() => {
    return subtotal.value + deliveryCost.value;
  });
  
  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.cantidad, 0);
  });
  
  // Cargar datos del carrito
  onMounted(() => {
    // Cargar del localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        cartItems.value = JSON.parse(savedCart);
        // Asegurarse de que cada item tenga la propiedad cantidad en lugar de quantity
        cartItems.value = cartItems.value.map(item => {
          // Si el item tiene quantity pero no cantidad, usamos quantity
          if (item.quantity !== undefined && item.cantidad === undefined) {
            return {
              ...item,
              cantidad: item.quantity
            };
          }
          return item;
        });
        console.log('Carrito cargado:', cartItems.value);
      } catch (error) {
        console.error('Error cargando el carrito:', error);
      }
    }
  });
  
  // Procesar el pedido
  const procesarPedido = async () => {
    submitting.value = true;
    try {
      // Preparar los items en el formato correcto para la API
      const itemsFormateados = cartItems.value.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: parseFloat(item.precio) || 0,
        cantidad: parseInt(item.cantidad || item.quantity || 1)
      }));
  
      console.log('Items a enviar:', itemsFormateados);
      
      // 1. Crear el pedido usando el store
      const resultado = await pedidoStore.crearPedido(itemsFormateados);
      
      if (resultado) {
        // 2. Guardar información para la página de agradecimiento
        const orderInfo = {
          customerName: customerInfo.value.name,
          totalItems: totalItems.value,
          total: total.value,
          date: new Date().toISOString(),
          orderNumber: resultado.IdPedidos || Date.now(),
          items: itemsFormateados
        };
        
        // Guardar en localStorage para que la página de agradecimiento pueda acceder
        localStorage.setItem('lastOrder', JSON.stringify(orderInfo));
        
        // 3. Limpiar el carrito
        localStorage.removeItem('cart');
        
        // 4. Redirigir a la página de agradecimiento
        router.push('/thanks-order');
      } else {
        alert('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
    } finally {
      submitting.value = false;
    }
  };
  
  // Volver al menú
  const volverAlMenu = () => {
    router.push('/cart');
  };
  </script>
  
  <style lang="scss">
  :root {
    --primary-color: #2B7A78;
    --primary-dark: #1f5957;
    --secondary-color: #e8f4f1;
    --accent-color: #FFC107;
    --text-dark: #17252A;
    --text-light: #FFFFFF;
    --text-gray: #6c757d;
    --border-color: #e0e0e0;
    --error-color: #dc3545;
    --success-color: #28a745;
  }
  
  .checkout {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 1rem;
    
    &__wrapper {
      max-width: 1200px;
      margin: 0 auto;
      background-color: var(--text-light);
      border-radius: 0.5rem;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    &__header {
      background: var(--primary-color);
      color: var(--text-light);
      padding: 1.5rem;
      text-align: center;
      
      h1 {
        font-size: 1.75rem;
        margin-bottom: 0.5rem;
      }
      
      p {
        opacity: 0.9;
        font-size: 1rem;
      }
    }
    
    &__content {
      display: flex;
      flex-direction: column;
      
      @media (min-width: 992px) {
        flex-direction: row;
      }
    }
    
    &__summary {
      padding: 1.5rem;
      background-color: var(--secondary-color);
      
      @media (min-width: 992px) {
        width: 40%;
      }
      
      .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: the 1.25rem;
        
        h2 {
          font-size: 1.25rem;
          color: var(--text-dark);
          font-weight: 600;
        }
        
        .items-count {
          background-color: var(--primary-color);
          color: var(--text-light);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
        }
      }
      
      .summary-items {
        margin-bottom: 1.5rem;
        max-height: 400px;
        overflow-y: auto;
        
        .summary-item {
          display: flex;
          align-items: center;
          background-color: var(--text-light);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          
          &__image-container {
            width: 50px;
            height: 50px;
            border-radius: 0.25rem;
            overflow: hidden;
            margin-right: 0.75rem;
          }
          
          &__image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          &__details {
            flex: 1;
          }
          
          &__name {
            font-size: 0.95rem;
            margin-bottom: 0.2rem;
            color: var(--text-dark);
          }
          
          &__quantity {
            font-size: 0.85rem;
            color: var(--text-gray);
          }
          
          &__price {
            font-weight: 500;
            color: var(--primary-color);
            font-size: 0.95rem;
          }
        }
      }
      
      .summary-totals {
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          
          &:last-child {
            border-bottom: none;
          }
          
          &.total {
            font-weight: bold;
            font-size: 1.1rem;
            margin-top: 0.5rem;
            color: var(--primary-color);
          }
        }
      }
    }
    
    &__form {
      padding: 1.5rem;
      
      @media (min-width: 992px) {
        width: 60%;
      }
      
      h2 {
        font-size: 1.25rem;
        margin-bottom: 1.25rem;
        color: var(--text-dark);
        font-weight: 600;
      }
      
      .delivery-form {
        .form-group {
          margin-bottom: 1rem;
          
          label {
            display: block;
            margin-bottom: 0.35rem;
            font-weight: 500;
            color: var(--text-dark);
            font-size: 0.9rem;
          }
          
          input, textarea {
            width: 100%;
            padding: 0.6rem 0.8rem;
            border: 1px solid var(--border-color);
            border-radius: 0.25rem;
            font-size: 0.95rem;
            
            &:focus {
              outline: none;
              border-color: var(--primary-color);
              box-shadow: 0 0 0 2px rgba(43, 122, 120, 0.1);
            }
          }
          
          textarea {
            min-height: 100px;
            resize: vertical;
          }
        }
        
        .form-row {
          display: flex;
          gap: 1rem;
          
          .form-group {
            flex: 1;
          }
        }
        
        .payment-methods {
          .payment-options {
            display: flex;
            gap: 1rem;
            
            .payment-option {
              border: 1px solid var(--border-color);
              border-radius: 0.25rem;
              padding: 0.8rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              transition: all 0.2s ease;
              flex: 1;
              
              &:hover {
                border-color: var(--primary-color);
              }
              
              &.selected {
                border-color: var(--primary-color);
                background-color: rgba(43, 122, 120, 0.05);
              }
              
              .payment-icon {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                color: var(--primary-color);
                
                svg {
                  width: 24px;
                  height: 24px;
                }
              }
              
              .payment-label {
                text-align: center;
                font-size: 0.85rem;
              }
            }
          }
        }
        
        .checkout-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          
          @media (max-width: 576px) {
            flex-direction: column;
            gap: 1rem;
          }
          
          button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.25rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
            
            &:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }
            
            @media (max-width: 576px) {
              width: 100%;
            }
          }
          
          .btn-secondary {
            background-color: #f1f1f1;
            color: var(--text-dark);
            
            &:hover {
              background-color: #e4e4e4;
            }
          }
          
          .btn-primary {
            background-color: var(--primary-color);
            color: var(--text-light);
            
            &:hover {
              background-color: darken(#2B7A78, 10%);
            }
          }
        }
      }
    }
  }
  
  @media (max-width: 991px) {
    .checkout__content {
      flex-direction: column;
    }
    
    .checkout__summary, 
    .checkout__form {
      width: 100%;
    }
  }
  </style>