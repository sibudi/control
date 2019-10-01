<!-- 分配人员管理 -->
<template>
	<section>
		<el-row>
			<el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" border>
				<el-table-column label="tahap" prop="postName"></el-table-column>
				<el-table-column label="Petugas pemeriksa" prop="realname">
					<template scope="scope">
						<el-tag v-for="item in (scope.row.staff)" :key="item.code" type="primary" style="margin-right:2px;">{{ item.name}}</el-tag>
					</template>
				</el-table-column>
     <!--  <el-table-column label="休息人员" prop="realname">
        <template scope="scope">
          <el-tag v-for="item in (scope.row.restTaff)" :key="item.code" type="primary" style="margin-right:2px;">{{ item.name}}</el-tag>
        </template>
    </el-table-column> -->
    <el-table-column label="Operasi">
    	<template scope="scope">
    		<el-button size="small" type="primary" @click="edit(scope.row, 1)">Edit</el-button>
    		<!--  <el-button size="small" type="success" @click="edit(scope.row, 2)">编辑休息人员</el-button> -->
    	</template>
    </el-table-column>
</el-table>
</el-row>
<div class="divid-line"></div>

<el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
	<el-form :model="editForm" ref="editForm" :rules="editFormRules">
		<el-form-item prop="code">
			<el-checkbox-group v-model="editForm.code">
				<el-checkbox v-for="item in personList" :key="item.code" :label="item.code">{{item.name}}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button type="" @click="editFormDigVisible = false">BATAL</el-button>
		<el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">Kirim</el-button>
	</div>
</el-dialog>
<el-row>
	<el-form :model="qualityForm" ref="qualityForm" label-width="100px">
		<el-form-item label="Petugas penagihan" prop="outsourceId">
			<el-select v-model="qualityForm.outsourceId" placeholder="Silahkan pilih" filterable clearable>
				<el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Petugas pemeriksa" prop="checkerId">
			<el-select v-model="qualityForm.checkerId" placeholder="Silahkan pilih" filterable clearable>
				<el-option v-for="item in thirdCompanyListone" :label="item.name" :key="item.code" :value="item.code"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="Waktu terakhir pemeriksaan">
			<div class="block">
				<el-date-picker v-model="qualityForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Silahkan pilih">
				</el-date-picker> ~
				<el-date-picker v-model="qualityForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Silahkan pilih">
				</el-date-picker>
			</div>
		</el-form-item>
		<el-form-item>
			<el-button @click="search" type="info" :loading = "reprotLoading">Kirim</el-button>
		</el-form-item>
	</el-form>
</el-row>

