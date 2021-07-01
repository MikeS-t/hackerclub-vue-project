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
      console.log('Making Connection')
      //Creating new user in the database
      firebase.database().ref('KPData/users').push({username: 'Anonymous User'}).then((newUser) => {
        //Getting the newly created user ID from the database
        commit('setCurrentUserID', newUser.key)

        //Getting the data for all the currently active users from the database
        firebase.database().ref('KPData/users').on('value', (snapshot) => {
          let data = snapshot.val()
          let usersData = []

          console.log(data)
          if (data) {
            Object.keys(data).forEach((userKey) => {
              usersData.push({
                id: userKey,
                username: data[userKey].username
              })
            })

            //Marking the current user
            usersData.find(user => user.id === newUser.key).isCurrentUser = true
          }

          //Storing the current users data in the local storage
          commit('setUsers', usersData)
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
      //Adding the newly clicked button value to the numbers string
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
    getCurrentUserID(state) {
      return state.currentUserID
    },

    getCurrentUserName(state) {
      return state.users.find(user => user.id === state.currentUserID).username
    },

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
