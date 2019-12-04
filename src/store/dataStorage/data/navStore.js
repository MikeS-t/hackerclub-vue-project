import {topNavItems} from "./topNavItemsSeed"

export default {
  state: {
    topNavItems: topNavItems
  },
  getters: {
    getTopNavItems(state) {
      return state.topNavItems
    }
  }
}
