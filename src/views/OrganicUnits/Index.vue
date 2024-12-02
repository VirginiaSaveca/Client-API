<script setup>
import http from '@/services/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

const router = useRouter();
const route = useRoute();
const links = ref({});
const meta = ref({});

const organicUnits = ref([]);
const usp = computed(() => {
  const _ = new URLSearchParams();

  if (typeof route.query?.page) _.append('page', route.query.page);
  if (typeof route.query?.per_page) _.append('per_page', route.query.per_page);

  return _;
});

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
    const { data } = await http.get(`/organic_units${usp.value ? `?${usp.value}` : ''}`);
    organicUnits.value = data.data;
    links.value = data?.links || {};
    meta.value = data?.meta || {};

    console.log(data);
  } catch (error) {
    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo correu mal!'
    });

    console.log(error);
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
          <li class="breadcrumb-item">
            <RouterLink v-bind:to="{ name: 'dashboard' }">Dashboard</RouterLink>
          </li>
          <li class="breadcrumb-item active"><span>Unidades orgânicas</span></li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <div class="">
              Unidades orgânicas (
              {{ organicUnits.length }}/{{ meta?.per_page || 0 }} - {{ meta?.total || 0 }} )
            </div>
            <div class="" v-if="processing">Carregando dados ...</div>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table border mb-0">
              <thead class="fw-semibold text-nowrap">
                <tr class="align-middle">
                  <th class="bg-body-secondary">#</th>
                  <th class="bg-body-secondary">Nome</th>
                  <th class="bg-body-secondary">Extensões</th>
                </tr>
              </thead>

              <tbody>
                <tr class="align-middle" v-bind:key="organicUnit.id" v-for="organicUnit in organicUnits">
                  <td>{{ organicUnit.id }}</td>
                  <td>{{ organicUnit.name }}</td>
                  <td>
                    <p v-bind:key="branch.id" v-for="branch in organicUnit.branches">⎻ {{ branch.name }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer">
          <div class="btn-group" role="group">
            <a
              v-bind:href="`/organic_units?page=${1}`"
              v-if="links?.first && meta?.current_page !== 1"
              class="btn btn-outline-primary"
              >first</a
            >

            <a
              v-bind:href="`/organic_units?page=${(meta?.current_page || 0) - 1}`"
              v-if="links?.prev && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >prev</a
            >

            <a
              v-bind:href="`/organic_units?page=${(meta?.current_page || 0) + 1}`"
              v-if="links?.next && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >next</a
            >

            <a
              v-bind:href="`/organic_units?page=${meta?.last_page || 1}`"
              v-if="links?.last && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >last</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
