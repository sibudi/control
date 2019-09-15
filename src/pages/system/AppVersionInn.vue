<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Jenis APP">
        <el-select v-model="searchForm.appType" clearable placeholder="Semua">
          <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select v-model="searchForm.status" clearable placeholder="Semua">
          <el-option label="Aktif" value="1"></el-option>
          <el-option label="Blokir" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">Cari</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="add" type="success">Penambahan baru</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column label="Jenis OS">
          <template scope="scope">
            <span>{{getSysType(scope.row.sysType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="Tanda" maxlength="10">
        </el-table-column>
        <el-table-column label="Jenis APP">
          <template scope="scope">
            <span>{{getAppType(scope.row.appType)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="versionNo" label="Nomor versi">
        </el-table-column>
        <el-table-column label="Waktu pembaruan" width="200">
          <template scope="scope">
            <span>{{getUnixTime(scope.row.updateTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pembaruan wajib" width="100">
          <template scope="scope">
            <span>{{scope.row.isForce==1?'Tidak':'Apakah'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="100">
          <template scope="scope">
            <el-tag :type="scope.row.status==2 ? 'danger' : 'primary'" close-transition>{{scope.row.status==2?'Cacat':'Aktif'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column inline-template label="Opsi" width="100">
          <div>
            <el-button size="small" @click="edit(row)">Pengeditan</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>
    <!--分页-->
    <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
  </el-pagination>
  <!--添加-->
  <el-dialog title="
  Tambahkan informasi versi" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
  <el-form :model="addForm" label-position="left" label-width="100px" :rules="addFormRule" ref="addForm">
    <el-form-item label="
    Judul" prop="title">
    <el-input v-model="addForm.title" auto-complete="off" :maxlength="20"></el-input>
  </el-form-item>
  <el-form-item label="Upgrade instruksi" prop="memo">
    <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.memo"></el-input>
  </el-form-item>
  <el-form-item label="Nomor versi" prop="versionNo">
    <el-input v-model="addForm.versionNo" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="
  Update yang kuat" prop="isForce">
  <el-switch v-model="addForm.isForce" on-text="
  Apakah" off-text="Tidak"></el-switch>
</el-form-item>
<el-form-item label="Salinan tombol">
  <el-col :span="11">
    <el-form-item prop="leftButton">
      <el-input v-model="addForm.leftButton" auto-complete="off" :placeholder="addForm.isForce?'':'Tombol kiri'"></el-input>
    </el-form-item>
  </el-col>
  <el-col class="line" :span="2"></el-col>
  <el-col :span="11" v-show="!addForm.isForce">
    <el-form-item prop="rightButton">
      <el-input v-model="addForm.rightButton" auto-complete="off" placeholder="Tombol kanan"></el-input>
    </el-form-item>
  </el-col>
</el-form-item>
<el-form-item label="Tipe aplikasi" prop="appType">
  <el-select v-model="addForm.appType">
    <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item label="
Jenis peralatan" prop="sysType">
<el-select v-model="addForm.sysType">
  <el-option v-for="item in sysType" :key="item.code" :label="item.name" :value="item.code">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="Alamat download" prop="downloadAddress">
  <el-input v-model="addForm.downloadAddress" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="Status" prop="status">
  <el-switch v-model="addForm.status" on-text="Aktif" off-text="
  Cacat"></el-switch>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisible = false">
  Pembatalan</el-button>
  <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
</div>
</el-dialog>
<!--修改-->
<el-dialog title="
Ubah informasi versi" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
<el-form :model="editForm" label-position="left" label-width="100px" :rules="editFormRule" ref="editForm">
  <el-form-item label="Judul" prop="title">
    <el-input v-model="editForm.title" auto-complete="off" :maxlength="20"></el-input>
  </el-form-item>
  <el-form-item label="Upgrade instruksi" prop="memo">
    <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.memo"></el-input>
  </el-form-item>
  <el-form-item label="Nomor versi" prop="versionNo">
    <el-input v-model="editForm.versionNo" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="
  Update yang kuat" prop="isForce">
  <el-switch v-model="editForm.isForce" on-text="
  Apakah" off-text="Tidak"></el-switch>
</el-form-item>
<el-form-item label="
Salinan tombol">
<el-col :span="11">
  <el-form-item prop="leftButton">
    <el-input v-model="editForm.leftButton" auto-complete="off" :placeholder="editForm.isForce?'':'Tombol kiri'"></el-input>
  </el-form-item>
</el-col>
<el-col class="line" :span="2"></el-col>
<el-col :span="11" v-show="!editForm.isForce">
  <el-form-item prop="rightButton">
    <el-input v-model="editForm.rightButton" auto-complete="off" placeholder="Tombol kanan"></el-input>
  </el-form-item>
</el-col>
</el-form-item>
<el-form-item label="Jenis APP" prop="appType">
  <el-select v-model="editForm.appType">
    <el-option v-for="item in appType" :key="item.code" :label="item.name" :value="item.code">
    </el-option>
  </el-select>
</el-form-item>
<el-form-item label="
Jenis peralatan" prop="sysType">
<el-select v-model="editForm.sysType">
  <el-option v-for="item in sysType" :key="item.code" :label="item.name" :value="item.code">
  </el-option>
</el-select>
</el-form-item>
<el-form-item label="
Alamat download" prop="downloadAddress">
<el-input v-model="editForm.downloadAddress" auto-complete="off"></el-input>
</el-form-item>
<el-form-item label="
Status" prop="status">
<el-switch v-model="editForm.status" on-text="Aktif" off-text="Cacat"></el-switch>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="editDialogVisible = false">
  Batal</el-button>
  <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">
  Kirim</el-button>
</div>
</el-dialog>
</section>
</template>
<script>
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
export default {
  data() {
    let validateRightButton = (rule, value, callback) => {
      if (this.addForm.isForce) {
        this.addForm.rightButton = ""
      }
      if (value === "" && !this.addForm.isForce) {
        callback(new Error('Silakan masukkan salinan tombolnya'));
      } else {
        callback();
      }
    }

    let validateRightButton2 = (rule, value, callback) => {
      if (this.addForm.isForce) {
        this.addForm.rightButton = ""
      }
      if (value === "" && !this.editForm.isForce) {
        callback(new Error('Silakan masukkan salinan tombolnya'));
      } else {
        callback();
      }
    }

    let validateDownloadAddress = (rule, value, callback) => {
      if (value === "" && this.addForm.sysType == "1") {
        callback(new Error('Silahkan masukkan alamat download'));
      } else {
        callback();
      }
    }

    let validateDownloadAddress2 = (rule, value, callback) => {
      if (value === "" && this.editForm.sysType == "1") {
        callback(new Error('Silahkan masukkan alamat download'));
      } else {
        callback();
      }
    }

    return {
      sysType: enums.sysType,
      appType: enums.appType,
        //搜索
        searchForm: {
          appType: '',
          status: ''
        },
        //Grid
        gridLoading: false,
        gridData: [],
        pageIndex: 1,
        pageSize: 10,
        dataTotal: 0,
        //Form
        addForm: {
          title: '',
          memo: '',
          versionNo: '',
          isForce: false,
          leftButton: '',
          rightButton: '',
          appType: '',
          sysType: '',
          downloadAddress: '',
          status: true
        },
        editForm: {
          id: '',
          title: '',
          memo: '',
          versionNo: '',
          isForce: false,
          leftButton: '',
          rightButton: '',
          appType: '',
          sysType: '',
          downloadAddress: '',
          status: true
        },
        addFormRule: {
          title: [{
            required: true,
            message: 'Harap masukkan judul',
            trigger: 'blur'
          }],
          memo: [{
            required: true,
            message: 'Harap masukkan instruksi upgrade',
            trigger: 'blur'
          }],
          versionNo: [{
            required: true,
            message: 'Harap masukkan nomor versi',
            trigger: 'blur'
          }],
          leftButton: [{
            required: true,
            message: 'Silakan masukkan salinan tombolnya',
            trigger: 'blur'
          }],
          rightButton: [{
            validator: validateRightButton,
            trigger: 'blur'
          }],
          appType: [{
            required: true,
            message: 'Silakan pilih jenis APP',
            trigger: 'blur'
          }],
          sysType: [{
            required: true,
            message: 'Pilih jenis perangkat',
            trigger: 'blur'
          }],
          downloadAddress: [{
            validator: validateDownloadAddress,
            trigger: 'blur'
          }]
        },
        editFormRule: {
          title: [{
            required: true,
            message: 'Harap masukkan judul',
            trigger: 'blur'
          }],
          versionNo: [{
            required: true,
            message: 'Harap masukkan nomor versi',
            trigger: 'blur'
          }],
          leftButton: [{
            required: true,
            message: 'Salinan tombol',
            trigger: 'blur'
          }],
          rightButton: [{
            validator: validateRightButton2,
            trigger: 'blur'
          }],
          downloadAddress: [{
            validator: validateDownloadAddress2,
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
      getSysType(val) {
        return enums.getSysType(val)
      },
      getAppType(val) {
        return enums.getAppType(val)
      },
      add() {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
      },
      edit(row) {
        this.editDialogVisible = true
        this.editForm.id = row.id
        this.editForm.title = row.title
        this.editForm.memo = row.memo
        this.editForm.versionNo = row.versionNo
        this.editForm.isForce = row.isForce == 1 ? false : true
        this.editForm.leftButton = row.leftButton
        this.editForm.rightButton = row.rightButton
        this.editForm.appType = row.appType + ""
        this.editForm.sysType = row.sysType + ""
        this.editForm.downloadAddress = row.downloadAddress
        this.editForm.status = row.status == 2 ? false : true
        this.editForm.appUpdateDate = new Date()
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
            _data.isForce = _data.isForce ? '2' : '1'
            _data.status = _data.status ? '1' : '2'
            this.addFormLoading = true

            this.$http.post("manage/appVersionAdd", _data).then(response => {
              this.addFormLoading = false;
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
            _data.isForce = _data.isForce ? '2' : '1'
            _data.status = _data.status ? '1' : '2'
            this.editFormLoading = true

            this.$http.post("manage/appVersionEdit", _data).then(response => {
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
      bindGrid() {
        this.gridLoading = true
        let _data = {
          appType: this.searchForm.appType,
          status: this.searchForm.status,
          pageNo: this.pageIndex,
          pageSize: this.pageSize,
          orderType: "DESC"
        }
        this.$http.post('manage/appVersionList', _data).then(response => {
          this.gridLoading = false;
          let {body} = response;
          if (1 == body.code) {
            this.dataTotal = body.data.recordsTotal
            this.gridData = body.data.data
          } else {
            this.$message.error(body.data.message);
          }
        }, response => {
          this.gridLoading = false
        });
      }
    },
    mounted: function () {
      this.bindGrid()
    }
  }

  </script>
