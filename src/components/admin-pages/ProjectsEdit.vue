<template>
    <h1>Editar Proyecto</h1>

    <div v-if="isLoading" class="d-flex justify-content-center align-items-center" style="height: 400px;">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
    </div>

    <form action="" @submit.prevent="submitForm">
        <div class="row gy-3" style="max-width: 900px;">
            <div class="col-md-6">
                <label for="name" class="form-label">Nombre <span class="text-danger">*</span></label>
                <input id="name" class="form-control" :class="{ 'is-invalid': $v.name.$error && $v.name.$dirty }" type="text" v-model="projectForm.name" @blur="$v.name.$touch">
                <div class="invalid-feedback" v-if="$v.name.$error && $v.name.$dirty">
                    <span>El nombre es requerido</span>
                </div>
            </div>
            <div class="col-md-6">
                <label for="slug" class="form-label">Slug</label>
                <input id="slug" class="form-control" type="text" disabled :value="projectForm.slug">
            </div>

            <div class="col-md-12">
                <label for="description" class="form-label">Descripción</label>
                <textarea id="description" class="form-control" :class="{ 'is-invalid': $v.description.$error && $v.description.$dirty }" v-model="projectForm.description" @blur="$v.description.$touch"></textarea>
                <div class="invalid-feedback" v-if="$v.description.$error && $v.description.$dirty">
                    <span>La descripción es requerida</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="category" class="form-label">Categoría</label>
                
                <select id="category" class="form-select col-md-6" v-model="projectForm.category_id" @blur="$v.category_id.$touch" :class="{ 'is-invalid': $v.category_id.$error && $v.category_id.$dirty }">
                    <option value="0">Seleccione</option>
                    <option v-for="category in categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <div class="invalid-feedback" v-if="$v.category_id.$error && $v.category_id.$dirty">
                    <span>La categoría es requerida</span>
                </div>
            </div>


            <div class="col-md-6">
                <label for="district" class="form-label">Distrito</label>
                
                <select id="district" class="form-select" v-model="projectForm.district_id" @blur="$v.district_id.$touch" :class="{ 'is-invalid': $v.district_id.$error && $v.district_id.$dirty }">
                    <option value="0">Seleccione</option>
                    <option v-for="district in districtList" :key="district.id" :value="district.id">{{ district.name }}</option>
                </select>
                <div class="invalid-feedback" v-if="$v.district_id.$error && $v.district_id.$dirty">
                    <span>El distrito es requerido</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="min_area" class="form-label">Área Mínima</label>
                <div class="input-group has-validation">
                    <input id="min_area" min="0" step="0.01" placeholder="0.00" type="number" class="form-control" v-model="projectForm.min_area" @blur="$v.min_area.$touch" :class="{ 'is-invalid': $v.min_area.$error && $v.min_area.$dirty }">
                    <span class="input-group-text">m<sup>2</sup></span>
                    <div class="invalid-feedback" v-if="$v.min_area.$error && $v.min_area.$dirty">
                        <span>El área mínima es requerida</span>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <label for="lot_count" class="form-label">Cantidad de Lotes</label>
                <input id="lot_count" min="0" step="1" placeholder="0" type="number" class="form-control" v-model="projectForm.lot_count" @blur="$v.lot_count.$touch" :class="{ 'is-invalid': $v.lot_count.$error && $v.lot_count.$dirty }">
                <div class="invalid-feedback" v-if="$v.lot_count.$error && $v.lot_count.$dirty">
                    <span>La cantidad de lotes es requerida</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="min_price" class="form-label">Precio Mínimo</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">

                        <select class="form-select" v-model="projectForm.currency_symbol" @blur="$v.currency_symbol.$touch" :class="{ 'is-invalid': $v.currency_symbol.$error && $v.currency_symbol.$dirty }">
                            <option value="PEN">S/. </option>
                            <option value="USD">$</option>
                        </select>
                    </div>
                    <input id="min_price" min="0" step="0.01" placeholder="0.00" type="number" class="form-control" v-model="projectForm.min_price" @blur="$v.min_price.$touch" :class="{ 'is-invalid': $v.min_price.$error && $v.min_price.$dirty }">
                    <div class="invalid-feedback" v-if="$v.min_price.$error && $v.min_price.$dirty">
                        <span>El precio mínimo es requerido</span>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="offer_price">Precio en Oferta</label>
                
                <div class="input-group mb-3 has-validation">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" v-model="projectForm.on_sale" aria-label="Checkbox for offer price">
                    </div>
                    <input id="offer_price" type="number" min="0" step="0.01" :placeholder="projectForm.on_sale ? '0.00' : 'Vacío'" class="form-control" v-model="projectForm.offer_price" :disabled="!projectForm.on_sale" @blur="$v.offer_price.$touch" :class="{ 'is-invalid': $v.offer_price.$error && $v.offer_price.$dirty }">
                    <div class="invalid-feedback" v-if="$v.offer_price.$error && $v.offer_price.$dirty">
                        <span>El precio de oferta es requerido</span>
                    </div>
                </div>
                
            </div>

            <div class="col-12 d-flex gap-3">
                <label class="form-label">Servicios básicos: </label>
                <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="checkWater" v-model="projectForm.has_water">
                <label class="form-check-label" for="checkWater">
                    Agua
                </label>
                </div>
                <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="checkElectricity" v-model="projectForm.has_electricity">
                <label class="form-check-label" for="checkElectricity">
                    Luz
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkSewer" v-model="projectForm.has_sewer">
                <label class="form-check-label" for="checkSewer">
                    Desague
                </label>
                </div>
            </div>

            <div class="col-12">
                <label for="" class="form-label">Mapa</label>
                <div id="map" ref="mapContainer">

                </div>
            </div>

            <div class="col-12">
                <label for="brochure" class="form-label">Brochure / Plano PDF</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">
                        <i class="bi bi-file-earmark-pdf"></i>
                    </div>
                    <input id="brochure" class="form-control" type="url" name="" placeholder="http://..." v-model="projectForm.brochure_link" @blur="$v.brochure_link.$touch" :class="{ 'is-invalid': $v.brochure_link.$error && $v.brochure_link.$dirty }">
                    <div class="invalid-feedback" v-if="$v.brochure_link.$error && $v.brochure_link.$dirty">
                        <span>El enlace del brochure debe ser una URL válida</span>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <label for="video" class="form-label">Video de Youtube</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">
                        <i class="bi bi-youtube"></i>
                    </div>
                    <input id="video" class="form-control" type="url" name="" v-model="projectForm.video_link" @blur="$v.video_link.$touch" :class="{ 'is-invalid': $v.video_link.$error && $v.video_link.$dirty }">
                    <div class="invalid-feedback" v-if="$v.video_link.$error && $v.video_link.$dirty">
                        <span>El enlace del video debe ser una URL válida de YouTube</span>
                    </div>
                </div>
                
            </div>

            <div class="col-12">
                <label for="visible" class="form-label">Visibilidad en sitio web</label>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="visible" v-model="projectForm.visible_on_site">
                    <label class="form-check-label" for="visible">Visible</label>
                </div>
            </div>

            <hr>

            <div class="col-12 d-flex justify-content-between">
                <label class="form-label fw-bold">Imágenes del Proyecto</label>
                <button @click="isDialogOpen = true" type="button" class="btn btn-success">
                    <i class="bi bi-image"></i>
                    Agregar Foto</button>
            </div>

            <div class="col-12">
                <table class="table table-striped table-bordered align-middle">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 30px;">#</th>
                            <th class="text-center" style="width: 80px;">Imagen</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center" style="width: 70px;">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(image, index) in projectForm.images" :key="index" :class="{ 'table-success': image.url === '' }">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td><img width="100px" height="100px" class="img-preview rounded mx-auto d-block" :src="image.temporalUrl || image.url" alt=""></td>
                            
                            <td class="text-center">
                                <input type="text" class="form-control" name="" id="" v-model="image.alt" placeholder="Describe la imagen">
                            </td>
                            <td class="text-center">
                                <button type="button" @click="removeRow(index)" class="btn btn-danger">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="projectForm.images.length === 0">
                            <td colspan="5" class="text-center">
                                Agrega imágenes a la propiedad
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p class="alert alert-danger" v-if="projectForm.images.length === 0">
                    Debe agregar al menos una imagen al proyecto
                </p>

                <p class="alert alert-warning" v-if="imagesToDelete.length > 0">
                    Se {{ imagesToDelete.length === 1 ? 'va a eliminar' : 'van a eliminar' }} {{ imagesToDelete.length }} imagen{{ imagesToDelete.length === 1 ? '' : 'es' }} del servidor
                </p>
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </div>
            
        </div>
    </form>

    <PreviewFileDialog :isOpen="isDialogOpen" @close="isDialogOpen = false" @upload="handleNewFile" />
