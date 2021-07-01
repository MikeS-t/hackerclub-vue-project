<template>
  <div @mouseenter="onGameHover"
       class="card">
    <div class="poster">
      <img
        v-show="isImgLoaded"
        @load="imgLoaded"
        :src="gameInfoObj.imageUrl"
        :alt="gameInfoObj.title">
      <v-progress-circular
        v-show="!isImgLoaded"
        :size="100"
        :width="15"
        indeterminate
        color="primary">
      </v-progress-circular>
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
          @click.native.stop="showTrailer = true">
          <v-icon left>visibility</v-icon>
          Trailer
        </v-btn>

        <!--Dialog window with the trailer-->

        <v-dialog
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
          'secondary',
          'custom',
          'accent'
        ],
        isImgLoaded: false
      }
    },
    props: {
      gameInfoObj: {
        type: Object,
        required: true
      }
    },
    methods: {
      onGameHover() {
        this.$emit('bgImgUrl', this.gameInfoObj.imageUrl)
      },
      imgLoaded() {
        this.isImgLoaded = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sharedVariables";

  /*color classes (used in card tags)*/

  .primary {
    background-color: $primary !important;
  }

  .secondary {
    background-color: $secondary !important;
  }

  .custom {
    background-color: $custom !important;
  }

  .accent {
    background-color: $accent !important;
  }

  /*---------------------------*/

  .card {
    margin-top: 5vh; /*37.7px*/
    position: relative;
    width: 27vw; /*414.72px*/
    min-width: 350px;
    height: 62vh; /*467.48px*/
    min-height: 420px;
    background: #000;
    overflow: hidden;
    box-shadow: 0 0.347vw 0.7vw rgba(0, 0, 0, 0.5); /*5.32px 10.75px*/
    transition: 0.5s;

    .poster {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 20.8vw; /*53.2992px*/

      img {
        width: 100%;
        height: 43vh; /*324.22px*/
        min-height: 300px;
        transition: 0.5s;
      }

      &:before {
        content: '';
        position: absolute;
        bottom: -37vh; /*278.98px*/
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #000 90%, transparent);
        transition: 0.5s;
        z-index: 1;
      }
    }

    &:hover .poster img {
      filter: blur(2px);
      transform: translateY(-3.47vw); /*53.2992px*/
    }

    &:hover .poster:before {
      bottom: -12vh; /*90.48px*/
    }

    .details {
      position: absolute;
      padding: 1.39vw; /*21.3504px*/
      width: 100%;
      height: 78%;
      bottom: -23vh; /*173.42px*/
      left: 0;
      box-sizing: border-box;
      transition: 0.5s;
      z-index: 2;

      h2 {
        color: #fff;
        padding: 0;
        font-size: 4.06vh; /*31.6px*/
        font-family: 'Kanit', sans-serif;
        line-height: 5.18vh; /*40.31px*/
        margin: 5vh 0 0; /*37.7px*/

        span {
          color: $secondary;
          font-size: 1.4vw; /*21.5px*/
          font-family: 'Prosto One', cursive;
        }
      }

      .tags {
        height: 3.86vh; /*30px*/
        position: relative;
        margin-top: 1vh; /*7.54px*/
        margin-bottom: 0.7vw; /*10.75px*/
        overflow: hidden;

        span {
          padding: 0.14vw 0.35vw;
          margin-right: 0.35vw;  /*5px*/
          color: #fff;
          display: inline-block;
          border-radius: 0.28vw; /*4.3px*/
          font-size: 1.11vw; /*17.0496px*/
        }
      }

      .description {
        color: #fff;
        height: 47%;

        p {
          margin: 0 0 0.7vw;
          font-size: 2.26vh; /*17.04px*/
          font-family: 'Roboto', sans-serif;
          height: 100%;
        }
      }

      .trailerButton{
        width: 9.72vw; /*149.2992px*/
        min-width: 140px;
        height: 4.4vh; /*33.792px*/
        min-height: 36px;
        margin-top: -1.1vh; /*17.68px*/
        font-size: 1.44vw; /*22.1184px*/
        padding: 0 1.11vw!important; /*17.0496px*/

        i{
          font-size: 1.7vw; /*26.28096px*/
        }
      }
    }

    &:hover .details {
      bottom: 4.23vh; /*31.95px*/
    }
  }

  /*Trailer dialog section*/
  .dialogContainer {
    position: relative;
    width: 100%;
    height: 51vh; /*384.54px*/

    .closeButton {
      width: 2.8vw; /*43px*/
      min-width: 40px;
      height: 5.7vh; /*43px*/
      min-height: 40px;
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
    }

    .trailer {
      width: 100%;
      height: 50vh; /*377px*/
    }
  }

  @media only screen and (max-width: 1440px) {

    .card {
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);

      .poster:before {
        bottom: -220px;
      }

      &:hover {
        .poster img {
          transform: translateY(-50px);
        }

        .poster:before {
          bottom: -120px;
        }

        .details {
          bottom: 30px;
        }
      }

      .details {
        padding: 20px;
        bottom: -140px;

        h2 {
          font-size: 31.6px;
          line-height: 40px;
          margin: 20px 0 0;

          span {
            font-size: 20px;
          }
        }

        .tags {
          margin-top: 25px;
          margin-bottom: 10px;

          span {
            padding: 3px 5px;
            margin-right: 5px;
            border-radius: 4px;
            font-size: 15px;
          }
        }

        .description p {
          margin: 15px 0 10px;
          font-size: 16px;
        }

        .trailerButton {
          margin-top: -15px;
          font-size: 1.3rem;
          padding: 0 16px!important;

          i{
            font-size: 24px;
          }
        }
      }
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
