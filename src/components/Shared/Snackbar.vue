<template>
  <v-snackbar
    id="snackbar"
    v-model="showSnackbar"
    multi-line
    color="success"
    top
    right
    absolute
    :timeout=3000>
    <p id="snackBarMsg">{{ snackbarMessage }}</p>
    <v-btn
      dark
      flat
      @click="showSnackbar = false">
      Затвори
    </v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    data() {
      return {
        showSnackbar: false
      }
    },
    props: {
      snackbarMessage: {
        type: String
      },
      activate: {
        type: Boolean
      }
    },
    watch: {
      activate() {
        this.showSnackbar = true
      }
    }
  }
</script>

<style scoped>

  #snackbar {
    top: 5vh;
  }

  #snackBarMsg {
    white-space: pre-line;
    text-align: center;
    margin: 0;
  }

</style>
