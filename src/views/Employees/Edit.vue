<script setup>
import http from '@/services/http';
import dayjs from 'dayjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const input = reactive({});
const select = ref({});
const errors = ref({});

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
  try {
    const { data: eData } = await http.get(`/employees/${route.params.id}`);
    input.branch_id = eData.data?.branch?.id;
    input.organic_unit_id = eData.data?.organic_unit?.id;
    input.department_id = eData.data?.department?.id;
    input.partition_id = eData.data?.partition?.id;
    input.career_id = eData.data?.career?.id;
    input.category_id = eData.data?.category?.id;
    input.level_id = eData.data?.level?.id;
    input.salary_level_id = eData.data?.salary_level?.id;

    input.name = eData.data?.name;
    input.birthdate = dayjs(eData.data?.birthdate).format('YYYY-MM-DD');
    input.contact = eData.data?.contact;
    input.nationality = eData.data?.nationality;
    input.naturality = eData.data?.naturality;
    input.email = eData.data?.email;
    input.father_name = eData.data?.father_name;
    input.mother_name = eData.data?.mother_name;
    input.bi_nr = eData.data?.bi_nr;
    input.bi_validate = dayjs(input.bi_validate).format('YYYY-MM-DD');
    input.nuit = eData.data?.nuit;

    console.log(eData);

    const { data } = await http.get('/employees/select');
    console.log(data);
    select.value = data;

    console.log(data);
  } catch (error) {
    console.log(error);

    Toast.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo correu mal!'
    });
  }
};

