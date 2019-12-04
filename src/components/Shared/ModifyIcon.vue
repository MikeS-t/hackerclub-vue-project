<template>
  <router-link :to="'/' + linkTo">
    <img src="../../../static/Shared/editIcon.png"
         alt="editView"
         id="editIcon">
  </router-link>
</template>

<script>
  export default {
    props: {
      linkTo: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>

  #editIcon {
    width: 3vw;
    min-width: 40px;
    height: 5vh;
    min-height: 30px;
    position: absolute;
    right: .4vw;
    top: 9vh;
    cursor: pointer;
    z-index: 5;
  }

</style>
