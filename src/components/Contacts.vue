<template>
  <div class="contactsWrapper">

    <!--Google map-->

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d611.1073276265756!2d27.88550933382021!3d43.23187006973773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4552252cc0075%3A0xa0ad53a1e317dd80!2z0JjQvdGC0LXRgNC90LXRgiDQutC70YPQsSDQpdCQ0JrQldCg!5e0!3m2!1sen!2sbg!4v1532095785002"
      allowfullscreen
      class="map hidden">
    </iframe>

    <!--The grid container for the page-->

    <v-container fluid class="noPadding shapesGrid">

      <!--First info box-->

      <v-layout xs12 md5 lg3 row>
        <v-spacer class="hidden"></v-spacer>
        <div class="displayShape shapeMarginRight accent">
          <v-container fluid>
            <v-layout xs12 align-center column fill-height>
              <v-avatar
                class="avatar"
                size="100">
                <img src="../../static/Contacts/Irina.jpg" alt="avatar">
              </v-avatar>
              <div>
                <v-icon class="marginRight">alternate_email</v-icon>
                <span>horus.horus@abv.bg</span>
              </div>
              <div>
                <a href="https://www.facebook.com/horus.centre"
                   class="clearText"
                   target="_blank">
                  <img
                    src="../../static/Footer/facebook-icon.png"
                    alt="facebook"
                    class="facebookIcon marginRight"
                  >
                  <span>Irina Horus</span>
                </a>
              </div>
              <div>
                <v-icon class="marginRight">contact_phone</v-icon>
                <span class="centerText">+359 879 601 528</span>
              </div>
            </v-layout>
          </v-container>
        </div>
      </v-layout>

      <!--Second info box-->

      <v-layout row justify-space-between fill-height>
        <div class="displayShape shapeMarginLeft primary">
          <v-container fluid>
            <v-layout xs12 align-center column fill-height>
              <v-avatar
                class="avatar"
                size="100">
                <img src="../../static/Contacts/Nikola.jpg" alt="avatar">
              </v-avatar>
              <div>
                <v-icon class="marginRight">alternate_email</v-icon>
                <span>iam4ever@abv.bg</span>
              </div>
              <div>
                <a href="https://www.facebook.com/nikola.grigorov3"
                   class="clearText"
                   target="_blank">
                  <img
                    src="../../static/Footer/facebook-icon.png"
                    alt="facebook"
                    class="facebookIcon marginRight"
                  >
                  <span>Никола Григоров</span>
                </a>
              </div>
              <div>
                <v-icon class="marginRight">contact_phone</v-icon>
                <span>+359 887 832 055</span>
              </div>
            </v-layout>
          </v-container>
        </div>
      </v-layout>

      <v-layout row justify-end>
        <div class="workTimeContainer">
          <p>Работно време:</p>
          <p><b>ВСЕКИ ДЕН</b> <br>от <b>10:00</b> до <b>19:00</b> часа</p>
          <p>Обедна почивка от <b>12:00</b> до <b>13:00</b> часа</p>
          <p>(във Вторник, Сряда, Четвъртък, Петък и Неделя)</p>
        </div>
      </v-layout>

      <!--Google Maps button for small devices-->

      <v-layout row justify-center>
        <a href="https://goo.gl/maps/thnDHn1hWRz"
           class="showMapMarginAuto"
           target="_blank">
          <v-btn
            large
            round
            color="success">
            <b>Покажи карта</b>
          </v-btn>
        </a>
      </v-layout>

    </v-container>
  </div>
</template>

