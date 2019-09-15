/**
* Created by tonggen on 2017/1/7.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">订单状态</div>
      <el-col :span="8" class="grid-content">
        <div><span>订单编号:</span><span>{{ uuid }}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
<el-row>
  <h1 class="one-title">订单备注</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="300">
    <el-table-column type="index" label="序号" width="70">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="120">
      <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="operator" label="操作员" width="80">
    </el-table-column>
    <el-table-column prop="contactMobile" label="联系号码" width="80">
    </el-table-column>
    <el-table-column prop="contactMode" label="联系方式" width="120">
      <template scope="scope">{{getprovs(scope.row.contactMode)}}</template>
    </el-table-column>
    <el-table-column prop="contactResult" label="状态" width="80">
      <template scope="scope">{{getcitys(scope.row.contactResult)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" width="200" >
    </el-table-column>
    <el-table-column prop="orderTag" label="标签" width="100">
      <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
    </el-table-column>
    <el-table-column prop="alertTime" label="下次提醒时间" width="100">
      <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
    </el-table-column>
    <el-table-column prop="promiseRepaymentTime" label="承诺时间" width="100">
      <template scope="scope">{{formatUnixTime(scope.row.promiseRepaymentTime)}}</template>
    </el-table-column>
  </el-table>

</el-row>
<div class="divid-line"></div>

<!-- 添加备注 -->
<el-row>
  <h1 class="one-title">备注质检模块</h1>
  <el-form :model="qualityForm" ref="qualityForm" label-width="100px">
    <el-form-item label="质检标签" prop="remark">
      <el-select v-model="qualityForm.checkTag" placeholder="请选择" clearable>
        <el-option v-for="item in thirdCompanyList" :label="item.title" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item><br>
    <el-form-item label="填写备注" prop="remark">
      <el-input type="textarea" v-model="qualityForm.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="search" type="info">提交</el-button>
    </el-form-item>
  </el-form>
</el-row>
<div class="divid-line"></div>
<el-row>
  <h1 class="one-title">语音质检备注模块</h1>
  <el-form :model="qualityFormV" ref="qualityFormV" label-width="100px">
    <el-form-item label="质检标签" prop="remark">
      <el-select v-model="qualityFormV.checkTag" placeholder="请选择" clearable>
        <el-option v-for="item in thirdCompanyListVoice" :label="item.title" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item><br>
    <el-form-item label="填写备注" prop="remark">
      <el-input type="textarea" v-model="qualityFormV.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="searchVoice" type="info">提交</el-button>
    </el-form-item>
  </el-form>
</el-row>
<div class="divid-line"></div>
</section>
</template>
<script>
import mlPhotoBox from '../../components/_photoBox.vue'
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
import { videoPlayer } from 'vue-video-player'
import ElRow from "element-ui/packages/row/src/row";

export default {
  components: {
    ElRow,
    mlPhotoBox,
    videoPlayer
  },
  data () {
    let compareDate = (time) => {
      let _time = time.setDate(time.getDate()+1);
      return time.getTime() <= Date.now();
    };
    return {
      addForm:{
        contactMode:'',
        contactResult:'',
        tema:'',
        remark:''
      },
      qualityForm:{
       remark:'',
       checkTag:''
     },
     qualityFormV:{
       remark:'',
       checkTag:''
     },
     thirdCompanyList: [],
     thirdCompanyListVoice: [],
     contactmanage:true,
     contactmanage1:true,
     contactmanage2:true,
     contactmanage3:true,
     contactmanage4:true,
     smsContent:' ',
     onececontent:'一键发送短信',
     totalTime: 10,
     canClick: true,
     D0CollectionSmsShow: true,
     provs: [{
      name: '电话',
      code: '2',
      pro:'电话'
    },{
      name: 'WA',
      code: '1',
      pro:'WA'
    },{
      name: '短信',
      code: '3',
      pro:'短信'
    },{
      name: '其他',
      code: '4',
      pro:'其他'
    }],
    contactType: 0,
    selectedOptions: [],
    SJList:[{
      name:'通话频次前30',code:'CALL_RECORD_TOP_30'
    },{
      name:'通话频次前20',code:'CALL_RECORD_TOP_20'
    },{
      name:'通话频次前10',code:'CALL_RECORD_TOP_10'
    },{
      name:'通话频次前5',code:'CALL_RECORD_TOP_5'
    }],
    SJListD0:[{
      name:'通话频次前5',code:'CALL_RECORD_TOP_5'
    }],
    notdzero:false,
    isdzero:true,
    tagList:[{
      name:'完全失联',code:1
    },{
      name:'暂时失联',code:2
    },{
      name:'可联跳票',code:3
    },{
      name:'可联承诺',code:4
    }],
    mobilecon:[{
      name:'可接通',code:1
    },{
      name:'不可接通',code:2
    },{
      name:'不确定',code:3
    }],
    pickerTimeOptions: {
      start: '00:00',
      end: '23:00',
      step: '01:00'
    },
    pickerOptions: {
      disabledDate(time) {
        return compareDate(time)
      }
    },
      totalLinkMan: 0,//通讯录个数
      historyLoading: false,
      oneceSms: false,
      orderRemarkList:[], //订单备注
      SmSDataLoading: false,
      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          collectionFlag:''
        },
        numMobile:'',
        baseMobileList: {
         callResult:'',
         contactResultPhone:'',
         contactResultSms:'',
         contactResultWA:'',
         mobile:'',
         realName:''
       },
       baseMobileListone: {
         callResult:'',
         contactResultPhone:'',
         contactResultSms:'',
         contactResultWA:'',
         mobile:'',
         realName:''
       },
       baseMobileListtwo: {
         callResult:'',
         contactResultPhone:'',
         contactResultSms:'',
         contactResultWA:'',
         mobile:'',
         realName:''
       },
       getlinkmanList:{
         callResult:'',
         contactResultPhone:'',
         contactResultSms:'',
         contactResultWA:'',
         mobile:'',
         realName:''
       },
       linkmanList:{
         callResult:'',
         contactResultPhone:'',
         contactResultSms:'',
         contactResultWA:'',
         mobile:'',
         realName:''
       },
        status: '', //审核结果
        remark: '', //审核意见

        textarea: '',
        totalLinkMan: 0,//通讯录个数
        promiseRepaymentTime:'',
        facePhotoUrls:'',
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        //baseInf 客户基本信息

        // 基本信息
        baseInfList: {},
        historyData: [],
        SmSData:[],
        jobInfList: {},
        connectInfList: [],
        cardbackInfList:{},//银行卡信息

        // radio显示
        baseInfShow: true,
        payDayList:[],
        jobInfShow: true,
        connectInfShow: true,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        orderRemarkLoading: false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        ddzhuangtai : [{
          code: 'SUBMITTING',
          name: '待提交',
          value:'1'
        }, {
          code: 'MACHINE_CHECKING',
          name: '待机审',
          value:'2'
        }, {
          code: 'FIRST_CHECK',
          name: '初审',
          value:'3'
        },{
          code: 'SECOND_CHECK',
          name: '复审',
          value:'4'
        },{
          code: 'LOANING',
          name: '待放款',
          value:'5'
        }, {
          code: 'LOANING_DEALING',
          name: '放款处理中',
          value:'6'
        }, {
          code: 'RESOLVING_NOT_OVERDUE',
          name: '待还款（未逾期)',
          value:'7'
        },{
          code: 'RESOLVING_OVERDUE',
          name: '待还款（已逾期）',
          value:'8'
        }, {
          code: 'RESOLVED_DEALING',
          name: '还款处理中',
          value:'9'
        }, {
          code: 'RESOLVED_OVERDUE',
          name: '正常已还款',
          value:'10'
        },{
          code: 'RESOLVED_OVERDUE',
          name: '逾期已还款',
          value:'11'
        },{
          code: 'MACHINE_CHECK_NOT_ALLOW',
          name: '机审不通过',
          value:'12'
        }, {
          code: 'FIRST_CHECK_NOT_ALLOW',
          name: '初审不通过',
          value:'13'
        }, {
          code: 'SECOND_CHECK_NOT_ALLOW',
          name: '复审不通过',
          value:'14'
        }, {
          code: 'quxiao',
          name: '取消',
          value:'15'
        }, {
          code: 'LOAN_FAILD',
          name: '打款失败',
          value:'16'
        }, {
          code: 'WAIT_CALLING',
          name: '等待外呼',
          value:'17'
        } ,{
          code: "WAITING_CALLING_AFTER_FIRST_CHECK",
          name: "初审后等待外呼",
          value:'18'
        },{
          code: "WAITING_CONFIRM",
          name: "降额后等待用户确认",
          value:'19'
        },{
        code: "WAITING_SIGN_CONTRACT",
        name: "待签约",
        value:'20'
      }],
        qingkuanglist : [{
          code: '0',
          name: '在校'
        }, {
          code: '1',
          name: '在家住'
        }, {
          code: '2',
          name: '在外租住'
        }],
        titys:[{
          prov: "2",
          name: "接通,承诺还款",
          code:"1"
        }, {
          prov: "2",
          name: "接通,可联系跳票",
          code:"2"
        }, {
          prov: "2",
          name: "空号",
          code:"3"
        }, {
          prov: "2",
          name: "拒接",
          code:"4"
        }, {
          prov: "2",
          name: "无人接听，通话中",
          code:"5"
        }, {
          prov: "2",
          name: "关机",
          code:"6"
        }, {
          prov: "2",
          name: "停机",
          code:"7"
        }, {
          prov: "2",
          name: "其他",
          code:"8"
        }, {
          prov: "1",
          name: "无WA账号",
          code:"9"
        }, {
          prov: "1",
          name: "已发，未看",
          code:"10"
        }, {
          prov: "1",
          name: "看了，未回复",
          code:"11"
        }, {
          prov: "1",
          name: "看了，可联跳票",
          code:"12"
        }, {
          prov: "1",
          name: "看了，承诺还款",
          code:"13"
        }, {
          prov: "1",
          name: "屏蔽",
          code:"14"
        }, {
          prov: "1",
          name: "其他",
          code:"15"
        },{
          prov: "3",
          name: "已发，未回",
          code:"16"
        },{
          prov: "3",
          name: "已发，承诺还款",
          code:"17"
        },{
          prov: "3",
          name: "已发，可联跳票",
          code:"18"
        },{
          prov: "3",
          name: "未发送",
          code:"19"
        },{
          prov: "3",
          name: "发送不成功",
          code:"20"
        },{
          prov: "3",
          name: "其他",
          code:"21"
        },{
          prov: "4",
          name: "进行详情备注，通过什么方式联系，具体详情备注",
          code:"22"
        }],
        titleList:[],
        dialogVisible1:false,
        citys: [],
        promiseRepaymentTime:'',
        isActive:true,
        noActive:false,
        linkData: [],//通讯录
        dialogTableVisible: false,
        isTrueMXCall:false,
        workerSeen: true,
        studentSeen: false,
        addDialogVisible: false,
        familySeen: false,
        moxieCallLogDialog: false,
        moxieCallLogLoading: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        active: 2,
        videoShowOrNot: true,
        orderProData: '',
        addRemarkForm:{
          remark:'',
        },  //订单备注
        addRemarkRule:{},
        linkLoading: false,
        tagForm:{
          payDay:'',
          orderTag:'',
          remindTime: '',
          remindDate: '',
          // promiseRepaymentTime:'',
          promiseTime: '',
          promiseDate: '',
          contactMode:'',
          contactType:'',
          contactResult:''
        },
        searchForm:{
         // collectionSmsType:'CALL_RECORD_TOP_20',
         collectionSmsType:'',

         smsTitle:'',
         smsTemplateId:'',
       },
            //订单标签
            tagFormLoading:false,
            smsFormLoading:false,

          }
        },
        methods: {
          titlenex() {
            this.titleList.forEach(obj => {

              if (obj.smsTemplateId == this.searchForm.smsTemplateId) {
                this.smsContent = obj.smsContent;
                return
              }
            });

          },
          getRealdate(dates) {
            if (!dates) {
              return ''
            }
            var myDate = new Date(dates);
      // myDate.setUTCHours(10);
      // return myDate.toLocaleString(); //获取日期与时间
      let minute=myDate.getMinutes();
      if(minute<10){
        minute="0"+minute;
      }
      let seconds=myDate.getSeconds()
      if(seconds<10){
        seconds="0"+seconds;
      }
      return myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+minute+":"+seconds
    },
    gettitleList() {
      let _data = Object.assign({
        orderNo:this.uuid,
        userUuid:this.userUuid
      }, this.searchForm);
      this.$http.post('manage/collection/getAllSmsTemplate',_data).then(response => {
        let {body} = response;
        if(body.code == 1){
          this.titleList  = body.data;
          // this.smsContent = body.data.smsContent;

        }else{
          this.titleList = [];
        }
      },response => {});
    },
    SmsFor() {
      this.oneceSms=true;
      if (!this.canClick) return
       this.canClick = false
     this.onececontent = this.totalTime + 's后重新发送'
     let clock = window.setInterval(() => {
      this.totalTime--
      this.onececontent = this.totalTime + 's后重新发送'
      if (this.totalTime < 0) {
       window.clearInterval(clock)
       this.onececontent = '再次发送短信'
       this.totalTime = 10
       this.oneceSms=false;
   this.canClick = true  //这里重新开启
 }
},1000)
     if (!this.searchForm.smsTemplateId) {
      this.$message("请选择短信标题");
      return;
    }
    let _data = Object.assign({
      orderNo:this.uuid,
      userUuid:this.userUuid,
      collectionLevel: this.orderStatus.collectionLevel
    }, this.searchForm);
    this.smsFormLoading = true;
    this.$http.post('manage/collection/sendCollectionSms',_data).then(response => {
      if(response.body.code == 1 && response.body.data){
        this.$message("发送中");
        this.smsFormLoading = false;

      }else{
        this.$message.error(response.body.message);
        this.gettitleList();
      }
    },response => {});
  },
  rowClick(row){
    window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
      '&uuid='+row.uuid);
  },
  getdate(dates) {
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
      searcher() {
        if (this.isActive) {
         this.isActive=false;
         this.noActive=true;
         return;
       }
       if (!this.isActive) {
         this.isActive=true;
         this.noActive=false;
       }


     },
     getProv(prov){
      let tempCity=[];
      this.citys=[];
      this.selectCity='';
      let allCity=[{
        prov: "2",
        name: "接通,承诺还款",
        code:"1"
      }, {
        prov: "2",
        name: "接通,可联系跳票",
        code:"2"
      }, {
        prov: "2",
        name: "空号",
        code:"3"
      }, {
        prov: "2",
        name: "拒接",
        code:"4"
      }, {
        prov: "2",
        name: "无人接听，通话中",
        code:"5"
      }, {
        prov: "2",
        name: "关机",
        code:"6"
      }, {
        prov: "2",
        name: "停机",
        code:"7"
      }, {
        prov: "2",
        name: "其他",
        code:"8"
      }, {
        prov: "1",
        name: "无WA账号",
        code:"9"
      }, {
        prov: "1",
        name: "已发，未看",
        code:"10"
      }, {
        prov: "1",
        name: "看了，未回复",
        code:"11"
      }, {
        prov: "1",
        name: "看了，可联跳票",
        code:"12"
      }, {
        prov: "1",
        name: "看了，承诺还款",
        code:"13"
      }, {
        prov: "1",
        name: "屏蔽",
        code:"14"
      }, {
        prov: "1",
        name: "其他",
        code:"15"
      },{
        prov: "3",
        name: "已发，未回",
        code:"16"
      },{
        prov: "3",
        name: "已发，承诺还款",
        code:"17"
      },{
        prov: "3",
        name: "已发，可联跳票",
        code:"18"
      },{
        prov: "3",
        name: "未发送",
        code:"19"
      },{
        prov: "3",
        name: "发送不成功",
        code:"20"
      },{
        prov: "3",
        name: "其他",
        code:"21"
      },{
        prov: "4",
        name: "进行详情备注，通过什么方式联系，具体详情备注",
        code:"22"
      },{
        prov: "2",
        name: "接通，同意转告",
        code:"23"
      },{
        prov: "2",
        name: "接通，不同意转告",
        code:"24"
      },{
        prov: "2",
        name: "接通，不认识/已离职/无此人",
        code:"25"
      }];
      for (var val of allCity){
        if (prov == val.prov){
          console.log(val);
          tempCity.push({name: val.name, value: val.code,key:val.code})
        }
      }
      this.citys = tempCity;
    },

      getOrderPro(val) {//订单进度
        return enums.getOrderPro(val)
      },
      // 通讯录信息按钮
      addressBook(){
        this.dialogTableVisible = true;
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      formatUnixTime(time){
        return DataUtil.formatUnixTime(time);
      },
      facePhotoUrlClick(){
        if(this.facePhotoUrls){
          let _photoList = [
          this.facePhotoUrls
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      handIdCardUrlClick(){
        if(this.baseInfList.handIdCardUrl){
          let _photoList = [
          this.baseInfList.handIdCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      idCardUrlClick(){
        if(this.baseInfList.idCardUrl){
          let _photoList = [
          this.baseInfList.idCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      addRoot(mobile, contactType) {
        this.numMobile=mobile;
        this.addDialogVisible = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = '0';
        this.contactType = contactType;
      },
      getContractType(type) {
        if (type == '0') {
          return '未接';
        }
        if (type == '1') {
          return '打入';
        }
        if (type == '2') {
          return '打出';
        }
      },
      getBaseMobile(){
       let _data={
        "type":1,
        "userUuid": this.userUuid,
        "orderNo":this.uuid,
      }
      this.$http.post("manage/getBaseMobile", _data).then(response => {
        if (1 == response.body.code && response.body.data) {
         this.baseMobileList=response.body.data;
       }

     })
    },
    getBaseMobileone(){
     let _data={
      "type":2,
      "userUuid": this.userUuid,
      "orderNo":this.uuid,
    }
    this.$http.post("manage/getBaseMobile", _data).then(response => {
      if (1 == response.body.code && response.body.data) {
       this.baseMobileListone=response.body.data;
     }

   })
  },
  getBaseMobiletwo(){
   let _data={
    "type":3,
    "userUuid": this.userUuid,
    "orderNo":this.uuid,
  }
  this.$http.post("manage/getBaseMobile", _data).then(response => {
    if (1 == response.body.code && response.body.data) {
     this.baseMobileListtwo=response.body.data;
   }

 })
},
tijiaofor(){

  let contactType = 0;
  if (this.contactType == 1) {
    if (this.addForm.contactMode == 2) {
      contactType = 1;
    } else if (this.addForm.contactMode == 1) {
      contactType = 2;
    }
  } else {
    contactType = this.contactType;
  }

  let _data = Object.assign({
    "userUuid":this.userUuid,
    "orderNo":this.uuid,
    "contactType": contactType,
    "contactMobile":this.numMobile,
    createUser: DataUtil.id(),
    updateUser: DataUtil.id(),
  },
  this.addForm);
  this.$http.post("manage/insertManCollectionRemark", _data).then(response => {
    if (1 == response.body.code && response.body.data) {
      this.addDialogVisible = false;
      this.$message("提交成功");
      this.getBaseMobile();
      this.getBaseMobileone();
      this.getBaseMobiletwo();
      this.getlinkman();
      this.copygetlinkman();
      this.getRemarkList();
      this.addForm.contactMode='';
      this.addForm.contactResult='';
    }else{
      this.$message.error(response.body.message);
    }

  })
},

getlinkman(){
 let _data={
  "userUuid": this.userUuid,
  "orderNo":this.uuid,
}
this.$http.post("manage/listUserMobileContract", _data).then(response => {
  if (1 == response.body.code && response.body.data) {
   this.getlinkmanList=response.body.data;
 }

})
},
copygetlinkman(){
 let _data={
  "userUuid": this.userUuid,
  "orderNo":this.uuid,
}
this.$http.post("manage/listBaseMobileOnOtherContract", _data).then(response => {
  if (1 == response.body.code && response.body.data) {
   this.linkmanList=response.body.data;
 }

})
},
    //当前订单状态
    getOrderStatus(){
      let _data={
        "uuid": this.uuid,
      }
      this.$http.post("manage/orderInfoByUuid", _data).then(response => {
        if (1 == response.body.code && response.body.data) {
          this.orderStatus=response.body.data;
          if (this.orderStatus.intoOrdFlag == '1') {
            this.videoShowOrNot = false;
          }
          if(this.orderStatus
            .collectionLevel =="D0"){
            this.notdzero = false;
          this.isdzero = true;
        }else{
          this.notdzero = true;
          this.isdzero = false;
        }
        this.orderStatus.createTime=this.getdate(this.orderStatus.createTime);
        if(this.orderStatus.userRole==1){
          this.workerSeen=false;
          this.studentSeen=true;
          this.familySeen=false;
        }else if(this.orderStatus.userRole==2){
          this.workerSeen=true;
          this.studentSeen=false;
          this.familySeen=false;
        }else{
          this.workerSeen=false;
          this.studentSeen=false;
          this.familySeen=true;
        }

        this.judgeCollectionSmsShowOrNot();
        this.judgeContactShowOrNot();
        this.getBaseInf(this.userUuid,3);
        this.getBaseInf(this.userUuid,4);
        this.getBaseInf(this.userUuid,5);
        this.getBaseInf(this.userUuid,6);
        this.getBaseInf(this.userUuid,7);

        this.addreBook();
        this.getTop20ContactList();
      }
    })
    },
    getOrderTypeone(val){
      let re = '';
      this.qingkuanglist.forEach(function (obj) {
        if(obj.code == val){
          re = obj.name;
          return;
        }
      });
      return re;
    },
    getTop20ContactList(channel) {
         this.$http.post("manage/orderUserCallRecordMongoByUuid",{uuid:this.userUuid,dataType:1,orderNo:this.uuid,channel:channel}).then((response) =>{   //通话记录
          let {body} = response;
          if(1 == body.code && body.data){
            try{
              let result = body.data;
              if(result){
                this.isTrueMXCall = false;
              }
              this.moxieCallLogData = result;
            }catch (e){}
          }
        })
       },
       getOrderType(type) {
         let re = '';
         this.ddzhuangtai.forEach(obj => {
          if (obj.value == type) {
            re = obj.name;
            return
          }
        });
         return re
       },

       getprovs(type) {
         let re = '';
         this.provs.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
         return re
       },
       getOrderTag(type) {
        let re = '';
        this.tagList.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      getmobilecon(type) {
        let re = '';
        this.mobilecon.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },

      getcitys(type) {
        let re = '';
        this.titys.forEach(obj => {
          if (obj.code == type) {
            re = obj.name;
            return
          }
        });
        return re
      },
      //获取历史订单
      getHistoryDetail(){
        let _data={
          "uuid": this.userUuid
        }
        this.historyLoading=true;
        this.$http.post("manage/orderHistoryListByUserUuid", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            let data=response.body.data;
            let i=0;
            data.forEach(e=>{
              e.borrowingCount=data.length-i;
              i++;
            })
            this.historyData=data;
          }

        })
      },
      getCollectionList() {
        this.$http.post('manage/qualityCheck/listQualityCheckConfigs',{pageNo:1,pageSize:1000}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyList = body.data.data;
          }else{
            this.thirdCompanyList = [];
          }
        },response => {});
      },
      getCollectionListVoice() {
        this.$http.post('manage/qualityCheck/listQualityCheckConfigs',{pageNo:1,pageSize:1000,type:1}).then(response => {
          let {body} = response;
          if(body.code == 1){
            this.thirdCompanyListVoice = body.data.data;
          }else{
            this.thirdCompanyListVoice = [];
          }
        },response => {});
      },
      search() {
        let _data = Object.assign({
         "orderNo":this.uuid,
         "userUuid": this.userUuid
       }, this.qualityForm);
        this.$http.post('manage/qualityCheck/insertQualityCheckRecord', _data).then(response => {
          this.$message("提交成功");
        });
      },
      searchVoice() {
        let _data = Object.assign({
         "orderNo":this.uuid,
         "userUuid": this.userUuid,
         "type":1
       }, this.qualityFormV);
        this.$http.post('manage/qualityCheck/insertQualityCheckRecord', _data).then(response => {
          this.$message("提交成功");
        });
      },
      bindGrid(){
       let _data = Object.assign({
         "orderNo":this.uuid,
         "userUuid": this.userUuid
       }, this.qualityForm);
       this.$http.post('manage/qualityCheck/insertQualityCheckRecord', _data).then(response => {
        this.$message("提交成功");
      });
     },


      // 短信
      getSMSDetail(){
        let _data={
          "orderNo": this.uuid
        }
        this.SmSDataLoading=true;
        this.$http.post("manage/collection/getCollectSmsRecordList", _data).then(response => {
          this.SmSDataLoading = false;
          if (1 == response.body.code && response.body.data) {
            let data=response.body.data;
            let i=0;
            this.SmSData=data;
          }

        })
      },
      handleChange(value) {
        console.log(value);
      },
      //获取银行卡状态
      getBankStatus(val) {
        return enums.getBankStatus(val);
      },
      getOrderType(type){
        return enums.getOrderPro(type);
      },
      //枚举订单状态
      getenums(val){
        let re = '';
        enums.orderPro.forEach(function(obj) {
          if (obj.code == val) {
            re = obj.name;
            return
          }
        });
        return re
      },
      //获取手机号码
      getUmobileNum(){
        let _data={
          "userUuid":this.userUuid,
        }
        this.$http.post("manage/userMobileByUuid", _data).then(response => {
          if (1 == response.body.code) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="未婚"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="已婚"
            }else {
              this.baseInfList.maritalStatus="离异"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="未知"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="男"
            }else {
              this.baseInfList.sex="女"
            }
          }
        })
      },
      /**
       * 通讯录信息
       * @return {[type]} [description]
       */
       addreBook(){
        this.linkLoading = true;
        let _url = 'manage/orderUserContactMongoByOrderNo';
        let _data = {'orderNo': this.uuid};
        this.$http.post(_url, _data).then(response => {
          this.linkLoading = false;
          if (1 == response.body.code && response.body.data) {
            let {body} = response;
            if(1 == body.code && body.data){
              this.totalLinkMan = body.data.length;
              this.linkData = body.data;
            }
          }
        })
      },
      //通话记录
      moxieCallLog(){
        this.moxieCallLogDialog = true;
      },
      advalue(){

      },
      initDays() {

        for(let index = 1; index <32; index++) {
         let initDay = {name:'',code:''};
         initDay.code = index;
         initDay.name = index;
         this.payDayList.push(initDay);
       }
     },
     getRemarkList() {
      this.orderRemarkLoading = true;
      this.$http.post("manage/collection/manOrderRemarkList",{uuid:this.uuid}).then(response =>{
        let {body} = response;
        if(1 == body.code && body.data){
          this.orderRemarkList= body.data;
        }
        this.orderRemarkLoading = false;
      }).catch(e =>{this.orderRemarkLoading = false})
    },
      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "type": type,
          "langue":1,
        }
        let urlss = 'manage/orderUserDataSql';
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            var data=response.body.data;

            if(type==2){
              Object.assign(this.baseInfList,response.body.data);
              this.baseInfList=Object.assign({},this.baseInfList);
              this.getUmobileNum();
            }
            if(type==3){
              this.baseInfList=data;
              this.getBaseInf(this.userUuid,2);
            }
            if(type==4){
              this.jobInfList=data;
            }
            if(type==5){
              this.connectInfList=data;
            }
            if(type==6){
              if(data[0].attachmentType==2){
                this.facePhotoUrls=data[0].attachmentUrl;
                this.playerOptions.sources[0].src=data[1].attachmentUrl;
              }else {
                this.playerOptions.sources[0].src=data[0].attachmentUrl;
                this.facePhotoUrls=data[1].attachmentUrl;


              }
            }

            if(type==7){
              this.cardbackInfList=data;
            }
          }
        })
      },
      saveTagForm(){
        if(!this.tagForm.orderTag){
          this.$message.error("请选择标签");
          return false;
        }
        if(this.addRemarkForm.remark&&this.addRemarkForm.remark.length > 300){
          this.$message.error("请正确填写备注");
          return false;
        }
        // if(!this.tagForm.remindDate && this.tagForm.remindTime){
        //   this.$message.error('请先选择日期');
        //   return false;
        // }
        // if(this.tagForm.remindDate && !this.tagForm.remindTime){
        //   this.$message.error('请选择具体时间');
        //   return false;
        // }
        let remark = this.addRemarkForm.remark == '' ? '': this.addRemarkForm.remark + ' ['+DataUtil.userName()+'|'+DataUtil.formatUnixTime(new Date())+']'
        let _data = {
          orderNo:this.uuid,
          orderTag:this.tagForm.orderTag,
          userUuid:this.userUuid,
          payDay:this.tagForm.payDay,
          remark:remark,
          createUser: DataUtil.id(),
          updateUser: DataUtil.id(),
          alertTime: this.getRealdate(this.tagForm.remindDate ? (this.tagForm.remindDate.setHours(this.tagForm.remindTime.split(':')[0])) : ''),
          promiseRepaymentTime: this.getRealdate(this.tagForm.promiseDate ? (this.tagForm.promiseDate.setHours(this.tagForm.promiseTime.split(':')[0])) : ''),
          type: 2,
          langue : 1
        };
        this.tagFormLoading = true;
        this.$http.post("manage/inserOrUpdateManOrderRemark",_data).then(response =>{
          let {body} = response;
          if(1 == body.code){
            // window.location.reload();
          }
          this.tagFormLoading = false;
        })
      },
      judgeCollectionSmsShowOrNot() {
          //先获得订单的开关
          if (this.orderStatus.collectionLevel != null) {
            var _data = {
              'sysKey' : this.orderStatus.collectionLevel
            }
            this.$http.post('manage/smsTemplate/getCollectionSmsSwitch',_data).then(response =>{
              if (!response.body.data) {
                this.D0CollectionSmsShow = false;
              }
            })
          } else {
            this.D0CollectionSmsShow = false;
          }

        },
        judgeContactShowOrNot() {
          //先获得订单的开关
          if (this.orderStatus.collectionLevel != null) {
            let sysKey ;
            if (this.orderStatus.collectionLevel == 'D0') {
              sysKey = "D0";
            } else {
              sysKey = 'D1以上';
            }
            var _data = {
              'sysKey' : sysKey
            }
            this.$http.post('manage/smsTemplate/getContactSwitch',_data).then(response =>{
              if (response.body.data) {
                let data = response.body.data;
                data.forEach(elem=> {
                  if (elem.type == 'self:') {
                    this.contactmanage = elem.result;
                  } else if (elem.type == 'spare:') {
                    this.contactmanage4 = elem.result;
                  } else if (elem.type == 'com:') {
                   this.contactmanage2 = elem.result;
                 } else if (elem.type == 'selfSpare:') {
                   this.contactmanage1 = elem.result;
                 } else if (elem.type == 'link:') {
                  this.contactmanage3 = elem.result;
                }
              })

              }
            })
          }

        },
      },
      mounted: function () {

       this.uuid = this.$route.query['uuid']||'';
       this.userUuid = this.$route.query['userUuid']||'';
       this.sessionId=DataUtil.sid();
       this.getCollectionList();
       this.getCollectionListVoice();
       this.getRemarkList();
       this.getOrderStatus();
       this.orderSchedule();


     }
   }
   </script>

   <style>
   .reviewTable {
    width: 80%;
    border-spacing: 0;
    border: 1px solid gray;
    margin: 20px auto;
  }
  .reviewTable td {
    text-align: center;
    border: 1px solid gray;
    height: 40px;
    line-height: 40px;

    width: 50%;
    word-wrap:break-word;
  }
  .videos {
    width: 80%;
    margin: 20px auto;
  }
  /*侧边框布局*/
  .containers {
    width: 100%;
    /*height: 400px;*/
    display: flex;

  }
  .containers .asides {
    flex: 6;

  }
  .containers .mains {
    flex: 4;
    margin-left: 40px;
  }
  .other_remark {
    width: 100%;
  }
  .mains .smallRemark {
    width: 100%;
  }
  .asides table {
    border-spacing: 0;
    border: 1px solid #A9A9A9 ;
    border-radius: 2px;
  }
  .asides table td {
    border: .5px solid #efefef;
    word-wrap:break-word;
    line-height: 20px;
    padding: 5px;
  }
  table td img {
    width: 100%;
  }
  .aside_title {
    font-weight: 400;
    line-height: 40px;
    font-size: 16px;
  }
  .question_radio {
    padding-bottom: 30px;
    margin: 5px 10px;
  }
  .question_radio .radio_box {
    /*margin-bottom: -30px;*/
    line-height: 20px;
    float: right;
  }
  .addreBook {
    text-align: center;
    width: 40px;
  }
  /* 标题 */
  .main-title{
    font-size: 22px;
    margin-top: -15px;
    margin-bottom: 15px;
  }
  .one-title{
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .two-title{
    font-size: 13px;
    color: #888;
    margin: 10px 0
  }
  .subtitle{
    font-size: 13px;
    color: #888;
  }
  .orderBox .el-row {
    margin: 15px 30px;
  }
  .orderBox .el-col span{
    margin-right: 10px;
  }
  .orderBox .el-button span,.orderBox .el-tag span{
    margin-right: 0;
  }
  .orderBox .box-card .el-button{
    margin-right: 5px;
  }
  .vadio {
    float: left;
    margin-left:60px;
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
  }
  .vadios {
   float: left;
   margin-right:60px;
 }
 .orderBox .grid-content {
  line-height: 28px;
}

.divid-line{
  height: 10px;
  background: #f1f2f7;
}
.heihher {
 height: 20px;
}
/*借款信息*/
.loanDetail{
  margin: 0 30px 15px;
  width: 94%;
  max-height:250px;
}
/*依图识别*/
.yituInfo{
  display: block;
  text-align: center;
  margin-top: 10px;
}
/*征信*/
.orderBox .box-card{
  height: 225px;
}
.JXLBox{
  border: 1px solid #ccc;
  padding: 10px
}
.JXLBox div{
  padding: 5px;
}

.orderBox .el-table .info-row {
  background: #e2f0e4;
}

.orderBox .el-table .red-row{
  background: #F33;
}
.redInfo{
  color: #F33;
}

.line-height .el-col{
  margin-bottom: 10px;
}
.faceCheck {
  margin: 0 auto;
  overflow: hidden;
}
.faceCheck .faceImg{
  width: 45%;
  height: 350px;
  overflow: hidden;
  margin: 1.5%;
  float: left;
  text-align: center;
}
.faceCheck .faceImg img {
  margin: 0 auto;
  display: block;
  width: 90%;
  height: 90%;
  /*    border: .5px solid #F1F2F7;
  border-radius: 5px;*/
}
.faceImgTop {
  width: 45%;
  height: 250px;
  /*overflow: hidden;*/
  margin: 1.5%;
  float: left;
  text-align: center;
}
.faceImgTop img{
  margin: 0 auto;
  height: 200px;
  display: block;
  max-height: 100%;
  max-width: 100%;
  min-width: 65%;
  min-height: 65%;
  border: .5px solid #F1F2F7;
  border-radius: 5px;
}
.faceImgBottom {
  width: 90%;
  height: 350px;
  overflow: hidden;
  margin: 2.5%;
  float: left;
  text-align: center;

}
.faceImgBottom img{
  margin: 0 auto;
  display: block;
  height: 300px;
  min-width: 80%;
  min-height: 80%;
  border: .5px solid #F1F2F7;
  border-radius: 5px;
}

#btnForm{
  width: 90%;
  margin: 0 auto
}
/*#studentsInf td img{*/
  /*max-width: 300px;*/
  /*max-height: 200px;*/
