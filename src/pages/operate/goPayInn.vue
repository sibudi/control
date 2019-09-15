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
import mlOrderList from '../../components/gopaylistInn.vue';
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data() {
    return {
      tabList: [{id:4,"dicItemName":"Menunggu pencairan dana"},{id:3,"dicItemName":"Transaksi berhasil"},{id:5,"dicItemName":"Transaksi gagal"}],
      activeName:'Menunggu pencairan dana',
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
