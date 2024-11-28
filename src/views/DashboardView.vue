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

  <div class="row g-4 mb-4">
    <div class="col-sm-6 col-xl-3">
      <div class="card text-white bg-primary">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="fs-4 fw-semibold">
              26K
              <span class="fs-6 fw-normal"
                >(-12.4%
                <svg class="icon">
                  <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-arrow-bottom"></use></svg
                >)</span
              >
            </div>
            <div>Lorem, ipsum.</div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-transparent text-white p-0"
              type="button"
              data-coreui-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg class="icon">
                <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-options"></use>
              </svg>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a
              ><a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
        <div class="c-chart-wrapper mt-3 mx-3" style="height: 70px">
          <canvas class="chart" id="card-chart1" height="70"></canvas>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-xl-3">
      <div class="card text-white bg-warning">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="fs-4 fw-semibold">
              2.49%
              <span class="fs-6 fw-normal"
                >(84.7%
                <svg class="icon">
                  <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-arrow-top"></use></svg
                >)</span
              >
            </div>
            <div>Lorem, ipsum.</div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-transparent text-white p-0"
              type="button"
              data-coreui-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg class="icon">
                <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-options"></use>
              </svg>
            </button>
            <div class="dropdown-menu dropdown-menu-end">
              <a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a
              ><a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
        <div class="c-chart-wrapper mt-3" style="height: 70px">
          <canvas class="chart" id="card-chart3" height="70"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
