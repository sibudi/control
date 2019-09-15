<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="转账编号">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="Go-pay账号" >
          <el-input v-model="searchForm.caseoutAccount"></el-input>
        </el-form-item>
        <el-form-item label="Go-pay账户姓名" >
          <el-input v-model="searchForm.caseoutAccountName"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <div class="block">
            <el-date-picker v-model="searchForm.beginTime" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
            </el-date-picker> ~
            <el-date-picker v-model="searchForm.endTime" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row class="grid" @selection-change="handleSelectionChange">
        <el-table-column label="转账编号" prop="uuid"  min-width="180">
        </el-table-column>
        <el-table-column label="金额" prop="amount"  min-width="180">
        </el-table-column>
        <el-table-column label="Go-pay账号" prop="caseoutAccount"  min-width="80">
        </el-table-column>
        <el-table-column label="Go-pay账户姓名" prop="caseoutAccountName">
        </el-table-column>
        <el-table-column label="申请时间" prop="createTime" width="150" sortable>
        </el-table-column>
        <el-table-column inline-template label="操作" min-width="200">
          <div v-if="flger">
            <el-button size="small" @click="rowClicksucssone(row)">转账完成</el-button>
            <el-button size="small" @click="rowClickerrone(row)">转账失败</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>

    
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
    layout="total, prev, pager, next, jumper" :total="dataTotal">
  </el-pagination>
  <el-dialog
  title="提示"
  :visible.sync="centerDialogVisible"
  width="30%"
  center>
  <span>确定转账失败吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rowClickerr">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
title="提示"
:visible.sync="centerDialogVisibleone"
width="30%"
center>
<span>确定转账成功吗？</span>
<span slot="footer" class="dialog-footer">
  <el-button @click="centerDialogVisibleone = false">取 消</el-button>
  <el-button type="primary" @click="rowClicksucss">确 定</el-button>
</span>
</el-dialog>
</section>
</template>
<script>
import enums from '../common/Enum'
import DataUtil from '../common/dataUtil'
export default {
  props: ['dialogTitle','postId','itemValue'],
  data() {
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
      searchForm: {
        uuid: '',
        caseoutAccount: '',
        caseoutAccountName: '',
        beginTime: '',
        endTime: '',
        isAssigned:'',
        isRepeatBorrowing:'',
        amount:''
      },
      centerDialogVisible: false,
      centerDialogVisibleone: false,
      flger:false,
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
      ifclear(){
       if(this.postId == 4){
        this.flger=true;
      }else{
       this.flger=false;
     }
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
 search() {
  this.pageIndex = 1;
  this.bindGrid()
},
bindGrid() {
  let _data = Object.assign({
    type:this.postId,
    channel:"2",
    pageNo:this.pageIndex,
    pageSize:this.pageSize,
    sessionId:this.sessionId
  }, this.searchForm,{
    beginTime:DataUtil.formatUnixDateTimeone(this.searchForm.beginTime)||'',
    endTime:DataUtil.formatUnixDateTimeone(this.searchForm.endTime)||''
  });
  this.$http.post('manage/activity/withdrawList', _data).then(response => {
    if (1 == response.body.code) {
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
  this.uuid=row.uuid;
  this.centerDialogVisibleone=true;
},

},
mounted() {
  this.bindGrid();
  this.ifclear();
  this.sessionId=DataUtil.sid();
}
}
</script>
<style></style>