<template>
  <section>
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabChange">
      <el-tab-pane v-for="item in tabList" :label="item.dicItemName" :key="item.dicItemName" :name="item.dicItemName">
        <ml-order-list :dialog-title="item.dicItemName" :post-id="item.id" :item-value="item.dicItemValue" :ref="item.dicItemName"></ml-order-list>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
import mlOrderList from '../../components/gopaylist.vue';
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data() {
    return {
      tabList: [{id:4,"dicItemName":"待打款"},{id:3,"dicItemName":"已转账"},{id:5,"dicItemName":"转账失败"}],
      activeName:'待打款',
      sessionId:'',
      userUuid: "",
      uuid: "",
    }
  },
  methods: {
    // getTabList() {
    //   let _data={
    //     "type":3,
    //     "sessionId": this.sessionId,
    //   }
    //   this.$http.post('manage/activity/withdrawList ',_data).then(response => {
    //     let {body} = response;
    //     if(body.code == 1){
    //       this.activeName = body.data[1].dicItemName;
    //       this.tabList = body.data.data;
    //     }else{
    //       this.$message.error(body.message);
    //     }
    //   },response =>{});
    // },
    tabChange(e) {
      this.$refs[e.name][0].bindGrid();
    }
  },
  components: {
    mlOrderList
  },
  mounted() {
    this.sessionId=DataUtil.sid();
  }
}
</script>
<style></style>
