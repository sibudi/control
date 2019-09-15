<!-- 自动审核管理-新户 -->
/**
* Created by alan on 17-5-7.
*/
<template>
  <section>
    <el-row>
      <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
        <!--摇钱罐黑名单-->
        <el-tab-pane label="Daftar blacklist UangUang" name="first">
          <el-table :data=blackInfoTable highlight-current-row border stripe v-loading="blackInfoTableLoading">
            <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
            <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
            <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
            <el-table-column prop="ruleStatus" label="Status">
              <template scope="scope">
               <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
             </template>
           </el-table-column>
           <el-table-column label="Opsi">
            <template scope="scope">
              <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <!--Informasi identitas dasar配置-->
      <el-tab-pane label="Informasi identitas dasar" name="twoce">
       <el-table :data=baseIdInfoTable highlight-current-row border stripe v-loading="baseIdInfoTableLoading">
        <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
        <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
        <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
        <el-table-column prop="ruleStatus" label="Status" type="primary" style="margin-right:2px;">
         <template scope="scope">
           <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
         </template>
       </el-table-column>
       <el-table-column label="Opsi">
         <template scope="scope">
          <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <!--Kontak-->
  <el-tab-pane label="Kontak" name="three">
    <el-table :data=phoneInfoTable highlight-current-row border stripe v-loading="phoneTableLoading">
      <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
      <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
      <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
      <el-table-column prop="ruleStatus" label="Status">
        <template scope="scope">
         <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
       </template>
     </el-table-column>
     <el-table-column label="Opsi">
      <template scope="scope">
        <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
      </template>
    </el-table-column>
  </el-table>
</el-tab-pane>
<!--Riwayat panggilan-->
<el-tab-pane label="Riwayat panggilan" name="four">
  <el-table :data=tonghuaInfoTable highlight-current-row border stripe v-loading="tonghuaTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--短信记录-->
<el-tab-pane label="Riwayat" name="five">
  <el-table :data=duanxinInfoTable highlight-current-row border stripe v-loading="duanxinTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--贷款App-->
<el-tab-pane label="App" name="six">
  <el-table :data=appInfoTable highlight-current-row border stripe v-loading="appTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--设备规则-->
<el-tab-pane label="Peraturan pemasangan" name="seven">
  <el-table :data=shebeiInfoTable highlight-current-row border stripe v-loading="shebeiTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--Operator-->
<el-tab-pane label="Operator" name="eight">
  <el-table :data=yunyingInfoTable highlight-current-row border stripe v-loading="yunyingTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--手机系统-->
<el-tab-pane label="OS ponsel" name="nine">
  <el-table :data=molileInfoTable highlight-current-row border stripe v-loading="mobileTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
<!--复借规则-->
<el-tab-pane label="Pinjaman ulang" name="ten">
  <el-table :data=secondInfoTable highlight-current-row border stripe v-loading="secondTableLoading">
    <el-table-column prop="ruleDesc" label="Nama"></el-table-column>
    <el-table-column prop="ruleCondition" label="Syarat/ketentuan"></el-table-column>
    <el-table-column prop="ruleValue" label="Nilai"></el-table-column>
    <el-table-column prop="ruleStatus" label="Status">
      <template scope="scope">
       <el-tag type="primary" style="margin-right:2px;">{{getChannelNameOne(scope.row.ruleStatus)}}</el-tag>
     </template>
   </el-table-column>
   <el-table-column label="Opsi">
    <template scope="scope">
      <el-button size="small" @click.native.prevent="showCommonDig(scope.row)">Ubah</el-button>
    </template>
  </el-table-column>
</el-table>
</el-tab-pane>
</el-tabs>
</el-row>
<!--带radio单选框弹框-->
<el-dialog :title="commonRadioForm.ruleDesc" v-model="commonRadioDigVisible" :close-on-click-modal="false" size="tiny">
  <el-form :model="commonRadioForm" label-position="left" label-width="0px" :rules="commonRadioFormRule" ref="commonRadioForm">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item prop="ruleValue">
          <el-radio-group v-model="commonRadioForm.ruleValue">
            <el-radio :label="1">Ya</el-radio>
            <el-radio :label="2">Bukan</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="ruleStatus">
          <el-radio-group v-model="commonRadioForm.ruleStatus">
            <el-radio :label="1">Aktif</el-radio>
            <el-radio :label="2">Blokir</el-radio>
            <el-radio :label="3">Tester</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="">
         <el-input v-model="commonRadioForm.uuid"></el-input>
       </el-form-item>
       <el-form-item v-show="">
         <el-input v-model="commonRadioForm.ruleCondition"></el-input>
       </el-form-item>
     </el-col>
   </el-row>
 </el-form>
 <div slot="footer" class="dialog-footer">
  <el-button type="primary" @click.native.prevent="commonRadioFormSubmit" :loading="commonRadioFormLoading">Yakin</el-button>
  <el-button type="" @click="commonRadioDigVisible = false">BATAL</el-button>
