<script setup>
import { useAuth } from '@/stores/auth';
import { RouterLink, RouterView } from 'vue-router';

const auth = useAuth();
</script>

<template>
  <div class="sidebar sidebar-dark sidebar-fixed border-end" id="sidebar">
    <div class="sidebar-header border-bottom">
      <div class="sidebar-brand">
        <svg class="sidebar-brand-full" width="88" height="32" alt="CoreUI Logo">
          <use xlink:href="/assets/brand/coreui.svg#full"></use>
        </svg>
        <svg class="sidebar-brand-narrow" width="32" height="32" alt="CoreUI Logo">
          <use xlink:href="/assets/brand/coreui.svg#signet"></use>
        </svg>
      </div>
      <button
        class="btn-close d-lg-none"
        type="button"
        data-coreui-dismiss="offcanvas"
        data-coreui-theme="dark"
        aria-label="Close"
        onclick='coreui.Sidebar.getInstance(document.querySelector("#sidebar")).toggle()'
      ></button>
    </div>
    <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
      <li class="nav-item">
        <RouterLink v-bind:to="{ name: 'dashboard' }" class="nav-link">
          <svg class="nav-icon">
            <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-speedometer"></use>
          </svg>

          Dashboard</RouterLink
        >
      </li>
      <li class="nav-item">
        <RouterLink v-bind:to="{ name: 'branches' }" class="nav-link">
          <svg class="nav-icon">
            <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-house"></use>
          </svg>
          Extensões
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink v-bind:to="{ name: 'organic_units' }" class="nav-link">
          <svg class="nav-icon">
            <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-puzzle"></use>
          </svg>
          Unidades orgânicas
        </RouterLink>
      </li>
      <li class="nav-item"></li>
      <li class="nav-item">
        <RouterLink v-bind:to="{ name: 'employees.index' }" class="nav-link">
          <svg class="nav-icon">
            <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-people"></use>
          </svg>
          Funcionários
        </RouterLink>
      </li>
    </ul>
    <div class="sidebar-footer border-top d-none d-md-flex">
      <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>
  </div>
  <div class="wrapper d-flex flex-column min-vh-100">
    <header class="header header-sticky p-0 mb-4">
      <div class="container-fluid border-bottom px-4">
        <button
          class="header-toggler"
          type="button"
          onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()"
          style="margin-inline-start: -14px"
        >
          <svg class="icon icon-lg">
            <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
          </svg>
        </button>
        <ul class="header-nav d-none d-lg-flex">
          <li class="nav-item">
            <RouterLink to="dashboard" class="nav-link">Dashboard</RouterLink>
          </li>
        </ul>
        <ul class="header-nav ms-auto"></ul>
        <ul class="header-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link py-0 pe-0"
              data-coreui-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="d-flex align-items-center">
                {{ auth.user?.name }}

                <svg class="icon ms-2">
                  <use xlink:href="/assets/vendors/@coreui/icons/svg/free.svg#cil-chevron-bottom"></use>
                </svg>
              </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end pt-0">
              <RouterLink class="dropdown-item" v-bind:to="{ name: 'profile' }"> Conta </RouterLink>
              <button type="button" class="dropdown-item" v-on:click="auth.logout()">Logout</button>
            </div>
          </li>
        </ul>
      </div>
    </header>
    <div class="body flex-grow-1">
      <div class="container-lg px-4">
        <RouterView />
      </div>
    </div>
    <footer class="footer px-4">
      <div>Copyright © {{ new Date().getFullYear() }} Marcia Saveca. Todos Direitos Reservados.</div>
    </footer>
  </div>
</template>
