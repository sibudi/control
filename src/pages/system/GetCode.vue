<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="手机号码">
        <el-input v-model="serchForm.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="bindGrid(0)">查询</el-button>
        <el-button type="primary" @click="bindGrid(1)">清除上限</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" v-loading="gridLoading">
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="createTime" label="登录时间">
        <template scope="scope">
          {{formatUnixTime(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column prop="smsCode" label="验证码"></el-table-column>
      <el-table-column prop="smsType" label="类型">
       <template scope="scope">
        {{getOrderTypeone(scope.row.smsType)}}
      </template>
    </el-table-column>
  </el-table>
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
        stageType:null
      },
      zhucezhuangtai:[{
        code:'1',
        name:'注册'
      },{
        code:'2',
        name:'登录'
      }],

    }
  },
  methods: {
    bindGrid(stageType) {
      let _data = Object.assign({},this.serchForm);
      this.gridLoading = true;
      if (stageType ==1) {
       _data.stageType = 1;
     }
     this.$http.post('manage/smsCodeByMobileFromMysql', _data).then(response => {
      this.gridLoading = false;
      if (1 == response.body.code) {          
        if (stageType == 1 && response.body.data > 0) {
          this.$message('success');
          this.tableData = {};
        } else if (stageType ==1 && response.body.data == 0){
         this.$message.error('没有任何修改！');
         this.tableData = {};
       } else if (response.body.data) {
        this.tableData = response.body.data;
      }
    } else {
      this.$message.error(response.body.message);
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