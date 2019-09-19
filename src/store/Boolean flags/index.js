export default {
  state: {
    drawerState: false,
    authDialogState: false,
    changePasswordDialogState: false,
    changeEmailDialogState: false
  },
  mutations: {
    drawerToggle(state) {
      state.drawerState = !state.drawerState
    },
    authDialogToggle(state) {
      state.authDialogState = !state.authDialogState
    },
    changePasswordDialogToggle(state) {
      state.changePasswordDialogState = !state.changePasswordDialogState
    },
    changeEmailDialogToggle(state) {
      state.changeEmailDialogState = !state.changeEmailDialogState
    }
  },
  getters: {
    getDrawerState(state) {
      return state.drawerState
    },
    getAuthDialogState(state) {
      return state.authDialogState
    },
    getChangePasswordDialogState(state) {
      return state.changePasswordDialogState
    },
    getChangeEmailDialogState(state) {
      return state.changeEmailDialogState
    }
  }
}