</div>
</el-dialog>
<!--带输入框弹框-->
<el-dialog :title="commonForm.ruleDesc" v-model="commonFormDigVisible" :close-on-click-modal="false" size="tiny">
  <el-form :model="commonForm" label-position="left" label-width="0px" :rules="commonFormRule" ref="commonForm">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item prop="ruleValue">
          Ambang aturan/Rule threshold：<el-input v-model="commonForm.ruleValue" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="ruleRejectDay">
          Jumlah hari penolakan： <el-input v-model="commonForm.ruleRejectDay" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="ruleData">
          Kata Kunci peraturan：<el-input type="textarea"
          :rows="8" v-model="commonForm.ruleData" ></el-input>
        </el-form-item>
        <el-form-item prop="ruleStatus">
         <el-radio-group v-model="commonForm.ruleStatus">
          <el-radio :label="1">Aktif</el-radio>
          <el-radio :label="2">Blokir</el-radio>
          <el-radio :label="3">Tester</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="">
       <el-input v-model="commonForm.uuid"></el-input>
     </el-form-item>
     <el-form-item v-show="">
       <el-input v-model="commonForm.ruleCondition"></el-input>
     </el-form-item>
   </el-col>
 </el-row>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button type="primary" @click.native.prevent="commonFormSubmit" :loading="commonFormLoading">Yakin</el-button>
  <el-button type="" @click="commonFormDigVisible = false">BATAL</el-button>
</div>
</el-dialog>
<!--不带输入框弹框-->
<el-dialog :title="noInputForm.ruleDesc" v-model="noInputFormDigVisible" :close-on-click-modal="false" size="tiny">
  <el-form :model="noInputForm" label-position="left" label-width="0px" :rules="noInputFormRule" ref="noInputForm">
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form-item prop="ruleValue">
          Ambang aturan/Rule threshold：<el-input v-model="commonForm.ruleValue" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="ruleValue">
          Jumlah hari penolakan： <el-input v-model="commonForm.ruleRejectDay" :maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="ruleValue">
          Kata Kunci peraturan：<el-input type="textarea"
          :rows="8" v-model="commonForm.ruleData" ></el-input>
        </el-form-item>
        <el-form-item prop="ruleStatus">
         <el-radio-group v-model="noInputForm.ruleStatus">
          <el-radio :label="1">Aktif</el-radio>
          <el-radio :label="2">Blokir</el-radio>
          <el-radio :label="3">Tester</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="">
       <el-input v-model="noInputForm.uuid"></el-input>
     </el-form-item>
     <el-form-item v-show="">
       <el-input v-model="noInputForm.ruleCondition"></el-input>
     </el-form-item>
   </el-col>
 </el-row>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button type="primary" @click.native.prevent="noInputFormSubmit" :loading="noInputFormLoading">Yakin</el-button>
  <el-button type="" @click="noInputFormDigVisible = false">BATAL</el-button>
