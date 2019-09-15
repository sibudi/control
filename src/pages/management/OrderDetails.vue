/**
* Created by xiaowei on 2017/24/12.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">订单状态 <el-button v-if="orderStatus.extendType===0" class="tp-title" type="primary" size="mini" @click="dialogVisible1 = true">打款凭证</el-button></div>
      <el-col :span="8" class="grid-content">
        <div><span>订单编号:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>订单状态:</span><span>{{getOrderType(orderStatus.status)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>复借订单:</span><span> <el-tag :type="orderStatus.isRepeatBorrowing==1?'danger':''"><span>{{orderStatus.isRepeatBorrowing==1?"是":"否"}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>下单时间:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>进件标识:</span><span>{{orderStatus.intoOrdFlag == '1' ? 'cashcash' : ''}}</span>
        </div>
      </el-col>
      <el-col :span="8" class="grid-content" v-if="orderStatus.status == 12">
        <div><span>机审不通过原因:</span><span>{{localLit}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>借款用途:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>实名认证:</span><span> <el-tag :type="orderStatus.realNameAuthFlag==true?'danger':''"><span>{{orderStatus.realNameAuthFlag==true?"是":"否"}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>WhatsApp账号:</span><span>{{orderStatus.WhatsApp}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>展期订单:</span><span> <el-tag :type="orderStatus.extendType==true?'danger':''"><span>{{orderStatus.extendType==1?"是":"否"}}</span></el-tag></span></div>
      </el-col>
    </el-row>
    <el-dialog
    :visible.sync="dialogVisible1"
    width="50%">
    <div class="diatxt">
      <div class="dia_top">
        <img :src="bankList.loanIconUrl" alt="">
        <div class="bca_text">{{bankList.loanBank}}</div>
      </div>
      <ul class="dia_contain">
        <li><span class="left_span">放款日期</span><span class="rig_span">{{bankList.loanDate}}</span></li>
        <li><span class="left_span">平台名称</span><span class="rig_span">{{bankList.platformName}}</span></li>
        <li><span class="left_span">借款人姓名</span><span class="rig_span">{{bankList.userName}}</span></li>
        <li><span class="left_span">收款账户</span><span class="rig_span">{{bankList.userAccount}}</span></li>
        <li><span class="left_span">打款金额</span><span class="rig_span">{{bankList.loanAmout}}</span></li>
        <li><span class="left_span">打款状态</span><span class="rig_span">成功</span></li>
      </ul>
      <div class="bot_close" @click="dialogVisible1 = false">关闭</div>
    </div>
  </el-dialog>
  <div class="divid-line"></div>
  <el-row>
    <div class="one-title">订单进度</div>
    <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
      <el-step v-for="item in orderProData" :key="item.status" :title="getOrderType(item.status)">
        <div slot="description">
          {{getOrderType(item.status)}}<br>{{getdate(item.createTime)}}</div>
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
              <td><div v-if="orderStatus.isKefu !=true ">已工作</div><div v-if="orderStatus.isKefu == true ">**</div></td>
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
              <td><span v-if="orderStatus.isKefu !=true ">家庭主妇</span><span v-if="orderStatus.isKefu == true ">**</span></td>
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
              <td><span v-if="orderStatus.isKefu !=true ">在校大学生</span><span v-if="orderStatus.isKefu == true ">**</span></td>
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
    <div class="divid-line"></div>
    <el-row v-if="contactmanage">
      <div class="one-title">本人信息</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>本人电话</td>
            <td>{{baseMobileList.mobile}}</td>
          </tr>
          <tr>
            <td>外呼结果</td>
            <td>{{getmobilecon(baseMobileList.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">催收结果</div>
        <el-col :span="8" class="grid-content">
          <div><span>电话:</span><span>{{getcitys(baseMobileList.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileList.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>短信:</span><span>{{getcitys(baseMobileList.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-row  v-if="contactmanage1">
      <div class="one-title">备用电话</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>本人备用电话</td>
            <td>{{baseMobileListone.mobile}}</td>
          </tr>
          <tr>
            <td>外呼结果</td>
            <td>{{getmobilecon(baseMobileListone.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">催收结果</div>
        <el-col :span="8" class="grid-content">
          <div><span>电话:</span><span>{{getcitys(baseMobileListone.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileListone.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>短信:</span><span>{{getcitys(baseMobileListone.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-row v-if="contactmanage2">
      <div class="one-title">公司电话</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>公司电话</td>
            <td>{{baseMobileListtwo.mobile}}</td>
          </tr>
          <tr>
            <td>外呼结果</td>
            <td>{{getmobilecon(baseMobileListtwo.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">催收结果</div>
        <el-col :span="8" class="grid-content">
          <div><span>电话:</span><span>{{getcitys(baseMobileListtwo.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileListtwo.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>短信:</span><span>{{getcitys(baseMobileListtwo.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <div v-if="contactmanage3">
      <div class="one-title">联系人信息</div>
      <template v-for="(item,index) in getlinkmanList">
        <el-row>
         <div class="asides">
          <table border='.1px' width="40%" style="table-layout:fixed;">
            <tr>
              <td>联系人姓名{{index+1}}</td>
              <td>{{item.realName}}</td>
            </tr>
            <tr>
              <td>与借款人关系{{index+1}}</td>
              <td>{{item.relation}}</td>
            </tr>
            <tr>
              <td>联系人电话{{index+1}}</td>
              <td>{{item.mobile}}</td>
            </tr>
            <tr>
              <td>WA/Line{{index+1}}</td>
              <td>{{item.waOrLine}}</td>
            </tr>
            <tr>
              <td>外呼结果</td>
              <td>{{getmobilecon(item.callResult)}}</td>
            </tr>

            <div class="two-title">催收结果</div>
            <el-col width="30%">
              <div><span>电话:</span><span>{{getcitys(item.contactResultPhone)}}</span></div>
            </el-col>
            <el-col width="30%">
              <div><span>WA:</span><span>{{getcitys(item.contactResultWA)}}</span></div>
            </el-col>
            <el-col width="30%">
              <div><span>短信:</span><span>{{getcitys(item.contactResultSms)}}</span></div>
            </el-col>
          </table>
        </div>
      </el-row>
    </template>
  </div>
  <div class="divid-line"></div>
  <div v-if="contactmanage4">
    <div class="one-title">备用联系人信息</div>
    <template v-for="(item,index) in linkmanList">
      <el-row>
       <div class="asides">
        <table border='.1px' width="50%" style="table-layout:fixed;">
          <tr>
            <td>姓名{{index+1}}</td>
            <td>{{item.realName}}</td>
          </tr>
          <tr>
            <td>电话{{index+1}}</td>
            <td>{{item.mobile}}</td>
          </tr>
          <tr>
            <td>外呼结果</td>
            <td>{{getmobilecon(item.callResult)}}</td>
          </tr>
          <div class="two-title">催收结果</div>
          <el-col class="grid-content">
            <div><span>电话:</span><span>{{getcitys(item.contactResultPhone)}}</span></div>
          </el-col>
          <el-col class="grid-content">
            <div><span>WA:</span><span>{{getcitys(item.contactResultWA)}}</span></div>
          </el-col>
          <el-col class="grid-content">
            <div><span>短信:</span><span>{{getcitys(item.contactResultSms)}}</span></div>
          </el-col>
        </table>
      </div>

    </el-row>
  </template>
</div>
<div class="divid-line"></div>
<!-- 人脸识别 faceCheck-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">人脸识别</div>
      <!--     <span class="titlePhone"><span v-if="pairVerifySimilarity.indexOf('face') == -1">活体识别分：</span>   {{pairVerifySimilarity}}</span> -->
      <div class="faceCheck">
        <!-- <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls"  @click.stop="facePhotoUrlClick"><br>活体识别截图</div> -->
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>自拍照</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="
        baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>

       <!--  <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="
         'data:image/jpeg;base64,'+baseInfList.insuranceCardUrl"  @click.stop="insuranceCardUrl"><br>保险卡</div> -->
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
</div>
</el-row> -->
<div class="divid-line"></div>
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
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[6].attachmentUrl" @click.stop="attachmentUrl6"><br>{{addtionInfList[6].attachmentName}}
        </div>
      </div>
    </div>
  </div>
</el-row>
<!-- 催收记录 -->
<div class="divid-line"></div>
<el-row>
  <h1 class="one-title">订单备注</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" max-height="200">
    <el-table-column type="index" label="序号" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="220">
      <template scope="scope">{{getdate(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注">
    </el-table-column>
    <el-table-column prop="orderTag" label="标签" width="100">
     <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
   </el-table-column>
   <el-table-column prop="alertTime" label="下次提醒时间" width="220">
    <template scope="scope">{{getdate(scope.row.alertTime)}}</template>
  </el-table-column>
</el-table>
</el-row>
<div class="divid-line"></div>
<el-row>
  <div class="one-title">历史订单记录</div>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="historyData" max-height="200" v-loading="historyLoading" @row-click="rowClick" size="large">
   <el-table-column prop="uuid" width="250" label="订单编号"></el-table-column>
   <el-table-column prop="status" width="200" label="订单状态">
     <template scope="scope">
       <span>{{getenums(scope.row.status)}}</span>
     </template>
   </el-table-column>
   <el-table-column prop="amountApply" width="200" label="申请金额"></el-table-column>
   <el-table-column prop="borrowingTerm" min-width="250" label="期限">
   </el-table-column>
 </el-table>
</el-row>
<div class="divid-line"></div>
<el-row>
  <div class="one-title">账单信息</div>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="billData"   size="large">
   <el-table-column prop="billTerm" width="150" label="期数"></el-table-column>
   <el-table-column prop="refundTime" width="150" label="应还款日"></el-table-column>
   <el-table-column prop="totalAmount" width="150" label="应还款总额"></el-table-column>
   <el-table-column prop="actualRepayAmout" width="150" label="实际还款总额"></el-table-column>
   <el-table-column prop="billAmount" width="150" label="本金"></el-table-column>
   <el-table-column prop="overdueFee" width="150" label="逾期服务费"></el-table-column>
   <el-table-column prop="penalty" width="150" label="滞纳金"></el-table-column>
   <el-table-column prop="status" width="100" label="还款状态">
     <template scope="scope">
       <span>{{getBill(scope.row.status)}}</span>
     </template>
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
      historyLoading: false,
      orderRemarkList:[], //订单备注
      billData:[],
      billList:[{
        name:'待还款',code:1
      },{
        name:'逾期待还款',code:2
      },{
        name:'已还款',code:3
      },{
        name:'逾期已还款',code:4
      }],
      localLit:'',
      identity:'',
      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          status:'',
          intoOrdFlag:'',
          isKefu:'',

        },
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
      mobilecon:[{
        name:'可接通',code:1
      },{
        name:'不可接通',code:2
      },{
        name:'不确定',code:3
      }],
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
        status: '', //审核结果
        remark: '', //审核意见

        textarea: '',
        facePhotoUrls:'',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        //baseInf 客户基本信息

        // 基本信息
        baseInfList: {},
        dialogVisible1:false,
        contactmanage:true,
        contactmanage1:true,
        contactmanage2:true,
        contactmanage3:true,
        contactmanage4:true,
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
        insuranceHitOrNot: false,
        isActive:true,
        noActive:false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        ruleResult:'',
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
          attachmentName:"保险卡",
          attachmentType:17,
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
        },{
          attachmentName:"信用卡",
          attachmentType:4,
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
        bankList:[],
        workerSeen: true,
        studentSeen: false,
        familySeen: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        firstReviewSuggest: '',
        secondReviewSuggest: '',
        active: 2,
        orderProData: '',
        pairVerifySimilarity:'',
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
      //活体识别分
      getPairVerifySimilarity(){
        let _data={
          "userUuid":this.userUuid,
          "orderNo":this.uuid
        }
        this.$http.post("manage/getPairVerifySimilarity", _data).then(response => {
          if (1 == response.body.code) {
            this.pairVerifySimilarity = response.body.data;
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
            this.getBaseInf(this.userUuid,7);
            this.getBaseInf(this.userUuid,8);
            this.getBaseInf(this.userUuid,9);
            this.judgeInsuranceHitOrNot();
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
     // 机审不得通过原因
     getlocalLitDetail(){
      let _data={
        "userUuid": this.userUuid,
        "orderNo": this.uuid,
        "permissionCode":"REJECT_REASON_PERMISSION",
        "userId":DataUtil.id()
      }
      this.$http.post("manage/searchRejectReason", _data).then(response => {
        if (1 == response.body.code && response.body.data) {
          let data=response.body.data;
          this.localLit=data;
        }
      })
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
      getBill(val){
        let re = '';
        this.billList.forEach(function(obj) {
          if (obj.code == val) {
            re = obj.name;
            return
          }
        });
        return re
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
      //获取银行卡状态
      getBankStatus(val) {
        return enums.getBankStatus(val);
      },
      judgeInsuranceHitOrNot() {

        this.$http.post('manage/isUserHitRuleForInsuranceCard',{'orderNo':this.uuid}).then(response => {
          if (response.body.data) {
            this.insuranceHitOrNot = true;
          }
        })
      },
      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 1,
        }
        this.$http.post("manage/CheckRemarkListByOrderNo", _data).then(response => {
          if (1 == response.body.code && response.body.data && response.body.data.length>1) {
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
          if (1 == body.code && body.data) {
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
      // getCheckRule(){
      //   for(let type=1;type<10;type++){
      //     let _data={
      //       "orderNo": this.uuid,
      //       "infoType": type
      //     }
      //     this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
      //       if (1 == response.body.code && response.body.data.checkRuleList[0]) {
      //         let data=response.body.data;
      //         if(type==1){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark;}
      //         if(type==2){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark}
      //         if(type==3){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark;}
      //         if(type==4){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark}
      //         if(type==5){this.connectRuleList=data.checkRuleList;this.connectInfRemark=data.checkRuleRemark.remark}
      //         if(type==6){this.faceCheckRuleList=data.checkRuleList;this.faceCheckRemark=data.checkRuleRemark.remark}
      //         if(type==7){this.videoCheckRuleList=data.checkRuleList;this.videoCheckRemark=data.checkRuleRemark.remark}
      //         if(type==8){      this.addtionInfRemark=data.checkRuleRemark.remark}
      //           if(type==9){}
      //         }
      //     })
      //   }
      // },
      //获取手机号码
      getUmobileNum(){
        let _data={
          "userUuid":this.userUuid,
          // "uuid": this.uuid
        }
        this.$http.post("manage/userMobileByUuid", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
             // this.baseInfList = body.data;
            // if(response.body.code == 1){
            //   this.baseInfList = body.data;
            // }else{
            //   this.baseInfList = {};
            // }
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="未婚"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="已婚"
            }else if(this.baseInfList.maritalStatus == -1){
              this.baseInfList.maritalStatus="**"
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

          }else{
            this.baseInfList = {};
          }
        })
      },
      getRemarkList() {
        this.orderRemarkLoading = true;
        this.$http.post("manage/collection/manOrderRemarkList",{uuid:this.uuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data.remark){
            this.orderRemarkList= body.data;
          }
          this.orderRemarkLoading = false;
        }).catch(e =>{this.orderRemarkLoading = false})
      },
      getRemarkList() {
        this.$http.post("manage/byStagesBillInfo",{uuid:this.uuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.billData= body.data;
          }
        }).catch(e =>{})
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

      insuranceCardUrl(){
       if(this.baseInfList.insuranceCardUrl){
        let _photoList = [
        this.baseInfList.insuranceCardUrl
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
    attachmentUrl6(){
      if(this.addtionInfList[6].attachmentUrl){
        let _photoList = [
        this.addtionInfList[6].attachmentUrl
        ];
        this.$refs.photoBox.show(_photoList)
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
getBack(){
 let _data={
  "userUuid": this.userUuid,
  "orderNo":this.uuid,
}
this.$http.post("manage/getPaymentProof", _data).then(response => {
  if (1 == response.body.code && response.body.data) {
   this.bankList=response.body.data;
 }

})
},

      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "orderNo": this.uuid,
          "type": type,
          "langue":1
        }
        let urlss="manage/orderUserDataSql";
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code && response.body.data) {
            var data=response.body.data;

            if(type==2){
              this.$http.post(urlss,_data).then(response => {
             // this.baseInfList.maritalStatus="离异";
             if (1 == response.body.code && response.body.data) {
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

            if(type==6){
              // if(data[0].attachmentType==2){
              //   this.facePhotoUrls=data[0].attachmentUrl;
              //   this.playerOptions.sources[0].src=data[1].attachmentUrl;
              // }else {
              //   this.playerOptions.sources[0].src=data[0].attachmentUrl;
              //   this.facePhotoUrls=data[1].attachmentUrl;


              // }
            }
            if(type==7){
              this.cardbackInfList=data;
              // this.getBaseInf(this.userUuid,7);
            }
            if(type==8){
              let adt=this.addtionInfList;
              data.forEach(function(obj) {
                if(obj.attachmentType==17){
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
                if(obj.attachmentType==4){
                  adt[6]=obj;
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
     // this.getUmobileNum();
     this.getOrderStatus();
     this.getHistoryDetail();
     // this.getCheckRule();
     // this.getcheckSuggest();
     this.orderSchedule();
     this.getlocalLitDetail();
     this.getRemarkList();
     this.getPairVerifySimilarity();
     this.getBaseMobile();
     this.getBaseMobileone();
     this.getBaseMobiletwo();
     this.getlinkman();
     this.copygetlinkman();
     this.getBack();
     this.getRemarkList();
     this.getidentity();
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
  margin: 10px 0;
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
