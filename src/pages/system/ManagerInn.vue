<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Nama pengguna">
        <el-input v-model="searchForm.username"></el-input>
      </el-form-item>
      <el-form-item label=" No.Ponsel pengguna">
        <el-input v-model="searchForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="searchForm.status" clearable>
          <el-option v-for="item in zzList" :label="item.name" :key="item.code"  :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status Online">
        <el-select v-model="searchForm.onlineOrNot" clearable>
          <el-option v-for="item in List" :label="item.name" :key="item.code"  :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">Permintaan</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="add" type="success">Ditambahkan</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column prop="id" min-width="60" label="ID">
        </el-table-column>
        <el-table-column prop="username" label="Nama pengguna" min-width="120">
        </el-table-column>
        <el-table-column prop="realname" label="Nama lengkap" min-width="100">
        </el-table-column>
        <!--<el-table-column prop="mobile" label="手机" width="150">
        </el-table-column>-->
        <el-table-column label="Peran" min-width="200">
          <template scope="scope">
            <el-tag v-for="item in (scope.row.roles.split(','))" v-if="item" :key="item" type="primary" style="margin-right:2px;">{{ item.split('|')[1]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="Waktu pembuatan" min-width="130">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="
        Status" min-width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status==0? 'success' : 'danger'" close-transition>{{scope.row.status==0?'Aktif':'Blokir'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Status Online" min-width="100"> 
        <template scope="scope">
          <el-tag :type="scope.row.onlineOrNot==true? 'primary' : 'danger'" close-transition>{{scope.row.onlineOrNot==true?'Ya':'Bukan'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Opsi" min-width="250">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.row)">Ubah</el-button>
          <el-button type="danger" size="small" @click="reset(scope.row)">Setel ulang kata sandi</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <!--分页-->
  <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
  layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>
<!--添加-->
<el-dialog title="Tambahkan peran" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
  <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
    <el-form-item label="Nama pengguna" prop="username">
      <el-input v-model="addForm.username" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Nama lengkap" prop="realname">
      <el-input v-model="addForm.realname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label=" No.Ponsel pengguna" prop="mobile">
      <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="Catatan" prop="remark">
      <el-input type="textarea" v-model="addForm.remark" auto-complete="off" :maxlength="20"></el-input>
    </el-form-item>

    <el-form-item label="Peran" prop="roleIds">
      <el-checkbox-group v-model="addForm.roleIds">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.remark}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Nomor Identitas Pegawai" prop="employeeNumber">
        <el-input v-model="addForm.employeeNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Telepon Kolektor" prop="collectionPhone">
        <el-input v-model="addForm.collectionPhone" auto-complete="off"></el-input>
      </el-form-item>
       <el-form-item label="panggilan suara" prop="voicePhone">
        <el-input v-model="addForm.voicePhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="WA Kolektor" prop="collectionWa">
        <el-input v-model="addForm.collectionWa" auto-complete="off"></el-input>
      </el-form-item>
    <el-form-item label="
    Status" prop="status">
    <el-switch v-model="addForm.status" on-text="Efektif" off-text="Tidak valid"></el-switch>
  </el-form-item>
  <el-form-item label="Merupakan pihak ke -3" prop="third">
    <el-switch v-model="addForm.third" on-text="YA" off-text="Tidak"></el-switch>
  </el-form-item>
  <el-form-item label="Apakah sebagai platform pihak ketiga" prop="thirdPlatform">
    <el-switch v-model="addForm.thirdPlatform" on-text="YA" off-text="Tidak"></el-switch>
  </el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisible = false">Batal</el-button>
  <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
</div>
</el-dialog>
<!--修改-->
<el-dialog title="Ubah pengguna" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
  <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" ref="editForm">
    <el-form-item label="Nama pengguna" prop="username">
      <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="Nama lengkap" prop="realname">
      <el-input v-model="editForm.realname" auto-complete="off"></el-input>
    </el-form-item>
        <!--<el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off" :maxlength="11"></el-input>
        </el-form-item>-->
        <el-form-item label="Peran" prop="roleIds">
          <el-checkbox-group v-model="editForm.roleIds">
            <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{item.remark}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Nomor Identitas Pegawai" prop="employeeNumber">
        <el-input v-model="editForm.employeeNumber" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Telepon Kolektor" prop="collectionPhone">
        <el-input v-model="editForm.collectionPhone" auto-complete="off"></el-input>
      </el-form-item>
   <el-form-item label="panggilan suara" prop="voicePhone">
        <el-input v-model="editForm.voicePhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="WA Kolektor" prop="collectionWa">
        <el-input v-model="editForm.collectionWa" auto-complete="off"></el-input>
      </el-form-item>
        <el-form-item label="
        Status" prop="status">
        <el-switch v-model="editForm.status" on-text="Efektif" off-text="Tidak valid"></el-switch>
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
import DataUtil from '../../common/dataUtil'
export default {
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Harap masukkan nomor teleponnya'));
      } else {
        if (!DataUtil.isMobile(value)) {
          callback(new Error('Format nomor ponsel salah'));
        }
        callback();
      }
    };

    return {
      roleList: [],
        //搜索
        searchForm: {
          usernameLike: '',
          realnameLike: '',
          mobileLike: '',
          roleId: '',
          onlineOrNot: '',
        },
        zzList : [{
          code: '0',
          name: 'Aktif'
        }, {
          code: '1',
          name: 'Blokir'
        }],
         zzList : [{
          code: '1',
          name: 'Ya'
        }, {
          code: '2',
          name: 'Bukan'
        }],
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          username: '',
          realname: '',
          voicePhone: '',
          thirdPlatform:'',
          remark:'',
          roleIds: [],
          status: true,
          third:'',
          collectionPhone:'',
          employeeNumber:'',
          collectionWa:'',
        },
        editForm: {
         id: '',
          username: '',
          mobile:'',
          voicePhone:'',
          realname: '',
          roleIds: [],
          status: true,
          remark:'',
          collectionPhone:'',
          employeeNumber:'',
          collectionWa:'',
        },
        inputRule: {
          username: [{
            required: true,
            message: 'Harap masukkan pengguna',
            trigger: 'blur'
          }],
          realname: [{
            required: true,
            message: 'Silahkan masukkan nama anda',
            trigger: 'blur'
          }],
          roleIds: [{
            type: 'array',
            required: true,
            message: 'Harap masukkan peran',
            trigger: 'change'
          }],
          remark:[{
            required: true,
            message: 'Harap masukkan catatan',
            trigger: 'blur'
          }]
        },
        //Dialog
        addDialogVisible: false,
        editDialogVisible: false,
        addFormLoading: false,
        editFormLoading: false
      }
    },
    methods: {
      getUnixTime(time){
        return DataUtil.formatUnixTimeInn(time);
      },
      add(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.roleIds = []
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.username = row.username
        this.editForm.realname = row.realname
        this.editForm.roleIds = this.getRoleIds(row.roles.split(','))
        this.editForm.status = row.status == 1 ? false : true
        this.editForm.collectionPhone = row.collectionPhone
        this.editForm.employeeNumber = row.employeeNumber
        this.editForm.collectionWa = row.collectionWa
      },
      reset(row) {
        this.$confirm('Apakah Anda ingin menyetel ulang kata sandi Anda?', 'Prompt', {
          type: 'warning'
        }).then(() => {
          let _data = {
            id: row.id,
            username: row.username
          }
          this.$http.post('manage/manusr/passwordReset', _data).then(response => {
            if (1 == response.body.code) {
              this.$message({
                message: 'Penyetelan ulang kata sandi berhasil',
                type: 'success'
              });
            } else {
              this.$message.error(response.body.message);
            }
          }, response => {

          })
        }).catch(() => {

        })
      },
      getRoleIds(list) {
        var _arr = []
        for (let i = 0; i < list.length; i++) {
          _arr.push(Number(list[i].split('|')[0]))
        }
        return _arr
      },
      pageSizeChange(val) {
        this.pageSize = val
        this.pageIndex = 1
        this.bindGrid()
      },
      pageIndexChange(val) {
        this.pageIndex = val
        this.bindGrid()
      },
      addFormSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            let _data = Object.assign({}, this.addForm)
            _data.status = _data.status ? '0' : '1'
            _data.third = _data.third ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: 'Harap masukkan peran',
                type: 'error'
              });
              return false;
            }

            this.addFormLoading = true

            this.$http.post("manage/sysUserAdd", _data).then(response => {
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
            let _data = Object.assign({}, this.editForm)
            _data.status = _data.status ? '0' : '1'
            _data.roleIds = _data.roleIds.join(',')
            if(_data.roleIds == 0){
              this.$message({
                message: 'Harap masukkan peran',
                type: 'error'
              });
              return false;
            }
            this.editFormLoading = true

            this.$http.post("manage/sysUserEdit", _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: 'Diubah dengan sukses',
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
      search() {
        this.pageIndex = 1
        this.bindGrid()
      },
      bindRole() {
        let _data = {}
        this.$http.post('manage/sysRoleList', _data).then(response => {
          if (1 == response.body.code) {
            let _arr = []
            for (let i = 0; i < response.body.data.length; i++) {
              if (0 == response.body.data[i].status) {
                _arr.push(response.body.data[i])
              }
            }
            this.roleList = _arr
          }
        }, response => {

        });
      },
      bindGrid() {
        this.gridLoading = true
        let _data = Object.assign({
          lanuge:2
        }, this.searchForm)
        _data.pageNo = this.pageIndex
        _data.pageSize = this.pageSize
        this.$http.post('manage/sysUserList', _data).then(response => {
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
      }
    },
    created: function () {
      this.bindRole()
      this.bindGrid()
    }
  }

  </script>