</template>

<style scoped>
.img-preview{
    border-radius: 5px;
    object-fit: cover;
}

#map{
    width: 100%;
    height: 400px;
}
</style>

<script setup lang="ts">
import PreviewFileDialog from '../sub-components/preview-file-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, minValue, required, requiredIf, url } from '@vuelidate/validators';
import L, { type LatLngExpression } from 'leaflet';
import { onMounted, reactive, ref, watch, onUnmounted, toRaw, useTemplateRef } from 'vue';
import { DistrictService } from '../../services/districts.service';
import { CategoryService } from '../../services/category.service';
import type { ICategory } from '../../interfaces/category.interface';
import type { IAddProject, IProject } from '../../interfaces/project.interface';
import Swal from 'sweetalert2';
import { ProjectService } from '../../services/project.service';
import type { IDistrict } from '../../interfaces/district.interface';
import { youtubeUrl } from '../../validators/youtube-url';

const props = defineProps({
    id: {
        type: [Number, String],
        required: true
    }
});

const imagesToDelete:any[] = [];
let oldValue:IAddProject | null = null;

const isLoading = ref(true);
const isDialogOpen = ref(false);
const districtList = ref<IDistrict[]>([]);
const categoryList = ref<ICategory[]>([]);
const mapContainer = useTemplateRef("mapContainer");
const projectForm = reactive<IAddProject>({
    description: "",
    slug:"",
    name: "",
    category_id: 0,
    min_area: 0,
    lot_count:0,
    currency_symbol: "PEN",
    min_price: 0.00,
    on_sale: false,
    offer_price: null,
    has_water: false,
    has_electricity: false,
    has_sewer: false,
    district_id: 0,
    latitude: -12.080907,
    longitude: -75.242017,
    brochure_link: null,
    video_link: null,
    visible_on_site: true,
    views: 0,
    images: [] 
});

