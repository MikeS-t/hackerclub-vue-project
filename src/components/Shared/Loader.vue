<template>
    <div class="loader">
      <ul>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
        <li><div></div></li>
      </ul>
    </div>
</template>

<style scoped>
  @keyframes pulse{
    0%{
      height:0%;
      box-shadow:0 0 4px rgba(0,0,0,1.0);
    }
    20%{
      background:rgba(255,121,52,1);
      height:100%;
      box-shadow:0 0 8px rgba(255,255,255,0.0);
    }
    50%{
      background:rgba(238,61,57,1);
      box-shadow:0 0 16px rgba(255,121,52,1);

    }
    /*50%{*/
      /*background:rgba(17,217,255,1);*/
      /*box-shadow:0 0 8px rgba(17,217,255,0.8);*/
    /*}*/
    70%{
      box-shadow:0 0 16px rgba(238,61,57,1);
    }
    80%{
      background:rgba(255,121,52,1);
      height:100%;
      box-shadow:0 0 8px rgba(255,255,255,0.0);
    }
    100%{
      height:0%;
      box-shadow:0 0 4px rgba(0,0,0,1.0);
    }
  }

  .loader > ul{
    list-style:none;
    position:absolute;
    width:360px;
    height:360px;
    top: 60%;
    margin-top: -180px;
    left: 50%;
    margin-left: -180px;
  }

  .loader li{
    width:14px;
    height:80px;
    border-radius:8px;
    background:#050505;
    position:absolute;
    left:50%;
    margin-left:-2px;
    transform-origin:5px 130px;
    box-shadow:1px 0 0 rgba(255,255,255,0.1);
  }

  .loader li div{
    border-radius:8px;
    width:14px;
    /*background:rgba(255,255,255,0.5);*/
    background:rgba(255,121,52,1);
    position:absolute;
    bottom:0;
    left:0;
    animation:pulse 6s normal infinite;
  }

  ul>li:nth-of-type(1){
    transform:rotate(0deg);
    box-shadow:0 1px 0 rgba(255,255,255,0.1);
  }

  ul>li:nth-of-type(1)>div{
    animation-delay:100ms;
  }

  ul>li:nth-of-type(2){
    transform:rotate(30deg);
  }

  ul>li:nth-of-type(2)>div{
    animation-delay:200ms;
  }


  ul>li:nth-of-type(3){
    transform:rotate(60deg);
  }

  ul>li:nth-of-type(3)>div{
    animation-delay:300ms;
  }


  ul>li:nth-of-type(4){
    transform:rotate(90deg);
  }

  ul>li:nth-of-type(4)>div{
    animation-delay:400ms;
  }


  ul>li:nth-of-type(5){
    transform:rotate(120deg);
  }

  ul>li:nth-of-type(5)>div{
    animation-delay:500ms;
  }


  ul>li:nth-of-type(6){
    transform:rotate(150deg);
  }

  ul>li:nth-of-type(6)>div{
    animation-delay:600ms;
  }


  ul>li:nth-of-type(7){
    transform:rotate(180deg);
    box-shadow:0 -1px 0 rgba(255,255,255,0.1);
  }

  ul>li:nth-of-type(7)>div{
    animation-delay:700ms;
  }


  ul>li:nth-of-type(8){
    transform:rotate(210deg);
    box-shadow:-1px 0 0 rgba(255,255,255,0.1);
  }

  ul>li:nth-of-type(8)>div{
    animation-delay:800ms;
  }


  ul>li:nth-of-type(9){
    transform:rotate(240deg);
    box-shadow:-1px 0 0 rgba(255,255,255,0.1);
  }
  ul>li:nth-of-type(9)>div{
    animation-delay:900ms;
  }


  ul>li:nth-of-type(10){
    transform:rotate(270deg);
    box-shadow:-1px 0 0 rgba(255,255,255,0.1);
  }
  ul>li:nth-of-type(10)>div{
    animation-delay:1000ms;
  }



  ul>li:nth-of-type(11){
    transform:rotate(300deg);
    box-shadow:-1px 0 0 rgba(255,255,255,0.1);
  }

  ul>li:nth-of-type(11)>div{
    animation-delay:1100ms;
  }


  ul>li:nth-of-type(12){
    transform:rotate(330deg);
    box-shadow:-1px 0 0 rgba(255,255,255,0.1);
  }

  ul>li:nth-of-type(12)>div{
    animation-delay:1200ms;
  }
  .loader{
    background: rgb(5,5,5);
    position:relative;
    width: 100%;
    height: 70vh;
  }
</style>
