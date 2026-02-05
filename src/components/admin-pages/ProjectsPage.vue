<template>

<h2 class="mb-3">Lista de Proyectos</h2>

<div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex gap-3">
        
        <input placeholder="Buscar nombre" type="text" class="form-control" id="" v-model="filtersAndPage.title" >
        <button type="button" class="btn btn-primary d-flex gap-2 justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 20px; height: 20px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Buscar
        </button>
    </div>

    <a href="/admin/proyectos/agregar" class="btn btn-success d-flex gap-2 justify-content-center align-items-center">
      <i class="bi bi-plus-circle"></i>
      Nuevo
    </a>
</div>

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Categoría</th>
      <th scope="col">Distrito</th>
      <th scope="col">Visitas</th>
      <th scope="col" class="text-center" style="width: 100px;">Visible</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr v-if="projects.length === 0">
        <td class="text-center" colspan="7">No se han encontrado datos</td>
    </tr>

    <tr v-for="project in projects" :key="project.id">
        <td class="align-middle">{{ project.id }}</td>
        <td class="align-middle">{{ project.name }}</td>
        <td class="align-middle">{{ project.category_name }}</td>
        <td class="align-middle">{{ project.district_name }}</td>
        <td class="align-middle">{{ project.views }}</td>
        <td class="text-center align-middle">
            <span class="badge rounded-pill" :class="{ 'bg-success': project.visible_on_site, 'bg-warning': !project.visible_on_site }">{{  project.visible_on_site ? 'Sí' : 'No' }}</span>
        </td>
        <td>

          <div class="d-flex align-items-center gap-2">
            <a :href="'/admin/proyectos/editar/' + project.id" class="btn btn-warning btn-sm">
              <i class="bi bi-pencil"></i>
            </a>
            <a :href="'/proyectos/' + project.slug" class="btn btn-info btn-sm  text-white">
              <i class="bi bi-link"></i>
            </a>

          </div>
        </td>
    </tr>
  </tbody>
</table>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import app from '../../lib/firebase';
import { ProjectService } from '../../services/project.service';
import Swal from 'sweetalert2';
import type { IProjectList } from '../../interfaces/project.interface';

const projects = ref<IProjectList[]>([]);

const filtersAndPage = ref({
    page: 1,
    limit: 10,
    title: '',
    category_id: '',
    location_id: '',
    visible: '',

});

onMounted(() => {
    getProjects();
});

const getProjects = async () => {
  
  Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
          Swal.showLoading();
      }
  });
    try {
        const projectService = new ProjectService();
        projects.value = await projectService.loadAllOnAdmin(filtersAndPage.value);
        Swal.close();
        
    } catch (error) {
      console.error(error);
      
        Swal.close();
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al cargar los proyectos',
        });
        
    }
};

</script>