const formRules = {
    description: {required},
    name: {required},
    category_id: {required, minValue: minValue(1)},
    min_area: {required},
    lot_count: {required},
    currency_symbol: {required},
    min_price: {required},
    on_sale: {required},
    offer_price: {
        required: requiredIf(() => projectForm.on_sale)
    },
    has_water: {required},
    has_electricity: {required},
    has_sewer: {required},
    district_id: {required, minValue: minValue(1)},
    latitude: {required},
    longitude: {required},
    brochure_link: {url},
    video_link: { youtubeUrl},
    images: {
        required,
        minLength: minLength(1),
        $each: helpers.forEach({
            alt: {required}
        })
    }
}

const $v = useVuelidate(formRules,projectForm);

onMounted(async () => {
    try {
        await Promise.all([loadDistricts(), loadCategories(), loadProjectData()]);
        configureMap();
    } catch (error) {
        
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron cargar los datos del proyecto o las listas necesarias.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didClose: () => {
                window.location.href = '/admin/proyectos';
            }
        });
        
        
    } finally {
        isLoading.value = false;
    }
});

onUnmounted(() => {
  projectForm.images.forEach(item => {
      if (item.temporalUrl) URL.revokeObjectURL(item.temporalUrl);
  });
  
});

const configureMap = () => {
    //const mapUbi:LatLngExpression = [projectForm.latitude, projectForm.longitude];
    const mapUbi:LatLngExpression = [-12.080907, -75.242017];

    const map = L.map(mapContainer.value!).setView(mapUbi, 13);
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);
    
    const marker = L.marker(mapUbi).addTo(map);
    
    map.on('click', ($event) => {
      if(marker) marker.setLatLng($event.latlng);
      projectForm.latitude = $event.latlng.lat;
      projectForm.longitude = $event.latlng.lng;
    });
}

