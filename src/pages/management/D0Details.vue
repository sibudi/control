/**
* Created by xiaowei on 17-5-11.
*/
<template>
	<section>
		<!-- 工具条 -->
		<el-form :inline="true" :model="searchForm" class="toolbar" label-position="right" label-width="70px">
			<el-row>
				<el-form-item label="订单编号">
					<el-input v-model="searchForm.uuid" width="200"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="searchForm.realName"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="searchForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="订单状态">
					<el-select v-model="searchForm.status" placeholder="请选择" clearable>
						<el-option v-for="item in ztList" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否分期">
					<el-select v-model="searchForm.isTerms" placeholder="请选择" clearable>
						<el-option v-for="item in termsList" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="复借订单">
					<el-select v-model="searchForm.isRepeatBorrowing" placeholder="请选择" clearable>
						<el-option v-for="item in fjzhuangtai" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="借款身份">
					<el-select v-model="searchForm.userRole" placeholder="请选择" clearable>
						<el-option v-for="item in jkzhuangtai" :label="item.name" :key="item.value" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请期限">
					<el-select v-model="searchForm.borrowingTerm" placeholder="请选择" clearable>
						<el-option v-for="item in qixianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请日期">
					<div class="block">
						<el-date-picker v-model="searchForm.createBeginTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
						</el-date-picker> ~
						<el-date-picker v-model="searchForm.createEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
						</el-date-picker>
					</div>
				</el-form-item>
				<el-form-item label="订单渠道">
					<el-select v-model="searchForm.channel" placeholder="请选择" clearable>
						<el-option v-for="item in ddqudaolist" :label="item.dicItemName" :key="item.dicItemValue" :value="item.dicItemValue.split('#')[0]"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单标签">
					<el-select v-model="searchForm.orderTag" placeholder="请选择" clearable>
						<el-option v-for="item in bqxianlist" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="催收人员" prop="outsourceId">
					<el-select v-model="searchForm.outsourceId" placeholder="请选择" filterable clearable>
						<el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search" type="info" style="width: 100px">查询</el-button>
					<!-- <el-button @click="exportExl" type="success" style="width:100px">导出</el-button> -->
				</el-form-item>
			</el-row>
		</el-form>

		<!--列表-->
		<template>
			<el-table :data="gridData" highlight-current-row @row-click="rowClick" v-loading="gridLoading" class="grid">
				<el-table-column label="订单编号" prop="uuid" width="220">
				</el-table-column>
				<el-table-column label="姓名" prop="realName" width="220" >
				</el-table-column>
				<el-table-column label="借款身份" prop="userRole" width="120" sortable>
					<template scope="scope">
						{{getChannelNameOne(scope.row.userRole)}}
					</template>
				</el-table-column>
				<el-table-column label="复借订单" prop="isRepeatBorrowing" width="120">
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
				<el-table-column label="订单状态" prop="status" width="120">
					<template scope="scope">
						<span>{{getOrderType(scope.row.status)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="申请金额" prop="amountApply" width="120" sortable>
				</el-table-column>
				<el-table-column label="申请期限" prop="borrowingTerm" width="120" sortable>
				</el-table-column>
				<el-table-column label="申请时间" prop="applyTime" width="240" sortable>
					<template scope="scope">
						{{getdate(scope.row.applyTime)}}
					</template>
				</el-table-column>
				<el-table-column label="订单渠道" prop="channel" width="120" sortable>
					<template scope="scope">
						{{getChannelName(scope.row.channel)}}
					</template>
				</el-table-column>
				<el-table-column  label="催收联系情况" prop="collectionContactResult"  width="400">
					<template scope="scope">
						<span v-if="scope.row.collectionContactResult != null">
							<img :src="scope.row.collectionContactResult[0]==1?oneimgurl:oneimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[1]==1?eigimgurl:eigimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[2]==1?twoimgurl:twoimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[3]==1?threeimgurl:threeimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[4]==1?fourimgurl:fourimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[5]==1?fiveimgurl:fiveimgurler" width="30px">
							<img :src="scope.row.collectionContactResult[6]==1?siximgurl:siximgurler" width="30px">
							<img :src="scope.row.collectionContactResult[7]==1?sevimgurl:sevimgurler" width="30px">
						</span>

						<span v-if="scope.row.collectionContactResult == null">
							<img :src="oneimgurler" width="30px">
							<img :src="eigimgurler" width="30px">
							<img :src="twoimgurler" width="30px">
							<img :src="threeimgurler" width="30px">
							<img :src="fourimgurler" width="30px">
							<img :src="fiveimgurler" width="30px">
							<img :src="siximgurler" width="30px">
							<img :src="sevimgurler" width="30px">
						</span>

					</template>
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
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'

export default {
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
			searchForm:{
				realName:'',
				userName:'',
				startTime:'',
				isRepeatBorrowing:'',
				status:'',
				endTime:'',
				isTerms:'',
				orderNo:'',
				type:'',
				payChannelType:'',
				mobile:'',
				userRole:'',
				createBeginTime:'',
				createEndTime:'',
				channel:'',
				orderTag:'',
				uuid:'',

			},
			termsList : [ {
				code:'1',
				name:'是'
			},{
				code:'2',
				name:'否'
			}],
			oneimgurl: require("../../assets/br.png"),
			oneimgurler: require("../../assets/br1.png"),
			eigimgurl: require("../../assets/WA.png"),
			eigimgurler: require("../../assets/WAone.png"),
			twoimgurl: require("../../assets/lxr.png"),
			twoimgurler: require("../../assets/lxr1.png"),
			threeimgurl: require("../../assets/peo.png"),
			threeimgurler: require("../../assets/peo1.png"),
			fourimgurl: require("../../assets/tit.png"),
			fourimgurler: require("../../assets/tit1.png"),
			fiveimgurl: require("../../assets/cen.png"),
			fiveimgurler: require("../../assets/cen1.png"),
			siximgurl: require("../../assets/txl.png"),
			siximgurler: require("../../assets/txl1.png"),
			sevimgurl: require("../../assets/thj.png"),
			sevimgurler: require("../../assets/thj1.png"),
			thirdCompanyList: [],
			jkzhuangtai:[{
				code:'WORKING_STAFF',
				name:'已工作',
				value:'2'
			},{
				code:'Student',
				name:'在校大学生',
				value:'1'
			},{
				code:'House_Wife',
				name:'家庭主妇',
				value:'3'
			}],
			qixianlist : [{
				code: '7',
				name: '7天'
			},{
				code: '10',
				name: '10天'
			}, {
				code: '14',
				name: '14天'
			}],
			orderStatus : [{
				code: '0',
				name: '充值'
			}, {
				code: '1',
				name: '放款'
			}, {
				code: '2',
				name: '还款'
			}],
			bqxianlist : [{
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
			fjzhuangtai:[{
				code:'0',
				name:'否',
			},{
				code:'1',
				name:'是'
			}],
			ztList : [{
				code: 'RESOLVING_NOT_OVERDUE',
				name: '待还款（未逾期）',
				value:'7'
			}, {
				code: 'RESOLVED_NOT_OVERDUE',
				name: '正常已还款',
				value:'10'
			}],
			ddqudaolist : JSON.parse(localStorage.getItem('orderChannel')),
			qixianlist : [{
				code: '7',
				name: '7天'
			}, {
				code: '14',
				name: '14天'
			}],
			pickerOptions1:{
				disabledDate(time) {
					return compareDate(time, "searchForm", "endTime", "s")
				}
			},
			pickerOptions2: {
				disabledDate(time) {
					return compareDate(time, "searchForm", "startTime", "e")
				}
			},
			gridLoading: false,

			gridData: [],
			pageIndex: 1,
			pageSize: 10,
			dataTotal: 0
		}
	},

	methods:{
		pageSizeChange(val) {
			this.pageSize = val;
			this.pageIndex = 1;
			this.bindGrid()
		},
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
    getOrderType(val){
    	let re = '';
    	this.ztList.forEach(function (obj) {
    		if(obj.value == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
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
    getOrderTypeone(val){
    	let re = '';
    	this.ztList.forEach(function (obj) {
    		if(obj.code == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
    },
    getPayChannelType(val){
    	let re = '';
    	this.zhifuStatus.forEach(function (obj) {
    		if(obj.code == val){
    			re = obj.name;
    			return;
    		}
    	});
    	return re;
    },
    pageIndexChange(val) {
    	this.pageIndex = val;
    	this.bindGrid();
    },
    search() {
    	this.pageIndex = 1;
    	this.bindGrid()
    },

    rowClick(row){
    	window.open('#/OrderDetails?seen=true&userUuid='+row.userUuid+
    		'&uuid='+row.uuid);
    },
    // check(row){
    // 	window.open('#/CollectionOrderDetails?&uuid='+row.uuid);
    // },
    // rowClick(row){
    // 	window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.uuid+
    // 		'&uuid='+row.orderNo);
    // },
    bindGrid() {
    	this.gridLoading = true;

    	let _data = Object.assign({
    		pageNo:this.pageIndex,
    		pageSize:this.pageSize
    	}, this.searchForm);

    	this.$http.post('manage/orders/D0-list', _data).then(response => {

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
    }
},

mounted:function(){
	this.bindGrid();
	this.getCollectionList();
}



}

</script>
