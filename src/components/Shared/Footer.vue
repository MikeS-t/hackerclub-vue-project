<template>
  <div class="wrapper">
    <section>
      <div class="label">Контакти</div>
      <div class="contactsRow">
        <img src="../../../static/Footer/PhoneIcon.png" alt="ContactPhone">
        <p>+359 887 832 055</p>
      </div>
      <div class="contactsRow">
        <img src="../../../static/Footer/EmailIcon.png" alt="ContactEmail">
        <p>hacker2@abv.bg</p>
      </div>
      <div class="contactsRow">
        <img src="../../../static/Footer/facebook-icon.png" alt="ContactFacebook">
        <a href="https://www.facebook.com/internetcoffeeclubhacker/" class="clearText" target="_blank">
          <p>Интернет клуб "Хакер"</p>
        </a>
      </div>
    </section>
    <section>
      <div class="label">Последвайте ни</div>
      <div class="followUsRow">
        <a href="https://www.facebook.com/internetcoffeeclubhacker/" target="_blank">
          <img src="../../../static/Footer/FacebookImg.png" alt="Facebook">
        </a>
        <a href="https://twitter.com/tweeter?lang=en" target="_blank">
          <img src="../../../static/Footer/TweeterImg.png" alt="Tweeter">
        </a>
        <a href="https://www.linkedin.com/uas/login?_l=en" target="_blank">
          <img src="../../../static/Footer/LinkedInImg.png" alt="LinkedIn">
        </a>
      </div>
      <div class="followUsRow">
        <a href="https://www.snapchat.com/" target="_blank">
          <img src="../../../static/Footer/BellImg.png" alt="Snapchat">
        </a>
        <a href="https://www.instagram.com/?hl=en" target="_blank">
          <img src="../../../static/Footer/Camerimg.png" alt="Instagram">
        </a>
        <a href="https://www.viber.com/" target="_blank">
          <img src="../../../static/Footer/CallImg.png" alt="Viber">
        </a>
      </div>
    </section>
    <section>
      <div class="label">Посетете още</div>
      <div class="visitMoreRow">
        <a href="https://www.ue-varna.bg/" target="_blank">
          <img src="../../../static/Footer/VinsLogo1.png" alt="VinsVarna">
        </a>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../sharedVariables";

  .wrapper {
    height: 100%;
    background-image: linear-gradient(to top,
      $secondary,
      mix($midColor, $secondary),
      $midColor,
      mix($primary, $midColor),
      $primary);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    z-index: 2;
    box-shadow: inset 0 -.4vw .7vw .3vw black;

    section {
      height: 21.5vh;
      min-height: 150px;
      width: 24vw;
      min-width: 225px;
      overflow: hidden;

      .label {
        background-color: #424242;
        margin: .5vh auto 2vh;
        padding: .6vh 0;
        width: 15vw;
        min-width: 220px;
        border-radius: 3vw;
        text-align: center;
        font-size: 1.15vw;
        font-weight: bold;
        box-shadow: 0 0 .069vw .17vw black;
      }

      .contactsRow {
        width: 14.5vw;
        min-width: 190px;
        margin: .8vh auto;
        display: flex;
        align-items: center;

        img {
          width: 2vw;
          min-width: 30px;
          height: 3.5vh;
          min-height: 30px;
        }

        p {
          color: black;
          margin: 0 0 0 1vw;
          min-width: 163px;
          font-size: 1.05vw;
        }
      }

      .followUsRow {
        width: 12vw;
        margin: 1.5vh auto 1vh;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 2.5vw;
          min-width: 36px;
          height: 4vh;
          min-height: 36px;
          margin: 0 1vw;
          filter: drop-shadow(.13vh 0 .4vh #222);
        }
      }

      .visitMoreRow {
        width: 14.5vw;
        margin: 0 auto;
        display: flex;
        justify-content: center;

        img{
          width: 7.5vw;
          min-width: 120px;
          height: 13vh;
          min-height: 110px;
        }
      }
    }
  }

  @media only screen and (max-width: 1440px) {

    .wrapper {
      box-shadow: inset 0 -5px 10px 4px black;

      section .label {
        font-size: 1.2rem;
        box-shadow: 0 0 1px 2px black;

        .followUsRow img {
          filter: drop-shadow(1px 0 3px #222);
        }
      }

      section .contactsRow p {
        font-size: 1.1rem;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    .wrapper {
      padding-bottom: 30px;
      flex-direction: column;
      height: auto;

      section {
        margin-top: 15px;
        overflow: visible;

        .label {
          border-radius: 18px;
        }

        .followUsRow img {
          margin: 0 10px;
        }
      }
    }
  }
</style>