const loadDistricts = async () => {
    const districts = await new DistrictService().listAll();   
    districtList.value = districts;
}

const loadCategories = async () => {
    const categories = await new CategoryService().listAll();
    categoryList.value = categories;
}

const loadProjectData = async () => {
    const project = await new ProjectService().getPropertyById(parseInt(props.id as string));
    
    projectForm.name = project.name;
    projectForm.slug = project.slug;
    projectForm.description = project.description;
    projectForm.category_id = project.category_id;
    projectForm.district_id = project.district_id;
    projectForm.min_area = project.min_area;
    projectForm.lot_count = project.lot_count;
    projectForm.currency_symbol = project.currency_symbol;
    projectForm.min_price = project.min_price;
    projectForm.on_sale = project.on_sale;
    projectForm.offer_price = project.offer_price;
    projectForm.has_water = project.has_water;
    projectForm.has_electricity = project.has_electricity;
    projectForm.has_sewer = project.has_sewer;
    projectForm.latitude = project.latitude;
    projectForm.longitude = project.longitude;
    projectForm.brochure_link = project.brochure_link;
    projectForm.video_link = project.video_link;
    projectForm.visible_on_site = project.visible_on_site;
    projectForm.views = project.views;

    oldValue = Object.assign({}, toRaw(projectForm));
    
    // Map existing images
    projectForm.images = project.images.map(img => ({
        temporalUrl: img.url,
        alt: img.alt,
        url: img.url
    }));
}

const handleNewFile = (file:File) => {
    projectForm.images.push({
        file,
        temporalUrl: URL.createObjectURL(file),
        alt: "",
        url: ""
    });
}

const removeRow = async (index:number) => {
    const image = projectForm.images[index];
    
    if(image.url && image.url.startsWith("https://static.leidyinmobiliaria.com/")){

        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminará la imagen del servidor, esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                imagesToDelete.push(image);
                projectForm.images.splice(index, 1);
            }
        })

    }else{
        projectForm.images.splice(index, 1);
    }
}

const deleteImage = async (clave: string) => {
    const response = await fetch("/api/upload-file", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ clave })
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar imagen");
    }
    return await response.json();
}

watch(() => projectForm.on_sale, () => {
    if (!projectForm.on_sale) {
        projectForm.offer_price = null;
    }
});

watch(() => projectForm.name, () => {
    projectForm.slug = projectForm.name.toLowerCase().replace(/ /g, "-");
});

const submitForm = async () => {
    const isFormCorrect = await $v.value.$validate();

    if(!isFormCorrect){
        Swal.fire({
            title: 'Error',
            text: 'Por favor corrige los errores en el formulario',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        return;
    }

    Swal.fire({
        title: 'Actualizando proyecto...',
        text: 'Por favor espera',
        icon: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {

        const formValue:any = toRaw(projectForm);

        for(const image of imagesToDelete){
            await deleteImage(image.clave);
        }

        //Upload new images
        for(const image of formValue.images){

            if(image.file && image.url == ""){
                const clave = await uploadImage(image.file);
                image.url = `https://static.leidyinmobiliaria.com/${clave}`;
                console.log(image.url);
            }
            delete image.file;
            delete image.temporalUrl;
            
        }

        for(const prop in formValue){
            if(formValue[prop] === (oldValue as any)[prop] && prop !== "images"){
                
                delete formValue[prop];
            }
        }
        
        formValue.video_link = formValue.video_link ? getVideoId(formValue.video_link!) : null;

        await new ProjectService().update(parseInt(props.id as string), formValue);

        window.location.href = "/admin/proyectos";
        
    } catch (error) {

        Swal.fire({
            title: 'Error',
            text: 'Error al actualizar el proyecto',
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
        
    }
}

const uploadImage = async (file:File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload-file", {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    return data.clave;   
}

const getVideoId = (url:string) => {
    const query = url.split("?")[1];
    const params = new URLSearchParams(query);
    return params.get("v");
}

</script>