<style scoped>
  .contactsWrapper {
    min-height: 92vh;
    min-width: 265px;
    position: relative;
  }


  .map {
    position: absolute;
    width: 100vw;
    height: 100%;
    border: 0;
  }

  .shapesGrid{
    min-height: 92vh;
  }

  /*Info boxes*/

  .displayShape {
    position: relative;
    width: 17.37vw;
    min-width: 250px;
    height: 21vw;
    min-height: 300px;
    margin: 2.2vh 0;
    border-radius: 50% / 10%;
    text-align: center;
    box-shadow: 0 0.35vw 1.2vw rgba(0, 0, 0, 0.5);
    transition: 2s;
    font-size: 1.12vw;
  }

  .displayShape:hover {
    width: 34.73vw;
    min-width: 500px;
  }

  .displayShape * {
    position: relative;
  }

  .displayShape div {
    margin-top: 0.8vh;
  }

  .displayShape span {
    text-decoration: none;
    line-height: 2.08vw;
    vertical-align: bottom;
    color: white;
  }

  .displayShape a {
    text-decoration: none;
  }

  .displayShape i{
   font-size: 1.7vw!important;
  }

  .displayShape:before {
    content: '';
    position: absolute;
    top: 10%;
    bottom: 10%;
    right: -5%;
    left: -5%;
    background: inherit;
    border-radius: 5% / 50%;
  }

  .avatar{
    height: 6.95vw!important;
    min-height: 100px;
    width: 6.95vw!important;
    min-width: 100px;
  }

  .avatar img{
    min-height: 100px!important;
    min-width: 100px!important;
  }

  .workTimeContainer{
    width: 27.8vw;
    height: 10.42vw;
    min-height: 150px;
    background-image: radial-gradient(circle, #ffffff, #ededed, #dbdbdb, #cacaca, #b9b9b9);
    box-shadow: 0 0.12vh 0.14vw rgba(0, 0, 0, 0.2);
    z-index: 9999;
    margin-top: -9%;
    margin-bottom: 1%;
    margin-right: 0.6%;
    align-self: flex-end;
    color: black;
  }

  .workTimeContainer p{
    text-align: center;
    text-shadow: 0.2px 0.2px rgba(0, 0, 0, 0.2);
  }

  .workTimeContainer p:nth-of-type(1){
    margin: 2% 0 0;
    font-size: 1.7vw;
    font-weight: 600;
    text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.2);
  }

  .workTimeContainer p:nth-of-type(2){
    margin: 1% 0 0;
    font-size: 1.17vw;
  }

  .workTimeContainer p:nth-of-type(3){
    margin: 1% 0 0;
    font-size: 1.07vw;
  }

  .workTimeContainer p:nth-of-type(4){
    margin: -4px 0 0;
    font-size: 1.07vw;
  }

  .facebookIcon {
    width: 1.7vw;
    min-width: 24px;
    height: 1.7vw;
    min-height: 24px;
  }

  /*Helper classes*/

  .shapeMarginRight {
    margin-right: 5vw;
  }

  .shapeMarginLeft {
    margin-left: 5vw;
  }

  .showMapMarginAuto {
    display: none;
    margin: 3% auto auto;
    text-decoration: none;
  }

  .marginRight {
    margin-right: 5px;
  }

  @media only screen and (max-width: 1440px) {
    .displayShape {
      margin: 20px 0;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
      font-size: 16px;
    }

    .displayShape div {
      margin-top: 7px;
    }

    .displayShape span {
      line-height: 30px;
    }

    .displayShape i{
      font-size: 24px!important;
    }

    .workTimeContainer{
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .workTimeContainer p:nth-of-type(1){
      font-size: 1.7rem;
    }

    .workTimeContainer p:nth-of-type(2){
      font-size: 1.2rem;
    }

    .workTimeContainer p:nth-of-type(3){
      font-size: 1.1rem;
    }

    .workTimeContainer p:nth-of-type(4){
      font-size: 1.1rem;
    }

    .shapeMarginRight {
      margin-right: 5vw;
    }

    .shapeMarginLeft {
      margin-left: 5vw;
    }
  }


  @media only screen and (max-width: 700px) {
    .hidden{
      display: none;
    }

    .displayShape {
      margin: 20px auto;
    }

    .workTimeContainer{
      width: 320px;
      margin: auto;
      border-radius: 25px;
      background-image: linear-gradient(to top, #ee3d39, #f34e37, #f85d35, #fc6b34, #ff7934);
    }

    .workTimeContainer p:nth-of-type(3){
      margin: 0;
      font-size: 1rem;
    }

    .workTimeContainer p:nth-of-type(4){
      margin: -4px 0 0;
      font-size: 0.8rem;
    }

    .showMapMarginAuto {
      display: inherit;
    }
  }
</style>
