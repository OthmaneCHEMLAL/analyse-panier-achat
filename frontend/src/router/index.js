import { createRouter, createWebHistory } from 'vue-router'
import DashboardView  from '../views/Dashboard.vue'
import { API_BASE_URL } from '../config';

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView 
  },
]

const router = createRouter({
  history: createWebHistory(API_BASE_URL),
  routes
})

console.log("Routes:", routes);


export default router
