<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>

  <v-container fluid class="minHeight minWidth" v-else>
    <v-layout column>
      <v-flex xs12>
        <v-card
          v-for="service in services"
          :key="service.id"
          :color="service.backgroundColor"
          class="card">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12 lg3>
                <router-link :to="'/services/' + service.id">
                  <v-card-media
                    :src="service.imageUrl"
                    class="cardImg"
                    height="23vh">
                  </v-card-media>
                </router-link>
              </v-flex>
              <v-flex xs12 lg7>
                <v-card-title>
                  <div>
                    <h3 class="cardTitle mb-0 white--text">{{ service.title }}</h3>
                    <v-flex offset-lg1>
                      <div
                        class="mt-3 serviceSubDescriptionFormat">
                        {{ service.subDescription }}
                      </div>
                    </v-flex>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs2>
                <v-btn
                  class="moreInfoButton"
                  large
                  flat
                  :to="'/services/' + service.id">
                  Повече
                  <v-icon right>arrow_forward</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      services() {
        return this.$store.getters.getDisplayedServices
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    created() {
      if (!this.$store.getters.getServices.length){
        this.$store.dispatch('loadServices')
      }
    }
  }
</script>

<style scoped>
  .card{
    display: flex;
    min-height: 230px;
    height: 15.97vw;
    width: 95vw;
    margin: 2vw auto;
  }

  .cardImg{
    margin-left: 1vw;
  }

  .cardTitle{
    font-size: 1.8vw;
  }

  .serviceSubDescriptionFormat {
    font-size: 1.5vw;
  }

  .moreInfoButton, .moreInfoButton:hover, .moreInfoButton:focus
  {
    position: absolute;
    right: -10px;
    bottom: 0;
    padding: 0 1.7vw;
    font-size: 1.2vw;
    height: 5vh;
  }

  .moreInfoButton i{
    font-size: 1.2vw!important;
  }

  @media only screen and (max-width: 1400px) {
    .card{
      min-height: inherit;
      height: auto;
    }

    .cardTitle{
      font-size: 1.8rem;
    }

    .serviceSubDescriptionFormat {
      font-size: 1.4rem;
    }

    .moreInfoButton, .moreInfoButton:hover, .moreInfoButton:focus
    {
      position: absolute;
      right: -10px;
      bottom: 0;
      padding: 0 24px;
      font-size: 14px;
      height: 30px;
    }

    .moreInfoButton i{
      font-size: 14px!important;
    }
  }

  @media only screen and (max-width: 1263px) {
    .cardImg{
      min-height: 35vh;
    }
  }
</style>
