<template>
    <section id="places" class="pt-12 	md:pt-24"> 
		<div class="max-w-7xl mx-auto px-6">
			<div class="bg-gray-900 md:p-12 rounded-4xl">
				<h2 class="text-2xl md:text-3xl font-bold text-white p-4 md:mb-8 text-center">En las mejores zonas del valle</h2>

				<div class="relative">
					<div id="imageSlider" class="aspect-video bg-cover transition-all duration-1000 ease-in-out rounded-3xl">
	
					</div>

					<div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent rounded-3xl z-10"></div>

					<span id="imageSliderText" class="absolute left-5 bottom-5 text-white z-20 text-xl md:text-3xl font-semibold"></span>

				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>

#imageSliderText{
	animation: fadeIn 1.5s ease-in-out infinite alternate;
}

@keyframes fadeIn {
	0% {
		opacity: 0;
		
	}

	15% {
		opacity: 0;
		
	}

	55% {
		opacity: 1;
	}


	100% {
	opacity: 1;
	}
}

</style>


<script setup lang="ts">
import { onMounted } from 'vue';



const places = [
    {
        name: "Cristo Mirador",
        image: "/images/cristo-mirador.webp",
    },
    {
        name: "Hospital Carrión",
        image: "/images/hospital-carrion.webp",
    },
    {
        name: "Plaza Constitución",
        image: "/images/plaza-constitucion.webp",
    },
    {
        name: "Puente Comuneros",
        image: "/images/puente-comuneros.webp",
    },
];

onMounted(() => {
    startSlider();
});

const startSlider = () => {
    
    	const imageSlider = document.getElementById("imageSlider") as HTMLDivElement;
    	const imageSliderText = document.getElementById("imageSliderText") as HTMLSpanElement;
    	const loaded = new Set();
    	let currentIndex = 1;
    	imageSlider.style.backgroundImage = `url(${places[0].image})`;
    	imageSliderText.textContent = places[0].name;
    	loaded.add(places[0].image);
    
    	function preloadImage(src:string) {
    		if (loaded.has(src)) return;
    
    		const img = new Image();
    		img.src = src;
    		loaded.add(src);
    	}
    
    
    	setInterval(() => {
    
    		const nextIndex = (currentIndex + 1) % places.length;
    
    		// precargar la siguiente imagen (mientras se ve la actual)
    		preloadImage(places[nextIndex].image);
    
    		imageSlider.style.backgroundImage = `url(${places[currentIndex].image})`;
    		imageSliderText.textContent = places[currentIndex].name;
    		currentIndex = currentIndex + 1;
    		if (currentIndex === places.length) {
    			currentIndex = 0;
    		}
    	}, 3000);
}
		



</script>