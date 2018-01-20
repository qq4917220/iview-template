import Vue from 'vue'
import iView from 'iview'
//import Mint from 'mint-ui'
import Router from './router'

import App from '../vue/app.vue'

Vue.use(iView)
//Vue.use(Mint)

new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
})