<!--  逾期订单查询 -->
<template>
  <section  style="background:#f1f2f7">
    <!--工具条-->
    <el-card class="box-card" v-loading="loading">
      <el-form :inline="true"  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="toolbar" label-width="100px">
        <el-form-item label="Mobile No" prop="mobile">
          <el-input placeholder="81234567890" v-model="ruleForm.mobile">
            <template slot="prepend">+62</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="checkEmail" type="info" :loading="confirmLoading" :disabled=!isPhoneValid>Get Email</el-button>
        </el-form-item><br>
        <el-form-item label="Email" prop="emailAddress">
          <el-input v-model="ruleForm.emailAddress"
          :disabled=disableEmailBox></el-input>
        </el-form-item><br><br>
        <el-form-item>
          <el-button :disabled=disableForget @click="resetPIN" type="info">Forget PIN</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateEmail" :disabled=disableUpdateEmail type="info">Update Email</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear" type="info">Clear</el-button>
        </el-form-item><br>
        <span >{{importMessage}}</span>
      </el-form>
    </el-card>
  </section>
</template>
<script>
import DataUtil from '../../common/dataUtil'
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value.length > 6) {
        this.isPhoneValid = true;
        callback();
      } else {
        this.isPhoneValid = false;
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(value.match(mailformat)){
        this.disableUpdateEmail = false;
        callback();
        }
      else{
        this.disableUpdateEmail = true;
        callback();
      }

    };
    return {
      ruleForm: {
        mobile: '',
        emailAddress: ''
      },
      rules: {
        mobile: [
          { validator: validatePhone, trigger  : 'change' }
        ],
        emailAddress: [
          { validator: validateEmail, trigger  : 'change' }
        ]
      },
      validateEmail : false,
      isPhoneValid : false,
      disableEmailBox : true,
      disableUpdateEmail : true,
      disableForget : true,
      importMessage:"",
      loading: false,
      confirmLoading: false,
    }
  },
  methods: {
    validate(){

      if(mail.match(mailformat)){
        this.disableEmailBox = true;
        console.log("email valid");
      }
      else{
          this.disableEmailBox = false;
      }
      console.log(this.ruleForm.emailAddress);
    },
    checkEmail() {
      this.loading = true;
      let _data = Object.assign({},this.ruleForm);
      this.$http.post('manage/user/email', _data).then(response => {
        this.loading = false;
        let {body} = response;
        if (1 == body.code) {
            if(body.data != ""){
              this.ruleForm.emailAddress = body.data
                this.disableEmailBox = true;
                this.disableForget = false;
            }
            else{
              this.ruleForm.emailAddress = body.data
              this.disableEmailBox = false;
              this.disableForget = true;
              this.$message.info("User belum memiliki email");
            }
        } else {
          this.$message.error(body.message);
        }
      }).catch((e) =>{
        this.loading = false;
        this.gridLoading = false;
      });
    },
    clear() {
      this.ruleForm.emailAddress = '';
      this.ruleForm.mobile = '';
      this.validateEmail = false;
      this.isPhoneValid = false;
      this.disableUpdateEmail = true;
      this.disableForget = true;
    },
    updateEmail() {
      this.loading = true;
      let _data = Object.assign({},this.ruleForm);
      this.$http.post('manage/user/updateemail', _data).then(response => {
        let {body} = response;
        if (1 == body.code) {
            this.loading = false;
            if(body.data == "Duplikat email"){
              this.$message.error("Email Sudah Terdaftar");
            }
            else{
              this.$message.success("Email Berhasil di Update");
              this.clear();
            }
        } else {
          this.$message.error(body.message);
        }
      }).catch((e) =>{
        this.loading = false;
        this.gridLoading = false;
      });
    },
    resetPIN() {
      this.loading = true;
      let _data = Object.assign({},this.ruleForm);
      this.$http.post('manage/user/resetpin', _data).then(response => {
        this.loading = false;
        let {body} = response;
        if (1 == body.code) {
            if(body.data == true){
              this.importMessage = "PIN baru telah dikirim ke email " + this.ruleForm.emailAddress + ". Pastikan meminta costumer untuk memeriksa folder spam";
            }
        } else {
          this.$message.error(body.message);
        }
      }).catch((e) =>{
        this.loading = false;
        this.gridLoading = false;
      });
    }
  },
  mounted() {

  }
}
</script>
