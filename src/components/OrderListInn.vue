<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="Nomor Permohonan">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="Nama lengkap">
          <el-input v-model="searchForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="Nomor Ponsel">
          <el-input v-model="searchForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="apakah mencicil">
         <el-select v-model="searchForm.isTerms" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="Durasi pinjaman">
         <el-select v-model="searchForm.borrowingTerm" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Petugas verivikasi" prop="reviewerId">
        <el-select v-model="searchForm.reviewerId" placeholder="Silahkan pilih" filterable clearable>
          <el-option v-for="item in thirdCompanyList" :label="item.realname" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Jenis perangkat">
       <el-select v-model="searchForm.channel" placeholder="Silahkan pilih" clearable>
         <el-option v-for="item in ddqudaolist" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue.split('#')[0]"></el-option>
       </el-select>
     </el-form-item>
     <el-form-item label="Jenis Identitas">
       <el-select v-model="searchForm.userRole" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in jkzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Waktu Pengajuan">
      <div class="block">
        <el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker> ~
        <el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="Waktu pembaharuan">
      <div class="block">
        <el-date-picker v-model="searchForm.updateBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker> ~
        <el-date-picker v-model="searchForm.updateEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="Apakah sudah dialokasi" prop="" label-width="90">
      <el-select v-model="searchForm.isAssignment" placeholder="Silahkan pilih" clearable>
        <el-option  label="Ya" key="" value="1"></el-option>
        <el-option  label="Bukan" key="" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label=" ">
      <el-button @click="search" type="info" style="width: 170px">Cari</el-button>
    </el-form-item>
  <!-- <el-form-item label=" ">
    <el-row :span="8" class="grid-content">
      <span class="wirft">Belum ditetapkan:</span><span>{{ uuid }}</span>
      <span class="wirft">Permohonan dalam verifikasi:</span><span>{{ uuid }}</span>
    </el-row>
  </el-form-item> -->
</el-row>
</el-form>
<template>

  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="Nomor Permohonan" prop="uuid"  width="180">
    </el-table-column>
    <el-table-column label="Nama lengkap" prop="realName"  width="80">
    </el-table-column>
    <el-table-column label="Jenis Identitas" prop="userRole" width="120" sortable>
      <template scope="scope">
        {{getChannelNameOne(scope.row.userRole)}}
      </template>
    </el-table-column>
    <el-table-column label="Jumlah pinjaman" prop="amountApply" width="120" sortable>
    </el-table-column>
    <el-table-column label="Durasi pinjaman" prop="borrowingTerm" width="120" sortable>
    </el-table-column>
    <el-table-column label="Waktu pembaharuan" prop="updateTime" width="240" sortable>
      <template scope="scope">
        {{getdate(scope.row.updateTime)}}
      </template>
    </el-table-column>
    <el-table-column label="分配时间" prop="reviewTime" width="240" sortable>
      <template scope="scope">
        {{getdate(scope.row.reviewTime)}}
      </template>
    </el-table-column>
    <el-table-column label="apakah mencicil" prop="isTerm" width="120">
     <template scope="scope">
      <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'Ya':'Bukan'}}</el-tag>
    </template>
  </el-table-column>
  <el-table-column label="batas waktu pembayaran" prop="needPayTerm" width="120" >
  </el-table-column>
  <el-table-column label="Petugas verivikasi" prop="reviewerName" width="120" sortable>
  </el-table-column>
  <el-table-column label="Jenis perangkat" prop="channel" width="120" sortable>
    <template scope="scope">
      {{getChannelName(scope.row.channel)}}
    </template>
  </el-table-column>
    <!--     <el-table-column label="手机号" prop="mobileNumber"  width="130">
    </el-table-column> -->
    <el-table-column label="Opsi" min-width="140">
      <template scope="scope">
        <el-button size="small" @click="check(scope.row)">Detil</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<!--分页-->

<el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
  <el-form-item label="Petugas verivikasi" prop="status">
    <el-select v-model="distributeForm.thirdCompanyTag" placeholder="Silahkan pilih" filterable clearable>
      <el-option v-for="item in thirdCompanyListone" :label="item.realname" :key="item.id" :value="item.id"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
    <el-button @click="distribute" type="info" :loading="distributeLoading">alokasi</el-button>
  </el-form-item>
