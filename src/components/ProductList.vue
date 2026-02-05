<template>
    <div class="max-w-7xl mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Nuestros Proyectos</h2>
        
        <!-- Skeleton Loader -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
                v-for="n in 6" 
                :key="`skeleton-${n}`" 
                class="skeleton-card"
            >
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-footer">
                        <div class="skeleton-badge"></div>
                        <div class="skeleton-badge"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Actual Content -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard 
                v-for="project in projects" 
                :key="project.id" 
                :project="project" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ProductCard from './ProductCard.vue';
import type { IProject } from '../interfaces/project.interface';
import { ProjectService } from '../services/project.service';

const projects = ref<IProject[]>([]);
const loading = ref(true);

onMounted(async () => {
    loadProjects();
})

async function loadProjects(){
    loading.value = true;
    const {data} = await new ProjectService().loadAllForClients({
        limit: 10,
        cursor: undefined,
        sort_by: 'created_at',
        sort_direction: 'desc',
        category_id: null,
        district_id: null,
        with_services: false,
        on_sale: false,
    });
    projects.value = data;
    loading.value = false;
}

</script>

<style scoped>
/* Skeleton Card Container */
.skeleton-card {
    background: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* Skeleton Image */
.skeleton-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #e0e0e0 20%,
        #f0f0f0 40%,
        #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

/* Skeleton Content */
.skeleton-content {
    padding: 1.5rem;
}

/* Skeleton Title */
.skeleton-title {
    height: 1.5rem;
    background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #e0e0e0 20%,
        #f0f0f0 40%,
        #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
    width: 70%;
}

/* Skeleton Text Lines */
.skeleton-text {
    height: 1rem;
    background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #e0e0e0 20%,
        #f0f0f0 40%,
        #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.375rem;
    margin-bottom: 0.75rem;
}

.skeleton-text.short {
    width: 50%;
}

/* Skeleton Footer */
.skeleton-footer {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
}

.skeleton-badge {
    height: 1.75rem;
    width: 5rem;
    background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #e0e0e0 20%,
        #f0f0f0 40%,
        #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 9999px;
}

/* Shimmer Animation */
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .skeleton-image {
        height: 180px;
    }
    
    .skeleton-content {
        padding: 1rem;
    }
}

@media (max-width: 480px) {
    .skeleton-image {
        height: 160px;
    }
}
</style>