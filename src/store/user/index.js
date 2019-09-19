import * as firebase from 'firebase'

export default {
  state: {
    currentUser: null,
    isUserVerified: null,
  },
  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
    },
    setIsUserVerified(state, payload) {
      state.isUserVerified = payload
    },
  },
  actions: {
    signUserUp({commit}, payload) {
      commit('setLoadingState', true)
      commit('setError', null)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          commit('setLoadingState', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
        .catch(
          error => {
            commit('setLoadingState', false)
            commit('setError', error.message)
            console.log(error)
          }
        )
    },

    sendUserVerificationMail({commit}) {
      let user = firebase.auth().currentUser

      user.sendEmailVerification().then().catch(error => {
        commit('setError', error.message)
      })
    },

    signUserIn({commit}, payload) {
      commit('setLoadingState', true)
      commit('setError', null)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          commit('setLoadingState', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
        .catch(
          error => {
            commit('setLoadingState', false)
            commit('setError', error.message)
            console.log(error)
          }
        )
    },

    checkUserVerification({commit}) {
      let user = firebase.auth().currentUser
      commit('setIsUserVerified', user.emailVerified)
    },

    autoSignIn({commit}, payload) {
      commit('setUser', {id: payload.uid})
    },

    logOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },

    changePassword ({commit}, payload) {
      let user = firebase.auth().currentUser
      user.updatePassword(payload).then().catch(error => {
        commit('setError', error.message)
      })
    },

    changeEmail ({commit}, payload) {
      let user = firebase.auth().currentUser
      user.updateEmail(payload).then().catch(error => {
        commit('setError', error.message)
      })
    }
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser
    },
    isUserVerified(state) {
      return state.isUserVerified
    }
  }
}
