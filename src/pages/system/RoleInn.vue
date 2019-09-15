<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="success">Tambahkan peran</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
      <el-table-column type="index" width="80">
      </el-table-column>
      <el-table-column prop="remark" label="Nama peran" width="150">
        <template scope="scope">
          <el-tooltip effect="dark" placement="bottom-start">
            <div slot="content">
              <p style='max-width:100px;'>{{scope.row.remark}}</p>
            </div>
            <span>{{sortRemark(scope.row.remark)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Catatan">
        <template scope="scope">
          <el-tooltip effect="dark" placement="bottom-start">
            <div slot="content">
              <p style='max-width:100px;'>{{scope.row.remark}}</p>
            </div>
            <span>{{sortRemark(scope.row.remark)}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status==1 ? 'danger' : 'primary'" close-transition>{{scope.row.status==1?'Cacat':'Aktifkan'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Opsi" width="100">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.row)">Pengeditan</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--添加-->
    <el-dialog title="Tambahkan peran" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
        <el-form-item label="Namanya" prop="roleName">
          <el-input v-model="addForm.roleName" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.remark" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="Otoritas" prop="permissionObj">
          <template v-for="(item,index) in addForm.permissionObj">
            <el-checkbox :label="item.id" :indeterminate="addForm.permissionObj[index].indeterminate" v-model="addForm.permissionObj[index].isCheck"
            @change="checkAllChange">{{item.permissionName}}</el-checkbox>
            <el-checkbox-group v-model="addForm.permissionObj[index].checkedList" @change="checkItemChange" style="margin-left:20px;">
              <el-checkbox v-for="(child,i) in item.children" :key="child.id" :label="child.id">{{child.permissionName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="addForm.status" on-text="Aktifkan" off-text="Cacat"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
      </div>
    </el-dialog>
    <!--修改-->
    <el-dialog title="Ubah perannya" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
      <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" v-loading="editFormInit" ref="editForm">
        <el-form-item label="Namanya" prop="roleName">
          <el-input v-model="editForm.roleName" auto-complete="off" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Catatan" prop="remark">
          <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.remark" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="Otoritas" prop="permissionObj">
          <template v-for="(item,index) in editForm.permissionObj">
            <el-checkbox :label="item.id" :indeterminate="editForm.permissionObj[index].indeterminate" v-model="editForm.permissionObj[index].isCheck"
            @change="checkAllChange2">{{item.permissionName}}</el-checkbox>
            <el-checkbox-group v-model="editForm.permissionObj[index].checkedList" @change="checkItemChange2" style="margin-left:20px;">
              <el-checkbox v-for="(child,i) in item.children" :key="child.id" :label="child.id">{{child.permissionName}}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="Status" prop="status">
          <el-switch v-model="editForm.status" on-text="Aktifkan" off-text="Cacat"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">Kirim</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  data() {
    let checkPermission = (rule, value, callback) => {
      let _arr = this.getPermissionIds(value)
      if (_arr.length == 0) {
        callback(new Error('Pilih setidaknya satu'))
      }
      callback()
    }
    return {
      permissionListInit: false,
      permissionList: [],
        //Grid
        gridLoading: false,
        gridData: [],
        //Form
        addForm: {
          roleName: '',
          remark: '',
          permissionObj: [],
          status: true
        },
        editForm: {
          id: '',
          roleName: '',
          remark: '',
          permissionObj: [],
          status: true
        },
        inputRule: {
          roleName: [{
            required: true,
            message: 'Harap masukkan nama pengguna',
            trigger: 'blur'
          }],
          permissionObj: [{
            validator: checkPermission,
            trigger: 'change'
          }],
          remark:[{
            required: true,
            message: 'Harap masukkan catatan',
            trigger: 'blur'
          }]
        },
      menuListInn: [{
        permissionName:'Manajemen sistem',
        permissionUrl:'/',
        children:[{
          permissionName:'APP Manajemen aplikasi',
          permissionUrl:'/AppVersionInn',
        },{
          permissionName:'Manajemen batas akses',
          permissionUrl:'/PermissionInn',
        },{
          permissionName:'Manajemen peran',
          permissionUrl:'/RoleInn',
        },{
          permissionName:'Manajemen akun pengguna',
          permissionUrl:'/ManagerInn',
        },{
          permissionName:'Manajemen kata/kamus',
          permissionUrl:'/DictionaryManageInn',
        },{
          permissionName:'Pengelolaan Kode Verifikasi',
          permissionUrl:'/GetCodeInn',
        },{
          permissionName:'arsipkan berdasarkan nomer order',
          permissionUrl:'/SaveMongoDataInn',
        }]
      },{
        permissionName:'Manajemen permohonan',
        permissionUrl:'/',
        children:[{
          permissionName:'Semua permohonan',
          permissionUrl:'/FullOrderEnquiryInn',
        },{
          permissionName:'Pencarian permohonan hari H',
          permissionUrl:'/D0DetailsInn',
        },{
          permissionName:'Pencarian keterlambatan pelunasan',
          permissionUrl:'/OverdueOrderDetailsInn',
        },{
          permissionName:'Pencarian pinjaman yg sudah lunas',
          permissionUrl:'/RepaymentOrderInn',
        },{
          permissionName:'Pencarian pencairan gagal',
          permissionUrl:'/CallFailureOrderInn',
        }]
      },{
        permissionName:'Manajemen verifikasi',
        permissionUrl:'/',
        children:[{
          permissionName:'manual pertama',
          permissionUrl:'/RiviewTheListFirstInn',
        },{
          permissionName:'manual akhir',
          permissionUrl:'/RiviewTheListSecondInn',
        },{
          permissionName:'Manajemen petugas verivikasi',
          permissionUrl:'/AuditPersonnelmanageInn',
        },{
          permissionName:'Daftar alokasi permohonan',
          permissionUrl:'/OrderDistributionListInn',
        },{
          permissionName:'Semua permohonan',
          permissionUrl:'/ComplateOrderStatisticsInn',
        },{
          permissionName:'Manajemen semua permohonan',
          permissionUrl:'/ComplatemanagerInn',
        }]
      },{
        permissionName:'Manajemen verifikasi otomatis',
        permissionUrl:'/',
        children:[{
          permissionName:'Manajemen verifikasi otomatis-pengguna baru',
          permissionUrl:'/AutomaticAudit-newInn',
        }]
      },{
        permissionName:'Manajemen penagihan',
        permissionUrl:'/',
        children:[{
          permissionName:'permohonan terlambat',
          permissionUrl:'/BackOrderInn',
        },{
          permissionName:'Permohonan sudah lunas',
          permissionUrl:'/HasTheRepaymentOrderInn',
        },{
          permissionName:'Permohonan sudah lunas-admin',
          permissionUrl:'/AdminHasTheRepaymentOrderInn',
        },{
          permissionName:'Alokasi permohonan(D0)',
          permissionUrl:'/D0OrderAllocationInn',
        },{
          permissionName:'Alokasi permohonan terlambat',
          permissionUrl:'/OverdueOrderDistributionInn',
        },{
          permissionName:'Petugas alokas',
          permissionUrl:'/ThePersonnelManagementInn',
        },{
          permissionName:'statistik Data SMS',
          permissionUrl:'/SmsMessageSystemInn',
        },{
          permissionName:'Pengaturan pengiriman SMS ',
          permissionUrl:'/ShortNoteAdminInn',
        }]
      },{
        permissionName:'Manajemen operator',
        permissionUrl:'/',
        children:[{
          permissionName:'updateUserName',
          permissionUrl:'/EditUserNameInn',
        },{
          permissionName:'Daftar masukan pengguna',
          permissionUrl:'/UserFeedBackInn',
        }]
      }],
      innMenuList:[],
        //Dialog
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false,
        editFormInit: false
      }
    },
    methods: {
      sortRemark(str) {
        if (str.length > 20) {
          str = str.substring(0, 20) + "..."
        }
        return str
      },
      add() {
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
      edit(row) {
        this.editDialogVisible = true
        this.editFormInit = true
        let _data = {
          id: row.id
        }
        this.$http.post('manage/rolePermissionCheckList', _data).then(response => {
          if (1 == response.body.code) {
            this.editFormInit = false
            this.editForm.id = row.id
            this.editForm.roleName = row.roleName
            this.editForm.remark = row.remark
            this.editForm.status = row.status == 1 ? false : true
            this.editPermissionObjInit(this.getInnMenuList(response.body.data))
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {});
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
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = {
              roleName: this.addForm.roleName,
              remark: this.addForm.remark,
              permissionIds: this.getPermissionIds(this.addForm.permissionObj).join(','),
              status: this.addForm.status ? '0' : '1'
            }
            this.addFormLoading = true

            this.$http.post("manage/sysRoleAdd", _data).then(response => {
              this.addFormLoading = false
              if (1 == response.body.code) {
                this.addDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Ditambahkan berhasil',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
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
            let _data = {
              id: this.editForm.id,
              roleName: this.editForm.roleName,
              remark: this.editForm.remark,
              permissionIds: this.getPermissionIds(this.editForm.permissionObj).join(','),
              status: this.editForm.status ? '0' : '1'
            }
            this.editFormLoading = true

            this.$http.post("manage/sysRoleEdit", _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Berhasil merubah',
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
        let _data = {}
        this.$http.post('manage/sysRoleList', _data).then(response => {
          this.gridLoading = false
          if (1 == response.body.code) {
            //this.dataTotal = response.body.result.recordsTotal
            this.gridData = response.body.data
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
      getInnMenuList(_data) {
//        var innMenuList = [];
        for (var i = 0; i < this.menuListInn.length; i++) {
//          var flag = false;
//          var menuItem ={
//            permissionName:this.menuListInn[i].permissionName,
//            permissionUrl:this.menuListInn[i].permissionUrl,
//            children:[]
//          }
          for(var index = 0 ; index < _data.length; index++) {
            for (var j = 0; j < _data[index].children.length; j++) {
              for (var localChild = 0; localChild < this.menuListInn[i].children.length; localChild++){
                var child = this.menuListInn[i].children[localChild];
                if (child.permissionUrl == _data[index].children[j].permissionUrl + 'Inn') {
//                  menuItem.children.push(child);
//                  flag = true;
                  _data[index].permissionName = this.menuListInn[i].permissionName;
                  _data[index].children[j].permissionName = child.permissionName;
                }
              }
            }
          }
//          if (flag){
//            innMenuList.push(menuItem);
//          }
        }
        return _data;

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
      this.bindGrid()
    }
  }

  </script>
