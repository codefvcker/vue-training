import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Loader from '@/components/app/Loader'
import messagePlugin from '@/utils/message.plugin'
import dateFIlter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFIlter)
Vue.filter('currencyFilter', currencyFilter)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: 'AIzaSyByxBsSqOUaBgZW43yb1H_pstCDeAVrMgo',
  authDomain: 'vue-practice-8a24c.firebaseapp.com',
  projectId: 'vue-practice-8a24c',
  storageBucket: 'vue-practice-8a24c.appspot.com',
  messagingSenderId: '1030493148311',
  appId: '1:1030493148311:web:5cde927cf78efb56a485d2',
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
