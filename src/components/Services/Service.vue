<template>
  <v-layout v-if="loading" class="loadContainer">

    <app-loading></app-loading>

  </v-layout>

  <div class="wrapper minHeight" v-else>
    <img class="serviceImage" :src="service.imageUrl" alt="service image">
    <transition name="slideInLeft" appear>
    <div class="titleContainer">
      <p><app-text-effect :message="serviceTitle"></app-text-effect></p>
    </div>
    </transition>
    <div class="descriptionContainer">
      <p>{{ service.description }}</p>
    </div>
    <p v-if="service.price" class="priceLabel">Цени за услугата</p>
    <div v-if="service.price" class="priceListsContainer">
      <div class="priceListColumn"
        v-for="column in numberOfPriceColumns">
        <template v-for="list in priceColumns[column - 1]">
        <div class="rows"
             v-if="list.servicePrice">
          <span class="serviceName">{{ list.serviceName }}</span>
          <span class="servicePrice">{{ list.servicePrice }}</span>
        </div>
        <div v-else>
          <p class="section">{{ list.serviceName }}</p>
        </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import textEffect from '../Home/TextEffect.vue'

  export  default {
    data() {
      return {
        serviceTitle: '',
        numberOfPriceColumns: null,
        sectionsIndexes: [],
        priceColumns: []
      }
    },
    props: ['id'],
    computed: {
      service () {
        let selectedService = this.$store.getters.getSelectedService(this.id)

        let that = this

        setTimeout(() => {
          that.serviceTitle = selectedService.title
        }, 600)

        if(selectedService.price){
          this.locateSectionsIndexes(selectedService)

          this.createEmptySubListArrays(this.numberOfPriceColumns)

          this.populateTheSubListArrays(selectedService)
        }

        return selectedService
      },
      loading() {
        return this.$store.getters.getLoadingState
      }
    },
    methods: {
      locateSectionsIndexes(serviceObject){
        let sum = 0
        for (let i = 1; i < serviceObject.price.priceDetails.length; i++){
          if (!serviceObject.price.priceDetails[i]. servicePrice){
            this.sectionsIndexes.push(i - sum)
            sum += i - sum
          }
        }
        this.sectionsIndexes.push(serviceObject.price.priceDetails.length - sum)

        this.numberOfPriceColumns = this.sectionsIndexes.length
      },
      createEmptySubListArrays(numberOfArrays) {
        for (let i = 0; i < numberOfArrays; i++){
          this.priceColumns.push([])
        }
      },
      populateTheSubListArrays(serviceObject) {
        let lastAddedPriceIndex = this.sectionsIndexes[0]
        let el = 0
        for (let i = 0; i < this.numberOfPriceColumns; i++){
          for (el; el < lastAddedPriceIndex; el++){
              this.priceColumns[i].push(serviceObject.price.priceDetails[el])
          }
          lastAddedPriceIndex += this.sectionsIndexes[i + 1]
        }
      }
    },
    components: {
      'app-text-effect': textEffect
    },
    created() {
      if (!this.$store.getters.getServices.length){
        this.$store.dispatch('loadServices')
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Kanit|Roboto|Prosto+One&subset=cyrillic');
  @import url('https://fonts.googleapis.com/css?family=Gabriela');

  .wrapper {
    position: relative;
  }

  .serviceImage{
    display: block;
    height: 69.9vh;
    width: 100%;
  }

  .titleContainer{
    position:absolute;
    top:0;
    border: 52.45vh solid transparent;
    border-left: 45vw solid rgba(52, 73, 94, .55);
    border-bottom:0;
  }

  /*Service Title*/

  .titleContainer p{
    position: absolute;
    top: -20vh;
    left: -43.5vw;
    z-index: 2;
    margin: 0;
    text-align: center;
    font-size: 2.917vw;
    font-weight: 600;
    max-width: 23vw;
    color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }

  .descriptionContainer{
    position: absolute;
    display: flex;
    top: 52.4vh;
    left: 0;
    right: 0;
    height: 17.5vh;
    background-color: rgba(52, 73, 94, .55);
  }

  /*Service Description*/

  .descriptionContainer p{
    margin: 0 auto;
    text-align: center;
    width: 110vh;
    font-size: 1.41vw;
    white-space: pre-line;
    align-self: center;
  }

  .priceLabel{
    width: 28%;
    margin: 1.5% auto;
    text-align: center;
    font-size: 2.43vw;
    padding: 5px 50px;
    border-radius: 50px;
    color: white;
    box-shadow: 0 3px 6px black;
    text-shadow: 2px 3px rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to bottom, #ee3d39, #f34e37, #f85d35, #fc6b34, #ff7934);
  }

  .priceListsContainer{
    display: flex;
    justify-content: space-around;
    margin: auto auto 2vh;
    width: 95vw;
    border-radius: 25px;
    box-shadow: 0 3px 6px black;
    background-image: linear-gradient(to bottom, #ee3d39, #f34e37, #f85d35, #fc6b34, #ff7934);
  }


  .priceListColumn{
    position: relative;
    width: 23vw;
    height: 40vh;
    border-radius: 25px;
  }

  .section{
    text-align: center;
    font-family: 'Gabriela', serif;
    color: greenyellow;
    font-size: 1.8vw;
    text-shadow: 1px 1.5px rgba(0, 0, 0, 0.5);
    margin-top: 2vh;
  }

  .serviceName, .servicePrice {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3vw;
    text-shadow: .5px 1.5px rgba(0, 0, 0, 0.5);
  }

  .serviceName {
    left: 5%;
    white-space: pre-line;
  }

  .servicePrice {
    right: 5%;
  }

  .rows {
    height: 4.4vh;
    min-height: 40px;
    position: relative;
  }

  /*animation*/

  .slideInLeft-enter-active{
    animation: slideInLeft 0.5s ease-out forwards;
  }

  @keyframes slideInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @media only screen and (max-width: 1440px) {

    /*Service Description*/

    .descriptionContainer p{
      font-size: 1.45rem;
    }

    .section{
      font-size: 1.8vw;
      text-shadow: 1px 1.5px rgba(0, 0, 0, 0.5);
    }

    .serviceName, .servicePrice {
      font-size: 1.3vw;
      text-shadow: .5px 1.5px rgba(0, 0, 0, 0.5);
    }

  }

  @media only screen and (max-height: 800px) {
    /*Service Description*/

    .descriptionContainer p{
      font-size: 2.5vh;
    }

    .priceListsContainer{
      height: 320px;
    }
  }

  @media only screen and (max-width: 750px) {

    .priceListsContainer{
      flex-direction: column;
      height: auto;
    }

    .priceListColumn{
      width: 95vw;
      height: auto;
      margin-top: 2vh;
      margin-bottom: 2vh;
    }

    .section{
      font-size: 2rem;
      margin-top: 2vh;
    }

    .serviceName, .servicePrice {
      font-size: 1.3rem;
    }

    .rows {
      height: 30px;
      margin-bottom: 3px;
    }

  }

  @media only screen and (max-width: 600px) {

    .titleContainer{
      display: flex;
      height: 22vh;
      width: 100vw;
      border-style: none;
      background-color: rgba(52, 73, 94, .55);
    }

    /*Service Title*/

    .titleContainer p{
      position: relative;
      align-self: center;
      font-size: 2rem;
      top: 0;
      left: 0;
      max-width: 100vw;
      margin: 0 auto;
    }

    .descriptionContainer{
      position: relative;
      top: 0;
      height: auto;
    }

    .priceLabel{
      width: 60%;
      font-size: 2rem;
      padding: 10px 10px;
      margin: 20px auto;
    }

  }

</style>