</el-form>
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
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
        reviewerId:'',
        uuid: '',
        orderTag: '',
        outsourceId: '',
        thirdDistribute: '',
        isAgain: '',
        isTestOrder: '',
        createBeginTime:'',
        createEndTime:'',
        amountApply:'',
        borrowingTerm :'',
        applyTime: '',
        channel: '',
        mobile:'',
        realName:'',
        userRole:'',
        updateBeginTime:'',
        updateEndTime:'',
        isAssignment:'',
        isTerms:'',

      },
      termsList : [ {
      code:'1',
      name:'Ya'
    },{
      code:'2',
      name:'Bukan'
    }],
      orderTagList:enums.orderTagList,
      thirdCompanyList: [],
      thirdCompanyListone: [],
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
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "createBeginTime", "e")
        }
      },
      autoDistributeLoading: false,
      userListData: [],
      editGridLoading: false,
      selectData: [],
      distributeCount:0,
      oldDistributeCount: 0,
      newDistributeCount: 0,
      needDistributeCount: 0,
      oldNeedDistributeCount: 0,
      newNeedDistributeCount: 0,
      setTestFormDigVisible: false,
      setTestForm: {
        isTestOrder: '',
        orderNo: '',
        userUuid: ''
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
      }, {
        code: '30',
        name: '30Hari'
      }],
      ddqudaolist : JSON.parse(localStorage.getItem('orderChannel')),
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
      setTestconfirmLoading: false,

        assignSum:0,     //测试订单分配
        unAssignSum: 0,
        userAssignList: [],
        testAssignFormDigVisible: false,
        testAssignGridLoading: false,
        testAssignconfirmLoading: false
      }
    },
    methods: {
     getChannelName(type) {
       let re = '';
       this.ddqudaolist.forEach(obj => {
         if (obj.dicItemValue.split('#')[0] == type) {
           re = obj.dicItemName;
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
     formatTime(time){
      return DataUtil.formatUnixTime(time);
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
      getCollecttionPerson() {
        this.$http.post('manage/review-assignment-list',{status:'FIRST_CHECK'}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.allpersonList = body.data;
          }else{
            this.allpersonList = [];
          }
        },response => {});
      },
      getCollectionList() {
        let _data = Object.assign({
          pageNo:this.pageIndex,
          postName:this.postId,
          postId:this.postId,
          overdueDayMin: this.itemValue.split('#')[0],
          overdueDayMax: this.itemValue.split('#')[1]
        }, this.searchForm);
        this.$http.post('manage/all-post-reviewers',_data).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList  = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
      getCollectionListone() {
        let _data = Object.assign({
          pageNo:this.pageIndex,
          postName:this.postId,
          postId:this.postId,
          overdueDayMin: this.itemValue.split('#')[0],
          overdueDayMax: this.itemValue.split('#')[1]
        }, this.searchForm);
        this.$http.post('manage/current-reviewers',_data).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyListone  = body.data;
          //   body.data.forEach(e => {
          //     if (e.postEnglishName == 'JUNIOR_REVIEWER') {
          //     //assignedReviewers = e.reviewers;

          //     return;
          //   }
          // });

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
      window.open('#/OrderDetailsInn?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
    },
    test(row){
      this.setTestFormDigVisible = true;
      this.setTestForm.isTestOrder = row.isTestOrder;
      this.setTestForm.orderNo = row.uuid;
      this.setTestForm.userUuid = row.userUuid;
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
        status:this.itemValue,
        overdueDayMin: this.itemValue.split('#')[0],
        overdueDayMax: this.itemValue.split('#')[1]
      }, this.searchForm,{
        createBeginTime:DataUtil.formatTime(this.searchForm.createBeginTime)||'',
        createEndTime:DataUtil.formatTime(this.searchForm.createEndTime)||'',
        updateBeginTime:DataUtil.formatTime(this.searchForm.updateBeginTime)||'',
        updateEndTime:DataUtil.formatTime(this.searchForm.updateEndTime)||''
      });
      this.$http.post('manage/orders/review-assignment-list', _data).then(response => {
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
        this.$message.error("Silakan pilih petugas ");
        return false;
      }
      // let result = [];
      // this.selectData.forEach((data) =>{
      //   let temp = {};
      //   temp.uuid = data.uuid;
      //   temp.uuidString = data.userUuid;
      //   temp.outsourceId = this.distributeForm.thirdCompanyTag;
      //   result.push(temp);
      // });


      let orderUUIDS = [];
      this.selectData.forEach((data)=>{orderUUIDS.push(data.uuid)});
      let result = {"orderUUIDs":orderUUIDS,"reviewerId":this.distributeForm.thirdCompanyTag};

      if(orderUUIDS.length <= 0){
        this.$message.error("Silakan pilih permohonan");
        return false;
      }
      this.distributeLoading = true;
      console.log(result)
      this.$http.post('manage/orders/review-assignment',result).then(response =>{
        this.distributeLoading = false;
        let {body} = response;
        if(1 == body.code){
         this.$message({
          type: 'success',
          message: 'success'
        });
         this.bindGrid();

       }
     });
    },
    editFormSubmit() {
      let _oldtotalNum = 0,_newtotalNum=0;
      for(let i=0;i<this.userListData.length;i++){
        if(this.userListData[i].oldNeedDistributeCount === '' || this.userListData[i].newNeedDistributeCount === ''){
          this.$message.error('jumlah seluruh alokasi permohonan harus diisi');
          return;
        }else{
          this.userListData[i].orderCount = this.userListData[i].oldNeedDistributeCount;
          this.userListData[i].newOrderCount = this.userListData[i].newNeedDistributeCount;
          _oldtotalNum += parseInt(this.userListData[i].oldNeedDistributeCount);
          _newtotalNum += parseInt(this.userListData[i].newNeedDistributeCount);
        }
      }
      if(_oldtotalNum > this.oldNeedDistributeCount || _newtotalNum > this.newNeedDistributeCount){
        this.$message.error('Sisa jumlah tunggu alokasi permohonan tidak cukup, silakan ulangi proses alokasi');
        return;
      }

      let _data = {
        section: this.itemValue,
        staff:this.userListData
      };
      this.confirmLoading = true;
      this.$http.post('manage/overDueOrderAutoDistributeByNum',_data).then(response =>{
        this.confirmLoading = false;
        let {body} = response;
        if(body.code == 1){
          this.editFormDigVisible = false;
          this.$alert('Alokasi selesai, tersisa permohonan yg belum dialokasi：Akun lama'+body.data.oldNeedDistributeCount+'permohonan，jumlah akun baru'+body.data.newNeedDistributeCount+'permohonan', 'Alokasi sukses', {
            confirmButtonText: 'YAKIN',
            callback: action => {
              this.$message({
                type: 'success',
                message:'Alokasi sukses'
              });
            }
          });
          this.bindGrid();
        }else{
          this.$message.error(body.message);
        }
      },response =>{this.confirmLoading = false;});
    },
     setTestFormSubmit(){                   //设置测试订单
      let _data = Object.assign({},this.setTestForm);
      this.setTestconfirmLoading = true;

      this.$http.post('manage/orders/review-assignment',_data).then(response=>{
        this.setTestconfirmLoading = false;
        let {body} = response;
        if(body.code == 1){
          this.$message({
            type: 'success',
            message: 'Alokasi sukses'
          });
          this.setTestFormDigVisible = false;
          this.bindGrid();
        }else{
          this.$message.error(body.message);
        }
      },response=>{this.setTestconfirmLoading = false;});
    },
      testAssginDistribute(row) {                    //自动测试订单分配
        this.testAssignFormDigVisible = true;
        this.testAssignGridLoading = true;
        this.$http.post('manage/findTestOrderD1t7AssignCount',{}).then(response => {
          this.testAssignGridLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.userAssignList = [];
            this.assignSum = body.data.orderD1t7Assign.assignSum;
            this.unAssignSum = body.data.orderD1t7Assign.unAssignSum;

            this.userAssignList = body.data.userAssignList;
          }else{
            this.$message.error(body.message);
          }
        },response =>{});
      },
      testAssignFormSubmit() {
        let _newtotalNum=0;
        for(let i=0;i<this.userAssignList.length;i++){
          if(this.userAssignList[i].unAssignCount === ''){
            this.$message.error('jumlah seluruh alokasi permohonan harus diisi');
            return;
          }else{
            _newtotalNum += parseInt(this.userAssignList[i].unAssignCount);
          }
        }
        if(_newtotalNum > this.unAssignSum){
          this.$message.error('Sisa jumlah tunggu alokasi permohonan tidak cukup, silakan ulangi proses alokasi');
          return;
        }

        let _data = {
          userAssignList:this.userAssignList
        };
        this.testAssignconfirmLoading = true;
        this.$http.post('manage/orders/review-assignment',_data).then(response =>{
          this.testAssignconfirmLoading = false;
          let {body} = response;
          if(body.code == 1){
            this.testAssignFormDigVisible = false;
            this.$message({
              type: 'success',
              message: 'Alokasi sukses'
            });
            this.bindGrid();
          }else{
            this.$message.error(body.message);
          }
        },response =>{this.testAssignconfirmLoading = false;});
      },
    },
    mounted() {
      this.getCollecttionPerson();
      this.getCollectionList();
      this.getCollectionListone();
      this.bindGrid();
    }
  }
  </script>
  <style>
  .wirft {
    width: 200px;
    display: inline-block;
    color: #ccc;
  }
  </style>
