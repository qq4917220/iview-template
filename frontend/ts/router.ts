import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import adminHome from '../vue/admin/home.vue'
import adminIframe from '../vue/admin/iframe.vue'

Vue.use(VueRouter)

const routes = <RouteConfig[]>[
    { path: '/admin/home', name: 'adminHome', component: adminHome },
    { path: '/admin/iframe/:url', name: 'adminIframe', component: adminIframe }
]

const Router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default Router