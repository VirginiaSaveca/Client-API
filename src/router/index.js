import { useAuth } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./../layouts/GuestLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'login' }
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('./../views/LoginView.vue')
        }
      ],
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      component: () => import('./../layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('./../views/DashboardView.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./../views/ProfileView.vue')
        },
        {
          path: '/branches',
          name: 'branches',
          component: () => import('./../views/Branches/Index.vue')
        },
        {
          path: '/organic_units',
          name: 'organic_units',
          component: () => import('./../views/OrganicUnits/Index.vue')
        },
        {
          path: '/employees',
          name: 'employees.index',
          component: () => import('./../views/Employees/Index.vue')
        },
        {
          path: '/employees/:id(\\d+)',
          name: 'employees.show',
          component: () => import('./../views/Employees/Show.vue')
        }
      ],
      meta: {
        auth: true
      }
    },
    { path: '/:pathMatch(.*)*', name: 'not_found', component: import('./../views/NotFound.vue') }
  ]
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuth();
  const { isAuthenticated } = auth;

  if (to.meta?.guest && isAuthenticated()) {
    next({ name: 'dashboard' });
  }

  if (to.meta?.auth && !isAuthenticated()) {
    next({ name: 'login' });
  }

  next();
});

export default router;
