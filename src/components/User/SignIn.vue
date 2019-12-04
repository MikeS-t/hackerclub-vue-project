<template>
  <v-container fluid>
    <app-loading v-if="loading"></app-loading>
    <form v-else @submit.prevent="onSignIn" class="form secondary">
      <v-layout justify-center row>
        <p class="headerTitle">Вход</p>
      </v-layout>
      <v-layout justify-center row mt-2 v-if="error">
        <app-alert @dismissed="onDismissed" :errorMessage="error"></app-alert>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="email"
            label="Емайл"
            id="email"
            v-model="email"
            type="email"
            :rules="emailRules"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="password"
            label="Парола"
            id="password"
            v-model="password"
            type="password"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-between fluid wrap>
        <v-btn color="info" @click="switchToSignUp">Регистрация</v-btn>
        <v-btn type="submit" color="primary">Вход</v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.getCurrentUser
      },
      error() {
        return this.$store.getters.getError
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      currentUser(value) {
        if (value !== null && value !== undefined) {
          this.successfulSignIn()
        }
      }
    },
    methods: {
      onSignIn() {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      switchToSignUp() {
        this.$emit('switchToSignUp', false)
      },
      successfulSignIn()
      {
        this.$store.dispatch('checkUserVerification')
        let userEmailNotVerifyed = ''
        if(!this.$store.getters.isUserVerified){
          userEmailNotVerifyed = '\nЕмайлът ви не е потвърден.'
        }

        this.$emit('successfulSignIn', { toggle: false, message: 'Добре дощли отново :)' + userEmailNotVerifyed})
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped>
  .form {
    border-radius: 3.21vh; /*25px*/
    padding: 3.85vh; /*30px*/
  }

  .headerTitle {
    margin: 0;
    font-size: 3.6vh; /*28px*/
    padding: 1.29vh 3.47vw; /*10px 50px*/
    border-radius: 6.43vh; /*50px*/
    border: 0.52vh solid gray; /*4px*/
    color: lightgray;
  }

  @media only screen and (max-width: 1000px) {
    .form {
      border-radius: 25px;
      padding: 30px;
      overflow: hidden;
    }

    .headerTitle {
      margin: 0;
      font-size: 28px;
      padding: 10px 50px;
      border-radius: 50px;
      border: 4px solid gray;
      color: lightgray;
    }
  }
</style>
