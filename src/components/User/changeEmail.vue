<template>
  <v-container fluid>
    <app-loading v-if="loading"></app-loading>
    <form v-else @submit.prevent="onEmailChange" class="form secondary">
      <v-layout justify-center row>
        <p class="headerTitle">Смени емайл</p>
      </v-layout>
      <v-layout justify-center row mt-2 v-if="error">
        <app-alert @dismissed="onDismissed" :errorMessage="error"></app-alert>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="newEmail"
            label="Нов емайл"
            id="newEmail"
            v-model="newEmail"
            type="email"
            required>
          </v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row justify-center fluid wrap>
        <v-btn type="submit" color="primary">Потвърди</v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        newEmail: ''
      }
    },
    computed: {
      error() {
        return this.$store.getters.getError
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    methods: {
      onEmailChange() {
        this.$store.dispatch('changeEmail', this.newEmail)
          this.successfulEmailChange()
      },
      successfulEmailChange()
      {
        let that = this
        setTimeout(() => {
          if(!that.$store.getters.error) {
            that.$emit('successEmailChange', {toggle: false, message: 'Успешно сменихте емайла си :)\nЕмай за потвърждение беше изпратен!'})
            that.$store.dispatch('sendUserVerificationMail')
          }
        },1000)
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
