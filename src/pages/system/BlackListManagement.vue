<template>
  <section>
    <br/><br/><br/>

    <el-upload
      class="upload-demo"
      ref="upload"
      :action="importFileUrl"
      name = "file"
      :data = "upLoadData"
      :file-list = 'fileList'
      :on-success = 'handleSuccess'
      :auto-upload="false" style="margin-left: 30px;">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传黑名单文件</el-button>
      <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(1)">下载黑名单模板</el-button>-->
      <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(3)">下载模板</el-button>-->
      <!--<div slot="tip" class="el-upload__tip">文件不超过500kb</div>-->
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

        importFileUrl: Config.host + 'manage/addBlackListByFile',
        upLoadData: {
//          type : 0,
          sessionId : DataUtil.sid(),
//          userId: DataUtil.id()
        },
        fileList:[],
      }
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
     handleSuccess(response){
        if (response.code == 1) {
          this.$message({
            type: 'success',
            message: '添加黑名单成功'
          });
        } else {
          this.$message.error('添加黑名单失败！');
        }
      }
    },
    mounted: function () {
    }
  }
</script>
