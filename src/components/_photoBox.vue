<template>
  <section>
    <el-dialog v-model="dialogVisible" size="full" class="photo_box">
      <div class="rolBtn" @click="rolBtn"></div>
      <div class="rolBtn1" @click="topBtn"></div>
      <el-carousel :height="windowHeight" arrow="always" :autoplay="false">
        <el-carousel-item v-for="(item,index) in photoList" :key="index">
          <div class="photo_box_wrap">
            <img :class="{'rotates': isRotates,'rotates1': isRotates1,'rotates2': isRotates2}" :src="item">
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        windowHeight: '500px',
        dialogVisible: false,
        photoList: [],
        isRotates: false,
        isRotates1: false,
        isRotates2: false
      }
    },
    props: [],
    methods: {
      show(photoList) {
        this.photoList = photoList
        this.dialogVisible = true
      },
      hide() {
        this.dialogVisible = false
      },
      getWindowHeight() {
        let re
        if (window.innerHeight)
          re = window.innerHeight;
        else if ((document.body) && (document.body.clientHeight))
          re = document.body.clientHeight;
        return re
      },
      rolBtn() {
        this.isRotates1=false;
        this.isRotates2=false;
        if(this.isRotates==false){
          this.isRotates=true;
        }else {
          this.isRotates=false;
        }
      },
      topBtn() {
        this.isRotates=false;
        if(this.isRotates1==false){
          this.isRotates1=true;
          this.isRotates2=false;
        }else {
          this.isRotates1=false;
          this.isRotates2=true;
        }
      },
    },
    mounted: function () {
      this.windowHeight = this.getWindowHeight() - 100 + 'px'
    }
  }

</script>
<style>
  .rotates {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
  .rotates1 {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
  .rotates2 {
    transform: rotate(270deg);
    -webkit-transform: rotate(270deg);
  }
  .rolBtn{
    z-index: 999;
    position: absolute;
    bottom: 5%;
    left: 50%;
    margin-left: 30px;
    width: 30px;
    height: 30px;
    background: url('../assets/topBottom.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .rolBtn1{
    z-index: 999;
    position: absolute;
    bottom: 5%;
    left: 50%;
    margin-left: -70px;
    width: 30px;
    height: 30px;
    background: url('../assets/leftRight.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .photo_box .el-dialog {
    background: #99a9bf
  }
  
  .photo_box_wrap {
    width: 100%;
    height: 100%;
    background: #99a9bf;
    position: relative;
  }
  
  .photo_box .photo_box_wrap img {
    position: absolute;
    width: 60%;
    /*height: 80%;*/
    top: 50%;
    left: 45%;
    margin: -20% -10% -10% -25%;
    /*transform: translate(-50%, -50%);*/
  }

</style>
