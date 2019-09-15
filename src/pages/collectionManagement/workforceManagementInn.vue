<!--  逾期订单查询 -->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">

      <el-form-item label="Jadwal">
        <div class="block">
          <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Silahkan pilih">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Silahkan pilih">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="Tempat duduk">
        <el-input v-model="searchForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="status bekerja" prop="work">
        <el-select v-model="searchForm.work" placeholder="Silahkan pilih" filterable clearable>
          <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">Cari</el-button>
        <el-button @click="add" type="info">Tambahkan peran</el-button>
        <el-button @click="numMuban" type="info">Template hitungan</el-button>
        <el-button @click="delAll" type="info">Penghapusan Batch</el-button>
        <el-upload
        class="upload-demo"
        ref="upload"
        :action="importFileUrl"
        name = "file"
        :data = "pageList"
        :file-list = 'fileList'
        :on-success = 'handleSuccess'
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">Pilih Dokumen</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">Impor data</el-button>
        <div slot="tip" class="el-upload__tip">File tidak lebih dari 500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>

  <!--列表-->
  <template>
    <el-table :data="gridData" highlight-current-row @selection-change="handleSelectionChange" v-loading="gridLoading" class="grid">
      <el-table-column type="selection"  width="55">
      </el-table-column>
      <el-table-column label="Jadwal" prop="workTime" min-width="200" sortable>
       <template scope="scope">
        {{getdate(scope.row.workTime)}}
      </template>
    </el-table-column>
    <el-table-column label="Tempat duduk" prop="userName" min-width="200" sortable>
    </el-table-column>
    <el-table-column label="status bekerja" prop="work" min-width="150">
      <template scope="scope">
        {{getChannelName(scope.row.work)}}
      </template>
    </el-table-column>
    <el-table-column inline-template label="Opsi" min-width="200">
     <div>
      <el-button size="small" @click="check(row)">Ubah pengguna</el-button>
      <el-button size="small" @click="del(row)">Hapus</el-button>
    </div>
  </el-table-column>

</el-table>
<!--分页-->
<el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
</el-pagination>

</template>


