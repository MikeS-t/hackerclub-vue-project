import * as firebase from 'firebase'

export default {
  state: {
    galleryImages: []
  },
  mutations: {
    setLoadedGalleryImages(state, payload) {
      state.galleryImages = payload
    }
  },
  actions: {
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

    loadGalleryImages({commit}) {
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
    }
  },
  getters: {
    getGalleryImages(state) {
      return state.galleryImages
    }
  }
}
