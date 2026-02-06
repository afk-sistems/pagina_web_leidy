<template>
    <h1>Agregar Proyecto</h1>

    <form action="" @submit.prevent="submitForm">
        <div class="row gy-3" style="max-width: 900px;">
            <div class="col-md-6">
                <label for="exampleFormControlInput1" class="form-label">Nombre <span class="text-danger">*</span></label>
                <input class="form-control" :class="{ 'is-invalid': $v.name.$error && $v.name.$dirty }" type="text" v-model="projectForm.name" @blur="$v.name.$touch">
                <div class="invalid-feedback" v-if="$v.name.$error && $v.name.$dirty">
                    <span>El nombre es requerido</span>
                </div>
            </div>
            <div class="col-md-6">
                <label for="exampleFormControlInput1" class="form-label">Slug</label>
                <input class="form-control" type="text" disabled :value="projectForm.name.trim().toLowerCase().replace(/\s+/g, '-')">
            </div>

            <div class="col-md-12">
                <label for="exampleFormControlInput1" class="form-label">Descripción</label>
                <textarea class="form-control" :class="{ 'is-invalid': $v.description.$error && $v.description.$dirty }" v-model="projectForm.description" @blur="$v.description.$touch"></textarea>
                <div class="invalid-feedback" v-if="$v.description.$error && $v.description.$dirty">
                    <span>La descripción es requerida</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="exampleFormControlInput1" class="form-label">Categoría</label>
                
                <select class="form-select col-md-6" v-model="projectForm.category_id" @blur="$v.category_id.$touch" :class="{ 'is-invalid': $v.category_id.$error && $v.category_id.$dirty }">
                    <option value="0">Seleccione</option>
                    <option v-for="category in categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
                <div class="invalid-feedback" v-if="$v.category_id.$error && $v.category_id.$dirty">
                    <span>La categoría es requerida</span>
                </div>
            </div>


            <div class="col-md-6">
                <label for="exampleFormControlInput1" class="form-label">Distrito</label>
                
                <select class="form-select" v-model="projectForm.district_id" @blur="$v.district_id.$touch" :class="{ 'is-invalid': $v.district_id.$error && $v.district_id.$dirty }">
                    <option value="0">Seleccione</option>
                    <option v-for="district in districtList" :key="district.id" :value="district.id">{{ district.name }}</option>
                </select>
                <div class="invalid-feedback" v-if="$v.district_id.$error && $v.district_id.$dirty">
                    <span>El distrito es requerido</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="" class="form-label">Área Mínima</label>
                <div class="input-group has-validation">
                    <input min="0" step="0.01" placeholder="0.00" type="number" class="form-control" v-model="projectForm.min_area" @blur="$v.min_area.$touch" :class="{ 'is-invalid': $v.min_area.$error && $v.min_area.$dirty }">
                    <span class="input-group-text" id="basic-addon2">m<sup>2</sup></span>
                    <div class="invalid-feedback" v-if="$v.min_area.$error && $v.min_area.$dirty">
                        <span>El área mínima es requerida</span>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <label for="" class="form-label">Cantidad de Lotes</label>
                <input min="0" step="1" placeholder="0" type="number" class="form-control" v-model="projectForm.lot_count" @blur="$v.lot_count.$touch" :class="{ 'is-invalid': $v.lot_count.$error && $v.lot_count.$dirty }">
                <div class="invalid-feedback" v-if="$v.lot_count.$error && $v.lot_count.$dirty">
                    <span>La cantidad de lotes es requerida</span>
                </div>
            </div>

            <div class="col-md-6">
                <label for="" class="form-label">Precio Mínimo</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">

                        <select class="form-select" v-model="projectForm.currency_symbol" @blur="$v.currency_symbol.$touch" :class="{ 'is-invalid': $v.currency_symbol.$error && $v.currency_symbol.$dirty }">
                            <option value="PEN">S/. </option>
                            <option value="USD">$</option>
                        </select>
                    </div>
                    <input min="0" step="0.01" placeholder="0.00" type="number" class="form-control" v-model="projectForm.min_price" @blur="$v.min_price.$touch" :class="{ 'is-invalid': $v.min_price.$error && $v.min_price.$dirty }">
                    <div class="invalid-feedback" v-if="$v.min_price.$error && $v.min_price.$dirty">
                        <span>El precio mínimo es requerido</span>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <label class="form-label" for="">Precio en Oferta</label>
                
                <div class="input-group mb-3 has-validation">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" v-model="projectForm.on_sale" aria-label="Checkbox for following text input">
                    </div>
                    <input type="number" min="0" step="0.01" :placeholder="projectForm.on_sale ? '0.00' : 'Vacío'" class="form-control" v-model="projectForm.offer_price" :disabled="!projectForm.on_sale" @blur="$v.offer_price.$touch" :class="{ 'is-invalid': $v.offer_price.$error && $v.offer_price.$dirty }">
                    <div class="invalid-feedback" v-if="$v.offer_price.$error && $v.offer_price.$dirty">
                        <span>El precio de oferta es requerido</span>
                    </div>
                </div>
                
            </div>

            <div class="col-12 d-flex gap-3">
                <label for="" class="form-label">Servicios básicos: </label>
                <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="checkDefault" v-model="projectForm.has_water">
                <label class="form-check-label" for="checkDefault">
                    Agua
                </label>
                </div>
                <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" v-model="projectForm.has_electricity">
                <label class="form-check-label" for="checkChecked">
                    Luz
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="checkChecked" v-model="projectForm.has_sewer">
                <label class="form-check-label" for="checkChecked">
                    Desague
                </label>
                </div>
            </div>

            <div class="col-12">
                <label for="" class="form-label">Mapa</label>
                <div id="map" >

                </div>
            </div>

            <div class="col-12">
                <label for="" class="form-label">Brochure / Plano PDF</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">
                        <i class="bi bi-file-earmark-pdf"></i>
                    </div>
                    <input class="form-control" type="url" name="" id="" placeholder="http://..." v-model="projectForm.brochure_link" @blur="$v.brochure_link.$touch" :class="{ 'is-invalid': $v.brochure_link.$error && $v.brochure_link.$dirty }">
                    <div class="invalid-feedback" v-if="$v.brochure_link.$error && $v.brochure_link.$dirty">
                        <span>El enlace del brochure debe ser una URL válida</span>
                    </div>
                </div>
            </div>

            <div class="col-12">
                <label for="" class="form-label">Video de Youtube</label>
                <div class="input-group has-validation">
                    <div class="input-group-text">
                        <i class="bi bi-youtube"></i>
                    </div>
                    <input class="form-control" type="url" name="" id="" v-model="projectForm.video_link" @blur="$v.video_link.$touch" :class="{ 'is-invalid': $v.video_link.$error && $v.video_link.$dirty }">
                    <div class="invalid-feedback" v-if="$v.video_link.$error && $v.video_link.$dirty">
                        <span>El enlace del video debe ser una URL válida de YouTube</span>
                    </div>
                </div>
                
            </div>

            <div class="col-12">
                <label for="" class="form-label">Visibilidad en sitio web</label>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" v-model="projectForm.visible_on_site">
                    <label class="form-check-label" for="switchCheckDefault">Visible</label>
                </div>
            </div>

            <hr>

            <div class="col-12 d-flex justify-content-between">
                <label for="" class="form-label fw-bold">Imágenes del Proyecto</label>
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
                            <th class="text-center">Texto</th>
                            <th class="text-center" style="width: 70px;">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(image, index) in projectForm.images" :key="index">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td><img width="70px" height="70px" class="img-preview rounded mx-auto d-block" :src="image.temporalUrl" alt=""></td>
                            <td class="text-center">
                                {{ image.file!.name }}
                            </td>
                            <td class="text-center">
                                <input type="text" class="form-control" name="" id="" v-model="image.alt" placeholder="Describe la imagen">
                            </td>
                            <td class="text-center">
                                <button @click="removeRow(index)" class="btn btn-danger">
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
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Agregar Proyecto</button>
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
</style>

