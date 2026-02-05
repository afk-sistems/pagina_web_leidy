<template>
    <div class="d-flex flex-column shrink-0 p-3 text-bg-dark h-100" style="width: 280px; min-height: 100vh;">
      <a href="/admin/dashboard" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">Panel Admin</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <a href="/admin/dashboard" class="nav-link text-white" :class="{ active: isActive('/admin/dashboard') }">
            <i class="bi bi-speedometer2 me-2"></i>
            Dashboard
          </a>
        </li>
        <li>
          <a href="/admin/proyectos" class="nav-link text-white" :class="{ active: isActive('/admin/proyectos') }">
            <i class="bi bi-grid me-2"></i>
            Proyectos
          </a>
        </li>
        <li>
          <a href="/admin/oficinas" class="nav-link text-white" :class="{ active: isActive('/admin/oficinas') }">
            <i class="bi bi-people me-2"></i>
            Asesores
          </a>
        </li>
      </ul>
      <hr>
      <div class="dropdown">
        <button @click="handleLogout()" class="btn btn-danger w-100 d-flex align-items-center justify-content-center">
            <span class="me-2">Cerrar Sesión</span>
            <!-- Simple Logout Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getAuth, signOut } from 'firebase/auth';
  import app from '../lib/firebase';
  import Swal from 'sweetalert2';

  const props = defineProps({
    visibleSidebar: {
      type: Boolean,
      default: true
    }
  })
  
  const currentPath = ref('');
  
  onMounted(() => {
    currentPath.value = window.location.pathname;
  });
  
  const isActive = (path: string) => {
    return currentPath.value === path || (path !== '/admin/dashboard' && currentPath.value.startsWith(path));
  };
  
  const handleLogout = async () => {
    try {
        console.log('handleLogout');
        const result = await Swal.fire({
            title: '¿Cerrar sesión?',
            text: "¿Estás seguro de que deseas salir?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const auth = getAuth(app);
            await signOut(auth);
            window.location.href = '/admin/login';
        }
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cerrar la sesión'
        });
    }
  }
  </script>
  
  <style scoped>
  .nav-link.active {
      background-color: #0d6efd;
  }
  
  .nav-link {
    color: white;
  }
  
  .nav-link:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  </style>
