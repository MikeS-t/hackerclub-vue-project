<template>
  <v-container fluid>
    <app-loading v-if="loading"></app-loading>
    <form v-else @submit.prevent="onPasswordChange" class="form secondary">
      <v-layout justify-center row>
        <p class="headerTitle">Смени паролата</p>
      </v-layout>
      <v-layout justify-center row mt-2 v-if="error">
        <app-alert @dismissed="onDismissed" :errorMessage="error"></app-alert>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="newPassword"
            label="Нова Парола"
            id="newPassword"
            v-model="newPassword"
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
        newPassword: '',
        confirmPassword: '',
      }
    },
    computed: {
      comparePasswords() {
        return this.newPassword !== this.confirmPassword ? 'Passwords dont match' : ''
      },
      error() {
        return this.$store.getters.getError
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    methods: {
      onPasswordChange() {
        this.$store.dispatch('changePassword', this.newPassword)
          this.successfulPasswordChange()
      },
      successfulPasswordChange()
      {
        if(!this.$store.getters.error) {
            this.$emit('successPasswordChange', {toggle: false, message: 'Успешно сменихте\n паролата си :)'})
        }
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
