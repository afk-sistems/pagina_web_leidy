<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100dvh;">

        <div class="card p-3"  >

            <h1 class="text-center ">Inicio de Sesión</h1>
            
                <form @submit.prevent="handleLoginFormSubmit">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Correo</label>
                        <input v-model="formData.email" name="email" type="email" class="form-control form-control-lg" id="username-login" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                        <input v-model="formData.password" type="password" class="form-control form-control-lg" id="exampleInputPassword1">
                    </div>

                    <div v-if="errors.length" class="alert alert-danger">
                        <ul class="mb-0">
                            <li v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
                    
                    <button type="submit" class="btn btn-primary w-100 btn-lg">Iniciar sesión</button>
                </form>

        </div>


    </div>
</template>

<script setup lang="ts">
import {reactive, ref } from 'vue';
import Swal from 'sweetalert2'

const formData = reactive({
    email: '',
    password: ''
})

const errors = ref<string[]>([]);
const isLoading = ref(false);

const handleLoginFormSubmit = async () => {

    validateErrors();

    if (errors.value.length > 0) {
        return;
    }
    
    Swal.fire({
        title: 'Iniciando sesión',
        text: 'Por favor, espera...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    isLoading.value = true;
    try {
        
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!res.ok) {
            throw new Error('Credenciales inválidas');
        }
        window.location.href = '/admin/proyectos';
        Swal.close();
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: (error as Error).message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }finally{
        isLoading.value = false;
    }

    
}

const validateErrors = () => {
    errors.value = [];
    if (!formData.email) {
        errors.value.push('El correo es requerido');
    }else{
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!re.test(formData.email)) {
            errors.value.push('El correo no es válido');
        }
    }

    
    if (!formData.password) {
        errors.value.push('La contraseña es requerida');
    }
}


</script>
