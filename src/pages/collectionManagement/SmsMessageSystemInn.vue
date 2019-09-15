<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Header SMS">
        <el-input v-model="searchForm.smsTitle"></el-input>
      </el-form-item>
      <el-form-item label="Waktu pengiriman">
        <div class="block">
          <el-date-picker v-model="searchForm.minSendTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.maxSendTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="Pengirim ">
        <el-input v-model="searchForm.sendUser"></el-input>
      </el-form-item>
      <el-form-item label="Apakah terkirim">
       <el-select v-model="searchForm.isArrived" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in ddzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button @click="search" type="info">Cari</el-button>
    </el-form-item>
  </el-form>

  <!--列表-->
  <template>
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
     <el-table-column label="Pengirim " prop="sender" min-width="120">
     </el-table-column>
     <el-table-column label="Waktu pengiriman" prop="sendTime" min-width="140" sortable>
     <!--  <template scope="scope">
        {{getdate(scope.row.sendTime)}}
      </template> -->
    </el-table-column>
    <el-table-column label="Peminjam" prop="loaner" min-width="140" >
    </el-table-column>
    <el-table-column label="Penerima" prop="receiver" min-width="140" >
    </el-table-column>
    <el-table-column label="Header SMS" prop="smsTitle" min-width="120" >
    </el-table-column>
    <el-table-column label="Konten teks " prop="smsContent" min-width="300" >
    </el-table-column>
    <el-table-column label="Apakah terkirim" prop="isArrived" min-width="120">
     <template scope="scope">
      <el-tag :type="scope.row.isArrived==1? 'success' : 'danger'" close-transition>{{scope.row.isArrived==1?'Ya':'Buka'}}</el-tag>
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
        smsTitle:'',
        realName:'',
        mobile:'',
        minSendTime:'',
        maxSendTime:'',
        sendUser: '',
        uuid:'',
        isArrived:'',
        status:'',
        isAgain:'',
        applyTime:'',
        amountApply:'',
        updateBeginTime:'',
        updateEndTime:'',
        isRepeatBorrowing:'',
        userRole :'',
      },
      fjzhuangtai:[{
        code:'0',
        name:'Bukan',
      },{
        code:'1',
        name:'Ya'
      }],
      jkzhuangtai:[{
        code:'WORKING_STAFF',
        name:'已工作',
        value:'2'
      },{
        code:'Student',
        name:'在校大学生',
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
        name: '默认',
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
      ddzhuangtai : [{
        code: '1',
        name: 'Ya'
      }, {
        code: '2',
        name: 'Bukan'
      }

      ],
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      isAgainOrder:enums.isAgainOrder,
      dataTotal: 20,
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "maxSendTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "minSendTime", "e")
        }
      },
      pickerOptions3: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createEndTime", "s")
        }
      },
      pickerOptions4: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "updateBeginTime", "e")
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
   formatTime(time){
    return DataUtil.formatUnixTime(time);
  },
  getdate(dates) {
    if(!dates){
     return '';
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
        if (obj.code == type) {
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
      window.open('#/OrderDetailsInn?&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/OrderDetailsInn?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
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
      this.gridLoading = true;
        // let _data = Object.assign(this.searchForm);
        let _data = Object.assign({

          pageNo:this.pageIndex,
          pageSize:this.pageSize}, this.searchForm,{
            minSendTime:DataUtil.formatTime(this.searchForm.minSendTime)||'',
            maxSendTime:DataUtil.formatTime(this.searchForm.maxSendTime)||'',
          });
        this.$http.post('manage/collection/collectSmsTemplateList', _data).then(response => {
          let {body} = response;
          if (1 == body.code) {
            this.gridLoading = false;
            this.gridData = body.data.data;
            this.dataTotal = body.data.recordsTotal;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          this.gridLoading = false;
        })
      }
    },
    mounted: function () {
      this.bindGrid();
  // this.getQudaoList();
}
}
</script>