/*}*/
.lastTitle {
  margin-right: 40px;
  float: left;
  font-weight: 400;
  line-height: 40px;
  font-size: 16px;
}
.reviewTable {
  width: 60%;
  margin: 0 auto;
}
table td img {
  width: 100%;
}
.faceImgTop .handleImg {
  width: 40%;
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
}
.tp-title {
  margin-left: 30px;
}
.dia_top {
  width: 100%;
  height:80px;
  background-color: #00C8DC;
  border-radius: 4px 4px 0 0;
  /*position: relative;*/
}
.dia_top img{
  display: inline-block;
  width: 104px;
  height: 34px;
  margin-top: 30px;
  margin-left: 40px;
}
.bca_text{
  width: 150px;
  height: 20px;
  font-size: 20px;
  color: #fff;
  line-height: 20px;
  margin-top:-29px;
  margin-left: 164px;
}
.dia_contain {
  width: 100%;
  height:186px;
  margin-top: 28px;
}
.dia_contain li{
  height: 35px;
  line-height: 35px;
  width: 100%;
  position: relative;
}
.left_span {
  margin-left: 40px;
}
.rig_span {

 right: 40px;
 position: absolute;

}
.bot_close{
  margin-top: 32px;
  background-color:#2AD2C8;
  height: 35px;
  width: 50%;
  margin-left: 25%;
  border-radius: 4px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 15px;
}
.diatxt {
  height: 390px;
  /*background-color: #ccc;*/
}
</style>
