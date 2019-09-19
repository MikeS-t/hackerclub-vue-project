import {errorMessages} from "../dataStorage/data/errorMessagesSeed";

export default {
  state: {
    loadingState: false,
    error: null,
    errorMessages: errorMessages,
  },
  mutations: {
    setLoadingState(state, payload) {
      state.loadingState = payload
    },
    setError(state, payload) {
      for(let i=0; i < state.errorMessages.length; i++){
        if(state.errorMessages[i].en === payload){
          payload = state.errorMessages[i].bg
          { break; }
        }
      }
      state.error = payload
    }
  },
  actions: {
    clearError({commit}) {
      commit('setError', null)
    }
  },
  getters: {
    getLoadingState(state) {
      return state.loadingState
    },
    getError(state) {
      return state.error
    },
  }
}
