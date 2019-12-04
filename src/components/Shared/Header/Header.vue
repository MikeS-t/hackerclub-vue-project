<template>
  <div class="wrapper">

    <!--Top Navigation Menu-->
    <v-toolbar
      class="topNav"
      dark
      color="primary">

      <!--Hamburger menu-->
      <v-toolbar-side-icon
        class="hiddenAbove1220"
        @click.stop="sideMenuToggle"
      ></v-toolbar-side-icon>

      <!--Home Logo Button-->
      <v-spacer class="hiddenAbove1220"></v-spacer>
      <router-link
        to="/"
        tag="span"
        style="cursor: pointer">
        <img
          src="../../../../static/MiniLogo.png"
          class="miniLogo"
          alt="MiniHackerLogo">
      </router-link>

      <!--Menu Items-->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hiddenUnder1220" name="topNavBar">
        <v-btn flat large
               class="topNavItems"
               v-for="item in topNavItems"
               :key="item.title"
               :to="item.link">
          <v-icon left class="topNavIcons">{{ item.icon }}</v-icon>
          <span class="topNavItemsText">{{ item.title }}</span>
        </v-btn>

        <!--Register / Profile Buttons-->
        <v-btn
          class="hiddenUnder1220 topNavItems"
          v-if="!userIsAuthenticated"
          flat
          large
          @click.stop="showAuthDialog"
          key="Вход/Регистрация">
          <v-icon left class="topNavIcons">person_pin_circle</v-icon>
          <span class="topNavItemsText">Вход / Регистрация</span>
        </v-btn>
      </v-toolbar-items>

      <v-menu
        class="hiddenUnder1220"
        v-if="userIsAuthenticated"
        bottom
        close-on-click
        origin="top center 0"
        transition="fade-transition">

        <v-btn
          class="topNavItems"
          flat large
          slot="activator"
          dark>
          <v-icon left class="topNavIcons">account_circle</v-icon>
          <span class="topNavItemsText">Профил</span>
        </v-btn>

        <v-list class="dropDownMenu">
          <v-list-tile
            @click="showChangePasswordDialog"
            key="Смяна на паролата">
            <v-list-tile-action>
              <v-icon left class="topNavIcons">lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Смяна на паролата</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

            <v-list-tile
              @click="showChangeEmailDialog"
              key="Смяна на емайл">
              <v-list-tile-action>
                <v-icon left class="topNavIcons">email</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Смяна на емайл</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

          <v-list-tile
            @click="onLogout"
            key="Изход">
            <v-list-tile-action>
              <v-icon left class="topNavIcons">exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Изход</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

      </v-menu>

    <!--More Button-->
      <app-more-button></app-more-button>

    </v-toolbar>

    <!--Authentication dialog form-->
    <v-dialog
      @input="onAuthDialogClosed = $event"
      v-if="authDialogState"
      v-model="authDialogState"
      width="400px">
      <app-sign-in
        v-if="signInAndUpToggle"
        @switchToSignUp="signInAndUpToggle = $event"

        @successfulSignIn="showAuthDialog();
              snackbar = !$event.toggle;
              snackbarMessage = $event.message">
      </app-sign-in>
      <app-sign-up
        v-else
        @switchToSignIn="signInAndUpToggle = $event"

        @successfulSignUp="showAuthDialog();
              snackbar = !$event.toggle;
              snackbarMessage = $event.message">
      </app-sign-up>
    </v-dialog>

    <!--Change password dialog window-->
    <v-dialog
      @input="onChangePasswordDialogClosed = $event"
      v-if="changePasswordDialogState"
      v-model="changePasswordDialogState"
      width="400px">
      <app-change-password
        @successPasswordChange="showChangePasswordDialog();
              snackbar = !$event.toggle;
              snackbarMessage = $event.message">
      </app-change-password>
    </v-dialog>

    <!--Change email dialog window-->
    <v-dialog
      @input="onChangeEmailDialogClosed = $event"
      v-if="changeEmailDialogState"
      v-model="changeEmailDialogState"
      width="400px">
      <app-change-email
        @successEmailChange="showChangeEmailDialog();
              snackbar = !$event.toggle;
              snackbarMessage = $event.message">
      </app-change-email>
    </v-dialog>

    <!--Snackbar success messages-->
    <v-snackbar
      style="margin-top: 39px"
      v-model="snackbar"
      multi-line
      color="success"
      top
      right
      absolute
      :timeout=3000>
      <p class="snackBarMessage">{{ snackbarMessage }}</p>
      <v-btn
        dark
        flat
        @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import SignIn from '../../User/SignIn.vue'
  import SignUp from '../../User/SignUp.vue'
  import ChangePassword from '../../User/changePassword.vue'
  import ChangeEmail from '../../User/changeEmail.vue'
  import MoreButton from '../Header/MoreButton.vue'

  export default {
    data() {
      return {
        snackbar: false,
        snackbarMessage: '',
        signInAndUpToggle: true,
        onAuthDialogClosed: null,
        onChangePasswordDialogClosed: null,
        onChangeEmailDialogClosed: null
      }
    },
    computed: {
      topNavItems() {
        let topNavItemsObject = this.$store.getters.getTopNavItems
        return topNavItemsObject.items.slice(0, topNavItemsObject.moreButtonStartIndex)
      },
      userIsAuthenticated() {
        let checkedUser = this.$store.getters.getCurrentUser
        return checkedUser !== null
      },
      authDialogState() {
        return this.$store.getters.getAuthDialogState
      },
      changePasswordDialogState() {
        return this.$store.getters.getChangePasswordDialogState
      },
      changeEmailDialogState() {
        return this.$store.getters.getChangeEmailDialogState
      }
    },
    methods: {
      showAuthDialog() {
        this.$store.commit('authDialogToggle')
      },
      showChangePasswordDialog() {
        this.$store.commit('changePasswordDialogToggle')
      },
      showChangeEmailDialog() {
        this.$store.commit('changeEmailDialogToggle')
      },
      sideMenuToggle() {
        this.$store.commit('drawerToggle')
      },
      onLogout() {
        this.$store.dispatch('logOut')
      }
    },
    components: {
      appSignIn: SignIn,
      appSignUp: SignUp,
      appChangePassword: ChangePassword,
      appChangeEmail: ChangeEmail,
      appMoreButton: MoreButton
    },
    watch: {
      authDialogState(value) {
        if (value === false) {
          this.signInAndUpToggle = true
          this.$store.dispatch('clearError')
        }
      },
      onAuthDialogClosed(value) {
        if (!value) {
          this.$store.commit('authDialogToggle')
        }
      },
      changePasswordDialogState(value) {
        if (value === false) {
          this.$store.dispatch('clearError')
        }
      },
      onChangePasswordDialogClosed(value) {
        if (!value) {
          this.$store.commit('changePasswordDialogToggle')
        }
      },
      changeEmailDialogState(value) {
        if (value === false) {
          this.$store.dispatch('clearError')
        }
      },
      onChangeEmailDialogClosed(value) {
        if (!value) {
          this.$store.commit('changeEmailDialogToggle')
        }
      }
    }
  }
