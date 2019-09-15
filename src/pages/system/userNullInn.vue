<template>
  <div id="getUserLastSmsCode">
    <el-form ref="form" :model="serchForm" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="Nomor Ponsel">
        <el-input v-model="serchForm.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="Klasifikasi">
       <el-select v-model="serchForm.addBlackReason" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in fenleilist" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <div class="other_remark">
      <div class="aside_title">Keterangan</div>
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
    <el-button type="primary" @click="bindGrid" class="btn">Lokasi pengguna tidak valid</el-button>
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
        name: 'Alasan Nasabah sendiri',
      }, {
        code: '2',
        name: 'Pengajuannya Kerabat sebagai pengganti',
      }, {
        code: '3',
        name: 'Nasabah berisiko tinggi',
      }, {
        code: '4',
        name: 'Informasi yang diambil',
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
            message:'Lokasi pengguna tidak valid！'
          });
        } else {
          this.$message.error('error');
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
