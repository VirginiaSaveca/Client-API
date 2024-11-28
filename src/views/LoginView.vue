<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/stores/auth';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const auth = useAuth();
const router = useRouter();

const input = reactive({
  email: null,
  password: null,
  device_name: 'device_name'
});

const errors = ref({});
const processing = ref(false);
const isPwd = ref(true);

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

const POST = async () => {
  processing.value = true;
  try {
    errors.value = {};
    await auth.login(input);
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
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <div class="card-group d-block d-md-flex row">
        <form v-on:submit.prevent="POST" class="card col-md-7 p-4 mb-0">
          <div class="card-body">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                class="form-control"
                v-model="input.email"
                type="email"
                name="email"
                id="email"
                autocomplete="username"
              />
              <small class="text-danger mt-1" v-if="errors?.email?.[0]">{{ errors?.email?.[0] }}</small>
            </div>

            <div class="mb-4">
              <label for="password" class="form-label">Password</label>
              <input
                class="form-control"
                v-model="input.password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
              />
              <small class="text-danger mt-1" v-if="errors?.password?.[0]">{{ errors?.password?.[0] }}</small>
            </div>
            <div class="row">
              <div class="col-6">
                <button type="submit" class="btn btn-primary px-4">
                  Autenticar
                  <span v-if="processing">...</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style></style>
