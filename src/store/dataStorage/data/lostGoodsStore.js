import * as firebase from 'firebase'

export default {
  state: {
    lostGoods: []
  },

  mutations: {
    setLoadedLostGoods(state, payload) {
      state.lostGoods = payload
    }
  },
  actions: {
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

    loadLostGoods({commit}) {
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
    }
  },
  getters: {
    getLostGoods(state) {
      return state.lostGoods
    }
  }
}
