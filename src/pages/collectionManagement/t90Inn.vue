<!--  逾期订单查询 -->
<template>
  <section  style="background:#f1f2f7">
    <!--工具条-->
    <el-card class="box-card">
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item>
        <a>1. Download</a><br>
          <el-button @click="numMuban" type="primary" size="small">Download Data</el-button>
        <p style="font-size:12px;">Download data collection perhari kemarin</p>
          <br>
          <el-button @click="template" type="primary" size="small">Download Template</el-button>
        <p style="font-size:12px;">Download template data collection</p>

      </el-form-item>
    </el-form>
    </el-card>

    <el-card class="box-card"  style="margin-top:20px">
    <el-row>
      <el-col :span="16">
        <el-form :inline="false" :model="searchForm" class="toolbar">
          <el-form-item>
            <a>2. Import</a>
            <br>
            <p style="font-size:12px;">a. Import File yang telah di Update</p>
            <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :on-change="getAuth"
            :action="importFileUrl"
            name="file"
            :data="pageList"
            :file-list="fileList"
            :on-success="handleSuccess"
            :on-error="handleError"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">Pilih Dokumen</el-button>

            <el-input
            autosize
            v-model="filePath"
            placeholder="Pilih File yang akan di upload"
            size="mini"
            :disabled="true">
          </el-input>
          <el-row type="flex" class="row-bg" justify="end">
            <el-button
            style="margin-top:20px"
            size="small"
            type="success"
            :disabled=isNeedAuth
            @click="submitUploadTemplate"
            >Upload File berdasar template</el-button>

            <el-button
            style="margin-top:20px"
            size="small"
            type="success"
            :disabled=isNeedAuth
            @click="submitUpload"
            >Upload File berdasar data kemarin</el-button>
          </el-row>
          <div slot="tip" class="el-upload__tip">File tidak lebih dari 100MB</div>
        </el-upload>
      </el-form-item>
      <br>
      <p style="font-size:12px;">b. Import Verification</p>
      <br>
      <el-form
      style="margin-start:12px;"
      v-loading="loading"
      element-loading-text="Sedang Memproses..."
      element-loading-spinner="el-icon-loading"
      class="box-card">
      <p style="font-size:12px;"> Hasil pengecekan file : <br> {{importMessage}}</p>
      <p style="font-size:12px;" v-for="o in importData" :key="o" class="text item">
        {{ o }}
      </p>
    </el-form>
    <br>
    <el-row type="flex" class="row-bg" justify="end">
    <el-button
    style="margin-top:20px"
    size="small"
    type="success"
    :disabled=!isSuccessCheck
    @click="confirm">Konfirmasi
    </el-button>
    </el-row>
    <br>
    <br>
    <p class="el-upload__tip" style="font-size:12px;"> *Data will be updated tomorrow at 05:00 in the morning </p>
    <br>
  </el-form>
</el-col>
</el-row>

</el-card>

</section>
</template>
<script>
import enums from "../../common/Enum";
import DataUtil from "../../common/dataUtil";
import Config from "../../common/config";
export default {
  data() {
    return {
      searchForm: {
        startTime: "",
        endTime: "",
        userName: "",
        work: ""
      },
      addFormLoading: false,
      editFormLoading: false,
      loading:false,
      fileList: [],
      filePath:"",
      importMessage:"",
      importData:"",
      isNeedAuth: true,
      isTemplate: true,
      isSuccessCheck: false,
      multipleSelection: [],
      Tuuid: [],
      importFileUrl: '',
      pageList: {
        userId: DataUtil.id(),
        OSSAccessKeyId: "",
        policy: "",
        Signature: "",
        key:"",
        "x-oss-security-token":"",
        "x-oss-meta-author": DataUtil.id(),
        "x-oss-meta-confirm": "0",
        success_action_status: "201"
      },
      sessionId: ""
    };
  },
  methods: {
    submitUpload() {
      if(!this.isNeedAuth){
        this.isTemplate = false;
        this.isSuccessCheck = false;
        this.$refs.upload.submit();
      }
      else{
        this.$message.error("session habis,pilih ulang file!");
      }
    },
    submitUploadTemplate() {
      if(!this.isNeedAuth){
        this.isTemplate = true;
        this.isSuccessCheck = false;
        this.$refs.upload.submit();
      }
      else{
        this.$message.error("session habis,pilih ulang file!");
      }
    },
    handleSuccess(response,file) {
      if (file.status == "success") {
        this.$message.success("file berhasil di upload");
        this.fileList = [];
        this.loading = true;
        this.isNeedAuth = true;
        this.filePath = "";
        var url = ""
        if(this.isTemplate){
            url = Config.oss + '/all';
        }
        else{
            url = Config.oss + '/check';
        }
        this.$http.post(url).then(response => {
          if (1 == response.body.code) {
            this.loading = false;
            this.isSuccessCheck = true;
            this.importMessage = response.body.message;
            if(response.body.data.length>0){
              this.importData =response.body.data;
            }
            else{
              this.importData = "";
            }
            this.$message.success("sukses");
          } else {
            this.loading = false;
            this.isSuccessCheck = false;
            this.importMessage = response.body.message;
            this.$message.error(response.body.message);
          }
        }
        , response => {});
      } else {
        this.isNeedAuth = true;
        this.$message.error("gagal upload file,coba lagi");
        this.fileList = [];
      }
    },
    handleError(err,file) {
      this.isNeedAuth = true;
      this.$message.error("gagal upload file,coba lagi");
      this.fileList = [];
    },
    confirm() {
      this.loading = true;
      this.$http.post(Config.oss + '/confirm').then(response => {
        if (1 == response.body.code) {
          this.loading = false;
          this.isSuccessCheck = false;
          this.importData = "";
          this.importMessage = response.body.message;
          this.$message.success(response.body.message);
        } else {
          this.loading = false;
          this.isSuccessCheck = false;
          this.importData = "";
          this.$message.error(response.body.message);
        }
      }
      , response => {});
    }
    ,bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    getAuth(file,files){
      if(files.length>1){
        files[0] = files[1]
        files.pop();
      }
      if(file.status =="ready"){
        if (file.name.includes(".xlsx")){
          this.filePath = "/" + file.name + " (" + this.bytesToSize(file.size) + ")";
          this.$http.post(Config.oss + '/upload').then(response => {
            if (1 == response.body.code) {
              this.isNeedAuth = false;
              this.pageList.OSSAccessKeyId = response.body.keyId;
              this.pageList.policy = response.body.policy;
              this.pageList.Signature = response.body.signature;
              this.pageList.key = response.body.filename;
              this.pageList['x-oss-security-token'] = response.body.ststoken;
              this.importFileUrl = response.body.url;
            } else {
              this.isNeedAuth = true;
              this.$message.error(response.body.message);
            }
          }
          , response => {})
        }
        else{
          this.fileList = [];
          this.$message.error("File harus berformat .xlsx");
        }
      }
    },
    numMuban() {
      window.open(
        Config.oss + '/download'
      );
    },
    template() {
      window.open(
        Config.oss + '/template'
      );
    },
  },
};
</script>
