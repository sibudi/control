/**
* Created by alan on 2017/3/10.
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
      <el-col :span="8" class="grid-content">
        <div><span>下单时间:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请次数:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"第"+orderStatus.orderStep+"次申请"}}</span></el-tag></span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">订单进度</div>
      <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
        <el-step v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
          <div slot="description">
          {{getdate(item.createTime)}}</div>
        </el-step>
      </el-steps>
    </el-row>
    <div class="divid-line"></div>
    <!-- 客户信息 baseInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">客户信息</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>客户姓名</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>客户性别</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>手机号</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>


            <tr>
              <td>邮箱地址</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>学历</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>婚姻状况</td>
              <td>{{baseInfList.maritalStatus}}</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{baseInfList.birthday}}</td>
            </tr>
            <tr>
              <td>宗教</td>
              <td>{{baseInfList.religion}}</td>
            </tr>
            <tr>
              <td>母亲姓名</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>家庭成员数量</td>
              <td>{{baseInfList.familyMemberAmount}}</td>
            </tr>
            <tr>
              <td>子女数量</td>
              <td>{{baseInfList.childrenAmount}}</td>
            </tr>
            <tr>
              <td>现居地址</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>借款人身份</td>
              <td>已工作</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

          <table v-if="familySeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>客户姓名</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>借款人身份</td>
              <td>家庭主妇</td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>客户性别</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>手机号</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>邮箱地址</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>学历</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>婚姻状况</td>
              <td>{{baseInfList.maritalStatus}}</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>{{baseInfList.birthday}}</td>
            </tr>
            <tr>
              <td>宗教</td>
              <td>{{baseInfList.religion}}</td>
            </tr>
            <tr>
              <td>母亲姓名</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>子女数量</td>
              <td>{{baseInfList.childrenAmount}}</td>
            </tr>
            <tr>
              <td>现居地址</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

          <table v-if='studentSeen' border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>客户姓名</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>借款身份</td>
              <td>在校大学生</td>
            </tr>
            <tr>
              <td>身份证号</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>客户性别</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>手机号</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>邮箱地址</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>学历</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>家庭成员数量</td>
              <td>{{baseInfList.familyMemberAmount}}</td>
            </tr>
            <tr>
              <td>家庭年收入</td>
              <td>{{baseInfList.familyAnnualIncome}}</td>
            </tr>
            <tr>
              <td>父亲姓名</td>
              <td>{{baseInfList.fatherName}}</td>
            </tr>
            <tr>
              <td>父亲手机号</td>
              <td>{{baseInfList.fatherMobile}}</td>
            </tr>
            <tr>
              <td>父亲职位</td>
              <td>{{baseInfList.fatherPosition}}</td>
            </tr>
            <tr>
              <td>母亲姓名</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>母亲手机号</td>
              <td>{{baseInfList.motherMobile}}</td>
            </tr>
            <tr>
              <td>母亲职位</td>
              <td>{{baseInfList.motherPosition}}</td>
            </tr>
            <tr>
              <td>现居地址</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 工作信息 jobInf-->
    <el-row>
      <div class="containers" v-if="workerSeen">
        <div class="asides">
          <div class="one-title">工作信息</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>公司名称</td>
              <td>{{jobInfList.companyName}}</td>
            </tr>
            <tr>
              <td>职位名称</td>
              <td>{{jobInfList.positionName}}</td>
            </tr>
            <tr>
              <td>月收入</td>
              <td>{{jobInfList.monthlyIncome}}</td>
            </tr>
            <tr>
              <td>公司电话</td>
              <td>{{jobInfList.companyPhone}}</td>
            </tr>
            <tr>
              <td>公司地址</td>
              <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{jobInfList.detailed}}</td>
            </tr>
            <tr>
              <td>员工/员工身份号码</td>
              <td>{{jobInfList.employeeNumber}}</td>
            </tr>
            <tr>
              <td>分机号码</td>
              <td>{{jobInfList.extensionNumber}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="containers" v-if="familySeen">
        <div class="asides">
          <div class="one-title">工作信息</div>
          <table v-if="familySeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>每月家庭收入总额</td>
              <td>{{jobInfList.homeMouthIncome}}</td>
            </tr>
            <tr>
              <td>主要家庭收入方式</td>
              <td>{{jobInfList.incomeType}}</td>
            </tr>
            <tr>
              <td>主要家庭收入来源者</td>
              <td>{{jobInfList.incomtSource}}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{jobInfList.sourceName}}</td>
            </tr>
            <tr>
              <td>手机号</td>
              <td>{{jobInfList.sourceTel}}</td>
            </tr>
            <tr>
              <td>月收入</td>
              <td>{{jobInfList.mouthIncome}}</td>
            </tr>
            <tr>
              <td>工作类型</td>
              <td>{{jobInfList.workType}}</td>
            </tr>
            <tr>
              <td>公司名称</td>
              <td>{{jobInfList.companyName}}</td>
            </tr>
            <tr>
              <td>公司电话</td>
              <td>{{jobInfList.companyPhone}}</td>
            </tr>
            <tr>
              <td>工作地址</td>
              <td>{{jobInfList.workAddressDetail}}</td>
            </tr>
            <tr>
              <td>详细描述收入的主要方式</td>
              <td>{{jobInfList.incomeWithNoCom}}</td>
            </tr>
            <tr>
              <td>员工/员工身份号码</td>
              <td>{{jobInfList.employeeNumber}}</td>
            </tr>
            <tr>
              <td>分机号码</td>
              <td>{{jobInfList.extensionNumber}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="containers" v-if="studentSeen">
        <div class="asides">
          <div class="one-title">学校信息</div>
          <table border='.1px' width="100%" style="table-layout:fixed;" class="studentsInf">
            <tr>
              <td>学校名称</td>
              <td>{{jobInfList.schoolName}}</td>
            </tr>
            <tr>
              <td>专业</td>
              <td>{{jobInfList.major}}</td>
            </tr>
            <tr>
              <td>入学时间</td>
              <td>{{jobInfList.startSchoolDate}}</td>
            </tr>
            <tr>
              <td>学号</td>
              <td>{{jobInfList.studentNo}}</td>
            </tr>
            <tr>
              <td>学校地址</td>
              <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>详细地址</td>
              <td>{{jobInfList.detailed}}</td>
            </tr>
            <tr>
              <td>学生证照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" @click.stop="studentCardUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>奖学金照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" @click.stop="scholarshipUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>英语证书照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" @click.stop="englishUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>计算机证书</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" @click.stop="ComputerUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>校园卡照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" @click.stop="schoolCardUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>其他大赛照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" @click.stop="otherCertificateUrlClick" alt=""></td>
            </tr>
          </table>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 联系人信息 connectInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">联系人信息</div>
          <table border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>联系人姓名1</td>
              <td>{{connectInfList.contactsName1}}</td>
            </tr>
            <tr>
              <td>与借款人关系1</td>
              <td>{{connectInfList.relation1}}</td>
            </tr>
            <tr>
              <td>联系人电话1</td>
              <td>{{connectInfList.contactsMobile1}}</td>
            </tr>
            <tr>
              <td>联系人姓名2</td>
              <td>{{connectInfList.contactsName2}}</td>
            </tr>
            <tr>
              <td>与借款人关系2</td>
              <td>{{connectInfList.relation2}}</td>
            </tr>
            <tr>
              <td>联系人电话2</td>
              <td>{{connectInfList.contactsMobile2}}</td>
            </tr>
            <tr>
              <td>备用联系人电话</td>
              <td>{{connectInfList.alternatePhoneNo}}</td>
            </tr>
          </table>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 人脸识别 faceCheck-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">人脸识别</div>
          <div class="faceCheck">
            <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>自拍照</div>
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="
            baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
          </div>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 视频认证 videoCheck-->
    <!-- <el-row v-if="videoShowOrNot">
      <div class="containers">
        <div class="asides">
          <div class="one-title">视频认证</div>
          <el-button @click="searcher" type="primary">旋转</el-button>
          <div v-bind:class= "{ vadio:isActive,vadios:noActive}">
            <video-player
            class="video-player-box videos"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname">
          </video-player>
        </div>
    </div>
  </div>
</el-row>
<div class="divid-line"></div> -->
<!-- 银行卡信息 -->
<el-row>
  <div class="one-title">银行卡信息</div>
  <el-col :span="8" class="grid-content">
    <div><span>开户行:</span><span>{{cardbackInfList.bankCode}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>银行卡号:</span><span>{{cardbackInfList.bankNumberNo}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>账户名称:</span><span>{{cardbackInfList.bankCardName}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>银行卡状态:</span><span>{{getBankStatus(cardbackInfList.status)}}</span></div>
  </el-col>
</el-row>
<div class="divid-line"></div>
<!-- 补充信息 addtionInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">补充信息</div>
      <div class="faceCheck">
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>{{addtionInfList[0].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>{{addtionInfList[1].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>{{addtionInfList[2].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>{{addtionInfList[3].attachmentName}}
        </div>
        <div class="faceImg" v-if="workerSeen">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>{{addtionInfList[4].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>{{addtionInfList[5].attachmentName}}
        </div>
      </div>
    </div>
  </div>
</el-row>
<div class="divid-line"></div>
<!-- <el-row>
  <h1 class="one-title">订单备注</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
    <el-table-column type="index" label="序号" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="createTime" label="操作员" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
    </el-table-column>
    <el-table-column prop="orderTag" label="标签" width="100">
     <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
   </el-table-column>
   <el-table-column prop="alertTime" label="下次提醒时间" width="220">
    <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
  </el-table-column>
</el-table>
</el-row> -->
<div class="divid-line"></div>
<el-row>
 <div class="one-title">历史订单记录</div>
 <el-table :data="historyData" width="100%" v-loading="historyLoading" @row-click="rowClick" size="large">
   <el-table-column prop="uuid" width="300" label="订单编号"></el-table-column>
   <el-table-column prop="status" width="200" label="订单状态">
     <template scope="scope">
       <span>{{getenums(scope.row.status)}}</span>
     </template>
   </el-table-column>
   <el-table-column prop="amountApply" width="200" label="申请金额"></el-table-column>
   <el-table-column prop="borrowingTerm" width="250" label="期限">
   </el-table-column>
 </el-table>
</el-row>
</section>
</template>
<script>
import mlPhotoBox from '../../components/_photoBox.vue'
import enums from '../../common/Enum'
import DataUtil from '../../common/dataUtil'
import Config from '../../common/config'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    mlPhotoBox,
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        muted: true,
        addClass: "videos",
        width: 400,
        height: 450,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: ""
        }],
        poster: "",
      },
      isActive:true,
      noActive:false,
      historyLoading: false,
      orderRemarkList:[], //订单备注

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
        },
        status: '', //审核结果
        remark: '', //审核意见

        textarea: '',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        //baseInf 客户基本信息

        // 基本信息
        baseInfList: {},
        historyData: [],
        jobInfList: {},
        connectInfList: [],
        cardbackInfList:{},//银行卡信息

        // radio显示
        baseInfShow: true,
        jobInfShow: true,
        connectInfShow: true,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        // 审核规则
        baseRuleList: [{
          "ruleCount":1,
          "ruleLevel":3,
          "ruleResult":false
        }],
        jobRuleList: [{
          "ruleCount":1,
          "ruleLevel":3,
          "ruleResult":false
        },{
          "ruleCount":2,
          "ruleLevel":2,
          "ruleResult":false
        }],
        jobRuleList: [{
          "ruleCount":1,
          "ruleLevel":3,
          "ruleResult":false
        },{
          "ruleCount":2,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":3,
          "ruleLevel":4,
          "ruleResult":false
        },{
          "ruleCount":4,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":5,
          "ruleLevel":3,
          "ruleResult":false
        },{
          "ruleCount":6,
          "ruleLevel":3,
          "ruleResult":false
        },{
          "ruleCount":7,
          "ruleLevel":3,
          "ruleResult":false
        }],
        connectRuleList: [{
          "ruleCount":1,
          "ruleLevel":3,
          "ruleResult":false
        }],
        faceCheckRuleList: [{
          "ruleCount":1,
          "ruleLevel":2,
          "ruleResult":false
        },{
          "ruleCount":2,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":3,
          "ruleLevel":3,
          "ruleResult":false
        }],
        videoCheckRuleList: [{
          "ruleCount":1,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":2,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":3,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":4,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":5,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":6,
          "ruleLevel":1,
          "ruleResult":false
        },{
          "ruleCount":7,
          "ruleLevel":3,
          "ruleResult":false
        },{
          "ruleCount":8,
          "ruleLevel":3,
          "ruleResult":false
        }],
        addtionInfList:[{
          attachmentName:"信用卡",
          attachmentType:4,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"驾驶证",
          attachmentType:5,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"护照",
          attachmentType:6,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"家庭卡",
          attachmentType:7,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"工资卡",
          attachmentType:8,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"银行卡流水",
          attachmentType:9,
          attachmentUrl: require("../../assets/none.png")
        }],
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
        } ,{
          code: "WAITING_CONFIRM",
          name: "降额后等待用户确认",
          value:'19'
        },{
          code: "WAITING_SIGN_CONTRACT",
          name: "待签约",
          value:'20'
         } ],
          workerSeen: true,
          studentSeen: false,
          familySeen: false,
          userUuid: "",
          uuid: "",
          facePhotoUrls:'',
          IsStudents: false,
          firstReviewSuggest: '',
          secondReviewSuggest: '',
          active: 2,
          orderProData: '',
          bankStatus:'',
          videoShowOrNot: true,
        }
      },
      methods: {
       getdate(dates) {
        if(!dates){
         return '';
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
      getOrderPro(val) {//订单进度
        return enums.getOrderPro(val)
      },
      //当前订单状态
      getOrderStatus(){
        let _data={
          "uuid": this.uuid,
        }
        this.$http.post("manage/orderInfoByUuid", _data).then(response => {
          if (1 == response.body.code) {
            this.orderStatus=response.body.data;
            if (this.orderStatus.intoOrdFlag == '1') {
              this.videoShowOrNot = false;
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
            this.getBaseInf(this.userUuid,3);
            this.getBaseInf(this.userUuid,4);
            this.getBaseInf(this.userUuid,5);
            this.getBaseInf(this.userUuid,6);
            this.getBaseInf(this.userUuid,8);
            this.getBaseInf(this.userUuid,7);
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
      //获取历史订单
      getHistoryDetail(){
        let _data={
          "uuid": this.userUuid
        }
        this.historyLoading=true;
        this.$http.post("manage/orderHistoryListByUserUuid", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
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
      getOrderType(type){
        return enums.getOrderPro(type);
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
      //获取银行卡状态
      getBankStatus(val) {
        return enums.getBankStatus(val);
      },
      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 1,
        }
        this.$http.post("manage/CheckRemarkListByOrderNo", _data).then(response => {
          if (1 == response.body.code) {
            if(response.body.data[0].type==1){
              this.firstReviewSuggest=response.body.data[0].remark
            }else{
              this.secondReviewSuggest=response.body.data[0].remark
            }
            if(response.body.data[1].type==1){
              this.firstReviewSuggest=response.body.data[1].remark
            }else{
              this.secondReviewSuggest=response.body.data[1].remark
            }
          }
        })
      },
      //获取订单进度
      orderSchedule(){
        this.$http.post('manage/orderSchedule', {uuid:this.uuid}).then(response => {
          let {body} = response;
          if (1 == body.code) {
            if(body.data){
              this.active = body.data.length;
              this.orderProData = body.data;
            }
          } else {
            this.$message.error(response.body.message);
          }
        }, response => {
        });
      },

      //获取审核规则
      getCheckRule(){
        for(let type=1;type<10;type++){
          let _data={
            "orderNo": this.uuid,
            "infoType": type
          }
          this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
            if (1 == response.body.code && response.body.data.checkRuleList[0]) {
              let data=response.body.data;
              if(type==1){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark;}
              if(type==2){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark}
              if(type==3){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark;}
              if(type==4){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark}
              if(type==5){this.connectRuleList=data.checkRuleList;this.connectInfRemark=data.checkRuleRemark.remark}
              if(type==6){this.faceCheckRuleList=data.checkRuleList;this.faceCheckRemark=data.checkRuleRemark.remark}
              if(type==7){this.videoCheckRuleList=data.checkRuleList;this.videoCheckRemark=data.checkRuleRemark.remark}
              if(type==8){      this.addtionInfRemark=data.checkRuleRemark.remark}
                if(type==9){}
              }
          })
        }
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
      getRemarkList() {
        this.orderRemarkLoading = true;
        this.$http.post("manage/orderRemarkList",{uuid:this.uuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.orderRemarkList= body.data;
          }
          this.orderRemarkLoading = false;
        }).catch(e =>{this.orderRemarkLoading = false})
      },
      rowClick(row){
        window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
      },

      //图片点击放大展示

      studentCardUrlClick(){
        if(this.jobInfList.studentCardUrl){
          let _photoList = [
          this.jobInfList.studentCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      scholarshipUrlClick(){
        if(this.jobInfList.scholarshipUrl){
          let _photoList = [
          this.jobInfList.scholarshipUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      englishUrlClick(){
        if(this.jobInfList.englishUrl){
          let _photoList = [
          this.jobInfList.englishUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      ComputerUrlClick(){
        if(this.jobInfList.ComputerUrl){
          let _photoList = [
          this.jobInfList.ComputerUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      schoolCardUrlClick(){
        if(this.jobInfList.schoolCardUrl){
          let _photoList = [
          this.jobInfList.schoolCardUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      otherCertificateUrlClick(){
        if(this.jobInfList.otherCertificateUrl){

          let _photoList = [
          this.jobInfList.otherCertificateUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
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

      attachmentUrl0(){
        if(this.addtionInfList[0].attachmentUrl){
          let _photoList = [
          this.addtionInfList[0].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl1(){
        if(this.addtionInfList[1].attachmentUrl){
          let _photoList = [
          this.addtionInfList[1].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl2(){
        if(this.addtionInfList[2].attachmentUrl){
          let _photoList = [
          this.addtionInfList[2].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl3(){
        if(this.addtionInfList[3].attachmentUrl){
          let _photoList = [
          this.addtionInfList[3].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl4(){
        if(this.addtionInfList[4].attachmentUrl){
          let _photoList = [
          this.addtionInfList[4].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
      attachmentUrl5(){
        if(this.addtionInfList[5].attachmentUrl){
          let _photoList = [
          this.addtionInfList[5].attachmentUrl
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },

      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "orderNo": this.uuid,
          "type": type,
          "langue":1
        }
        let urlss = 'manage/orderUserDataSql';
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            var data=response.body.data;

            if(type==2){
              this.$http.post(urlss,_data).then(response => {
                if (1 == response.body.code) {
                  Object.assign(this.baseInfList,response.body.data);
                  this.baseInfList=Object.assign({},this.baseInfList);
                  this.getUmobileNum();
                }
              })
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
            if(type==7){
              this.cardbackInfList=data;
              // this.getBaseInf(this.userUuid,7);
            }
//            if(type==6){
//              if(data[0].attachmentType==2){
//                this.facePhotoUrls=data[0].attachmentUrl;
//                this.playerOptions.sources[0].src=data[1].attachmentUrl;
//              }else {
//
//                this.playerOptions.sources[0].src=data[0].attachmentUrl;
//                this.facePhotoUrls=data[1].attachmentUrl;
//              }
//            }
if(type==8){
  let adt=this.addtionInfList;
  console.log(adt)
  data.forEach(function(obj) {
    if(obj.attachmentType==4){
      adt[0]=obj;
    }
    if(obj.attachmentType==5){
      adt[1]=obj;
    }
    if(obj.attachmentType==6){
      adt[2]=obj;
    }
    if(obj.attachmentType==7){
      adt[3]=obj;
    }
    if(obj.attachmentType==8){
      adt[4]=obj;
    }
    if(obj.attachmentType==9){
      adt[5]=obj;
    }
  });
  this.addtionInfList=adt;
}
if(type==9){

}
}
})
      },
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
//      this.getCheckRule();
//      this.getcheckSuggest();
this.orderSchedule() ;
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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 7px;
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
.orderBox .grid-content {
  line-height: 28px;
}

.divid-line{
  height: 10px;
  background: #f1f2f7;
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
 </style>
