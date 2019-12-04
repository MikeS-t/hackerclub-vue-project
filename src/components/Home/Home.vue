<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>
    <v-container fluid class="wrapper noPadding" v-else>
      <v-layout row>
        <v-flex xs12>
          <v-carousel
            class="carousel"
            :cycle="carouselAutoPlay"
            @mouseenter.native="carouselAutoPlay = false"
            @mouseleave.native="carouselAutoPlay = true"
            v-model="carouselIndex">
            <v-carousel-item
              v-for="image in carouselImages"
              :key="image.id"
              :src="image.imageUrl"
              @click.native="goToService(image.id)">
              <div class="photoCaptionContainer">
                <app-text-effect :message="photoCaption" class="photoCaption"></app-text-effect>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import textEffect from './TextEffect.vue'
  export default {
    data () {
      return {
        carouselAutoPlay: false,
        photoCaption: '',
        carouselIndex: null
      }
    },
    watch: {
      carouselIndex () {
        this.photoCaption = this.$store.getters.getServices[this.carouselIndex].title
      },
    },
    computed: {
      carouselImages () {
        return this.$store.getters.getServices
      },

      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    methods: {
      goToService (id){
        this.$router.push('/services/' + id)
      }
    },
    components: {
      'app-text-effect': textEffect
    },
    created () {
      if (!this.$store.getters.getServices.length){
        this.$store.dispatch('loadServices')
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');

  .carousel
  {
    min-height: 69.9vh;
    cursor: pointer;
  }

  .photoCaptionContainer{
    display: flex;
    justify-content: center;
    position: absolute;
    height: 10vh;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    line-height: 1.5;
    padding: 30px;
    width: 100%;
    cursor: auto;
  }

  .photoCaption{
    align-self: center;
    text-align: center;
    font-size: 2.5vw;
    text-shadow: 0 2px 2px black;
    font-family: 'Roboto Mono', monospace;
  }

  @media only screen and (max-width: 1440px) {
    .photoCaption{
      font-size: 2.5rem;
    }
  }

  @media only screen and (max-width: 900px) {
    .carousel
    {
      min-height: 465px;
    }

    .photoCaptionContainer
    {
      height: 135px;
      font-size: 2.5rem;
      bottom: 25px;
    }
  }

  @media only screen and (max-width: 356px) {
    .photoCaptionContainer
    {
      font-size: 35.36px;
    }
  }
</style>
