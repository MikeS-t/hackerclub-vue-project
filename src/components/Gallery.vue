<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>

  <v-container grid-list-md fluid class="wrapper" v-else>

    <!--Welcoming text-->

    <v-layout row justify-center>
      <v-flex xs10 sm7 mt-2>
        <p class="welcomeText"> Добре дошли в нашата галерия, тук може да разгледате снимки от залата :) </p>
      </v-flex>
    </v-layout>

    <!--The three columns-->

    <v-layout fill-height row wrap>
      <v-flex xs12 md4>
        <img v-for="image in columnOne"
             @click="onSelect(image.index)"
             class="galleryImage"
             :src="image.src"
             alt="galleryImage">
      </v-flex>

      <v-flex xs12 md4>
        <img v-for="image in columnTwo"
             @click="onSelect(image.index)"
             class="galleryImage"
             :src="image.src"
             alt="galleryImage">
      </v-flex>

      <v-flex xs12 md4>
        <img v-for="image in columnThree"
             @click="onSelect(image.index)"
             class="galleryImage"
             :src="image.src"
             alt="galleryImage">
      </v-flex>

      <!--Dialog for full size picture-->

      <v-dialog
        v-if="showDialog"
        v-model="showDialog"
        width="85vw">
        <div class="dialogContainer">
          <img src="../../static/GameImages/TheXButton.png"
               class="closeButton"
               @click.stop="showDialog = false"
               alt="Close Dialog">

          <img
            class="photoTape hidden-sm-and-down"
            src="../../static/Gallery/PhotoTape4.png"
            alt="PhotoTape">

          <p class="hidden-sm-and-down">Ти си <br> Тук!</p>
          <p
            @click="selectPreviousThreePictures"
            class="hidden-sm-and-down textButton">
            << Предишни
          </p>
          <p
            @click="selectNextThreePictures"
            class="hidden-sm-and-down textButton">
            Следващи >>
          </p>

          <div class="fullSizePictureContainer">
            <img
              class="fullSizePicture"
              :src="selectedPictureUrl"
              alt="Full size picture">
          </div>

          <div class="previousSubPicturesContainer hidden-sm-and-down">
            <div
              v-for="subpicture in subPicturesArray.slice(selectedPictureIndex -1, selectedPictureIndex + 2)"
              class="subPictureContainer">
              <img
                :src="subpicture.src"
                @click="onSelect(subpicture.index)"
                alt="subPicture"
                class="subPicture">
            </div>
          </div>

          <div class="nextSubPicturesContainer hidden-sm-and-down">
            <div v-for="subpicture in subPicturesArray.slice(selectedPictureIndex + 3, selectedPictureIndex + 6)"
                 class="subPictureContainer">
              <img
                :src="subpicture.src"
                @click="onSelect(subpicture.index)"
                alt="subPicture"
                class="subPicture">
            </div>
          </div>

          <v-btn
            @click="selectPreviousPicture"
            flat large dark class="leftButton">
            <img src="../../static/Gallery/previous.png" alt="previous" class="icon">
          </v-btn>

          <v-btn
            @click="selectNextPicture"
            flat large dark class="rightButton">
            <img src="../../static/Gallery/next.png" alt="previous" class="icon">
          </v-btn>

        </div>
      </v-dialog>

    </v-layout>

    <!--Show more pictures button-->

    <v-layout row justify-center>
      <v-btn
        @click="loadMorePictures"
        v-if="lastPictureIndex < totalPicturesCount"
        class="morePicturesButton"
        large round color="success">
        Още снимки
      </v-btn>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        showDialog: false,
        selectedPictureUrl: null,
        selectedPictureIndex: null,
        lastPictureIndex: 0,
        totalPicturesCount: 0,
        forLoopStartIndex: 0,
        columnOne: [],
        columnTwo: [],
        columnThree: [],
        subPicturesArray: []
      }
    },
    computed: {
      galleryImages() {
        return this.$store.getters.getGalleryImages.slice(0, this.lastPictureIndex)
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    methods: {
      loadMorePictures() {
        this.lastPictureIndex += 9
      },
      onSelect(index) {
        let that = this

        this.$store.getters.getGalleryImages.find((picture) => {
          if (picture.index === index) {
            that.selectedPictureUrl = picture.src
            that.selectedPictureIndex = picture.index
          }
        })

        this.showDialog = true
      },
      selectNextPicture() {
        if(this.selectedPictureIndex === this.galleryImages[this.galleryImages.length - 1].index) {
          this.selectedPictureIndex = 1
        }
        else {
          this.selectedPictureIndex++
        }
      },
      selectNextThreePictures() {
        if(this.selectedPictureIndex + 3 > this.galleryImages[this.galleryImages.length - 1].index) {
          this.selectedPictureIndex = this.galleryImages[this.galleryImages.length - 1].index - this.selectedPictureIndex + 3
        }
        else {
          this.selectedPictureIndex += 3
        }
      },
      selectPreviousPicture() {
        if(this.selectedPictureIndex === 1)
        {
          this.selectedPictureIndex = this.galleryImages[this.galleryImages.length - 1].index
        }
        else {
          this.selectedPictureIndex--
        }
      },
      selectPreviousThreePictures() {
        if (this.selectedPictureIndex - 3 < 1) {
          this.selectedPictureIndex = this.galleryImages[this.galleryImages.length - 1].index + this.selectedPictureIndex - 3
        }
        else {
          this.selectedPictureIndex -= 3
        }
      },
    },
    watch: {
      lastPictureIndex(value) {
        let columnSeparator = 0

        if (value > this.totalPicturesCount) {
          value = this.totalPicturesCount
        }

        for (this.forLoopStartIndex; this.forLoopStartIndex < value; this.forLoopStartIndex++) {
          if (columnSeparator === 0) {
            this.columnOne.push(this.galleryImages[this.forLoopStartIndex])
            columnSeparator++
          }
          else if (columnSeparator === 1) {
            this.columnTwo.push(this.galleryImages[this.forLoopStartIndex])
            columnSeparator++
          }
          else {
            this.columnThree.push(this.galleryImages[this.forLoopStartIndex])
            columnSeparator -= 2
          }
        }
      },
      selectedPictureIndex(value) {
        let that = this
        this.$store.getters.getGalleryImages.find((picture) => {
          if (picture.index === value) {
            that.selectedPictureUrl = picture.src
          }
        })

        let currentGalleryImagesArray = this.galleryImages
        this.subPicturesArray = currentGalleryImagesArray.slice()
        currentGalleryImagesArray.slice(currentGalleryImagesArray.length - 3, currentGalleryImagesArray.length).reverse().forEach((el) => {
          that.subPicturesArray.unshift(el)
        })
        currentGalleryImagesArray.slice(0, 3).forEach((el) => {
          that.subPicturesArray.push(el)
        })
      },
      loading(value) {
        if (!value) {
          this.totalPicturesCount = this.$store.getters.getGalleryImages.length
          this.loadMorePictures()
        }
      }
    },
    created() {
      if (!this.$store.getters.getGalleryImages.length){
        this.$store.dispatch('loadGalleryImages')
      }
      else {
        this.totalPicturesCount = this.$store.getters.getGalleryImages.length
        this.loadMorePictures()
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');

  .welcomeText {
    font-size: 2vw;
    text-shadow: 0.04vw 0.04vw black;
    text-align: center;
  }

  .wrapper {
    min-height: 69.9vh;
    padding: 0 !important;
    background-image: linear-gradient(to left top, #9604d7, #2583f8, #4b6bf6, #734ceb, #9604d7);
  }

  .galleryImage {
    width: 95%;
    margin-top: 15px;
    margin-left: 2.5%;
    cursor: pointer;
    border-radius: 1.74vw;
  }

  .morePicturesButton {
    width: 14.46vw;
    min-width: 165px;
    height: 3.06vw;
    min-height: 44px;
    border-radius: 10vw;
    font-size: 1.17vw;
    margin-bottom: 0.7vw;
  }

  /*--------------------------------------------------------------------------------------------*/
  /*--------------------------------------Dialog Section----------------------------------------*/
  /*--------------------------------------------------------------------------------------------*/

  .dialogContainer {
    position: relative;
    width: 100%;
    height: 50vw;
    background-color: black;
    overflow: hidden;
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

  .fullSizePictureContainer {
    position: absolute;
    width: 90%;
    height: 68%;
    top: 5%;
    left: 5%;
  }

  .fullSizePicture {
    position: relative;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    display: block;
    margin: auto;
  }

  .textButton{
    cursor: pointer;
    user-select: none;
  }

  .photoTape{
    position: absolute;
    bottom: 0.2%;
    left: 0;
    height: 26.65%;
    width: 100%;
  }

  .nextSubPicturesContainer, .previousSubPicturesContainer{
    width: 43%;
    height: 11.5%;
    bottom: 3.3%;
    position: absolute;
  }

  .previousSubPicturesContainer{
    left: 3.5%;
  }

  .nextSubPicturesContainer{
    left: 52%;
  }

  .rightButton, .leftButton{
    position: absolute;
    top: 30%;
    width: 6vw;
    height: 12vw;
    margin: 0!important;
  }

  .leftButton{
    left: 2%;
  }

  .rightButton{
    right: 2%;
  }

  .icon{
    width: 3.5vw;
    height: 8.5vw;
  }

  .rightButton:hover, .leftButton:hover .icon{
    transform: scale(1.2);
    transition-duration: 0.3s;
  }

  .subPictureContainer{
    position: absolute;
    width: 26%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
  }

  .subPicture{
    position: relative;
    height: 102%;
    max-width: 103%;
    cursor: pointer;
    border-radius: 0.21vw;
  }

  @media only screen and (max-width: 1440px) {

    .welcomeText {
      text-shadow: .5px .5px black;
    }

    .galleryImage {
      margin-top: 15px;
      border-radius: 25px;
    }

    .morePicturesButton {
      margin-bottom: 10px;
      font-size: 16.8px;
    }

    /*--------------------------------------------------------------------------------------------*/
    /*--------------------------------------Dialog Section----------------------------------------*/
    /*--------------------------------------------------------------------------------------------*/

    .subPicture{
      border-radius: 3px;
    }

  }

  @media only screen and (max-width: 960px) {

    .fullSizePictureContainer {
      width: 105%;
      height: 100%;
      top: 0;
      left: 0;
    }

    .rightButton, .leftButton{
      top: 35%;
      padding: 0!important;
    }

    .closeButton {
      width: 30px;
      height: 30px;
      z-index: 9999;
    }

    .welcomeText {
      font-size: 15px;
      margin: 0;
    }

  }

  /*Positioning*/

  /*Labels*/

  .dialogContainer p{
    position: absolute;
    margin: 0;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: greenyellow!important;
  }

  .dialogContainer p:nth-of-type(1){
    bottom: 3.5%;
    left: 48.1%;
    font-size: 1.3vw;
  }

  .dialogContainer p:nth-of-type(2){
    bottom: 19%;
    left: 18%;
    font-size: 1.5vw;
  }

  .dialogContainer p:nth-of-type(3){
    bottom: 19%;
    left: 69.5%;
    font-size: 1.5vw;
  }

  /*SubPictures positioning*/

  .previousSubPicturesContainer .subPictureContainer:nth-of-type(1) {
    left: 8.15%
  }

  .previousSubPicturesContainer .subPictureContainer:nth-of-type(2) {
    left: 37.3%
  }

  .previousSubPicturesContainer .subPictureContainer:nth-of-type(3) {
    left: 66.7%
  }

  .nextSubPicturesContainer .subPictureContainer:nth-of-type(1) {
    left: 12%
  }

  .nextSubPicturesContainer .subPictureContainer:nth-of-type(2) {
    left: 41.7%
  }

  .nextSubPicturesContainer .subPictureContainer:nth-of-type(3) {
    left: 70.7%
  }

  /*Production Bug Fixes*/
  .leftButton:hover {
    position: absolute!important;
  }

  .rightButton:hover {
    position: absolute!important;
  }

</style>
