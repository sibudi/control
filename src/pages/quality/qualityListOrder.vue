<!--  逾期订单查询 -->
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
      <el-form-item label="最新质检时间">
        <div class="block">
          <el-date-picker v-model="searchForm.updateBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.updateEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item><br>

      <el-form-item label="跟进时间">
        <div class="block">
          <el-date-picker v-model="searchForm.dueDayStartTime" type="date" :picker-options="pickerOptions3" :editable="false" placeholder="选择日期">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.dueDayEndTime" type="date" :picker-options="pickerOptions4" :editable="false" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>

      <el-form-item label="催收人员" prop="collectionInQualityCheckId">
        <el-select v-model="searchForm.collectionInQualityCheckId" placeholder="请选择" filterable clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
      </el-form-item>
    </el-form>

    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" @row-click="rowClick" class="grid">
       <el-table-column label="订单编号" prop="orderNo" width="150">
       </el-table-column>
       <el-table-column label="最新质检时间" prop="updateTime" width="150" sortable>
        <template scope="scope">
          {{getdate(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column label="质检结果" prop="checkResult" width="200" sortable>
      </el-table-column>
      <el-table-column  label="催收联系情况" prop="collectionContactResult"  width="400">
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
      <el-table-column label="跟进时间" prop="followTime" width="150" sortable>
        <template scope="scope">
          {{getdate(scope.row.followTime)}}
        </template>
      </el-table-column>
      <el-table-column label="订单标签" prop="orderTag" width="120" sortable>
        <template scope="scope">
          <span>{{getOrderTypethree(scope.row.orderTag)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="realName" width="150">
      </el-table-column>
      <el-table-column label="催收人员" prop="collectiorName" width="150">
     <!--  <template scope="scope">
        <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
      </template> -->
    </el-table-column>
    <el-table-column label="申请金额" prop="amountApply" width="150">
    </el-table-column>
    <el-table-column label="申请期限" prop="borrowingTerm" width="150">
    </el-table-column>
    <el-table-column label="逾期天数" prop="overdueDays" width="80" sortable>
      <template scope="scope">
        <span>{{(scope.row.overdueDays < -2) ? "":scope.row.overdueDays}}</span>
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
        uuid:'',
        collectiorName:'',
        updateBeginTime:'',
        updateEndTime:'',
        dueDayStartTime:'',
        dueDayEndTime:'',
        collectionInQualityCheckId:'',


      },
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
      thirdCompanyList: [],
      fjzhuangtai:[{
        code:'1',
        name:'是'
      },{
        code:'0',
        name:'否'
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
        name: '男',
      }, {
        code: '2',
        name: '女',
      }],
      bqzhuangtai : [{
        code: '1',
        name: '完全失联'
      },{
        code: '2',
        name: '暂时失联'
      },{
        code: '3',
        name: '可联跳票'
      },{
        code: '4',
        name: '可联承诺'
      }],
      payDayList:[],
      qudaolist: [],
      gridLoading: false,
      gridData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      isAgainOrder:enums.isAgainOrder,
      dataTotal: 20,
      contactList: [],
      coner:[],
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "updateEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "updateBeginTime", "e")
        }
      },
      pickerOptions3: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "dueDayEndTime", "s")
        }
      },
      pickerOptions4: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "dueDayStartTime", "e")
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

     //  initDays() {

     //    for(let index = 1; index <32; index++) {
     //     let initDay = {name:'',code:''};
     //     initDay.code = index;
     //     initDay.name = index;
     //     this.payDayList.push(initDay);
     //   }
     // },

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
    check(row){
      window.open('#/UserDetail?&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/qualityDetails?seen=true&userUuid='+row.uuid+
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
    // alertTite(){
    //   let _data = Object.assign({
    //     "outsourceId":DataUtil.id(),
    //   });
    //   this.$http.post('manage/collection/payDayOrderCount', _data).then(response => {
    //     if (1 == response.body.code) {
    //       this.payDays=response.body.data;
    //       this.$message({
    //         showClose: true,
    //         message: '今日有'+this.payDays+'个用户是发薪日，优先联系他们吧'
    //       });
    //     } else {
    //     // this.$message.error('这是一条消息提示');
    //   }
    // }, response => {
    //   this.gridLoading = false;
    // });
    // },
    bindGrid() {
      this.gridLoading = true;
      let _data = Object.assign({
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
        "outsourceId": DataUtil.id(),
      }, this.searchForm,{
        updateBeginTime:DataUtil.formatTime(this.searchForm.updateBeginTime)||'',
        updateEndTime:DataUtil.formatTime(this.searchForm.updateEndTime)||'',
        dueDayStartTime:DataUtil.formatTime(this.searchForm.dueDayStartTime)||'',
        dueDayEndTime:DataUtil.formatTime(this.searchForm.dueDayEndTime)||''});
      this.$http.post('manage/qualityCheck/listQualityChecks', _data).then(response => {
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
    this.bindGrid();
    this.getCollectionList();
    // this.initDays();
    // this.alertTite();
  }
}
</script>
