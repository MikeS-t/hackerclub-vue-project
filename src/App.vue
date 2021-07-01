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

<style lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
  @import url("./vuetifyCustomizations.css");
  @import "sharedVariables";

  html {
    scrollbar-color: #7f7f7f black; /* thumb and track color */
    scrollbar-width: thin;
    overflow-y: auto;
  }

  header {
    height: 8vh;
  }

  main {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  footer {
    height: 25vh;
  }

  /*Some shared classes*/

  .loadContainer {
    width: 100%;
    min-height: 70vh;
  }

  .loader {
    top: calc(50% - 125px);
    color: $primary;
  }

  .noPadding {
    padding: 0!important;
  }

  .minHeight {
    min-height: 67vh;
  }

  .minWidth {
    min-width: 320px;
  }

  a {
    text-decoration: none;
  }

</style>
