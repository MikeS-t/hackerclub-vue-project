<template>
  <v-app dark>
    <header>
      <app-header></app-header>
      <app-nav-drawer></app-nav-drawer>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <app-footer></app-footer>
    </footer>
  </v-app>
</template>

<script>
  import Header from './components/Shared/Header/Header.vue'
  import Footer from './components/Shared/Footer.vue'
  import NavDrawer from './components/Shared/Header/NavDrawer.vue'

  export default {
    components: {
      appNavDrawer: NavDrawer,
      appHeader: Header,
      appFooter: Footer
    }
  }
</script>

<style>

  /*Some shared classes*/

  .loadContainer {
    width: 100%;
    min-height: 70vh;
  }

  .loader {
    top: calc(50% - 125px);
    color: #ee3d39;
  }

  .noPadding{
    padding: 0!important;
  }

  .minHeight{
    min-height: 69.9vh;
  }

  .minWidth{
    min-width: 320px;
  }

  /*This CSS styles are set for the Vuetify elements in this site they are set for different
  components*/

  /*Header.vue and MoreButton.vue*/

  /*.menuable__content__active*/
  /*{*/
    /*margin-top: 50px;*/
  /*}*/

  /*Header.vue*/

  .v-toolbar__content {
    height: 8vh!important;
  }

  .v-dialog:not(.v-dialog--fullscreen){
    max-height: 100%!important;
  }


  /*Home.vue Carousel*/

  .v-jumbotron__image{
    top: 1%!important;
    left: 0!important;
    width: 100%;
    -webkit-transform: translate(0, 0)!important;
    transform: translate(0, 0)!important;
    max-height: 100%!important;
    min-height: 40%!important;
  }

  .v-carousel__controls{
    cursor: auto;
  }

  .v-carousel__controls__item{
    height: 1.5vw!important;
    width: 1.5vw!important;
  }

  .v-carousel__controls__item .v-btn__content .v-icon{
    font-size: 1.2vw!important;
  }

  /*PriceList.vue*/

  .rightButton i, .leftButton i{
    font-size: 2.5vw!important;
  }

  /*Paginations*/
  /*.pagination .v-pagination .v-pagination--circle{*/
    /*width: 18.47vw;*/
    /*min-width: 266px;*/
    /*height: 2.92vw;*/
    /*min-height: 42px;*/
  /*}*/

  @media only screen and (max-width: 1440px) {
    /*Home.vue Carousel*/
    .v-carousel__controls__item{
      height: 23px!important;
      width: 23px!important;
    }

    .v-carousel__controls__item .v-btn__content .v-icon{
      font-size: 18px!important;
    }

    /*PriceList.vue*/
    .rightButton i, .leftButton i{
      font-size: 36px!important;
    }
  }

  @media only screen and (max-height: 700px) {
    /*Header.vue*/
    .v-toolbar__content {
      height: 55px!important;
    }
  }

  @media only screen and (max-width: 732px) {
    /*Header.vue*/
    .v-toolbar__content {
      height: 55px!important;
    }

    /*Home.vue Carousel*/

    .carousel{
      height: 465px!important;
    }

    .v-jumbotron__image{
      height: 300px!important;
    }

    .v-carousel__next, .v-carousel__prev{
      top: 150px!important;
    }

    .v-carousel__controls{
      height: 25px;
    }

  }

</style>
