<template>
  <div>
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

            <div
              v-for="game in games"
              :key="game.id"
              @mouseenter="onGameHover(game.title)"
              class="card">
              <div class="poster">
                <img :src="game.imageUrl" :alt="game.title">
              </div>
              <div class="details">
                <h2>{{ game.title }}
                  <br>
                  <span>{{ game.creator }}</span>
                </h2>
                <div class="tags">
                <span
                  v-for="tag in game.tags"
                  :key="tag.name"
                  :class="tag.color"
                  style="margin-right: 5px;"
                >
                  {{ tag.name }}
                </span>
                </div>
                <div class="description">
                  <p>{{ game.description }}</p>
                </div>

                <!--Trailer button-->

                <v-layout align-end justify-end row>
                  <v-btn
                    class="trailerButton"
                    color="primary"
                    hide-overlay
                    lazy
                    @click.stop="showTrailer = true">
                    <v-icon left>visibility</v-icon>
                    Trailer
                  </v-btn>

                  <!--Dialog window with the trailer-->

                  <v-dialog
                    v-if="showTrailer"
                    v-model="showTrailer"
                    width="100vh">
                    <div class="dialogContainer">
                      <img src="../../../static/GameImages/TheXButton.png"
                           class="closeButton"
                           @click.stop="showTrailer = false"
                           alt="CloseTrailer">
                      <iframe
                        class="trailer"
                        :src="'https://www.youtube.com/embed/' + trailerURL"
                        frameborder="0"
                        allow="autoplay;encrypted-media"
                        allowfullscreen>
                      </iframe>
                    </div>
                  </v-dialog>
                </v-layout>

              </div>
            </div>
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
  export default {
    data() {
      return {
        page: 1,
        gameNumberStart: 0,
        gameNumberEnd: 6,
        paginationLength: null,
        bgImgUrl: null,
        trailerURL: null,
        showTrailer: false
      }
    },
    computed: {
      games() {
        return this.$store.getters.getGames.slice(this.gameNumberStart, this.gameNumberEnd)
      },
      loading() {
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
    created() {
      if (!this.$store.getters.getGames.length){
        this.$store.dispatch('loadGames')
      }
      else {
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

  .card {
    margin-top: 5vw;
    position: relative;
    width: 27vw;
    min-width: 350px;
    height: 29.17vw;
    min-height: 420px;
    background: #000;
    overflow: hidden;
    box-shadow: 0 0.347vw 0.7vw rgba(0, 0, 0, 0.5);
    transition: 0.5s;
  }

  .card .poster {
    position: relative;
    overflow: hidden;
  }

  .card .poster img {
    width: 100%;
    height: 20.8vw;
    min-height: 300px;
    transition: 0.5s;
  }

  .card:hover .poster img {
    filter: blur(2px);
    transform: translateY(-3.47vw);
  }

  .card .poster:before {
    content: '';
    position: absolute;
    bottom: -15.28vw;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #000 90%, transparent);
    transition: 0.5s;
    z-index: 1;
  }

  .card:hover .poster:before {
    bottom: -8.3vw;
  }

  .details {
    position: absolute;
    padding: 1.39vw;
    width: 100%;
    height: 78%;
    bottom: -9.72vw;
    left: 0;
    box-sizing: border-box;
    transition: 0.5s;
    z-index: 2;
  }

  .card:hover .details {
    bottom: 2.08vw;
  }

  .details h2 {
    color: #fff;
    padding: 0;
    font-size: 2.22vw;
    font-family: 'Kanit', sans-serif;
    line-height: 2.8vw;
    margin: 1.39vw 0 0;
  }

  .details h2 span {
    color: #ff9800;
    font-size: 1.4vw;
    font-family: 'Prosto One', cursive;
  }

  .tags {
    position: relative;
    margin-top: 1.39vw;
    margin-bottom: 0.7vw;
  }

  .tags span {
    padding: 0.14vw 0.35vw;
    margin-right: 0.14vw;
    color: #fff;
    display: inline-block;
    border-radius: 0.28vw;
    font-size: 1.11vw;
  }

  .description {
    color: #fff;
    height: 47%;
  }

  .description p {
    margin: 1.04vw 0 0.7vw;
    font-size: 1.22vw;
    font-family: 'Roboto', sans-serif;
  }

  .trailerButton{
    width: 9.72vw;
    min-width: 140px;
    height: 2.2vw;
    min-height: 36px;
    margin-top: -0.1vw;
    font-size: 1.44vw;
    padding: 0 1.11vw!important;
  }

  .trailerButton i{
    font-size: 1.7vw;
  }

  .paginationContainer {
    position: relative;
    height: 2.92vw;
    min-height: 42px;
  }

  /*Trailer dialog section*/

  .dialogContainer {
    position: relative;
    width: 100%;
    height: 51vh;
  }

  .closeButton {
    width: 2.8vw;
    min-width: 40px;
    height: 2.8vw;
    min-height: 40px;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
  }

  .trailer {
    width: 100%;
    height: 50vh;
  }

  @media only screen and (max-width: 1440px) {

    .card {
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    }

    .card .poster:before {
      bottom: -220px;
    }

    .card:hover .poster img {
      transform: translateY(-50px);
    }

    .card:hover .poster:before {
      bottom: -120px;
    }

    .details {
      padding: 20px;
      bottom: -140px;
    }

    .card:hover .details {
      bottom: 30px;
    }

    .details h2 {
      font-size: 2rem;
      line-height: 40px;
      margin: 20px 0 0;
    }

    .details h2 span {
      font-size: 1.3rem;
    }

    .tags {
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .tags span {
      padding: 2px 5px;
      margin-right: 2px;
      border-radius: 4px;
      font-size: 1rem;
    }

    .description p {
      margin: 15px 0 10px;
      font-size: 1.2rem;
    }

    .trailerButton{
      margin-top: -5px;
      font-size: 1.3rem;
      padding: 0 16px!important;
    }

    .trailerButton i{
      font-size: 24px;
    }

  }

  @media only screen and (max-width: 600px) {
    .trailer {
      height: 35vh;
    }

    .dialogContainer {
      height: 36vh;
    }
  }
</style>
