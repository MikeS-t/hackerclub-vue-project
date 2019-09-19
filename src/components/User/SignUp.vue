<template>
  <v-container fluid>
    <app-loading v-if="loading"></app-loading>
    <form v-else @submit.prevent="onSignUp" class="form secondary">
      <v-layout justify-center row>
        <p class="headerTitle">Регистрация</p>
      </v-layout>
      <v-layout justify-center row mt-2 v-if="error">
        <app-alert @dismissed="onDismissed" :errorMessage="error"></app-alert>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="email"
            label="Емейл"
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
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="confirmPassword"
            label="Потвърди паролата"
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            :rules="[comparePasswords]">
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-space-between fluid wrap>
        <v-btn color="info" @click="switchToSignIn">Вход</v-btn>
        <v-btn type="submit" color="primary">Регистрирай се</v-btn>
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
        confirmPassword: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    computed: {
      comparePasswords() {
        return this.password !== this.confirmPassword ? 'Passwords dont match' : ''
      },
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
          this.successfulSignUp()
        }
      }
    },
    methods: {
      onSignUp() {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
      },
      switchToSignIn() {
        this.$emit('switchToSignIn', true)
      },
      successfulSignUp()
      {
        this.$store.dispatch('sendUserVerificationMail')
        let verificationMessage = 'Емай за потвърждение\n беше изпратен!'
        if (this.$store.error){
          verificationMessage = this.$store.error
        }
        this.$emit('successfulSignUp', { toggle: false, message: 'Успешна регистраця! :)\n' + verificationMessage})
      },
      onDismissed() {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped>
  .form {
    border-radius: 25px;
    padding: 30px;
  }

  .headerTitle {
    margin: 0;
    font-size: 2rem;
    padding: 10px 50px;
    border-radius: 50px;
    border: 4px solid gray;
    color: lightgray;
  }
</style>
