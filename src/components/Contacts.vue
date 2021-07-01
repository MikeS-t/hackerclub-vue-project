<template>
  <div id="wrapper">

    <!--Google map-->

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d611.1073276265756!2d27.88550933382021!3d43.23187006973773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a4552252cc0075%3A0xa0ad53a1e317dd80!2z0JjQvdGC0LXRgNC90LXRgiDQutC70YPQsSDQpdCQ0JrQldCg!5e0!3m2!1sen!2sbg!4v1532095785002"
      allowfullscreen
      id="map">
    </iframe>

    <div id="card1" class="card">
      <img src="../../static/Contacts/Irina.jpg" alt="avatar1">
      <div class="contactInfoContainer">
        <div class="contactInfoRow">
          <img src="../../static/Footer/EmailIcon.png" alt="Email icon">
          <span>hacker2@abv.bg</span>
        </div>
        <div class="contactInfoRow">
          <a href="https://www.facebook.com/horus.centre" target="_blank">
            <img  src="../../static/Footer/facebook-icon.png" alt="Facebook icon">
            <span>Ирина Хорус</span>
          </a>
        </div>
        <div class="contactInfoRow">
          <img src="../../static/Footer/PhoneIcon.png" alt="Phone Icon">
          <span>+359 879 601 528</span>
        </div>
      </div>
    </div>

    <div id="card2" class="card">
      <img src="../../static/Contacts/Nikola.jpg" alt="avatar2">
      <div class="contactInfoContainer">
        <div class="contactInfoRow">
          <img src="../../static/Footer/EmailIcon.png" alt="Email icon">
          <span>hacker2@abv.bg</span>
        </div>
        <div class="contactInfoRow">
          <a href="https://www.facebook.com/nikola.grigorov3" target="_blank">
            <img  src="../../static/Footer/facebook-icon.png" alt="Facebook icon">
            <span>Никола Григоров</span>
          </a>
        </div>
        <div class="contactInfoRow">
          <img src="../../static/Footer/PhoneIcon.png" alt="Phone Icon">
          <span>+359 887 832 055</span>
        </div>
      </div>
    </div>

    <div id="workTimeContainer">
      <p>Работно време:</p>
      <p><b>ВСЕКИ ДЕН</b> <br>от <b>10:00</b> до <b>19:00</b> часа</p>
      <p>Обедна почивка от <b>12:00</b> до <b>13:00</b> часа</p>
      <p>(във Вторник, Сряда, Четвъртък, Петък и Неделя)</p>
    </div>

    <a href="https://goo.gl/maps/thnDHn1hWRz" id="showMapButton" target="_blank">
      <v-btn large round>
        <b>Покажи на картата</b>
      </v-btn>
    </a>

  </div>
</template>

<style lang="scss" scoped>
  @import "../sharedVariables";

  #wrapper {
    width: 100vw;
    height: 92vh;
    position: relative;
    display: flex;
    flex-direction: column;

    #map {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 17.37vw;
      min-width: 250px;
      height: 21vw;
      min-height: 300px;
      margin: 2.2vh 0;
      border-radius: 50% / 10%;
      box-shadow: 0 .35vw 1.2vw rgba(0, 0, 0, 0.5);
      transition: 2s;

      &:before {
        content: '';
        position: absolute;
        top: 10%;
        bottom: 10%;
        right: -5%;
        left: -5%;
        background: inherit;
        border-radius: 5% / 50%;
      }

      img {
        position: relative;
        height: 6.95vw;
        min-height: 100px;
        width: 6.95vw;
        min-width: 100px;
        border-radius: 50%;
      }

      .contactInfoContainer {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 12vw;
        min-width: 165px;

        .contactInfoRow {
          display: flex;
          align-items: center;
          margin-top: 1vh;

          &:first-of-type {
            margin-top: 2.5vh;
          }

          img {
            width: 1.7vw;
            min-width: 24px;
            height: 1.7vw;
            min-height: 24px;
          }

          a {
            display: flex;
          }

          span {
            font-size: 1.15vw;
            color: black;
            margin-left: .5vw;
          }
        }
      }
    }

    #card1 {
      align-self: flex-end;
      background-image: linear-gradient(to bottom,
        darken($midColor, 5%),
        mix($midColor, $secondary),
        $secondary);
      margin-right: 6.5vw;
      margin-top: 5vh;
    }

    #card2 {
      margin-left: 6.5vw;
      background-image: linear-gradient(to top,
        $primary,
        $midColor,
        mix($midColor, $secondary),
        $secondary);
    }

    #workTimeContainer {
      position: absolute;
      width: 27.8vw;
      min-width: 350px;
      height: 24.6vh;
      min-height: 150px;
      bottom: 15px;
      right: 15px;
      background-image: radial-gradient(circle, #ffffff, #ededed, #dbdbdb, #cacaca, #b9b9b9);
      box-shadow: 0 .35vw .5vw rgba(0, 0, 0, 0.5);
      transition: 2s;

      p {
        color: black;
        text-align: center;
        font-size: 1.07vw;
        text-shadow: 0.2px 0.2px rgba(0, 0, 0, 0.2);

        &:nth-of-type(1) {
          margin-top: 3.3vh;
          margin-bottom: 2vh;
          font-size: 1.7vw;
          font-weight: 600;
          text-shadow: 0.02vh 0.02vh rgba(0, 0, 0, 0.2);
        }

        &:nth-of-type(2) {
          margin-bottom: 1vh;
          font-size: 1.17vw;
        }

        &:nth-of-type(3) {
          margin: 1vh 0 0;
        }

        &:nth-of-type(4) {
          margin: -.5vh 0;
        }
      }
    }

    #showMapButton {
      display: none;
    }
  }

  @media only screen and (max-width: 1440px) {

    #wrapper {
      .card {
        box-shadow: 0 5px 17px rgba(0, 0, 0, 0.5);

        .contactInfoContainer .contactInfoRow span {
          font-size: 16px;
          margin-left: 7px;
        }
      }

      #workTimeContainer p {
        font-size: 13px;
        text-shadow: 0.2px 0.2px rgba(0, 0, 0, 0.2);

        &:nth-of-type(1) {
          font-size: 22px;
        }

        &:nth-of-type(2) {
          font-size: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 900px) {

    #wrapper {
      justify-content: center !important;
      align-items: center !important;

      #map {
        display: none;
      }

      .card {
        margin: 30px 0!important;
      }

      #card1 {
        align-self: unset;
      }

      #workTimeContainer{
        position: relative;
        margin-top: 20px;
        height: 150px;
        border-radius: 25px;
        bottom: unset;
        right: unset;
        background-image: linear-gradient(to top,
          $primary,
          mix($primary, $midColor),
          $midColor,
          mix($midColor, $secondary),
          $secondary);

        p{
          &:nth-of-type(1) {
            font-size: 25px;
            text-shadow: 0.5px 0.5px rgba(0, 0, 0, 0.2);
            margin-top: 13px;
            margin-bottom: 10px;
          }

          &:nth-of-type(2) {
            font-size: 18px;
            margin: 0;
          }

          &:nth-of-type(3) {
            margin: 0;
          }
        }
      }

      #showMapButton {
        display: inherit;
        margin: 20px 0;

        button {
          font-size: 15px;
          padding: 0 30px;
          background-color: $success;
        }
      }
    }
  }
</style>
