<template>
  <v-container fluid text-xs-center class="wrapper accent" pb-0>
    <v-layout row wrap justify-space-around align-start fill-height>
      <v-flex xs12 md3 class="Contacts">
        <div class="label secondary">Контакти</div>
        <v-container fluid class="noPadding">
          <v-layout justify-center row class="rowsLayout">
            <v-flex xs3 class="contactsRows">
              <img src="../../../static/Footer/PhoneIcon.png" alt="ContactPhone">
            </v-flex>
            <v-flex xs7 text-xs-left>
              <p>+359 887 832 055</p>
            </v-flex>
          </v-layout>
          <v-layout justify-center row class="rowsLayout contactsRows">
            <v-flex xs3 class="contactsRows">
              <img src="../../../static/Footer/EmailIcon.png" alt="ContactEmail">
            </v-flex>
            <v-flex xs7 text-xs-left>
              <p>hacker2@abv.bg</p>
            </v-flex>
          </v-layout>
          <v-layout justify-center row class="rowsLayout contactsRows">
            <v-flex xs3 class="contactsRows">
              <img src="../../../static/Footer/facebook-icon.png" alt="ContactFacebook">
            </v-flex>
            <v-flex xs7 text-xs-left>
              <a href="https://www.facebook.com/internetcoffeeclubhacker/"
                 target="_blank"
                 style="text-decoration: none;">
                <p class="contactsFBLabel">Интернет клуб "Хакер"</p>
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 md3 class="Fallow">
        <div class="label secondary">Последвайте ни</div>
        <v-container grid-list-lg fluid pb-0 pt-0>
          <v-layout justify-center class="rowsLayout">
            <v-flex xs3>
              <a href="https://www.facebook.com/internetcoffeeclubhacker/" target="_blank">
                <img src="../../../static/Footer/FacebookImg.png" alt="Facebook">
              </a>
            </v-flex>
            <v-flex xs3>
              <a href="https://twitter.com/tweeter?lang=en" target="_blank">
                <img src="../../../static/Footer/TweeterImg.png" alt="Tweeter">
              </a>
            </v-flex>
            <v-flex xs3>
              <a href="https://www.linkedin.com/uas/login?_l=en" target="_blank">
                <img src="../../../static/Footer/LinkedInImg.png" alt="LinkedIn">
              </a>
            </v-flex>
          </v-layout>
          <v-layout justify-center class="rowsLayout">
            <v-flex xs3>
              <a href="https://www.snapchat.com/" target="_blank">
                <img src="../../../static/Footer/BellImg.png" alt="Snapchat">
              </a>
            </v-flex>
            <v-flex xs3>
              <a href="https://www.instagram.com/?hl=en" target="_blank">
                <img src="../../../static/Footer/Camerimg.png" alt="Instagram">
              </a>
            </v-flex>
            <v-flex xs3>
              <a href="https://www.viber.com/" target="_blank">
                <img src="../../../static/Footer/CallImg.png" alt="Viber">
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 md3 class="Visit">
        <div class="label secondary">Посетете още</div>
        <v-container fluid pb-0 pt-0>
          <v-layout align-center row>
            <v-flex xs12>
              <a href="https://www.ue-varna.bg/" target="_blank">
                <img src="../../../static/Footer/VinsLogo1.png" alt="VinsVarna">
              </a>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>

  .wrapper {
    position: relative;
    color: black;
    overflow: hidden;
    z-index: 2;
    height: 22vh;
  }

  .label {
    color: white;
    font-size: 1.15vw;
    border-radius: 3vw;
    padding-bottom: 0.5vh;
    padding-top: 0.5vh;
    width: 14vw;
    min-width: 220px;
    margin: auto auto 0.8vh;
    text-shadow: 0.1vh 0.05vh black;
  }

  .Contacts p {
    font-size: 1.05vw;
    min-width: 11.319vw;
  }

  .Contacts img {
    width: 2vw;
    min-width: 30px;
    height: 3.5vh;
    min-height: 30px;
  }

  .Fallow img {
    width: 2.5vw;
    min-width: 36px;
    height: 4vh;
    min-height: 36px;
  }

  .Visit img{
    width: 7.5vw;
    min-width: 130px;
    height: 13vh;
    min-height: 120px;
  }

  .rowsLayout {
    width: 15.28vw;
    min-width: 220px;
    margin: auto!important;
  }

  .contactsRows
  {
    margin-left: -2.1vw;
  }

  .Contacts, .Fallow, .Visit {
    margin-top: 0;
  }

  .contactsFBLabel {
    text-decoration: none;
    color: black;
  }

  @media only screen and (max-width: 1440px) {
    .label {
      font-size: 1.2rem;
      padding-bottom: 5px;
      border-radius: 25px;
      padding-top: 5px;
      margin: auto auto 5px;
      text-shadow: .5px .5px white;
    }

    .Contacts p {
      font-size: 1.1rem;
      min-width: 163px;
    }

    .contactsRows
    {
      margin-left: -30px;
    }

    .Contacts, .Fallow, .Visit {
      margin-top: -20px;
    }
  }

  @media only screen and (max-width: 959px) {
    .wrapper {
      height: auto;
    }

    .Contacts, .Fallow, .Visit {
      margin-top: 0;
    }

    .Contacts img {
      height: 28px;
      min-height: 28px;
    }


  }

  @media only screen and (max-height: 670px) {
    .wrapper {
      height: auto;
    }
  }
</style>
