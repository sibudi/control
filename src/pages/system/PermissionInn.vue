<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="addRoot" type="success">Tambah jaringan</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-tree :data="innMenuList" :props="defaultProps" node-key="id" v-loading="treeLoading" default-expand-all :expand-on-click-node="false"
    :render-content="renderContent"  ref="tree">
  </el-tree>
  <!--添加-->
  <el-dialog title="Tambahkan izin" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
    <el-form :model="addForm" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
      <el-form-item label="Code" prop="permissionCode">
        <el-input v-model="addForm.permissionCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Namanya" prop="permissionName">
        <el-input v-model="addForm.permissionName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Rute" prop="permissionUrl">
        <el-input v-model="addForm.permissionUrl" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">Batal</el-button>
      <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
    </div>
  </el-dialog>
  <!--修改-->
  <el-dialog title="Ubah izin" v-model="editDialogVisible" :close-on-click-modal="false" size="tiny">
    <el-form :model="editForm" label-position="left" label-width="80px" :rules="inputRule" ref="editForm">
      <el-form-item label="Code" prop="permissionCode">
        <el-input v-model="editForm.permissionCode" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Namanya" prop="permissionName">
        <el-input v-model="editForm.permissionName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Rute" prop="permissionUrl">
        <el-input v-model="editForm.permissionUrl" auto-complete="off"></el-input>
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
    return {
        //Grid
        treeLoading: false,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'permissionName'
        },
        //Form
        addForm: {
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
          parentId: '0'
        },
      innMenuList:[],
        editForm: {
          id: '',
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
        },
        inputRule: {
          permissionCode: [{
            required: true,
            message: 'Silakan masuk Code',
            trigger: 'blur'
          }],
          permissionName: [{
            required: true,
            message: 'Silakan masuk Namanya',
            trigger: 'blur'
          }],
          permissionUrl: [{
            required: true,
            message: 'Silakan masuk Rute',
            trigger: 'blur'
          }]
        },
        //Tree
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false,
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
      }]
      }
    },
    methods: {
      addRoot() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = '0'
      },
      addNode(parent) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = parent.id
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.permissionCode = row.permissionCode
        this.editForm.permissionName = row.permissionName
        this.editForm.permissionUrl = row.permissionUrl
      },
      del(row) {
        this.$confirm('Apakah kamu ingin menghapus??', 'Prompt', {
          type: 'warning'
        }).then(() => {
          let _data = {
            id: row.id
          }
          this.$http.post('manage/deletePermission.json', _data).then(
            response => {
              if (1 == response.body.code) {
                this.bindTree()
                this.$message({
                  message: 'Hapus berhasil merekam',
                  type: 'success'
                });
              } else {

              }
            }, response => {});
        }).catch(() => {

        })
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            this.addFormLoading = true

            this.$http.post('manage/permissionItemAdd', _data).then(response => {
              this.addFormLoading = false
              if (1 == response.body.code) {
                this.addDialogVisible = false
                this.bindTree()
                this.$message({
                  message: 'Ditambahkan berhasil',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.addFormLoading = false
            });

          } else {
            return false
          }
        });
      },
      editFormSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.editForm)
            this.editFormLoading = true

            this.$http.post('manage/permissionItemEdit', _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindTree()
                this.$message({
                  message: 'Diubah dengan sukses',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.editFormLoading = false
            });

          } else {
            return false
          }
        });
      },
      renderContent(h, {
        node,
        data,
        store
      }) {
       return (
        <span><span><span>{data.permissionName}({data.permissionUrl})</span></span><span style = "float: right; margin-right: 20px">
        <el-button disabled={node.level!=1} type="success" size = "mini"  on-click = {() => this.addNode(data)} >Tambah batas akses</el-button>
        <el-button size = "mini" on-click = {() => this.edit(data)} >Modifikasi</el-button>
        <el-button style="display:none;"  disabled={data.children&&data.children.length>0} type="danger" size = "mini"  on-click = {() => this.del(data)} >Hapus</el-button>
        </span></span>
        )
      },
      bindTree() {
        this.treeLoading = true
        let _data = {}
        this.$http.post('manage/permissionList', _data).then(response => {
          this.treeLoading = false;
          let {body} = response;
          if (1 == body.code && body.data) {
            this.treeData = body.data;
            this.getInnMenuList();
          } else {
            this.$message.error(body.message)
          }
        }, response => {
          this.treeLoading = false
        })

      },
      getInnMenuList() {
        for (var i = 0; i < this.menuListInn.length; i++) {
          var flag = false;
          var menuItem ={
            permissionName:this.menuListInn[i].permissionName,
            permissionUrl:this.menuListInn[i].permissionUrl,
            children:[]
          }
          for(var index = 0 ; index < this.treeData.length; index++) {
            for (var j = 0; j < this.treeData[index].children.length; j++) {
              for (var localChild = 0; localChild < this.menuListInn[i].children.length; localChild++){
                var child = this.menuListInn[i].children[localChild];
                if (child.permissionUrl == this.treeData[index].children[j].permissionUrl + 'Inn') {
                  menuItem.children.push(child);
                  flag = true;
                }
              }
            }
          }
          if (flag){
            this.innMenuList.push(menuItem);
          }
        }

      },
    },
    created: function () {
      this.bindTree();
    }
  }

  </script>
