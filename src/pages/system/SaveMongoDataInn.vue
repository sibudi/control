<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="nomor order" labelWidth="30px;">
        <el-input v-model="serchForm.uuid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid">arsipkan berdasarkan kategori</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
import DataUtil from '../../common/dataUtil'
export default {
  data() {
    return {
      gridLoading: false,
      tableData: [],
      serchForm: {
        uuid: ''
      }
    }
  },
  methods: {
    bindGrid() {
      let _data = Object.assign({},this.serchForm);
      this.gridLoading = true;
      this.$http.post('manage/saveOrderInfoToMongo', _data).then(response => {
        this.gridLoading = false;
        if (1 == response.body.code && response.body.data == 1) {
          this.$message({
            type: 'success',
            message:'success！'
          });
        } else {
          this.$message.error('fail！');
        }
      }, response => {

      });
    },
    formatUnixTime(time){
      if(time == null){return '';}
      let timeStamp = new Date(time);
      return timeStamp.getFullYear() + "年"
      + (timeStamp.getMonth() + 1) + "月" + timeStamp.getDate() + "日"
      + timeStamp.getHours() + "时" + timeStamp.getMinutes() + "分";
    },
    getOrderTypeone(val){
      let re = '';
      this.zhucezhuangtai.forEach(function (obj) {
        if(obj.code == val){
          re = obj.name;
          return;
        }
      });
      return re;
    },
  },

  mounted() {

  }
}
</script>
<style>
#getUserLastSmsCode {
  margin-top: 20px;
}
</style>
