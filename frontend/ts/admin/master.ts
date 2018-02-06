import Vue from 'vue'
import iView from 'iview'
import Router from '../router'
import Store from '../store/store'

import App from '../../vue/admin/master.vue'

Vue.use(iView)

new Vue({
    el: '#app',
    router: Router,
    store: Store,
    render: h => h(App)
})