<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="用户手机号">
          <el-input v-model="searchForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="类别">
         <el-select v-model="searchForm.type" placeholder="请选择" clearable>
          <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="交易时间">
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
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column label="用户手机号" prop="mobile"  min-width="180">
      </el-table-column>
      <el-table-column label="交易金额" prop="amount"  min-width="120">
      </el-table-column>
      <el-table-column label="类别" prop="type" min-width="120">
        <template scope="scope">
          {{getChannelNameOne(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="交易时间" prop="createTime" min-width="200" sortable>
      </el-table-column>
      <el-table-column label="佣金余额" prop="balance" min-width="120">
      </el-table-column>
    </el-table>
  </template>
  <!--分页-->
  <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
  layout="total, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
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
        mobile: '',
        type: '',
        beginTime: '',
        endTime: '',
      },
      qixianlist : [{
        code: '1',
        name: '一级好友佣金',
        value:'Komisi Teman Pertama'
      },{
        code: '2',
        name: '二级好友佣金',
        value:'Komisi Teman Kedua'
      },{
        code: '3',
        name: '提现成功',
        value:'Penarikan dana berhasil'
      },{
        code: '4',
        name: '提现锁定中',
        value:'Sedang menunggu penarikan dana'
      },{
        code: '5',
        name: '提现失败',
        value:'Penarikan dana gagal'
      },{
        code: '6',
        name: '提现失败退回',
        value:'Pengembalian dana gagal'
      }],
      pageNo:1,
      sessionId:'',
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
      getChannelNameOne(type) {
       let re = '';
       this.qixianlist.forEach(obj => {
        if (obj.value == type) {
          re = obj.name;
          return
        }
      });
       return re
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
      uuid:this.uuid
    }, this.searchForm);
    this.$http.post('manage/activity/withdrawSuccess', _data).then(response => {
      if (1 == response.body.code) {
       this.bindGrid()
     } else {
      this.$message.error(response.body.message);
    }
  }, response => {
  });
  },

  rowClickerr() {
    let _data = Object.assign({
      uuid:this.uuid
    }, this.searchForm);
    this.$http.post('manage/activity/withdrawFail', _data).then(response => {
      if (1 == response.body.code) {
       this.bindGrid()
     } else {
      this.$message.error(response.body.message);
    }
  }, response => {
  });
  },

},
mounted() {
  this.bindGrid();
  this.sessionId=DataUtil.sid();
}
}
</script>
<style></style>