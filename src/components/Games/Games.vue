<template>
  <!--Loader component-->

  <v-layout v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </v-layout>

  <div v-else>
    <!--<app-modify-icon-->
      <!--linkTo="modifyGames">-->
    <!--</app-modify-icon>-->

    <!--Dynamic Background-->

    <div
      class="background"
      :style="{ backgroundImage: 'url(' + bgImgUrl +')' }"
    ></div>

    <!--The grid with the game cards-->

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout justify-space-around wrap row>

            <!--The cards-->

            <app-game-card
              v-for="game in games"
              :key="game.id"
              :gameInfoObj="game"
              @bgImgUrl="bgImgUrl = $event">
            </app-game-card>

          </v-layout>
        </v-flex>
      </v-layout>

      <!--Pagination if needed-->
      <div v-if="paginationLength > 1"
           class="text-xs-center mt-4 paginationContainer">
        <v-pagination
          class="pagination"
          v-model="page"
          :length="paginationLength"
          circle
          color="primary"
        ></v-pagination>
      </div>

    </v-container>
  </div>
</template>

<script>
  import gameCard from './GameCard'
  import modifyIcon from '../Shared/ModifyIcon'

  export default {
    data() {
      return {
        page: 1,
        gameNumberStart: 0,
        gameNumberEnd: 6,
        paginationLength: null,
        bgImgUrl: null,
        trailerURL: null,
        showTrailer: false,
        gamesImgLoaded: false
      }
    },
    computed: {
      games() {
        return this.$store.getters.getGames.slice(this.gameNumberStart, this.gameNumberEnd)
      },
      loading() {
        // console.log(this.$store.getters.getLoadingState)
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      page(value) {
        this.gameNumberStart = (value - 1) * 6
        this.gameNumberEnd = value * 6
      },
      loading(value) {
        if (!value) {
          this.paginationLength = Math.ceil(this.$store.getters.getGames.length / 6)
        }
      }
    },
    methods: {
      onGameHover(gameTitle) {
        this.bgImgUrl = this.$store.getters.getSelectedGame(gameTitle).imageUrl
        this.trailerURL = this.$store.getters.getSelectedGame(gameTitle).trailer
      }
    },
    components: {
      appGameCard: gameCard,
      appModifyIcon: modifyIcon
    },
    created() {
      if (!this.$store.getters.getGames.length) {
        this.$store.dispatch('loadGames')
      } else {
        this.paginationLength = Math.ceil(this.$store.getters.getGames.length / 6)
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Kanit|Roboto|Prosto+One&subset=cyrillic');

  .background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -35%;
    right: 0;
    background-size: cover;
    z-index: 0;
  }

  .paginationContainer {
    position: relative;
    height: 2.92vw;
    min-height: 42px;
  }


</style>
