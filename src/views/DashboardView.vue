<script setup>
import http from '@/services/http';
import { useAuth } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { onMounted, ref } from 'vue';

const auth = useAuth();

const overview = ref({});
const processing = ref(false);

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const GET = async () => {
  processing.value = true;

  try {
    const { data } = await http.get('/overview');
    console.log(data);
    overview.value = data;

    console.log(data);
  } catch (error) {
    console.log(error);

    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo correu mal!'
    });
  } finally {
    processing.value = false;
  }
};

onMounted(async () => {
  await GET();
});
</script>

<template>
  <div class="row mb-4">
    <div class="col-12">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb my-0">
          <li class="breadcrumb-item active"><span>Dashboard</span></li>
        </ol>
      </nav>
    </div>
  </div>
  <div class="row g-4">
    <!-- /.col-->
    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
      <div class="card">
        <div class="card-body p-3 d-flex align-items-center">
          <div class="bg-info text-white p-3 me-3">
            <svg class="icon icon-xl">
              <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-house"></use>
            </svg>
          </div>
          <div>
            <div class="fs-6 fw-semibold text-info">Extensões</div>
            <div class="text-body-secondary text-uppercase fw-semibold small">{{ overview?.branches_count || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.col-->
    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
      <div class="card">
        <div class="card-body p-3 d-flex align-items-center">
          <div class="bg-danger text-white p-3 me-3">
            <svg class="icon icon-xl">
              <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-people"></use>
            </svg>
          </div>
          <div>
            <div class="fs-6 fw-semibold text-danger">Funcionários</div>
            <div class="text-body-secondary text-uppercase fw-semibold small">{{ overview?.employees_count || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.col-->
    <!-- /.col-->
    <div class="col-12 col-sm-6 col-xl-4 col-xxl-3">
      <div class="card">
        <div class="card-body p-3 d-flex align-items-center">
          <div class="bg-warning text-white p-3 me-3">
            <svg class="icon icon-xl">
              <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-people"></use>
            </svg>
          </div>
          <div>
            <div class="fs-6 fw-semibold text-warning">Usuários</div>
            <div class="text-body-secondary text-uppercase fw-semibold small">{{ overview?.users_count || 0 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
