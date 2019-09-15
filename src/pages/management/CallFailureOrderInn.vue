<!-- 打款失败列表 -->
<template>
	<section>
		<!--列表-->
		<template>
			<el-table :data="gridData" border highlight-current-row v-loading="gridLoading" class="grid" :default-sort = "{prop: 'updateTime', order: 'descending'}">
				<el-table-column label="Nomor Permohonan" prop="uuid" width="250">
				</el-table-column>
        <el-table-column label="Jumlah pinjaman" prop="amountApply">
        </el-table-column>
        <el-table-column label="Durasi pinjaman" prop="borrowingTerm">
        </el-table-column>
        <el-table-column label="Nama lengkap" prop="realName" width="250">
        </el-table-column>
        <el-table-column label="Jenis Identitas" prop="userRole" width="120" sortable>
          <template scope="scope">
            {{getChannelNameOne(scope.row.userRole)}}
          </template>
        </el-table-column>
        <el-table-column label=" Waktu gagal" prop="failedTime" min-width="150" sortable>
         <template scope="scope">
          <span>{{getdate(scope.row.failedTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label=" Alasan" prop="errorMessage" width="250">
      </el-table-column>
      <el-table-column label="Kartu bank" prop="shortBankNumber">
      </el-table-column>
      <el-table-column inline-template label="opsi" width="100">
       <div>
        <el-button size="small" @click="check(row)">Detil</el-button>
        <!--   <el-button size="small" @click="check(row)">提交</el-button> -->
      </div>
    </el-table-column>
  </el-table>
</template>

<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
</section>
</template>

<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
export default {
	data () {
		return {
			sex: enums.sex,
			searchForm:{
				uuid:'',
				orderTag:'',
				status:'',
				isAgain:'',
				channel:'',
				refundTime:'',
				realName:'',
				amountApply:'',
				borrowingTerm:'',
				refundTime:'',
				updateTime:'',
        userRole:''
      },
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
        code: '0',
        name: '默认'
      }, {
        code: '1',
        name: 'Android'
      }, {
        code: '2',
        name: 'ios'
      }],
      jkzhuangtai:[{
        code:'WORKING_STAFF',
        name:'Sudah berkerja',
        value:'2'
      },{
        code:'Student',
        name:'Mahasiswa',
        value:'1'
      },{
        code:'House_Wife',
        name:'Ibu rumah tangga',
        value:'3'
      }],

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
        gridLoading: false,
      }
    },
    methods: {
     getChannelName(type) {
       let re = '';
       this.ddqudaolist.forEach(obj => {
        if (obj.code == type) {
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
     getQudaoList() {
      this.$http.post('manage/orders/issueFailed-list',{}).then(response=>{
       let {body} = response;
       this.gridData = body.data;
     },response=>{});
    },
  	// formatTime(time){
  	// 	return DataUtil.formatUnixTime(time);
  	// },
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
       getdates(dates) {
        if (!dates) {
          return '';
        }
        var myDate = new Date(dates);
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
      check(row){
        window.open('#/OrderListDetailsInn?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      getOrderType(type){
       return enums.getOrderPro(type);
     },
     getOrderTag(type){
       return enums.getOrderTagList(type);
     },
     getUnixTime(time){
       return DataUtil.formatUnixTime(time);
     },
     getSex(val) {
       return enums.getSex(val)
     },
     search() {
       this.pageIndex = 1;
       this.bindGrid()
     },
    // rowClick(row){
    // 	window.open('#/orderPreliminaryReview?seen=true&userUuid='+row.userUuid+
    // 		'&uuid='+row.uuid);
    // },
    pageSizeChange(val) {
    	this.pageSize = val;
    	this.pageIndex = 1;
    	this.bindGrid()
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
      this.$http.post('manage/orders/issueFailed-list', _data).then(response => {
        if (1 == response.body.code) {
         this.gridLoading = false;
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
    this.gridLoading = false;
  });
    }
  },
  mounted: function () {
  	this.bindGrid();
  	 // this.getQudaoList();
   }
 }
 </script>
