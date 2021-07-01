<template>
  <div id="wrapper">

    <!--Top Navigation Menu-->
    <v-toolbar id="topNav">

      <!--Hamburger menu-->
      <v-toolbar-side-icon
        class="hiddenAbove1220"
        @click.stop="sideMenuToggle"
      ></v-toolbar-side-icon>

      <!--Home Logo Button-->
      <v-spacer class="hiddenAbove1220"></v-spacer>
      <router-link to="/" tag="span" id="logoLink">
        <img
          src="../../../../static/MiniLogo.png"
          id="miniLogo"
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
          class="hiddenUnder1220 topNavItems"
          flat large
          slot="activator"
          dark>
          <v-icon left class="topNavIcons">account_circle</v-icon>
          <span class="topNavItemsText">Профил</span>
        </v-btn>

        <v-list id="dropDownMenu">
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
      id="snackBar"
      v-model="snackbar"
      multi-line
      color="success"
      top
      right
      absolute
      :timeout=3000>
      <p id="snackBarMessage">{{ snackbarMessage }}</p>
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

<style lang="scss" scoped>
  @import "../../../sharedVariables";
  @import url('https://fonts.googleapis.com/css?family=Marmelad&subset=cyrillic');

  #wrapper {
    position: relative;
    z-index: 2;

    #topNav {
      background-image: linear-gradient(to bottom,
        $primary,
        mix($primary, $midColor),
        $midColor);
      height: 8vh !important; /*60.32px*/
      position: relative !important;
      box-shadow: inset 0 .3vw .7vw .01vw black, 0 3px 10px -2px black;; /*4.608px 10.75px 0.1536px*/


      .hiddenAbove1220 {
        display: none;
      }

      .hiddenUnder1220 {
        display: inline;

        .topNavItems {
          height: 8vh !important; /*60.32px*/
          padding: 0 2.22vw !important; /*34.0992px*/

          .topNavItemsText {
            text-shadow: .5px 1px rgba(0, 0, 0, 0.5);
            font-size: 1.07vw; /*16.4352px*/
          }

          .topNavIcons {
            font-size: 1.5vw !important; /*23.04px*/
          }
        }

        #dropDownMenu {
          margin-top: 3.5vw; /*53.76px*/

          * {
            font-size: 1.1vw !important; /*16.896px*/
          }
        }
      }

      #logoLink {
        cursor: pointer;

        #miniLogo {
          margin: 2vh auto 0; /*15.08px*/
          height: 6vh; /*45.24px*/
          min-height: 40px;
          width: 8vw; /*122.88px*/
          min-width: 50px;
          transition-duration: 1s;

          &:hover {
            transform: scale(1.5) rotate(8deg);
          }
        }
      }
    }

    #snackBar {
      margin-top: 39px;

      #snackBarMessage {
        margin: 0;
        font-family: 'Marmelad', sans-serif;
        font-size: 1.2rem;
        white-space: pre-line;
        text-align: center;
      }
    }
  }

  @media only screen and (max-height: 670px) {
    #wrapper #topNav, .hiddenUnder1220 .topNavItems {
      height: 55px !important;
    }
  }

  @media only screen and (max-width: 1440px) {
    #wrapper #topNav .hiddenUnder1220 {
      .topNavItems {
        padding: 0 32px !important;

        .topNavItemsText {
          font-size: 15.5px;
        }

        .topNavIcons {
          font-size: 24px !important;
        }
      }

      .dropDownMenu {
        margin-top: 50px;

        * {
          font-size: 16px !important;
        }
      }
    }
  }

  @media only screen and (max-width: 1220px) {
    #wrapper #topNav {
      .hiddenAbove1220 {
        display: inline;
      }

      .hiddenUnder1220 {
        display: none;
      }

      #logoLink #miniLogo {
        transform: translate(-3vw, 0);
        margin-top: 15px;
        height: 40px;
        width: 100px;
      }
    }
  }

  @media only screen and (max-width: 732px) {
    #wrapper #topNav {
      .hiddenUnder1220 .topNavItems {
        height: 55px !important;
      }
    }
  }
</style>
