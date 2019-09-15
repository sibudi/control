<!-- 订单审核列表-复审 -->
<template>
	<section>
		<!--列表-->
		<template>
      <el-table :data="gridData" border highlight-current-row v-loading="gridLoading" class="grid" :default-sort = "{prop: 'updateTime', order: 'descending'}">
        <el-table-column label="Nomor Permohonan" prop="uuid" width="220">
        </el-table-column>
        <el-table-column label="status manual kedua
        " prop="secondCheckStatus" width="140">
        <template scope="scope">
          <span>{{getChannelNameone(scope.row.secondCheckStatus)}}</span>
        </template>
      </el-table-column>
        <el-table-column label="Pesan verifikasi permohonan tahap akhir" prop="operatorType" width="140">
          <template scope="scope">
            <span>{{getOperatorType(scope.row.operatorType)}}</span>
          </template>
        </el-table-column>
      <el-table-column label="Nama lengkap" prop="realName" width="180">
      </el-table-column>
      <el-table-column label="Jumlah pinjaman" prop="amountApply">
      </el-table-column>
      <el-table-column label="Durasi pinjaman" prop="borrowingTerm"><!-- 申请期限 -->
      </el-table-column>
      <el-table-column label="Petugas manual pertama" prop="firstChecker" width="200">
      </el-table-column>
      <el-table-column label="Waktu pembaharuan" prop="updateTime" min-width="116" sortable><!-- 更新时间 -->
        <template scope="scope">
          <span>{{getdate(scope.row.updateTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Jenis perangkat" prop="channel"><!-- 订单渠道 -->
        <template scope="scope">
          {{getChannelName(scope.row.channel)}}
        </template>
      </el-table-column>
      <el-table-column inline-template label="Opsi" width="100"><!-- 操作 -->
        <div>
          <el-button size="small" @click="check(row)">Verifikasi</el-button><!-- 审核 -->
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
			},
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
      fushenlist : [{
        code: '0',
        name: 'belum diproses'
      }, {
        code: '1',
        name: 'status manual kedua'
      }],
      operatorlist : [{
        code: '0',
        name: ''
      }, {
        code: '1',
        name: 'Ditinjau ulang'
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
     getQudaoList() {
      this.$http.post('manage/orders/reviewer/userSelf',{status:4}).then(response=>{
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
      getOrderType(type){
      	return enums.getOrderPro(type);
      },
      getOrderTag(type){
      	return enums.getOrderTagList(type);
      },
      getUnixTime(time){
      	return DataUtil.formatUnixTime(time);
      },
      getChannelNameone(type) {
       let re = '';
       this.fushenlist.forEach(obj => {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
       return re
     },
      getOperatorType(type) {
        let re = '';
        this.operatorlist.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
     getSex(val) {
       return enums.getSex(val)
     },
     search() {
       this.pageIndex = 1;
       this.bindGrid()
     },
      // rowClick(row){
      // 	window.open('#/orderSecondReview?seen=true&userUuid='+row.userUuid+
      // 		'&uuid='+row.uuid);
      // },
      check(row){
        let semeDate = new Date();
        localStorage.setItem('semyCat', semeDate);
        window.open('#/orderSecondReviewInn?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },
      pageSizeChange(val) {
      	console.log(val);
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
        status:4
      };
      this.$http.post('manage/orders/reviewer/userSelf', _data).then(response => {
        if (1 == response.body.code) {
         this.gridLoading = false;
         if(response.body.data){
          this.gridData = response.body.data.data;
          console.log(this.gridData)
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
