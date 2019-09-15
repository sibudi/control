<!--  逾期订单查询 -->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="优惠券名称">
        <el-input v-model="searchForm.alias"></el-input>
      </el-form-item>  
      <el-form-item label="金额">
        <el-input v-model="searchForm.money"></el-input>
      </el-form-item>
      <el-form-item label="状态">
       <el-select v-model="searchForm.status" placeholder="请选择" clearable>
        <el-option v-for="item in zhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="发放时间">
      <div class="block">
        <el-date-picker v-model="searchForm.sendStartTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
        </el-date-picker> ~
        <el-date-picker v-model="searchForm.sendEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="使用时间">
      <div class="block">
        <el-date-picker v-model="searchForm.useStartTime" type="date" :picker-options="pickerOptions3" :editable="false" placeholder="选择日期">
        </el-date-picker> ~
        <el-date-picker v-model="searchForm.useEndTime" type="date" :picker-options="pickerOptions4" :editable="false" placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-form-item><br>

    <el-form-item>
      <el-button @click="search" type="info">查询</el-button>
    </el-form-item>
  </el-form>

  <!--列表-->
  <template>
    <el-table :data="gridData" ref="multipleTable" tooltip-effect="dark" highlight-current-row v-loading="gridLoading"  class="grid">
      <el-table-column label="优惠券名称" prop="alias" width="150">
      </el-table-column>
      <el-table-column label="金额" prop="money" width="150">
      </el-table-column>
      <el-table-column label="状态" prop="status" width="150">
        <template scope="scope">
          {{getChannelName(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column label="发放时间" prop="sendTime" width="150" sortable>
      </el-table-column>
      <el-table-column label="使用时间" prop="usedTime" width="150" sortable>
      </el-table-column>
      <el-table-column label="有效期" prop="validateTime" width="200" sortable>
      </el-table-column>
      <el-table-column label="使用订单号" prop="orderNo" width="200" sortable>
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
      let _cp1 = time.getTime() > Date.now() && time.getTime() < Date.now();
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
        alias:'',
        money:'',
        status:'',
        sendStartTime:'',
        sendEndTime:'',
        useStartTime:'',
        useEndTime:'',

      },
      zhuangtai:[{
        code:'1',
        name:'已使用',
      },{
        code:'2',
        name:'已过期'
      },{
        code:'3',
        name:'未使用'
      }],
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
          return compareDate(time, "searchForm", "sendEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "sendStartTime", "e")
        }
      },
      pickerOptions3: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "useEndTime", "s")
        }
      },
      pickerOptions4: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "useStartTime", "e")
        }
      },
    }
  },
  methods: {
    getChannelName(type) {
     let re = '';
     this.zhuangtai.forEach(obj => {
      if (obj.code == type) {
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
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
        }, this.searchForm,{
          sendStartTime:DataUtil.formatTime(this.searchForm.sendStartTime)||'',
          sendEndTime:DataUtil.formatTime(this.searchForm.sendEndTime)||'',
          useStartTime:DataUtil.formatTime(this.searchForm.useStartTime)||'',
          useEndTime:DataUtil.formatTime(this.searchForm.useEndTime)||'',
        });
        this.$http.post('manage/listCouponRecord', _data).then(response => {
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
  }
}
</script>
<style>
.aplay {
  width: 100%;
}
</style>