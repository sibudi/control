<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="订单编号">
        <el-input v-model="searchForm.uuid"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
       <el-select v-model="searchForm.status" placeholder="请选择" clearable>
        <el-option v-for="item in ddzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否分期">
     <el-select v-model="searchForm.isTerms" placeholder="请选择" clearable>
      <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="申请期限">
   <el-select v-model="searchForm.borrowingTerm" placeholder="请选择" clearable>
    <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="复借订单">
 <el-select v-model="searchForm.isRepeatBorrowing" placeholder="请选择" clearable>
  <el-option v-for="item in fjzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
</el-select>
</el-form-item>
<el-form-item label="申请时间">
  <div class="block">
    <el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="订单渠道">
 <el-select v-model="searchForm.channel" placeholder="请选择" clearable>
  <el-option v-for="item in ddqudaolist" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue.split('#')[0]"></el-option>
</el-select>
</el-form-item>
<el-form-item label="更新日期">
  <div class="block">
    <el-date-picker v-model="searchForm.updateBeginTime" type="date" :picker-options="pickerOptions3" :editable="false" placeholder="选择日期">
    </el-date-picker> ~
    <el-date-picker v-model="searchForm.updateEndTime" type="date" :picker-options="pickerOptions4" :editable="false" placeholder="选择日期">
    </el-date-picker>
  </div>
</el-form-item>
<el-form-item label="借款身份">
 <el-select v-model="searchForm.userRole" placeholder="请选择" clearable>
  <el-option v-for="item in jkzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
</el-select>
</el-form-item>

<el-form-item>
  <el-button @click="search" type="info">查询</el-button>
</el-form-item>
</el-form>

<!--列表-->
<template>
  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" @row-click="rowClick" class="grid">
   <el-table-column label="订单编号" prop="uuid" width="220">
   </el-table-column>
   <el-table-column label="姓名" prop="realName" width="220" >
   </el-table-column>
   <el-table-column label="借款身份" prop="userRole" width="120" sortable>
    <template scope="scope">
      {{getChannelNameOne(scope.row.userRole)}}
    </template>
  </el-table-column>
  <el-table-column label="复借订单" prop="isRepeatBorrowing" width="120">
   <template scope="scope">
    <el-tag :type="scope.row.isRepeatBorrowing==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'是':'否'}}</el-tag>
  </template>
</el-table-column>
<el-table-column label="是否分期" prop="isTerm" width="120">
 <template scope="scope">
  <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'是':'否'}}</el-tag>
</template>
</el-table-column>
<el-table-column label="当前还款期限" prop="needPayTerm" width="120" >
</el-table-column>
<el-table-column label="订单状态" prop="status" width="120">
  <template scope="scope">
    <span>{{getOrderType(scope.row.status)}}</span>
  </template>
</el-table-column>
<el-table-column label="申请金额" prop="amountApply" width="120" sortable>
</el-table-column>
<el-table-column label="申请期限" prop="borrowingTerm" width="120" sortable>
</el-table-column>
<el-table-column label="申请时间" prop="applyTime" width="240" sortable>
  <template scope="scope">
    {{getdate(scope.row.applyTime)}}
  </template>
</el-table-column>
<el-table-column label="更新时间" prop="updateTime" width="240" sortable>
  <template scope="scope">
    {{getdate(scope.row.updateTime)}}
  </template>
</el-table-column>
<el-table-column label="订单渠道" prop="channel" width="120" sortable>
  <template scope="scope">
    {{getChannelName(scope.row.channel)}}
  </template>
</el-table-column>
<el-table-column label="催收人员" prop="reviewerName" width="120" sortable>
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
        createBeginTime:'',
        createEndTime:'',
        channel: '',
        uuid:'',
        isTerms:'',
        borrowingTerm:'',
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
        name:'否',
      },{
        code:'1',
        name:'是'
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
        name:'家庭主妇',
        value:'3'
      }],
      qixianlist : [{
        code: '7',
        name: '7天'
      },{
        code: '10',
        name: '10天'
      }, {
        code: '14',
        name: '14天'
      }, {
        code: '30',
        name: '30天'
      }],
      termsList : [ {
        code:'1',
        name:'是'
      },{
        code:'2',
        name:'否'
      }],
      ddqudaolist : JSON.parse(localStorage.getItem('orderChannel')),
      ddzhuangtai : [{
        code: 'SUBMITTING',
        name: '待提交',
        value:'1'
      }, {
        code: 'MACHINE_CHECKING',
        name: '待机审',
        value:'2'
      }, {
        code: 'FIRST_CHECK',
        name: '初审',
        value:'3'
      },{
        code: 'SECOND_CHECK',
        name: '复审',
        value:'4'
      },{
        code: 'LOANING',
        name: '待放款',
        value:'5'
      }, {
        code: 'LOANING_DEALING',
        name: '放款处理中',
        value:'6'
      }, {
        code: 'RESOLVING_NOT_OVERDUE',
        name: '待还款（未逾期)',
        value:'7'
      },{
        code: 'RESOLVING_OVERDUE',
        name: '待还款（已逾期）',
        value:'8'
      }, {
        code: 'RESOLVED_DEALING',
        name: '还款处理中',
        value:'9'
      }, {
        code: 'RESOLVED_NOT_OVERDUE',
        name: '正常已还款',
        value:'10'
      },{
        code: 'RESOLVED_OVERDUE',
        name: '逾期已还款',
        value:'11'
      },{
        code: 'MACHINE_CHECK_NOT_ALLOW',
        name: '机审不通过',
        value:'12'
      }, {
        code: 'FIRST_CHECK_NOT_ALLOW',
        name: '初审不通过',
        value:'13'
      }, {
        code: 'SECOND_CHECK_NOT_ALLOW',
        name: '复审不通过',
        value:'14'
      }, {
        code: 'quxiao',
        name: '取消',
        value:'15'
      }, {
        code: 'LOAN_FAILD',
        name: '打款失败',
        value:'16'
      }, {
        code: 'WAIT_CALLING',
        name: '等待外呼',
        value:'17'
      } ,{
        code: "WAITING_CALLING_AFTER_FIRST_CHECK",
        name: "初审后等待外呼",
        value:'18'
      },{
        code: "WAITING_CONFIRM",
        name: "降额后等待用户确认",
        value:'19'
      },{
        code: "WAITING_SIGN_CONTRACT",
        name: "待签约",
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
      if (obj.dicItemValue.split('#')[0] == type) {
        re = obj.dicItemName;
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
      window.open('#/OrderDetails?&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/OrderDetails?seen=true&userUuid='+row.userUuid+
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
      if(this.searchForm.createBeginTime =='' && this.searchForm.createEndTime ==''){
        this.searchForm.createEndTime =new Date();
        let entime =new Date().getTime()-60*1000*(24*60*60);
        this.searchForm.createBeginTime = new Date(entime);
      }
      let _data = Object.assign({

        pageNo:this.pageIndex,
        pageSize:this.pageSize}, this.searchForm,{
          createBeginTime:DataUtil.formatTime(this.searchForm.createBeginTime)||'',
          createEndTime:DataUtil.formatTime(this.searchForm.createEndTime)||'',
          updateBeginTime:DataUtil.formatTime(this.searchForm.updateBeginTime)||'',
          updateEndTime:DataUtil.formatTime(this.searchForm.updateEndTime)||''
        });
      console.log(_data)
      this.$http.post('manage/AllOrderList', _data).then(response => {
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
