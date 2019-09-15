<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" :rules="rules">
      <el-row>
        <el-form-item label="短信渠道" required>
          <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
            <el-option v-for="item in channelList" :label="item.code" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>

        <el-form-item label="短信内容" required>
          <el-input type="textarea" :autosize="{minRows: 10}" v-model="searchForm.smsContent" :maxlength="5000"></el-input>
        </el-form-item>
      </el-row>
      <el-row>

        <el-form-item label="短信类型" required>
          <el-input v-model="searchForm.smsType"></el-input>
        </el-form-item>

        <el-form-item label="验证码" required>
          <el-input v-model="searchForm.code"></el-input>
        </el-form-item>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="getCode" v-loading="getCodeLoading">获取验证码</el-button>
      </el-row>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="importFileUrl"
        name = "file"
        :data = "searchForm"
        :file-list = 'fileList'
        :on-success = 'handleSuccess'
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">批量发送短信</el-button>
        <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(1)">加密手机号</el-button>-->
        <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(3)">下载模板</el-button>-->
        <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
      </el-upload>
      <el-form-item>
      </el-form-item>
    </el-form>
    <br/>


  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'
  import Config from '../../common/config'
  export default {
    data() {
      return {

        ruels:[],
        importFileUrl: Config.host + 'manage/sendSmsBatch',
        fileList:[],
        getCodeLoading:false,
        searchForm: {
          sessionId : DataUtil.sid(),
          userId: DataUtil.id(),
          channel: '',
          smsContent: '',
          smsType: '',
          code:''
        },
        channelList:[{
          code: 'ZENZIVA'
        },{
        code: 'RAJA'
      },{
        code: 'GINOTA'
      },{
        code: 'TWILIO'
      }
          ]
      }
    },
    methods:{
      getCode() {
        this.getCodeLoading = true;
        this.$http.post("manage/sendCodeToEmail", {}).then(response => {
          if (response.body.data) {
            this.getCodeLoading = false;
//            this.searchForm.mobile = response.body.data;
            this.$message.success('验证码已发送，请等待~');
          }
          else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleSuccess(response){

        if (response.code == 1) {
            this.$message.success('批量发送短信成功！');
        } else {
          this.$message.error(response.message);
        }
      }
    },
    mounted: function () {
    }
  }
</script>
