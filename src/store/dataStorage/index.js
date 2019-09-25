//import {games} from "./data/gameSeed"
//import {services} from "./data/servicesSeed"
// import {lostGoods} from "./data/lostGoodsSeed"
//import {galleryImages} from "./data/galleryImagesSeed"
import {topNavItems} from "./data/topNavItemsSeed"
import * as firebase from 'firebase'

export default {
  state: {
    topNavItems: topNavItems,
    galleryImages: [],
    lostGoods: [],
    games: [],
    gameTagsArray: [],
    services: []
  },

  mutations: {
    setLoadedGames (state, payload) {
      state.games = payload
    },

    setGameTagsArray (state, payload) {
      state.gameTagsArray = payload
    },

    setLoadedServices (state, payload) {
      state.services = payload
    },

    setLoadedGalleryImages (state, payload) {
      state.galleryImages = payload
    },

    setLoadedLostGoods (state, payload) {
      state.lostGoods = payload
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
    //   state.games.shift()
    //   state.games.forEach(game => {
    //     let gameTags = []
    //     game.tags.forEach(tag => {
    //       if (tag) {
    //         gameTags.push(tag)
    //       }
    //     })
    //     firebase.database().ref('games').child(game.id + "/tags").set(gameTags).
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

    // setServices () {
    //   services.forEach((service) => {
    //     firebase.database().ref('services').push({
    //       "title": service.title,
    //       "subDescription": service.subDescription,
    //       "description": service.description,
    //       "imageUrl": service.imageUrl
    //     })
    //       .then((data) => {
    //         if (service.backgroundColor) {
    //           firebase.database().ref('services').child(data.key).update({
    //             "backgroundColor": service.backgroundColor
    //           })
    //             .catch((error) => {
    //               console.log(error)
    //             })
    //         }
    //         if (service.price) {
    //           let serviceID = data.key
    //           firebase.database().ref('services').child(data.key + "/price").set({
    //             "color": service.price.color,
    //             "index": service.price.index,
    //             "order": service.price.order
    //           })
    //             .then((data) => {
    //               service.price.priceDetails.forEach((priceDetail) => {
    //                 firebase.database().ref('services').child(serviceID + "/price/priceDetails").push({
    //                   "serviceName": priceDetail.serviceName,
    //                   "servicePrice": priceDetail.servicePrice
    //                 })
    //                   .catch((error) => {
    //                     console.log(error)
    //                   })
    //               })
    //             })
    //             .catch((error) => {
    //               console.log(error)
    //             })
    //         }
    //       })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //   })
    // },

    // setGalleryImages () {
    //   galleryImages.forEach((galleryImage) => {
    //     firebase.database().ref('galleryImages').push({
    //       "src": galleryImage.src,
    //       "index": galleryImage.index
    //     })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   })
    // },

    // setLostGoods () {
    //   lostGoods.forEach((lostGood) => {
    //     firebase.database().ref('lostGoods').push({
    //       "title": lostGood.title,
    //       "imageUrl": lostGood.imageUrl,
    //       "dateFound": lostGood.dateFound,
    //       "color": lostGood.color,
    //       "description": lostGood.description,
    //       "showDescription": lostGood.showDescription
    //     })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   })
    // },

    loadGames ({commit}) {
      commit('setLoadingState', true)
      firebase.database().ref('games').once('value')
        .then((data) => {
          const gamesData = []
          const gamesObj = data.val()

          Object.keys(gamesObj).forEach((gameKey) => {

            gamesData.push({
              id: gameKey,
              title: gamesObj[gameKey].title,
              creator: gamesObj[gameKey].creator,
              description: gamesObj[gameKey].description,
              tags: gamesObj[gameKey].tags,
              imageUrl: gamesObj[gameKey].imageUrl,
              trailer: gamesObj[gameKey].trailer
            })
          })
          commit('setLoadedGames', gamesData)
          commit('setLoadingState', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingState', false)
        })
    },

    loadGameTagsArray ({commit}) {
      commit('setLoadingState', true)

      firebase.database().ref('gameTagsArray').once('value').
        then(data => {
        commit('setGameTagsArray', data.val())
        commit('setLoadingState', false)
      }).catch(errorMsg => {
        console.log(errorMsg)
        commit('setLoadingState', false)
      })
    },

    loadServices({commit}) {
      commit('setLoadingState', true)
      firebase.database().ref('services').once('value')
        .then((data) => {
          const servicesData = []
          const servicesObj = data.val()

          Object.keys(servicesObj).forEach((serviceKey) => {
            servicesData.push({
              id: serviceKey,
              title: servicesObj[serviceKey].title,
              subDescription: servicesObj[serviceKey].subDescription,
              description: servicesObj[serviceKey].description,
              imageUrl: servicesObj[serviceKey].imageUrl,
            })

            if ('backgroundColor' in servicesObj[serviceKey]) {
              servicesData[servicesData.length - 1].backgroundColor = servicesObj[serviceKey].backgroundColor
            }

            if ('price' in servicesObj[serviceKey]) {
              const priceDetails = []

              Object.keys(servicesObj[serviceKey].price.priceDetails).forEach((priceDetailKey) => {
                priceDetails.push({
                  serviceName: servicesObj[serviceKey].price.priceDetails[priceDetailKey].serviceName
                })

                if ('servicePrice' in servicesObj[serviceKey].price.priceDetails[priceDetailKey]) {
                  priceDetails[priceDetails.length - 1].servicePrice = servicesObj[serviceKey].price.priceDetails[priceDetailKey].servicePrice
                }
                else {
                  priceDetails[priceDetails.length - 1].servicePrice = null
                }
              })

              servicesData[servicesData.length - 1].price = {
                color: servicesObj[serviceKey].price.color,
                index: servicesObj[serviceKey].price.index,
                order: servicesObj[serviceKey].price.order,
                priceDetails: priceDetails
              }
            }
          })

          commit('setLoadedServices', servicesData)
          commit('setLoadingState', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingState', false)
        })
    },

    loadGalleryImages ({commit}) {
      commit('setLoadingState', true)
      firebase.database().ref('galleryImages').once('value')
        .then((data) => {
          const galleryImagesData = []
          const galleryImagesObj = data.val()

          Object.keys(galleryImagesObj).forEach((imageKey) => {
            galleryImagesData.push({
              id: imageKey,
              src: galleryImagesObj[imageKey].src,
              index: galleryImagesObj[imageKey].index
            })
          })
          commit('setLoadedGalleryImages', galleryImagesData)
          commit('setLoadingState', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingState', false)
        })
    },

    loadLostGoods ({commit}) {
      commit('setLoadingState', true)
      firebase.database().ref('lostGoods').once('value')
        .then((data) => {
          const lostGoodsData = []
          const lostGoodsObj = data.val()

          Object.keys(lostGoodsObj).forEach((lostGoodKey) => {
            lostGoodsData.push({
              id: lostGoodKey,
              title: lostGoodsObj[lostGoodKey].title,
              imageUrl: lostGoodsObj[lostGoodKey].imageUrl,
              dateFound: lostGoodsObj[lostGoodKey].dateFound,
              color: lostGoodsObj[lostGoodKey].color,
              description: lostGoodsObj[lostGoodKey].description,
              showDescription: lostGoodsObj[lostGoodKey].showDescription
            })
          })
          commit('setLoadedLostGoods', lostGoodsData)
          commit('setLoadingState', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoadingState', false)
        })
    },

    updateGame ({commit}, payload) {
      const selectedGameKey = payload.selectedGameInfo.id
      delete payload.selectedGameInfo.id
      if (payload.uploadedImage) {
        const uploadedImageName = payload.uploadedImage.name
        const uploadedImageExt = uploadedImageName.slice(uploadedImageName.lastIndexOf('.'))

        firebase.storage().
        ref('games/' + selectedGameKey + '.' + uploadedImageExt).
        put(payload.uploadedImage).
        then(fileData => {
          fileData.ref.getDownloadURL().then(url => {
            payload.selectedGameInfo.imageUrl = url
            firebase.database().ref('games').child(selectedGameKey).update(payload.selectedGameInfo).
            catch(errorMsg => {
              //Later log in a file on fire base and remove it from the console
              console.log(errorMsg)
            })
          })
        })
      }
      else {
        firebase.database().ref('games').child(selectedGameKey).update(payload.selectedGameInfo).
        catch(errorMsg => {
          //Later log in a file on fire base and remove it from the console
          console.log(errorMsg)
        })
      }
    }
  },
  getters: {
    getTopNavItems(state) {
      return state.topNavItems
    },

    getServices(state) {
      return state.services
    },

    getDisplayedServices(state) {
      return state.services.slice(1, state.services.length)
    },

    getSelectedService(state) {
      return (serviceId) => {
        return state.services.find((service) => {
          return service.id === serviceId
        })
      }
    },

    getGames(state) {
      return state.games
    },

    getGameTagsArray (state) {
      return state.gameTagsArray
    },

    getSelectedGame(state) {
      return (gameTitle) => {
        return state.games.find((game) => {
          return game.title === gameTitle
        })
      }
    },

    getLostGoods(state) {
      return state.lostGoods
    },

    getGalleryImages(state) {
      return state.galleryImages
    }
  }
}