<script setup lang="ts">
import PreviewFileDialog from '../sub-components/preview-file-dialog.vue';
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, minValue, required, requiredIf, url } from '@vuelidate/validators';
import L, { type LatLngExpression } from 'leaflet';
import { onMounted, reactive, ref, watch, onUnmounted, toRaw } from 'vue';
import { DistrictService } from '../../services/districts.service';
import { CategoryService } from '../../services/category.service';
import type { ICategory } from '../../interfaces/category.interface';
import type { IAddProject, IProject } from '../../interfaces/project.interface';
import type { IImage } from '../../interfaces/image.interface';
import Swal from 'sweetalert2';
import { ProjectService } from '../../services/project.service';
import type { IDistrict } from '../../interfaces/district.interface';
import { youtubeUrl } from '../../validators/youtube-url';

onMounted(() => {
    configureMap();
    loadDistricts();
    loadCategories();
});

onUnmounted(() => {
  // Es buena práctica revocar las URLs cuando el componente se destruye
  projectForm.images.forEach(item => URL.revokeObjectURL(item.temporalUrl!));
});

const isDialogOpen = ref(false);

const districtList = ref<IDistrict[]>([]);
const categoryList = ref<ICategory[]>([]);


const configureMap = () => {
    const mapUbi:LatLngExpression = [-12.080907, -75.242017];

    
    const map = L.map('map').setView(mapUbi, 13);
    L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);
    
    const marker = L.marker(mapUbi).addTo(map);
    
    map.on('click', ($event) => {
      marker.setLatLng($event.latlng);
      projectForm.latitude = $event.latlng.lat;
      projectForm.longitude = $event.latlng.lng;
      
    });
    
}

