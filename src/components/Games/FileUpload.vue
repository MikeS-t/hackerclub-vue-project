<template>
<div
  id="wrapper"
  @dragover.prevent="addVisibleClass"
  @dragleave.prevent="removeVisibleClass"
  @drop.stop.prevent="onFileDroped">
  <p id="label" ref="label">File drop zone</p>
  <div
    id="dropzone"
    ref="dropzone">
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked"
    >
    <div id="fileUpload">
      <v-text-field
        v-model="displayName"
        :error-messages="errorMsg"
        placeholder="Качи изображение"
        prepend-icon="photo_size_select_actual"
        readonly
        @click.stop="pickImage"
      >
      </v-text-field>
    </div>
  </div>
</div>
</template>

<script>
    export default {
      data() {
        return {
          errorMsg: '',
          displayName: '',
          isImageSelected: false
        }
      },
      props: {
        imageName: {
          type: String
        },
        nameReset: {
          type: Boolean
        }
      },
      watch: {
        imageName: {
          handler: function () {
            if (!this.isImageSelected) {
              this.displayName = this.imageName
            }
          },
          immediate: true
        },
        nameReset: {
          handler: function () {
            this.displayName = this.imageName
          },
          immediate: true
        }
      },
      methods: {
        pickImage () {
          this.errorMsg = ''
          this.$refs.fileInput.click()
        },
        displayAndSaveImageInfo (file) {
          if (file.type.split('/')[0] !== 'image') {
            this.errorMsg = 'Please select a valid image!'
            return false
          }
          if ((file.size / 1048576) > 5) {
            this.errorMsg = "File size should be less then 5 MB!"
            return false
          }

          this.isImageSelected = true

          let fileSize = this.formatFileSize(file.size)
          this.displayName = file.name +
            ' (' + fileSize + ')'

          const fileReader = new FileReader()

          fileReader.addEventListener('load', () => {
            this.$emit('imageUrl', fileReader.result)
          })
          fileReader.readAsDataURL(file)
          this.$emit('rawImage', file)
        },
        onFilePicked (event) {
          const selectedFile = event.target.files[0]
          this.displayAndSaveImageInfo(selectedFile)
        },
        formatFileSize (fileSize) {
          let fSExt = ['Bytes', 'KB', 'MB', 'GB']
          let i=0
          while(fileSize>900) {
            fileSize/=1024
            i++
          }
          return (Math.round(fileSize*100)/100) + ' ' + fSExt[i]
        },
        addVisibleClass () {
          this.$refs.dropzone.classList.add('visible')
          this.$refs.label.classList.add('visible')
          return false
        },
        removeVisibleClass () {
          this.$refs.dropzone.classList.remove('visible')
          this.$refs.label.classList.remove('visible')
          return false
        },
        onFileDroped (event) {
          let selectedFile = event.dataTransfer.files[0]
          this.removeVisibleClass()
          this.displayAndSaveImageInfo(selectedFile)
        }
      }
    }
</script>

<style scoped>
  #wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .visible {
    visibility: visible!important;
  }

  #label {
    text-transform: uppercase;
    font-size: 6vh;
    color: #ee3d39;
    margin: 0;
    padding: 0;
    visibility: hidden;
  }

  #dropzone {
    height: 50vh;
    width: 50vw;
    border: 4px dashed #ee3d39;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    z-index: 2;
  }

  #fileUpload {
    visibility: visible;
    width: 14.93vw;  /*215px*/
    height: 6.42vh;  /*50px*/
    display: flex;
    justify-items: center;
  }

  #fileUpload * {
    font-size: 2.05vh; /*16px*/
    min-height: 6.42vh;  /*50px*/
  }

</style>
