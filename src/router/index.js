import { createRouter, createWebHistory } from 'vue-router'
import Kanban from '../components/Kanban.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
        path: '/view-board',
        name: 'Kanban',
        component: Kanban,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isLoggedIn = Boolean(localStorage.getItem("user"))
    if(isLoggedIn) {
        if(to.name === 'Login' || to.name === 'Register')
            next('/view-board')
        else
            next()
    } else {
        if(to.name === 'Kanban')
            next('/register')
        else
            next()
    }
})
  
export default router
  