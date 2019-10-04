<template>
  <!--Loader component-->

  <div v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </div>

  <div v-else id="editGamesContainer">

    <div id="gameSelect">
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
        v-model="deleteGameList"
        :items="games"
        item-text="title"
        item-value="id"
        label="Игри за премахване"
        placeholder="Изберете тагове за премахване"
        :error-messages="errorMsg.selectedGame"
        @click="errorMsg.selectedGame = ''"
        counter="6"
        multiple
      ></v-combobox>
    </div>

    <div id="editMode">
      <div class="checkbox">
        <v-checkbox
          v-model="addNewGameMode"
          label="Добави Нова игра"
          color="success"
          :readonly="addNewGameMode"
        ></v-checkbox>
      </div>
      <div class="checkbox">
        <v-checkbox
          v-model="editGamesMode"
          label="Редактиране на игри"
          color="info"
          :readonly="editGamesMode"
        ></v-checkbox>
      </div>
      <div class="checkbox">
        <v-checkbox
          v-model="deleteGamesMode"
          label="Изтриване на игри"
          color="error"
          :readonly="deleteGamesMode"
        ></v-checkbox>
      </div>
    </div>

    <div v-if="!deleteGamesMode" id="selectedGameDetailsContainer">

      <!--Game card component (game preview)-->

      <app-game-card
        :gameInfoObj="selectedGameObj">
      </app-game-card>

      <v-form ref="modifyGamesForm">
        <div id="detailsFromContainer">

          <!--Input fields (game info)-->

          <div id="gameTitle">
            <v-text-field
              v-model="selectedGameObj.title"
              label="Заглавие"
              placeholder="Добави заглавие"
              clearable
              counter="100"
              :error-messages="errorMsg.title"
              @click="errorMsg.title = ''"
            ></v-text-field>
          </div>

          <div id="gameCreator">
            <v-text-field
              v-model="selectedGameObj.creator"
              placeholder="Добави създател"
              label="Създател"
              clearable
              counter="100"
              :error-messages="errorMsg.creator"
              @click="errorMsg.creator = ''"
            ></v-text-field>
          </div>

          <div id="gameDescription">
            <v-textarea
              v-model="selectedGameObj.description"
              auto-grow
              height="16.58vh"
              clearable
              label="Описание"
              placeholder="Добави описание"
              counter="500"
              :error-messages="errorMsg.description"
              @click="errorMsg.description = ''"
            ></v-textarea>
          </div>

          <div id="gameImage">
            <app-file-upload
              :imageName="selectedGameObj.imageUrl"
              :nameReset="uploadImageNameReset"
              @imageUrl="selectedGameObj.imageUrl = $event"
              @rawImage="uploadedImage = $event"
            ></app-file-upload>
          </div>

          <div id="gameTrailer">
            <v-text-field
              v-model="selectedGameObj.trailer"
              label="Треилър URL"
              placeholder="Добави треилър URL"
              clearable
              counter="100"
              :error-messages="errorMsg.trailer"
              @click="errorMsg.trailer = ''"
            ></v-text-field>
          </div>

          <div id="gameTags">
            <v-combobox
              v-model="selectedGameObj.tags"
              :items="gameTags"
              label="Тагове"
              placeholder="Добави тагове"
              multiple
              chips
              tags
              :error-messages="errorMsg.tags"
              @click="errorMsg.tags = ''"
            ></v-combobox>
          </div>

          <div class="submitButton" v-if="editGamesMode">
            <v-btn
              @click="onApplyChanges"
              color="primary">
              Приложи промените
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </div>

          <div class="submitButton" v-if="addNewGameMode">
            <v-btn
              @click="onApplyChanges"
              color="primary">
              Добави
              <v-icon right dark>add</v-icon>
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
                  label="Име"
                  placeholder="Въведете има на новия таг"
                  clearable
                  counter="100"
                  :error-messages="errorMsg.newTag"
                  @click="errorMsg.newTag = ''"
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
                  label="Тагове за премахване"
                  placeholder="Изберете тагове за премахване"
                  multiple
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
      </v-form>
    </div>

    <div v-else id="deleteGamesContainer">
      <div  id="deleteGamesPreview">
        <div
          v-for="game in deleteGameList"
          :key="game.id"
          class="selectedGame">
          <img class="selectedGameImg" :src="game.imageUrl" :alt="game.title">
          <p class="selectedGameTitle">{{ game.title }}</p>
        </div>
      </div>
      <v-btn
        id="deleteButton"
        @click="onApplyChanges"
        color="primary">
        Сигурни ли сте че искате да изтриете тези игри?
        <v-icon right dark>delete_forever</v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
  import fileUpload from './FileUpload'
  import gameCard from './gameCard'


  export default {
    data() {
      return {
        //Edit view mode
        addNewGameMode: false,
        editGamesMode: true,
        deleteGamesMode: false,
        //Image upload
        uploadImageNameReset: false,
        uploadedImage: '',
        //Game info
        selectedGameObj: {},
        deleteGameList: [],
        //Game Tags
        showAddTagFrom: false,
        newTag: '',
        showRemoveTagFrom: false,
        removeTagList: [],
        //Error msgs
        errorMsg: {
          selectedGame: '',
          title: '',
          creator: '',
          description: '',
          trailer: '',
          tags: '',
          newTag: ''
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
      addNewGameMode(value) {
        if (value) {
          this.editGamesMode = false
          this.deleteGamesMode = false

          this.selectedGameObj = {
            title: '',
            creator: '',
            description: '',
            imageUrl: '',
            trailer: '',
            tags: []
          }

          this.uploadImageNameReset = !this.uploadImageNameReset
        }
      },
      editGamesMode(value) {
        if (value) {
          this.addNewGameMode = false
          this.deleteGamesMode = false

          this.selectedGameObj = this.games[0]
          this.uploadImageNameReset = !this.uploadImageNameReset
        }
      },
      deleteGamesMode(value) {
        if (value) {
          this.addNewGameMode = false
          this.editGamesMode = false
        }
      },
      deleteGameList() {
        if (this.deleteGameList.length > 6) {
          this.deleteGameList.pop()
          this.errorMsg.selectedGame = 'Не може да селектирате повече от 6 игри наведнъж!'
        }
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
      isFormValid() {
        const requiredMsg = 'Това поле е задължително!'
        const lenght100Msg = 'Това поле трябва да съдържа по-малко от 100 символа!'
        let isFormValid = true

        if (!this.selectedGameObj.title) {
          this.errorMsg.title = requiredMsg
          isFormValid = false
        } else if (this.selectedGameObj.title.length > 100) {
          this.errorMsg.title = lenght100Msg
          isFormValid = false
        }

        if (!this.selectedGameObj.creator) {
          this.errorMsg.creator = requiredMsg
          isFormValid = false
        } else if (this.selectedGameObj.creator.length > 100) {
          this.errorMsg.creator = lenght100Msg
          isFormValid = false
        }

        if (!this.selectedGameObj.description) {
          this.errorMsg.description = requiredMsg
          isFormValid = false
        } else if (this.selectedGameObj.description.length > 100) {
          this.errorMsg.description = 'Това поле трябва да съдържа по-малко от 500 символа!'
          isFormValid = false
        }

        if (!this.uploadedImage) {
          this.selectedGameObj.imageUrl = requiredMsg
          isFormValid = false
        }

        if (!this.selectedGameObj.trailer) {
          this.errorMsg.trailer = requiredMsg
          isFormValid = false
        } else if (this.selectedGameObj.trailer.length > 100) {
          this.errorMsg.trailer = lenght100Msg
          isFormValid = false
        }

        if (this.selectedGameObj.tags.length === 0) {
          this.errorMsg.tags = requiredMsg
          isFormValid = false
        } else if (this.selectedGameObj.tags.length > 4) {
          this.errorMsg.tags = 'Не може да селектирате повече от 4 тага!'
          isFormValid = false
        }

        return isFormValid
      },
      onApplyChanges() {
        if (this.isFormValid()) {
          if (this.editGamesMode) {
            this.$store.dispatch('updateGame', {
              selectedGameInfo: this.selectedGameObj,
              uploadedImage: this.uploadedImage
            })
          } else if (this.addNewGameMode) {
            this.$store.dispatch('addGame', {
              selectedGameInfo: this.selectedGameObj,
              uploadedImage: this.uploadedImage
            })
          }
        }
        if (this.deleteGamesMode) {
          this.$store.dispatch('deleteGames', this.deleteGameList)
          this.deleteGameList = []
        }
      },
      onAddTag() {
        if (this.newTag.length > 100) {
          this.errorMsg.newTag = 'Това поле трябва да съдържа по-малко от 100 символа!'
        } else if (this.newTag) {
          this.$store.dispatch('addGameTag', this.newTag)
          this.showAddTagFrom = false
        }
        else {
          this.showAddTagFrom = false
        }
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
    width: 90%;
    height: 65vh;
    margin: 2vh auto 5vh;
    display: flex;
    justify-content: space-between;
  }

  #editMode {
    display: flex;
    justify-content: center;
    margin-top: -3vh;
  }

  .checkbox {
    margin-left: 3vw;
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

  .submitButton {
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

  #deleteGamesContainer {
    background: rgba(0, 0, 0, 0.3);
    width: 80vw;
    min-height: 64.26vh;
    margin: 0 auto 5vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #deleteGamesPreview {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    width: 80vw;
    margin: 0 auto;
  }

  .selectedGame{
    flex: 1 0 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh; /*15.56px*/
  }

  .selectedGameImg {
    height: 21.85vh; /*170px*/
    width: 11.80vw; /*170px*/
    border-radius: 19.28vh; /*150px*/
  }

  .selectedGameTitle {
    color: #ff9800;
    font-size: 1.4vw; /*20.15px*/
    font-family: 'Prosto One', cursive;
    margin-top: 1vh; /*7.78px*/
  }

  #deleteButton {
    margin: 3vh 0; /*23.34px*/
  }

</style>
