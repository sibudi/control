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
import mlOrderList from '../../components/wauser.vue';
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data() {
    return {
      tabList: [{id:'A',"dicItemName":"A.可以正常还款"},{id:'B',"dicItemName":"B.还款支付正常"},{id:'C',"dicItemName":"C.暂时无法支付"},{id:'D',"dicItemName":"D.没有足够现金"},{id:'-',"dicItemName":"其他回复"}],
      activeName:'A.可以正常还款',
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
