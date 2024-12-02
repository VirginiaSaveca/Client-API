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

const employee = ref({});

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
    const { data } = await http.get(`/employees/${route.params.id}`);
    employee.value = data.data;

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
          <li class="breadcrumb-item active">
            <RouterLink v-bind:to="{ name: 'employees' }">Funcionários</RouterLink>
          </li>
          <li class="breadcrumb-item active">
            <span>{{ $route.params.id }}</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <div class="card mb-4">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <div class="">Funcionário {{ $route.params.id }}</div>
            <div class="" v-if="processing">Carregando dados ...</div>
          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table border mb-0">
              <tbody>
                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">#</th>
                  <td>{{ employee.id }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nome</th>
                  <td>{{ employee.name }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">BI</th>
                  <td>{{ employee.bi_nr }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">BI Validade</th>
                  <td>{{ new Date(employee.bi_validate) }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Data de nascimento</th>
                  <td>{{ new Date(employee.birthdate) }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">NUIT</th>
                  <td>{{ employee.nuit }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nome da Mãe</th>
                  <td>{{ employee.mother_name }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nome do Pai</th>
                  <td>{{ employee.father_name }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Carreira</th>
                  <td>{{ employee.career }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nível</th>
                  <td>{{ employee.level }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nível salarial</th>
                  <td>{{ employee.salary_level }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Categoria</th>
                  <td>{{ employee.category }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Contacto</th>
                  <td>{{ employee.contact }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Email</th>
                  <td>{{ employee.email }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Departamento</th>
                  <td>{{ employee.department }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Partição</th>
                  <td>{{ employee.partition }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Unidade orgânica</th>
                  <td>{{ employee.organic_unit }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Extensão</th>
                  <td>{{ employee.branch }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Nacionalidade</th>
                  <td>{{ employee.nationality }}</td>
                </tr>

                <tr class="align-middle">
                  <th class="fw-semibold text-nowrap bg-body-secondary">Naturalidade</th>
                  <td>{{ employee.naturality }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
