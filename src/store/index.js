import Vue from 'vue'
import Vuex from 'vuex'

import booleanFlags from './Boolean flags'
import dataStorage from './dataStorage'
import errorsAndLoaders from './Errors and Loaders'
import user from './user'


Vue.use(Vuex)

export const store = new Vuex.Store({
 modules: {
   booleanFlags: booleanFlags,
   dataStorage: dataStorage,
   errorsAndLoaders: errorsAndLoaders,
   user: user,
 }
})
