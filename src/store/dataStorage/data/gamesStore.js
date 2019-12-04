import * as firebase from 'firebase'

export default {
  state: {
    games: [],
    gameTagsArray: []
  },

  mutations: {
    setLoadedGames(state, payload) {
      state.games = payload
    },

    setGameTagsArray(state, payload) {
      state.gameTagsArray = payload
    }
  },
  actions: {
    // setGames () {
    //   games.forEach((game) => {
    //     firebase.database().ref('games').push({
    //       "title": game.title,
    //       "creator": game.creator,
    //       "description": game.description,
    //       "imageUrl": game.imageUrl,
    //       "trailer": game.trailer
    //     })
    //       .then((data) => {
    //         game.tags.forEach((tag) => {
    //           firebase.database().ref('games').child(data.key + "/tags").push({
    //             "name": tag.name,
    //             "color": tag.color
    //           })
    //             .catch((error) => {
    //               console.log(error)
    //             })
    //         })
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   })
    // },

    // modifyGames ({state}) {
    //   state.games.reverse()
    //   state.games.forEach(game => {
    //     delete game.id
    //
    //     firebase.database().ref('games').push(game).
    //     catch(errorMsg => {
    //       //Later log in a file on fire base and remove it from the console
    //       console.log(errorMsg)
    //     })
    //   })
    // },

    // setGameTagsArray ({}, payload) {
    //   firebase.database().ref('gameTagsArray').set(payload).
    //   catch(errorMsg => {
    //     console.log(errorMsg)
    //   })
    // },

    loadGames({commit}) {
      commit('setLoadingState', true)
      firebase.database().ref('games').once('value')
        .then((data) => {
          const gamesData = []
          const gamesObj = data.val()

          Object.keys(gamesObj).forEach((gameKey) => {
            if (!gamesObj[gameKey].isDeleted) {
              gamesData.push({
                id: gameKey,
                title: gamesObj[gameKey].title,
                creator: gamesObj[gameKey].creator,
                description: gamesObj[gameKey].description,
                tags: gamesObj[gameKey].tags,
                imageUrl: gamesObj[gameKey].imageUrl,
                trailer: gamesObj[gameKey].trailer
              })
            }
          })
          commit('setLoadedGames', gamesData)
          commit('setLoadingState', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingState', false)
        })
    },

    updateGame({}, payload) {
      const selectedGameKey = payload.selectedGameInfo.id
      delete payload.selectedGameInfo.id
      if (payload.uploadedImage) {
        const uploadedImageName = payload.uploadedImage.name
        const uploadedImageExt = uploadedImageName.slice(uploadedImageName.lastIndexOf('.'))

        firebase.storage().ref('games/' + selectedGameKey + '.' + uploadedImageExt).
        put(payload.uploadedImage).
        then(fileData => {
          fileData.ref.getDownloadURL().
          then(url => {
            payload.selectedGameInfo.imageUrl = url
            firebase.database().ref('games').child(selectedGameKey).update(payload.selectedGameInfo).
            then(
              payload.selectedGameInfo.id = selectedGameKey
            ).catch(errorMsg => {
              //Later log in a file on fire base and remove it from the console
              console.log(errorMsg)
            })
          })
        })
      }
      else {
        firebase.database().ref('games').child(selectedGameKey).update(payload.selectedGameInfo).
        then(
          payload.selectedGameInfo.id = selectedGameKey
        ).
        catch(errorMsg => {
          //Later log in a file on fire base and remove it from the console
          console.log(errorMsg)
        })
      }
    },

    addGame({state}, payload) {
      state.games.push(payload.selectedGameInfo)

      firebase.database().ref('games').push(payload.selectedGameInfo).
      then(data => {
        const newGameKey = data.key
        const uploadedImageName = payload.uploadedImage.name
        const uploadedImageExt = uploadedImageName.slice(uploadedImageName.lastIndexOf('.'))

        firebase.storage().ref('games/' + newGameKey + '.' + uploadedImageExt).
        put(payload.uploadedImage).
        then(fileData => {
          fileData.ref.getDownloadURL().
          then(url => {
            firebase.database().ref('games').child(newGameKey).update({imageUrl: url}).catch(errorMsg => {
              //Later log in a file on fire base and remove it from the console
              console.log(errorMsg)
            })
          })
        })
      }).catch(errorMsg => {
        //Later log in a file on fire base and remove it from the console
        console.log(errorMsg)
      })
    },

    deleteGames({state}, payload) {
      payload.forEach(game => {
        state.games = state.games.filter(e => e.id !== game.id)
        firebase.database().ref('games').child(game.id).update({isDeleted: true}).catch(errorMsg => {
          //Later log in a file on fire base and remove it from the console
          console.log(errorMsg)
        })
      })
      state.games.reverse()
    },

    loadGameTagsArray({commit}) {
      commit('setLoadingState', true)

      firebase.database().ref('gameTagsArray').once('value').then(data => {
        commit('setGameTagsArray', data.val())
        commit('setLoadingState', false)
      }).catch(errorMsg => {
        console.log(errorMsg)
        commit('setLoadingState', false)
      })
    },

    addGameTag({state}, payload) {
      state.gameTagsArray.unshift(payload)

      firebase.database().ref('gameTagsArray').set(state.gameTagsArray).catch(errorMsg => {
        //Later log in a file on fire base and remove it from the console
        console.log(errorMsg)
      })
    },

    removeGameTags({commit, state}, payload) {
      payload.forEach(tag => {
        state.gameTagsArray = state.gameTagsArray.filter(e => e !== tag)
      })

      firebase.database().ref('gameTagsArray').set(state.gameTagsArray).catch(errorMsg => {
        //Later log in a file on fire base and remove it from the console
        console.log(errorMsg)
      })
    }
  },
  getters: {
    getGames(state) {
      return state.games.reverse()
    },

    getGameTagsArray(state) {
      return state.gameTagsArray
    },

    getSelectedGame(state) {
      return (gameTitle) => {
        return state.games.find((game) => {
          return game.title === gameTitle
        })
      }
    }
  }
}
