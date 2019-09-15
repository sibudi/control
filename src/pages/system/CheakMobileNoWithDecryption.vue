<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="加密手机号">
        <el-input v-model="searchForm.mobileNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="addFormSubmit" type="info">解密</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="手　机　号">
        <el-input v-model="searchForm.encryptMobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="info">加密</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="searchForm.encryptUserMobile"></el-input>
      </el-form-item>
    </el-form>

    <el-upload
      class="upload-demo"
      ref="upload"
      :action="importFileUrl"
      name = "file"
      :data = "upLoadData"
      :file-list = 'fileList'
      :on-success = 'handleSuccess'
      :auto-upload="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(0)">解密手机号</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(1)">加密手机号</el-button>
      <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(3)">下载模板</el-button>-->
      <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
    </el-upload>
    <br/>


  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    data() {
      return {

        importFileUrl: Config.host + 'manage/downloadUserMobile',
        upLoadData: {
          type : 0,
          sessionId : DataUtil.sid(),
          userId: DataUtil.id()
        },
        fileList:[],
        searchForm: {
          mobileNumber: '',
          mobile: '',
          encryptMobile: '',
          encryptUserMobile:''
        }
      }
    },
    methods:{
      addFormSubmit() {
        this.$http.post("manage/cheakUserMobileNoWithDecryption",
          {"mobileNumber":this.searchForm.mobileNumber}).then(response => {
          if (1 == response.body.code) {
            this.searchForm.mobile = response.body.data;
          }
          else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      submitForm() {
        this.$http.post("manage/encryptUserMobile",
          {"encryptMobile":this.searchForm.encryptMobile}).then(response => {
          if (1 == response.body.code) {
            this.searchForm.encryptUserMobile = response.body.data;
          }
          else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      submitUpload(type) {
        this.upLoadData.type = type;
        this.$refs.upload.submit();
      },
      handleSuccess(response){

        if (response.data == undefined) {
          this.$message.error('需要加减密的字段必须以 mobile 开头');
        } else {
          window.open(Config.host + 'manage/getExcelFile?path=' + response.data);
        }
      }
    },
    mounted: function () {
    }
  }
</script>
