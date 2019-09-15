<!--  已还款订单（管理员） -->
<template>
  <section>
    <!--工具条-->
       <el-form :inline="true" :model="searchForm" class="toolbar">
    <el-form-item label="Nomor Permohonan">
        <el-input v-model="searchForm.uuid"></el-input>
      </el-form-item>  
      <el-form-item label="Nama lengkap">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="Nomor Ponsel">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
        <el-form-item label="是否分期">
     <el-select v-model="searchForm.isTerms" placeholder="请选择" clearable>
      <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
     <el-form-item label="Waktu pengembalian">
      <div class="block">
        <el-date-picker v-model="searchForm.actualPaymentStartDate" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker> ~
        <el-date-picker v-model="searchForm.actualPaymentEndDate" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="Jumlah hari terlambat terkecil" label-width="100">
      <el-input v-model="searchForm.minOverdueDays"></el-input>
    </el-form-item>
    <el-form-item label="Jumlah hari terlambat terbesar" label-width="100">
      <el-input v-model="searchForm.maxOverdueDays"></el-input>
    </el-form-item>
    <el-form-item label="Jumlah pinjaman">
     <el-select v-model="searchForm.amountApply" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in jinelist" :label="item.name" :key="item.code" :value="item.name"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Durasi pinjaman">
   <el-select v-model="searchForm.borrowingTerm" placeholder="Silahkan pilih" clearable>
    <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item>
  <el-button @click="search" type="info">Cari</el-button>
</el-form-item>
</el-form>

<!--列表-->
<template>
  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" @row-click="rowClick" class="grid">
   <el-table-column label="Nomor Permohonan" prop="orderNo" width="220">
   </el-table-column>
   <el-table-column label="Waktu Pengajuan" prop="applyTime" width="240" sortable>
    <template scope="scope">
      {{getdate(scope.row.applyTime)}}
    </template>
  </el-table-column>
   <el-table-column label="是否分期" prop="isTerm" width="120">
 <template scope="scope">
  <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'是':'否'}}</el-tag>
</template>
</el-table-column>
<el-table-column label="当前还款期限" prop="needPayTerm" width="120" >
</el-table-column>
  <el-table-column label="Jumlah pinjaman" prop="amountApply" width="120" sortable>
  </el-table-column>
  <el-table-column label="Durasi pinjaman" prop="borrowingTerm" width="120" sortable>
  </el-table-column>
  <el-table-column label="Jumlah hari keterlambatan" prop="overDueDay" width="120">
    <template scope="scope">
      <span>{{scope.row.overdueDays}}</span>
    </template>
  </el-table-column>
  <el-table-column label="Tanggal wajib pelunasan" prop="updateTime" width="160" sortable>
    <template scope="scope">
      {{getdate(scope.row.refundTime)}}
    </template>
  </el-table-column>
  <el-table-column label="Waktu pengembalian" prop="shihuanTime" width="160" sortable>
    <template scope="scope">
      {{(scope.row.actualRefundTime == null) ? "" : getdate(scope.row.actualRefundTime)}}
    </template>
  </el-table-column>
  <el-table-column label="Nama lengkap" prop="realName" width="220" >
  </el-table-column>
  <el-table-column label="Nomor Ponsel" prop="mobile" width="220" >
  </el-table-column>
  <el-table-column label="Identitas peminjam" prop="userRole" width="150" sortable>
    <template scope="scope">
      {{getChannelNameOne(scope.row.userRole)}}
    </template>
  </el-table-column>
