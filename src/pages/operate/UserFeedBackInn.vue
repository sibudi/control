<template>
  <section>
    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item label="Nomor Ponsel">
        <el-input v-model="searchForm.mobile" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="Tanggal kirim">
        <div class="block">
          <el-date-picker v-model="searchForm.startTime" type="date" :picker-options="pickerOptions1" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker> ~
          <el-date-picker v-model="searchForm.endTime" type="date" :picker-options="pickerOptions2" :editable="false" placeholder="Pilih tanggal">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="Jenis masalah">
        <el-select v-model="searchForm.questionType" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Penyelesaian">
        <el-select v-model="searchForm.stageType" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in solutionList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="info">Cari</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="excelExport" type="info">Ekspor</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <section>
      <el-table :data="gridData" highlight-current-row border v-loading="gridLoading">
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column label="用户UUID">
          <template scope="scope">
            <span style="color: #50bfff" @click="check(scope.row)">{{scope.row.userUuid}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="Tanggal kirim" prop="createTime">
          <template scope="scope">{{getUnixTime(scope.row.createTime)}}</template>
        </el-table-column>
        <el-table-column label="Kategori Umpan balik" prop="feedBackContent">
          <template scope="scope">
            <el-popover trigger="hover" placement="right">
              <p class="hideTooMuch">{{scope.row.feedBackContent}}</p>
              <div slot="reference">
                {{miniText(scope.row.feedBackContent)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="jenis masalah" prop="questionType" min-width="100">
          <template scope="scope">{{getQuestionType(scope.row.questionType)}}</template>
        </el-table-column>
        <el-table-column label="Keterangan Lainnya" prop="remark"></el-table-column>
        <el-table-column label="Penyelesaian" width="100">
          <template scope="scope">{{getStageType(scope.row.stageType)}}</template>
        </el-table-column>
        <el-table-column label="Nama pelayan" prop="operatorName" min-width="100"></el-table-column>
        <el-table-column label="Waktu operasi" prop="updateTime">
          <template scope="scope">{{getUnixTime(scope.row.updateTime)}}</template>
        </el-table-column>
        <el-table-column label="Opsi" prop="remark" width="300">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)">Ubah</el-button>
            <el-popover trigger="hover" placement="top">
              <p class="hideTooMuch">{{scope.row.userMobile}}</p>
              <el-button size="small" @click="" slot="reference">Lihat nomor ponsel</el-button>
            </el-popover>
            <el-button size="small" @click.native.prevent="imgReview(scope.row.feedBackImages)" v-show="scope.row.feedBackImages">Lihat gambar
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <ml-photo-box ref="photoBox"></ml-photo-box>
      <!--分页-->
      <el-pagination class="pager" @current-change="pageIndexChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next, jumper"
      :total="dataTotal">
    </el-pagination>
  </section>

  <!-- 添加备注弹框 -->
  <el-dialog title="Tambahkan keterangan" v-model="editFormDigVisible" :close-on-click-modal="false" size="tiny">
    <el-form :model="addRemarkForm" ref="addRemarkForm" label-width="70px">
      <el-form-item label="Jenis masalah" prop="questionType">
        <el-select v-model="addRemarkForm.questionType" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in issueTypeList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ringkasan masalah" prop="remark">
        <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="200" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="Penyelesaian" prop="stageType">
        <el-select v-model="addRemarkForm.stageType" placeholder="Silahkan pilih" clearable>
          <el-option v-for="item in solutionList" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="" @click="editFormDigVisible = false">BATAL</el-button>
      <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">YAKIN</el-button>
    </div>
  </el-dialog>
</section>
</template>

<script>
import mlPhotoBox from '../../components/_photoBoxBack.vue'
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
export default {
  data() {
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
      searchForm: {
        mobile:'',
        startTime: '',
        endTime: '',
        questionType: '',
        stageType: ''
      },
      addRemarkForm: {
        remark: '',
        questionType: '',
        stageType: ''
      },
      issueTypeList: enums.issueTypeListInn,
      solutionList: enums.solutionListInn,
      gridLoading: false,
      gridData: [],
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      editFormDigVisible: false,
      confirmLoading: false,
      uuid: '',
      pickerOptions1: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "endTime", "s")
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return compareDate(time, "searchForm", "startTime", "e")
        }
      }
    }
  },
  methods: {
    check(row){
      window.open('#/UserDetail?&uuid='+row.userUuid);
    },
    getQuestionType(type){
      let re = '';
      this.issueTypeList.forEach(function(obj) {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
      return re
    },
    getStageType(type){
      let re = '';
      this.solutionList.forEach(function(obj) {
        if (obj.code == type) {
          re = obj.name;
          return
        }
      });
      return re
    },
    search() {
      this.pageIndex = 1;
      this.bindGrid()
    },
    pageIndexChange(val) {
      this.pageIndex = val;
      this.bindGrid()
    },
    getUnixTime(time){
      return DataUtil.formatUnixTimeInn(time);
    },
    miniText(text) {
      if (text.length > 20) {
        text = text.substr(0, 20) + '...';
      }
      return text;
    },
    excelExport(){
      window.open(Config.host + "/manage/userFeedBackExcel?sessionId="+DataUtil.sid()+"&questionType="+this.searchForm.questionType+"&stageType="+this.searchForm.stageType+"&startTime="+DataUtil.formatTime(this.searchForm.startTime)+"&endTime="+DataUtil.formatTime(this.searchForm.endTime)+"&mobile="+this.searchForm.mobile+"&sourceType=0");
    },
    handleEdit(row) {
      this.$refs.addRemarkForm&&this.$refs.addRemarkForm.resetFields();
      this.editFormDigVisible = true;
      this.uuid = row.uuid;
    },
    editFormSubmit() {
      if(!this.addRemarkForm.remark || this.addRemarkForm.remark.length > 200){
        this.$message.error("Mohon mengisi dengan benar ");
        return false;
      }
      if(!this.addRemarkForm.questionType){
        this.$message.error(" Pilih jenis masalah");
        return false;
      }
      if(!this.addRemarkForm.stageType){
        this.$message.error("Pilih cara penyelesaian ");
        return false;
      }
      let _data = Object.assign({
        uuid: this.uuid,
        operatorName: DataUtil.userName(),
        userId: DataUtil.id()
      },this.addRemarkForm);
      this.confirmLoading = true;
      this.$http.post('manage/remark2UserFeedBack',_data).then(response => {
        this.confirmLoading = false;
        let {body} = response;
        if(body.code == 1){
          this.editFormDigVisible = false;
          this.bindGrid();
        }else{
          this.$message.error(body.message);
        }
      },response => {this.confirmLoading = false;});
    },
    bindGrid() {
      let _data = Object.assign({
        pageNo: this.pageIndex,
        pageSize: 10,
        sourceType:0
      },this.searchForm,{
        startTime:DataUtil.formatTime(this.searchForm.startTime)||'',
        endTime:DataUtil.formatTime(this.searchForm.endTime)||''});

      this.gridLoading = true;
      this.$http.post('manage/userFeedBackList', _data).then((response) => {
        let {
          body
        } = response;
        if (body.code == 1) {
          this.gridLoading = false;
          this.gridData = body.data.data;
          this.dataTotal = body.data.recordsTotal;
        } else {
          this.$message.error(body.message);
        }
      }).catch((e) => {
        this.gridLoading = false;
        this.$message.error("Masalah jaringan")
      });

    },
    imgReview(row) {
        if (!row) {
          return false;
        }
        let imgArr = row.split('|');
        imgArr.forEach(function (e, i) {

           imgArr[i] = Config.imageUrl + e;
//          imgArr[i] = 'http://image.uanguang.id' + e;
        });
        this.$refs.photoBox.show(imgArr);
      }
  },
  components: {
    mlPhotoBox
  },
  mounted: function () {
    this.bindGrid();
  }
}

</script>
<style scoped>
.hideTooMuch {
  max-width: 268px;
  word-wrap: break-word;
}
</style>
