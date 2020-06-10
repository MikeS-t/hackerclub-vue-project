<template>
    <div id="componentWrapper">
      <div id="activeUsersPanel">
        <p>Currently active users</p>
        <p v-for="user in users">
          <span v-if="user.isCurrentUser"><b>{{ user.username }}</b></span>
          <span v-else>{{ user.username }}</span>
        </p>
      </div>
      <div id="selectionPanel">
        <div id="usernameInput">
          <v-text-field
            v-model="username"
            clearable
            @click="username === 'Потребителско име' ? username = '' : ''"
            @focusout="!username ? username = 'Потребителско име' : ''"
          ></v-text-field>
        </div>

        <div id="selectionNumbers">
          <div v-for="button in buttons" class="selectionNumber">
            <p
              @click="buttonClicked(button.value)"
              :style="{ backgroundColor: `hsl(${button.color}, 100%, 75%)` }">
              {{ button.value }}
              <br>
              {{ button.lastUser }}
            </p>
          </div>
        </div>
        <p id="numbers">
          {{ numbers }}
        </p>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        username: 'Потребителско име'
      }
    },
    computed: {
      users() {
        return this.$store.getters.getUsers
      },
      buttons() {
        return this.$store.getters.getButtons
      },
      numbers() {
        return this.$store.getters.getNumbers
      },
    },
    methods: {
      getRandomColor() {
        return (Math.random() * 360).toFixed(2).toString()
      },
      buttonClicked(id) {
        this.$store.dispatch('changeButton', {
          value: id,
          color: this.getRandomColor(),
          lastUser: this.username
        })
      }
    },
    watch: {
      username: function (newValue, oldValue) {
        if(newValue){
          if (oldValue) {
            oldValue = oldValue.substring(0,10)
          } else {
            oldValue = ''
          }
          newValue = newValue.substring(0,10)
          let defaultValue = 'Потребител'

          if (oldValue !== newValue && newValue !== defaultValue && newValue){
            this.$store.dispatch('updateUser', newValue)
          } else if (oldValue !== defaultValue && newValue === defaultValue) {
            this.$store.dispatch('updateUser', 'Anonymous User')
          }
        } else {
          this.$store.dispatch('updateUser', 'Anonymous User')
        }
      }
    },
    created () {
      this.$store.dispatch('makeConnection')

      window.addEventListener('beforeunload', () => {
        this.$store.dispatch('deleteUser')
      })
    },
    destroyed () {
      this.$store.dispatch('deleteUser')
    }
  }
</script>

<style scoped>
  #componentWrapper{
    display: flex;
  }

  #activeUsersPanel{
    width: 20vw;
    height: 69.9vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow: scroll;
    overflow-x: hidden;
  }

  #activeUsersPanel p:first-of-type {
    margin-top: 2vh;
    font-weight: bold;
    font-size: 2vh;
  }

  #activeUsersPanel p {
    width: 80%;
    height: 5%;
    text-align: center;
    white-space: nowrap;
    margin-bottom: 0;
    margin-top: 2vh;
  }

  #selectionPanel{
    width: 80vw;
    height: 69.9vh;
  }

  #usernameInput{
    height: 7vh;
    background-color: black;
    width: 30%;
    margin: 0 auto;
    overflow: hidden;
  }

  #selectionNumbers {
    width: 50vw;
    height: 50vh;
    margin: 3vh auto 2vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .selectionNumber{
    flex-grow: 0;
    width: 26%;
    height: 25%;
  }

  .selectionNumber p {
    margin: 0;
    width: 100%;
    height: 100%;
    color: black;
    text-align: center;
    font-size: 3.5vh;
    font-weight: bold;
    border: 3px solid black;
    padding-top: 1.5vh;
    user-select: none;
    white-space: nowrap !important;
    overflow: hidden !important;
  }

  #numbers {
    width: 50vw;
    margin: 0 auto 0;
    text-align: end;
    letter-spacing: 3.5vw;
    font-size: 4vh;
  }
</style>
