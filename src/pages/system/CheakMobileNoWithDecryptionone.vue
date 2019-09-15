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
    action="http://192.168.0.230:8089/manage/downloadUserMobile"
    data = "type:3"
    name = "fileResponse"
    :on-preview="handlePreview"
    :before-upload="beforeUpload"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</section>
</template>
<script>
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data() {
    return {

      fileList: [
       
      ],

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
        submitUpload() {
           this.$refs.upload.submit();
         //   let _data = {
         //     type : 3,
         //   }
         // this.$http.post("manage/downloadUserMobile",
         //  {type:3}).then(response => {
         //    if (1 == response.body.code) {
         //      this.searchForm.encryptUserMobile = response.body.data;
         //    }
         //    else {
         //      this.$message.error(response.body.message);
         //    }
         //  }, response => {
         //  });

        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }  
      },
      mounted: function () {
      }
    }
    </script>
