<template>
  <!--Loader component-->
  <div v-if="loading" class="loadContainer">
    <app-loading></app-loading>
  </div>

  <v-container fluid class="minHeight minWidth" v-else>
    <!--<app-modify-icon-->
      <!--linkTo="modifyServices">-->
    <!--</app-modify-icon>-->

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
                    <h3 class="cardTitle white--text">{{ service.title }}</h3>
                    <v-flex offset-lg1>
                      <div
                        class="serviceSubDescription">
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
  import modifyIcon from '../Shared/ModifyIcon'

  export default {
    computed: {
      services() {
        return this.$store.getters.getDisplayedServices
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    components: {
      appModifyIcon: modifyIcon
    },
    created() {
      if (!this.$store.getters.getServices.length){
        this.$store.dispatch('loadServices')
      }
    }
  }
</script>

<style lang="scss" scoped>

  .card {
    display: flex;
    min-height: 29.56vh; /*230px*/
    height: 29.55vh; /*229.96px*/
    width: 95vw; /*1368px*/
    margin: 3.7vh auto; /*28.8px*/

    .cardImg {
      margin-left: 1vw; /*25.92px*/
    }

    .cardTitle {
      margin-left: 2vw;
      font-size: 3.33vh; /*25.92px*/
    }

    .serviceSubDescription {
      margin-top: 2.05vh; /*16px*/
      font-size: 2.78vh; /*21.6px*/
      line-height: 3.5vh;
    }

    .moreInfoButton, .moreInfoButton:hover, .moreInfoButton:focus {
      position: absolute;
      right: -0.69vw; /*10px*/
      bottom: 0;
      padding: 0 1.7vw; /*24.48px*/
      font-size: 2.22vh; /*17.28px*/
      height: 5vh; /*38.9px*/

      i {
        font-size: 2.05vh!important; /*16px*/
      }
    }
  }

  @media only screen and (max-width: 1263px) {

    .card {
      height: auto;
      width: 90vw;
      margin-bottom: 20px;

      .cardImg {
        min-height: 200px;
      }

      .cardTitle {
        font-size: 26px;
      }

      .serviceSubDescription {
        font-size: 22px;
        margin-bottom: 30px;
      }

      .moreInfoButton, .moreInfoButton:hover, .moreInfoButton:focus {
        position: absolute;
        right: 3px;
        bottom: 0;
        padding: 0 24px;
        font-size: 14px;
        height: 30px;

        i {
          font-size: 16px!important;
        }
      }
    }
  }

  @media only screen and (max-height: 570px) {

    .cardTitle {
      margin-top: 10px;
      margin-bottom: 15px;
    }
  }
</style>
