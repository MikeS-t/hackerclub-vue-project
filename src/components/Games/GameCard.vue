<template>
  <div @mouseenter="onGameHover"
       class="card">
    <div class="poster">
      <img :src="gameInfoObj.imageUrl" :alt="gameInfoObj.title">
    </div>
    <div class="details">
      <h2>{{ gameInfoObj.title }}
        <br>
        <span>{{ gameInfoObj.creator }}</span>
      </h2>
      <div class="tags">
                <span
                  v-for="(tag, index) in gameInfoObj.tags"
                  :key="index"
                  :class="colors[index]">
                  {{ tag }}
                </span>
      </div>
      <div class="description">
        <p>{{ gameInfoObj.description }}</p>
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
              :src="'https://www.youtube.com/embed/' + gameInfoObj.trailer"
              frameborder="0"
              allow="autoplay;encrypted-media"
              allowfullscreen>
            </iframe>
          </div>
        </v-dialog>
      </v-layout>

    </div>
  </div >
</template>

<script>
  export default {
    data() {
      return {
        showTrailer: false,
        colors: [
          'primary',
          'accent',
          'custom',
          'secondary'
        ]
      }
    },
    props: {
      gameInfoObj: {
        type: Object,
        required: true
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      onGameHover() {
        this.$emit('bgImgUrl', this.gameInfoObj.imageUrl)
      }
    },
    created() {

    }
  }
</script>

<style scoped>
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
    font-size: 4.06vh; /*31.6px*/
    font-family: 'Kanit', sans-serif;
    line-height: 5.18vh; /*40.31px*/
    margin: 1.39vw 0 0;
  }

  .details h2 span {
    color: #ff9800;
    font-size: 1.4vw;
    font-family: 'Prosto One', cursive;
  }

  .tags {
    position: relative;
    margin-top: 2.78vh; /*21.6px*/
    margin-bottom: 0.7vw;
  }

  .tags span {
    padding: 0.14vw 0.35vw;
    margin-right: 0.35vw;  /*5px*/
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
    font-size: 2.26vh; /*17.57px*/
    font-family: 'Roboto', sans-serif;
    height: 100%;
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

  @media only screen and (max-width: 1440px) {

    .card {
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    }

    .card .poster:before {
      bottom: -220px;
    }

    .card:hover .poster img {
      transform: translateY(-50px);
    }

    .card:hover .poster:before {
      bottom: -120px;
    }

    .details {
      padding: 20px;
      bottom: -140px;
    }

    .card:hover .details {
      bottom: 30px;
    }

    .details h2 {
      font-size: 31.6px;
      line-height: 40px;
      margin: 20px 0 0;
    }

    .details h2 span {
      font-size: 20px;
    }

    .tags {
      margin-top: 25px;
      margin-bottom: 10px;
    }

    .tags span {
      padding: 3px 5px;
      margin-right: 5px;
      border-radius: 4px;
      font-size: 15px;
    }

    .description p {
      margin: 15px 0 10px;
      font-size: 16px;
    }

    .trailerButton{
      margin-top: -5px;
      font-size: 1.3rem;
      padding: 0 16px!important;
    }

    .trailerButton i{
      font-size: 24px;
    }

  }

  @media only screen and (max-width: 600px) {
    .trailer {
      height: 35vh;
    }

    .dialogContainer {
      height: 36vh;
    }
  }
</style>
