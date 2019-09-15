<!--  逾期订单查询 -->
<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">

      <el-form-item label="排班时间">
        <div class="block">
          <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="坐席">
        <el-input v-model="searchForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="上班状态" prop="work">
        <el-select v-model="searchForm.work" placeholder="请选择" filterable clearable>
          <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">查询</el-button>
        <el-button @click="add" type="info">新增</el-button>
        <el-button @click="numMuban" type="info">数据模板</el-button>
        <el-button @click="delAll" type="info">批量删除</el-button>
        <el-upload
        class="upload-demo"
        ref="upload"
        :action="importFileUrl"
        name = "file"
        :data = "pageList"
        :file-list = 'fileList'
        :on-success = 'handleSuccess'
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">数据导入</el-button>
        <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
      </el-upload>
    </el-form-item>
  </el-form>

  <!--列表-->
  <template>
    <el-table :data="gridData" highlight-current-row @selection-change="handleSelectionChange" v-loading="gridLoading" class="grid">
      <el-table-column type="selection"  width="55">
      </el-table-column>
      <el-table-column label="排班时间" prop="workTime" min-width="200" sortable>
       <template scope="scope">
        {{getdate(scope.row.workTime)}}
      </template>
    </el-table-column>
    <el-table-column label="坐席" prop="userName" min-width="200" sortable>
    </el-table-column>
    <el-table-column label="上班状态" prop="work" min-width="150">
      <template scope="scope">
        {{getChannelName(scope.row.work)}}
      </template>
    </el-table-column>
    <el-table-column inline-template label="操作" min-width="200">
     <div>
      <el-button size="small" @click="check(row)">修改</el-button>
      <el-button size="small" @click="del(row)">删除</el-button>
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

        <el-dialog title="增加" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
          <el-form :model="addForm" label-position="left" label-width="100px" ref="addForm">
            <el-form-item label="排班时间" prop="startTime">
              <div class="block">
                <el-date-picker v-model="addForm.startTime" type="date" :picker-options="pickerOptions5" :editable="false" placeholder="选择日期">
                </el-date-picker> ~
                <el-date-picker v-model="addForm.endTime" type="date" :picker-options="pickerOptions6" :editable="false" placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>


            <el-form-item label="坐席" prop="userName">
              <el-select v-model="addForm.userName" placeholder="请选择" filterable clearable>
                <el-option v-for="item in thirdCompanyList" :label="item.name" :key="item.code" :value="item.name"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上班状态" prop="work">
              <el-select  filterable v-model="addForm.work" placeholder="请选择" filterable clearable>
                <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="操作人员" prop="name" >
              <el-input v-model="addForm.name" auto-complete="off" disabled ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
          </div>
        </el-dialog>


        <el-dialog title="修改" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
          <el-form :model="editForm" label-position="left" label-width="100px" ref="editForm">
            <el-form-item label="排班时间" prop="startTime">
              <div class="block">
                <el-date-picker v-model="editForm.workTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="选择日期">
                </el-date-picker>
              </div>
            </el-form-item>

            <el-form-item label="坐席" prop="userName">
              <el-input v-model="editForm.userName" auto-complete="off" ></el-input>
            </el-form-item>
            <el-form-item label="上班状态" prop="work">
              <el-select v-model="editForm.work" placeholder="请选择" filterable clearable>
                <el-option v-for="item in workList" :label="item.name" :key="item.code" :value="item.code"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="操作人员" prop="name">
              <el-input v-model="editForm.name" auto-complete="off" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFormSubmit"  :loading="editFormLoading">提 交</el-button>
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
        let compareDateone = (time, form, txt, type) => {
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
          name:'是'
        },{
          code:'0',
          name:'否'
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
              return compareDateone(time, "addForm", "endTime", "s")
            }
          },
          pickerOptions6: {
            disabledDate(time) {
              return compareDateone(time, "addForm", "startTime", "e")
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
          this.$message.success('上传成功');
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
            message: '添加成功',
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
            message: '添加成功',
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
            message: '删除成功',
            type: 'success'
          });
        } else {
          this.$message.error(response.body.message);
        }
      }, response => {})
    },

    del(row) {
      this.$confirm('确认要删除吗?', '提示', {
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
                message: '删除记录成功',
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
