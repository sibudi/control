<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="success">Tambahkan kupon</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column label="Nama Kupon (Bahasa Cina）">
          <template scope="scope">
            <el-tooltip effect="dark" placement="bottom-start">
              <div slot="content">
                <p style='min-width:130px;'>{{scope.row.alias
                }}</p>
              </div>
              <span>{{scope.row.alias
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Nama Kupon (Bahasa Indonesia）">
          <template scope="scope">
            <el-tooltip effect="dark" placement="bottom-start">
              <div slot="content">
                <p style='min-width:130px;'>{{scope.row.indonisaName
                }}</p>
              </div>
              <span>{{scope.row.indonisaName
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.status==1 ? 'danger' : 'primary'" close-transition>{{scope.row.status==1?'non aktifkan':'Aktifkan'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operasi" width="300">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row,1)">Edit</el-button>
            <el-button size="small" @click="edit(scope.row,2)">Hapus</el-button>
            <el-button size="small" @click="handleSend(scope.$index,scope.row)">Kupon tersedia</el-button>
          </template>
        </el-table-column>
        <div class="higer"></div>
      </el-table>
      <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
  </template>
  <!--添加-->
  <el-dialog title="tambah" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
    <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
      <el-form-item label="Nomor Kupon" prop="couponCode">
        <el-input type="textarea" disabled :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.couponCode" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Nama Kupon (Bahasa Cina）" prop="alias">
        <el-input type="textarea"  :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.alias" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Nama Kupon (Bahasa Indonesia）" prop="indonisaName">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.indonisaName" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Status" prop="status">
        <el-switch v-model="addForm.status" on-text="ON" off-text="OFF"></el-switch>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">Batalkan</el-button>
      <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
    </div>
  </el-dialog>
  <!--修改-->
  <el-dialog title="ubah template" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
    <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" v-loading="editFormInit" ref="editForm">
      <el-form-item label="Nomor Kupon"  prop="couponCode">
        <el-input type="textarea" disabled  :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.couponCode" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Nama Kupon (Bahasa Cina）" prop="alias">
        <el-input type="textarea"  :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.alias" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Nama Kupon (Bahasa Indonesia）" prop="indonisaName">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.indonisaName" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="Status" prop="status">
        <el-switch v-model="addForm.status" on-text="ON" off-text="Off"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">Batalkan</el-button>
      <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">Kirim</el-button>
    </div>
  </el-dialog>
  <!-- 以下为现金券模板手动发放页面 -->
  <el-dialog style='width:100%; margin:auto;' size='large' :visible.sync="dialogFirstHandle">
    <div id="dialogFirstHandleTitle">Pemberian manual</div>
    <!-- <el-button type="primary" @click="">Pemberian otomatis 自动发放</el-button>
      <el-button type="primary" @click="">短信模板设置</el-button> -->
      <el-table
      border
      :data="handleSendTableData"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      v-loading="handleSendLoading">
      <el-table-column
      prop="userName"
      label="Nama">
    </el-table-column>
    <el-table-column
    prop="orderNo"
    label="Nomor Order">
  </el-table-column>
  <el-table-column
  prop="couponCode"
  label="Nomor Kupon">
</el-table-column>
<el-table-column
prop="money"
label="Jumlah">
</el-table-column>
<el-table-column
prop="validityEndTime"
label="Tanggal Penggunaan">
<template scope="scope">
  {{scope.row.validityStartTime}}~{{scope.row.validityEndTime}}
</template>
</el-table-column>         
<!-- <el-table-column 
class='mobileMess' 
prop="mobileMess"
label='短信'>
<el-table-column width="100" type="selection"></el-table-column> 
</el-table-column>  -->
<el-table-column
align='center'
header-align='center'
label="Operasi">
<template scope="scope">
  <el-button
  size="small"
  type="danger"
  @click.native.prevent="handleDelete(scope.$index, handleSendTableData)">Hapus</el-button>
</template>
</el-table-column>
</el-table>

<table border="0" style="width:100%; margin-left:-2px; ">
  <tr>
    <td style=" "><el-input v-model='handleAddData.userName' placeholder='Nama' required></el-input></td>
    <td><el-input v-model='handleAddData.orderNo' placeholder='Nomor Order' required></el-input></td>
    <td><el-input v-model='handleAddData.couponCode' disabled></el-input></td>
    <td><el-input v-model='handleAddData.money' :disabled="handleSendFackeValue" placeholder='Jumlah'></el-input></td>
    <td> <el-date-picker style="width:150px"  v-model="handleAddData.validityStartTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Silahkan pilih">
    </el-date-picker></td> ~  <td><el-date-picker style="width:150px" v-model="handleAddData.validityEndTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Silahkan pilih">
    </el-date-picker></td>
  <!--   <td style="width: 13%">            
      <el-table-column><span style="color: white">_</span><el-checkbox v-model="mobileMess"></el-checkbox></el-table-column>
    </td> -->
    <td><el-button @click='handleAdd' style='margin:0 auto;' type='primary' size="small">tambah</el-button></td>
  </tr>
</table>

<div slot="footer" class="dialog-footer">
   <el-button @click="dialogFirstHandle=false">Batalkan</el-button>
  <el-button type="primary" @click="handleAddSubmite">Kirim</el-button>
 
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
    let checkPermission = (rule, value, callback) => {
      let _arr = this.getPermissionIds(value)
      if (_arr.length == 0) {
        callback(new Error('至少选择一项'))
      }
      callback()
    }
    let compareDate = (time, form, txt, type) => {
      let _cp1 = time.getTime() > Date.now() && time.getTime() < Date.now();
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
      tempId:'',
      dialogFirstHandle: false,
      permissionListInit: false,
      handleSendLoading: false,
      handleSendFackeValue: false,
      addStatus:'',
      editStatus:'',
      mobileMess: '',
      permissionList: [],
      handleSendTableData: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      dataTotal:0,
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "handleAddData", "validityEndTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "handleAddData", "validityStartTime", "e")
        }
      },
        //Grid
        gridLoading: false,
        gridData: [],
        handleAddData: {
          userName: '',
          orderNo: '',
          couponCode: '',
          money: '',
          validityStartTime:'',
          validityEndTime:''
        },
        //Form
        addForm: {
          couponCode: '',
          alias: '',
          indonisaName: '',
          status: '',
        },
        editForm: {
          couponCode: '',
          alias: '',
          indonisaName: '',
          status: '',
        },
        inputRule: {
          smsTemplateId: [{
            required: true,
            message: 'silahkan pilih kontennya',
            trigger: 'blur'
          }],
          permissionObj: [{
            validator: checkPermission,
            trigger: 'change'
          }],
          chineseName:[{
            required: true,
            message: 'silahkan pilih kontennya',
            trigger: 'blur'
          }],
          indonisaName:[{
            required: true,
            message: 'silahkan pilih kontennya',
            trigger: 'blur'
          }],
          fineMoney:[{
            required: true,
            message: 'silahkan pilih kontennya',
            trigger: 'blur'
          }]
        },
        validityStartTime:'',
        validityEndTime:'',
        //Dialog
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false,
        editFormInit: false,
      }
    },
    methods: {
      sortsmsTitle(str) {
        if (str.length > 20) {
          str = str.substring(0, 20) + "..."
        }
        return str
      },
      sortsmsContent(str) {
        if (str.length > 20) {
          str = str.substring(0, 20) + "..."
        }
        return str
      },
      
      add() {
        this.addForm.couponCode = this.runNum(7);
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        if (this.permissionListInit) {
          this.addPermissionObjInit()
        } else {
          this.getPermission(() => {
            this.addPermissionObjInit()
          })
        }
      },
      runNum(n) {
        var rnd="";
        for(var i=0;i<n;i++)
          rnd +=  Math.floor(Math.random()*10);
        return rnd;
      },
      edit(row,type) {
        this.tempId = row.id;
        if (type == 1) {
          this.editDialogVisible = true;
          this.editForm.status = row.status == 1 ? false : true;
          this.editForm.couponCode = row.couponCode;
          this.editForm.alias = row.alias;
          this.editForm.indonisaName = row.indonisaName;
        } else if (type == 2) {
          this.$confirm('apakah anda yakin ingin menghapus template ini?', 'Pemberitahuan', {
            type: 'warning'
          }).then(() => {
            let _data = {
              id: row.id,
            }
            this.$http.post('manage/deleteOrUpdateCoupon', _data).then(response => {
              if (1 == response.body.code) {
                this.bindGrid();
                this.$message({
                  message: 'success',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {

            })
          }).catch(() => {

          })
        }
        
      },
      secondPageIndexChange(val) {
        this.pageIndex = val;
        this.bindGridFirst()
      },
      secondPageIndexChange1(val) {
        this.pageIndex1 = val;
        this.bindGridSecond()
      },
      secondPageIndexChange2(val) {
        this.pageIndex2 = val;
        this.bindGridThird()
      },
      handleAdd() {
        let count=1;
        for(var key in this.handleAddData){    
          if(this.handleAddData[key].length == 1){
            count+=1;
          }
        }
        let aa=Object.getOwnPropertyNames(this.handleAddData).length-1;
        // if(aa!==count&&count!==1){
        //   this.$message({
        //     message: '输入框能不为空',
        //     type: 'warning'
        //   });
        //   return;
        // }
        if(count==aa){
          return;
        }
        let _clone = Object.assign({},this.handleAddData,{validityStartTime:DataUtil.formatTime(this.handleAddData.validityStartTime)||'',validityEndTime:DataUtil.formatTime(this.handleAddData.validityEndTime)||'',"sendPersion":this.uuid});
        // _clone.type='1';
        this.handleSendTableData.push(_clone);
        for(var key in this.handleAddData){    
          this.handleAddData[key] = '';    
        }
        this.handleAddData.couponCode=this.handleSendTableData[0].couponCode;
        if(this.handleSendFackeValue==true){
          this.handleAddData.money=this.handleSendTableData[0].money;
        }
      },
      handleDelete(index, handleSendTableData) {
        // let _del=this.handleSendTableData[index];
        // _del.type='2';
        // this.handleSendTableDataAdd.push(_del);
        this.handleSendTableData.splice(index, 1);
      },
      checkAllChange(event) {
        this.checkAllChangeFn(event, "addForm")
      },
      checkAllChange2(event) {
        this.checkAllChangeFn(event, "editForm")
      },
      checkItemChange(value) {
        this.checkItemChangeFn(value, "addForm")
      },
      checkItemChange2(value) {
        this.checkItemChangeFn(value, "editForm")
      },
      checkAllChangeFn(event, form) {
        for (let i = 0; i < this[form].permissionObj.length; i++) {
          let item = this[form].permissionObj[i]
          if (item.id == event.target.value) {
            item.indeterminate = false
            item.checkedList = event.target.checked ? (() => {
              let _arr = []
              for (let i = 0; i < item.children.length; i++) {
                _arr.push(item.children[i].id)
              }
              return _arr
            })() : []
          }
        }
      },
      handleAddSubmite() {
        let count;//用来计数input里空格个数，disable的当做空格
        let num;// 用来记录disable的input个数
        if(this.handleSendFackeValue==true){count=2}else{count=1}
          if(this.handleSendFackeValue==true){num=2}else{num=1}
            for(var key in this.handleAddData){    
              if(this.handleAddData[key].length == 0){
                count+=1;
              }    
            }
            let aa=Object.getOwnPropertyNames(this.handleAddData).length-1;
            // if(aa!==count&&count!==num){
            //   this.$message({
            //     message: '输入框能不为空',
            //     type: 'warning'
            //   });
            //   return;
            // }
            if(count==num){
              let _clone = Object.assign(this.handleAddData,{validityStartTime:DataUtil.formatTime(this.handleAddData.validityStartTime)||'',validityEndTime:DataUtil.formatTime(this.handleAddData.validityEndTime)||'',"sendPersion":this.uuid},);
              for(var key in this.handleAddData){  
                if(key!=="couponCode") {this.handleAddData[key] = ''; }
                else{continue;} 
              }
              // _clone.type='1';
              this.handleSendTableData.push(_clone);
            }
        // let _data = this.handleSendTableData.concat(this.handleSendTableDataAdd);
        let _data = this.handleSendTableData;
        for(let key in _data){
          _data[key].adminUserName=this.adminUserName;
        }

        this.$http.post('manage/sendCoupons', {'couponRequests':_data}).then(response => {
          if (1 == response.body.code) {
            this.dialogFirstHandle = false;
            this.$message.success('成功发放数量为：'+ response.body.data);
            this.bindGrid();
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.dialogFirstHandle = false;
        });
        if(this.handleSendFackeValue==true){
          this.handleAddData.money=this.handleSendTableData[0].money;
        }
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
      handleSelectionChange(val) {
      },
      checkItemChangeFn(value, form) {
        for (let i = 0; i < this[form].permissionObj.length; i++) {
          let item = this[form].permissionObj[i]
          if (item.checkedList.length == item.children.length) {
            item.isCheck = true
            item.indeterminate = false
          } else if (item.checkedList.length == 0) {
            item.isCheck = false
            item.indeterminate = false
          } else {
            item.isCheck = true
            item.indeterminate = true
          }
        }
      },
      getPermissionIds(obj) {
        let _arr = []
        for (let i = 0; i < obj.length; i++) {
          let item = obj[i]
          if (item.isCheck) {
            _arr.push(item.id)
            _arr = _arr.concat(item.checkedList)
          }
        }
        return _arr
      },
      handleSend(index,row) {
        // if(this.firstTableData[index].status==0){
        //   this.$message({message: '该优惠券处于禁用状态，修改后可添加！',type: 'error'});
        //   return;
        // }
        this.dialogFirstHandle=true;
        // this.handleSendLoading=true;
        this.handleSendTableData = [];
        for(var key in this.handleAddData){    
          this.handleAddData[key] = '' 
        }
        this.handleSendFackeValue=false;
        this.handleAddData.couponCode=row.couponCode;
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            if (this.addForm.status == false) {
              this.addStatus = 1;
            }else {
              this.addStatus = 0;
            }
            let _data = {
              couponCode: this.addForm.couponCode,
              alias: this.addForm.alias,
              indonisaName: this.addForm.indonisaName,
              status: this.addStatus,
            }
            this.addFormLoading = true
            this.$http.post("manage/addOrUpdateCoupon", _data).then(response => {
              this.addFormLoading = false
              if (1 == response.body.code) {
                this.addDialogVisible = false
                this.bindGrid();
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                window.location.reload();
              } else {
                this.$message.error(response.body.message);
                window.location.reload();
              }
            }, response => {})

          } else {
            return false
          }
        });
      },
      editFormSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
           if (this.editForm.status == false) {
            this.editStatus = 1;
          }else {
            this.editStatus = 0;
          }
          let _data = {
           id: this.tempId,
           couponCode: this.editForm.couponCode,
           alias: this.editForm.alias,
           indonisaName: this.editForm.indonisaName,
           status:this.editStatus
         }
         this.editFormLoading = true
         this.$http.post("manage/addOrUpdateCoupon", _data).then(response => {
          this.editFormLoading = false
          if (1 == response.body.code) {
            this.editDialogVisible = false
            this.bindGrid()
            this.$message({
              message: 'success',
              type: 'success'
            });
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.editFormLoading = false
        })

       } else {
        return false
      }
    });
      },
      getPermission(fn) {
        let _data = {}
        this.$http.post('manage/permissionList', _data).then(response => {
          if (1 == response.body.code) {
            this.permissionList = response.body.data
            this.permissionListInit = true
            fn && fn()
          }
        }, response => {

        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize},{
          });
        this.$http.post('manage/listCouponConfig', _data).then(response => {
          this.gridLoading = false
          if (1 == response.body.code) {
            this.dataTotal = response.body.data.recordsTotal
            this.gridData = response.body.data.data
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
          this.gridLoading = false
        });
      },
      addPermissionObjInit() {
        let _temp = []
        for (let i = 0; i < this.permissionList.length; i++) {
          _temp.push(Object.assign({
            checkedList: [],
            isCheck: false,
            indeterminate: false
          }, this.permissionList[i]))
        }
        this.addForm.permissionObj = _temp
      },
      editPermissionObjInit(list) {
        let _temp = []
        for (let i = 0; i < list.length; i++) {
          _temp.push(Object.assign(_getTempObj(list[i]), list[i]))
        }

        function _getTempObj(list) {
          if (list.isCheck == false) {
            return {
              checkedList: [],
              indeterminate: false
            }
          } else {
            let _arr = []
            for (let i = 0; i < list.children.length; i++) {
              if (list.children[i].isCheck) {
                _arr.push(list.children[i].id)
              }
            }
            return {
              checkedList: _arr,
              indeterminate: _arr.length == list.children.length ? false : true
            }
          }
        }
        this.editForm.permissionObj = _temp
      }
    },
    mounted: function () {
      this.bindGrid();
      this.uuid = DataUtil.id();
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
    }
  }

  </script>
  <style>
  #dialogFirstHandleTitle {
    margin-top: -20px;
    margin-bottom: 20px;
    font-weight: 700;
    font-family: "黑体";
    font-size: 20px;
  }
  </style>
