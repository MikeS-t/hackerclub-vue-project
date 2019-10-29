<template>
    <div id="deleteGamesContainer">
      <div  id="deleteGamesPreview">
        <div
          v-for="game in removeGameList"
          :key="game.id"
          class="selectedGame">
          <img class="selectedGameImg" :src="game.imageUrl" :alt="game.title">
          <p class="selectedGameTitle">{{ game.title }}</p>
        </div>
      </div>
      <v-btn
        id="deleteButton"
        @click="onRemoveGames"
        color="primary">
        Сигурни ли сте че искате да изтриете тези игри?
        <v-icon right dark>delete_forever</v-icon>
      </v-btn>
    </div>

</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      removeGameList: {
        type: Array
      }
    },
    methods: {
      onRemoveGames() {
        if (this.removeGameList.length) {
          this.$store.dispatch('deleteGames', this.removeGameList)

          let listOfDeletedGameNames = 'Успешно изтрихте:'
          this.removeGameList.forEach(game => {
            listOfDeletedGameNames += '\n"' + game.title + '"'
          })
          this.$emit('snackbarMessage', listOfDeletedGameNames)
        }
      },
    }
  }
</script>

<style scoped>

  #deleteGamesContainer {
    background: rgba(0, 0, 0, 0.3);
    width: 80vw;
    min-height: 67vh;
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
