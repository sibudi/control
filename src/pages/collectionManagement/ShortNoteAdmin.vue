<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="success">添加模板</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <template>
      <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column prop="smsTemplateId" label="模板ID" width="150">
        </el-table-column>
        <el-table-column label="标题">
          <template scope="scope">
            <el-tooltip effect="dark" placement="bottom-start">
              <div slot="content">
                <p style='min-width:130px;'>{{scope.row.smsTitle}}</p>
              </div>
              <span>{{sortsmsTitle(scope.row.smsTitle)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="内容">
          <template scope="scope">
            <el-tooltip effect="dark" placement="bottom-start">
              <div slot="content">
                <p style='max-width:500px;'>{{scope.row.smsContent}}</p>
              </div>
              <span>{{sortsmsContent(scope.row.smsContent)}}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row,1)">编辑</el-button>
            <el-button size="small" @click="edit(scope.row,2)">删除</el-button>
          </template>
        </el-table-column>
        <div class="higer"></div>
      </el-table>
      <el-pagination class="pager" @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="dataTotal">
    </el-pagination>
  </template>
  <!--添加-->
  <el-dialog title="增加模板" v-model="addDialogVisible" :close-on-click-modal="false" size="small">
    <el-form :model="addForm" label-position="left" label-width="100px" :rules="inputRule" ref="addForm">
      <!-- <el-form-item label="模板ID" prop="smsTemplateId">
        <el-input v-model="addForm.smsTemplateId" auto-complete="off" :maxlength="20"></el-input>
      </el-form-item> -->
      <el-form-item label="短信标题" prop="smsTitle">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.smsTitle" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="短信内容" prop="smsContent">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="addForm.smsContent" :maxlength="1000"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addFormSubmit" :loading="addFormLoading">提 交</el-button>
    </div>
  </el-dialog>
  <!--修改-->
  <el-dialog title="修改模板" v-model="editDialogVisible" :close-on-click-modal="false" size="small">
    <el-form :model="editForm" label-position="left" label-width="100px" :rules="inputRule" v-loading="editFormInit" ref="editForm">
      <el-form-item label="模板ID" prop="smsTemplateId">
        <el-input v-model="editForm.smsTemplateId" auto-complete="off" :maxlength="20" disabled></el-input>
      </el-form-item> 
      <el-form-item label="短信标题" prop="smsTitle">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.smsTitle" :maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item label="短信内容" prop="smsContent">
        <el-input type="textarea" :autosize="{minRows: 2,maxRows: 4}" v-model="editForm.smsContent" :maxlength="1000"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editFormSubmit" :loading="editFormLoading">提 交</el-button>
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
        callback(new Error('至少选择一项'))
      }
      callback()
    }
    return {
      tempId:'',
      permissionListInit: false,
      permissionList: [],
      pageIndex: this.$store.getters.getUserListIndex,
      pageSize: 10,
      dataTotal:0,
        //Grid
        gridLoading: false,
        gridData: [],
        //Form
        addForm: {
          smsTemplateId: '',
          smsTitle: '',
          smsContent: '',
        },
        editForm: {
          smsTemplateId: '',
          smsTitle: '',
          smsContent: '',
        },
        inputRule: {
          smsTemplateId: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }],
          permissionObj: [{
            validator: checkPermission,
            trigger: 'change'
          }],
          smsTitle:[{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          smsContent:[{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }]
        },
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
      edit(row,type) {
        this.tempId = row.id;
        if (type == 1) {
          this.editDialogVisible = true;
         this.editForm = row;
        } else if (type == 2) {
          this.$confirm('确认要删除模板吗?', '提示', {
            type: 'warning'
          }).then(() => {
            let _data = {
              id: row.id,
            }
            this.$http.post('manage/smsTemplate/deleteSmsTemp', _data).then(response => {
              if (1 == response.body.code) {
                this.bindGrid();
                this.$message({
                  message: '删除成功',
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
              smsTitle: this.addForm.smsTitle,
              smsContent: this.addForm.smsContent,
            }
            this.addFormLoading = true
            this.$http.post("manage/smsTemplate/insertOrUpdateSmsTemp", _data).then(response => {
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
              id: this.tempId,
              smsTemplateId: this.editForm.smsTemplateId,
              smsTitle: this.editForm.smsTitle,
              smsContent: this.editForm.smsContent,
            }
            this.editFormLoading = true
            this.$http.post("manage/smsTemplate/insertOrUpdateSmsTemp", _data).then(response => {
              this.editFormLoading = false
              if (1 == response.body.code) {
                this.editDialogVisible = false
                this.bindGrid()
                this.$message({
                  message: '修改成功',
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
        this.$http.post('manage/smsTemplate/smsTemplateList', _data).then(response => {
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
      this.bindGrid()
    }
  }

  </script>
