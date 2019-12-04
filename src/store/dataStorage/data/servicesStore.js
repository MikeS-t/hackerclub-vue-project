import * as firebase from 'firebase'

export default {
  state: {
    services: []
  },
  mutations: {
    setLoadedServices(state, payload) {
      state.services = payload
    }
  },
  actions: {
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
  },
  getters: {
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
    }
  }
}
