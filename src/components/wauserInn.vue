<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="100px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.orderNo"></el-input>
        </el-form-item>
        <el-form-item label="Nama" >
          <el-input v-model="searchForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="Nomor HP" >
          <el-input v-model="searchForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="Jumlah Hari Keterlambatan">
          <el-input v-model="searchForm.overDueDay"></el-input>
        </el-form-item>
        <el-form-item label="Jarak waktu janji bayar">
          <div class="block">
            <el-date-picker v-model="searchForm.promiseTimeStart" type="datetime" :picker-options="pickerOptions1" :editable="false" placeholder="Silahkan pilih">
            </el-date-picker> ~
            <el-date-picker v-model="searchForm.promiseTimeEnd" type="datetime" :picker-options="pickerOptions2" :editable="false" placeholder="Silahkan pilih">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="Solusi">
         <el-select v-model="searchForm.solveType" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in jjlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" ">
        <el-button @click="search" type="info" style="width: 170px">Pertanyaan</el-button>
      </el-form-item>
    </el-row>
  </el-form>

  <template>
    <el-table :data="gridData" highlight-current-row class="grid" @selection-change="handleSelectionChange">
      <el-table-column label="Nomor Permohonan" prop="orderNo"  min-width="120">
      </el-table-column>
      <el-table-column label="Nama" prop="userName"  min-width="120">
      </el-table-column>
      <el-table-column label="Jumlah Pengajuan" prop="amountApply"  min-width="80">
      </el-table-column>
      <el-table-column label="Batas Waktu pengajuan" prop="borrowingTerm"  min-width="80">
      </el-table-column>
      <el-table-column label="Jumlah Hari Keterlambatan" prop="overDueDay"  min-width="80">
      </el-table-column>
      <el-table-column label="Isi balasan" prop="replyContent"  min-width="180">
      </el-table-column>
      <el-table-column label="Operator" prop="operator" width="120">
      </el-table-column>
      <el-table-column label="Catatan" prop="remark" width="150" sortable>
      </el-table-column>
      <el-table-column label="Solusi" prop="solveType" width="150" sortable>
        <template scope="scope">
          <span>{{getOrderTypethree(scope.row.solveType)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Jarak waktu janji bayar" prop="promiseTime" width="150" sortable>
        <template scope="scope">
          {{getdate(scope.row.promiseTime)}}
        </template>
      </el-table-column>

      <el-table-column  label="implementasi" min-width="330">     
       <template scope="scope">
        <el-button size="small" @click="rowClicksucssone(scope.row)">Edit</el-button>
        <el-popover trigger="hover" placement="top">
          <p class="hideTooMuch">{{scope.row.phoneNum}}</p>
          <el-button size="small" @click="" slot="reference">Lihat nomor ponsel</el-button>
        </el-popover>
        <el-button size="small" @click="rowClick(scope.row)">Detai permohonan</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>


<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<el-dialog title="Edit" v-model="centerDialogVisibleone" :close-on-click-modal="false" width="40%">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="Solusi">
     <el-select v-model="addForm.solveType" placeholder="Silahkan pilih" clearable @change="getProv($event)">
      <el-option v-for="item in jjlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Jarak waktu janji bayar" prop="promiseTimeStart">
    <el-date-picker v-model="addForm.promiseDate" type="date" placeholder="Silahkan pilih" :picker-options="pickerOptions"></el-date-picker>
    <el-time-select placeholder="Silahkan pilih" v-model="addForm.promiseTime" :picker-options="pickerTimeOptions"></el-time-select>
    （非必填）
  </el-form-item>
  <el-form-item label="Catatan">
    <el-input type="textarea" placeholder="Keterangan" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="centerDialogVisibleone = false">Batalkan</el-button>
  <el-button type="primary" @click="tijiaofor" >Kirim</el-button>
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