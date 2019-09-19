<template>
  <v-alert
    @input="onClose"
    :value="true"
    error
    dismissible
    type="error">
    {{ errorMessage }}
  </v-alert>
</template>

<script>
  export default {
    props: ['errorMessage'],
    methods: {
      onClose() {
        this.$emit('dismissed')
      }
    }
  }
</script>