</el-table>
<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
</template>
</section>
</template>
<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data () {
    let compareDate = (time, form, txt, type) => {
      let _cp1 = time.getTime() >= Date.now()
      let _cp2 = false
      let _input = this[form][txt]
      if (_input) {
        let _time = Date.parse(new Date(_input))
        if ((type == "s" && time.getTime() > _time) || (type == "e" && time.getTime() < _time)) {
          _cp2 = true
        }
      }
      return _cp1 || _cp2
    }
    return {
      searchForm:{
        realName:'',
        mobile:'',
        isTerms:'',
        actualPaymentStartDate:'',
        actualPaymentEndDate:'',
        channel: '',
        uuid:'',
        borrowingTerm:'',
        status:'',
        isAgain:'',
        applyTime:'',
        amountApply:'',
        updateBeginTime:'',
        updateEndTime:'',
        isRepeatBorrowing:'',
        userRole :'',
        ceshi:'',
        overdueDayMin: '',
        overdueDayMax: '',
        fjcishu:'',
        zgyqts:'',
        genjinTime:'',
        mobile:'',
        IDcard:'',
        amountApply:'',

      },
      termsList : [ {
        code:'1',
        name:'是'
      },{
        code:'2',
        name:'否'
      }],
      thirdCompanyList: [],
      fjzhuangtai:[{
        code:'1',
        name:'Ya'
      },{
        code:'0',
        name:'Bukan'
      }],
      jkzhuangtai:[{
        code:'WORKING_STAFF',
        name:'Sudah berkerja',
        value:'2'
      },{
        code:'Student',
        name:'Mahasiswa',
        value:'1'
      },{
        code:'House_Wife',
        name:'Ibu rumah tangga',
        value:'3'
      }],
       qixianlist : [{
        code: '7',
        name: '7Hari'
      },{
        code: '10',
        name: '10Hari'
      }, {
        code: '14',
        name: '14Hari'
      }],
      ddqudaolist : [{
        code: 'DEFAULT',
        name: 'Default',
        value:'0'
      }, {
        code: 'Android',
        name: 'Android',
        value:'1'
      }, {
        code: 'iOS',
        name: 'ios',
        value:'2'
      }],
      jinelist : [{
        code: '6',
        name: '600000',
      }, {
        code: '8',
        name: '800000',
      }, {
        code: '10',
        name: '1000000',
      }],
      sexlist : [{
        code: '1',
        name: 'Laki-Laki',
      }, {
        code: '2',
        name: 'Perempuan',
      }],
      ddzhuangtai : [{
        code: 'SUBMITTING',
        name: 'Menunggu mengirim',
        value:'1'
      }, {
        code: 'MACHINE_CHECKING',
        name: 'menunggu verifikasi otomatis',
        value:'2'
      }, {
        code: 'FIRST_CHECK',
        name: 'Menunggu verifikasi manual pertama',
        value:'3'
      },{
        code: 'SECOND_CHECK',
        name: 'Menunggu verifikasi manual akhir ',
        value:'4'
      },{
        code: 'LOANING',
        name: 'Menunggu dana cair',
        value:'5'
      }, {
        code: 'LOANING_DEALING',
        name: 'Dalam proses pencairan dana',
        value:'6'
      }, {
        code: 'RESOLVING_NOT_OVERDUE',
        name: 'Menunggu pelunasan pinjaman',
        value:'7'
      },{
        code: 'RESOLVING_OVERDUE',
        name: 'Menunggu pelunasan pinjaman (terlambat) ',
        value:'8'
      }, {
        code: 'RESOLVED_DEALING',
        name: 'Dalam proses pelunasan pinjaman',
        value:'9'
      }, {
        code: 'RESOLVED_NOT_OVERDUE',
        name: 'Pelunasan tepat waktu ',
        value:'10'
      },{
        code: 'RESOLVED_OVERDUE',
        name: 'Pelunasan terlambat ',
        value:'11'
      },{
        code: 'MACHINE_CHECK_NOT_ALLOW',
        name: 'Tidak lulus verifikasi otomatis',
        value:'12'
      }, {
        code: 'FIRST_CHECK_NOT_ALLOW',
        name: 'Tidak lulus verifikasi manual pertama',
        value:'13'
      }, {
        code: 'SECOND_CHECK_NOT_ALLOW',
        name: 'Tidak lulus verifikasi manual akhir',
        value:'14'
      }, {
        code: 'CANCEL',
        name: 'Permohonan dibatalkan',
        value:'15'
      }, {
        code: 'LOAN_FAILD',
        name: 'Pinjaman gagal',
        value:'16'
      },{
        code: 'WAIT_CALLING',
        name: 'Menunggu panggilan luar',
        value:'17'
      },{
        code: "WAITING_CALLING_AFTER_FIRST_CHECK",
        name: "Menunggu panggilan luar setelah verifikasi awal",
        value:'18'
      },{
        code: "WAITING_CONFIRM",
        name: "menunggu konfirmasi",
        value:'19'
      },{
        code: "WAITING_SIGN_CONTRACT",
        name: "menunggu penandatanganan kontrak",
        value:'20'
      }],
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      isAgainOrder:enums.isAgainOrder,
      dataTotal: 20,
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createBeginTime", "e")
        }
      }
    }
  },
  methods: {
    getChannelName(type) {
     let re = '';
     this.ddqudaolist.forEach(obj => {
      if (obj.value == type) {
        re = obj.name;
        return
      }
    });
     return re
   },
   getChannelNameOne(type) {
     let re = '';
     this.jkzhuangtai.forEach(obj => {
      if (obj.value == type) {
        re = obj.name;
        return
      }
    });
     return re
   },
   getChannelNametwo(type) {
     let re = '';
     this.sexlist.forEach(obj => {
      if (obj.value == type) {
        re = obj.name;
        return
      }
    });
     return re
   },
  //  dateDiff(endDate,startDate) {
  //   let aDate,  oDate1,  oDate2,  iDays ;
  //   aDate  =  endDate.split("-")
  //   oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
  //   aDate  =  startDate.split("-")
  //   oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
  //   iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
  //   return  iDays
  // },
  //  getQudaoList() {
  //   this.$http.post('manage/completeOrderList',).then(response=>{
  //     let {body} = response;
  //     this.qudaolist = body.data;
  //   },response=>{});
  // },
  formatTime(time){
    return DataUtil.formatUnixTime(time);
  },
  getdate(dates) {
    if(!dates){
       return "";
    }
    var myDate = new Date(dates);
    var offset = -7*60*60000;
    offset = myDate.getTimezoneOffset()*60000;
    var myDates = new Date(dates+offset+7*3600000);
    // myDate.setUTCHours(10);
        // return myDate.toLocaleString(); //获取日期与时间
        let minute=myDates.getMinutes();
        if(minute<10){
          minute="0"+minute;
        }
        let seconds=myDates.getSeconds()
        if(seconds<10){
          seconds="0"+seconds;
        }
        return myDates.getFullYear()+"-"+(myDates.getMonth()+1)+"-"+myDates.getDate()+" "+myDates.getHours()+":"+minute+":"+seconds
      },

      getOrderType(type) {
       let re = '';
       this.ddzhuangtai.forEach(obj => {
        if (obj.value == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     search() {
      this.bindGrid()
    },
    check(row){
      window.open('#/CollectionOrderDetailsInn?&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/CollectionOrderDetailsInn?seen=true&userUuid='+row.uuid+
        '&uuid='+row.orderNo);
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.bindGrid()
    },
    pageIndexChange(val) {
      this.pageIndex = val;
      this.$store.dispatch('getUserListIndex',val);
      this.bindGrid();
    },
    bindGrid() {
      if(this.searchForm.overdueDayMin && this.searchForm.overdueDayMax){
        if(this.searchForm.overdueDayMin < 0 || this.searchForm.overdueDayMax < 0 || Number(this.searchForm.overdueDayMin) >= Number(this.searchForm.overdueDayMax)){
          this.$message.error("请先正确填写天数");
          return false;
        }
      };
      this.gridLoading = true;
      let _data = Object.assign({
        pageNo:this.pageIndex,
        pageSize:this.pageSize
      }, this.searchForm,{
        actualPaymentStartDate:DataUtil.formatTime(this.searchForm.actualPaymentStartDate)||'',
        actualPaymentEndDate:DataUtil.formatTime(this.searchForm.actualPaymentEndDate)||''
      });
      this.$http.post('manage/collection/repaymentOrderList', _data).then(response => {
        if (1 == response.body.code) {
          this.gridLoading = false;
          if(response.body.data){
            this.gridData = response.body.data.data;
            this.dataTotal = response.body.data.recordsTotal;
          }else {
            this.gridData = [];
            this.dataTotal = 0;
          }
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {
        this.gridLoading = false;
      });
    }
  },
  mounted: function () {
    this.bindGrid();
  }
}
</script>
