import servicesStore from './data/servicesStore'
import gamesStore from './data/gamesStore'
import galleryStore from './data/galleryStore'
import lostGoodsStore from './data/lostGoodsStore'
import navStore from './data/navStore'
import KPStore from './data/KPStore'

export default {
  modules: {
    servicesStore: servicesStore,
    gamesStore: gamesStore,
    galleryStore: galleryStore,
    lostGoodsStore: lostGoodsStore,
    navStore: navStore,
    KPStore: KPStore,
  }
}
