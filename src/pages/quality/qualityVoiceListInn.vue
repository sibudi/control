<!--  逾期订单查询 -->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Nomor Permohonan">
        <el-input v-model="searchForm.orderNo"></el-input>
      </el-form-item>  
      <el-form-item label="nama">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="waktu mulai merekam">
        <div class="block">
          <el-date-picker v-model="searchForm.recordBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.recordEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker>
        </div>
      </el-form-item><br>
      <el-form-item label="Petugas penagihan" prop="userName">
        <el-select v-model="searchForm.userName" placeholder="Pilih tanggal" filterable clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">Temukan</el-button>
        <el-button @click="downLoad" type="info">Jumlah download</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <template>
      <el-table :data="gridData" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" highlight-current-row v-loading="gridLoading"  class="grid">
        <el-table-column type="selection"  width="55">
        </el-table-column>
        <el-table-column label="Nomor Permohonan" prop="orderNo" width="150">
        </el-table-column>
        <el-table-column label="nama" prop="realName" width="150">
        </el-table-column>
        <el-table-column label="Jumlah pinjaman" prop="applyAmount" width="150">
        </el-table-column>
        <el-table-column label="Petugas penagihan" prop="userName" width="150">
        </el-table-column>
        <el-table-column label="waktu mulai merekam" prop="recordBeginTime" width="150" sortable>
          <template scope="scope">
            {{getdate(scope.row.recordBeginTime)}}
          </template>
        </el-table-column>
        <el-table-column label="waktu berakhir merekam" prop="recordEndTime" width="150" sortable>
          <template scope="scope">
            {{getdate(scope.row.recordEndTime)}}
          </template>
        </el-table-column>
        <el-table-column label="durasi" prop="recordLength" width="200" sortable>
        </el-table-column>
        <el-table-column label="pilihan" width="300">
          <template scope="scope">
            <div v-if="scope.row.attachmentPathUrl!=null">
              <aplayer   :music="{
                url:scope.row.attachmentPathUrl,
                lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
              }">
            </aplayer>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="downLoad" prop="checkResult" width="150" sortable>
        <template scope="scope">
          <el-button size="small" @click="downOnece(scope.row)">downLoad</el-button>
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
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  },
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
        orderNo:'',
        userName:'',
        recordBeginTime:'',
        recordEndTime:'',
        userName:'',

      },
      Tuuid:[],
      thirdCompanyList: [],
      orderFields:[{orderField:"recordBeginTime"},{orderField:"recordEndTime"}],
      payDayList:[],
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      multipleSelection: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      isAgainOrder:enums.isAgainOrder,
      dataTotal: 20,
      contactList: [],
      coner:[],
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "recordEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "recordBeginTime", "e")
        }
      },
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
      getCollectionList() {
        this.$http.post('manage/collection/collectors',{isThird:1}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
      search() {
        this.bindGrid()
      },

      downLoad() {

        window.open(Config.host + 'manage/downloadVoiceFile?sessionId=' + this.sessionId +'&uuidList=' +this.Tuuid);
      },
      downOnece(row) {
       window.open(Config.host + 'manage/downloadVoiceFile?sessionId=' + this.sessionId +'&uuidList=' +row.uuid)
     },
     handleSelectionChange(val) {
      this.multipleSelection = val;

    // this.Tuuid = [val[0].uuid,];

    for (var i = 0; i < val.length; i++) {
      this.Tuuid[i] = val[i].uuid;
    };
    console.log(this.Tuuid);

  },

    // check(row){
    //   window.open('#/UserDetail?&uuid='+row.uuid)
    // },
    // rowClick(row){
    //   window.open('#/qualityDetails?seen=true&userUuid='+row.uuid+
    //     '&uuid='+row.orderNo);
    // },
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
      if(this.searchForm.recordBeginTime =='' && this.searchForm.recordEndTime ==''){
        this.searchForm.recordEndTime =new Date();
        let entime =new Date().getTime()-60*1000*(24*60*60);
        this.searchForm.recordBeginTime = new Date(entime); }
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,

        }, this.searchForm,{
          recordBeginTime:DataUtil.formatTime(this.searchForm.recordBeginTime)||'',
          recordEndTime:DataUtil.formatTime(this.searchForm.recordEndTime)||'',
          orderFields:this.orderFields
        });
        this.$http.post('manage/QualityCheckingVoiceList', _data).then(response => {
          if (1 == response.body.code) {
            this.gridLoading = false;
            if(response.body.data.data){
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
      this.sessionId=DataUtil.sid();
      this.bindGrid();
      this.getCollectionList();
    // this.initDays();
    // this.alertTite();
  }
}
</script>
<style>
.aplay {
  width: 100%;
}
</style>