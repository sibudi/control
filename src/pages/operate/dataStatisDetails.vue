<template>
  <section>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
       <el-table-column label="批次号" prop="batchNo" min-width="220">
       </el-table-column>
       <el-table-column label="发送时间" prop="startTime" min-width="240" sortable>
        <template scope="scope">
          {{getdate(scope.row.startTime)}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phoneNumber" min-width="120" sortable>
      </el-table-column>
      <el-table-column label="状态" prop="passOrNot" min-width="120" sortable>
        <template scope="scope">
          <span>{{getOrderType(scope.row.passOrNot)}}</span>
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
      batchNo:'',
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
      tdlist : [{
        code: '1',
        name: 'twilio'
      }],
      ddqudaolist : JSON.parse(localStorage.getItem('orderChannel')),
      zhuangtai : [{
        code: '1',
        name: '接通'
      },{
        code: '2',
        name: '未接通'
      },{
        code: '3',
        name: '未接通'
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
          return compareDate(time, "searchForm", "sendEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "sendStartTime", "e")
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
       this.zhuangtai.forEach(obj => {
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
      let _data = {
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
        batchNo:this.batchNo
      };
      console.log(this.batchNo);
      this.$http.post('manage/getTwilioCallResultDetail', _data).then(response => {
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
    this.batchNo = this.$route.query['batchNo']||'';
    this.bindGrid();
  }
}
</script>