const POST = async () => {
  processing.value = true;

  try {
    const { data } = await http.put(`/employees/${route.params.id}`, input);

    Toast.fire({
      icon: 'success',
      title: 'Editar',
      text: 'Registo atualizado com sucesso!'
    });

    router.push({ name: 'employees.index' });
    console.log(data);
  } catch (error) {
    if (error?.response) {
      console.log(error.response);

      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      } else if (error.response.status === 429) {
        Toast.fire({
          icon: 'error',
          title: 'Oops...',
          // TODO
          text: 'Muitas requisicoes, aguarde antes de tentar mais uma vez.'
        });
        //certifique-se que estejas online.
      } else {
        errors.value = {};
        Toast.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data?.message
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo correu mal!'
      });
    }
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
            <RouterLink v-bind:to="{ name: 'employees.index' }">Funcionários</RouterLink>
          </li>
          <li class="breadcrumb-item active">
            <span>Editar</span>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <form v-on:submit.prevent="POST" class="card mb-4">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">Editar</div>
        </div>

        <div class="card-body">
          <div class="row row-cards">
            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="branch_id" class="form-label">Extensão</label>
              <select class="form-select" v-model="input.branch_id" id="branch_id">
                <option value="">⎻</option>
                <option v-bind:key="branch.id" v-for="branch in select?.branches" v-bind:value="branch.id">
                  {{ branch.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.branch_id?.[0]">{{ errors?.branch_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="organic_unit_id" class="form-label">Unidade orgânica</label>
              <select class="form-select" v-model="input.organic_unit_id" id="organic_unit_id">
                <option value="">⎻</option>
                <option
                  v-bind:key="organic_unit.id"
                  v-for="organic_unit in select?.organic_units"
                  v-bind:value="organic_unit.id"
                >
                  {{ organic_unit.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.organic_unit_id?.[0]">{{
                errors?.organic_unit_id?.[0]
              }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="department_id" class="form-label">Departamento</label>
              <select class="form-select" v-model="input.department_id" id="department_id">
                <option value="">⎻</option>
                <option
                  v-bind:key="department.id"
                  v-for="department in select?.departments"
                  v-bind:value="department.id"
                >
                  {{ department.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.department_id?.[0]">{{ errors?.department_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="partition_id" class="form-label">Partição</label>
              <select class="form-select" v-model="input.partition_id" id="partition_id">
                <option value="">⎻</option>
                <option v-bind:key="partition.id" v-for="partition in select?.partitions" v-bind:value="partition.id">
                  {{ partition.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.partition_id?.[0]">{{ errors?.partition_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="career_id" class="form-label">Carreira</label>
              <select class="form-select" v-model="input.career_id" id="career_id">
                <option value="">⎻</option>
                <option v-bind:key="career.id" v-for="career in select?.careers" v-bind:value="career.id">
                  {{ career.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.career_id?.[0]">{{ errors?.career_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="category_id" class="form-label">Categoria</label>
              <select class="form-select" v-model="input.category_id" id="category_id">
                <option value="">⎻</option>
                <option v-bind:key="category.id" v-for="category in select?.categories" v-bind:value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.category_id?.[0]">{{ errors?.category_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="level_id" class="form-label">Nível</label>
              <select class="form-select" v-model="input.level_id" id="level_id">
                <option value="">⎻</option>
                <option v-bind:key="level.id" v-for="level in select?.levels" v-bind:value="level.id">
                  {{ level.name }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.level_id?.[0]">{{ errors?.level_id?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="salary_level_id" class="form-label">Grupo Salarial</label>
              <select class="form-select" v-model="input.salary_level_id" id="salary_level_id">
                <option value="">⎻</option>
                <option
                  v-bind:key="salary_level.id"
                  v-for="salary_level in select?.salary_levels"
                  v-bind:value="salary_level.id"
                >
                  {{ salary_level.level }}
                </option>
              </select>
              <small class="text-danger mt-1" v-if="errors?.salary_level_id?.[0]">{{
                errors?.salary_level_id?.[0]
              }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="name" class="form-label">Nome</label>
              <input class="form-control" v-model="input.name" id="name" autocomplete="name" />
              <small class="text-danger mt-1" v-if="errors?.name?.[0]">{{ errors?.name?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="birthdate" class="form-label">Data Nascimento</label>
              <input type="date" class="form-control" v-model="input.birthdate" id="birthdate" />
              <small class="text-danger mt-1" v-if="errors?.birthdate?.[0]">{{ errors?.birthdate?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="nationality" class="form-label">Nacionalidade</label>
              <input
                type="text"
                class="form-control"
                v-model="input.nationality"
                id="nationality"
                autocomplete="country-name"
              />
              <small class="text-danger mt-1" v-if="errors?.nationality?.[0]">{{ errors?.nationality?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="naturality" class="form-label">Naturalidade</label>
              <input type="text" class="form-control" v-model="input.naturality" id="naturality" />
              <small class="text-danger mt-1" v-if="errors?.naturality?.[0]">{{ errors?.naturality?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="bi_nr" class="form-label">BI</label>
              <input type="text" class="form-control" v-model="input.bi_nr" id="bi_nr" />
              <small class="text-danger mt-1" v-if="errors?.bi_nr?.[0]">{{ errors?.bi_nr?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="bi_validate" class="form-label">BI Validade</label>
              <input type="date" class="form-control" v-model="input.bi_validate" id="bi_validate" />
              <small class="text-danger mt-1" v-if="errors?.bi_validate?.[0]">{{ errors?.bi_validate?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="nuit" class="form-label">NUIT</label>
              <input type="text" class="form-control" v-model="input.nuit" id="nuit" />
              <small class="text-danger mt-1" v-if="errors?.nuit?.[0]">{{ errors?.nuit?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="father_name" class="form-label">Nome do Pai</label>
              <input type="text" class="form-control" v-model="input.father_name" id="father_name" />
              <small class="text-danger mt-1" v-if="errors?.father_name?.[0]">{{ errors?.father_name?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="mother_name" class="form-label">Nome da Mãe</label>
              <input type="text" class="form-control" v-model="input.mother_name" id="mother_name" />
              <small class="text-danger mt-1" v-if="errors?.mother_name?.[0]">{{ errors?.mother_name?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="email" class="form-label">Email</label>
              <input class="form-control" v-model="input.email" type="email" id="email" autocomplete="email" />
              <small class="text-danger mt-1" v-if="errors?.email?.[0]">{{ errors?.email?.[0] }}</small>
            </div>

            <div class="col-12 col-md-6 col-lg-4 mb-4">
              <label for="contact" class="form-label">Contacto</label>
              <input type="text" class="form-control" v-model="input.contact" id="contact" autocomplete="tel" />
              <small class="text-danger mt-1" v-if="errors?.contact?.[0]">{{ errors?.contact?.[0] }}</small>
            </div>

            <div class="col-12">
              <button class="btn btn-primary" type="submit">
                <span v-if="processing">Enviando dados ...</span>
                <span v-else>Guardar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
