<!--  逾期订单查询 -->
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
    <el-form-item label="Petugas penagihan">
      <el-input v-model="searchForm.collectiorId"></el-input>
    </el-form-item>
    <el-form-item label="apakah mencicil">
     <el-select v-model="searchForm.isTerms" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Nomor Ponsel">
    <el-input v-model="searchForm.mobile"></el-input>
  </el-form-item>
  <el-form-item label="Durasi pinjaman">
   <el-select v-model="searchForm.borrowingTerm" placeholder="Silahkan pilih" clearable>
    <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="Jumlah pinjaman">
 <el-select v-model="searchForm.amountApply" placeholder="Silahkan pilih" clearable>
  <el-option v-for="item in jinelist" :label="item.name" :key="item.code" :value="item.name"></el-option>
</el-select>
</el-form-item>
<el-form-item label="Jumlah hari terlambat terkecil" label-width="100">
  <el-input v-model="searchForm.minOverdueDays"></el-input>
</el-form-item>
<el-form-item label=" Jumlah hari terlambat terbesar" label-width="100">
  <el-input v-model="searchForm.maxOverdueDays"></el-input>
</el-form-item>
<el-form-item label="Label permohonan">
 <el-select v-model="searchForm.orderTag" placeholder="Silahkan pilih" clearable>
  <el-option v-for="item in bqzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
</el-select>
</el-form-item>
<el-form-item label="Hari Gajian">
 <el-select v-model="searchForm.payDay" placeholder="Silahkan pilih" clearable>
  <el-option v-for="item in payDayList" :label="item.name" :key="item.code" :value="item.code"></el-option>
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
   <el-table-column label="Jumlah pinjaman" prop="amountApply" width="120" sortable>
   </el-table-column>
   <el-table-column label="Petugas penagihan" prop="collectiorName" width="80" sortable>
   </el-table-column>
   <el-table-column label="Durasi pinjaman" prop="borrowingTerm" width="120" sortable>
   </el-table-column>
   <el-table-column label="Tanggal wajib pelunasan" prop="refundTime" width="200" sortable>
    <template scope="scope">
      {{getdate(scope.row.refundTime)}}
    </template>
  </el-table-column>
  <el-table-column label=" Janji waktu pembayaran" prop="promiseRepaymentTime" width="200" sortable>
    <template scope="scope">
      {{getdate(scope.row.promiseRepaymentTime)}}
    </template>
  </el-table-column>
  <el-table-column label="Jumlah hari keterlambatan" prop="overdueDays" width="120" sortable>
    <template scope="scope">
      <span>{{(scope.row.overdueDays < -2) ? "":scope.row.overdueDays}}</span>
    </template>
  </el-table-column>
  <el-table-column label="Jumlah peminjaman ulang" prop="borrowingCount" width="120" sortable>
  </el-table-column>
  <el-table-column label="Jumlah hari terlambat terbesar" prop="maxOverdueDays" width="150" sortable>
  </el-table-column>
  <el-table-column label="Label permohonan" prop="orderTag" width="120" sortable>
    <template scope="scope">
      <span>{{getOrderTypethree(scope.row.orderTag)}}</span>
    </template>
  </el-table-column>
  <el-table-column label="Waktu tindak lanjut" prop="followTime" width="220" sortable>
    <template scope="scope">
      {{getdate(scope.row.followTime)}}
    </template>
  </el-table-column>
  <el-table-column label="Nama lengkap" prop="realName" width="120" >
  </el-table-column>
  <el-table-column label="Jenis Identitas" prop="userRole" width="120" sortable>
    <template scope="scope">
      {{getChannelNameOne(scope.row.userRole)}}
    </template>
  </el-table-column>
  <el-table-column label="Jenis kelamin peminjam" prop="userSex" width="150" sortable>
    <template scope="scope">
      {{getChannelNametwo(scope.row.userSex)}}
    </template>
  </el-table-column>
  <el-table-column label="apakah mencicil" prop="isTerm" width="120">
   <template scope="scope">
    <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'Ya':'Bukan'}}</el-tag>
  </template>
