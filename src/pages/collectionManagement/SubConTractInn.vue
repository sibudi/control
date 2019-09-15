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
         <el-form-item label="apakah mencicil">
         <el-select v-model="searchForm.isTerms" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="Petugas penagihan" prop="subOutSourceId">
          <el-select v-model="searchForm.subOutSourceId" placeholder="Silahkan pilih" filterable clearable>
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
    <el-table-column label="Jumlah hari keterlambatan" prop="overdueDays" width="150" sortable>
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

<el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
  <div style="margin:15px 15px;">
    <template>
      <el-checkbox-group v-model="amountApply">
        <el-checkbox v-for="item in roleList" :key="item.dicItemValue" :value="item.dicItemValue" :label="item.dicItemValue">{{item.dicItemName}}</el-checkbox>
      </el-checkbox-group>
    </template>

  </div>
  <div style="margin:0 0 15px;">Sudah dialokasi <el-tag type="success">{{distributeCount}}</el-tag> permohonan，Sudah mengalokasi <el-tag type="success">{{oldDistributeCount}}</el-tag>permohonan，jumlah akun baru <el-tag type="success">{{newDistributeCount}}</el-tag> permohonan</div>
  <div style="margin:0 0 15px;">menunggu alokasi <el-tag type="danger">{{needDistributeCount}}</el-tag> permohonan，Sudah mengalokasi <el-tag type="danger">{{oldNeedDistributeCount}}</el-tag> permohonan，jumlah akun baru <el-tag type="danger">{{newNeedDistributeCount}}</el-tag> permohonan</div>
  <el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="360">
    <el-table-column label="Petugas penagihan" prop="realName" >
    </el-table-column>
    <el-table-column label=" Jumlah Akun lama teralokasi " prop="assignedReBorrowingCountN">
    </el-table-column>
    <el-table-column label=" Jumlah akun baru teralokasi" prop="assignedReBorrowingCount0">
    </el-table-column>
    <el-table-column label="Penambahan alokasi akun lama" prop="unAssignedReBorrowingCountN" >
      <template scope="scope">
        <el-input v-model="scope.row.unAssignedReBorrowingCountN"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="Penambahan alokasi akun baru" prop="unAssignedReBorrowingCount0" >
      <template scope="scope">
        <el-input v-model="scope.row.unAssignedReBorrowingCount0"></el-input>
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
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
export default {
  props: ['dialogTitle','postId','itemValue'],
  data() {
    return {
      searchForm: {
        uuid: '',
        orderTag: '',
        subOutSourceId: '',
        thirdDistribute: '',
        isAgain: '',
        isAssigned:'',
        isRepeatBorrowing:'',
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
      orderTagList:enums.orderTagList,
      thirdCompanyList: [],
      thirdCompanyListone:[],
      allpersonList:[],
      gridData: [],
      gridLoading: false,
      pageIndex: 1,
      pageSize: 20,
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
      dataTotal: 0,
      distributeCount:'',
      newNeedDistributeCount:'',
      oldDistributeCount:'',
      newDistributeCount:'',
      needDistributeCount:'',
      oldNeedDistributeCount:'',
      split:'',
      distributeForm:{
        thirdCompanyTag:'',
      },
      distributeLoading: false,
      commonForm:{
        title: ''
      },
      isAgainOrder:[{
        code: '1',
        name: 'Ya'
      },{
        code: '2',
        name: 'Bukan'
      }
       
      ],
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
    getCollectionList() {
      this.$http.post('manage/collection/collector-outPost-list',{outSourceId
        :DataUtil.id(),}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
    // 当前岗位催收人员
    getCollectionListone() {
      this.$http.post('manage/collection/collector-outPost-list',{outSourceId
        :DataUtil.id(),}).then(response => {
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
     check(row){
      window.open('#/CollectionOrderDetailsInn?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/CollectionOrderDetailsInn?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
    },
    search() {
      this.pageIndex = 1;
      this.bindGrid()
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
      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          outsourceId:DataUtil.id(),
        }, this.searchForm);
        this.$http.post('manage/collection/orders/assignable-overdue-list-outSource', _data).then(response => {
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
          this.$message.error("Pilih petugas penagihan");
          return false;
        }
        let result = {};
        result.outsourceId = this.distributeForm.thirdCompanyTag;
        let orderUUIDs  = []
        result.orderUUIDs = orderUUIDs;
        result.isThird = true;
        this.selectData.forEach((data) =>{
          let temp = {};
          temp.uuid = data.uuid;
          temp.uuidString = data.userUuid;
          temp.outsourceId = this.distributeForm.thirdCompanyTag;
          orderUUIDs.push(data.uuid);
        });
        if(result.length <= 0){
          this.$message.error("Pilih penagihan permohonan");
          return false;
        }
        this.distributeLoading = true;
        this.$http.post('manage/collection/order-assignment',result).then(response =>{
          this.distributeLoading = false;
          let {body} = response;
          if(1 == body.code){
            this.bindGrid();
          }
        });
      },
     autoDistribute(row) {              //自动分配
      this.editFormDigVisible = true;
      this.commonForm.title = ' Alokasi otomatis（'+this.dialogTitle+'）';
      this.editGridLoading = true;
      this.$http.post('manage/collection/overdue-assignment-statistics-outSource',{outSourceId:DataUtil.id(),}).then(response => {
        this.editGridLoading = false;
        let {body} = response;
        if(body.code == 1){
          this.userListData = [];
          this.distributeCount = body.data.orderStatistics.totalAssigned;
          this.oldDistributeCount = body.data.orderStatistics.assignedReBorrowingCountN;
          this.newDistributeCount = body.data.orderStatistics.assignedReBorrowingCount0;
          this.needDistributeCount = body.data.orderStatistics.totalUnAssigned;
          this.oldNeedDistributeCount = body.data.orderStatistics.unAssignedReBorrowingCountN;
          this.newNeedDistributeCount = body.data.orderStatistics.unAssignedReBorrowingCount0;
          this.userListData = body.data.collectorOrderStatistics;
        }else{
          this.$message.error(body.message);
        }
      },response =>{});
    },
    editFormSubmit() {
      let _oldtotalNum = 0,_newtotalNum=0;
      for(let i=0;i<this.userListData.length;i++){
        if(this.userListData[i].unAssignedReBorrowingCountN === '' || this.userListData[i].unAssignedReBorrowingCount0 === ''){
          this.$message.error(' jumlah seluruh alokasi permohonan harus diisi');
          return;
        }else{
          // this.userListData[i].orderCount = this.userListData[i].unAssignedReBorrowingCountN;
          // this.userListData[i].newOrderCount = this.userListData[i].unAssignedReBorrowingCount0;
          _oldtotalNum += parseInt(this.userListData[i].unAssignedReBorrowingCountN);
          _newtotalNum += parseInt(this.userListData[i].unAssignedReBorrowingCount0);
        }
      }
      if(_oldtotalNum > this.oldNeedDistributeCount || _newtotalNum > this.newNeedDistributeCount){
        this.$message.error(' Sisa jumlah tunggu alokasi permohonan tidak cukup, silakan ulangi proses alokasi');
        return;
      }

      let _data = {
        section: '0#3000',
        collectorAssignmentRequest:this.userListData,
        postId:this.postId,
        isThird:true,
        outSourceId:DataUtil.id(),
      };
      this.confirmLoading = true;
      this.$http.post('manage/collection/overdue-auto-order-assignment',_data).then(response =>{
        this.confirmLoading = false;
        let {body} = response;
        if(body.code == 1){
          this.editFormDigVisible = false;
          this.$alert('Alokasi selesai, tersisa permohonan yg belum dialokasi：Akun lama'+body.data.oldNeedDistributeCount+'permohonan，jumlah akun baru'+body.data.newNeedDistributeCount+'permohonan', 'Alokasi sukses', {
            confirmButtonText: 'YAKIN',
            callback: action => {
              this.$message({
                type: 'success',
                message:''
              });
            }
          });
          this.bindGrid();
        }else{
          this.$message.error(body.message);
        }
      },response =>{this.confirmLoading = false;});
    },
  },
  mounted() {
//    this.getCollecttionPerson();
    this.getCollectionList();
    this.bindGrid();
    this.getCollectionListone();
    this.bindRole();
  }
}
</script>
<style></style>
