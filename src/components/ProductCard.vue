<script setup lang="ts">
import { computed } from 'vue';
import type { IProject } from '../interfaces/project.interface';

const props = defineProps<{
    project: IProject;
}>();

const formattedPrice = computed(() => {
    const price = props.project.on_sale && props.project.offer_price 
        ? props.project.offer_price 
        : props.project.min_price;
    
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: props.project.currency_symbol,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
});

const formatArea = (area: number) => {
    return `${area} m²`;
};
</script>

<template>
    <article class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
        <!-- Image Container -->
        <div class="relative aspect-4/3 overflow-hidden">
            <img 
                :src="project.images[0]?.url" 
                :alt="project.images[0]?.alt"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <!-- Overlay gradient -->
            <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Badge if on sale -->
            <div v-if="project.on_sale" class="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ¡OFERTA!
            </div>
            
            <!-- Category Badge -->
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                {{ project.category_name }}
            </div>
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-1">
            <!-- Location -->
            <div class="flex items-center gap-1.5 text-brand-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">{{ project.district_name }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-brand-600 transition-colors">
                {{ project.name }}
            </h3>

            <div class="mt-auto space-y-4">
                <!-- Features Row: Area | Lots -->
                <div class="flex items-center justify-evenly py-4 border-t border-gray-100">
                    <div class="flex flex-col items-center gap-1">
                        <div class="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                            <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Áreas desde</p>
                        </div>
                        <p class="text-base font-bold text-gray-900">{{ formatArea(project.min_area) }}</p>
                    </div>
                    <div class="w-px h-10 bg-gray-100"></div>
                    <div class="flex flex-col items-center gap-1">
                        <div class="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                            </svg>
                            <p class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Lotes</p>
                        </div>
                        <p class="text-base font-bold text-gray-900">{{ project.lot_count }}</p>
                    </div>
                </div>

                <!-- Price Row -->
                <div class="flex items-end justify-between">
                    <div>
                        <p class="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Precio desde</p>
                        <div class="flex items-baseline gap-2">
                            <p class="text-2xl font-bold text-brand-600">{{ formattedPrice }}</p>
                            <p v-if="project.on_sale && project.offer_price" class="text-sm text-gray-400 line-through decoration-red-400">
                                {{ new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 0 }).format(project.min_price) }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <a 
                    :href="`/proyectos/${project.slug}`" 
                    class="block w-full py-3.5 bg-gray-900 text-white text-center text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors duration-300 shadow-lg shadow-gray-900/10 hover:shadow-brand-600/20"
                >
                    Ver Detalles
                </a>
            </div>
        </div>
    </article>
</template>
