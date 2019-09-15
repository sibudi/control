<!-- 资金管理 -->
<template>
	<section>
		<!--列表-->
		<template>
			<el-table :data="gridData" border highlight-current-row v-loading="gridLoading" class="grid">
				<el-table-column label="Nama Investor" prop="funder" width="100">
				</el-table-column>
				<el-table-column label="BCA" prop="bcabalance" width="100">
				</el-table-column>
        <el-table-column label="BCA(Investasi Dana)" prop="bcablockedAmount" width="100">
        </el-table-column>
        <el-table-column label="BNI" prop="bnibalance">
        </el-table-column>
        <el-table-column label="BNI(Investasi Dana)" prop="bniblockedAmount">
        </el-table-column>
        <el-table-column label="CIMB" prop="cimbbalance">
        </el-table-column>
        <el-table-column label="CIMB(Investasi Dana)" prop="cimbblockedAmount">
        </el-table-column>
        <el-table-column label="BRI" prop="bribalance">
        </el-table-column>
        <el-table-column label="BRI(Investasi Dana)" prop="briblockedAmount">
        </el-table-column>

        <el-table-column inline-template label="Operasi" width="220">
         <div>

          <el-button size="small" @click="check(row)">Edit</el-button>
          <el-button size="small" @click="checkone(row)">Catatan transaksi</el-button>

        </div>

      </el-table-column>
    </el-table>
  </template>

  <!--分页-->
 <!--  <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination> -->
<!--添加-->
<el-dialog title="Ubah Jumlah Investasi" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
  <el-form :model="addForm" label-position="left" label-width="120px" :rules="inputRule" ref="addForm">
    <el-form-item label="Channel pembayaran transaksi">
     <el-select v-model="addForm.channel" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in zhifuqudao" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Jenis transaksi">
   <el-select v-model="addForm.offlineType" placeholder="Silahkan pilih" clearable>
    <el-option v-for="item in jiaoyileixing" :label="item.name" :key="item.code" :value="item.code"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="Jumlah Transaksi" prop="amount">
  <el-input v-model="addForm.amount" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="catatan">
  <el-input type="textarea" placeholder="Mohon isi catatan" v-model="addForm.comment" :maxlength="300" :rows="5"></el-input>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisible = false">BATAL</el-button>
  <el-button type="primary" @click="tijiaofor" :loading="addFormLoading">Kirim</el-button>
</div>
</el-dialog>