</div>
</el-dialog>
</section>
</template>
<script>
  //审核类型：1、基础身份证信息；2、芝麻分；3、铜盾；4、通讯录；5、审核其他、6提现、7、放款

  const notNullMsg = '请输入对比Nilai';
  const commonRule = {
    ruleValue: [{
      required: false,
      message: notNullMsg,
      trigger: 'blur',
    }],
    ruleStatus: [{
      required: false,
      message: notNullMsg,
      trigger: 'change',
      type: 'number'
    }],
    ruleRejectDay:[],
    ruleData:[]
  };

  const editUrl = 'manage/auto-review-rule';
  import DataUtil from '../../common/dataUtil'
  export default {
    data() {
      return {
        activeName2: 'first',
        baseIdInfoTableLoading: false,
        otherFormLoading: false,
        zhiMaInfoTableLoading: false,
        tongDunTableLoading: false,
        mailListTableLoading: false,
        baseIdInfoTable: [],
        zhiMaInfoTable: [],
        tongDunTable: [],
        mailListTable: [],
        otherTable: [],
        phoneInfoTable:[],
        phoneInfoTableLoading: false,
        tonghuaInfoTable:[],
        tonghuaInfoTableLoading: false,
        duanxinInfoTable:[],
        duanxinInfoTableLoading: false,
        appInfoTable:[],
        appInfoTableLoading: false,
        shebeiInfoTable:[],
        shebeiInfoTableLoading: false,
        yunyingInfoTable:[],
        yunyingInfoTableLoading: false,
        mobileInfoTable:[],
        mobileInfoTableLoading: false,
        secondInfoTable:[],
        secondInfoTableLoading: false,
        otherForm: {
          ruleStatus: 1
        },
        statuszhuangtai:[{
          code:'1',
          name:'Aktif',
        },{
          code:'2',
          name:'Blokir'
        },{
          code:'3',
          name:'Tester'
        }],

        commonRadioForm: {
          id: '',
          ruleValue: '',
          ruleStatus: '1',
          ruleCondition: '',
          ruleRejectDay:'',
          ruleData:''
        },
        commonRadioFormLoading: false,
        commonRadioDigVisible: false,
        commonRadioFormRule: {
          ruleValue: [{
           required: false,
           message: notNullMsg,
           trigger: 'change',
           type: 'number'
         }],
         ruleStatus: [{
           required: false,
           message: notNullMsg,
           trigger: 'change',
           type: 'number'
         }],
         ruleRejectDay:[],
         ruleData:[]
       },

       commonForm: {
        id: '',
        ruleValue: '',
        ruleStatus: '1',
        ruleCondition: '',
        ruleRejectDay:'',
        ruleData:'',
        ruleRejectDay:'',
        ruleData:''

      },
      commonFormRule: commonRule,
      commonFormLoading: false,
      commonFormDigVisible: false,

      noInputForm: {
        id: '',
        ruleValue: '',
        ruleStatus: '1',
        ruleCondition: '',
        ruleRejectDay:'',
        ruleData:''
      },
      noInputFormRule: commonRule,
      noInputFormLoading: false,
      noInputFormDigVisible: false,

      otherTableLoading: false,
      otherFormRules: {

      },
      blackListTableLoading: false,
      blackListTable: []
    }
  },
  methods: {
    handleClick() {

    },
    resetForm(formName) {
     this.$refs[formName].resetFields();
   },
   showCommonDig(row) {
     let {
      ruleDesc,
      ruleValue,
      ruleStatus,
      uuid,
      ruleCondition,
      type,
      ruleRejectDay,
      ruleData
    } = row;
    let tmp = row;
    ({...tmp
    } = {
      ruleValue,
      ruleStatus,
      uuid,
      ruleCondition,
      ruleDesc,
      ruleRejectDay,
      ruleData
    });
    switch (type) { /*黑名单tab页弹框判断，黑名单列弹框禁止UbahSyarat/ketentuan*/
      case 5:
      (!DataUtil.isNumber(ruleValue)) ? this.commonShowDig("commonFormDigVisible") : this.commonShowDig("noInputFormDigVisible");
      (!DataUtil.isNumber(ruleValue)) ? this.putData2Dig("commonForm", tmp) : this.putData2Dig("noInputForm", tmp);
      return false;
      break;
    }
    switch (ruleDesc) {
      case "学籍认证失败YaBukan拒单":
      case "命中芝麻行业关注名单":
      this.commonShowDig("commonRadioDigVisible");
      tmp.ruleValue = Number(tmp.ruleValue);
      this.putData2Dig('commonRadioForm', tmp);
      break;
      default:
      this.commonShowDig("commonFormDigVisible");
      this.putData2Dig('commonForm', tmp);
      break;
    }
  },

  commonRadioFormSubmit() {
   let param = Object.assign({}, this.commonRadioForm);
   console.log(param);
   this.commonSubmit('commonRadioForm', 'commonRadioFormLoading', 'commonRadioDigVisible', editUrl, param);
 },

 commonFormSubmit() {
   let param = Object.assign({}, this.commonForm);
   console.log(param);
   this.commonSubmit('commonForm', 'commonFormLoading', 'commonFormDigVisible', editUrl, param);
 },

 noInputFormSubmit() {
   let param = Object.assign({}, this.noInputForm);
   this.commonSubmit('noInputForm', 'noInputFormLoading', 'noInputFormDigVisible', editUrl, param);
 },
 formatRadioruleValue(row, index) {
   switch (row.ruleDesc) {
    case "学籍认证失败YaBukan拒单":
    case "命中芝麻行业关注名单":
    return (row.ruleValue == 1 ? 'Ya' : 'Bukan');
    break;
    default:
    return row.ruleValue;
    break;
  }
},
getChannelNameOne(type) {
 let re = '';
 this.statuszhuangtai.forEach(obj => {
  if (obj.code == type) {
    re = obj.name;
    return
  }
});
 return re
},

putData2Dig(formName, row) {
 this[formName] = row;
},

formatCommonForm() {
 this.commonForm.ruleValue = DataUtil.keepDecimal(event.target.ruleValue);
},

      //请求列表数据接口
      commonTableData(url, loadName, tableName, param) {
        this[loadName] = true;
        this.$http.post(url, param).then((response) => {
          this[loadName] = false;
          let {
            body
          } = response;
          if (1 == body.code) {
            this[tableName] = body.data;
          } else {
            this.$message.error(body.message);
          }
        }).catch((e) => {
          this[loadName] = false;
          // this.$message.error(" jaringan bermasalah");
        })
      },
      //黑名单信息table
      blackInfoAjax() {
        this.commonTableData('manage/auto-review-rules', 'blackIdInfoTableLoading', 'blackInfoTable', {ruleType: 1});
      },

      //基础信息table
      baseInfoAjax() {
        this.commonTableData('manage/auto-review-rules', 'baseIdInfoTableLoading', 'baseIdInfoTable', {ruleType: 2});
      },
      //Kontaktable
      phoneAjax() {
        this.commonTableData('manage/auto-review-rules', 'phoneInfoTableLoading', 'phoneInfoTable', {ruleType: 3});
      },
      //Riwayat panggilan
      tonghuaAjax() {
        this.commonTableData('manage/auto-review-rules', 'tonghuaInfoTableLoading', 'tonghuaInfoTable', {ruleType: 4});
      },
      //短信记录
      duanxinAjax() {
        this.commonTableData('manage/auto-review-rules', 'duanxinInfoTableLoading', 'duanxinInfoTable', {ruleType: 5});
      },
      //贷款App
      AppAjax() {
        this.commonTableData('manage/auto-review-rules', 'appInfoTableLoading', 'appInfoTable', {ruleType: 6});
      },
      //设备规则
      shebeiAjax() {
        this.commonTableData('manage/auto-review-rules', 'shebeiInfoTableLoading', 'shebeiInfoTable', {ruleType: 7});
      },
        //Operator
        yunyingAjax() {
          this.commonTableData('manage/auto-review-rules', 'yunyingInfoTableLoading', 'yunyingInfoTable', {ruleType: 8});
        },
         //手机系统
         mobileAjax() {
          this.commonTableData('manage/auto-review-rules', 'mobileInfoTableLoading', 'mobileInfoTable', {ruleType: 9});
        },
        //复借规则
         secondAjax() {
          this.commonTableData('manage/auto-review-rules', 'secondInfoTableLoading', 'secondInfoTable', {ruleType: 20});
        },
        allInfoAjax() {
         this.blackInfoAjax();
         this.baseInfoAjax();
         this.phoneAjax();
         this.tonghuaAjax();
         this.duanxinAjax();
         this.AppAjax();
         this.shebeiAjax();
         this.yunyingAjax();
         this.mobileAjax();
         this.secondAjax();
       },


      //展示弹框
      commonShowDig(visible) {
        this[visible] = true;
      },
      //提交数据
      commonSubmit(formName, loadName, visible, url, formData) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this[loadName] = true;

            this.$http.post(url, formData).then(response => {
              this[loadName] = false;
              let {
                body
              } = response;
              if (1 == body.code) {
                console.log(body.code);
                this[visible] = false;
                this.$message({
                  message: 'Berhasil merubah',
                  type: 'success'
                });
                this.allInfoAjax();
              } else {
                this.$message.error(body.message);
              }
            }).catch((e) => {
              this.$message.error(" jaringan bermasalah");
              this[loadName] = false;
            });

          } else {
            return false;
          }
        })
      }
    },
    mounted() {
     this.allInfoAjax();
   }
 }

 </script>
