<template>

  <!--Loader component-->

  <v-layout v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </v-layout>

  <div v-else>
    <img src="../../../static/Shared/editIcon.png" alt="listView"
         id="editIcon" @click="switchViews">
    <keep-alive>
      <component :is="visualizedComponent"></component>
    </keep-alive>
  </div>
</template>


<script>
  import standartGamesView from './StandartGamesView.vue'
  import editGamesView from './EditGamesView.vue'
  import fileUpload from './FileUpload'

  export default {
    data() {
      return {
        visualizedComponent: editGamesView
      }
    },
    computed: {
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
    },
    methods: {
      switchViews (){
        if (this.visualizedComponent === standartGamesView) {
          this.visualizedComponent = editGamesView
        }
        else {
          this.visualizedComponent = standartGamesView
        }
      }
    },
    created() {
      if (!this.$store.getters.getGames.length){
        this.$store.dispatch('loadGames')
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
    right: .2%;
    cursor: pointer;
    z-index: 5;
  }

</style>