const loadDistricts = async () => {
    try{

        const districts = await new DistrictService().listAll();   
        districtList.value = districts;
        
    }catch(error){
        console.log(error);
    }
}

const loadCategories = async () => {
    try{
        const categories = await new CategoryService().listAll();
        categoryList.value = categories;
        
    }catch(error){
        console.log(error);
    }
}

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

const handleNewFile = (file:File) => {
    projectForm.images.push({
        file,
        temporalUrl: URL.createObjectURL(file),
        alt: "",
        url: ""
    });
}

const $v = useVuelidate(formRules,projectForm);


const removeRow = (index:number) => {
    URL.revokeObjectURL(projectForm.images[index].temporalUrl!);
    projectForm.images.splice(index,1);
}


watch(() => projectForm.on_sale, () => {
    if (!projectForm.on_sale) {
        projectForm.offer_price = null;
    }
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
        title: 'Cargando...',
        text: 'Esto puede tomar unos momentos',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
        }
    })

    try{
        
        const formValue = Object.assign({}, projectForm);
        
        for(const image of formValue.images){
            const clave = await uploadImage(image.file!);
            delete image.file;
            delete image.temporalUrl;
            image.url = `https://static.leidyinmobiliaria.com/${clave}`;
            
            
        }

        formValue.slug = formValue.name.trim().toLowerCase().replace(/\s+/g, '-');
        formValue.video_link = formValue.video_link ? getVideoId(formValue.video_link!) : null;

        const response = await new ProjectService().addNew(formValue);

        Swal.close();

        const swalResponse = await Swal.fire({
            title: 'Proyecto agregado',
            text: 'El proyecto se agrego correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showConfirmButton: true,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,   
        });

        if(swalResponse.isConfirmed){
            window.location.href = '/admin/proyectos';
        }
        
    }catch(error){
        Swal.hideLoading();
        Swal.close();
        
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al agregar el proyecto, '+error,
            icon: 'error',
            confirmButtonText: 'Aceptar',
             
        });
        
    }
}

const getVideoId = (url:string) => {
    const query = url.split("?")[1];
    const params = new URLSearchParams(query);
    return params.get("v");
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

</script>

<style scoped>



#map{
    width: 100%;
    height: 400px;
}
</style>