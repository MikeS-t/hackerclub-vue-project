<template>
  <!--Loader component-->

  <div v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </div>

  <div v-else id="editGamesContainer">

    <div id="gameSelect">
      <v-combobox
        class="dropDown"
        :items="games"
        v-model="selectedGameObj"
        label="Select a game"
        item-text="title"
        item-value="id"
      ></v-combobox>
    </div>

    <div id="selectedGameDetailsContainer">

      <!--Game card component (game preview)-->

      <app-game-card
        :gameInfoObj="selectedGameObj">
      </app-game-card>


      <div id="detailsFromContainer">

        <!--Input fields (game info)-->

        <div id="gameTitle">
          <v-form ref="title">
            <v-text-field
              v-model="selectedGameObj.title"
              label="Title"
              clearable
              counter="100"
              :rules="[rules.required, rules.length100]"
            ></v-text-field>
          </v-form>
        </div>

        <div id="gameCreator">
          <v-form ref="creator">
            <v-text-field
              v-model="selectedGameObj.creator"
              label="Creator"
              clearable
              counter="100"
              :rules="[rules.required, rules.length100]"
            ></v-text-field>
          </v-form>
        </div>

        <div id="gameDescription">
          <v-form ref="description">
            <v-textarea
              v-model="selectedGameObj.description"
              auto-grow
              height="16.58vh"
              clearable
              label="Description"
              counter="500"
              :rules="[rules.required, rules.length500]"
            ></v-textarea>
          </v-form>
        </div>

        <div id="gameImage">
          <v-form ref="image">
            <app-file-upload
              :imageName="selectedGameObj.imageUrl"
              @imageUrl="selectedGameObj.imageUrl = $event"
              @rawImage="uploadedImage = $event"
              counter="100"
              :rules="[rules.required]"
            ></app-file-upload>
          </v-form>
        </div>

        <div id="gameTrailer">
          <v-form ref="trailer">
            <v-text-field
              v-model="selectedGameObj.trailer"
              label="Trailer Url"
              clearable
              counter="100"
              :rules="[rules.required, rules.length100]"
            ></v-text-field>
          </v-form>
        </div>

        <div id="gameTags">
          <v-form ref="tags">
            <v-combobox
              v-model="selectedGameObj.tags"
              :items="gameTags"
              label="Game Tags"
              multiple
              chips
              tags
              :rules="[rules.requiredCount, rules.count4]"
            ></v-combobox>
          </v-form>
        </div>

        <div id="submitButton">
          <v-btn
            @click="onApplyChanges"
            color="primary">
            Приложи промените
            <v-icon right dark>cloud_upload</v-icon>
          </v-btn>
        </div>

        <!--Add new custom tag dialog box-->

        <v-dialog
          v-model="showAddTagFrom"
          width="30vw">
          <div class="dialogContainer">
            <div class="dialogField">
              <v-text-field
                v-model="newTag"
                label="Име на таг"
                clearable
                counter="100"
                :rules="[rules.required, rules.length100]"
              ></v-text-field>
            </div>
            <v-btn
              @click="onAddTag"
              color="primary">
              Добави
            </v-btn>
          </div>
        </v-dialog>

        <!--Remove tags dialog box-->

        <v-dialog
          v-model="showRemoveTagFrom"
          width="30vw">
          <div class="dialogContainer">
            <div class="dialogField">
              <v-combobox
                v-model="removeTagList"
                :items="gameTags"
                label="Изберете тагове за премахване"
                multiple
                tags
              ></v-combobox>
            </div>
            <v-btn
              @click="onRemoveTags"
              color="primary">
              Изтрии
            </v-btn>
          </div>
        </v-dialog>

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
        trailerURL: '',
        showTrailer: false,
        uploadedImage: '',
        selectedGameObj: {},
        showAddTagFrom: false,
        newTag: '',
        showRemoveTagFrom: false,
        removeTagList: [],
        rules: {
          required: (value) => !!value || 'Това поле е задължително!',
          length100: (value) => value.length <= 100 || 'Това поле може да съдържа максимум 100 символа!',
          length500: (value) => value.length <= 500 || 'Това поле може да съдържа максимум 500 символа!',
          count4: (value) => value.length <= 4 || 'Това поле може да съдържа максимум 4 тага!',
          requiredCount: (value) => value.length > 0 || 'Това поле е задължително!'
        }
      }
    },
    computed: {
      games() {
        return this.$store.getters.getGames || {}
      },
      gameTags() {
        return this.$store.getters.getGameTagsArray || []
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      selectedGame(value) {
        this.selectedGameObj = this.games.find((game) => {
          return game.id === value.id
        })

        this.trailerURL = this.selectedGameObj.trailer
      },
      selectedGameObj: {
        handler: function (value) {
          if (value.tags.includes('Add Custom Tag...')) {
            this.selectedGameObj.tags.pop()
            this.showAddTagFrom = true
          }
          if (value.tags.includes('Remove Tags...')) {
            this.selectedGameObj.tags.pop()
            this.showRemoveTagFrom = true
          }
          if (value.tags.length >= 5) {
            this.selectedGameObj.tags.pop()
          }
        },
        deep: true
      },
      showRemoveTagFrom(value) {
        if (!value) {
          this.removeTagList = []
        }
      },
      loading(value) {
        if (!value) {
          this.selectedGameObj = this.games[0]
        }
      }
    },
    methods: {
      onApplyChanges() {
        if (this.$refs.title.validate() && this.$refs.creator.validate() &&
          this.$refs.description.validate() && this.$refs.image.validate() &&
          this.$refs.trailer.validate() && this.$refs.tags.validate()) {

          this.$store.dispatch('updateGame', {
            selectedGameInfo: this.selectedGameObj,
            uploadedImage: this.uploadedImage
          })

        }
      },
      onAddTag() {
        if (this.newTag && this.newTag.length <= 100) {
          this.$store.dispatch('addGameTag', this.newTag)
        }
        this.showAddTagFrom = false
      },
      onRemoveTags() {
        if (this.removeTagList) {
          this.$store.dispatch('removeGameTags', this.removeTagList)
        }
        this.showRemoveTagFrom = false
      }
    },
    components: {
      appFileUpload: fileUpload,
      appGameCard: gameCard
    },
    created() {
      if (!this.$store.getters.getGames.length) {
        this.$store.dispatch('loadGames')
      }
      else {
        this.selectedGameObj = this.games[0]
      }
      if (!this.$store.getters.getGameTagsArray.length) {
        this.$store.dispatch('loadGameTagsArray')
      }
    }
  }
</script>

<style scoped>
  #editGamesContainer {
    min-height: 86.5vh;
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
    margin: 2vh auto 2vh;
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
    grid-template-areas: "title title title" "creator description ." "image description ." "trailer tags ." "submit submit submit";
  }

  #detailsFromContainer * {
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
    margin-top: -10.7vh; /*81.69px*/
    margin-left: 0.1vw; /*1.44px*/
  }

  #gameTrailer {
    grid-area: trailer;
    justify-self: center;
    width: 60%;
    height: 6.42vh; /*50px*/
    /*margin-bottom: .6vh; !*4.67px*!*/
  }

  #gameTags {
    grid-area: tags;
    width: 100%;
    height: 6.42vh; /*50px*/
    margin-top: -1.25vh; /*9.725px*/
  }

  #submitButton {
    grid-area: submit;
    justify-self: center;
    width: 17vw; /*245px*/
  }

  .dialogContainer {
    background: #424242;
    min-height: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dialogField {
    width: 80%;
  }
</style>
