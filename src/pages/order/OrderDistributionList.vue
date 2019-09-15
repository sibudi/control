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
import mlOrderList from '../../components/OrderList.vue';
export default {
	data() {
		return {
			tabList: [],
			activeName:''
		}
	},
	methods: {
		getTabList() {

			this.activeName = '初审列表';
			this.tabList.push({"id": 'JUNIOR_REVIEWER',"createTime": 1501506137000,"dicId": 11,"dicItemName": "初审列表","dicItemValue": "FIRST_CHECK",
				"disabled": 0,
				"remark": "",
				"updateTime": 1501506137000,
				"uuid": "0A36BFC18E7F4DEEACAA006CC8A089E6",
			});
			this.tabList.push({"id": 'SENIOR_REVIEWER',"createTime": 1501506137000,"dicId": 11,"dicItemName": "复审列表","dicItemValue": "SECOND_CHECK",
				"disabled": 0,
				"remark": "",
				"updateTime": 1501506137000,
				"uuid": "0A36BFC18E7F4DEEACAA006CC8A089E6"});
			// this.$http.post('manage/dicItemListByDicCode',{dicCode:'COLLECTION_POST'}).then(response => {
			// 	let {body} = response;
			// 	if(body.code == 1){
			// 		this.activeName = body.data[1].dicItemName;
			// 		this.tabList = body.data;
			// 	}else{
			// 		this.$message.error(body.message);
			// 	}
			// },response =>{});
		},
		tabChange(e) {
			this.$refs[e.name][0].bindGrid();
			this.$refs[e.name][1].bindGridone();
		}
	},
	components: {
		mlOrderList
	},
	mounted() {
		this.getTabList();
	}
}
</script>
<style></style>