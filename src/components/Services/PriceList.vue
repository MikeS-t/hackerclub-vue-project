<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>

  <v-container fluid class="wrapper" v-else>
    <v-layout xs12 row wrap justify-space-around>

      <!--PriceList Cards-->

      <div
        v-for="list in priceLists"
        :key="list.title"
        :class="[list.price.index.turnLeft ? 'flip-left-animation' : ' '] +
        [list.price.index.turnRight ? 'flip-right-animation' : ' '] +
        ' ' + list.price.color"
        class="priceListColumn">

        <!--Title-->

        <div class="columnTitleContainer">
        <p class="columnTitle">{{ list.title }}</p>
        </div>

        <hr class="divider">

        <!--Prices-->

          <div class="itemsContainer">

            <div
              v-for="priceItemInfo in list.price.priceDetails.slice(list.price.index.listStart, list.price.index.listEnd)"
              class="sectionContainer">

              <div class="rows"
                   v-if="priceItemInfo.servicePrice">
                <span class="serviceName">{{ priceItemInfo.serviceName }}</span>
                <span class="servicePrice">{{ priceItemInfo.servicePrice }}</span>
              </div>
              <div v-else class="sectionTitleContainer">
                <p class="section">{{ priceItemInfo.serviceName }}</p>
              </div>

            </div>

          </div>

          <!--Cards navigation buttons-->

          <v-btn
            :disabled="list.price.index.listStart === 0 ||
            list.price.index.turnLeft ||
            list.price.index.turnRight"
            v-if="list.price.priceDetails.length > list.price.index.step"
            @click="previousPageCard(list.price.index)"
            flat fab small dark class="leftButton">
            <v-icon large>chevron_left</v-icon>
          </v-btn>

          <v-btn
            :disabled="list.price.index.listEnd >= list.price.priceDetails.length ||
            list.price.index.turnLeft ||
            list.price.index.turnRight"
            v-if="list.price.priceDetails.length > list.price.index.step"
            @click="nextPageCard(list.price.index)"
            flat fab small dark class="rightButton">
            <v-icon large>chevron_right</v-icon>
          </v-btn>
        </div>
    </v-layout>

    <!--Pagination (if needed)-->

    <v-layout row justify-center>

      <div
        class="paginationPosition"
        v-if="paginationLength > 1">
        <v-pagination
          v-model="page"
          :length="paginationLength"
          circle
          color="primary">
        </v-pagination>
      </div>

    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {
        page: 1,
        indexPriceListStart: 0,
        indexPriceListEnd: 4,
        paginationLength: null
      }
    },
    computed: {
      priceLists() {
        let priceArray = []
        this.$store.getters.getDisplayedServices
          .slice(this.indexPriceListStart, this.indexPriceListEnd)
          .forEach((displayedService) => {
          priceArray.push({
            title: displayedService.title,
            price: displayedService.price
          })
        })
        return priceArray.sort((a, b) => {
          return a.price.order - b.price.order
        })
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    watch: {
      page (value) {
        this.indexPriceListStart = (value - 1) * 4
        this.indexPriceListEnd = value * 4
      },
      loading(value) {
        if (!value) {
          this.paginationLength = Math.ceil(this.$store.getters.getDisplayedServices.length / 4)
        }
      }
    },
    methods: {
      nextPageCard(index) {
        index.turnRight = !index.turnRight

        setTimeout(() => {
          index.listStart += index.step
          index.listEnd += index.step
        }, 500)

        setTimeout(() => {
          index.turnRight = !index.turnRight
        }, 1000)
      },
      previousPageCard(index) {
        index.turnLeft = !index.turnLeft

        setTimeout(() => {
          index.listStart -= index.step
          index.listEnd -= index.step
        }, 500)

        setTimeout(() => {
          index.turnLeft = !index.turnLeft
        }, 1000)
      }
    },
    created () {
        if (!this.$store.getters.getServices.length){
          this.$store.dispatch('loadServices')
        }
        else {
          this.paginationLength = Math.ceil(this.$store.getters.getDisplayedServices.length / 4)
        }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500');
  @import url('https://fonts.googleapis.com/css?family=Gabriela');

  .wrapper {
    padding: 0 !important;
    min-height: 67vh;
  }

  .priceListColumn {
    position: relative;
    border-radius: 5vw;
    width: 23vw;
    min-width: 330px;
    height: 64vh;
    min-height: 450px;
    overflow: hidden;
    margin: 1.5vh 0;
  }

  .rows {
    height: 4.7vh;
    min-height: 35px;
    position: relative;
  }

  .columnTitleContainer{
    height: 12vh;
    display: flex;
  }

  .columnTitle {
    width: 80%;
    margin: 0 auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.4vw;
    font-weight: 500;
    text-align: center;
    white-space: pre-line;
    align-self: center;
    text-shadow: 0.1vh 0.05vh black;
  }

  .divider {
    height: 0.2vh;
    min-height: 3px;
    width: 90%;
    margin: auto auto 5%;
    color: white;
  }

  .itemsContainer {
    width: 95%;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 42.3vh;
    min-height: 380px;
  }

  .sectionContainer {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .sectionTitleContainer {
    text-align: center;
    height: 4vh;
    min-height: 25px;
  }

  .section {
    font-family: 'Gabriela', serif;
    color: greenyellow;
    font-size: 1.6vw;
    text-shadow: 0.1vh 0.05vh black;
  }

  .serviceName, .servicePrice {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.2vw;
    text-shadow: 0.1vh 0.05vh black;
  }

  .serviceName {
    left: 5%;
    white-space: pre-line;
  }

  .servicePrice {
    right: 5%;
  }

  .leftButton, .rightButton {
    position: absolute;
    bottom: 0;
    height: 4.5vh;
    min-height: 40px;
    width: 2.8vw;
    min-width: 40px;
  }

  .leftButton {
    left: 15%;
  }

  .rightButton {
    right: 15%;
  }

  .paginationPosition{
    position: relative;
  }

  @media only screen and (max-width: 1440px) {
    .columnTitle {
      font-size: 1.6rem;
    }

    .section {
      font-size: 1.6rem;
    }

    .serviceName, .servicePrice {
      font-size: 1.3rem;
    }
  }

  @media only screen and (max-width: 1380px) {
    .priceListColumn {
      margin-left: 5vw;
      margin-right: 5vw;
    }
  }

  @media only screen and (max-width: 1000px) {
    .priceListColumn {
      border-radius: 50px;
    }
  }

  @media only screen and (max-width: 875px) {
    .priceListColumn {
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  @media only screen and (max-width: 699px) {
    .priceListColumn:first-of-type {
      margin-top: 30px;
    }

    .priceListColumn:last-of-type {
      margin-bottom: 20px;
    }
  }

  /*Animation (flip)*/

  .flip-left-animation {
    animation: flip-left 1s ease-out forwards;
  }

  .flip-right-animation {
    animation: flip-right 1s ease-out forwards;
  }

  @keyframes flip-right {
    0% {
      transform: rotate3d(0, 1, 0, 0deg);
    }

    100% {
      transform: rotate3d(0, 1, 0, 360deg);
    }
  }

  @keyframes flip-left {
    0% {
      transform: rotate3d(0, 1, 0, 360deg);
    }

    100% {
      transform: rotate3d(0, 1, 0, 0deg);
    }
  }

  /*Production Bug Fixes*/
  .leftButton:hover {
    position: absolute!important;
  }

  .rightButton:hover {
    position: absolute!important;
  }

</style>
