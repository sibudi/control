<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="手机号码">
        <el-input v-model="serchForm.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="分类">
       <el-select v-model="serchForm.addBlackReason" placeholder="请选择" clearable>
        <el-option v-for="item in fenleilist" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <div class="other_remark">
      <div class="aside_title">备注</div>
      <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      v-model="serchForm.addBlackRemark"
      class = 'textarear'
      >
    </el-input>
  </div>
  <el-form-item>
    <el-button type="primary" @click="bindGrid" class="btn">用户黑名单</el-button>
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
        mobile: '',
        addBlackReason:'',
        addBlackRemark:''
      },
      fenleilist : [{
        code: '1',
        name: '客户本人原因',
      }, {
        code: '2',
        name: '亲属代替申请',
      }, {
        code: '3',
        name: '高风险客户',
      }, {
        code: '4',
        name: '被盗用信息',
      }],
    }
  },
  methods: {
    bindGrid() {
      let _data = Object.assign({},this.serchForm);
      this.gridLoading = true;
      this.$http.post('manage/setUserDisabled', _data).then(response => {
        this.gridLoading = false;
        if (1 == response.body.code && response.body.data == 1) {
          this.$message({
            type: 'success',
            message:'用户置为无效成功！'
          });
        } else {
          this.$message.error('用户置为无效失败！');
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
.other_remark {
  width: 50%;
  margin-left: 8%;
}
.aside_title {
  font-weight: 400;
  line-height: 40px;
  font-size: 16px;
}
.textarear .el-textarea__inner{
  font-size:15px;
  font-weight: 900;
}
.btn{
  margin-top: 20px;
  margin-left:80px;
}
</style>
