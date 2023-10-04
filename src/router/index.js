import { createRouter, createWebHistory } from 'vue-router'
import SuperAdmin from '../views/SuperAdmin.vue'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:notFound',
      component: NotFound
    },
    {
      path: '/superadmin',
      name: 'super-admin',
      component: SuperAdmin
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