</el-table-column>
<el-table-column label="batas waktu pembayaran" prop="needPayTerm" width="120" >
</el-table-column>
<el-table-column label="Nomor Ponsel" prop="mobile" width="220" >
</el-table-column>
<el-table-column label="Nomor rekening" prop="userBank" width="220" >
</el-table-column>
<el-table-column label="Hari Gajian" prop="payDay" width="120" >
</el-table-column>
<el-table-column  label="Catatan Komunikasi saat Proses Penagihan" prop="collectionContactResult"  width="400">
 <template scope="scope">
  <span v-if="scope.row.collectionContactResult != null">
    <img :src="scope.row.collectionContactResult[0]==1?oneimgurl:oneimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[1]==1?eigimgurl:eigimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[2]==1?twoimgurl:twoimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[3]==1?threeimgurl:threeimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[4]==1?fourimgurl:fourimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[5]==1?fiveimgurl:fiveimgurler" width="30px">
    <img :src="scope.row.collectionContactResult[6]==1?siximgurl:siximgurler" width="30px">
    <img :src="scope.row.collectionContactResult[7]==1?sevimgurl:sevimgurler" width="30px">
  </span>

  <span v-if="scope.row.collectionContactResult == null">
    <img :src="oneimgurler" width="30px">
    <img :src="eigimgurler" width="30px">
    <img :src="twoimgurler" width="30px">
    <img :src="threeimgurler" width="30px">
    <img :src="fourimgurler" width="30px">
    <img :src="fiveimgurler" width="30px">
    <img :src="siximgurler" width="30px">
    <img :src="sevimgurler" width="30px">
  </span>

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
        collectiorId:'',
        isTerms:'',
        createBeginTime:'',
        createEndTime:'',
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
        mobile:'',
        amountApply:'',
        orderTag:'',
        minOverdueDays:'',
        maxOverdueDays:'',

      },
      termsList : [ {
        code:'1',
        name:'Ya'
      },{
        code:'2',
        name:'Bukan'
      }],
      thirdCompanyList: [],
      payDayList:[],
      oneimgurl: require("../../assets/br.png"),
      oneimgurler: require("../../assets/br1.png"),
      eigimgurl: require("../../assets/WA.png"),
      eigimgurler: require("../../assets/WAone.png"),
      twoimgurl: require("../../assets/lxr.png"),
      twoimgurler: require("../../assets/lxr1.png"),
      threeimgurl: require("../../assets/peo.png"),
      threeimgurler: require("../../assets/peo1.png"),
      fourimgurl: require("../../assets/tit.png"),
      fourimgurler: require("../../assets/tit1.png"),
      fiveimgurl: require("../../assets/cen.png"),
      fiveimgurler: require("../../assets/cen1.png"),
      siximgurl: require("../../assets/txl.png"),
      siximgurler: require("../../assets/txl1.png"),
      sevimgurl: require("../../assets/thj.png"),
      sevimgurler: require("../../assets/thj1.png"),
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
        name:' Mahasiswa',
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
        name: 'Tidak diisi',
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
        code: '1',
        name: '100000',
      },{
        code: '2',
        name: '200000',
      },{
        code: '4',
        name: '400000',
      },{
        code: '6',
        name: '600000',
      },{
        code: '8',
        name: '800000',
      }, {
        code: '10',
        name: '1000000',
      },{
        code: '12',
        name: '1200000',
      },{
        code: '15',
        name: '1500000',
      }],
      sexlist : [{
        code: '1',
        name: 'Laki-Laki',
      }, {
        code: '2',
        name: 'Perempuan',
      }],
      bqzhuangtai : [{
        code: '1',
        name: 'Tidak tersambung'
      },{
        code: '2',
        name: 'Sementara tidak tersambung'
      },{
        code: '3',
        name: 'Tersambung, ingkar janji'
      },{
        code: '4',
        name: 'Tersambung, memberi janji'
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
      if (obj.code == type) {
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

      getOrderTypethree(val){
        let re = '';
        this.bqzhuangtai.forEach(function (obj) {
          if(obj.code == val){
            re = obj.name;
            return;
          }
        });
        return re;
      },
      search() {
        this.bindGrid()
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
      initDays() {

        for(let index = 1; index <32; index++) {
         let initDay = {name:'',code:''};
         initDay.code = index;
         initDay.name = index;
         this.payDayList.push(initDay);
       }
     },
     alertTite(){
      let _data = Object.assign({
        "outsourceId":DataUtil.id(),
      });
      this.$http.post('manage/collection/payDayOrderCount', _data).then(response => {
        if (1 == response.body.code) {
          this.payDays=response.body.data;
          this.$message({
            showClose: true,
            message: 'Hari ini ada '+this.payDays+' nasabah yang gajian, utamakan hubungi mereka terlebih dahulu'
          });
        } else {
        // this.$message.error('这是一条消息提示');
      }
    }, response => {
      this.gridLoading = false;
    });
    },
    bindGrid() {
      if(this.searchForm.overdueDayMin && this.searchForm.overdueDayMax){
        if(this.searchForm.overdueDayMin < 0 || this.searchForm.overdueDayMax < 0 || Number(this.searchForm.overdueDayMin) >= Number(this.searchForm.overdueDayMax)){
          this.$message.error("Tuliskan jumlah hari yg benar");
          return false;
        }
      };
      this.gridLoading = true;
      let _data = Object.assign({
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
        "outsourceId": DataUtil.id(),
      }, this.searchForm);
      this.$http.post('manage/collection/outCollectionsByOutSourceIdList', _data).then(response => {
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
    this.initDays();
    this.alertTite();
  }
}
</script>
