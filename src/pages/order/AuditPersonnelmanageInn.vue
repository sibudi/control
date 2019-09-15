<template>
	<section>
		<el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" border>
			<el-table-column label="Posisi" prop="postName"></el-table-column>
			<el-table-column label="Petugas yang bertugas" prop="realname">
				<template scope="scope">
					<el-tag v-for="item in (scope.row.reviewers)" :key="item.id" type="primary" style="margin-right:2px;">{{ item.realname}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="Opsi">
				<template scope="scope">
					<el-button size="small" type="success" @click="edit(scope.row)">Ubah</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="commonForm.title" v-model="editFormDigVisible" :close-on-click-modal="false">
			<el-form :model="editForm" ref="editForm" :rules="editFormRules">
				<el-form-item prop="id">
					<el-checkbox-group v-model="editForm.id">
						<el-checkbox v-for="item in personList" :key="item.id" :label="item.id">{{item.realname}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="" @click="editFormDigVisible = false"> BATAL</el-button>
				<el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">YAKIN</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
	data() {
		return {
			gridData: [],
			personList: [],
			gridLoading: false,
			postName:[],
			postEnglishName:'',
			editFormDigVisible: false,
			confirmLoading: false,
			commonForm: {
				title: '',
			},
			editForm: {
				id: []
			},
			postId: '',
			reviewers: [],
			editFormRules: { 
				id: [{
					type: 'array',
					required: true,
					message: 'Paling tidak pilih 1 petugas',
					trigger: 'change'
				}]
			}
		}
	},
	methods: {
		getOurCollectionPerson(url) {
			console.log(url);
			this.$http.post('manage/all-post-reviewers',{postName:url}).then(response => {
				let {body} = response;
				if(body.code == 1){
					this.personList = body.data;
				}else{
					this.personList = [];
				}
			},response =>{});
		},
		edit(row) {
			this.getOurCollectionPerson(row.postEnglishName);
			this.editForm.id = [];
			this.editFormDigVisible = true;
			this.commonForm.title = '编辑人员（'+row.postName+'）';
			row.reviewers.forEach(e =>{
				this.editForm.id.push(e.id);

			});
			this.postEnglishName = row.postEnglishName;
			console.log(row)

		},
		bindGrid() {
			this.gridLoading = true;
			this.$http.get('manage/reviewers',{}).then(response => {
				this.gridLoading = false;
				let {body} = response;
				if(body.code ==1){
					this.gridData = body.data;
				}else{
					this.$message.error(body.message);
				}
			},response =>{this.gridLoading = false});
		},
		editFormSubmit() {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.reviewers = [];
					this.editForm.id.forEach(e => {
						for(let i=0;i<this.personList.length;i++){
							if(e == this.personList[i].id){
								this.reviewers.push(this.personList[i].id);
							}
						}
					});
					let _data = {
						postEnglishName: this.postEnglishName,
						reviewerIds: this.reviewers
					};
					this.confirmLoading = true;
					this.$http.post('manage/reviewers/scheduler',_data).then(response => {
						this.confirmLoading = false;
						let {body} = response;
						if(body.code == 1){
							this.editFormDigVisible = false;
							this.bindGrid();
							this.$message({message: ' Berhasil merubah',type: 'success'});
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
		// this.getOurCollectionPerson();
	}
}
</script>
<style></style>