</section>
</template>
<script>
import enums from '../../common/Enum'
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
			qualityForm:{
				outsourceId:'',
				checkerId:'',
				startTime:'',
				endTime:''
			},
			thirdCompanyList: [],
			thirdCompanyListone:[],
			gridData: [],
			personList: [],
			personListTemp: [],
			gridLoading: false,
			editFormDigVisible: false,
			confirmLoading: false,
			reprotLoading: false,
			reprotLoading: false,

			restOrNot: 0,
			commonForm: {
				title: '',
			},
			editForm: {
				code: []
			},
			postId: '',
			staff: [],
			pickerOptions1: {
				disabledDate(time) {
					return compareDate(time, "qualityForm", "endTime", "s")
				}
			},
			pickerOptions2: {
				disabledDate(time) {
					return compareDate(time, "qualityForm", "startTime", "e")
				}
			},
			editFormRules: {
				code: [{
					type: 'array',
					required: true,
					message: 'Paling tidak pilih 1 petugas',
					trigger: 'change'
				}]
			}
		}
	},
	methods: {
		getOurCollectionPerson() {
			this.$http.post('manage/collection/collectors',{isThird:1,sourceType:1}).then(response => {
				let {body} = response;
				if(body.code == 1){
					this.personList = body.data;
					this.personListTemp = body.data;
				}else{
					this.personList = [];
				}
			},response =>{});
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
		getCollectionListone() {
			this.$http.post('manage/collection/collectors',{isThird:1,postId:this.postId,sourceType:1}).then(response => {
				let {body} = response;
				if(body.code == 1){
					this.thirdCompanyListone = body.data;
				}else{
					this.thirdCompanyListone = [];
				}
			},response => {});
		},
		search(){
			this.tijiaoqua();
		},
		tijiaoqua() {
			this.reprotLoading = true;
			this.reprotLoading = true;
			let _data = Object.assign(this.qualityForm,{
				startTime:DataUtil.formatTime(this.qualityForm.startTime)||'',
				endTime:DataUtil.formatTime(this.qualityForm.endTime)||'',
			});

			this.$http.post('manage/qualityCheck/getCheckReport',_data).then(response => {
				this.reprotLoading = false;

				this.reprotLoading = false;
				let {body} = response;
				if(body.code == 1 && body.data){
					window.open('manage/getExcelFile?path=/' + 'manage/getExcelFile?path=' + body.data);
					this.bindGrid();
					window.location.reload();
				}else{
					this.thirdCompanyListone = [];
					this.bindGrid();
					window.location.reload();
					
				}
			},response => {});
		},
		edit(row, index) {
			this.editForm.code = [];
			this.editFormDigVisible = true;
			this.commonForm.title = 'Petugas yg merubah（'+row.postName+'）';
			if (index == 2) {
				this.personList = row.staff;
				row.restTaff.forEach(e => {
					this.personList.push(e);
				});
				this.restOrNot = 1;
			} else {
				this.personList = this.personListTemp;
				row.staff.forEach(e =>{
					this.editForm.code.push(e.code);
				});
				this.restOrNot = 0;
			}
			row.restTaff.forEach(e =>{
				this.editForm.code.push(e.code);
			});
			this.postId = row.postId;
		},
		bindGrid() {
			if(this.qualityForm.startTime == '' && this.qualityForm.endTime == ''){
				this.qualityForm.endTime =new Date();
				let entime =new Date().getTime()-7*1000*(24*60*60);
				this.qualityForm.startTime = new Date(entime);
			}
			this.gridLoading = true;
			this.$http.post('manage/collection/post-rest-collectors',{sourceType:1}).then(response => {
				this.gridLoading = false;
				let {body} = response;
				if(body.code ==1){
					this.gridData = body.data;
//					this.$http.post('manage/collection/post-rest-collectors',{}).then(response => {
//            if (response.body.code == 1) {
//                let result = body.data;
//                if (result.length == this.gridData.length) {
//                  for (let index = 0 ;index < this.gridData.length; index ++) {
//                      let restStaff = {"restStaff" : result[index].staff};
////                      debugger;
//                    this.gridData[index] = Object.assign(this.gridData[index], restStaff);
//                  }
//                }
//            }
//
//          })
}else{
	this.$message.error(body.message);
}
},response =>{this.gridLoading = false});
		},
		editFormSubmit() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.staff = [];
					this.editForm.code.forEach(e => {
						for(let i=0;i<this.personList.length;i++){
							if(e == this.personList[i].code){
								this.staff.push(this.personList[i]);
							}
						}
					});
					let _data = {
						postId: this.postId,
						staff: this.staff,
						sourceType:1,
						rest: this.restOrNot,
					};
					this.confirmLoading = true;
					this.$http.post('manage/collection/collector-scheduling',_data).then(response => {
						this.confirmLoading = false;
						let {body} = response;
						if(body.code == 1){
							this.editFormDigVisible = false;
							this.bindGrid();
							this.$message({message: 'Berhasil merubah',type: 'success'});
						}else{
							this.$message.error(body.message);
						}
					},response =>{
						this.confirmLoading = false;
					});
				} else {}
			});
		},
	},
	mounted() {
		this.bindGrid();
		this.getOurCollectionPerson();
		this.getCollectionList();
		this.getCollectionListone();
	}
}
</script>
<style>
.divid-line{
	height: 10px;
}
</style>
