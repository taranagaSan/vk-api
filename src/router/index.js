import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main.vue'
import Friend from '@/components/Friend.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/friend/:id',
        name: 'Friend',
        component: Friend,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
