<template>
  <v-navigation-drawer
    @input="onDrawerClosed = $event"
    absolute
    temporary
    v-model="sideMenuToggle">
    <v-list>

      <v-list-tile key="Home" to="/">
        <v-list-tile-action>
          <v-icon left>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Начална страница</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        v-for="item in topNavItems"
        :key="item.title"
        :to="item.link">
        <v-list-tile-action>
          <v-icon left>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!--SingIn/Out Button-->

      <v-list-tile
        v-if="!userIsAuthenticated"
        @click.stop="authDialogToggle"
        key="Вход/Регистрация">
        <v-list-tile-action>
          <v-icon left>person_pin_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Вход / Регистрация</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!--Profile Section-->

      <v-divider
        v-if="userIsAuthenticated"
        style="margin-top: 20px">
      </v-divider>
      <v-subheader
        v-if="userIsAuthenticated"
        style="margin-left: 20px">
        Профил
      </v-subheader>

      <v-list-tile
        v-if="userIsAuthenticated"
        @click="onLogout"
        key="Изход">
        <v-list-tile-action>
          <v-icon left>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Изход</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!--Close Button-->

      <v-divider
        style="margin-top: 20px">
      </v-divider>

      <v-list-tile
        key="Close"
        @click="onDrawerClosed = false">
        <v-list-tile-action>
          <v-icon left>close</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Затвори</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data() {
      return {
        onDrawerClosed: null
      }
    },
    computed: {
      topNavItems() {
        return this.$store.getters.getTopNavItems.items
      },
      sideMenuToggle() {
        return this.$store.getters.getDrawerState
      },
      userIsAuthenticated() {
        let checkedUser = this.$store.getters.getCurrentUser
        return checkedUser !== null
      }
    },
    methods: {
      authDialogToggle() {
        this.$store.commit('authDialogToggle')
      },
      onLogout() {
        this.$store.dispatch('logOut')
      }
    },
    watch: {
      onDrawerClosed(value) {
        if (!value) {
          this.$store.commit('drawerToggle')
        }
      }
    }
  }
</script>
