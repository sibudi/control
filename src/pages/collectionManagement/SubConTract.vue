<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
      <el-row>
        <el-form-item label="订单编号">
          <el-input v-model="searchForm.uuid"></el-input>
        </el-form-item>
        <el-form-item label="订单标签" prop="status">
          <el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
            <el-option v-for="item in orderTagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="催收人员" prop="subOutSourceId">
          <el-select v-model="searchForm.subOutSourceId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="是否分期">
         <el-select v-model="searchForm.isTerms" placeholder="请选择" clearable>
          <el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="是否被分配" prop="" label-width="90">
          <el-select v-model="searchForm.isAssigned" placeholder="请选择" clearable>
            <el-option  label="是" key="" value="1"></el-option>
            <el-option  label="否" key="" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="复借订单">
          <el-select v-model="searchForm.isRepeatBorrowing" placeholder="请选择" clearable>
            <el-option v-for="item in isAgainOrder" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="search" type="info" style="width: 170px">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="订单编号" prop="uuid"  width="180">
        </el-table-column>
        <el-table-column label="姓名" prop="realName"  width="80">
        </el-table-column>
    <!--     <el-table-column label="手机号" prop="mobileNumber"  width="130">
    </el-table-column> -->
    <el-table-column label="复借订单" prop="isRepeatBorrowing">
      <template scope="scope">
        <el-tag :type="scope.row.isRepeatBorrowing==1? 'success' : 'danger'" close-transition>{{scope.row.isRepeatBorrowing==1?'是':'否'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="是否分期" prop="isTerm" width="120">
     <template scope="scope">
      <el-tag :type="scope.row. isTerm==1? 'success' : 'danger'" close-transition>{{scope.row. isTerm==1?'是':'否'}}</el-tag>
    </template>
  </el-table-column>
  <el-table-column label="当前还款期限" prop="needPayTerm" width="120" >
  </el-table-column>
    <el-table-column label="申请金额" prop="amountApply">
    </el-table-column>
    <el-table-column label="申请期限" prop="borrowingTerm">
    </el-table-column>
    <el-table-column label="订单标签" prop="orderTag" min-width="116">
      <template scope="scope">
        <span>{{getOrderTag(scope.row.orderTag)}}</span>
      </template>
    </el-table-column>
    <el-table-column label="承诺还款时间" prop="promiseRepaymentTime" width="200" sortable>
      <template scope="scope">
        {{getdate(scope.row.promiseRepaymentTime)}}
      </template>
    </el-table-column>
    <el-table-column label="催收人员" prop="collectorName" width="150">
     <!--  <template scope="scope">
        <span>{{getThirdCompany(scope.row.outsourceId)}}</span>
      </template> -->
    </el-table-column>
    <el-table-column label="逾期天数" prop="overdueDays" min-width="116" sortable>
    </el-table-column>
    <el-table-column inline-template label="操作" width="100">
      <div>
        <el-button size="small" @click="rowClick(row)">详情</el-button>
      </div>
    </el-table-column>
  </el-table>
</template>
<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<el-form :inline="true" :model="distributeForm" class="toolbar" label-position="right" label-width="70px">
  <el-form-item label="催收人员" prop="status">
    <el-select v-model="distributeForm.thirdCompanyTag" placeholder="请选择" filterable clearable>
      <el-option v-for="item in thirdCompanyListone" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="distribute" type="info" :loading="distributeLoading">分配</el-button>
  </el-form-item>
  <el-form-item>
    <el-button @click="autoDistribute" type="info" :loading="autoDistributeLoading">自动分配</el-button>
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
  <div style="margin:0 0 15px;">已分配 <el-tag type="success">{{distributeCount}}</el-tag> 单，其中老户 <el-tag type="success">{{oldDistributeCount}}</el-tag> 单，新户 <el-tag type="success">{{newDistributeCount}}</el-tag> 单</div>
  <div style="margin:0 0 15px;">待分配 <el-tag type="danger">{{needDistributeCount}}</el-tag> 单，其中老户 <el-tag type="danger">{{oldNeedDistributeCount}}</el-tag> 单，新户 <el-tag type="danger">{{newNeedDistributeCount}}</el-tag> 单</div>
  <el-table :data="userListData" highlight-current-row v-loading="editGridLoading" class="grid" max-height="360">
    <el-table-column label="催收人员" prop="realName" >
    </el-table-column>
    <el-table-column label="已分配老户订单数" prop="assignedReBorrowingCountN">
    </el-table-column>
    <el-table-column label="已分配新户订单数" prop="assignedReBorrowingCount0">
    </el-table-column>
    <el-table-column label="新增分配老户订单数" prop="unAssignedReBorrowingCountN" >
      <template scope="scope">
        <el-input v-model="scope.row.unAssignedReBorrowingCountN"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="新增分配新户订单数" prop="unAssignedReBorrowingCount0" >
      <template scope="scope">
        <el-input v-model="scope.row.unAssignedReBorrowingCount0"></el-input>
      </template>
    </el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
    <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
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
      },
      amountApply:[],

      orderTagList : [{
        code: '1',
        name: '完全失联'
      },{
        code: '2',
        name: '暂时失联'
      },{
        code: '3',
        name: '可联跳票'
      },{
        code: '4',
        name: '可联承诺'
      }],
      thirdCompanyList: [],
      thirdCompanyListone:[],
      allpersonList:[],
      gridData: [],
      gridLoading: false,
      pageIndex: 1,
      pageSize: 20,
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
      window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
    },
    rowClick(row){
      window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.userUuid+
        '&uuid='+row.uuid);
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
        outsourceId:DataUtil.id(),
      }, this.searchForm);
      this.$http.post('manage/collection/orders/assignable-overdue-list-outSource', _data).then(response => {
        if (1 == response.body.code && response.body.data) {
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
        this.$message.error("请选择催收人员");
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
        this.$message.error("请选择催收订单");
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
      this.commonForm.title = '订单分配（'+this.dialogTitle+'）';
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
          this.$message.error('所有分配订单数不能为空');
          return;
        }else{
          // this.userListData[i].orderCount = this.userListData[i].unAssignedReBorrowingCountN;
          // this.userListData[i].newOrderCount = this.userListData[i].unAssignedReBorrowingCount0;
          _oldtotalNum += parseInt(this.userListData[i].unAssignedReBorrowingCountN);
          _newtotalNum += parseInt(this.userListData[i].unAssignedReBorrowingCount0);
        }
      }
      if(_oldtotalNum > this.oldNeedDistributeCount || _newtotalNum > this.newNeedDistributeCount){
        this.$message.error('剩余待分配订单数不足，请重新分配');
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
          this.$alert('分单完成，剩余未分配订单：老户'+body.data.oldNeedDistributeCount+'单，新户'+body.data.newNeedDistributeCount+'单', '分单成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'success',
                message:'分单成功'
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
