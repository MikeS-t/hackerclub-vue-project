<template>
  <div id="editGamesContainer">

    <v-combobox
      class="dropDown"
      :items="games"
      v-model="selectedGame"
      label="Select a game"
      item-text="title"
      item-value="id"
    ></v-combobox>

    <div id="selectedGameDetailsContainer">
      <div class="card">
        <div class="poster">
          <img :src="selectedGameObj.imageUrl" :alt="selectedGameObj.title">
        </div>
        <div class="details">
          <h2>{{ selectedGameObj.title }}
            <br>
            <span>{{ selectedGameObj.creator }}</span>
          </h2>
          <div class="tags">
                <span
                  v-for="tag in selectedGameObj.tags"
                  :key="tag.name"
                  :class="tag.color"
                  style="margin-right: 5px;"
                >
                  {{ tag.name }}
                </span>
          </div>
          <div class="description">
            <p>{{ selectedGameObj.description }}</p>
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
                  allow="autoplay; encrypted-media"
                  allowfullscreen>
                </iframe>
              </div>
            </v-dialog>
          </v-layout>

        </div>
      </div>

      <div id="detailsFromContainer">
        <div id="gameTitle">
          <v-text-field
            v-model="selectedGameObj.title"
            label="Title"
            clearable
          ></v-text-field>
        </div>

        <div id="gameCreator">
          <v-text-field
            v-model="selectedGameObj.creator"
            label="Creator"
            clearable
          ></v-text-field>
        </div>

        <div id="gameDescription">
          <v-textarea
            v-model="selectedGameObj.description"
            auto-grow
            height="16.58vh"
            clearable
            label="Description"
          ></v-textarea>
        </div>

        <div id="gameImage">
          <app-file-upload
            :imageName="selectedGameObj.imageUrl"
            @imageUrl="selectedGameObj.imageUrl = $event"
            @rawImage="uploadedImage = $event"
          ></app-file-upload>
        </div>

        <div id="gameTrailer">
          <v-text-field
            v-model="selectedGameObj.trailer"
            label="Trailer Url"
            clearable
          ></v-text-field>
        </div>

        <div id="gameTags">
          <v-combobox
            v-model="selectedGameObj.tags"
            :items="gameTags"
            item-text="name"
            label="Game Tags"
            multiple
            chips
            tags
          ></v-combobox>
        </div>

        <div id="submitButton">
          <v-btn
            @click="onApplyChanges"
            color="primary">
            Приложи промените
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import fileUpload from './FileUpload'

  export default {
    data() {
      return {
        trailerURL: null,
        showTrailer: false,
        uploadedImage: null,
        errorMsg: null,
        gameTags: [
          'Multiplayer',
          'Single player',
          'First person',
          'Third person',
          'Shooter',
          'Builder',
          'Team-based',
          'MOBA',
          'RPG',
          'Action RPG',
          'Cardgame',
          'Strategy',
          'Doungen crawler',
          'Action adventure',
          'Creative',
          'Educational',
          'Openworld',
          'Suvival',
          'Adventure',
          'Horror',
          'Sports',
          'Add Custom Tag...'
        ]
      }
    },
    computed: {
      games() {
        return this.$store.getters.getGames || {}
      },
      selectedGame () {
        return this.games[0] || {}
      },
      selectedGameObj () {
        return this.games[0] || {}
      },
      isFormValid () {
        //Check if all validation match up
      }
    },
    watch: {
      selectedGame (value) {
        this.selectedGameObj = this.games.find((game) => {
          return game.id === value
        })

        this.trailerURL = this.selectedGameObj.trailer
      },
      selectedGameObj (value) {
        if (value.tags.includes('Add Custom Tag...')) {
          console.log('found it')
          this.selectedGameObj.tags.pop()
        }
      }
    },
    methods: {
      onApplyChanges () {
        // if (this.isFormValid()) {
        //   // Submmit an error msg
        //   return
        // }
        this.$store.dispatch('updateGame', {
          selectedGameInfo: this.selectedGameObj,
          uploadedImage: this.uploadedImage
        })
      }
    },
    components: {
      appFileUpload: fileUpload
    }
  }
</script>

<style scoped>

  #editGamesContainer {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  .dropDown {
    width: 30%;
    margin: 3vh auto;
  }

  #selectedGameDetailsContainer {
    /*background: #00c853;*/
    width: 90%;
    height: 65vh;
    margin: 0 auto 2vh;
    display: flex;
    justify-content: space-between;
  }

  #detailsFromContainer {
    background: rgba(0, 0, 0, 0.3);
    width: 54vw;
    height: 100%;
    display: grid;
    grid-template-columns: 46% 46% 8%;
    grid-template-rows: 25% 20% 20% 20% 15%;
    grid-template-areas:
      "title title title"
      "creator description ."
      "image tags ."
      "trailer tags ."
      "submit submit submit";
  }

  #detailsFromContainer *{
    font-size: 2.05vh; /*16px*/
  }

  #gameTitle {
    grid-area: title;
    justify-self: center;
    align-self: center;
    width: 17vw; /*245px*/
  }

  #gameCreator {
    grid-area: creator;
    align-self: start;
    justify-self: center;
    width: 60%;
    height: 6.42vh; /*50px*/
  }

  #gameDescription {
    grid-area: description;
    width: 100%;
  }

  #gameImage {
    display: inline;
    grid-area: image;
    align-self: center;
    margin-top: -10.5vh; /*81.69px*/
    margin-left: 0.1vw; /*1.44px*/
  }

  #gameTrailer {
    grid-area: trailer;
    align-self: center;
    justify-self: center;
    width: 60%;
    height: 6.42vh; /*50px*/
    margin-bottom: .6vh; /*4.67px*/
  }

  #gameTags {
    grid-area: tags;
    align-self: center;
    justify-self: start;
    width: 100%;
    height: 6.42vh; /*50px*/
  }

  #submitButton {
    grid-area: submit;
    align-self: center;
    justify-self: center;
    width: 17vw; /*245px*/
  }

  .card {
    margin-top: 5vh;
    position: relative;
    width: 27vw;
    min-width: 350px;
    height: 30vw;
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
    bottom: -10vw;
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
    margin-top: -0.2vw;
    font-size: 1.44vw;
    padding: 0 1.11vw!important;
  }

  .trailerButton i{
    font-size: 1.7vw;
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

</style>
