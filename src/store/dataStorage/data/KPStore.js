import * as firebase from 'firebase'

export default {
  state: {
    currentUserID: '',
    users: [],
    buttons: [],
    numbers: ''
  },
  mutations: {
    setCurrentUserID(state, payload) {
      state.currentUserID = payload
    },

    setUsers(state, payload) {
      state.users = payload
    },

    setButtons(state, payload) {
      state.buttons = payload
    },

    setNumbers(state, payload) {
      state.numbers = payload
    }
  },
  actions: {
    makeConnection({commit, state}) {
      //Creating new user in the database
      firebase.database().ref('KPData/users').push({username: 'Anonymous User', isCurrentUser: false}).then((data) => {
        //Getting the newly created user ID from the database
        commit('setCurrentUserID', data.key)

        //Getting the data for all the currently active users from the database
        firebase.database().ref('KPData/users').on('value', (snapshot) => {
          let data = snapshot.val()
          let userData = []

          Object.keys(data).forEach((userKey) => {
            userData.push({
              id: userKey,
              username: data[userKey].username
            })
          })

          //Marking the current user
          userData.find(user => user.id === state.currentUserID).isCurrentUser = true

          //Storing the current users data in the local storage
          commit('setUsers', userData)
        })

        //Getting the data for all the buttons from the database
        firebase.database().ref('KPData/buttons').on('value', (snapshot) => {
          let data = snapshot.val()
          let buttonsData = []


          Object.keys(data).forEach((buttonKey) => {
            buttonsData.push({
              id: buttonKey,
              value: data[buttonKey].value,
              color: data[buttonKey].color,
              lastUser: data[buttonKey].lastUser
            })
          })

          //Storing the button data in the local storage
          commit('setButtons', buttonsData)
        })

        //Getting the numbers data from the database
        firebase.database().ref('KPData/numbers').on('value', (snapshot) => {
          //Storing the numbers data in local storage
          commit('setNumbers', snapshot.val())
        })
      }).catch(error => {
        console.log(error)
      })
    },
    //Backup of the old setup of actions
    // setUsers({commit, state}) {
    //   firebase.database().ref('KPData/users').on('value', (snapshot) => {
    //     let data = snapshot.val()
    //     let userData = []
    //
    //     Object.keys(data).forEach((userKey) => {
    //       userData.push({
    //         id: userKey,
    //         username: data[userKey].username
    //       })
    //     })
    //
    //     console.log(userData.find(user => user.id === state.currentUserID))
    //     userData.find(user => user.id === state.currentUserID).isCurrentUser = true
    //
    //     commit('setUsers', userData)
    //   })
    // },
    // setButtons({commit}) {
    //   firebase.database().ref('KPData/buttons').on('value', (snapshot) => {
    //     let data = snapshot.val()
    //     let buttonsData = []
    //
    //
    //     Object.keys(data).forEach((buttonKey) => {
    //       buttonsData.push({
    //         id: buttonKey,
    //         value: data[buttonKey].value,
    //         color: data[buttonKey].color,
    //         lastUser: data[buttonKey].lastUser
    //       })
    //     })
    //
    //     commit('setButtons', buttonsData)
    //   })
    // },
    // setNumbers({commit}) {
    //   firebase.database().ref('KPData/numbers').on('value', (snapshot) => {
    //     commit('setNumbers', snapshot.val())
    //   })
    // },
    // addUser({commit, state}) {
    //   firebase.database().ref('KPData/users').push({username: 'Anonymous User', isCurrentUser: false}).then((data) => {
    //     commit('setCurrentUserID', data.key)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },
    updateUser({state}, payload) {
      firebase.database().ref('KPData/users/' + state.currentUserID).update({username: payload}).
      catch(error => {
        console.log(error)
      })
    },
    deleteUser({state}) {
      firebase.database().ref('KPData/users/' + state.currentUserID).remove().
      catch(error => {
        console.log(error)
      })
    },
    changeButton({commit, state}, payload) {
      //Addint the newly clicked button value to the numbers string
      let numbers = state.numbers
      numbers += '' + payload.value

      //Checking if the numbers string is too long
      if(numbers.length > 10) {
        numbers = numbers.substr(1)
      }

      firebase.database().ref('KPData/numbers').set(numbers).catch(error => {
        console.log(error)
      })

      //Getting the key for the currently clicked button
      let selectedButtonID = state.buttons.find(button => button.value === payload.value).id

      //Updating the data for the currently clicked button
      firebase.database().ref('KPData/buttons/' + selectedButtonID).update({
        color: payload.color,
        lastUser: payload.lastUser === 'Потребителско име' ? 'Anonymous User' : payload.lastUser
      }).
      catch(error => {
        console.log(error)
      })

    }
  },
  getters: {
    getUsers(state) {
      return state.users
    },

    getButtons(state) {
      return state.buttons
    },

    getNumbers(state) {
      return state.numbers
    }
  }
}
