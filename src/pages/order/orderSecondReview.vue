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
        <div><span>申请期限:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>初审人员:</span><span>{{orderStatus.firstChecker}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>借款用途:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>实名认证:</span><span> <el-tag :type="orderStatus.realNameAuthFlag==true?'danger':''"><span>{{orderStatus.realNameAuthFlag==true?"是":"否"}}</span></el-tag></span></div>
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
    <el-row>
      <div class="one-title">历史订单记录</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="120" label="申请次数"></el-table-column>
        <el-table-column prop="createTime" width="240" label="申请时间">
          <template scope="scope">
            <span>{{getdates(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="订单编号"></el-table-column>
        <el-table-column prop="status" width="120" label="审核结果">
          <template scope="scope">
            <span>{{getenums(scope.row.status)}}</span>
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
        <!--<div class="faceCheck" v-if="insuranceHitOrNot">-->
          <!--<div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.insuranceCardUrl"  @click.stop="insuranceCardUrl"><br>保险卡</div>-->
          <!--</div>-->
          <!--<div class="faceCheck" v-if="familyCard">-->
            <!--<div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.kkCardPhoto"  @click.stop="kkCardPhotourl"><br>家庭卡</div>-->
            <!--</div>-->
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
                  <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
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
                  <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
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
      <span class="titlePhone">身份证号码：  {{baseInfList.idCardNo}}</span>&nbsp;&nbsp;
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
<el-row>
  <div class="one-title">
    订单复审标签
  </div>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="operatorTypeList">
    <el-table-column type="index" label="序号" width="200">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间">
      <template scope="scope">{{getdate(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="userName" label="操作者">
    </el-table-column>
    <el-table-column prop="operatorType" label="操作">
      <template scope="scope">{{getOperatorType(scope.row.operatorType)}}</template>
    </el-table-column>
  </el-table>
</el-row>

<div class="divid-line"></div>
<!-- 电话审核 -->
<el-row>
  <div class="one-title">电核模块<span class="titlePhone">用户手机号码：  {{baseInfList.mobileNumberDES}}</span><span class="titlePhone">姓名：  {{baseInfList.realName}}</span>
    <span class="titlePhone">性别：  {{baseInfList.sex}}</span> <span class="titlePhone" v-if="orderStatus.userRole == 3">家庭主妇收入方式：{{familyWomen.incomeType}}</span>
  </div>

  <el-row>
    <span class="two-title">公司与联系人电核</span>
  </el-row>
  <el-row>
    请选择本次电核对象：
    <el-radio v-model="teleReviewObject" :disabled="companyObjDisabled" label="1" @change.native="whichTeleReviewObj">所在公司</el-radio>
    <el-radio v-if="orderStatus.userRole != 3" v-model="teleReviewObject" :disabled="firstObjDisabled" label="2" @change.native="whichTeleReviewObj">第一紧急联系人</el-radio>
    <el-radio v-if="orderStatus.userRole == 3" v-model="teleReviewObject" :disabled="firstObjDisabled" label="2" @change.native="whichTeleReviewObj">家庭收入来源者</el-radio>
    <el-radio v-if="orderStatus.userRole != 3" v-model="teleReviewObject" :disabled="secondObjDisabled" label="3" @change.native="whichTeleReviewObj">第二紧急联系人</el-radio>
    <el-radio v-if="orderStatus.userRole == 3" v-model="teleReviewObject" :disabled="secondObjDisabled" label="3" @change.native="whichTeleReviewObj">紧急联系人</el-radio>
    <el-button v-if="comPhoneCheckStartVif" @click="comPhoneCheckStart" type="primary">开始</el-button>
    <template>
      <el-table
      :data="comPhoneChecktableData"
      style="width: 100%" highlight-current-row>
      <el-table-column
      type="index"
      label="序号"
      min-width="70">
    </el-table-column>
    <el-table-column
    prop="teleReviewObject"
    label="电核对象"
    min-width="80">
  </el-table-column>
  <el-table-column
  prop="realName"
  label="对象名称"
  min-width="80">
</el-table-column>
<el-table-column
prop="mobile"
label="电核号码"
min-width="80">
</el-table-column>
<el-table-column
prop="startTime"
label="开始时间"
min-width="80">
</el-table-column>
<el-table-column
prop="endTime"
label="结束时间"
min-width="80">
</el-table-column>
<el-table-column
prop="burningTime"
label="时长"
min-width="90">
</el-table-column>
<el-table-column
prop="teleReviewResult"
label="电核结果"
min-width="90">
</el-table-column>
<el-table-column
prop="remark"
label="备注信息"
min-width="90">
</el-table-column>
          <!--   <el-table-column
              prop="alertTime"
              label="下次提醒时间"
              width="105">
            </el-table-column> -->
          <!--   <el-table-column prop="updateTime" label="添加备注时间" width="105">
          </el-table-column> -->
          <el-table-column
          label="操作"
          width="170" align="center">
          <template scope="scope">
            <el-button-group style="padding:5px;">
              <el-button v-if="scope.row.teleReviewOperationType==0" @click="comDialCheckClick(scope.row,scope.$index,'1','0')"  type="primary" class="company-pass" round size="medium">接通</el-button>
              <el-button v-if="scope.row.teleReviewOperationType==0" @click="comDialCheckClick(scope.row,scope.$index,'0','0')" class="company-pass" type="danger" round size="medium">未接通</el-button>
              <el-button v-if="scope.row.teleReviewOperationType!=0" @click="comDialCheckClick(scope.row,scope.$index,'2', '1')" class="company-pass" type="primary" round size="medium">查看详情</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-dialog title="拒绝原因"
    :visible.sync="smallCompanyDialogVisible"
    width="25%">
    <el-col>
      <el-input
      type="textarea"
      :rows="8"
      placeholder="请输入拒绝原因"
      v-model="rejectReason"
      class = 'textarear'>
    </el-input>
  </el-col>
  <span slot="footer" class="dialog-footer">
    <el-button @click="smallCompanyCancel">取 消</el-button>
    <el-button type="primary" @click="smallCompanyOk">确 定</el-button>
  </span>
</el-dialog>
<!-- 电核弹窗 -->
<el-dialog
title="备注"
:visible.sync="companyDialogVisible"
width="50%">
<el-col v-if="dialogType === '2'">
  <template>
    <span v-if="this.orderStatus.userRole != 3">问题一：请问{{baseInfList.realName}} 是在贵公司工作吗？</span><br/>
    <span v-if="this.orderStatus.userRole == 3">问题一：请问{{familyWomen.salaryName}} 是在贵公司工作吗？</span><br/>
    <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="1" @change.native="judgeResult">在职</el-radio>
    <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="2" @change.native="judgeResult">已离职</el-radio>
    <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="3" @change.native="judgeResult">不确定是否在公司</el-radio>
    <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="4" @change.native="judgeResult">拒绝回答</el-radio>
    <el-radio :disabled="companyDisabled" v-model="dialogResultRadio1" label="5" @change.native="judgeResult">从未在该公司工作</el-radio>
  </template><br/><br/>
</el-col>
<el-col v-if="dialogType === '2'">
  <template>
    <span>问题二：请问他工作多久了？</span><br/>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio2" label="1">未知</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio2" label="2">3个月以下</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio2" label="3">3-6个月</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio2" label="4">6-12个月</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio2" label="5">1年以上</el-radio>
  </template><br/><br/>
</el-col>
<el-col v-if="dialogType === '2'">
  <template>
    <span>问题三：请问您知道是否有别的公司向他催款吗？</span><br/>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio3" label="1" @change.native="judgeResult">未知</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio3" label="2" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio3" label="3" @change.native="judgeResult">无</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio3" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
    <el-radio :disabled="companyDisabled || incognizance_1" v-model="dialogResultRadio3" label="5" @change.native="judgeResult">对方建议不要借款</el-radio>
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
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="1" @change.native="judgeResult">不认识</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="2" @change.native="judgeResult">父母</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="3" @change.native="judgeResult">兄弟姐妹</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="4" @change.native="judgeResult">孩子</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="5" @change.native="judgeResult">朋友</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="6" @change.native="judgeResult"
        v-if="orderStatus.userRole != 3">同事</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="7" @change.native="judgeResult"
        v-if="orderStatus.userRole != 3">客户</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="8" @change.native="judgeResult">夫妻</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="9" @change.native="judgeResult">其他</el-radio>
        <el-radio :disabled="companyDisabled" v-model="dialogResultRadio5" label="10" @change.native="judgeResult">拒绝回答</el-radio>
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
            <el-radio :disabled="companyDisabled || incognizance" v-model="dialogResultRadio7" label="1" @change.native="judgeResult">未知</el-radio>
            <el-radio :disabled="companyDisabled || incognizance" v-model="dialogResultRadio7" label="2" @change.native="judgeResult">用户无工作</el-radio>
            <el-radio :disabled="companyDisabled || incognizance" v-model="dialogResultRadio7" label="3" @change.native="judgeResult">有工作</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题二：请问{{baseInfList.realName}}家里主要是依靠你赚钱吗？</span><br/>
            <el-radio :disabled="companyDisabled || incognizance" v-model="dialogResultRadio_7" label="1" @change.native="judgeResult">是</el-radio>
            <el-radio :disabled="companyDisabled || incognizance" v-model="dialogResultRadio_7" label="2" @change.native="judgeResult">否</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole != 3">
          <template>
            <span>问题三：他这份工作大概做了多久了？</span><br/>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio8" label="1">未知</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio8" label="2">3个月以下</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio8" label="3">3-6个月</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio8" label="4">6个月-1年</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio8" label="5">1年以上</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题三：请问您赚钱的方式是什么？</span><br/>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="1">上班</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="2">临时工</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="3">保姆</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="4">gojek</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="5">司机</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="6">开店</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="7">小贩</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="8">收租</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="9">理财</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="10">中介</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="11">种地</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="12">养殖</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="13">投资</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_8" label="14">其他</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4' && orderStatus.userRole == 3">
          <template>
            <span>问题四：请问您月收入多少？</span><br/>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="1">未知</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="2"><2,000,000IDR</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="3">2,000,000~4,000,000IDR</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="4">4,000,000~6,000,000IDR</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="5">6,000,000~8,000,000IDR</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio_9" label="6">>8,000,000IDR</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4'">
          <template>
            <span v-if="orderStatus.userRole != 3">问题四：请问您知道是否有别的公司向他催款吗？</span>
            <span v-if="orderStatus.userRole == 3">问题五：请问您知道是否有别的公司向他催款吗？</span><br/>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio9" label="1" @change.native="judgeResult">未知</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio9" label="2" @change.native="judgeResult">无</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio9" label="3" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio9" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
            <el-radio :disabled="companyDisabled || incognizance || incognizance_7" v-model="dialogResultRadio9" label="5" @change.native="judgeResult">建议不要借钱给用户</el-radio>
          </template><br/><br/>
        </el-col>
        <el-col v-if="dialogType === '4'">
          <template>
            <span v-if="orderStatus.userRole != 3">问题五：如果用户不还款，您是否愿意帮忙还款？ </span>
            <span v-if="orderStatus.userRole == 3">问题六：如果用户不还款，您是否愿意帮忙还款？ </span><br/>
            <el-radio :disabled="companyDisabled || helpPay || incognizance || incognizance_7" v-model="dialogResultRadio16" label="1" @change.native="judgeResult">愿意</el-radio>
            <el-radio :disabled="companyDisabled || helpPay || incognizance || incognizance_7" v-model="dialogResultRadio16" label="2">不愿意</el-radio>
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
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="1" @change.native="judgeResult">不认识</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="2" @change.native="judgeResult">父母</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="3" @change.native="judgeResult">兄弟姐妹</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="4" @change.native="judgeResult">孩子</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="5" @change.native="judgeResult">朋友</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="6" @change.native="judgeResult"
                v-if="orderStatus.userRole != 3">同事</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="7" @change.native="judgeResult"
                v-if="orderStatus.userRole != 3">客户</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="8" @change.native="judgeResult">夫妻</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="9" @change.native="judgeResult">其他</el-radio>
                <el-radio :disabled="companyDisabled" v-model="dialogResultRadio11" label="10" @change.native="judgeResult">拒绝回答</el-radio>
              </template><br/><br/>
            </el-col>
            <!--<el-col>-->
              <!--<template v-if="dialogType === '6'">-->
                <!--<span>问题二：请问您和他现在还有联系吗？</span><br/>-->
                <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="1">未知</el-radio>-->
                <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="2">经常联系</el-radio>-->
                <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio12" label="3">很久不联系</el-radio>-->
                <!--</template>-->
                <!--</el-col>-->
                <el-col v-if="dialogType === '6' && orderStatus.userRole != 3">
                  <template>
                    <span>问题二：请问您知道他现在有工作吗？</span><br/>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio13" label="1" @change.native="judgeResult">未知</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio13" label="2" @change.native="judgeResult">用户无工作</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio13" label="3" @change.native="judgeResult">有工作</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col  v-if="dialogType === '6' && orderStatus.userRole == 3">
                  <template>
                    <span>问题二：请问他们家的主要赚钱方式是什么？</span><br/>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="1">上班</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="2">临时工</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="3">保姆</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="4">gojek</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="5">司机</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="6">开店</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="7">小贩</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="8">收租</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="9">理财</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="10">中介</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="11">种地</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="12">养殖</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="13">投资</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_8" label="14">其他</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6' && orderStatus.userRole == 3">
                  <template>
                    <span>问题三：您知道他们家的月收入大概是多少吗？</span><br/>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="1">未知</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="2"><2,000,000IDR</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="3">2,000,000~4,000,000IDR</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="4">4,000,000~6,000,000IDR</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="5">6,000,000~8,000,000IDR</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio_9" label="6">>8,000,000IDR</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题三：他这份工作大概做了多久了？</span>
                    <span v-if="orderStatus.userRole == 3">问题四：他这份工作大概做了多久了？</span><br/>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio14" label="1">未知</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio14" label="2">3个月以下</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio14" label="3">3-6个月</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio14" label="4">6个月-1年</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio14" label="5">1年以上</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题四：请问您知道是否有别的公司向他催款吗？</span>
                    <span v-if="orderStatus.userRole == 3">问题五：请问您知道是否有别的公司向他催款吗？</span><br/>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio15" label="1" @change.native="judgeResult">未知</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio15" label="2" @change.native="judgeResult">无</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio15" label="3" @change.native="judgeResult">多次被催收且用户借款不还</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio15" label="4" @change.native="judgeResult">多次被打电话但不知用户是否借款未还</el-radio>
                    <el-radio :disabled="companyDisabled || incognizance1" v-model="dialogResultRadio15" label="5" @change.native="judgeResult">建议不要借钱给用户</el-radio>
                  </template><br/><br/>
                </el-col>
                <el-col v-if="dialogType === '6'">
                  <template>
                    <span v-if="orderStatus.userRole != 3">问题五：如果用户不还款，您是否愿意帮忙还款？ </span>
                    <span v-if="orderStatus.userRole == 3">问题六：如果用户不还款，您是否愿意帮忙还款？ </span><br/>
                    <el-radio :disabled="companyDisabled || helpPay1 || incognizance1" v-model="dialogResultRadio17" label="1" @change.native="judgeResult">愿意</el-radio>
                    <el-radio :disabled="companyDisabled || helpPay1 || incognizance1" v-model="dialogResultRadio17" label="2">不愿意</el-radio>
                  </template><br/><br/>
                </el-col>
                <!--<el-col v-if="dialogType === '6'">-->
                  <!--<template>-->
                    <!--<span>信息是否存疑：</span><br/>-->
                    <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio16" label="1">是</el-radio>-->
                    <!--<el-radio :disabled="companyDisabled" v-model="dialogResultRadio16" label="2">否</el-radio>-->
                    <!--</template>-->
                    <!--</el-col>-->
                    <el-col>
                      <div class="grid-content bg-purple"><span>电核结果：</span>
                        <template v-if="dialogType === '1'">
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio21" label="3">呼入限制/呼叫转移</el-radio>
                        </template>
                        <template v-if="dialogType === '2'">
                          <!--<el-radio :disabled="companyDisabled2" v-model="dialogResultRadio22" label="1" @change.native="getCurrentRow">拒绝回答</el-radio>-->
                          <el-radio :disabled="companyDisabled2 || incognizance_1" v-model="dialogResultRadio22" label="1" @change.native="getCurrentRow">稍后再拨</el-radio>
                          <el-radio :disabled="companyDisabled2 || incognizance_1" v-model="dialogResultRadio22" label="2" @change.native="getCurrentRow">信息存疑</el-radio>
                          <el-radio :disabled="companyDisabled2 || incognizance_1" v-model="dialogResultRadio22" label="3" @change.native="getCurrentRow">拒绝</el-radio>
                          <el-radio :disabled="companyDisabled2 || incognizance_1" v-model="dialogResultRadio22" label="4" @change.native="getCurrentRow">通过</el-radio>
                          <el-radio :disabled="companyResultDisabled || incognizance_1" v-model="dialogResultRadio221" label="5">优秀</el-radio>
                          <el-radio :disabled="companyResultDisabled || incognizance_1" v-model="dialogResultRadio221" label="6">良好</el-radio>
                          <el-radio :disabled="companyResultDisabled || incognizance_1" v-model="dialogResultRadio221" label="7">一般</el-radio>
                        </template>
                        <template v-if="dialogType === '3'">
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="3">呼叫转移/呼入限制</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="4">不在服务区</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="5">关机</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio23" label="6">停机/已欠费</el-radio>
                        </template>
                        <template v-if="dialogType === '4'">
                          <!--<el-radio :disabled="companyDisabled4 || incognizance" v-model="dialogResultRadio24" label="1" @change.native="setSmallDialog(1)">拒绝回答</el-radio>-->
                          <el-radio :disabled="companyDisabled4 || incognizance || incognizance_7" v-model="dialogResultRadio24" label="1" @change.native="setSmallDialog(1)">稍后再拨</el-radio>
                          <el-radio :disabled="companyDisabled4 || incognizance || incognizance_7" v-model="dialogResultRadio24" label="2" @change.native="setSmallDialog(1)">信息存疑</el-radio>
                          <el-radio :disabled="companyDisabled4 || incognizance || incognizance_7" v-model="dialogResultRadio24" label="3" @change.native="setSmallDialog(1)">拒绝</el-radio>
                          <el-radio :disabled="companyDisabled4 || incognizance || incognizance_7" v-model="dialogResultRadio24" label="4" @change.native="setSmallDialog(1)">通过</el-radio>
                        </template>
                        <template v-if="dialogType === '5'">
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="1">空号/不存在/无效/错误</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="2">无人接听/通话中</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="3">呼叫转移/呼入限制</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="4">不在服务区</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="5">关机</el-radio>
                          <el-radio :disabled="companyDisabled" v-model="dialogResultRadio25" label="6">停机/已欠费</el-radio>
                        </template>
                        <template v-if="dialogType === '6'">
                          <!--<el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="1" @change.native="setSmallDialog(2)">拒绝回答</el-radio>-->
                          <el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="1" @change.native="setSmallDialog(2)">稍后再拨</el-radio>
                          <el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="2" @change.native="setSmallDialog(2)">信息存疑</el-radio>
                          <el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="3" @change.native="setSmallDialog(2)">拒绝</el-radio>
                          <el-radio :disabled="companyDisabled6 || incognizance1" v-model="dialogResultRadio26" label="4" @change.native="setSmallDialog(2)">通过</el-radio>
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
                      :disabled="companyDisabled"
                      class = 'textarear'>
                    </el-input>
                  </el-col>
                  <el-col :span="18">
                    <div class="grid-content bg-purple"><span>添加提醒时间：</span>
                      <template>
                        <el-date-picker
                        v-model="phoneCheckDate"
                        type="datetime"
                        placeholder="选择日期时间"
                        format="yyyy-MM-dd hh:mm">
                      </el-date-picker>
                    </template>
                  </div>
                </el-col>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="phoneCheckBack(dialogType)">取 消</el-button>
                  <el-button v-if="!this.companyDisabled" type="primary" @click="companyReviewCommit(dialogType)" :disabled="flagor">确 定</el-button>
                </span>
              </el-dialog>
              <el-dialog
              title="备注"
              :visible.sync="checkDialogVisible"
              width="50%"
              v-loading="phoneCheckDialogLoading">
              <el-col>
                <div v-if="dialogType === '5'">
                  <template >
                    <span>问题一：请问您是{{baseInfList.realName}} {{baseInfList.sex == 1 ? '先生': '女士'}}吗？</span><br/>
                    <el-radio v-model="dialogResultRadio_1" label="1" :disabled = "checkSelfButton">是</el-radio>
                    <el-radio v-model="dialogResultRadio_1" label="2"  :disabled = "checkSelfButton">否</el-radio>
                    <el-radio v-model="dialogResultRadio_1" label="3" :disabled = "checkSelfButton">用户主动请求拒绝</el-radio>
                    <el-radio v-model="dialogResultRadio_1" label="4"  :disabled = "checkSelfButton">用户不配合审核</el-radio>
                  </template><br/><br/>
                  <template >
                    <span>问题二：请问您是否在DO-IT借过款？</span><br/>
                    <el-radio v-model="dialogResultRadio_2" label="1"  :disabled = "checkSelfButton">是</el-radio>
                    <el-radio v-model="dialogResultRadio_2" label="2"  :disabled = "checkSelfButton">否</el-radio>
                    <el-radio v-model="dialogResultRadio_2" label="3"  :disabled = "checkSelfButton">记不清了</el-radio>
                  </template><br/><br/>
                </div>

                <div class="grid-content bg-purple"><span v-if="dialogType === '6'">电核结果：</span>
                  <!--<template v-if="dialogType === '1'">-->
                    <!--<el-radio v-model="dialogResultRadio" label="1">呼叫转移/呼入限制</el-radio>-->
                    <!--<el-radio v-model="dialogResultRadio" label="2">通话中/无人接听</el-radio>-->
                    <!--</template>-->
                    <!--<template v-if="dialogType === '2'">-->
                      <!--<el-radio v-model="dialogResultRadio" label="1">优秀</el-radio>-->
                      <!--<el-radio v-model="dialogResultRadio" label="2">良好</el-radio>-->
                      <!--<el-radio v-model="dialogResultRadio" label="3">一般</el-radio>-->
                      <!--</template>-->
                      <!--<template v-if="dialogType === '3'">-->
                        <!--<el-radio v-model="dialogResultRadio" label="1">对方拒绝回答/不确定是否在该公司</el-radio>-->
                        <!--<el-radio v-model="dialogResultRadio" label="2">已经3次未接通</el-radio>-->
                        <!--</template>-->
                        <!--<template v-if="dialogType === '4'">-->
                          <!--<el-radio v-model="dialogResultRadio" label="1">已离职/不在该公司工作</el-radio>-->
                          <!--<el-radio v-model="dialogResultRadio" label="2">空号/不存在/无效/错误</el-radio>-->
                          <!--<el-radio v-model="dialogResultRadio" label="3">对方反馈用户资质很差/多次被催收等</el-radio>-->
                          <!--</template>-->
                          <template v-if="dialogType === '6'">
                            <el-radio v-model="dialogResultRadio" label="1" :disabled = "checkSelfButton">空号/不存在/无效/错误</el-radio>
                            <el-radio v-model="dialogResultRadio" label="2" :disabled = "checkSelfButton">无人接听/通话中</el-radio>
                            <el-radio v-model="dialogResultRadio" label="3" :disabled = "checkSelfButton">呼叫转移/呼入限制</el-radio>
                            <el-radio v-model="dialogResultRadio" label="4" :disabled = "checkSelfButton">不在服务区</el-radio>
                            <el-radio v-model="dialogResultRadio" label="5" :disabled = "checkSelfButton">关机</el-radio>
                            <el-radio v-model="dialogResultRadio" label="6" :disabled = "checkSelfButton">停机/已欠费</el-radio>
                          </template>
                          <!--<template v-if="dialogType === '7'">-->
                            <!--<el-radio v-model="dialogResultRadio" label="1">用户主动请求拒绝</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="2">用户不配合审核</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="3">空号/不存在/无效/错误</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="4">停机/已欠费</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="5">用户资质不符</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="6">非本人申请</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="7">资料不真实/有欺诈嫌疑</el-radio>-->
                            <!--<el-radio v-model="dialogResultRadio" label="8">已经3次未接通</el-radio>-->
                            <!--</template>-->
                          </div>
                        </el-col>
                        <el-col>
                          <span>备注：</span>
                          <el-input
                          type="textarea"
                          :rows="10"
                          placeholder="不超过800字"
                          v-model="checkTextarea" :disabled = "checkSelfButton"
                          class = 'textarear'>
                        </el-input>
                      </el-col>
                      <!--<el-col v-if="this.dialogType < 5">-->
                        <!--<div class="grid-content bg-purple"><span>工作年限：</span>-->
                          <!--<template>-->
                            <!--<el-radio v-model="workYearRadio" label="1">未知</el-radio>-->
                            <!--<el-radio v-model="workYearRadio" label="2">3个月以下</el-radio>-->
                            <!--<el-radio v-model="workYearRadio" label="3">3-6个月</el-radio>-->
                            <!--<el-radio v-model="workYearRadio" label="4">6个月-1年</el-radio>-->
                            <!--<el-radio v-model="workYearRadio" label="5">1-3年</el-radio>-->
                            <!--<el-radio v-model="workYearRadio" label="6">3年以上</el-radio>-->
                            <!--</template>-->
                            <!--</div>-->
                            <!--</el-col>-->
                            <el-col :span="18">
                              <div class="grid-content bg-purple"><span>添加提醒时间：</span>
                                <template>
                                  <el-date-picker
                                  v-model="phoneCheckDate"  :disabled = "checkSelfButton"
                                  type="datetime"
                                  placeholder="选择日期时间"
                                  format="yyyy-MM-dd hh:mm">
                                </el-date-picker>
                              </template>
                            </div>
                          </el-col>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="phoneCheckBack(0)">取 消</el-button>
                            <el-button type="primary" @click="phoneCheckCommit(dialogType)" :disabled =
                            "disabledSelfButtion">确 定</el-button>
                          </span>
                        </el-dialog>
                      </el-row>
                      <div class="divid-line"></div>
                      <!--<el-row>-->
                        <!--<el-col :span="2"><div class="grid-content bg-purple">问题一：</div></el-col>-->
                        <!--<el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[0].question}}</div></el-col>-->
                        <!--<el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>-->
                        <!--<el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[0].question === '请问您身份证上的居住地址是哪里?'">-->
                          <!--<img :src="phoneCheckQuestions[0].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[0].answer)" alt="" width="150px" height="100px">-->
                          <!--</div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[0].answer}}</div></el-col>-->
                          <!--<el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>-->
                          <!--<el-col :span="5">-->
                            <!--<div class="grid-content bg-purple">-->
                              <!--<template>-->
                                <!--<el-radio v-model="phoneRadio1" label="1">正确</el-radio>-->
                                <!--<el-radio v-model="phoneRadio1" label="0">错误</el-radio>-->
                                <!--</template>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--</el-row>-->
                                <!--<el-row>-->
                                  <!--<el-col :span="2"><div class="grid-content bg-purple">问题二：</div></el-col>-->
                                  <!--<el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[1].question}}</div></el-col>-->
                                  <!--<el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>-->
                                  <!--<el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[1].question === '请问您身份证上的居住地址是哪里?'">-->
                                    <!--<img :src="phoneCheckQuestions[1].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[1].answer)" alt="" width="150px" height="100px">-->
                                    <!--</div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[1].answer}}</div></el-col>-->
                                    <!--<el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>-->
                                    <!--<el-col :span="5">-->
                                      <!--<div class="grid-content bg-purple">-->
                                        <!--<template>-->
                                          <!--<el-radio v-model="phoneRadio2" label="1">正确</el-radio>-->
                                          <!--<el-radio v-model="phoneRadio2" label="0">错误</el-radio>-->
                                          <!--</template>-->
                                          <!--</div>-->
                                          <!--</el-col>-->
                                          <!--</el-row>-->
                                          <!--<el-row>-->
                                            <!--<el-col :span="2"><div class="grid-content bg-purple">问题三：</div></el-col>-->
                                            <!--<el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[2].question}}</div></el-col>-->
                                            <!--<el-col :span="2"><div class="grid-content bg-purple">正确答案：</div></el-col>-->
                                            <!--<el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[2].question === '请问您身份证上的居住地址是哪里?'">-->
                                              <!--<img :src="phoneCheckQuestions[2].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[2].answer)" alt="" width="150px" height="100px">-->
                                              <!--</div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[2].answer}}</div></el-col>-->
                                              <!--<el-col :span="2"><div class="grid-content bg-purple">用户答案：</div></el-col>-->
                                              <!--<el-col :span="5">-->
                                                <!--<div class="grid-content bg-purple">-->
                                                  <!--<template>-->
                                                    <!--<el-radio v-model="phoneRadio3" label="1">正确</el-radio>-->
                                                    <!--<el-radio v-model="phoneRadio3" label="0">错误</el-radio>-->
                                                    <!--</template>-->
                                                    <!--</div>-->
                                                    <!--</el-col>-->
                                                    <!--</el-row>-->
                                                    <el-row>
                                                      <span class="two-title">本人审核 &nbsp;</span>
                                                      <span class="titlePhone">用户手机号码： <span v-if="!phoneCheckStartVif" >{{baseInfList.mobileNumberDES}}</span></span>
                                                      <el-button v-if="phoneCheckStartVif" @click="phoneCheckStart" type="primary">开始</el-button>
                                                      <template>
                                                        <el-table
                                                        :data="phoneChecktableData"
                                                        style="width: 100%">
                                                        <el-table-column
                                                        type="index"
                                                        label="序号"
                                                        min-width="60">
                                                      </el-table-column>
                                                      <el-table-column
                                                      prop="startTime"
                                                      label="开始时间"
                                                      min-width="80">
                                                    </el-table-column>
                                                    <el-table-column
                                                    prop="endTime"
                                                    label="结束时间"
                                                    min-width="105">
                                                  </el-table-column>
                                                  <el-table-column
                                                  prop="burningTime"
                                                  label="时长"
                                                  min-width="90">
                                                </el-table-column>
                                                <el-table-column
                                                prop="teleReviewResult"
                                                label="电核结果"
                                                min-width="90">
                                              </el-table-column>
                                              <el-table-column
                                              prop="remark"
                                              label="备注信息"
                                              min-width="90">
                                            </el-table-column>
                                            <el-table-column
                                            prop="alertTime"
                                            label="下次提醒时间"
                                            min-width="90">
                                          </el-table-column>
                                          <!--<el-table-column prop="updateTime" label="添加备注时间" width="105">-->
                                            <!--</el-table-column>-->
                                            <el-table-column
                                            label="操作"
                                            min-width="220" align="center">
                                            <template scope="scope">
                                              <el-button-group style="">
                                                <el-button v-if="scope.row.endTime == ''" @click="phoneCheckClick(scope.row,scope.$index, 5)"  type="primary" class="company-pass" round size="medium">接通</el-button>
                                                <el-button v-if="scope.row.endTime == ''" @click="phoneCheckClick(scope.row,scope.$index, 6)" class="company-pass" type="danger" round size="medium">未接通</el-button>
                                                <el-button v-if="scope.row.endTime != ''" @click="phoneCheckClick(scope.row,scope.$index, 7)" class="company-pass" type="primary" round size="medium">查看详情</el-button>
                                              </el-button-group>
                                            </template>
                                          </el-table-column>
                                        </el-table>
                                      </template>
                                    </el-row>
                                  </el-row>
                                  <!-- 提交   -->
                                  <el-form id="btnForm">
                                    <el-form-item align="right">
                                      <el-button @click="checkLater" :disabled="checkLaterTime" type="primary">订单稍后再审</el-button>
                                      <!--  <el-button @click="dialogVisible=true" type="primary">初审拒绝</el-button> -->
                                      <el-button @click="dialoger" type="primary">提交</el-button>
                                    </el-form-item>
                                  </el-form>
                                  <el-dialog
                                  title="拒绝订单"
                                  :visible.sync="dialogVisible"
                                  width="50%">
                                  <el-col>
                                    <i class="el-icon-warning"></i>确认提交用户{{baseInfList.realName}}的申请订单，请在下方填写审核意见
                                  </el-col>
                                  <el-input
                                  type="textarea"
                                  :rows="6"
                                  placeholder=""
                                  v-model="reviewRemark"
                                  class = 'textarear'>
                                </el-input>
                                <span slot="footer" class="dialog-footer">
                                  <el-button @click="dialogVisible = false">取 消</el-button>
                                  <el-button type="primary" @click="reviewRefuse">确 定</el-button>
                                </span>
                              </el-dialog>
                              <el-dialog
                              title="确定审核提交吗？"
                              :visible.sync="dialogVisible1"
                              width="20%">
                              <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible1 = false">取 消</el-button>
                                <el-button type="primary" @click="reviewPass">确 定</el-button>
                              </span>
                            </el-dialog>

                          </section>
                        </template>
                        <script>
                        import mlPhotoBox from '../../components/_photoBoxBack.vue'
                        import enums from '../../common/Enum'
                        import DataUtil from '../../common/dataUtil'
                        import Config from '../../common/config'
                        import { videoPlayer } from 'vue-video-player'
                        import ElButtonGroup from "../../../node_modules/element-ui/packages/button/src/button-group.vue";
                        import ElCol from "element-ui/packages/col/src/col";
                        import ElRow from "element-ui/packages/row/src/row";
                        import ElRadio from "../../../node_modules/element-ui/packages/radio/src/radio.vue";

                        export default {
                          components: {
                            ElRadio,
                            ElRow,
                            ElCol,
                            ElButtonGroup,
                            mlPhotoBox,
                            videoPlayer
                          },
                          data () {
      // let compareDate = (time) => {
      //   let _time = time.setDate(time.getDate()+1);
      //   return time.getTime() <= Date.now();
      // }
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
        disabledSelfButtion: false,
        incognizance_1: false,
        incognizance: false,
        incognizance_7: false,
        incognizance1: false,
        historyLoading: false,
        checkLaterTime: false,

        orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
          borrowUse: ''
        },
        status: '', //审核结果
        remark: '', //审核意见
        helpPay: false,
        helpPay1: false,
        // 电话审核radio
        phoneRadio1: "1",
        phoneRadio2: "1",
        phoneRadio3: "1",
        dialogResultRadio: "0",
        dialogResultRadio_1: '0',
        dialogResultRadio_2: '0',
        dialogResultRadio21: "0",
        dialogResultRadio22: "0",
        companyResultDisabled: true,
        dialogResultRadio221: "0",
        dialogResultRadio23: "0",
        dialogResultRadio24: "0",
        dialogResultRadio25: "0",
        dialogResultRadio26: "0",
        dialogResultRadio2:"0",
        dialogResultRadio3:"0",
        dialogResultRadio1:"0",
        checkSelfDisabled : false,
//        dialogResultRadio4:"0",
dialogResultRadio5:"0",
dialogResultRadio6:"0",
dialogResultRadio7:"0",
dialogResultRadio_7:"0",
dialogResultRadio8:"0",
dialogResultRadio_8:"0",
dialogResultRadio9:"0",
dialogResultRadio_9:"0",
//        dialogResultRadio10:"0",
dialogResultRadio11:"0",
dialogResultRadio12:"0",
dialogResultRadio13:"0",
dialogResultRadio14:"0",
dialogResultRadio15:"0",
//        dialogResultRadio16:"0",
dialogResultRadio16:"0",
dialogResultRadio17:"0",
workYearRadio: "0",
phoneChecktableData: [],
comPhoneChecktableData: [],
operatorTypeList: [],
rejectReason : '',
teleReviewObject:'0',
companyObjDisabled:false,
firstObjDisabled:false,
secondObjDisabled:false,
familyWomen: {
  companyName: '',
  companyPhone:'',
  salaryName:'',
  incomeType:'',
},
phoneCheckCurrent: {
  "remark": "",
  "orderTag": 0,
  "alertTime": '',
  "startTime": '',
  "endTime": '',
  "burningTime": "",
  "current": true,
  "workYear": "",
  "teleReviewResult":"",
  "teleReviewResultType":"",
  operationType: 0
},
checkFlag: false,
comPhoneCheckCurrent: {
  "remark": "",
  "orderTag": 0,
  "alertTime": '',
  "startTime": '',
  "endTime": '',
  "burningTime": "",
//          "current": true,
"workYear": "",
"teleReviewResult":"",
"realName":'',
"mobile":'',
"teleReviewObject":"所在公司",
"teleReviewOperationType":"",
"teleReviewResultType":""
},
facePhotoUrls:'',
phoneCheckQuestions: [{'question':'','answer':''},
{'question':'','answer':''},
{'question':'','answer':''}],
checkDialogVisible: false,
companyDialogVisible: false,
companyDisabled: false,
companyDisabled2: false,
companyDisabled4: false,
companyDisabled6: false,
checkSelfButton: false,
rejectReason:'',
smallCompanyDialogVisible:false,
realName: '',
mobile: '',
realName1: '',
mobile1: '',
realName2: '',
mobile2: '',
checkTextarea: '',
dialogType:'1',
phoneCheckDate: '',
phoneCheckStartVif: true,
phoneCheckEndVif: false,
comPhoneCheckStartVif: false,
//        comPhoneCheckEndVif: false,
recordStartTime: '',
comRecordStartTime: new Date(),
recordEndTime: '',
comRecordEndTime: '',
phoneCheckDialogLoading: false,
phoneCheckId: '',
comPhoneCheckId: '',
phoneCheckIndex: '',
comPhoneCheckIndex: '',
videoShowOrNot: true,

textarea: '',
orderNo: '',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话记录
        moxieCallLogData: [],//通话记录
        passOrNot:1,//1表示拒绝的电审
        passOrNotSelf:0,//1表示拒绝的电审
        //baseInf 客户基本信息

        // 基本信息
        baseInfList: {},
        historyData: [],
        flagor:false,
        isSubmit:true,
        burningTime:'',
        jobInfList: {},
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
        //备注
        isActive:true,
        insuranceHitOrNot: false,
        noActive:false,
        baseInfRemark: '',
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
        workerSeen: true,
        familyCard: false,
        studentSeen: false,
        familySeen: false,
        userUuid: "",
        uuid: "",
        firstReviewSuggest: '',
        firstCheckSuggest: '',
        secondReviewSuggest: '',
        IsStudents: false,
        dialogVisible: false,
        dialogVisible1: false,
        reviewRemark:'',
        reviewRemark1:'',
        pairVerifySimilarity: ''
      }
    },
    methods: {
      whichTeleReviewObj () {
        this.comPhoneCheckStartVif=true;
        let flag = '';
        if (this.comPhoneChecktableData.length > 0) {
          flag = this.comPhoneChecktableData[this.comPhoneChecktableData.length - 1].teleReviewResult;
        }
        //重置
        let comPhoneCheckCurrent = {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
//              "current": true,
"workYear": "",
"teleReviewResult":"",
"realName":'',
"mobile":'',
"teleReviewObject":"所在公司",
"teleReviewOperationType":"",
"teleReviewResultType":""
};
//            this.resetComponeCheck();
if (this.teleReviewObject == '1') {
  comPhoneCheckCurrent.teleReviewObject = '所在公司';
  if (this.orderStatus.userRole != '3') {
    comPhoneCheckCurrent.realName = this.jobInfList.companyName;
  } else {
    comPhoneCheckCurrent.realName = this.familyWomen.companyName;
  }
//          comPhoneCheckCurrent.mobile = this.jobInfList.companyPhone;
} else if (this.teleReviewObject == '2') {
  if (this.orderStatus.userRole != 3) {
    comPhoneCheckCurrent.teleReviewObject = '第一紧急联系人';
  } else {
    comPhoneCheckCurrent.teleReviewObject = '家庭收入来源者';
  }
  comPhoneCheckCurrent.realName = this.realName1;
//          comPhoneCheckCurrent.mobile = this.mobile1;
}else if (this.teleReviewObject == '3') {
  if (this.orderStatus.userRole != 3) {
    comPhoneCheckCurrent.teleReviewObject = '第二紧急联系人';
  } else {
    comPhoneCheckCurrent.teleReviewObject = '紧急联系人';
  }
  comPhoneCheckCurrent.realName = this.realName2;
//          comPhoneCheckCurrent.mobile = this.mobile2;
}

if (this.comPhoneChecktableData.length == 0 ||
  (this.comPhoneChecktableData.length > 0
    && flag)) {
  this.comPhoneChecktableData.push(comPhoneCheckCurrent);
this.comPhoneCheckStartVif = true;
} else {
  this.comPhoneChecktableData.pop();
  this.comPhoneChecktableData.push(comPhoneCheckCurrent);
}
},
dialoger(){
  if(this.isSubmit === true) {
   this.$message('您没有给出明确的结论，请继续完成剩下的电核模块！');
   return ;
 }
 this.dialogVisible1 = true;
},
judgeResult () {

  let flag_1 = false;
  let flag1 = false;
  let flag2 = false;
  let flag_7 = false;
  let flagUser = false;
  let flag3 = false;
  let flag2_1 = false;
  if (this.dialogResultRadio1 == '2'
    || this.dialogResultRadio3 == '2') {
    this.companyResultDisabled = true;
  this.companyDisabled2 = true;
  this.dialogResultRadio22 = '3';
  this.incognizance_1 = false;
  flag_1 = true;
} else {
  this.companyDisabled2 = false;
  this.dialogResultRadio22 = '0';
}
if (this.dialogResultRadio7 == '2'
  || this.dialogResultRadio9 == '3') {
  this.companyDisabled4 = true;
this.dialogResultRadio24 = '3';
this.helpPay = true;
flag1 = true;
} else {
  this.companyDisabled4 = false;
  this.dialogResultRadio24 = '0';
  this.helpPay = false;
}
if (this.dialogResultRadio11 == '1'
  || this.dialogResultRadio13 == '2'
  || this.dialogResultRadio15 == '3') {
  this.companyDisabled6 = true;
this.dialogResultRadio26 = '3';
this.helpPay1 = true;
flag2 = true;
} else {
  this.companyDisabled6 = false;
  this.dialogResultRadio26 = '0';
  this.helpPay1 = false;
}
if (this.dialogResultRadio5 == '1'
  || this.dialogResultRadio5 == '6'
  || this.dialogResultRadio5 == '7'
  || this.dialogResultRadio5 == '9') {
  this.helpPay = true;
} else if ((this.dialogResultRadio5 == '2'
  || this.dialogResultRadio5 == '3'
  || this.dialogResultRadio5 == '4'
  || this.dialogResultRadio5 == '5'
  || this.dialogResultRadio5 == '8') && !flag1){
  this.helpPay = false;
}
if (this.dialogResultRadio11 == '1'
  || this.dialogResultRadio11 == '6'
  || this.dialogResultRadio11 == '7'
  || this.dialogResultRadio11 == '9') {
  this.helpPay1 = true;
} else if ((this.dialogResultRadio11 == '2'
  || this.dialogResultRadio11 == '3'
  || this.dialogResultRadio11 == '4'
  || this.dialogResultRadio11 == '5'
  || this.dialogResultRadio11 == '8') && !flag2) {
  this.helpPay1 = false;
}
if (this.dialogResultRadio1 == '4'
  || this.dialogResultRadio1 == '3') {
  this.incognizance_1 = true;
this.dialogResultRadio22 = '2';
} else if (this.dialogResultRadio1 == '5' ) {
  this.incognizance_1 = true;
  this.dialogResultRadio22 = '3';
}else if (!flag_1) {
  this.incognizance_1 = false;
  this.dialogResultRadio22 = '0';
}
if ((this.dialogResultRadio5 == '1' && this.orderStatus.userRole != 3)
  || this.dialogResultRadio5 == '10') {
  this.incognizance = true;
this.dialogResultRadio24 = '2';
flagUser = true;
flag_7 = true;
} else if (!flag1) {
  this.incognizance = false;
  this.dialogResultRadio24 = '0';
}
if (this.dialogResultRadio5 == '1' && this.orderStatus.userRole == 3) {
  this.incognizance = true;
  this.dialogResultRadio24 = '3';
  flag_7 = true;
} else if (!flag1 && !flagUser) {
  this.incognizance = false;
  this.dialogResultRadio24 = '0';
}
if (this.dialogResultRadio_7 == '2') {
  this.incognizance_7 = true;
  this.dialogResultRadio24 = '2';
  flag3 = true;
} else if (!flag1 && !flag_7) {
  this.incognizance_7 = false;
  this.dialogResultRadio24 = '0';
}

if (this.dialogResultRadio11 == '1'
  || this.dialogResultRadio11 == '10') {
  this.incognizance1 = true;
this.dialogResultRadio26 = '2';
flag2_1 = true;
} else if (!flag2) {
  this.incognizance1 = false;
  this.dialogResultRadio26 = '0';
}

if (this.dialogResultRadio16 == '2') {
  // this.companyDisabled4 = true;
  // this.dialogResultRadio24 = '2';
} else if (!flag1 && !flag_7 && !flag3) {
  this.companyDisabled4 = false;
  this.dialogResultRadio24 = '0';
}

if (this.dialogResultRadio17 == '2') {
  // this.companyDisabled6 = true;
  // this.dialogResultRadio26 = '2';
} else if (!flag2 && !flag2_1) {
  this.companyDisabled6 = false;
  this.dialogResultRadio26 = '0';
}
},
getOperatorType(type) {
  if (type == 1) {
    return "稍后再审";
  } else {
    return "";
  }
},
setSmallDialog (type) {
  if (type == 1) {
    if (this.dialogResultRadio24 == 3) {
      this.smallCompanyDialogVisible = true;
    } else {
      this.smallCompanyDialogVisible = false;
    }
  } else if (type == 2) {
    if (this.dialogResultRadio26 == 3) {
      this.smallCompanyDialogVisible = true;
    } else {
      this.smallCompanyDialogVisible = false;
    }
  }
},
smallCompanyCancel(){
  this.smallCompanyDialogVisible = false;
  this.rejectReason = '';
},
smallCompanyOk() {
  if (this.rejectReason == '') {
    this.$message("请输入拒绝原因！");
    return;
  }
  this.smallCompanyDialogVisible = false;
},
getCurrentRow () {
  if (this.dialogResultRadio22 == '4') {
    this.companyResultDisabled = false;
    this.dialogResultRadio22 = '0';
  } else {
    this.companyResultDisabled = true;
    this.dialogResultRadio221 = '0';
  }
  if (this.dialogResultRadio22 == '3') {
    this.smallCompanyDialogVisible = true;
  } else {
    this.smallCompanyDialogVisible = false;
  }
},
formatUnixDateTime(time){
  return DataUtil.formatUnixDateTime(time);
},
getWorkType(type) {
  let re = '';
  this.workYear.forEach(obj => {
    if (obj.value == type) {
      re = obj.name;
      return
    }
  });
  return re
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
      getdates(dates) {
        if (!dates) {
          return '';
        }
        var myDate = new Date(dates);
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
//            this.orderStatus.userRole = 3;
this.orderStatus.createTime=this.getdates(this.orderStatus.createTime);
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
      if (!this.familyWomen.companyPhone) {
        this.companyObjDisabled = true;
      }
    }
  })
}


