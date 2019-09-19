/**
* Created by alan on 17-5-1.
*/
<template>
 <section>
  <div class="bg">
   <el-form :model="loginForm" :rules="loginRule" ref="loginForm" label-position="left" class="login_form">
    <h3 class="login_title"></h3>
    <el-form-item prop="username">
     <i class="icon icon_name"></i><input border='false' type="text" class="inputW" width="60px" v-model="loginForm.username" auto-complete="off" placeholder="Username" @keyup.enter.native="submit"></input>
    </el-form-item>
    <el-form-item prop="password">
     <i class="icon_password"></i><input type="password"  class="inputW" v-model="loginForm.password" auto-complete="off" placeholder="Password" @keyup.enter.native="submit"></input>
    </el-form-item>
    <el-form-item>
     <div class="keepPassword" v-bind:class="{keepImg:checked}" ref="checkKeep" @click="checkedKeep"></div>
     <div class="kp">Keep Password</div>
    </el-form-item>
    <el-form-item>
     <el-button style="color: white;width:60%;margin-left:22%;border-radius: 25px;height: 50px;background-color: #f14c50" :loading="logining" @click="submit">SIGN IN</el-button>
    </el-form-item>
   </el-form>
   <ml-change-password ref="changePassword" changeType="1" :username="loginForm.username"></ml-change-password>
  </div>
 </section>
</template>
<script>
import DataUtil from '../common/dataUtil'
  // import mlChangePassword from '../components/_changePasswordInn.vue'
  import mlChangePassword from '../components/_changePasswordInn.vue'
  import enums from '../common/Enum'
  export default {
   data() {
    return {
     ip:'',
     loginForm: {
      username: '',
      password: ''
     },
     loginRule: {
      username: [{
       required: true,
       message: 'Silakan masukkan nomor akun',//'请输入账号',
       trigger: 'blur'
      }],
      password: [{
       required: true,
       message: 'Silakan masukkan kata sandi Anda',//'请输入密码',
       trigger: 'blur'
      }]
     },
     checked: true,
     logining: false,
     checkedshow: true,
     keepImg: '../assets/password.png'
    };
   },
   methods: {
    submit() {
     this.$refs.loginForm.validate((valid) => {
      if (valid && !this.logining) {
       let _data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        third:1,
        ip:this.ip
       }
       this.logining = true
       this.$http.post('manage/sysLogin', _data).then(response => {
        let {
         status,
         body
        } = response
        this.logining = false
        if (1 == body.code && body.data) {
         DataUtil.sid(body.data.sessionId);
         DataUtil.id(body.data.id);
         DataUtil.uuid(body.data.uuid);
         DataUtil.userName(body.data.realName);
         DataUtil.employeeNumber(body.data.employeeNumber);
         DataUtil.voicePhone(body.data.voicePhone);
         this.$http.post('manage/dicItemListByDicCode',{'dicCode':'REGISTER_CHANNEL'}).then(response => {
          if (response.body.code ==1) {
             //                      enums.orderChannel =  response.body.data;
             localStorage.setItem('orderChannel', JSON.stringify(response.body.data));
            }
           });
         if (this.checked) {
          DataUtil.account(body.data.userName)
         } else {
          DataUtil.account('')
         }
         //ahalim: Change into /homeInn
         this.$router.push('/homeInn')
        } else if (10211 == body.code) {
         this.loginForm.password = ''
         this.$refs['changePassword'].show()
        } else {
         this.$message.error(response.body.message)
        }
       }, response => {
        this.logining = false
       })
      } else {
       return false;
      }
     });
    },
    pageInit() {
     if (DataUtil.account()) {
      this.loginForm.username = DataUtil.account()
     }
    },
    checkedKeep(){
     if(this.checked){
      this.checked=false;
     }else{
      this.checked=true;
     }
        // this.keepImg="../assets/password.png"
        // this.$refs.checkKeep.style="background: url(../assets/password.png)";
       },
       getUserIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
         iceServers: []
        });
        let noop = () => {
        };
        let localIPs = {};
        let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
        let iterateIP = (ip) => {
         if (!localIPs[ip]) onNewIP(ip);
         localIPs[ip] = true;
        };
        pc.createDataChannel('');
        pc.createOffer().then((sdp) => {
         sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return;
          line.match(ipRegex).forEach(iterateIP);
         });
         pc.setLocalDescription(sdp, noop, noop);
        }).catch((reason) => {
        });
        pc.onicecandidate = (ice) => {
         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
       }
      },
      mounted: function () {
       this.pageInit();
       this.getUserIP((ip) => {
        this.ip = ip;
        localStorage.setItem('ip', ip);
       });

      },
      components: {
       mlChangePassword
      }
     }

     </script>
     <style scoped>
     .login_form {
      width: 300px;
      margin: 10% auto;
      padding: 20px;
      border-top: 0;
      background: #fff;
      color: #666;
      border-radius: 2px;
      /*box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;*/
      background-repeat: no-repeat;
      background: url("../assets/bgLogin.png");
      background-size: 100% 100%;
     }

     .login_title {
    /*margin: 0;
    text-align: center;
    padding: 0 20px 20px 20px;
    font-size: 22px;
    font-weight: 400;
    color: #1f2f3d;*/
    width: 100%;
    height: 60px;
    margin: 10px auto 20px auto;

   }

   .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url("../assets/bg2.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
    overflow: hidden;
   }

   .icon_name,.icon_password {
    display: block;
    float: left;
    width: 40px;
    height: 40px;
    margin: 0 20px;

   }
   .icon_name {
    background: url("../assets/loginName.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
   }
   .icon_password {
    background: url("../assets/password.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
   }
   .inputW {
    padding-left: 10px;
    margin-top: 0px;
    width: 200px;
    border: 0px solid white;
    border-bottom: 1px solid #eee;
    height: 35px;
    line-height: 35px;
   }
   #checked {
    margin: 0 30px;
    color: #f14c50;
   }
   .keepPassword {
    float: left;
    width: 30px;
    height: 30px;
    margin: 5px 25px;
    background: url("../assets/keeppassword0.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
   }
   .kp {
    color: #f14c50;
    padding: 0 10px;
    /*margin: 0 20px;*/
    float: left;
   }
   .keepImg {
    background: url("../assets/keeppassword.png");
    background-repeat: no-repeat;
    background-size: 100%, 100%;
    /**/
   }
   </style>
