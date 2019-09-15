<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="addRoot" type="success">tambahkan pemimpin kelompok</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-tree :data="treeData" :props="defaultProps" node-key="id" v-loading="treeLoading" default-expand-all :expand-on-click-node="false"
      :render-content="renderContent"  ref="tree">
    </el-tree>
    <!--添加-->
    <el-dialog title="tambahkan pemimpin kelompok" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nama" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
      </div>
    </el-dialog>
    <el-dialog title="tambahkan anggota kelompok" v-model="addDialogVisibleone" :close-on-click-modal="false" size="tiny">
      <el-form :model="addFormone" label-position="left" label-width="80px" :rules="inputRule" ref="addForm">
        <el-form-item label="Nama" prop="username">
          <el-input v-model="addFormone.username" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisibleone = false">Batal</el-button>
        <el-button type="primary" @click="addFormSubmitone" :loading="addFormLoadingone">Kirim</el-button>
      </div>
    </el-dialog>
    <!--修改-->
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
          children: 'manUserList',
          label: 'username'
        },
        //Form
        addForm: {
          username: '',
          addOrDelete: '1',
        },
        addFormone: {
          username: '',
          addOrDelete: '1',
          id:'',
        },
        editForm: {
          id: '',
          permissionCode: '',
          permissionName: '',
          permissionUrl: '/',
        },
        //Tree
        addDialogVisible: false,
        addDialogVisibleone: false,
        editDialogVisible: false,
        addFormLoading: false,
        addFormLoadingone: false,
        editFormLoading: false
      }
    },
    methods: {
      addRoot() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
      },
      addNode(parent) {
        this.addDialogVisibleone = true
        this.$refs.addFormone && this.$refs.addFormone.resetFields()
        this.addFormone.id = parent.id
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.permissionCode = row.permissionCode
        this.editForm.permissionName = row.permissionName
        this.editForm.permissionUrl = row.permissionUrl
      },
      del(row) {
        this.$confirm('Apakah kamu ingin menghapus?', 'Prompt', {
          type: 'warning'
        }).then(() => {
          let _data = {
            id: row.id,
            addOrDelete:'2',
            username:row.username
          }
          this.$http.post('manage/addOrDeleteParentId', _data).then(
            response => {
              if (1 == response.body.code) {
                this.bindTree()
                this.$message({
                  message: 'Hapus berhasil merekam',
                  type: 'success'
                });
              } else {
               this.$message.error(response.body.message);
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

            this.$http.post('manage/addOrDeleteParentId', _data).then(response => {
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
       addFormSubmitone() {
    
            let _data = Object.assign({}, this.addFormone)
            this.addFormLoadingone = true

            this.$http.post('manage/addOrDeleteParentId', _data).then(response => {
              this.addFormLoadingone = false
              if (1 == response.body.code) {
                this.addDialogVisibleone = false
                this.bindTree()
                this.$message({ 
                  message: 'Ditambahkan berhasil',
                  type: 'success'
                });
              } else {
                this.$message.error(response.body.message);
              }
            }, response => {
              this.addFormLoadingone = false
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
                  message: 'Ditambahkan berhasil',
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
          <span><span><span> {data.username} </span></span><span style = "float: right; margin-right: 20px">
          <el-button disabled={node.level!=1} type="success" size = "mini"  on-click = {() => this.addNode(data)} >tambahkan anggota kelompok</el-button>
          <el-button  disabled={data.children&&data.children.length>0} type="danger" size = "mini"  on-click = {() => this.del(data)} >Hapus</el-button>
          </span></span>
        )
      },
      bindTree() {
        this.treeLoading = true
        let _data = {}
        this.$http.post('manage/listParentId', _data).then(response => {
          this.treeLoading = false;
          let {body} = response;
          if (1 == body.code && body.data) {
            this.treeData = body.data 
          } else {
            this.$message.error(body.message)
          }
        }, response => {
          this.treeLoading = false
        })

      }
    },
    created: function () {
      this.bindTree();
    }
  }

</script>