</script>

<style scoped>

  @import url('https://fonts.googleapis.com/css?family=Marmelad&subset=cyrillic');

  .hiddenAbove1220 {
    display: none;
  }

  .hiddenUnder1220 {
    display: inline;
  }

  .wrapper {
    position: relative;
    z-index: 1;
  }

  .topNav {
    height: 8vh!important;
    position: relative!important;
  }

  .miniLogo {
    margin: 1.3vh auto 0;
    height: 7.8vh;
    min-height: 60px;
    width: 10.45vw;
    min-width: 150px;
    transition-duration: 1s;
  }

  .miniLogo:hover {
    transform: scale(1.5) rotate(8deg);
  }

  .topNavItems {
    height: 8vh!important;
    padding: 0 2.22vw!important;
  }

  .topNavItemsText{
    text-shadow: .5px 1px rgba(0, 0, 0, 0.5);
    font-size: 1.07vw;
  }

  .topNavIcons{
    font-size: 1.5vw!important;
  }

  .dropDownMenu{
    margin-top: 3.5vw;
  }

  .dropDownMenu *{
    font-size: 1.1vw!important;
  }

  .snackBarMessage {
    margin: 0;
    font-family: 'Marmelad', sans-serif;
    font-size: 1.2rem;
    white-space: pre-line;
    text-align: center;
  }

  @media only screen and (max-height: 670px) {
    .topNav, .topNavItems {
      height: 55px!important;
    }
  }

  @media only screen and (max-width: 1440px) {
    .topNavItemsText{
      font-size: 15.5px;
    }

    .topNavIcons{
      font-size: 24px!important;
    }

    .topNavItems {
      padding: 0 32px!important;
    }

    .dropDownMenu{
      margin-top: 50px;
    }

    .dropDownMenu *{
      font-size: 16px!important;
    }
  }

  @media only screen and (max-width: 1220px) {

    .hiddenAbove1220 {
      display: inline;
    }

    .hiddenUnder1220 {
      display: none;
    }

  }

  @media only screen and (max-width: 732px) {
    .miniLogo {
      margin-top: 15px;
    }
    .topNav, .topNavItems {
      height: 55px!important;
    }

    .miniLogo {
      height: 60px;
      width: 150px;
    }

  }
</style>
