<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="Label permohonan" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="Silahkan pilih" clearable>
            <el-option v-for="item in bqzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Jumlah pinjaman">
         <el-select v-model="searchForm.amountApply" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in jinelist" :label="item.name" :key="item.code" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="apakah mencicil">
       <el-select v-model="searchForm.isTerms" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Petugas penagihan" prop="outsourceId">
      <el-select v-model="searchForm.outsourceId" placeholder="Silahkan pilih" filterable clearable>
        <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Apakah sudah dialokasi" prop="" label-width="90">
      <el-select v-model="searchForm.isAssigned" placeholder="Silahkan pilih" clearable>
        <el-option  label="Ya" key="" value="1"></el-option>
        <el-option  label="Bukan" key="" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Pinjaman ulang">
      <el-select v-model="searchForm.isRepeatBorrowing" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label=" ">
      <el-button @click="search" type="info" style="width: 170px">Cari</el-button>
    </el-form-item>
  </el-row>
</el-form>

<template>
  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="Nomor Permohonan" prop="uuid"  width="180">
    </el-table-column>
    <el-table-column label="Nama lengkap" prop="realName"  width="80">
    </el-table-column>
    <!--     <el-table-column label="手机号" prop="mobileNumber"  width="130">
    </el-table-column> -->
    <el-table-column label="Pinjaman ulang" prop="isRepeatBorrowing">
      <template scope="scope">
        <el-tag :type="scope.row.isRepeatBorrowing==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'Ya':'Bukan'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="apakah mencicil" prop="isTerm" width="120">
     <template scope="scope">
      <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'Ya':'Bukan'}}</el-tag>
    </template>
  </el-table-column>
  <el-table-column label="batas waktu pembayaran" prop="needPayTerm" width="120" >
  </el-table-column>
  <el-table-column label="Jumlah pinjaman" prop="amountApply">
  </el-table-column>
  <el-table-column label=" Janji waktu pembayaran" prop="promiseRepaymentTime" width="200" sortable>
    <template scope="scope">
      {{getdate(scope.row.promiseRepaymentTime)}}
    </template>
  </el-table-column>
  <el-table-column label="Durasi pinjaman" prop="borrowingTerm">
  </el-table-column>
  <el-table-column label="Label permohonan" prop="orderTag" min-width="116">
    <template scope="scope">
      <span>{{getOrderTypethree(scope.row.orderTag)}}</span>
    </template>
  </el-table-column>
  <el-table-column label="Petugas penagihan" prop="collectorName" min-width="116">
     <!--  <template scope="scope">
        <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
      </template> -->
    </el-table-column>
    <el-table-column label="Total Keterlambatan" prop="overdueDays">
    </el-table-column>
    <el-table-column inline-template label="Opsi" width="100">
      <div>
        <el-button size="small" @click="check(row)">Detil</el-button>
      </div>
    </el-table-column>
  </el-table>
</template>
<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
  <el-form-item label="Petugas penagihan" prop="status">
    <el-select v-model="distributeForm.thirdCompanyTag" placeholder="Silahkan pilih" filterable clearable>
      <el-option v-for="item in thirdCompanyListone" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="distribute" type="info" :loading="distributeLoading">alokasi</el-button>
  </el-form-item>
  <el-form-item>
    <el-button @click="autoDistribute" type="info" :loading="autoDistributeLoading">Alokasi otomatis</el-button>
  </el-form-item>
</el-form>

<el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false" size="large">
  <div style="margin:15px 15px;">
    <template>
     <el-checkbox-group v-model="amountApply">
      <el-checkbox v-for="item in roleList" @change.native="autoDistribute" :key="item.dicItemValue" :value="item.dicItemValue" :label="item.dicItemValue">{{item.dicItemName}}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group v-model="otherAmount">
      <el-checkbox :label="1" @change.native="autoDistribute">lain</el-checkbox>
    </el-checkbox-group>
  </template>
