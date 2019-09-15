<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="账户类型">
       <el-select v-model="searchForm.channel" placeholder="请选择" clearable @change="isflager">
        <el-option v-for="item in zhleixing" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="账号" v-if="flager">
       <el-select v-model="searchForm.account" placeholder="请选择" clearable>
        <el-option v-for="item in zhanghao" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="search" type="info">查询</el-button>
    </el-form-item>
    <el-form-item label="余额">
        <el-input v-model="balance" placeholder=""></el-input>
      </el-form-item>
  </el-form>
</section>
</template>
<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data () {
    return {
      searchForm:{
        account:'',
        channel: '',
      },
      gridData:[],
      zhleixing:[{
        code:'BCA',
        name:'BCA',
      },{
        code:'XENDIT',
        name:'Xendit'
      }],
      flager:true,
      zhanghao:[{
        code:'2063044555',
        name:'2063044555',
      },{
        code:'2063490555',
        name:'2063490555'
      }],
      balance:'',
      dataTotal: 20,
    }
  },
  methods: {
    isflager(){
       if (this.searchForm.channel == 'XENDIT') {
        this.flager = false;
       }else{
        this.flager = true;
       }
    },
   search() {
    this.bindGrid()
  },
  rowClick(row){
   window.open('#/dataStatisDetails?seen=true&batchNo='+row.batchNo);
 },
 pageSizeChange(val) {
  this.pageSize = val;
  this.pageIndex = 1;
  this.bindGrid()
},
pageIndexChange(val) {
  this.pageIndex = val;
  this.$store.dispatch('getUserListIndex',val);
  this.bindGrid();
},
bindGrid() {
        let _data = Object.assign(this.searchForm);
        this.$http.post('manage/checkAccountBalance', _data).then(response => {
          let {body} = response;
          if (1 == body.code) {
            // this.gridLoading = false;
            this.balance = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) =>{
          // this.gridLoading = false;
        })
      }
    },
    mounted: function () {
      // this.bindGrid();
  // this.getQudaoList();
}
}
</script>
