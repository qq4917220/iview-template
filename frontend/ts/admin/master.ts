import Vue from 'vue'
import iView from 'iview'
import Router from '../router'

import App from '../../vue/admin/master.vue'

Vue.use(iView)

new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
})