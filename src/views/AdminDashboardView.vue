<template>
    <div class="admin-dashboard">
      <div class="dashboard-header">
        <h1>Admin Dashboard - Elixium Foods</h1>
        <div class="admin-info">
          <span>Bienvenido, {{ adminName }}</span>
          <button @click="handleLogout" class="logout-btn">Cerrar Sesión</button>
        </div>
      </div>
  
      <div class="dashboard-content">
        <div class="dashboard-menu">
          <h2>Menú de Administración</h2>
          <nav>
            <button 
              v-for="(section, index) in sections" 
              :key="index"
              @click="activeSection = section.id"
              :class="{ 'active': activeSection === section.id }"
            >
              {{ section.label }}
            </button>
          </nav>
        </div>
  
        <div class="dashboard-section">
          <!-- Items Section -->
          <div v-if="activeSection === 'items'" class="section-items">
            <h3>Gestión de Items</h3>
            <div class="api-section">
              <h4>Items Endpoints</h4>
              <div class="endpoint-list">
                <div v-for="endpoint in itemEndpoints" :key="endpoint.method + endpoint.path" class="endpoint">
                  <span :class="getMethodClass(endpoint.method)">{{ endpoint.method }}</span>
                  <span class="endpoint-path">{{ endpoint.path }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Pedidos Section -->
          <div v-if="activeSection === 'pedidos'" class="section-pedidos">
            <h3>Gestión de Pedidos</h3>
            <div class="api-section">
              <h4>Pedidos Endpoints</h4>
              <div class="endpoint-list">
                <div v-for="endpoint in pedidoEndpoints" :key="endpoint.method + endpoint.path" class="endpoint">
                  <span :class="getMethodClass(endpoint.method)">{{ endpoint.method }}</span>
                  <span class="endpoint-path">{{ endpoint.path }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Productos Section -->
          <div v-if="activeSection === 'productos'" class="section-productos">
            <h3>Gestión de Productos</h3>
            <div class="api-section">
              <h4>Productos Endpoints</h4>
              <div class="endpoint-list">
                <div v-for="endpoint in productosEndpoints" :key="endpoint.method + endpoint.path" class="endpoint">
                  <span :class="getMethodClass(endpoint.method)">{{ endpoint.method }}</span>
                  <span class="endpoint-path">{{ endpoint.path }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { adminAuthStore } from '@/stores/adminAuthStore';
  
  // Store instance
  const store = adminAuthStore();
  const router = useRouter();
  
  // Admin name
  const adminName = ref('Admin');
  
  // Active section
  const activeSection = ref('items');
  
  // Sections for navigation
  const sections = [
    { id: 'items', label: 'Items' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'productos', label: 'Productos' }
  ];
  
  // Endpoint definitions
  const itemEndpoints = [
    { method: 'GET', path: '/api/auth' },
    { method: 'POST', path: '/api/auth' },
    { method: 'GET', path: '/api/auth/{id}' },
    { method: 'PUT', path: '/api/auth/{id}' },
    { method: 'DELETE', path: '/api/auth/{id}' }
  ];
  
  const pedidoEndpoints = [
    { method: 'GET', path: '/api/Pedido' },
    { method: 'POST', path: '/api/Pedido' },
    { method: 'GET', path: '/api/Pedido/{id}' },
    { method: 'PUT', path: '/api/Pedido/{id}' },
    { method: 'DELETE', path: '/api/Pedido/{id}' },
    { method: 'GET', path: '/api/Pedido/usuario/{userId}' },
    { method: 'GET', path: '/api/Pedido/{pedidoId}/items' }
  ];
  
  const productosEndpoints = [
    { method: 'GET', path: '/api/Productos' },
    { method: 'POST', path: '/api/Productos' }
  ];
  
  // Method to get color class for HTTP methods
  const getMethodClass = (method: string) => {
    switch(method) {
      case 'GET': return 'method-get';
      case 'POST': return 'method-post';
      case 'PUT': return 'method-put';
      case 'DELETE': return 'method-delete';
      default: return '';
    }
  };
  
  // Logout handler
  const handleLogout = () => {
    store.logout();
  };
  
  // Check authentication on mount
  onMounted(() => {
    // Check if admin is authenticated
    if (!store.isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
  
    // Get admin info
    const adminInfo = store.getAdminInfo();
    if (adminInfo) {
      adminName.value = adminInfo.nombre;
    }
  });
  </script>
  
  <style scoped>
  .admin-dashboard {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .admin-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logout-btn {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-btn:hover {
    background-color: #c0392b;
  }
  
  .dashboard-content {
    display: flex;
    flex-grow: 1;
  }
  
  .dashboard-menu {
    background-color: #34495e;
    color: white;
    width: 250px;
    padding: 1rem;
  }
  
  .dashboard-menu nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .dashboard-menu button {
    background-color: transparent;
    border: none;
    color: white;
    text-align: left;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .dashboard-menu button:hover,
  .dashboard-menu button.active {
    background-color: #2c3e50;
  }
  
  .dashboard-section {
    flex-grow: 1;
    padding: 1rem;
    background-color: white;
  }
  
  .api-section {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .endpoint-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .endpoint {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    background-color: #e9ecef;
    border-radius: 4px;
  }
  
  .method-get { 
    background-color: #3498db; 
    color: white; 
    padding: 0.25rem 0.5rem; 
    border-radius: 4px; 
  }
  .method-post { 
    background-color: #2ecc71; 
    color: white; 
    padding: 0.25rem 0.5rem; 
    border-radius: 4px; 
  }
  .method-put { 
    background-color: #f39c12; 
    color: white; 
    padding: 0.25rem 0.5rem; 
    border-radius: 4px; 
  }
  .method-delete { 
    background-color: #e74c3c; 
    color: white; 
    padding: 0.25rem 0.5rem; 
    border-radius: 4px; 
  }
  </style>