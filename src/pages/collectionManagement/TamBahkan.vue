<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="serchForm.uuid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid">加入黑名单</el-button>
      </el-form-item>
    </el-form>
    <el-form ref="form" :model="serchFormone" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="订单编号">
        <el-input v-model="serchFormone.uuid" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGridone">退出黑名单</el-button>
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
      },
      serchFormone: {
        uuid: ''
      },
    }
  },
  methods: {
    bindGrid() {
      let _data = Object.assign({"orderType":1},this.serchForm);
      this.gridLoading = true;
      this.$http.post('manage/collection/addCollectionBlackList', _data).then(response => {
        this.gridLoading = false;
        if (1 == response.body.code && response.body.data) {
          this.$message({
            type: 'success',
            message:'设置成功！'
          });
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {

      });
    },
    bindGridone() {
      let _data = Object.assign({"orderType":2},this.serchFormone);
      this.gridLoading = true;
      this.$http.post('manage/collection/addCollectionBlackList', _data).then(response => {
        this.gridLoading = false;
        if (1 == response.body.code && response.body.data) {
          this.$message({
            type: 'success',
            message:'设置成功！'
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
