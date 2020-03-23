/**
* Created by tonggen on 2017/1/7.
*/
<template>

  <section class="orderBox" style="background: #f1f2f7">

    <div>
      <el-card v-loading="loadingStatus">
        <el-form :inline="true" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="toolbar"
                 label-width="100px">
          <el-form-item label="Nomor Permohonan" prop="orderUuid">
            <el-input placeholder="01101010101" v-model="ruleForm.orderUuid">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="getOrderStatus(ruleForm.orderUuid)" type="info" :disabled=!isIdValid>Get Status Permohonan
            </el-button>
          </el-form-item>
          <br>
          <el-form-item label="Bank">
            <el-select :clearable="true" :disabled="!isHasData" v-model="repaymentChannel" @change="onSelectBank"
                       placeholder="Bank">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="getVA()" type="info" :disabled=!isBankOk>Get Info Pembayaran</el-button>
            <el-button @click="clear()" type="info">Clear</el-button>
          </el-form-item>
          <br>

        </el-form>
      </el-card>
    </div>
    <br>
    <!-- 订单状态 -->

    <el-card>
      <el-row>
        <div class="one-title">Status Permohonan</div>

        <div class="divid-line"></div>
        <el-col :span="8" class="grid-content">
          <div><span>Nomor Permohonan:</span><span>{{ orderStatus.orderUuid }}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Nama Pemohon:</span><span>{{ orderStatus.realName }}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Email Pemohon:</span><span>{{ orderStatus.emailAddress }}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Status Permohonan:</span><span>{{getOrderType(orderStatus.orderStatusName)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Waktu Pengajuan:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Biaya pengelolaan akun terlambat:</span><span>{{orderStatus.overdueFee}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Denda akun terlambat:</span><span>{{orderStatus.overdueMoney}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Total biaya yang harus dibayar:</span><span>{{orderStatus.shouldPayAmount}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Total yang harus dibayar:</span><span>{{orderStatus.actualPayAmount}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>Nomor WhatsApp (yang sering digunakan):</span><span>{{orderStatus.userMobileNo}}</span></div>
        </el-col>
      </el-row>

    </el-card>
    <br>
    <el-card v-loading="loadingBank">
      <div class="one-title">Informasi VA</div>
      <div class="divid-line"></div>
      <el-col :span="16" class="grid-content">
        <div><span>Nama Bank :</span><span>{{bankName}}</span></div>
      </el-col>
      <el-col :span="16" class="grid-content">
        <div><span>Nomor Virtual Account :</span><span>{{infoVA.paymentCode}}</span></div>
        <br>
      </el-col>

    </el-card>
  </section>
</template>
<script>
  import DataUtil from '../../common/dataUtil'

  export default {
    components: {},
    data() {
      let validateOrder = (rule, value, callback) => {
        if (value.length > 17 && value.length < 19) {
          this.isIdValid = true;
          callback();
        } else {
          this.isIdValid = false;
          callback();
        }
      };
      let compareDate = (time) => {
        let _time = time.setDate(time.getDate() + 1);
        return time.getTime() <= Date.now();
      };
      return {
        options: [{
          value: '7',
          label: 'CIMB'
        }, {
          value: '8',
          label: 'Other'
        }],
        ruleForm: {
          orderUuid: ''
        },
        rules: {
          orderUuid: [
            {validator: validateOrder, trigger: 'change'}
          ]
        },
        id: '',
        isIdValid: false,
        paymentType: '3',
        isHasData: false,
        isSelected: false,
        isBankOk: false,
        loadingStatus:false,
        loadingBank:false,
        bankName: '',
        repaymentChannel: '',
        ddzhuangtai: [{
          code: 'SUBMITTING',
          name: 'Menunggu mengirim',
          value: '1'
        }, {
          code: 'MACHINE_CHECKING',
          name: 'menunggu verifikasi otomatis',
          value: '2'
        }, {
          code: 'FIRST_CHECK',
          name: 'Menunggu verifikasi manual pertama',
          value: '3'
        }, {
          code: 'SECOND_CHECK',
          name: 'Menunggu verifikasi manual akhir ',
          value: '4'
        }, {
          code: 'LOANING',
          name: 'Menunggu dana cair',
          value: '5'
        }, {
          code: 'LOANING_DEALING',
          name: 'Dalam proses pencairan dana',
          value: '6'
        }, {
          code: 'RESOLVING_NOT_OVERDUE',
          name: 'Menunggu pelunasan pinjaman',
          value: '7'
        }, {
          code: 'RESOLVING_OVERDUE',
          name: 'Menunggu pelunasan pinjaman (terlambat) ',
          value: '8'
        }, {
          code: 'RESOLVED_DEALING',
          name: 'Dalam proses pelunasan pinjaman',
          value: '9'
        }, {
          code: 'RESOLVED_NOT_OVERDUE',
          name: 'Pelunasan tepat waktu ',
          value: '10'
        }, {
          code: 'RESOLVED_OVERDUE',
          name: 'Pelunasan terlambat ',
          value: '11'
        }, {
          code: 'MACHINE_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi otomatis',
          value: '12'
        }, {
          code: 'FIRST_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual pertama',
          value: '13'
        }, {
          code: 'SECOND_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual akhir',
          value: '14'
        }, {
          code: 'CANCEL',
          name: 'Permohonan dibatalkan',
          value: '15'
        }, {
          code: 'LOAN_FAILD',
          name: 'Pinjaman gagal',
          value: '16'
        }, {
          code: 'WAIT_CALLING',
          name: 'Menunggu panggilan luar',
          value: '17'
        }, {
          code: "WAITING_CALLING_AFTER_FIRST_CHECK",
          name: "Menunggu panggilan luar setelah verifikasi awal",
          value: '18'
        }, {
          code: "WAITING_CONFIRM",
          name: "menunggu konfirmasi",
          value: '19'
        }, {
          code: "WAITING_SIGN_CONTRACT",
          name: "menunggu penandatanganan kontrak",
          value: '20'
        }],
        orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          collectionFlag: ''
        },
        infoVA: {
          paymentCode: '',
        },
        userUuid: "",
        bankList: [],
      }
    },
    methods: {
      getRealdate(dates) {
        if (!dates) {
          return ''
        }
        let myDate = new Date(dates);
        let minute = myDate.getMinutes();
        if (minute < 10) {
          minute = "0" + minute;
        }
        let seconds = myDate.getSeconds();
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate() + " " + myDate.getHours() + ":" + minute + ":" + seconds
      },
      onSelectBank(x) {
        if (x) {
          this.isSelected = true;
          this.checkInputBank();
        }
      },
      getTypeCode(code){
        let type = '';
        if(code === "NORMAL"){
          type = "1";
        }
        else if(code === "DELAY"){
          type = "2";
        }
        else if(code === "STAGING"){
          type = "3";
        }
        return type;
      },
      getBankName(va) {
        console.log("getbank " + va);
        if (va) {
          switch (va) {
            case "7":
            case "8":
              return "CIMB"
          }
        } else
          return "";
      },
      getdate(dates) {
        if (dates != null) {
          let myDate = new Date(dates);
          let offset = -7 * 60 * 60000;
          offset = myDate.getTimezoneOffset() * 60000;
          let myDates = new Date(dates + offset + 7 * 3600000);
          let minute = myDates.getMinutes();
          if (minute < 10) {
            minute = "0" + minute;
          }
          let seconds = myDates.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          let months = myDates.getMonth() + 1;
          if(months<10){
            months = "0" + months;
          }
          let date = myDates.getDate();
          if(date<10){
            date = "0" + date;
          }
          return myDates.getFullYear() + "-" + months + "-" + date + " " + myDates.getHours() + ":" + minute + ":" + seconds
        } else return ""
      },
      getOrderStatus(orderUuid) {
        this.loadingStatus = true;
        this.orderStatus = {};
        this.orderUuid = orderUuid;
        this.$http.get("manage/orderSimpleInfoByUuid", {params: {orderUuid: orderUuid,outsourceId:-1}}).then(response => {
          this.loadingStatus = false;
          if (1 === response.body.code) {
            if(response.body.data){
              this.isHasData = true;
              this.checkInputBank();
              this.orderStatus = response.body.data;
              this.orderStatus.createTime = this.getdate(this.orderStatus.createTime);
            }
            else{
              this.$message.error("gagal mengambil data");
            }
          } else {
            this.isHasData = false;
            this.checkInputBank();
            if(response.body.message)
              this.$message.error(response.body.message);
            else
              this.$message.error("gagal mengambil data");
          }
        }).catch((e) => {
          this.loadingStatus = false;
          this.$message.error("gagal mengambil data");
        });
      },
      checkInputBank() {
        this.isBankOk = this.isHasData && this.isSelected;
      },
      getActualNum(num) {
        if(!num)
          return ""
        return num.replace(/\./g, '');
      },
      getVA() {
        console.log("get VA " + this.id);
        if(this.orderStatus.orderStatusId===8 || this.orderStatus.orderStatusId===7) {
          this.loadingBank = true;
          this.infoVA = {};
          let _data = {
            "orderNo": this.orderUuid,
            "repaymentChannel": this.repaymentChannel,
            "repaymentType": this.paymentType,
            "principal": this.getActualNum(this.orderStatus.actualPayAmount),
            "userUuid": this.orderStatus.userUuid,
            "type": this.getTypeCode(this.orderStatus.orderTypeName),
            "outsourceId": "-1",
          };
          this.$http.post("manage/vainfo", _data).then(response => {
            this.loadingBank = false;
            if (1 === response.body.code) {
              if(response.body.data){
                this.bankName = this.getBankName(this.repaymentChannel);
                this.infoVA = response.body.data;
              }
              else {
                this.$message.warning("VA belum tersedia");
              }

            }
            else {
              if(response.body.message)
                this.$message.error(response.body.message);
              else
                this.$message.error("gagal mengambil data");
            }
          }).catch((e) => {
            this.loadingBank = false;
            this.$message.error("gagal mengambil data");
          });
        }
        else {
          this.$message.warning("User belum/tidak punya pinjaman yang berjalan");
        }
      },
      getOrderType(type) {
        if(type){
        let re = '';
        this.ddzhuangtai.forEach(obj => {
          if (obj.code === type) {
            re = obj.name;
            return ""
          }
        });
        return re
        }
      },
      clear() {
        this.orderStatus = {};
        this.infoVA = {};
        this.isBankOk = false;
        this.isHasData = false;
        this.isSelected = false;
        this.ruleForm.orderUuid = '';
        this.repaymentChannel = '';
        this.bankName = '';
      },
      pageInit() {
        this.userName = DataUtil.userName();
        this.employeeNumber = DataUtil.employeeNumber();
      },
    },
    mounted: function () {
      this.sessionId = DataUtil.sid();
      this.id = DataUtil.id();
    }
  }
</script>

<style>
  .divid-line {
    height: 2px;
    background: #f1f2f7;
  }

  .one-title {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .orderBox .el-col span {
    margin-right: 10px;
  }

  .orderBox .el-button span, .orderBox .el-tag span {
    margin-right: 0;
  }

  .orderBox .box-card {
    margin-right: 5px;
  }

  .orderBox .grid-content {
    line-height: 28px;
  }

  .orderBox .box-card {
    height: 225px;
  }

  .orderBox {
    background: #e2f0e4;
  }

  .orderBox {
    background: #F33;
  }
</style>