</div>
<div style="margin:0 0 15px;">Sudah dialokasi <el-tag type="success">{{orderD0Assign.totalAssigned}}</el-tag> permohonan，jumlah akun baru <el-tag type="success">{{orderD0Assign.assignedReBorrowingCount0}}</el-tag> permohonan，pinjaman ulang ke 1 <el-tag type="success">{{orderD0Assign.assignedReBorrowingCount1}}</el-tag> permohonan，pinjaman ulang ke 2 <el-tag type="success">{{orderD0Assign.assignedReBorrowingCount2}}</el-tag> permohonan，pinjaman ulang ke 3 <el-tag type="success">{{orderD0Assign.assignedReBorrowingCount3}}</el-tag> permohonan，lebih dari 3x <el-tag type="success">{{orderD0Assign.assignedReBorrowingCountN}}</el-tag> permohonan</div>
<div style="margin:0 0 15px;">menunggu alokasi<el-tag type="danger">{{orderD0Assign.totalUnAssigned}}</el-tag>  permohonan，jumlah akun baru <el-tag type="danger">{{orderD0Assign.unAssignedReBorrowingCount0}}</el-tag> permohonan，pinjaman ulang ke 1 <el-tag type="danger">{{orderD0Assign.unAssignedReBorrowingCount1}}</el-tag> permohonan，pinjaman ulang ke 2 <el-tag type="danger">{{orderD0Assign.unAssignedReBorrowingCount2}}</el-tag> permohonan，pinjaman ulang ke 3  <el-tag type="danger">{{orderD0Assign.unAssignedReBorrowingCount3}}</el-tag> permohonan，lebih dari 3x <el-tag type="danger">{{orderD0Assign.unAssignedReBorrowingCountN}}</el-tag> permohonan</div>
<el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="360">
  <el-table-column label="Petugas penagihan" prop="realName" ></el-table-column>
  <el-table-column label="Jumlah akun baru teralokasi" prop="assignedReBorrowingCount0"></el-table-column>
  <el-table-column label=" jumlah peminjaman ulang ke 1 yg sudah teralokasi" prop="assignedReBorrowingCount1"></el-table-column>
  <el-table-column label=" jumlah peminjaman ulang ke 2 yg sudah teralokasi" prop="assignedReBorrowingCount2"></el-table-column>
  <el-table-column label=" jumlah peminjaman ulang ke 3 yg sudah teralokasi" prop="assignedReBorrowingCount3"></el-table-column>
  <el-table-column label=" jumlah peminjaman ulang ke 3x yg sudah teralokasi" prop="assignedReBorrowingCountN"></el-table-column>
  <el-table-column label="Penambahan alokasi akun baru">
    <template scope="scope">
      <el-input v-model="scope.row.unAssignedReBorrowingCount0"></el-input>
    </template>
  </el-table-column>
  <el-table-column label="Penambahan jumlah alokasi peminjaman ulang ke 1">
    <template scope="scope">
      <el-input v-model="scope.row.unAssignedReBorrowingCount1"></el-input>
    </template>
  </el-table-column>
  <el-table-column label="Penambahan jumlah alokasi peminjaman ulang ke 2">
    <template scope="scope">
      <el-input v-model="scope.row.unAssignedReBorrowingCount2"></el-input>
    </template>
  </el-table-column>
  <el-table-column label="Penambahan jumlah alokasi peminjaman ulang ke 3">
    <template scope="scope">
      <el-input v-model="scope.row.unAssignedReBorrowingCount3"></el-input>
    </template>
  </el-table-column>
  <el-table-column label="Penambahan jumlah alokasi peminjaman ulang ke 3x">
    <template scope="scope">
      <el-input v-model="scope.row.unAssignedReBorrowingCountN"></el-input>
    </template>
  </el-table-column>