<!-- <el-form-item label="催收人员" prop="outsourceId">
          <el-select v-model="searchForm.outsourceId" placeholder="请选择" filterable clearable>
            <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.code"></el-option>
          </el-select>
        </el-form-item> -->

        <el-dialog title="Tambahkan peran" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
          <el-form :model="addForm" label-position="left" label-width="100px" ref="addForm">
            <el-form-item label="Jadwal" prop="startTime">
              <div class="block">
                <el-date-picker v-model="addForm.startTime" type="date" :picker-options="pickerOptions5" :editable="false" placeholder="Silahkan pilih">
                </el-date-picker> ~
                <el-date-picker v-model="addForm.endTime" type="date" :picker-options="pickerOptions6" :editable="false" placeholder="Silahkan pilih">
                </el-date-picker>
              </div>
            </el-form-item>


            <el-form-item label="Tempat duduk" prop="userName">
              <el-select v-model="addForm.userName" placeholder="Silahkan pilih" filterable clearable>
                <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.name"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="status bekerja" prop="work">
              <el-select  filterable v-model="addForm.work" placeholder="Silahkan pilih" filterable clearable>
                <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Operator" prop="name" >
              <el-input v-model="addForm.name" auto-complete="off" disabled ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">Pembatalan</el-button>
            <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">Kirim</el-button>
          </div>
        </el-dialog>


        <el-dialog title="Ubah pengguna" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
          <el-form :model="editForm" label-position="left" label-width="100px" ref="editForm">
            <el-form-item label="Jadwal" prop="startTime">
              <div class="block">
                <el-date-picker v-model="editForm.workTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Silahkan pilih">
                </el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="Tempat duduk" prop="userName">
              <el-input v-model="editForm.userName" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="status bekerja" prop="work">
              <el-select v-model="editForm.work" placeholder="Silahkan pilih" filterable clearable>
                <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Operator" prop="name">
              <el-input v-model="editForm.name" auto-complete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">Pembatalan</el-button>
            <el-button type="primary" @click="editFormSubmit"  :loading="editFormLoading">Kirim</el-button>
          </div>
        </el-dialog>


      </section>
    </template>
    <script>
    import enums from '../../common/Enum'
    import DataUtil from '../../common/dataUtil'
    import Config from '../../common/config'
    export default {
      data () {
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
            startTime:'',
            endTime:'',
            userName:'',
            work:'',

          },
          addFormLoading:false,
          editFormLoading:false,
          fileList:[],
          multipleSelection: [],
          Tuuid:[],
          importFileUrl: Config.host + 'manage/importReceiverSchedulingDataByExcel',
          pageList:{
           sessionId : DataUtil.sid(),
         },
         addDialogVisible:false,
         editDialogVisible:false,
         sessionId:'',

         thirdCompanyList: [],
         workList:[{
          code:'1',
          name:'Ya'
        },{
          code:'0',
          name:'Bukan'
        }],
        addForm:{
          startTime:'',
          endTime:'',
          userName:[],
          work:'',
          name:'',
        },

        editForm:{
          userName:'',
          work:'',
          name:'',
          workTime:'',
        },


        payDayList:[],
        qudaolist: [],
        gridLoading: false,
        gridData: [],
        pageIndex: this.$store.getters.getUserListIndex,
        pageSize: 10,
        isAgainOrder:enums.isAgainOrder,
        dataTotal: 20,
        contactList: [],
        coner:[],
        pickerOptions1: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "endTime", "s")
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            return compareDate(time, "searchForm", "startTime", "e")
          }
        },
        pickerOptions3: {
          disabledDate(time) {
            return compareDate(time, "editForm", "workTime", "s")
          }
        },
          // pickerOptions4: {
          //   disabledDate(time) {
          //     return compareDate(time, "editForm", "startTime", "e")
          //   }
          // },
          pickerOptions5: {
            disabledDate(time) {
              return compareDate(time, "addForm", "endTime", "s")
            }
          },
          pickerOptions6: {
            disabledDate(time) {
              return compareDate(time, "addForm", "startTime", "e")
            }
          },
        }
      },
      methods: {
        getChannelName(type) {
         let re = '';
         this.workList.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
         return re
       },

       submitUpload() {
        this.$refs.upload.submit();
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;

        for (var i = 0; i < val.length; i++) {
          this.Tuuid[i] = val[i].uuid;
        };
        console.log(this.Tuuid);

      },

      handleSuccess(response){

        if (response.code == 1) {
          this.$message.success('success');
        } else {
          this.$message.error(response.message);
        }
      },

      add(row) {
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields();
        this.addForm.name=DataUtil.userName();
        this.addForm.userName = [];
      },

      check(row) {
        this.editDialogVisible = true
        this.$refs.editForm && this.$refs.editForm.resetFields();
        this.editForm.name=DataUtil.userName();
        this.editForm.userName = row.userName;
      },
      numMuban(){
        window.open(Config.host + 'manage/DownloadReceiverSchedulingTemplateExcel?sessionId='+this.sessionId)
      },

      addFormSubmit() {
       let _data = Object.assign(this.addForm, {startTime:DataUtil.formatTime(this.addForm.startTime)||'',
        endTime:DataUtil.formatTime(this.addForm.endTime)||'',})
       this.addFormLoading = true
       this.$http.post("manage/AddReceiverScheduling", _data).then(response => {
        this.addFormLoading = false
        if (1 == response.body.code) {
          this.addDialogVisible = false
          this.bindGrid();
          this.$message({
            message: 'success',
            type: 'success'
          });
        } else {
          this.$message.error(response.body.message);
          this.addFormLoading = false;
        }
      }, response => {})



     },
     editFormSubmit(){
      let _data = Object.assign( this.editForm,{
        workTime:DataUtil.formatTime(this.editForm.workTime)||'',
      })
      this.editFormLoading = true
      this.$http.post("manage/AddReceiverScheduling", _data).then(response => {
        this.editFormLoading = false
        if (1 == response.body.code) {
          this.editDialogVisible = false
          this.bindGrid();
          this.$message({
            message: 'success',
            type: 'success'
          });
        } else {
          this.$message.error(response.body.message);
          this.editFormLoading = false
        }
      }, response => {})
    },

    delAll(){
      // let _data = Object.assign({uuidList:this.Tuuid})
      this.$http.post("manage/DeleteReceiverScheduling", this.Tuuid).then(response => {    
        if (1 == response.body.code) {
          this.bindGrid();
          this.$message({
            message: 'success',
            type: 'success'
          });
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {})
    },

    del(row) {
      this.$confirm('apakah anda yakin ingin menghapus template ini?', 'Pemberitahuan', {
        type: 'warning'
      }).then(() => {
        // let _data = {
        //   uuidList: row.uuid
        // }
        this.$http.post('manage/DeleteReceiverScheduling', [row.uuid]).then(
          response => {
            if (1 == response.body.code) {
              this.bindGrid();
              this.$message({
                message: 'success',
                type: 'success'
              });
            } else {

            }
          }, response => {});
      }).catch(() => {

      })
    },

    formatTime(time){
      return DataUtil.formatUnixTime(time);
    },
    getdate(dates) {
      if(!dates){
       return "";
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


      getCollectionList() {
        this.$http.post('manage/collection/getAllCollectors',{isThird:1}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
      getRoleIds(list) {
        var _arr = []
        for (let i = 0; i < list.length; i++) {
          _arr.push(Number(list[i].split('|')[0]))
        }
        return _arr
      },
      search() {
        this.bindGrid()
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

      bindGrid() {
        this.gridLoading = true;
        let _data = Object.assign({
          pageNo:this.pageIndex,
          pageSize:this.pageSize,
          // "outsourceId": DataUtil.id(),
        }, this.searchForm,{
          startTime:DataUtil.formatTime(this.searchForm.startTime)||'',
          endTime:DataUtil.formatTime(this.searchForm.endTime)||'',
        });
        this.$http.post('manage/ReceiverSchedulingList', _data).then(response => {
          if (1 == response.body.code) {
            this.gridLoading = false;
            if(response.body.data.data){
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
    mounted: function () {
      this.addForm.name=DataUtil.userName();
      this.sessionId=DataUtil.sid();
      this.bindGrid();
      this.getCollectionList();

    }
  }
  </script>
