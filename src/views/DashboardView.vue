<script setup>
import { useAuth } from '@/stores/auth';
const auth = useAuth();
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
</template>
