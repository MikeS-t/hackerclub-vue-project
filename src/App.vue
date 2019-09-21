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
  @import url("./vuetifyCustomizations.css");

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

</style>
