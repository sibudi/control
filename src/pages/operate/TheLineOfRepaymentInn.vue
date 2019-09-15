<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :rules= "rules" :model="searchForm" class="toolbar" label-width="100px" ref="searchForm">
      <el-form-item label="Nomor Permohonan" prop="orderNo">
        <el-input v-model="searchForm.orderNo"></el-input>
      </el-form-item><br>
      <el-form-item label="Nomor pengguna" prop="userUuid">
        <el-input v-model="searchForm.userUuid"></el-input>
      </el-form-item><br>
      <el-form-item label="jumlah yang akan didapatkan" prop="actualRepayAmout">
        <el-input v-model="searchForm.actualRepayAmout"></el-input>
      </el-form-item><br>
      <el-form-item label="Batas pinjaman" prop="actualRepayTime">
        <el-date-picker v-model="searchForm.promiseDate" type="date" placeholder="Pilih tanggal" :picker-options="pickerOptions"></el-date-picker>
        <el-time-select placeholder="Pilih tanggal" v-model="searchForm.promiseTime" :picker-options="pickerTimeOptions"></el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="bindGrid" type="info" :loading="confirmLoading">YAKIN</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import DataUtil from '../../common/dataUtil'
export default {
  data() {
    let compareDate = (time) => {
      let _time = time.setDate(time.getDate());
      return time.getTime() >= Date.now();
    };
    var validateMoney = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('the money is not empty!'));
      }
      var regPos = /^\d+(,\d+)*(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if(regPos.test(value) || regNeg.test(value)){
        callback();
      }else{
        callback(new Error('the money must be number!'));
      }
    };
    return {
      searchForm: {
        orderNo: '',
        userUuid: '',
        actualRepayAmout: '',
        promiseDate:'',
        promiseTime:'',
      },
      pickerTimeOptions: {
        start: '00:00',
        end: '23:00',
        step: '01:00'
      },
      pickerOptions: {
        disabledDate(time) {
          return compareDate(time)
        }
      },
      actualRepayTime:'',
      confirmLoading: false,
      rules: {
        actualRepayAmout:[
        { validator: validateMoney,  trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    bindGrid() {
      let _data = Object.assign({'operatorId': DataUtil.id(),
        actualRepayTime: this.getRealdate(this.searchForm.promiseDate ? (this.searchForm.promiseDate.setHours(this.searchForm.promiseTime.split(':')[0])) : '')},this.searchForm);
      this.confirmLoading = true;
      this.$http.post('manage/manualOperationRepayOrder',_data).then(response =>{
        this.confirmLoading = false;
        let {body} = response;
        if(body.code == 1){
         this.$message({
          type: 'success',
          message: '还款成功~~~'
        });

         this.$refs.searchForm && this.$refs.searchForm.resetFields();

       }else{
        this.$message.error(response.body.message);
      }

    },response=>{this.confirmLoading = false;});
    },
    getRealdate(dates) {
      if (!dates) {
        return ''
      }
      var myDate = new Date(dates);
      // myDate.setUTCHours(10);
      // return myDate.toLocaleString(); //获取日期与时间
      let minute=myDate.getMinutes();
      if(minute<10){
        minute="0"+minute;
      }
      let seconds=myDate.getSeconds()
      if(seconds<10){
        seconds="0"+seconds;
      }
      return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+minute+":"+seconds
    },
  },
  mounted() {

  }
}
</script>
<style>
</style>