</el-table>
<div slot="footer" class="dialog-footer">
  <el-button type="" @click="editFormDigVisible = false">BATAL</el-button>
  <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">YAKIN</el-button>
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
    return {
      searchForm: {
        uuid: '',
        orderTag: '',
        outsourceId: '',
        thirdDistribute: '',
        isAgain: '',
        isAssigned:'',
        isRepeatBorrowing:'',
        amountApply:'',
        isTerms:'',
      },
      termsList : [ {
        code:'1',
        name:'Ya'
      },{
        code:'2',
        name:'Bukan'
      }],
      amountApply:[],
      appflag:'',
      otherAmount:'',
      roleList:[],
      jinelist : [{
        code: '1',
        name: '100000',
      },{
        code: '2',
        name: '200000',
      },{
        code: '4',
        name: '400000',
      },{
        code: '6',
        name: '600000',
      },{
        code: '8',
        name: '800000',
      }, {
        code: '10',
        name: '1000000',
      },{
        code: '12',
        name: '1200000',
      },{
        code: '15',
        name: '1500000',
      }],
      bqzhuangtai : [{
        code: '1',
        name: 'Tidak tersambung'
      },{
        code: '2',
        name: 'Sementara tidak tersambung'
      },{
        code: '3',
        name: 'Tersambung, ingkar janji'
      },{
        code: '4',
        name: 'Tersambung, memberi janji'
      }],
      orderD0Assign:{
       assignedReBorrowingCount0: 0,
       assignedReBorrowingCount1: 0,
       assignedReBorrowingCount2: 0,
       assignedReBorrowingCount3: 0,
       assignedReBorrowingCountN: 0,
       totalAssigned: 0,
       totalUnAssigned: 0,
       unAssignedReBorrowingCount0: 0,
       unAssignedReBorrowingCount1: 0,
       unAssignedReBorrowingCount2: 0,
       unAssignedReBorrowingCount3: 0,
       unAssignedReBorrowingCountN: 0
     },
     // orderTagList:enums.orderTagList,
     thirdCompanyList: [],
     thirdCompanyListone:[],
     allpersonList:[],
     gridData: [],
     gridLoading: false,
     pageIndex: 1,
     pageSize: 20,
     dataTotal: 0,
     distributeForm:{
      thirdCompanyTag:'',
    },
    distributeLoading: false,
    commonForm:{
      title: ''
    },
    isAgainOrder:enums.isAgainOrder,
    editFormDigVisible: false,
    confirmLoading: false,
    editForm: {
      code: ''
    },
    autoDistributeLoading: false,
    userListData: [],
    editGridLoading: false,
    selectData: [],
    totalAssigned:0,
    totalUnAssigned: 0
  }
},
methods: {
  getCollecttionPerson() {
    this.$http.post('manage/collection/post-collectors',{}).then(response => {
      let {body} = response;
      if(body.code == 1){
        this.allpersonList = body.data;
      }else{
        this.allpersonList = [];
      }
    },response => {});
  },
  // getOrderTypethree(val){
  //   let re = '';
  //   this.bqzhuangtai.forEach(function (obj) {
  //     if(obj.code == val){
  //       re = obj.name;
  //       return;
  //     }
  //   });
  //   return re;
  // },
  getOrderTypethree(type) {
   let re = '';
   this.bqzhuangtai.forEach(obj => {
    if (obj.code == type) {
      re = obj.name;
      return
    }
  });
   return re
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
    // 当前岗位催收人员
    getCollectionListone() {
      this.$http.post('manage/collection/current-collectors',{isThird:1,postId:this.postId}).then(response => {
        let {body} = response;
        if(body.code == 1){
          this.thirdCompanyListone = body.data;
        }else{
          this.thirdCompanyListone = [];
        }
      },response => {});
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
    // getOrderTag(type){
    //   return enums.getOrderTagList(type);
    // },
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

   check(row){
    window.open('#/CollectionOrderDetailsInn?seen=true&userUuid='+row.userUuid+
      '&uuid='+row.uuid);
  },
  rowClick(row){
    window.open('#/CollectionOrderDetailsInn?seen=true&userUuid='+row.uuid+
      '&uuid='+row.orderNo);
  },
  search() {
    this.pageIndex = 1;
    this.bindGrid()
  },
  bindGrid() {
    this.gridLoading = true;
    let _data = Object.assign({
      pageNo:this.pageIndex,
      pageSize:this.pageSize,
      overdueDayMin: this.itemValue.split('#')[0],
      overdueDayMax: this.itemValue.split('#')[1]
    }, this.searchForm);
    this.$http.post('manage/collection/orders/assignable-D0-list', _data).then(response => {
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
  },
  distribute() {
    if(!this.distributeForm.thirdCompanyTag){
      this.$message.error("Silahkan pilih Petugas penagihan");
      return false;
    }
    let result = {};
    result.outsourceId = this.distributeForm.thirdCompanyTag;
    let orderUUIDs  = []
    result.orderUUIDs = orderUUIDs;
    this.selectData.forEach((data) =>{
      let temp = {};
      temp.uuid = data.uuid;
      temp.uuidString = data.userUuid;
      temp.outsourceId = this.distributeForm.thirdCompanyTag;
      orderUUIDs.push(data.uuid);
    });
    if(result.length <= 0){
      this.$message.error("Silahkan pilih penagihan permohonan");
      return false;
    }
    this.distributeLoading = true;
    this.$http.post('manage/collection/order-assignment',result).then(response =>{
      this.distributeLoading = false;
      let {body} = response;
      if(1 == body.code){
        this.$message({
          message: 'Berhasil dialokasikan',
          type: 'success'
        })
        this.bindGrid();
      }
    });
  },
  bindRole() {
    let _data = {
      dicCode:'cash_amount'
    }
    this.$http.post('manage/dicItemListByDicCode', _data).then(response => {
      if (1 == response.body.code) {
        let _arr = []
        for (let i = 0; i < response.body.data.length; i++) {       
          _arr.push(response.body.data[i])
        }
        this.roleList = _arr
      }
    }, response => {

    });
  },
autoDistribute(row) {      //自动分配返显
  if (this.otherAmount == true) {
    this.appflag = 1;
  }else {
    this.appflag = '';
  }
  this.editFormDigVisible = true;
  this.editGridLoading = true;
  this.commonForm.title = 'Alokasi permohonan（'+this.dialogTitle+'）';
  this.$http.post('manage/collection/D0-assignment-statistics',{'section':this.itemValue,'amountApply':this.amountApply,'otherAmount':this.appflag}).then(response => {
    this.editGridLoading = false;
    let {body} = response;
    if(body.code == 1){
      this.userListData = [];
      this.orderD0Assign = body.data.orderStatistics;
      this.userListData = body.data.collectorOrderStatistics;
      this.$message({
          message: 'Alokasi otomatis berhasil',
          type: 'success'
        });
    }else{
      this.$message.error(body.message);
    }
  },response =>{});
},
  editFormSubmit() {       //自动分配数据提交
    let _unAssign0Count = 0,_unAssign1Count = 0,_unAssign2Count = 0,_unAssign3Count = 0,_unAssign4Count = 0;

    for(let i=0;i<this.userListData.length;i++){
      if(this.userListData[i].unAssignedReBorrowingCount0 === '' || this.userListData[i].unAssignedReBorrowingCount1 === ''|| this.userListData[i].unAssignedReBorrowingCount2 === ''|| this.userListData[i].unAssignedReBorrowingCount3 === ''|| this.userListData[i].unAssignedReBorrowingCountN === ''){
        this.$message.error('Semua pesanan alokasi tidak boleh kosong');
        return;
      }else{
        _unAssign0Count += parseInt(this.userListData[i].unAssignedReBorrowingCount0);
              // 计算每列单数总和
              _unAssign1Count += parseInt(this.userListData[i].unAssignedReBorrowingCount1);
              _unAssign2Count += parseInt(this.userListData[i].unAssignedReBorrowingCount2);
              _unAssign3Count += parseInt(this.userListData[i].unAssignedReBorrowingCount3);
              _unAssign4Count += parseInt(this.userListData[i].unAssignedReBorrowingCountN);
            }
          }
          console.log(this.userListData);
          if(_unAssign0Count > this.orderD0Assign.unAssignedReBorrowingCount0 || _unAssign1Count > this.orderD0Assign.unAssignedReBorrowingCount1 || _unAssign2Count > this.orderD0Assign.unAssignedReBorrowingCount2 || _unAssign3Count > this.orderD0Assign.unAssignedReBorrowingCount3 || _unAssign4Count > this.orderD0Assign.unAssignedReBorrowingCountN){
            this.$message.error('Tidak ada sisa pesanan yang cukup untuk dialokasikan, harap ditugaskan kembali');
            return;
          }
          if (this.otherAmount == true) {
            this.appflag = 1;
          }else {
            this.appflag = '';
          }
          let _data = {
            collectorAssignmentRequest:this.userListData,
            section:this.itemValue,
            amountApply:this.amountApply,
            otherAmount:this.appflag
          };
          this.confirmLoading = true;
          this.$http.post('manage/collection/D0-auto-order-assignment',_data).then(response =>{
            this.confirmLoading = false;
            let {body} = response;
            if(body.code == 1){
              this.$message({
                type: 'success',
                message: 'Berhasil diubah'
              });
              this.editFormDigVisible = false;
              this.bindGrid();
            }else{
              this.$message.error(body.message);
            }
          },response =>{this.confirmLoading = false;});
        },
      },
      mounted() {
        this.getCollecttionPerson();
        this.getCollectionList();
        this.bindGrid();
        this.getCollectionListone();
        this.bindRole();
      }
    }
    </script>
    <style></style>
