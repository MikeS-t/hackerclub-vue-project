/* eslint-disable semi */
import Home from './components/Home/Home.vue'
import Services from './components/Services/Services.vue'
import Service from './components/Services/Service.vue'
import PriceList from './components/Services/PriceList.vue'
import Games from './components/Games/Games.vue'
import EditGames from './components/Games/EditGamesView.vue'
import Contacts from './components/Contacts.vue'
import Booking from './components/Booking.vue'
import LostGoods from './components/LostGoods.vue'
import Gallery from './components/Gallery.vue'

export const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/services', name: 'Services', component: Services },
  { path: '/services/:id', name: 'Service', props: true, component: Service },
  { path: '/priceList', name: 'PriceList', component: PriceList },
  { path: '/games', name: 'Games', component: Games },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/lostGoods', name: 'LostGoods', component: LostGoods },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/editGames', name: 'EditGames', component: EditGames }
];
