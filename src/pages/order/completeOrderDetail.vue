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
      <el-col :span="8" class="grid-content">
        <div><span>申请金额:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请时间:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请期限:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>初审人员:</span><span>{{orderStatus.firstChecker}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>复审人员:</span><span>{{orderStatus.secondChecker}}</span></div>
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
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">审核意见</div>
      <table class="reviewTable">
        <tr>
          <td>初审意见</td>
          <td>{{firstCheckSuggest}}</td>
          <td>{{firstReviewSuggest}}</td>
        </tr>
        <tr>
          <td>复审意见</td>
          <td></td>
          <td>{{secondReviewSuggest}}</td>
        </tr>
      </table>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">订单进度</div>
      <el-steps :data="orderProData" :active="active" :align-center="true" finish-status="success">
        <el-step class="ten" v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
          <div slot="description" class="ten">
          {{getdate(item.createTime)}}</div>
        </el-step>
      </el-steps>

    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">历史订单记录</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="120" label="申请次数"></el-table-column>
        <el-table-column prop="createTime" width="240" label="申请时间">
          <template scope="scope">
            <span>{{getdate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="订单编号"></el-table-column>
        <el-table-column prop="status" width="120" label="审核结果">
          <template scope="scope">
            <span>{{getOrderPro(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="审核意见"></el-table-column>
      </el-table>
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
              <td>借款人身份</td>
              <td>已工作</td>
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
          <div class="faceCheck">
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClickone"><br>身份证正面照</div>
          </div>
        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="审核规则">
              </el-form-item>
            </el-form>
            <template v-for="(item,index) in baseRuleList">
              <div class="question_radio">
                <div class="question_text">{{item.description}}</div>
                <div class="radio_box">
                  <el-checkbox :disabled="baseInfShow" v-model="item.ruleResult"></el-checkbox>
                </div>
              </div>
            </template>
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">其他备注</div>
            <el-input
            type="textarea"
            :rows="12"
            placeholder=""
            :disabled="baseInfShow"
            v-model="baseInfRemark"
            class = 'textarear'
            >
          </el-input>
        </div>
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
            <td>公司地址</td>
            <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
          </tr>
          <tr>
            <td>详细地址</td>
            <td>{{jobInfList.detailed}}</td>
          </tr>
          <tr>
            <td>公司电话</td>
            <td>{{jobInfList.companyPhone}}</td>
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
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="80px">
            <el-form-item label="审核规则">
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in jobRuleList">
            <div class="question_radio">
              <div class="question_text">{{item.description}}</div>
              <div class="radio_box">
                <span v-if="index == 3">
                  <el-checkbox :disabled="comphoneLag" v-model="item.ruleResult"></el-checkbox>
                </span>
                <span v-if="index != 3">
                  <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
                </span>
              </div>
            </div>
          </template>
        </div>
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
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="80px">
            <el-form-item label="审核规则">
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in jobRuleList">
            <div class="question_radio">
              <div class="question_text">{{item.description}}</div>
              <div class="radio_box">
                <span v-if="index == 3">
                  <el-checkbox :disabled="comphoneLag" v-model="item.ruleResult"></el-checkbox>
                </span>
                <span v-if="index != 3">
                  <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="containers" v-if="studentSeen">
      <div class="asides">
        <div class="one-title">学校信息</div>
        <table id="studentsInf" border='.1px' width="100%" style="table-layout:fixed;">
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
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" alt="" @click.stop="studentCardUrlClick"></td>
          </tr>
          <tr>
            <td>奖学金照片</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" alt="" @click.stop="scholarshipUrlClick"></td>
          </tr>
          <tr>
            <td>英语证书照片</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" alt="" @click.stop="englishUrlClick"></td>
          </tr>
          <tr>
            <td>计算机证书</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" alt="" @click.stop="ComputerUrlClick"></td>
          </tr>
          <tr>
            <td>校园卡照片</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" alt="" @click.stop="schoolCardUrlClick"></td>
          </tr>
          <tr>
            <td>其他大赛照片</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" alt="" @click.stop="otherCertificateUrlClick"></td>
          </tr>
        </table>
      </div>
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="80px">
            <el-form-item label="审核规则">
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in jobRuleList1">
            <div class="question_radio">
              <div class="question_text">{{item.description}}</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="other_remark">
      <div class="aside_title">其他备注</div>

      <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      :disabled="jobInfShow"
      v-model="jobInfRemark"
      class = 'textarear'
      >
    </el-input>
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
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="审核规则">
          </el-form-item>
        </el-form>
        <template v-for="(item,index) in connectRuleList">
          <div class="question_radio">
            <div class="question_text">{{item.description}}</div>
            <div class="radio_box">
              <el-checkbox :disabled="connectInfShow" v-model="item.ruleResult"></el-checkbox>
            </div>
          </div>
        </template>
      </div>
      <div class="other_remark smallRemark">
        <div class="aside_title">其他备注</div>
        <el-input
        type="textarea"
        :rows="4"
        placeholder=""
        :disabled="connectInfShow"
        v-model="connectInfRemark"
        class = 'textarear'>
      </el-input>
    </div>
  </div>
</div>
</el-row>
<div class="divid-line"></div>
<!-- 人脸识别 faceCheck-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">人脸识别</div>
      <span class="titlePhone">身份证号码：  {{baseInfList.idCardNo}}</span>
      &nbsp;&nbsp;
      <!--   <span class="titlePhone"><span v-if="pairVerifySimilarity.indexOf('face') == -1">活体识别分：</span>  {{pairVerifySimilarity}}</span> -->
      <div class="faceCheck">
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClickone"><br>自拍照</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClickone"><br>身份证正面照</div>
      </div>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="审核规则">
          </el-form-item>
        </el-form>
        <template v-for="(item,index) in faceCheckRuleList">
          <div class="question_radio">
            <div class="question_text">{{item.description}}</div>
            <div class="radio_box">
              <el-checkbox :disabled="faceCheckShow" v-model="item.ruleResult"></el-checkbox>
            </div>
          </div>
        </template>
      </div>
      <div class="other_remark smallRemark">
        <div class="aside_title">其他备注</div>
        <el-input
        type="textarea"
        :rows="9"
        placeholder=""
        :disabled="faceCheckShow"
        v-model="faceCheckRemark"
        class = 'textarear'>
      </el-input>
    </div>
  </div>
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
  <div class="mains">
    <div class="check_rule">
      <el-form label-width="80px">
        <el-form-item label="审核规则">
        </el-form-item>
      </el-form>
      <template v-for="(item,index) in videoCheckRuleList">
        <div class="question_radio">
          <div class="question_text">{{item.description}}</div>
          <div class="radio_box">
            <el-checkbox :disabled="videoCheckShow" v-model="item.ruleResult"></el-checkbox>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>
<div class="other_remark">
  <div class="aside_title">其他备注</div>
  <el-input
  type="textarea"
  :rows="4"
  :disabled="videoCheckShow"
  placeholder=""
  v-model="videoCheckRemark"
  class = 'textarear'>
</el-input>
</div>
</div>
</el-row> -->
<div class="divid-line"></div>
<!-- 补充信息 addtionInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">补充信息</div>
      <div class="faceCheck">
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>{{addtionInfList[0].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>{{addtionInfList[1].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>{{addtionInfList[2].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>{{addtionInfList[3].attachmentName}}
        </div>
        <div class="faceImg" v-if="workerSeen">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>{{addtionInfList[4].attachmentName}}
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>{{addtionInfList[5].attachmentName}}
        </div>
      </div>
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="80px">
            <el-form-item label="审核规则">
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in otherCheckRuleList">
            <div class="question_radio">
              <div class="question_text">{{item.description}}</div>
              <div class="radio_box">
                <el-checkbox :disabled="addtionInfShow" v-model="item.ruleResult"></el-checkbox>
              </div>
            </div>
          </template>
        </div>

        <div class="other_remark smallRemark">
          <el-input
          type="textarea"
          :rows="6"
          placeholder=""
          :disabled="addtionInfShow"
          v-model="addtionInfRemark"
          class = 'textarear'>
        </el-input>
      </div></div>
    </div>
  </div>
</el-row>

<div class="divid-line"></div>
<!-- 电核模块 -->
<el-row>
  <div class="one-title">电核模块<span class="titlePhone">用户手机号码：  {{baseInfList.mobileNumberDES}}</span><span class="titlePhone">姓名：  {{baseInfList.realName}}</span>
    <span class="titlePhone">性别：  {{baseInfList.sex}}</span><span class="titlePhone" v-if="orderStatus.userRole == 3">家庭主妇收入方式：{{familyWomen.incomeType}}</span>
    <span class="titlePhone">公司电话：  {{jobInfList.companyPhone}}</span>
  </div>
  <el-row>
    <span class="two-title">公司电核 &nbsp;</span>
    <template>
      <el-table
      :data="comPhoneChecktableData"
      style="width: 100%">
      <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column label="电核对象" prop="teleReviewOperationType" width="100" sortable>
      <template scope="scope">
        {{getTeleReviewObject(scope.row.teleReviewOperationType, scope.row.teleReviewObject)}}
      </template>
    </el-table-column>
    <el-table-column
    prop="realName"
    label="对象名称"
    width="100">
  </el-table-column>
  <el-table-column
  prop="mobile"
  label="电话号码"
  width="100">
</el-table-column>
<el-table-column
prop="startTime"
label="开始时间"
width="100">
</el-table-column>
<el-table-column
prop="endTime"
label="结束时间"
width="100">
</el-table-column>
<el-table-column
prop="burningTime"
label="时长"
width="80">
</el-table-column>
<el-table-column
prop="teleReviewResult"
label="电核结果"
width="120">
</el-table-column>
<el-table-column
prop="remark"
label="备注信息"
width="120">
</el-table-column>
<!-- <el-table-column
prop="workYear"
label="工作年限">
<template scope="scope">
  <span>{{getWorkType(scope.row.workYear)}}</span>
</template>
</el-table-column> -->
<!--<el-table-column-->
<!--prop="alertTime"-->
<!--label="下次提醒时间"-->
<!--width="120">-->
<!--</el-table-column>-->
<el-table-column prop="updateTime" label="添加备注时间" width="100">
</el-table-column>
<el-table-column
label="操作"
width="170" align="center">
<template scope="scope">
  <el-button-group style="padding:5px;">
    <el-button @click="comDialCheckClick(scope.row,scope.$index,'2', '1')" class="company-pass" type="primary" round size="small">查看详情</el-button>
  </el-button-group>
</template>
</el-table-column>
</el-table>
</template>
<!-- 电核弹窗 -->
<el-dialog
title="备注"
:visible.sync="companyDialogVisible"
width="50%">
<el-col v-if="dialogType === '2'">
  <template>
    <span v-if="this.orderStatus.userRole != 3">问题一：请问{{baseInfList.realName}} 是在贵公司工作吗？</span><br/>
    <span v-if="this.orderStatus.userRole == 3">问题一：请问{{familyWomen.salaryName}} 是在贵公司工作吗？</span><br/>
    <el-radio :disabled="true" v-model="dialogResultRadio1" label="1" @change.native="judgeResult">在职</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio1" label="2" @change.native="judgeResult">已离职</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio1" label="3" @change.native="judgeResult">不确定是否在公司</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio1" label="4" @change.native="judgeResult">拒绝回答</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio1" label="5" @change.native="judgeResult">从未在该公司工作</el-radio>
  </template><br/><br/>
</el-col>
<el-col v-if="dialogType === '2'">
  <template>
    <span>问题二：请问他工作多久了？</span><br/>
    <el-radio :disabled="true" v-model="dialogResultRadio2" label="1">未知</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio2" label="2">3个月以下</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio2" label="3">3-6个月</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio2" label="4">6-12个月</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio2" label="5">1年以上</el-radio>
  </template><br/><br/>
</el-col>
<el-col v-if="dialogType === '2'">
  <template>
    <span>问题三：请问您知道是否有别的公司向他催款吗？</span><br/>
    <el-radio :disabled="true" v-model="dialogResultRadio3" label="1" @change.native="judgeResult">未知</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio3" label="2" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio3" label="3" @change.native="judgeResult">无</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio3" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
    <el-radio :disabled="true" v-model="dialogResultRadio3" label="5" @change.native="judgeResult">对方建议不要借款</el-radio>
  </template><br/><br/>
</el-col>
<!--<el-col v-if="dialogType === '2'">-->
  <!--<template>-->
    <!--<span>信息是否存疑：</span><br/>-->
    <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio4" label="1">是</el-radio>-->
    <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio4" label="2">否</el-radio>-->
    <!--</template>-->
    <!--</el-col>-->
    <el-col v-if="dialogType === '4'">
      <template>
        <div style="font-weight: bold;">您好，请问您是{{realName1}}吗？ 我们是从Do-it平台打来的。请问您认识{{baseInfList.realName}}吗？</div>
        <span>问题一：请问您跟他是什么关系呢？</span><br/>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="1" @change.native="judgeResult">不认识</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="2" @change.native="judgeResult">父母</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="3" @change.native="judgeResult">兄弟姐妹</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="4" @change.native="judgeResult">孩子</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="5" @change.native="judgeResult">朋友</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="6" @change.native="judgeResult"
        v-if="orderStatus.userRole != 3">同事</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="7" @change.native="judgeResult"
        v-if="orderStatus.userRole != 3">客户</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="8" @change.native="judgeResult">夫妻</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="9" @change.native="judgeResult">其他</el-radio>
        <el-radio :disabled="true" v-model="dialogResultRadio5" label="10" @change.native="judgeResult">拒绝回答</el-radio>
      </template><br/><br/>
    </el-col>
    <!--<el-col>-->
      <!--<template v-if="dialogType === '4'">-->
        <!--<span>问题二：请问您和他现在还有联系吗？</span><br/>-->
        <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="1">未知</el-radio>-->
        <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="2">经常联系</el-radio>-->
        <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio6" label="3">很久不联系</el-radio>-->
        <!--</template>-->
        <!--</el-col>-->
        <el-col v-if="dialogType === '4' && orderStatus.userRole != 3">
          <template>
            <span>问题二：请问您知道他现在有工作吗？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio7" label="1" @change.native="judgeResult">未知</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio7" label="2" @change.native="judgeResult">用户无工作</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio7" label="3" @change.native="judgeResult">有工作</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题二：请问{{baseInfList.realName}}家里主要是依靠你赚钱吗？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio_7" label="1" @change.native="judgeResult">是</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_7" label="2" @change.native="judgeResult">否</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole != 3">
          <template>
            <span>问题三：他这份工作大概做了多久了？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio8" label="1">未知</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio8" label="2">3个月以下</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio8" label="3">3-6个月</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio8" label="4">6个月-1年</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio8" label="5">1年以上</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题三：请问您赚钱的方式是什么？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="1">上班</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="2">临时工</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="3">保姆</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="4">gojek</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="5">司机</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="6">开店</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="7">小贩</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="8">收租</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="9">理财</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="10">中介</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="11">种地</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="12">养殖</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="13">投资</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_8" label="14">其他</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题四：请问您月收入多少？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="1">未知</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="2"><2,000,000IDR</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="3">2,000,000~4,000,000IDR</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="4">4,000,000~6,000,000IDR</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="5">6,000,000~8,000,000IDR</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio_9" label="6">>8,000,000IDR</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4'">
          <template>
            <span v-if="orderStatus.userRole != 3">问题四：请问您知道是否有别的公司向他催款吗？</span>
            <span v-if="orderStatus.userRole == 3">问题五：请问您知道是否有别的公司向他催款吗？</span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio9" label="1" @change.native="judgeResult">未知</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio9" label="2" @change.native="judgeResult">无</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio9" label="3" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio9" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio9" label="5" @change.native="judgeResult">建议不要借钱给用户</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4'">
          <template>
            <span v-if="orderStatus.userRole != 3">问题五：如果用户不还款，您是否愿意帮忙还款？ </span>
            <span v-if="orderStatus.userRole == 3">问题六：如果用户不还款，您是否愿意帮忙还款？ </span><br/>
            <el-radio :disabled="true" v-model="dialogResultRadio16" label="1" @change.native="judgeResult">愿意</el-radio>
            <el-radio :disabled="true" v-model="dialogResultRadio16" label="2" @change.native="judgeResult">不愿意</el-radio>
          </template><br/><br/>
        </el-col>
        <!--<el-col v-if="dialogType === '4'">-->
          <!--<template>-->
            <!--<span>信息是否存疑：</span><br/>-->
            <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio10" label="1">是</el-radio>-->
            <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio10" label="2">否</el-radio>-->
            <!--</template>-->
            <!--</el-col>-->

            <el-col v-if="dialogType === '6'">
              <template>
                <div style="font-weight: bold;">您好，请问您是{{realName2}}吗？ 我们是从Do-it平台打来的。请问您认识{{baseInfList.realName}}吗？</div>
                <span>问题一：请问您跟他是什么关系呢？</span><br/>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="1" @change.native="judgeResult">不认识</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="2" @change.native="judgeResult">父母</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="3" @change.native="judgeResult">兄弟姐妹</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="4" @change.native="judgeResult">孩子</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="5" @change.native="judgeResult">朋友</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="6" @change.native="judgeResult"
                v-if="orderStatus.userRole != 3">同事</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="7" @change.native="judgeResult"
                v-if="orderStatus.userRole != 3">客户</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="8" @change.native="judgeResult">夫妻</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="9" @change.native="judgeResult">其他</el-radio>
                <el-radio :disabled="true" v-model="dialogResultRadio11" label="10" @change.native="judgeResult">拒绝回答</el-radio>
              </template><br/><br/>
            </el-col>
            <!--<el-col>-->
              <!--<template v-if="dialogType === '6'">-->
                <!--<span>问题二：请问您和他现在还有联系吗？</span><br/>-->
                <!--<el-radio :disabled="true" v-model="dialogResultRadio12" label="1">未知</el-radio>-->
                <!--<el-radio :disabled="true" v-model="dialogResultRadio12" label="2">经常联系</el-radio>-->
                <!--<el-radio :disabled="true" v-model="dialogResultRadio12" label="3">很久不联系</el-radio>-->
                <!--</template>-->
                <!--</el-col>-->
                <el-col v-if="dialogType === '6' && orderStatus.userRole != 3">
                  <template>
                    <span>问题二：请问您知道他现在有工作吗？</span><br/>
                    <el-radio :disabled="true" v-model="dialogResultRadio13" label="1" @change.native="judgeResult">未知</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio13" label="2" @change.native="judgeResult">用户无工作</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio13" label="3" @change.native="judgeResult">有工作</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col  v-if="dialogType === '6' && orderStatus.userRole == 3">
                  <template>
                    <span>问题二：请问他们家的主要赚钱方式是什么？</span><br/>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="1">上班</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="2">临时工</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="3">保姆</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="4">gojek</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="5">司机</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="6">开店</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="7">小贩</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="8">收租</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="9">理财</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="10">中介</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="11">种地</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="12">养殖</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="13">投资</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_8" label="14">其他</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6' && orderStatus.userRole == 3">
                  <template>
                    <span>问题三：您知道他们家的月收入大概是多少吗？</span><br/>

                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="1">未知</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="2"><2,000,000IDR</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="3">2,000,000~4,000,000IDR</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="4">4,000,000~6,000,000IDR</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="5">6,000,000~8,000,000IDR</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio_9" label="6">>8,000,000IDR</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题三：他这份工作大概做了多久了？</span>
                    <span v-if="orderStatus.userRole == 3">问题四：他这份工作大概做了多久了？</span><br/>
                    <el-radio :disabled="true" v-model="dialogResultRadio14" label="1">未知</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio14" label="2">3个月以下</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio14" label="3">3-6个月</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio14" label="4">6个月-1年</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio14" label="5">1年以上</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题四：请问您知道是否有别的公司向他催款吗？</span>
                    <span v-if="orderStatus.userRole == 3">问题五：请问您知道是否有别的公司向他催款吗？</span><br/>
                    <el-radio :disabled="true" v-model="dialogResultRadio15" label="1" @change.native="judgeResult">未知</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio15" label="2" @change.native="judgeResult">无</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio15" label="3" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio15" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio15" label="5" @change.native="judgeResult">建议不要借钱给用户</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题五：如果用户不还款，您是否愿意帮忙还款？ </span>
                    <span v-if="orderStatus.userRole == 3">问题六：如果用户不还款，您是否愿意帮忙还款？ </span><br/>
                    <el-radio :disabled="true" v-model="dialogResultRadio17" label="1" @change.native="judgeResult">愿意</el-radio>
                    <el-radio :disabled="true" v-model="dialogResultRadio17" label="2" @change.native="judgeResult">不愿意</el-radio>
                  </template><br/><br/>
                </el-col>
                <!--<el-col v-if="dialogType === '6'">-->
                  <!--<template>-->
                    <!--<span>信息是否存疑：</span><br/>-->
                    <!--<el-radio :disabled="true" v-model="dialogResultRadio16" label="1">是</el-radio>-->
                    <!--<el-radio :disabled="true" v-model="dialogResultRadio16" label="2">否</el-radio>-->
                    <!--</template>-->
                    <!--</el-col>-->
                    <el-col>
                      <div class="grid-content bg-purple"><span>电核结果：</span>
                        <template v-if="dialogType === '1'">
                          <el-radio :disabled="true" v-model="dialogResultRadio21" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio21" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio21" label="3">呼入限制/呼叫转移</el-radio>
                        </template>
                        <template v-if="dialogType === '2'">
                          <!--<el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="1" @change.native="getCurrentRow">拒绝回答</el-radio>-->
                          <el-radio :disabled="true" v-model="dialogResultRadio22" label="1" @change.native="getCurrentRow">稍后再拨</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio22" label="2" @change.native="getCurrentRow">信息存疑</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio22" label="3" @change.native="getCurrentRow">拒绝</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio22" label="4" @change.native="getCurrentRow">通过</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio221" label="5">优秀</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio221" label="6">良好</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio221" label="7">一般</el-radio>
                        </template>
                        <template v-if="dialogType === '3'">
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="3">呼叫转移/呼入限制</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="4">不在服务区</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="5">关机</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio23" label="6">停机/已欠费</el-radio>
                        </template>
                        <template v-if="dialogType === '4'">
                          <!--<el-radio :disabled="companyDisabled4 || incognizance" v-model="dialogResultRadio24" label="1" @change.native="setSmallDialog(1)">拒绝回答</el-radio>-->
                          <el-radio :disabled="true" v-model="dialogResultRadio24" label="1">稍后再拨</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio24" label="2">信息存疑</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio24" label="3">拒绝</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio24" label="4">通过</el-radio>
                        </template>
                        <template v-if="dialogType === '5'">
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="3">呼叫转移/呼入限制</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="4">不在服务区</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="5">关机</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio25" label="6">停机/已欠费</el-radio>
                        </template>
                        <template v-if="dialogType === '6'">
                          <!--<el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="1" @change.native="setSmallDialog(2)">拒绝回答</el-radio>-->
                          <el-radio :disabled="true" v-model="dialogResultRadio26" label="1">稍后再拨</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio26" label="2">信息存疑</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio26" label="3">拒绝</el-radio>
                          <el-radio :disabled="true" v-model="dialogResultRadio26" label="4">通过</el-radio>
                        </template>
                      </div>
                    </el-col>
                    <el-col>
                      <span>备注：</span>
                      <el-input
                      type="textarea"
                      :rows="8"
                      placeholder="不超过800字"
                      v-model="checkTextarea"
                      :disabled="true"
                      class = 'textarear'>
                    </el-input>
                  </el-col>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="phoneCheckBack(dialogType)">取 消</el-button>
                  </span>
                </el-dialog>
              </el-row>
              <div class="divid-line"></div>
              <el-row>
                <el-col :span="2"><div class="grid-content bg-purple">问题一：</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[0].question}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
                <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[0].question === '请问您身份证上的居住地址是哪里?'">
                  <img :src="phoneCheckQuestions[0].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[0].answer)" alt="" width="150px" height="100px">
                </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[0].answer}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <template>
                      <el-radio v-model="phoneRadio1" label="1" disabled >正确</el-radio>
                      <el-radio v-model="phoneRadio1" label="0" disabled >错误</el-radio>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><div class="grid-content bg-purple">问题二：</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[1].question}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
                <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[1].question === '请问您身份证上的居住地址是哪里?'">
                  <img :src="phoneCheckQuestions[1].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[1].answer)" alt="" width="150px" height="100px">
                </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[1].answer}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <template>
                      <el-radio v-model="phoneRadio2" label="1" disabled >正确</el-radio>
                      <el-radio v-model="phoneRadio2" label="0" disabled >错误</el-radio>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2"><div class="grid-content bg-purple">问题三：</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[2].question}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>
                <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[2].question === '请问您身份证上的居住地址是哪里?'">
                  <img :src="phoneCheckQuestions[2].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[2].answer)" alt="" width="150px" height="100px">
                </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[2].answer}}</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>
                <el-col :span="5">
                  <div class="grid-content bg-purple">
                    <template>
                      <el-radio v-model="phoneRadio3" label="1" disabled >正确</el-radio>
                      <el-radio v-model="phoneRadio3" label="0" disabled >错误</el-radio>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <span class="two-title">本人审核 &nbsp;</span>
                <template>
                  <el-table
                  :data="phoneChecktableData"
                  style="width: 100%">
                  <el-table-column
                  type="index"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="开始时间"
                width="160">
              </el-table-column>
              <el-table-column
              prop="endTime"
              label="结束时间"
              width="160">
            </el-table-column>
            <el-table-column
            prop="burningTime"
            label="时长"
            width="120">
          </el-table-column>
          <el-table-column
          prop="teleReviewResult"
          label="电核结果"
          width="220">
        </el-table-column>
        <el-table-column
        prop="remark"
        label="备注信息"
        width="220">
      </el-table-column>
      <el-table-column
      prop="alertTime"
      label="下次提醒时间"
      width="160">
    </el-table-column>
    <el-table-column prop="updateTime" label="添加备注时间" width="220">
    </el-table-column>
  </el-table>
</template>
</el-row>
</el-row>
<!-- 催收记录 -->
<div class="divid-line"></div>
<el-row>
  <h1 class="one-title">催收记录</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
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
        muted: false,
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
      familyWomen: {
        companyName: '',
        companyPhone:'',
        salaryName:'',
        incomeType:'',
      },
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
      historyLoading: false,
      facePhotoUrls:'',
      orderRemarkLoading:false,
      ruleResult:'',
      orderRemarkList:[],
      pairVerifySimilarity:'',

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          firstChecker:'',
          borrowUse:''
        },
        status: '', //审核结果
        remark: '', //审核意见

        //电话
        comPhoneChecktableData:[],
        phoneCheckQuestions: [{"question":"","answer":"","result":"1"},
        {"question":"","answer":"","result":"1"}
        ,{"question":"","answer":"","result":"1"}],
        phoneRadio1: "1",
        phoneRadio2: "1",
        phoneRadio3: "1",
        phoneChecktableData: [],
        facePhotoUrls:'',
        phoneCheckDialogVisible: false,
        comphoneLag: false,
        phoneCheckTextarea: '',
        phoneCheckDate: '',
        isActive:true,
        noActive:false,
        phoneCheckStartVif: true,
        phoneCheckEndVif: false,
        recordStartTime: '',
        recordEndTime: '',
        phoneCheckDialogLoading: false,
        phoneCheckId: '',
        phoneCheckIndex: '',
        textarea: '',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        //baseInf 客户基本信息
        companyDialogVisible: false,
        dialogType:'1',

        // 基本信息
        baseInfList: {},
        historyData: [],
        jobInfList: {},
        connectInfList: [],
        flager:true,

        // radio显示
        baseInfShow: true,
        jobInfShow: true,
        connectInfShow: true,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        checkTextarea: '',
        //备注
        baseInfRemark: '',
        insuranceHitOrNot: false,
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
      // 审核规则
      baseRuleList: [],
      baseRuleList1: [],
      jobRuleList: [],
      jobRuleList1: [],
      connectRuleList: [],
      faceCheckRuleList: [],
      videoCheckRuleList: [{
        "ruleCount":1,
        "ruleLevel":1,
        "ruleResult":false,
        "description":'1、视频中人非用户本人？',
        "descriptionInn":'1.Orang dalam video bukanlah nasabah itu sendiri？'
      },{
        "ruleCount":2,
        "ruleLevel":4,
        "ruleResult":false,
        "description":'2、视频是他人代读/有人指导？',
        "descriptionInn":'2.Video tersebut dibaca oleh seseorang / seseorang diinstruksikan？'
      },{
        "ruleCount":3,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'3、看不清/看不到人脸?',
        "descriptionInn":'3.Tidak terlihat jelas / wajah tidak terlihat?'
      },
      {
        "ruleCount":4,
        "ruleLevel":3,
        "ruleResult":false,
        "description":'4、视频破损？',
        "descriptionInn":'4.Video tidak dibaca？'
      }],
      otherCheckRuleList: [],
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
      familyCard: false,
      workYear:[{
        code: 'DEFALUT',
        name: '',
        value:'0'
      },{
        code: 'WEIZHI',
        name: '未知',
        value:'1'
      },{
        code: 'THREEMONTH',
        name: '3个月以下',
        value:'2'
      },{
        code: 'THREE_SIX_MONTH',
        name: '3-6个月',
        value:'3'
      },{
        code: 'SIX_TWELE_MONTH',
        name: '6-12个月',
        value:'4'
      },{
        code: 'ONE_THREE_YEAR',
        name: '1-3年',
        value:'5'
      },{
        code: 'THREE_YEAR_UP',
        name: '3年以上',
        value:'6'
      }],
      workerSeen: true,
      studentSeen: false,
      familySeen: false,
      userUuid: "",
      uuid: "",
      IsStudents: false,
      firstReviewSuggest: '',
      firstCheckSuggest: '',
      secondReviewSuggest: '',
      active: 2,
      orderProData: '',
      videoShowOrNot: true,
      dialogResultRadio_7:"0",
      dialogResultRadio_8:"0",
      dialogResultRadio_9:"0",

      dialogResultRadio: "0",
      dialogResultRadio21: "0",
      dialogResultRadio22: "0",
      companyResultDisabled: true,
      dialogResultRadio221: "0",
      dialogResultRadio23: "0",
      dialogResultRadio24: "0",
      dialogResultRadio25: "0",
      dialogResultRadio26: "0",
      dialogResultRadio2:"0",
      dialogResultRadio1:"0",
      dialogResultRadio3:"0",
//        dialogResultRadio4:"0",
dialogResultRadio5:"0",
dialogResultRadio6:"0",
dialogResultRadio7:"0",
dialogResultRadio8:"0",
dialogResultRadio9:"0",
//        dialogResultRadio10:"0",
dialogResultRadio11:"0",
dialogResultRadio12:"0",
dialogResultRadio13:"0",
dialogResultRadio14:"0",
dialogResultRadio15:"0",
//        dialogResultRadio16:"0",
dialogResultRadio16:"0",
dialogResultRadio17:"0",
realName1: '',
realName2: '',
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
      getTeleReviewObject(scope, teleReviewObject) {

        let _data = '';
        if (scope == 1 || scope == 2 || teleReviewObject == '1') {
          _data = '所在公司';
        } else if (scope == 3 || scope == 4 || teleReviewObject == '2') {
          _data = '第一紧急联系人';
        } else if (scope == 5 || scope == 6 || teleReviewObject == '3') {
          _data = '第二紧急联系人';
        }
        return _data;
      },
      getOrderPro(val) {//订单进度
        let urlCheck=window.location.hash;
        if(urlCheck.indexOf('Inn')!==-1){
          let re = '';
          this.orderPros.forEach(function(obj) {
            if (obj.code == val) {
              re = obj.name;
              return
            }
          });
          console.log(re)
          return re
        }else{
          return enums.getOrderPro(val)
        }
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
     setFrequestName() {
      let _data={
        "orderNo": this.uuid
      };
      this.$http.post("manage/frequentOrderUserCallRecordMongo", _data).then(response => {

        let result = response.body.data;
        if (result && result.length != 0) {
          this.realName1 = result[0].realName;
        }
        if (result && result.length == 2) {
          this.realName2 = result[1].realName;
        }
      });
    },
    getWorkType(type) {
      let re = '';
      this.workYear.forEach(obj => {
        if (obj.value == type) {
          re = obj.name;
          return re;
        }
      });
      return re;
    },
    //活体识别分
    getPairVerifySimilarity(){
      let _data={
        "userUuid":this.userUuid,
        "orderNo":this.uuid
      }
      this.$http.post("manage/getPairVerifySimilarity", _data).then(response => {
        if (1 == response.body.code && response.body.data) {
          this.pairVerifySimilarity = response.body.data;
        }
        if (this.pairVerifySimilarity >40 && this.pairVerifySimilarity <60 && this.addtionInfList[1].attachmentUrl) {
         this.flager = true;
       }else {
         this.flager = false;
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
            }else if (this.orderStatus.userRole == 2){
              this.workerSeen=true;
              this.studentSeen=false;
              this.familySeen=false;
            } else if (this.orderStatus.userRole == 3) {
              this.workerSeen=false;
              this.studentSeen=false;
              this.familySeen=true;
              var request = {
                "userUuid": this.userUuid,
              };
              this.$http.post("manage/getHouseWifiInfo", request).then(response => {
                if (1==response.body.code) {
                  this.familyWomen = response.body.data;
                }
              })
            }
            this.getBaseInf(this.userUuid,3);
            this.getBaseInf(this.userUuid,4);
            this.getBaseInf(this.userUuid,5);
            this.getBaseInf(this.userUuid,6);
            this.getBaseInf(this.userUuid,7);
            this.getBaseInf(this.userUuid,8);
            this.getBaseInf(this.userUuid,9);
            this.judgeInsuranceHitOrNot();
            this.judgefamilyCard();
            // this.judgecomphoneLag();
          }
        })
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

       //获取电核信息
       getPhoneCheck(type){
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "langue":1,
          "teleReviewType":1
        };
        this.$http.post("manage/getTeleReviewRecords", _data).then(response => {
          if(1 == response.body.code) {
            if (response.body.data.questions.length>0) {
              this.phoneCheckQuestions=response.body.data.questions;
              this.phoneRadio1 = this.phoneCheckQuestions[0].result;
              this.phoneRadio2 = this.phoneCheckQuestions[1].result;
              this.phoneRadio3 = this.phoneCheckQuestions[2].result;
            }

            if (response.body.data.remarks) {
             let res=response.body.data.remarks;
             res.forEach(e=>{
              if(e.startTime){
                e.startTime=this.getdate(e.startTime);
              }
              if(e.endTime){
                e.endTime=this.getdate(e.endTime);
              }
              if(e.alertTime){
                e.alertTime=this.getdate(e.alertTime);
              }
              if (e.updateTime && e.remark) {
                e.updateTime = this.getdate(e.updateTime);
              }

            });
             this.phoneChecktableData=res;
           }



         }});
       //公司电核
       _data.teleReviewType = 3;
       this.$http.post("manage/getTeleReviewRecords", _data).then(response => {
        if(1 == response.body.code && response.body.data.remarks) {
          let res=response.body.data.remarks;
          res.forEach(e=>{
            if(e.startTime){
              e.startTime=this.getdate(e.startTime);
            }
            if(e.endTime){
              e.endTime=this.getdate(e.endTime);
            }
            if(e.alertTime){
              e.alertTime=this.getdate(e.alertTime);
            }
            if (e.updateTime) {
              e.updateTime = this.getdate(e.updateTime);
            }
              // e.current=false;
            });

          this.comPhoneChecktableData=res;
        }

      })
     },
     judgeInsuranceHitOrNot() {

      this.$http.post('manage/isUserHitRuleForInsuranceCard',{'orderNo':this.uuid}).then(response => {
        if (response.body.data) {
          this.insuranceHitOrNot = true;
        }
      })
    },
    judgefamilyCard() {

      this.$http.post('manage/isUserHitRuleForHomeCard',{'orderNo':this.uuid}).then(response => {
        if (response.body.data) {
          this.familyCard = true;
        }
      })
    },
    judgecomphoneLag() {

      this.$http.post('manage/isUserHitGooglePhone',{'orderNo':this.uuid}).then(response => {
        if (response.body.data) {
          this.comphoneLag = true;
        }
      })
    },

      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 1
        }
        this.$http.post("manage/CheckRemarkListByOrderNo", _data).then(response => {
          if (1 == response.body.code && response.body.data.remark) {
            if(response.body.data[0].type==1){
              this.firstReviewSuggest=response.body.data[0].remark;
              this.firstCheckSuggest = response.body.data[0].suggest;
            }else{
              this.secondReviewSuggest=response.body.data[0].remark
            }
            if(response.body.data[1].type==1){
              this.firstReviewSuggest=response.body.data[1].remark;
              this.firstCheckSuggest = response.body.data[1].suggest;
            }else{
              this.secondReviewSuggest=response.body.data[1].remark
            }
          }
        })
      },
      getOrderTag(type){
        return enums.getOrderTagList(type);
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

      //获取Peraturan verifikasi
      getCheckRule(){
        for(let type=1;type<9;type++){
          if (type == 7) {
            continue;
          }
          let _data={
            "orderNo": this.uuid,
            "infoType": type
          }
          this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
            if (1 == response.body.code ) {
              let data=response.body.data;
              if (response.body.data.checkRuleList[0]
                && response.body.data.checkRuleList[0].description != undefined) {
                if(type==1&&response.body.data.checkRuleList.length!=0){this.baseRuleList=data.checkRuleList;
                }
                if(type==2&&response.body.data.checkRuleList.length!=0){this.baseRuleList1=data.checkRuleList;}
                if(type==3&&response.body.data.checkRuleList.length!=0){this.jobRuleList=data.checkRuleList;}
                if(type==4&&response.body.data.checkRuleList.length!=0){this.jobRuleList1=data.checkRuleList;}
                if(type==5&&response.body.data.checkRuleList.length!=0){this.connectRuleList=data.checkRuleList;}
                if(type==6&&response.body.data.checkRuleList.length!=0){this.faceCheckRuleList=data.checkRuleList;}
                // if(type==7&&response.body.data.checkRuleList.length!=0){this.videoCheckRuleList=data.checkRuleList;}
                if(type==8&&response.body.data.checkRuleList.length!=0){this.otherCheckRuleList=data.checkRuleList;}
              }
//              if (type ==1) {
//              //先判断家庭卡，在判断保险卡
//              this.$http.post('manage/isUserHitRuleForHomeCard',{'orderNo':this.uuid}).then(response => {
//                if (!response.body.data) {
//                  this.baseRuleList.splice(17,6);
//                }
//                this.$http.post('manage/isUserHitRuleForInsuranceCard',{'orderNo':this.uuid}).then(response => {
//                  if (!response.body.data) {
//                    this.baseRuleList.splice(11,6);
//                  }
//                })
//              })
//            }

if(type==1&&data.checkRuleRemark.remark!=''){this.baseInfRemark=data.checkRuleRemark.remark;}
if(type==2&&data.checkRuleRemark.remark!=''){this.baseInfRemark=data.checkRuleRemark.remark;}
if(type==3){this.jobInfRemark=data.checkRuleRemark.remark;}
if(type==4){this.jobInfRemark=data.checkRuleRemark.remark}
  if(type==5){this.connectInfRemark=data.checkRuleRemark.remark}
    if(type==6){this.faceCheckRemark=data.checkRuleRemark.remark}
      if(type==7){this.videoCheckRemark=data.checkRuleRemark.remark}
        if(type==8){this.addtionInfRemark=data.checkRuleRemark.remark}

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
          if (1 == response.body.code && response.body.data) {
            Object.assign(this.baseInfList,response.body.data);
            this.baseInfList=Object.assign({},this.baseInfList);
            if(this.baseInfList.maritalStatus==0){
              this.baseInfList.maritalStatus="Belum menikah"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="Sudah menikah"
            }else {
              this.baseInfList.maritalStatus="Cerai hidup"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="Tidak diketahui"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="Laki-laki"
            }else {
              this.baseInfList.sex="Perempuan"
            }

          }
        })
      },
      rowClick(row){
        window.open('#/completeOrderDetailInn?seen=true&userUuid='+row.userUuid+
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
      // 点击添加公司弹框事件
      comDialCheckClick(row){
        this.companyDialogVisible = true;
        this.realName = row.realName;
        this.mobile = row.mobile;
        if(row.id){
          this.comPhoneCheckId=row.id
        } else {
          this.comPhoneCheckId='';
        }
        //数据回显
        let _data={
          "orderNo": this.uuid,
          "type": this.orderStatus.userRole,
          "uuid": this.userUuid,
          "langue":1,
          "teleReviewType":3
        };
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {
          let questions = response.body.data.questions;
          this.checkTextarea = row.remark;
          //先处理没有问题的情况
          if (row.teleReviewOperationType === 1) {
            this.dialogResultRadio21 = "" + row.teleReviewResultType;
          } else if (row.teleReviewOperationType === 3) {
            this.dialogResultRadio23 = "" + row.teleReviewResultType;
          } else if (row.teleReviewOperationType === 5) {
            this.dialogResultRadio25 = "" + row.teleReviewResultType;
          } else if (row.teleReviewOperationType === 2) {
//              debugger;
this.dialogResultRadio22 = "" + row.teleReviewResultType;
this.dialogResultRadio221 = "" + row.teleReviewResultType;
for (let i = 0; i < questions.length ; i++) {
  if (questions[i].manOrderRemarkId === row.id) {
    this.dialogResultRadio1 = questions[i].answer;
    this.dialogResultRadio2 = questions[i+1].answer;
    this.dialogResultRadio3 = questions[i+2].answer;
    break;
  }
}
} else if (row.teleReviewOperationType === 4) {
  this.dialogResultRadio24 = "" + row.teleReviewResultType;
  for (let i = 0; i < questions.length ; i++) {
    if (questions[i].manOrderRemarkId === row.id) {
      if (this.orderStatus.userRole == 3) {
        this.dialogResultRadio5 = questions[i].answer;
        this.dialogResultRadio_7 = questions[i+1].answer;
        this.dialogResultRadio_8 = questions[i+2].answer;
        this.dialogResultRadio_9 = questions[i+3].answer;
        this.dialogResultRadio9 = questions[i+4].answer;
        this.dialogResultRadio16 = questions[i+5].answer;
      } else {
        this.dialogResultRadio5 = questions[i].answer;
        this.dialogResultRadio7 = questions[i+1].answer;
        this.dialogResultRadio8 = questions[i+2].answer;
        this.dialogResultRadio9 = questions[i+3].answer;
        this.dialogResultRadio16 = questions[i+4].answer;
      }
      break;
    }
  }
} else if (row.teleReviewOperationType === 6) {
  this.dialogResultRadio26 = "" + row.teleReviewResultType;
  for (let i = 0; i < questions.length ; i++) {
    if (questions[i].manOrderRemarkId === row.id) {
      if (this.orderStatus.userRole == 3) {
        this.dialogResultRadio11 = questions[i].answer;
        this.dialogResultRadio_8 = questions[i+1].answer;
        this.dialogResultRadio_9 = questions[i+2].answer;
        this.dialogResultRadio14 = questions[i+3].answer;
        this.dialogResultRadio15 = questions[i+4].answer;
        this.dialogResultRadio17 = questions[i+5].answer;
      } else {
        this.dialogResultRadio11 = questions[i].answer;
        this.dialogResultRadio13 = questions[i+1].answer;
        this.dialogResultRadio14 = questions[i+2].answer;
        this.dialogResultRadio15 = questions[i+3].answer;
        this.dialogResultRadio17 = questions[i+4].answer;
      }

      break;
    }
  }
}
});
        if (row.teleReviewOperationType === 1) {
          this.dialogType = '1';
        } else if (row.teleReviewOperationType === 2) {
          this.dialogType = '2';
        } else if (row.teleReviewOperationType === 3) {
          this.dialogType = '3';
        } else if (row.teleReviewOperationType === 4) {
          this.dialogType = '4';
        } else if (row.teleReviewOperationType === 5) {
          this.dialogType = '5';
        } else if (row.teleReviewOperationType === 6) {
          this.dialogType = '6';
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

      getRemarkList() {
        this.$http.post("manage/byStagesBillInfo",{uuid:this.uuid}).then(response =>{
          let {body} = response;
          if(1 == body.code && body.data){
            this.billData= body.data;
          }
        }).catch(e =>{})
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

      handIdCardUrlClickone(){
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
    kkCardPhotourl(){
     if(this.baseInfList.kkCardPhoto){
      let _photoList = [
      this.baseInfList.kkCardPhoto
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
        "type": type,
        "langue":1,
        "checkQualityOrNot": true,
      }
      let urlss = 'manage/orderUserDataSql';
      this.$http.post(urlss, _data).then(response => {
        this.historyLoading = false;
        if (1 == response.body.code && response.body.data) {
          var data=response.body.data;
          if(type==2){
            this.$http.post(urlss,_data).then(response => {
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
          // if(type==6){
          //   if(data[0].attachmentType==2){
          //     this.facePhotoUrls=data[0].attachmentUrl;
          //     this.playerOptions.sources[0].src=data[1].attachmentUrl;
          //   }else {

          //     this.playerOptions.sources[0].src=data[0].attachmentUrl;
          //     this.facePhotoUrls=data[1].attachmentUrl;
          //   }
          // }
          if(type==7){
            this.cardbackInfList=data;
              // this.getBaseInf(this.userUuid,7);
            }
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
    phoneCheckBack(dialogType){
      this.checkDialogVisible = false;
      this.companyDialogVisible = false;
      if (!this.companyDisabled) {
        this.checkTextarea="";
        this.dialogResultRadio="0";
        if (dialogType == '1') {
          this.dialogResultRadio21 = '0';
        } else if (dialogType == '2') {
          this.dialogResultRadio22 = '0';
          this.dialogResultRadio221 = '0';
          this.dialogResultRadio1 = '0';
          this.dialogResultRadio2 = '0';
          this.dialogResultRadio3 = '0';
//            this.dialogResultRadio4 = '0';
} else if (dialogType == '3') {
  this.dialogResultRadio23 = '0';
} else if (dialogType == '4') {
  this.dialogResultRadio24 = '0';
  this.dialogResultRadio5 = '0';
  this.dialogResultRadio6 = '0';
  this.dialogResultRadio7 = '0';
  this.dialogResultRadio8 = '0';
  this.dialogResultRadio9 = '0';
  this.dialogResultRadio16 = '0';
  this.helpPay = false;
//            this.dialogResultRadio10 = '0';
} else if (dialogType == '5') {
  this.dialogResultRadio25 = '0';
} else if (dialogType == '6') {
  this.dialogResultRadio26 = '0';
  this.dialogResultRadio11 = '0';
  this.dialogResultRadio12 = '0';
  this.dialogResultRadio13 = '0';
  this.dialogResultRadio14 = '0';
  this.dialogResultRadio15 = '0';
  this.dialogResultRadio17 = '0';
  this.helpPay1 = false;
//            this.dialogResultRadio16 = '0';
}
}
this.workYearRadio = "0";
},
},
mounted: function () {
  this.uuid = this.$route.query['uuid']||'';
  this.userUuid = this.$route.query['userUuid']||'';
  this.sessionId=DataUtil.sid();
  this.getOrderStatus();
  this.getHistoryDetail();
  this.getCheckRule();
  this.getcheckSuggest();
  this.orderSchedule();
  this.getPhoneCheck();
  this.getRemarkList();
  this.getPairVerifySimilarity();
  this.setFrequestName();
  this.getRemarkList();
}
}
</script>

<style>
.reviewTable {
  border-spacing: 0;
  border: 1px solid gray;
  margin: 20px auto;
}
.reviewTable td {
  text-align: center;
  border: 1px solid gray;
  height: 40px;
  line-height: 40px;
  word-wrap:break-word;
  width: 400px;
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
  font-size: 15px;
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
    margin: 0 auto;
    width: 200px;
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
 .titlePhone {
  /*float: left;*/
  display: inline-block;
  margin: 10px 40px;
  font-size: 14px;
  font-weight: 400;

}
.textarear .el-textarea__inner{
  font-size:15px;
  font-weight: 900;
}
.el-radio__inner{
  width: 14px;
  height: 14px;
}
.el-radio__label {
  font-size:13px;
}
</style>
