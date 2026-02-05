<template>
  <!-- Modal Overlay -->
  <div v-if="isOpen" class="modal fade show d-block" tabindex="-1" @click="closeDialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" @click.stop>
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header border-bottom">
          <h5 class="modal-title fw-bold">
            <i class="bi bi-cloud-upload me-2"></i>
            Subir Imagen WebP
          </h5>
          <button type="button" class="btn-close" @click="closeDialog" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Drag and Drop Area -->
          <div 
            class="drop-zone border rounded-3 p-5 text-center position-relative"
            :class="{ 
              'border-success bg-success bg-opacity-10 border-3': isDragging,
              'border-2 border-dashed': !previewUrl,
              'border-success border-2': previewUrl 
            }"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @dragenter="handleDragEnter"
            @click="triggerFileInput"
            style="cursor: pointer; min-height: 300px; transition: all 0.3s ease;"
          >
            <!-- Preview Image -->
            <div v-if="previewUrl" class="preview-container">
              <img :src="previewUrl" :alt="fileName" class="img-fluid rounded shadow-sm mb-3" style="max-height: 300px; object-fit: contain;" />
              <div class="file-info">
                <p class="fw-semibold mb-1 text-dark">{{ fileName }}</p>
                <p class="text-muted small mb-0">{{ formatFileSize(fileSize) }}</p>
              </div>
              <button 
                type="button"
                class="btn btn-danger btn-sm rounded-circle position-absolute shadow"
                @click.stop="removeFile"
                aria-label="Eliminar imagen"
                style="top: -10px; right: -10px; width: 40px; height: 40px;"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>

            <!-- Empty State -->
            <div v-else class="empty-state d-flex flex-column align-items-center justify-content-center" style="min-height: 300px;">
              <i class="bi bi-cloud-arrow-up display-1 text-success mb-3" style="animation: float 3s ease-in-out infinite;"></i>
              <p class="fs-5 fw-semibold text-dark mb-2">Arrastra tu imagen WebP aquí</p>
              <p class="text-muted mb-2">o haz clic para seleccionar</p>
              <span class="badge bg-secondary">Solo archivos .webp</span>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center mt-3 mb-0" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            <div>{{ errorMessage }}</div>
          </div>

          <!-- Hidden File Input -->
          <input 
            ref="fileInput"
            type="file"
            accept=".webp,image/webp"
            @change="handleFileSelect"
            class="d-none"
          />
        </div>

        <!-- Footer -->
        <div class="modal-footer border-top">
          <button type="button" class="btn btn-secondary" @click="closeDialog">
            <i class="bi bi-x-circle me-1"></i>
            Cancelar
          </button>
          <button 
            type="button"
            class="btn btn-success" 
            :disabled="!previewUrl"
            @click="handleUpload"
          >
            <i class="bi bi-upload me-1"></i>
            Subir Imagen
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <div v-if="isOpen" class="modal-backdrop fade show"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Props
interface Props {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false
});

// Emits
const emit = defineEmits<{
  close: [];
  upload: [file: File];
}>();

// State
const isDragging = ref(false);
const previewUrl = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const fileName = ref('');
const fileSize = ref(0);
const errorMessage = ref('');
const fileInput = ref<HTMLInputElement | null>(null);

// Methods
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    processFile(files[0]);
  }
};

const triggerFileInput = () => {
  if (!previewUrl.value) {
    fileInput.value?.click();
  }
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    processFile(files[0]);
  }
};

const processFile = (file: File) => {
  errorMessage.value = '';
  
  // Validate file type
  if (!file.type.includes('webp') && !file.name.toLowerCase().endsWith('.webp')) {
    errorMessage.value = 'Solo se permiten archivos WebP';
    return;
  }
  
  // Validate file size (2MB limit)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    errorMessage.value = 'El archivo es demasiado grande (máximo 2MB)';
    return;
  }
  
  selectedFile.value = file;
  fileName.value = file.name;
  fileSize.value = file.size;
  
  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const removeFile = () => {
  selectedFile.value = null;
  previewUrl.value = null;
  fileName.value = '';
  fileSize.value = 0;
  errorMessage.value = '';
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const handleUpload = () => {
  if (selectedFile.value) {
    emit('upload', selectedFile.value);
    closeDialog();
  }
};

const closeDialog = () => {
  removeFile();
  emit('close');
};
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.drop-zone:hover:not(:has(.preview-container)) {
  background-color: rgba(25, 135, 84, 0.05) !important;
  border-color: #198754 !important;
}

.preview-container {
  cursor: default;
}
</style>