this.getBaseInf(this.userUuid,3);
this.getBaseInf(this.userUuid,4);
this.getBaseInf(this.userUuid,5);
this.getBaseInf(this.userUuid,6);
this.getBaseInf(this.userUuid,8);
this.getPhoneCheck(this.orderStatus.userRole);
// this.judgeInsuranceHitOrNot();
// this.judgefamilyCard();
}
})
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
      //获取审核意见
      getcheckSuggest(){
        let _data={
          "uuid": this.uuid,
          "langue": 1
        }
        this.$http.post("manage/CheckRemarkListByOrderNo", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            if(response.body.data[0].type==1){
              this.firstReviewSuggest=response.body.data[0].remark;
              this.firstCheckSuggest = response.body.data[0].suggest;
            }else{
              this.secondReviewSuggest=response.body.data[0].remark
            }
            if(response.body.data.length > 1 &&
              response.body.data[1].type==1){
              this.firstReviewSuggest=response.body.data[1].remark;
            this.firstCheckSuggest = response.body.data[1].suggest;
          }else if (response.body.data.length > 1) {
            this.secondReviewSuggest=response.body.data[1].remark
          }
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
      //获取审核规则
      getCheckRule(){
        for(let type=1;type<9;type++){
          if (type == 7) {
            continue;
          }
          if (this.studentSeen && type == 3) {
            continue;
          } else if (this.workerSeen && type == 4) {
            continue ;
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
                if(type==1&&response.body.data.checkRuleList.length!=0){this.baseRuleList=data.checkRuleList;}
              if(type==2&&response.body.data.checkRuleList.length!=0){this.baseRuleList1=data.checkRuleList;}
              if(type==3&&response.body.data.checkRuleList.length!=0){this.jobRuleList=data.checkRuleList;}
              if(type==4&&response.body.data.checkRuleList.length!=0){this.jobRuleList1=data.checkRuleList;}
              if(type==5&&response.body.data.checkRuleList.length!=0){this.connectRuleList=data.checkRuleList;}
              if(type==6&&response.body.data.checkRuleList.length!=0){this.faceCheckRuleList=data.checkRuleList;}
              // if(type==7&&response.body.data.checkRuleList.length!=0){this.videoCheckRuleList=data.checkRuleList;}
              if(type==8&&response.body.data.checkRuleList.length!=0){this.otherCheckRuleList=data.checkRuleList;}
            }
//            if (type ==1) {
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
      checkLater() {

        let _data = {
          createUser : DataUtil.id(),
          orderNo : this.uuid,
          uuid: this.userUuid,
        };

        this.$http.post('manage/saveOperatorType',_data).then(response => {

          if (response.body.code == 1) {
            window.close();
            window.opener.location.reload('#/RiviewTheListSecond');
          } else {
            this.$message.error(response.message);
          }
        });
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
              this.getComPhoneCheck(this.orderStatus.userRole);
            }
            if(type==5){
              this.connectInfList=data;
            }
            if(type==6){
              if(data[0].attachmentType==2){
                this.facePhotoUrls=data[0].attachmentUrl;
                if (data[1]) {
                  this.playerOptions.sources[0].src=data[1].attachmentUrl;
                }
              }else {
                this.playerOptions.sources[0].src=data[0].attachmentUrl;
                if (data[1]) {
                  this.facePhotoUrls=data[1].attachmentUrl;
                }
              }
            }
            if(type==8){
              let adt=this.addtionInfList;
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
            // if(type==9){
            //   this.playerOptions.sources[0].src=data[0].attachmentUrl;
            // }
          }
        })
      },
      //提交复审

      reviewPass(){
//        this.phoneCheckQuestions[0].result = Number(this.phoneRadio1);
//        this.phoneCheckQuestions[1].result = Number(this.phoneRadio2);
//        this.phoneCheckQuestions[2].result = Number(this.phoneRadio3);
//        let _dataOne={
//          "orderNo": this.uuid,
//          "resultRequests":this.phoneCheckQuestions,
//          "langue":  1,
//          "userUuid":this.userUuid
//        }
//        this.$http.post("manage/saveTeleReviewResult", _dataOne);
//
        //提交复审时候删除
        localStorage.removeItem(this.uuid + "checkSelfFlag");
        let passOrNot = 1;
        if (this.passOrNotSelf == 0 && this.passOrNot == 0) {
          passOrNot = 0;
        }
        var Orderstar = localStorage.getItem("semyCat");
        var Orderstartime = new Date(Orderstar);
        var Orderendtime = new Date();
        let dureTime=(Orderendtime-Orderstartime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60);
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        let _data={
          "remark": this.reviewRemark1,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":  passOrNot,
          "burningTime":this.burningTime
        };
        this.$http.post("manage/secondCheck", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            this.dialogVisible1=false
            this.$message("提交成功");
            window.close();
            window.opener.location.reload('#/RiviewTheListSecond');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            window.close();
            window.opener.location.reload('#/RiviewTheListSecond');
            return;
          }
        }

        )
      },
      rowClick(row){
        window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
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
      //审核记录
      getOperatorTypeList(){
        let _data={
          "orderNo":this.uuid
        }
        this.$http.post("manage/getOperatorType", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
            this.operatorTypeList = response.body.data;
          }

        })

      },
      //图片点击放大展示
      teleReviewCardUrlClick(url){
        if(url){
          let _photoList = [
          url
          ];
          this.$refs.photoBox.show(_photoList)
        }
      },
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

  idCardUrlClickone(){
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

  reviewRefuse(){

    if(this.reviewRemark==''){
      this.$message("审核意见不可为空！");
      return;
    }
//        this.phoneCheckQuestions[0].result = Number(this.phoneRadio1);
//        this.phoneCheckQuestions[1].result = Number(this.phoneRadio2);
//        this.phoneCheckQuestions[2].result = Number(this.phoneRadio3);
//        let _dataOne={
//          "orderNo": this.uuid,
//          "resultRequests":this.phoneCheckQuestions,
//          "langue":  1,
//          "userUuid":this.userUuid
//        }
//        this.$http.post("manage/saveTeleReviewResult", _dataOne);
var Orderstar = localStorage.getItem("semyCat");
var Orderstartime = new Date(Orderstar);
var Orderendtime = new Date();
let dureTime=(Orderendtime-Orderstartime)/1000;
let dureTimeH=Math.floor(dureTime/3600);
let dureTimeM=Math.floor((dureTime%3600)/60);
let dureTimeS=Math.floor((dureTime%3600)%60);
this.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
let _data={
          "remark": this.reviewRemark,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":2,
          "burningTime":this.burningTime
        }
        this.$http.post("manage/secondCheck", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            this.dialogVisible1=false;
            this.$message("提交成功");
            window.close();
            window.opener.location.reload('#/RiviewTheListSecond');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            window.close();
            window.opener.location.reload('#/RiviewTheListSecond');
            return;
          }
        })
      },
      getPhoneCheck(type){
        let phoneCheckType;
        if(type==1){
          phoneCheckType=1;
        }else {
          phoneCheckType=2;
        }
        let _data={
          "orderNo": this.uuid,
          "type": phoneCheckType,
          "uuid": this.userUuid,
          "langue":1,
          "teleReviewType":1
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          this.phoneCheckQuestions=response.body.data.questions;
//          if (response.body.data.pass == '1') {
//            this.passOrNotSelf = 1;
//            this.checkFlag = true;
//          } else if (response.body.data.pass == '5') {
//              this.passOrNotSelf = 0;
//            this.checkFlag = true;
//          }
let res=response.body.data.remarks;
if (!res) {
  return;
}
res.forEach(e=>{
  if(e.startTime) {
    e.startTime = this.getdate(e.startTime);
  }
  if(e.endTime){
    e.endTime=this.getdate(e.endTime);
  }
  if(e.alertTime){
    e.alertTime=this.getdate(e.alertTime);
  }
  if(e.updateTime && e.remark){
    e.updateTime=this.getdate(e.updateTime);
  } else {
    e.updateTime = "";
  }
            // e.current=false;
          });
this.phoneChecktableData=res;
//          if (res.length >= 6) {
//              this.phoneCheckStartVif = false;
//            return ;
//          }
if (this.checkFlag) {
  this.phoneCheckStartVif = false;
  return;
}
this.phoneChecktableData.push(this.phoneCheckCurrent);
})
      },
      getComPhoneCheck(type){
        this.getCompanyReviewContract(type);
      },
      getTeleReviewObj(index) {
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "teleReviewType":3,
          "langue":1
        };
        //先判断是否电核对象被禁用
        this.$http.post("manage/getTeleReviewObj", _data).then(response => {
          let data = response.body.data;
          if (data && data.length > 0) {
            data.split(',').forEach(e => {
              if (e == '1') {
                this.companyObjDisabled = true;
              } else if (e == '2') {
                this.firstObjDisabled = true;
              } else if (e == '3') {
                this.secondObjDisabled = true;
              }
            })
          }
          if (this.companyObjDisabled && this.firstObjDisabled
            && this.secondObjDisabled) {
            this.isSubmit = false;
        }
        if (index != null) {
          this.showCompanyLastData(index);
        }
      });
      },
      getCompanyReviewContract(type){
        if (type == 1) {
          this.companyObjDisabled = true;
        }
        let _data={
          "orderNo": this.uuid,
        };
        this.$http.post("manage/frequentOrderUserCallRecordMongo", _data).then(response => {

          let result = response.body.data;
          if (result && result.length != 0) {
            this.realName1 = result[0].realName;
            this.mobile1 = result[0].mobile;
          }
          if (result && result.length == 2) {
            this.realName2 = result[1].realName;
            this.mobile2 = result[1].mobile;
          }
          let _data={
            "orderNo": this.uuid,
            "type": type,
            "uuid": this.userUuid,
            "langue":1,
            "teleReviewType":3
          };
          //先判断是否电核对象被禁用
          this.getTeleReviewObj(null);
          this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

            if (response.body.data.pass == '1') {
              this.passOrNot = 1;
              //稍后再审禁用
              this.checkLaterTime = true;
              this.setDisabled();
            } else if (response.body.data.pass == '5') {
              this.passOrNot = 0;
              this.setDisabled();
            }
            //审核完成后，任然没有通过，则拒绝
//            if (this.companyObjDisabled && this.firstObjDisabled
//              && this.secondObjDisabled &&
//              (response.body.data.pass == '2' || response.body.data.pass == '3')) {
//              this.passOrNot = '1';
//            }
let res=response.body.data.remarks;
res.forEach(e=> {
  if (e.startTime) {
    e.startTime = this.getdate(e.startTime);
  }
  if (e.endTime) {
    e.endTime = this.getdate(e.endTime);
  }
  if (e.alertTime) {
    e.alertTime = this.getdate(e.alertTime);
  }
  if (e.updateTime && e.remark) {
    e.updateTime = this.getdate(e.updateTime);
  } else {
    e.updateTime = "";
  }
              // 处理公司审核对象
              if (e.teleReviewOperationType == 1 || e.teleReviewOperationType == 2
                || e.teleReviewObject == '1') {
                e.teleReviewObject = '所在公司';
            } else if (e.teleReviewOperationType == 3 || e.teleReviewOperationType == 4
              || e.teleReviewObject == '2') {
              if (this.orderStatus.userRole != 3) {
                e.teleReviewObject = '第一紧急联系人';
              } else {
                e.teleReviewObject = '家庭收入来源者';
              }
            } else if (e.teleReviewOperationType == 5 || e.teleReviewOperationType == 6
              || e.teleReviewObject == '3') {
              if (this.orderStatus.userRole != 3) {
                e.teleReviewObject = '第二紧急联系人';
              } else {
                e.teleReviewObject = '紧急联系人';
              }
            }
          });
this.comPhoneChecktableData=res;
})
        })
      },
      //根据角色判断拨打不同电话
      comPhoneCheckStart(){
        this.comRecordStartTime = new Date();
        this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime=this.getdates(this.comRecordStartTime);
        this.comPhoneCheckStartVif=false;
        if (this.teleReviewObject == '1') {
          if (this.orderStatus.userRole == 3) {
            this.comPhoneChecktableData[this.comPhoneChecktableData.length - 1].mobile = this.familyWomen.companyPhone;
          } else {
            this.comPhoneChecktableData[this.comPhoneChecktableData.length - 1].mobile = this.jobInfList.companyPhone;
          }

        } else if (this.teleReviewObject == '2') {
          this.comPhoneChecktableData[this.comPhoneChecktableData.length - 1].mobile = this.mobile1;

        }else if (this.teleReviewObject == '3') {
          this.comPhoneChecktableData[this.comPhoneChecktableData.length - 1].mobile = this.mobile2;

        }
      },

      phoneCheckStart(){
        this.recordStartTime = new Date();
        var localTime = localStorage.getItem(this.uuid + "checkSelfFlag");
        if (localTime != null) {
          var ms = this.recordStartTime.getTime() - new Date(localTime).getTime();
          if (Math.floor(ms/1000/60) < 10) {
            this.$message.error("距离上次拨打时间不足10分钟");
            return ;
          }
        }
        this.phoneChecktableData[this.phoneChecktableData.length-1].startTime=this.getdates(this.recordStartTime);
        this.phoneCheckStartVif=false;
//        this.phoneCheckEndVif=true;
},
phoneCheckBack(dialogType){
  this.checkDialogVisible = false;
  this.companyDialogVisible = false;
  this.phoneCheckDate="";
  this.companyDisabled2 = false;
  this.companyDisabled4 = false;
  this.companyDisabled6 = false;
  this.incognizance = false;
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
  this.dialogResultRadio_7 = '0';
  this.dialogResultRadio8 = '0';
  this.dialogResultRadio_8 = '0';
  this.dialogResultRadio9 = '0';
  this.dialogResultRadio_9 = '0';
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
  this.dialogResultRadio_8 = '0';
  this.dialogResultRadio_9 = '0';
  this.helpPay1 = false;
//            this.dialogResultRadio16 = '0';
}
}
this.workYearRadio = "0";
},
      // 点击添加公司弹框事件
      comDialCheckClick(row,index,type, showOrNot){
        this.flagor = false;
        this.comPhoneCheckIndex=index;
        this.companyDialogVisible=true;
        this.companyDisabled = false;
        this.companyResultDisabled = true;
        this.companyDisabled2 = false;
        this.companyDisabled4 = false;
        this.companyDisabled6 = false;
        this.companyResultDisabled = false;
        this.incognizance = false;
        this.incognizance1 = false;
        this.incognizance_1 = false;
        this.helpPay1 = false;
        this.companyDisabled4 = false;
        this.incognizance_7 = false;
        this.helpPay = false;
        this.checkTextarea = '';
        this.realName = row.realName;
        this.mobile = row.mobile;
        if(row.id){
          this.comPhoneCheckId=row.id
        } else {
          this.comPhoneCheckId='';
        }
        //查看详情
        if (showOrNot === '1') {
          this.companyDisabled = true;
          this.companyDisabled2 = true;
          this.companyDisabled4 = true;
          this.companyDisabled6 = true;
          // this.companyResultDisabled = true;
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
        } else {
          if (row.teleReviewObject === '所在公司') {
            if (type == '0') {
              this.dialogType = '1';
              this.dialogResultRadio21 = "0";
            } else {
              this.dialogType = '2';
              this.dialogResultRadio22 = "0" ;
              this.dialogResultRadio221 = "0";
              this.dialogResultRadio1 = "0";
              this.dialogResultRadio2 = "0";
              this.dialogResultRadio3 = "0";
            }
          } else if (row.teleReviewObject === '第一紧急联系人'
            || row.teleReviewObject === '家庭收入来源者' ) {
            if (type == '0') {
              this.dialogType = '3';
              this.dialogResultRadio23 = "0";
            } else {
              this.dialogType = '4';
              this.dialogResultRadio24 = "0";
              this.dialogResultRadio5 = "0";
              this.dialogResultRadio7 = "0";
              this.dialogResultRadio_7 = "0";
              this.dialogResultRadio8 = "0";
              this.dialogResultRadio_8 = "0";
              this.dialogResultRadio9 = "0";
              this.dialogResultRadio_9 = "0";
              this.dialogResultRadio16 = "0";
            }
          } else if (row.teleReviewObject === '第二紧急联系人' ||
            row.teleReviewObject === '紧急联系人' ){
            if (type == '0') {
              this.dialogType = '5';
              this.dialogResultRadio25 = "0";
            } else {
              this.dialogType = '6';
              this.dialogResultRadio26 = "0";
              this.dialogResultRadio11 = "0";
              this.dialogResultRadio13 = "0";
              this.dialogResultRadio14 = "0";
              this.dialogResultRadio15 = "0";
              this.dialogResultRadio17 = "0";
              this.dialogResultRadio_8 = "0";
              this.dialogResultRadio_9 = "0";
            }
          }
          return;
        }
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
      // 点击添加个人通过备注
      phoneCheckClick(row,index, type){

        let operationType = row.operationType;
        this.checkDialogVisible=true;
        //查看详情
        if (type == 7) {

          if (operationType == 1) {
            this.dialogType = '5';
          } else if (operationType == 2) {
            this.dialogType = '6';
          }
          this.checkSelfButton = true;
          this.disabledSelfButtion = true;
          //数据回显
          let _data={
            "orderNo": this.uuid,
//            "type": this.orderStatus.userRole,
"type": 1,
"uuid": this.userUuid,
"langue":1,
"teleReviewType":1
};
this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {
  let questions = response.body.data.questions;
  this.checkTextarea = row.remark;
            //先处理没有问题的情况
            if (row.operationType === 2) {
              this.dialogResultRadio = "" + row.teleReviewResultType;
            } else if (row.operationType === 1) {

              for (let i = 0; i < questions.length ; i++) {
                if (questions[i].manOrderRemarkId === row.id) {
                  this.dialogResultRadio_1 = questions[i].answer;
                  this.dialogResultRadio_2 = questions[i+1].answer;
                  break;
                }
              }
            }

          });
return;
}
this.checkSelfButton = false;
this.disabledSelfButtion = false;
this.dialogResultRadio_1 = 0;
this.dialogResultRadio_2 = 0;
this.dialogResultRadio = 0;
this.checkTextarea = '';
this.phoneCheckIndex=index;
if(row.id){
  this.phoneCheckId=row.id
}
if (type == 5) {
  this.dialogType = '5';
} else if (type == 6) {
  this.dialogType = '6';
}

},
companyReviewCommit(type){

  let dialogResultRadio = '0';
  let companyTeleQARequest = [];

  if (type == '1') {
    dialogResultRadio = this.dialogResultRadio21;
  } else if (type == '2') {
    if (this.orderStatus.userRole != 3) {
      companyTeleQARequest = [{'question':'请问' + this.baseInfList.realName + '是在贵公司工作吗？','answer':this.dialogResultRadio1, 'remark':'1'},
      {'question':'请问他工作多久了？','answer':this.dialogResultRadio2, 'remark':'2'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio3, 'remark':'3'}];
    } else {
      companyTeleQARequest = [{'question':'请问' + this.familyWomen.salaryName+ '是在贵公司工作吗？','answer':this.dialogResultRadio1, 'remark':'1'},
      {'question':'请问他工作多久了？','answer':this.dialogResultRadio2, 'remark':'2'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio3, 'remark':'3'}];
    }

    dialogResultRadio = this.dialogResultRadio22 == '0' ? this.dialogResultRadio221 : this.dialogResultRadio22;
  } else if (type == '4') {
    if (this.orderStatus.userRole != 3) {
      companyTeleQARequest = [{'question':'请问您跟他是什么关系呢？','answer':this.dialogResultRadio5, 'remark':'1'},

      {'question':'请问您知道他现在有工作吗？','answer':this.dialogResultRadio7, 'remark':'3'},
      {'question':'他这份工作大概做了多久了？','answer':this.dialogResultRadio8, 'remark':'4'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio9, 'remark':'5'},
      {'question':'如果用户不还款，您是否愿意帮忙还款？','answer':this.dialogResultRadio16, 'remark':'6'}];
    } else {
      companyTeleQARequest = [{'question':'请问您跟他是什么关系呢？','answer':this.dialogResultRadio5, 'remark':'1'},

      {'question':'请问' + this.baseInfList.realName + '家里主要是依靠你赚钱吗？','answer':this.dialogResultRadio_7, 'remark':'3'},
      {'question':'请问您赚钱的方式是什么？','answer':this.dialogResultRadio_8, 'remark':'4'},
      {'question':'请问您月收入多少？','answer':this.dialogResultRadio_9, 'remark':'5'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio9, 'remark':'6'},
      {'question':'如果用户不还款，您是否愿意帮忙还款？','answer':this.dialogResultRadio16, 'remark':'7'}];
    }

    dialogResultRadio = this.dialogResultRadio24;
  } else if (type == '6') {
    if (this.orderStatus.userRole != 3) {
      companyTeleQARequest = [{'question':'请问您跟他是什么关系呢？','answer':this.dialogResultRadio11, 'remark':'1'},

      {'question':'请问您知道他现在有工作吗？','answer':this.dialogResultRadio13, 'remark':'3'},
      {'question':'他这份工作大概做了多久了？','answer':this.dialogResultRadio14, 'remark':'4'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio15, 'remark':'5'},
      {'question':'如果用户不还款，您是否愿意帮忙还款？','answer':this.dialogResultRadio17, 'remark':'6'}];
    } else{
      companyTeleQARequest = [{'question':'请问您跟他是什么关系呢？','answer':this.dialogResultRadio11, 'remark':'1'},

      {'question':'请问他们家的主要赚钱方式是什么？','answer':this.dialogResultRadio_8, 'remark':'3'},
      {'question':'您知道他们家的月收入大概是多少吗？','answer':this.dialogResultRadio_9, 'remark':'4'},
      {'question':'他这份工作大概做了多久了？','answer':this.dialogResultRadio14, 'remark':'5'},
      {'question':'请问您知道是否有别的公司向他催款吗？','answer':this.dialogResultRadio15, 'remark':'6'},
      {'question':'如果用户不还款，您是否愿意帮忙还款？','answer':this.dialogResultRadio17, 'remark':'7'}];
    }
    dialogResultRadio = this.dialogResultRadio26;
  } else if(type == '3') {
    dialogResultRadio = this.dialogResultRadio23;
  } else if (type == '5') {
    dialogResultRadio = this.dialogResultRadio25;
  }
  if (dialogResultRadio == '0') {
    this.$message("请选择审核结果！");
    return;
  }
  this.flagor = true;
  let index= this.comPhoneCheckIndex ;
  if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime) {
    this.comRecordEndTime = new Date();
    this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime=this.getdates(this.comRecordEndTime);
    let dureTime=(this.comRecordEndTime-this.comRecordStartTime)/1000;
    let dureTimeH=Math.floor(dureTime/3600);
    let dureTimeM=Math.floor((dureTime%3600)/60);
    let dureTimeS=Math.floor((dureTime%3600)%60);
    this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
    this.comPhoneCheckStartVif=false;
  }

  let _data={
    "userUuid":this.userUuid,
    "createUser": DataUtil.id(),
    "updateUser": DataUtil.id(),
    "orderNo": this.uuid,
    "alertTime": this.getdates(this.phoneCheckDate),
    "remark": this.checkTextarea,
    "type": "3",
    "id": this.comPhoneCheckId,
    "langue":1,
    "teleReviewResult":dialogResultRadio,
    "workYear":this.workYearRadio,
    "teleReviewOperationType":type,
    "companyTeleQARequest":companyTeleQARequest,
    "teleReviewResultType":dialogResultRadio,
    "realName":this.realName,
    "mobile":this.mobile,
    "startTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime,
    "endTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime,
    "burningTime": this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].burningTime,
    "description": this.rejectReason
  };
  this.$http.post("manage/inserOrUpdateManOrderRemark", _data,false).then(response => {
    if (1 == response.body.code) {
      this.companyDialogVisible = false;
      this.comPhoneCheckId = response.body.data;
      this.$message({
        message: '提交成功',
        center: true
      });
      this.getTeleReviewObj(index);

    }
  })
},
clearAllMobile() {
  this.comPhoneChecktableData.forEach(e => {
    e.mobile = '';
  });
},
phoneCheckCommit(type){

  this.disabledSelfButtion = true;
  if (type == '5') {
    if (this.dialogResultRadio_1 == 0 || this.dialogResultRadio_2 == 0) {
      return ;
    }
  } else if (type == '6') {
    if (this.checkTextarea == '' && this.dialogResultRadio == '0') {
      this.$message.error("请填写备注或选择电核结果");
      return ;
    }
  }
  let companyTeleQARequest = [];

  if (type == '5') {
    companyTeleQARequest = [{'question':'请问您是' + this.baseInfList.realName + (this.baseInfList.sex == '1' ?
      '先生': '女士') + '吗？','answer':this.dialogResultRadio_1, 'remark':'1'},
    {'question':'请问您是否在DO-IT借过款？','answer':this.dialogResultRadio_2, 'remark':'2'}];
  }

  this.recordEndTime = new Date();
  this.phoneChecktableData[this.phoneChecktableData.length-1].endTime=this.getdates(this.recordEndTime);
  let dureTime=(this.recordEndTime-this.recordStartTime)/1000;
  let dureTimeH=Math.floor(dureTime/3600);
  let dureTimeM=Math.floor((dureTime%3600)/60)
  let dureTimeS=Math.floor((dureTime%3600)%60);
  this.phoneCheckCurrent.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
  this.phoneChecktableData[this.phoneChecktableData.length-1].burningTime=this.phoneCheckCurrent.burningTime;
  this.phoneCheckStartVif=false;
  this.phoneCheckDialogLoading = true;
  let index= this.phoneCheckIndex;
  let _data={
    "userUuid":this.userUuid,
    "createUser": DataUtil.id(),
    "updateUser": DataUtil.id(),
    "orderNo": this.uuid,
    "alertTime": this.getdates(this.phoneCheckDate),
    "remark": this.checkTextarea,
    "type":"1",
    "langue":1,
    "teleReviewResult":this.dialogResultRadio,
    "companyTeleQARequest":companyTeleQARequest,
    "workYear":this.workYearRadio,
    "burningTime": this.phoneCheckCurrent.burningTime,
    "operationType":this.dialogType - 4,
    "startTime": this.phoneChecktableData[this.phoneChecktableData.length-1].startTime,
    "endTime": this.phoneChecktableData[this.phoneChecktableData.length-1].endTime,
  };
  this.$http.post("manage/inserOrUpdateManOrderRemark", _data).then(response => {
    if (1 == response.body.code) {
      this.phoneCheckDialogLoading = false;
      this.checkDialogVisible = false;
      this.phoneCheckId=response.body.data;
      this.$message({
        message: '提交成功',
        center: true
      });

      this.showLastData(type, index);
      this.checkTextarea="";
      this.phoneCheckDate="";
      this.dialogResultRadio="0";
      this.workYearRadio = "0";
      this.disabledSelfButtion = false;
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
showCompanyLastData(index) {
  this.checkTextarea = '';
  let _data={
    "orderNo": this.uuid,
    "uuid": this.userUuid,
    "langue":1,
          "type": 1,//此处传死
          "teleReviewType":3
        };
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          let pass = response.body.data.pass;
          let res = response.body.data.remarks;
          if (res && res.length > 0) {
            let teleType = res[res.length-1].teleReviewOperationType;

            //进行最后一行记录赋值
            let data = res[res.length - 1];
            this.comPhoneChecktableData[index].id = data.id;
            this.comPhoneChecktableData[index].teleReviewResultType = data.teleReviewResultType;
            this.comPhoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.comPhoneChecktableData[index].remark=data.remark;
            this.comPhoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.comPhoneChecktableData[index].teleReviewOperationType = data.teleReviewOperationType;
            this.comPhoneChecktableData[index].updateTime = data.remark == '' ? '' : this.getdates(data.updateTime);
            if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].startTime) {
              this.comPhoneCheckStartVif = false;
            } else {
              this.comPhoneCheckStartVif = true;
            }



            //重置
            let comPhoneCheckCurrent1 = {
              "remark": "",
              "orderTag": 0,
              "alertTime": '',
              "startTime": '',
              "endTime": '',
              "burningTime": "",
              "current": true,
              "workYear": "",
              "teleReviewResult":"",
              "realName":'',
              "mobile":'',
              "teleReviewObject":"所在公司",
              "teleReviewOperationType":"",
              "teleReviewResultType":""
            };
            //稍后再拨进行自动新增
            if (!(this.companyObjDisabled && this.firstObjDisabled
              && this.secondObjDisabled)) {
              if (pass == 4) {
                //第一紧急联系人
                if (teleType == 3 || teleType == 4) {
                  if (this.orderStatus.userRole != 3) {
                    comPhoneCheckCurrent1.teleReviewObject = '第一紧急联系人';
                  } else {
                    comPhoneCheckCurrent1.teleReviewObject = '家庭收入来源者';
                  }
                  comPhoneCheckCurrent1.realName = this.realName1;
//                  comPhoneCheckCurrent1.mobile = this.mobile1;
} else if (teleType == 5 || teleType == 6) {
  if (this.orderStatus.userRole != 3) {
    comPhoneCheckCurrent1.teleReviewObject = '第二紧急联系人';
  } else {
    comPhoneCheckCurrent1.teleReviewObject = '紧急联系人';
  }
  comPhoneCheckCurrent1.realName = this.realName2;
//                  comPhoneCheckCurrent1.mobile = this.mobile2;
} else if (teleType == 1 || teleType == 2) {
  comPhoneCheckCurrent1.teleReviewObject = '所在公司';
  if (this.orderStatus.userRole != 3) {
    comPhoneCheckCurrent1.realName = this.jobInfList.companyName;
  } else {
    comPhoneCheckCurrent1.realName = this.familyWomen.companyName;
  }
}
this.comPhoneChecktableData.push(comPhoneCheckCurrent1);
}
}
}
if (this.comPhoneChecktableData[this.comPhoneChecktableData.length-1].endTime) {
  this.comPhoneCheckStartVif = false;
} else {
  this.comPhoneCheckStartVif = true;
}
if (pass == 1) {
  this.passOrNot = 1;
            //稍后再审禁用
            this.checkLaterTime = true;
            this.setDisabled();
          } else if (pass == '5') {
            this.passOrNot = 0;
            this.setDisabled();
          }
          //审核完成后，仍然没有通过，则拒绝
//          if (this.companyObjDisabled && this.firstObjDisabled
//            && this.secondObjDisabled &&
//            (response.body.data.pass == '2' || response.body.data.pass == '3')) {
//            this.passOrNot = '1';
//          }
this.clearAllMobile();
})
      },
      setDisabled () {
        this.companyObjDisabled = true;
        this.firstObjDisabled = true;
        this.secondObjDisabled = true;
        this.isSubmit = false;
      },
      showLastData(type,index) {
        let _data={
          "orderNo": this.uuid,
          "uuid": this.userUuid,
          "langue":1,
          "type": 1,//此处传死
          "teleReviewType":1 //3公司，1个人
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {

          if (response.body.data.pass == '1') {
            this.passOrNotSelf = 1;
            this.checkFlag = true;
          } else if (response.body.data.pass == '5') {
            this.passOrNotSelf = 0;
            this.checkFlag = true;
          }
          let res=response.body.data.remarks;
          if (!res) {
            return;
          }
          let data = res[res.length - 1];
          if (type <5) {
            this.comPhoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.comPhoneChecktableData[index].remark=data.remark;
            this.comPhoneChecktableData[index].workYear = data.workYear;
            this.comPhoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.comPhoneChecktableData[index].updateTime = this.getdates(data.updateTime);
          } else {
            this.phoneChecktableData[index].alertTime=this.getdates(data.alertTime);
            this.phoneChecktableData[index].remark=data.remark;
            this.phoneChecktableData[index].workYear = data.workYear;
            this.phoneChecktableData[index].teleReviewResult = data.teleReviewResult;
            this.phoneChecktableData[index].operationType = data.operationType;
            this.phoneChecktableData[index].teleReviewResultType = data.teleReviewResultType;
            this.phoneChecktableData[index].updateTime = this.getdates(data.updateTime);

            let phoneCheckCurrent = {
              "remark": "",
              "orderTag": 0,
              "alertTime": '',
              "startTime": '',
              "endTime": '',
              "burningTime": "",
              "current": true,
              "workYear": "",
              "teleReviewResult":"",
              "operationType":0,
              "teleReviewResultType":0
            };
//            if (res.length >= 6) {
//                return;
//            }
if (this.checkFlag) {
  return;
}
localStorage.setItem(this.uuid + "checkSelfFlag",new Date());
this.phoneCheckStartVif=true;
this.phoneChecktableData.push(phoneCheckCurrent);
}
})
      }
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
      this.getCheckRule();
      this.getcheckSuggest();
      this.getPairVerifySimilarity();
      this.getOperatorTypeList();
    }
  }
  </script>

  <style>
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
  /*  .asides tr :nth-child(1){
      width: 30%;
    }
    .asides tr :nth-child(2){
      width: 70%;
      }*/

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
        font-weight: bold;
        color: #888;
        margin: 10px 0
      }
      .company-pass{
        font-size:11px;
      }
      .subtitle{
        font-size: 13px;
        color: #888;
      }
      .orderBox .el-row {
        margin: 15px 30px;
      }
      /*.orderBox .el-col span{*/
        /*margin-right: 10px;*/
        /*}*/
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
        .imgCss{
          display:block;
          width: 100%;
          height: 250px;
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
        .asides .faceCheck .faceImgTop {
          width: 45%;
          height: 250px;
          /*overflow: hidden;*/
          margin: 1.5%;
          float: left;
          text-align: center;
        }
        .asides .faceCheck .faceImgTop img{
          margin: 0 auto;
          height: 200px;
          display: block;
          border: .5px solid #F1F2F7;
          border-radius: 5px;
        }
        .asides .faceCheck .faceImgBottom {
          width: 90%;
          height: 350px;
          overflow: hidden;
          margin: 2.5%;
          float: left;
          text-align: center;

        }
        .asides .faceCheck .faceImgBottom img{
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
        .reviewTable {
          width: 60%;
          margin: 0 auto;
        }
        </style>