<el-dialog title="Rincian Transaksi" width="90%"  v-model="addDialogVisibleone" :close-on-click-modal="false" >
  <template>
    <el-table :data="gridDataone" border highlight-current-row v-loading="gridLoading" class="grid" width="100%">
      <el-table-column label="Waktu transaksi" prop="createTime" width="100">
        <template scope="scope">
          <span>{{formatTime(scope.row.createTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Jumlah Transaksi" prop="amountDiff" width="100">
      </el-table-column>
      <el-table-column label="Channel pembayaran transaksi" prop="channel" width="100">
      </el-table-column>
      <el-table-column label="Jenis transaksi" prop="type">
        <template scope="scope">
          <span>{{getOrderType(scope.row.type)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Saldo sebelum transaksi" prop="beforeAmount">
      </el-table-column>
      <el-table-column label="Saldo setelah transaksi" prop="afterAmount">
      </el-table-column>
      <el-table-column label="operator" prop="operator">
      </el-table-column>
      <el-table-column label="catatan" prop="remark">
      </el-table-column>
    </el-table>
  </template>
  <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisibleone = false">BATAL</el-button>
  <el-button type="primary" @click="addDialogVisibleone = false" :loading="addFormLoading">Kirim</el-button>
</div>
</el-dialog>

</section>
</template>

<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
export default {
	data () {
		return {
			sex: enums.sex,
      addDialogVisibleone:false,
      gridDataone:[],
      addFormLoading:false,

      inputRule: {
        permissionCode: [{
          required: true,
          message: '请输入Code',
          trigger: 'blur'
        }],
        permissionName: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        permissionUrl: [{
          required: true,
          message: '请输入路径',
          trigger: 'blur'
        }]
      },

      jiaoyileixing:[{
        code: 'TOPUP',
        name: 'isi ulang'
      }, {
        code: 'WITHDRAW',
        name: 'penarikan tunai'
      }],
      zhifuqudao:[{
        code: 'BCA',
        name: 'BCA'
      }, {
        code: 'CIMB',
        name: 'CIMB'
      } ,{
        code: 'BNI',
        name: 'BNI'
      }, {
        code: 'BRI',
        name: 'BRI'
      }],
      addForm:{
        funder:'',
        offlineType:'',
        amount:'',
        comment:'',
        funder:'',
        operator:'',
        channel:'',

      },
      operator:'',

        //订单状态
        orderStatus:enums.orderPro,
        isAgainOrder:enums.isAgainOrder,
        orderTagList:enums.orderTagList,
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        qudaolist: [],
        addDialogVisible: false,
        gridLoading: false,
      }
    },
    methods: {
      check(row) {
        this.addDialogVisible = true
        this.$refs.c && this.$refs.addForm.resetFields()
        this.addForm.funder = row.funder
      },
      checkone(row) {
        this.addDialogVisibleone = true
        this.$refs.c && this.$refs.addForm.resetFields()
        this.addForm.funder = row.funder
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

      tijiaofor(){

        let _data = Object.assign({
        },
        this.addForm);
        this.$http.post("manage/fund/offline/balance/action", _data).then(response => {
          if (1 == response.body.code) {
            this.addDialogVisible = false;
            this.$message("success");
            this.addForm.offlineType='';
            this.addForm.amount='';
            this.addForm.comment='';
            this.addForm.channel='';
            this.bindGrid();
          }else{
            this.$message(response.body.message);
            this.addDialogVisible = false;
            this.addForm.offlineType='';
            this.addForm.amount='';
            this.addForm.comment='';
            this.addForm.channel='';
            this.bindGrid();
          }

        })
      },
      pageSizeChange(val) {
       this.pageSize = val;
       this.pageIndex = 1;
       this.bindGrid()
     },
     getOrderType(type) {
       let re = '';
       this.jiaoyileixing.forEach(obj => {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
     formatTime(time){
    return DataUtil.formatUnixTimeInn(time);
  },
     pageIndexChange(val) {
       this.pageIndex = val;
      //this.$store.dispatch('setOrderListAllIndex',val)
      this.bindGrid()
    },
    bindGrid() {
    	this.gridLoading = true;
    	let _data = {
        pageNo:this.pageIndex,
        pageSize:this.pageSize,
      };
      this.$http.get('manage/all/balance',{params:{token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXltZW50IiwiZXhwIjoxODQ4ODkwMTM2fQ.LfH_9hZmU5XgBcvZOfB9Jl2Z2_FsAkg_y2Hzt2dePLBOlZCvCmFrtqzYl7xidshQp3uhR62AR0Td_KrImCEEjA'}}).then(response => {
        if (1 == response.body.code) {
         this.gridLoading = false;
         if(response.body.data){
          this.gridData = response.body.data;
        }else {
          this.gridData = [];
        }
      } else {
       this.$message.error(response.body.message);
     }
   }, response => {
    this.gridLoading = false;
  });
    },

    checkone(row) {
      // this.gridLoading = true;
      this.addDialogVisibleone = true
      this.$http.get('manage/fund/offline/all',{params:{funder:row.funder,token:'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXltZW50IiwiZXhwIjoxODQ4ODkwMTM2fQ.LfH_9hZmU5XgBcvZOfB9Jl2Z2_FsAkg_y2Hzt2dePLBOlZCvCmFrtqzYl7xidshQp3uhR62AR0Td_KrImCEEjA',pageNo:this.pageIndex,pageSize:this.pageSize}}).then(response => {
        if (1 == response.body.code) {
         this.gridLoading = false;
         if(response.body.data){
          this.gridDataone = response.body.data;
          // this.dataTotal = response.body.data.recordsTotal;
        }else {
          this.gridDataone = [];
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
    this.addForm.operator=DataUtil.userName();
    this.bindGrid();
  	 // this.getQudaoList();
   }
 }
 </script>
 <style>
 .el-dialog--small {
  width: 70%;
}
</style>
