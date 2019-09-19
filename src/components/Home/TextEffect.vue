<template>
  <div ref="msg">{{ msg }}</div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        codeLetters: '&#*+%?£@§$',
        msg: '',
        current_length: 0,
        fadeBuffer: false
      }
    },
    watch: {
      message () {
        this.current_length = 0;
        this.fadeBuffer = false;
        this.msg = ''
        setTimeout(this.animateIn, 100)
      }
    },
    methods: {
      generateRandomString (length){
        let random_text = '';

        while(random_text.length < length){
          random_text += this.codeLetters.charAt(Math.floor(Math.random()*this.codeLetters.length))
        }

        return random_text;
      },

      animateIn () {
        if(this.current_length < this.message.length){
          this.current_length = this.current_length + 2
          if(this.current_length > this.message.length) {
            this.current_length = this.message.length
          }

          this.msg = this.generateRandomString(this.current_length)

          setTimeout(this.animateIn, 20)
        } else {
          setTimeout(this.animateFadeBuffer, 20)
        }
      },

      animateFadeBuffer () {
        if(this.fadeBuffer === false){
          this.fadeBuffer = [];
          for(let i = 0; i < this.message.length; i++){
            this.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: this.message.charAt(i)});
          }
        }

        let do_cycles = false;
        let message = '';

        for(let i = 0; i < this.fadeBuffer.length; i++){
          let fader = this.fadeBuffer[i];
          if(fader.c > 0){
            do_cycles = true;
            fader.c--;
            message += this.codeLetters.charAt(Math.floor(Math.random()*this.codeLetters.length));
          } else {
            message += fader.l;
          }
        }

        this.msg = message

        if(do_cycles === true){
          setTimeout(this.animateFadeBuffer, 50);
        }
      }
    }
  }
</script>
