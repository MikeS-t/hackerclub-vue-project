import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { routes } from './routes.js'
import vuetify from 'vuetify'
import { store } from "./store"
import 'vuetify/dist/vuetify.min.css'
import * as firebase from 'firebase'
import AlertComp from './components/Shared/Alert.vue'
import LoaderComp from './components/Shared/Loader.vue'

Vue.use(vuetify, {
  theme: {
    primary: '#ee3d39',
    secondary: '#424242',
    accent: '#ff7934',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#deb529',
    custom: '#9604d7'
  }
})

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

Vue.component('app-alert', AlertComp)
Vue.component('app-loading', LoaderComp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp ({
      apiKey: "AIzaSyANxTq4QeDXo4hrM-3oWKQlTQOmWGVqyn8",
      authDomain: "hackerproject-4fa60.firebaseapp.com",
      databaseURL: "https://hackerproject-4fa60.firebaseio.com",
      projectId: "hackerproject-4fa60",
      storageBucket: "hackerproject-4fa60.appspot.com"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
