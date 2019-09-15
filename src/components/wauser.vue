<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
          <el-input v-model="searchForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="searchForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="逾期天数">
          <el-input v-model="searchForm.overDueDay"></el-input>
        </el-form-item>
        <el-form-item label="承诺还款时间">
          <div class="block">
            <el-date-picker v-model="searchForm.promiseTimeStart" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker v-model="searchForm.promiseTimeEnd" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="解决情况">
         <el-select v-model="searchForm.solveType" placeholder="请选择" clearable>
          <el-option v-for="item in jjlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="search" type="info" style="width: 170px">查询</el-button>
      </el-form-item>
    </el-row>
  </el-form>

  <template>
    <el-table :data="gridData" highlight-current-row class="grid" @selection-change="handleSelectionChange">
      <el-table-column label="订单号" prop="orderNo"  min-width="120">
      </el-table-column>
      <el-table-column label="姓名" prop="userName"  min-width="120">
      </el-table-column>
      <el-table-column label="申请金额" prop="amountApply"  min-width="80">
      </el-table-column>
      <el-table-column label="申请期限" prop="borrowingTerm"  min-width="80">
      </el-table-column>
      <el-table-column label="逾期天数" prop="overDueDay"  min-width="80">
      </el-table-column>
      <el-table-column label="回复内容" prop="replyContent"  min-width="180">
      </el-table-column>
      <el-table-column label="操作员" prop="operator" width="120">
      </el-table-column>
      <el-table-column label="备注" prop="remark" width="150" sortable>
      </el-table-column>
      <el-table-column label="解决情况" prop="solveType" width="150" sortable>
        <template scope="scope">
          <span>{{getOrderTypethree(scope.row.solveType)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="承诺还款时间" prop="promiseTime" width="150" sortable>
        <template scope="scope">
          {{getdate(scope.row.promiseTime)}}
        </template>
      </el-table-column>

      <el-table-column  label="操作" min-width="330">     
       <template scope="scope">
        <el-button size="small" @click="rowClicksucssone(scope.row)">编辑</el-button>
        <el-popover trigger="hover" placement="top">
          <p class="hideTooMuch">{{scope.row.phoneNum}}</p>
          <el-button size="small" @click="" slot="reference">查看手机号</el-button>
        </el-popover>
        <el-button size="small" @click="rowClick(scope.row)">订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<el-dialog title="编辑" v-model="centerDialogVisibleone" :close-on-click-modal="false" width="40%">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="解决情况">
     <el-select v-model="addForm.solveType" placeholder="请选择" clearable @change="getProv($event)">
      <el-option v-for="item in jjlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="承诺还款时间" prop="promiseTimeStart">
    <el-date-picker v-model="addForm.promiseDate" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
    <el-time-select placeholder="请选择时间" v-model="addForm.promiseTime" :picker-options="pickerTimeOptions"></el-time-select>
    （非必填）
  </el-form-item>
  <el-form-item label="备注">
    <el-input type="textarea" placeholder="请填写备注" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="centerDialogVisibleone = false">取 消</el-button>
  <el-button type="primary" @click="tijiaofor" >提 交</el-button>
</div>
</el-dialog>
</section>
</template>
<script>
import enums from '../common/Enum'
import DataUtil from '../common/dataUtil'
export default {
  props: ['dialogTitle','postId','itemValue'],
  data() {
    let compareDate = (time) => {
      let _time = time.setDate(time.getDate()+1);
      return time.getTime() <= Date.now();
    };
    return {
      searchForm: {
        orderNo: '',
        userName: '',
        phoneNumber: '',
        overDueDay: '',
        promiseTimeStart: '',
        promiseTimeEnd:'',
        isRepeatBorrowing:'',
        solveType:'',
      },
      promiseTimeStart:'',
      addForm:{
       solveType:'',
       // promiseTimeStart:'',
       remark:'',
       id:'',
       promiseTime: '',
       promiseDate: '',
     },
     pickerTimeOptions: {
      start: '00:00',
      end: '23:00',
      step: '01:00'
    },
    pickerOptions: {
      disabledDate(time) {
        return compareDate(time)
      }
    },
    jjlist : [{
      code: '1',
      name: '已解决'
    },{
      code: '2',
      name: '待跟进'
    },{
      code: '3',
      name: '暂时无解'
    },{
      code: '4',
      name: '无须跟进'
    }],
    centerDialogVisible: false,
    centerDialogVisibleone: false,
    sessionId:'',
    uuid: '',
    pageNo:1,
    pageIndex: this.$store.getters.getUserListIndex,
    pageSize:20,
    dataTotal:20,
    gridData:[],
    pickerOptions1: {
      disabledDate(time) {
        return compareDate(time, "searchForm", "endTime", "s")
      }
    },
    pickerOptions2: {
      disabledDate(time) {
        return compareDate(time, "searchForm", "beginTime", "e")
      }
    },
  }
},
methods: {
  getdate(dates) {
   if(!dates){
     return '';
   }
   var myDate = new Date(dates);

      // myDate.setUTCHours(10);
        // return myDate.toLocaleString(); //获取日期与时间
        let minute=myDate.getMinutes();
        if(minute<10){
          minute="0"+minute;
        }
        let seconds=myDate.getSeconds()
        if(seconds<10){
          seconds="0"+seconds;
        }
        return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+minute+":"+seconds
      },
      handleSelectionChange(val){
        this.selectData = val;
      },
      pageSizeChange(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val;
        this.bindGrid()
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      getThirdCompany(type){
       let re = '';
       this.allpersonList.forEach(obj => {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     getOrderTypethree(val){
      let re = '';
      this.jjlist.forEach(function (obj) {
        if(obj.code == val){
          re = obj.name;
          return;
        }
      });
      return re;
    },
    tijiaofor(row){

      let _data = Object.assign({
        id:this.addForm.id,
        promiseTimeStart: this.getRealdate(this.addForm.promiseDate ? (this.addForm.promiseDate.setHours(this.addForm.promiseTime.split(':')[0])) : ''),
      },
      this.addForm);
      this.$http.post("manage/insertOrUpdateTwilioWaRecord", _data).then(response => {
        if (1 == response.body.code && response.body.data) {
          this.centerDialogVisibleone = false;
          this.addForm.solveType='';
          this.$message('success');
          this.bindGrid();
        }else{
          this.$message.error(response.body.message);
        }

      })
    },
    rowClick(row){
      window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.orderNo);
    },
    search() {
      this.pageIndex = 1;
      this.bindGrid()
    },
    getRealdate(dates) {
      if (!dates) {
        return ''
      }
      var myDate = new Date(dates);
      // myDate.setUTCHours(10);
      // return myDate.toLocaleString(); //获取日期与时间
      let minute=myDate.getMinutes();
      if(minute<10){
        minute="0"+minute;
      }
      let seconds=myDate.getSeconds()
      if(seconds<10){
        seconds="0"+seconds;
      }
      return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+minute+":"+seconds
    },
    bindGrid() {
      let _data = Object.assign({
        replyContent:this.postId,
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
    // sessionId:this.sessionId
  }, this.searchForm,{
    beginTime:DataUtil.formatUnixDateTimeone(this.searchForm.beginTime)||'',
    endTime:DataUtil.formatUnixDateTimeone(this.searchForm.endTime)||''
  });
      this.$http.post('manage/listTwilioWaRecord', _data).then(response => {
        if (1 == response.body.code) {
          if(response.body.data){
            this.gridData = response.body.data.data;
            this.dataTotal = response.body.data.recordsTotal;
            this.addForm.id = row.id;
          }else {
            this.gridData = [];
            this.dataTotal = 0;
          }
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {
      });
    },

    rowClicksucss() {
      let _data = Object.assign({
        uuid:this.uuid,
        sessionId:this.sessionId
      });
      this.$http.post('manage/activity/withdrawSuccess', _data).then(response => {
        if (1 == response.body.code) {
          this.centerDialogVisibleone=false;
          this.$message('操作成功！');
          this.bindGrid()
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {
      });
    },

    rowClickerr() {
      let _data = Object.assign({
        uuid:this.uuid,
        sessionId:this.sessionId

      });
      this.$http.post('manage/activity/withdrawFail', _data).then(response => {
        if (1 == response.body.code) {
         this.centerDialogVisible=false;
         this.$message('操作成功！');
         this.bindGrid();
       } else {
        this.$message.error(response.body.message);
      }
    }, response => {
    });
    },

    rowClickerrone(row) {
      this.uuid=row.uuid;
      this.centerDialogVisible=true;
    },

    rowClicksucssone(row){
      this.addForm.id=row.id;
      this.centerDialogVisibleone=true;
    },

  },
  mounted() {
    this.bindGrid();
    this.sessionId=DataUtil.sid();
  }
}
</script>
<style>
.hideTooMuch {
  max-width: 268px;
  word-wrap: break-word;
}
</style>