<template>
  <v-menu
    class="hidden-sm-and-down"
    bottom
    close-on-click
    origin="top center 0"
    transition="fade-transition">

    <v-btn class="moreButton" icon slot="activator">
      <v-icon class="moreButtonIcon">more_vert</v-icon>
    </v-btn>

    <v-list class="dropDownMenu">
      <v-list-tile
        v-for="item in moreButtonItems"
        :key="item.title"
        :to="item.link">
        <v-list-tile-action>
          <v-icon left>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-menu>
</template>

<script>
  export default {
    computed: {
      moreButtonItems() {
        let topNavItemsObject = this.$store.getters.getTopNavItems
        return topNavItemsObject.items.slice(topNavItemsObject.moreButtonStartIndex ,topNavItemsObject.items.length)
      }
    }
  }
</script>

<style scoped>

  .moreButton{
    width: 2vw;
    height: 3.5vh;
  }

  .moreButtonIcon{
    font-size: 1.5vw!important;
  }

  .dropDownMenu{
    margin-top: 3.5vw;
  }

  .dropDownMenu *{
    font-size: 1.2vw.5!important;
  }

  @media only screen and (max-width: 1440px) {
    .moreButtonIcon{
      font-size: 24px!important;
    }

    .dropDownMenu{
      margin-top: 50px;
    }

    .dropDownMenu *{
      font-size: 16px!important;
    }
  }

</style>
