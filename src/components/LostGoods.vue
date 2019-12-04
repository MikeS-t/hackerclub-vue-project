<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>

  <v-container fluid pt-0 pb-0 pl-0 pr-0 class="minHeight" v-else>
    <v-layout>
      <v-flex xs12 text-xs-center>
        <v-alert
          :value="true"
          color="info">
          <p class="infoMessage">Тук са изложени всички забравени лични вещи на лица посещавали нашата
            зала. Ако разпознавате някоя от тях и можете да докажете,
            че е ваша - моля свържете се с нас.
            <v-btn flat class="contactsLink" to="/contacts">
              <v-icon left>supervised_user_circle</v-icon>
              Контакти
            </v-btn>
          </p>
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout justify-space-around row fill-height wrap>
      <v-flex
        v-for="(item, index) in lostGoods"
        :key="index"
        xs12 md5 lg4>

        <v-card
          class="card"
          :color="item.color">
          <v-card-media
            class="cardImg"
            :src="item.imageUrl"
            height="14vw">
          </v-card-media>

          <v-card-title primary-title>
            <div>
              <div class="cardTitle">{{ item.title }}</div>
              <span v-if="item.dateFound" class="dateLabel">Дата на откриване: {{ item.dateFound }}</span>
            </div>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn flat icon
                class="descriptionButton"
                v-if="item.description"
                @click="item.showDescription = !item.showDescription">
                <v-icon>{{ item.showDescription ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-slide-y-transition>
            <v-card-text v-show="item.showDescription" class="cardDescription" :class="item.color">
              <p>{{ item.description }}</p>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>

    </v-layout>

    <!--Pagination (if needed)-->

    <v-layout justify-center row fill-height mb-2 v-if="paginationLength > 1">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          circle
          color="primary">
        </v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        itemNumberStart: 0,
        itemNumberEnd: 6,
        paginationLength: null
      }
    },
    computed: {
      lostGoods() {
        return this.$store.getters.getLostGoods.slice(this.itemNumberStart, this.itemNumberEnd)
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      page (value) {
        this.itemNumberStart = (value - 1) * 6
        this.itemNumberEnd = value * 6
      },
      loading(value) {
        if (!value) {
          this.paginationLength = Math.ceil(this.$store.getters.getLostGoods.length / 6)
        }
      }
    },
    created () {
      if (!this.$store.getters.getLostGoods.length){
        this.$store.dispatch('loadLostGoods')
      }
      else {
        this.paginationLength = Math.ceil(this.$store.getters.getLostGoods.length / 6)
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Kanit&subset=cyrillic');

  .card {
    margin: 3vh auto;
    height: 20.83vw;
    min-height: 300px;
    width: 20.83vw;
    min-width: 300px;
    border-radius: 1.39vw;
  }

  .cardImg {
    height: 14vw;
    min-height: 200px;
  }

  .cardTitle {
    font-size: 1.7vw;
  }

  .dateLabel{
    font-size: 1vw;
  }

  .descriptionButton{
    position: absolute;
    right: 8%;
    bottom: 6%;
    width: 2.5vw;
    min-width: 36px;
    height: 2.5vw;
    min-height: 36px;
    z-index: 6;
  }

  .descriptionButton i{
    font-size: 1.7vw!important;
  }

  .cardDescription {
    position: absolute;
    z-index: 5;
    margin-top: -0.7vw;
    min-height: 4.86vw;
    font-size: 1.3vw;
    text-align: center;
  }

  .infoMessage {
    font-size: 1.56vw;
    font-family: 'Kanit', sans-serif;
    white-space: pre-line;
  }

  .contactsLink {
    text-decoration: none;
    color: greenyellow!important;
    font-weight: 600;
    font-size: 1.65vw;
    padding: 1.74vw 2.8vw!important;
  }

  .contactsLink i{
    font-size: 1.7vw!important;
  }

  @media only screen and (max-width: 1440px) {
    .card {
      border-radius: 20px;
    }

    .cardTitle{
      font-size: 24px;
      /*margin-top: -14px;*/
    }

    .dateLabel{
      font-size: 14px;
    }

    .descriptionButton i{
      font-size: 24px!important;
    }

    .cardDescription {
      margin-top: -16px;
      min-height: 70px;
      font-size: 16px;
    }

    .infoMessage {
      font-size: 1.6rem;
    }

    .contactsLink {
      font-size: 1.7rem;
      padding: 25px 40px!important;
    }

    .contactsLink i{
      font-size: 24px!important;
    }
  }

  @media only screen and (max-width: 1440px) {
    .infoMessage {
      line-height: 1.3;
    }
  }

  /*Production Bug Fixes*/
  .descriptionButton:hover{
    position: absolute!important;
  }

</style>
