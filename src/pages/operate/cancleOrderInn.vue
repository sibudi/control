<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="Nomor Permohonan">
        <el-input v-model="serchForm.orderNo" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid">取消订单</el-button>
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
        orderNo: ''
      }
    }
  },
  methods: {
    bindGrid() {
      let _data = Object.assign({},this.serchForm);
      this.gridLoading = true;
      this.$http.post('manage/cancleOrder', _data).then(response => {
        this.gridLoading = false;
        if (1 == response.body.code && response.body.data == 1) {
          this.$message({
            type: 'success',
            message:'取消订单成功'
          });
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {

      });
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
