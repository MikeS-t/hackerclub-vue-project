<template>

  <!--Loader component-->
  <div v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </div>

  <div v-else id="modifyServicesContainer">

      <v-combobox
        v-if="editGamesMode || addNewGameMode"
        v-model="selectedGameObj"
        class="dropDown"
        :items="games"
        item-text="title"
        item-value="id"
        label="Избрана игра"
        placeholder="Изберете тагове за премахване"
        :readonly="addNewGameMode"
      ></v-combobox>
      <v-combobox
        v-else
        class="dropDown"
        v-model="removeGameList"
        :items="games"
        item-text="title"
        item-value="id"
        label="Игри за премахване"
        placeholder="Изберете тагове за премахване"
        :error-messages="errorMsgs.selectedGame"
        @click="errorMsgs.selectedGame = ''"
        counter="6"
        multiple
      ></v-combobox>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        //Edit view mode
        addNewServiceMode: false,
        editServiceMode: true,
        deleteServiceMode: false,
        //Service info
        selectedServiceObj: {},
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

    },
    components: {

    },
    created() {
      if (!this.$store.getters.getServices.length){
        this.$store.dispatch('loadServices')
      }
    }
  }
</script>

<style scoped>

  #modifyServicesContainer {
    min-height: 86.5vh;
    display: flex;
    flex-direction: column;
  }

</style>
