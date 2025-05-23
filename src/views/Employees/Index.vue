<script setup>
import { watch } from 'vue';
import http from '@/services/http';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const route = useRoute();
const links = ref({});
const meta = ref({});

const employees = ref([]);
const query = ref(route.query?.query);
const queried = ref(false);
const processing = ref(false);

watch(
  query,
  async () => {
    if (!query.value && queried.value) {
      await GET();
      queried.value = false;
    }
  },
  { immediate: true }
);

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
  const usp = computed(() => {
    const _ = new URLSearchParams();

    _.append('page', route.query?.page || 1);
    _.append('per_page', route.query?.per_page || 15);
    if (query.value) {
      _.append('query', query.value);
      queried.value = true;
    } else {
      queried.value = false;
    }
    return _;
  });

  try {
    const { data } = await http.get(`/employees${usp.value ? `?${usp.value}` : ''}`);
    employees.value = data.data;
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
          <li class="breadcrumb-item active"><span>Funcionários</span></li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <div class="mb-2" v-if="processing">Carregando dados ...</div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="">
              Funcionários ( {{ employees.length }}/{{ meta?.per_page || 0 }} - {{ meta?.total || 0 }})
            </div>
            <div class="d-flex align-items-center">
              <input class="form-control" type="text" v-model="query" v-on:keydown.enter="GET" />
              <button class="btn btn-primary" v-bind:disabled="processing" v-on:click="GET()" type="button">
                Procurar
              </button>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table border mb-0">
              <thead class="fw-semibold text-nowrap">
                <tr class="align-middle">
                  <th class="bg-body-secondary">#</th>
                  <th class="bg-body-secondary">NUIT</th>
                  <th class="bg-body-secondary">Extensão</th>
                  <th class="bg-body-secondary">Nome</th>
                  <th class="bg-body-secondary">Carreira</th>
                  <th class="bg-body-secondary"></th>
                </tr>
              </thead>

              <tbody>
                <tr class="align-middle" v-bind:key="employee.id" v-for="employee in employees">
                  <td>{{ employee.id }}</td>
                  <td>{{ employee.nuit }}</td>
                  <td>{{ employee.branch?.name }}</td>
                  <td>{{ employee.name }}</td>
                  <td>{{ employee.career?.name }}</td>
                  <td>
                    <RouterLink
                      :to="{ name: 'employees.show', params: { id: employee.id } }"
                      class="btn btn-primary px-4"
                      >Ver</RouterLink
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer" v-show="meta?.last_page !== 1">
          <div class="btn-group" role="group">
            <a
              v-bind:href="`/employees?page=${1}`"
              v-if="links?.first && meta?.current_page !== 1"
              class="btn btn-outline-primary"
              >Primeiro</a
            >

            <a
              v-bind:href="`/employees?page=${(meta?.current_page || 0) - 1}`"
              v-if="links?.prev && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >Anterior</a
            >

            <a
              v-bind:href="`/employees?page=${(meta?.current_page || 0) + 1}`"
              v-if="links?.next && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >Proximo</a
            >

            <a
              v-bind:href="`/employees?page=${meta?.last_page || 1}`"
              v-if="links?.last && meta?.current_page !== meta?.last_page"
              class="btn btn-outline-primary"
              >Último</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
