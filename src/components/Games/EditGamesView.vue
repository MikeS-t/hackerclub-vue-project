<template>
  <!--Loader component-->

  <div v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </div>

  <div v-else id="editGamesContainer">

    <v-combobox
      class="dropDown"
      :items="games"
      v-model="selectedGame"
      label="Select a game"
      item-text="title"
      item-value="id"
    ></v-combobox>

    <div id="selectedGameDetailsContainer">
      <div>
        <app-game-card
          :gameInfoObj="selectedGameObj">
        </app-game-card>
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
  import gameCard from './gameCard'


  export default {
    data() {
      return {
        trailerURL: null,
        showTrailer: false,
        uploadedImage: null,
        errorMsg: null,
        selectedGame: null,
        selectedGameObj: null
      }
    },
    computed: {
      games() {
        return this.$store.getters.getGames || {}
      },
      gameTags () {
        return this.$store.getters.getGameTagsArray || []
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      selectedGame (value) {
        if (value) {
          this.selectedGameObj = this.games.find((game) => {
            return game.id === value.id
          })
          this.trailerURL = this.selectedGameObj.trailer
        }
      },
      // selectedGameObj (value) {
      //   if (value) {
      //     if (value.tags.includes('Add Custom Tag...')) {
      //       this.selectedGameObj.tags.pop()
      //     }
      //   }
      // },
      loading(value) {
        if (!value) {
          this.selectedGame = this.games[0]
          this.selectedGameObj = this.games[0]
        }
      }
    },
    methods: {
      onApplyChanges () {
        this.$store.dispatch('updateGame', {
          selectedGameInfo: this.selectedGameObj,
          uploadedImage: this.uploadedImage
        })
      }
    },
    components: {
      appFileUpload: fileUpload,
      appGameCard: gameCard
    },
    created () {
      if (!this.$store.getters.getGames.length){
        this.$store.dispatch('loadGames')
      }
      else {
        this.selectedGame = this.games[0]
        this.selectedGameObj = this.games[0]
      }
      if (!this.$store.getters.getGameTagsArray.length){
        this.$store.dispatch('loadGameTagsArray')
      }
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

</style>
