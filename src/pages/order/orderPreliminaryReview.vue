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
      <el-col :span="8" class="grid-content">
        <div><span>WhatsApp账号:</span><span>{{orderStatus.WhatsApp}}</span></div>
      </el-col>
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
            <div class="mains">
              <div class="check_rule">
                <el-form label-width="80px">
                  <el-form-item label="审核规则">
                    <el-button @click="baseInfSave" type="primary" size="small">保存</el-button>
                    <el-button @click="baseInfEdit" type="primary" size="small">编辑</el-button>
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
                  <el-button @click="jobInfSave" type="primary" size="small">保存</el-button>
                  <el-button @click="jobInfEdit" type="primary" size="small">编辑</el-button>
                </el-form-item>
              </el-form>
              <template v-for="(item,index) in jobRuleList">
                <div class="question_radio">
                  <div class="question_text">{{item.description}}</div>
                  <div class="radio_box">
                    <span v-if="item.description === '4、google不到公司电话？'">
                      <el-checkbox :disabled="comphoneLag || jobInfShow" v-model="item.ruleResult"></el-checkbox>
                    </span>
                    <span v-if="item.description != '4、google不到公司电话？'">
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
          <div class="one-title">家庭信息</div>
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
                <el-button @click="jobInfSave" type="primary" size="small">保存</el-button>
                <el-button @click="jobInfEdit" type="primary" size="small">编辑</el-button>
              </el-form-item>
            </el-form>
            <template v-for="(item,index) in jobRuleList">
              <div class="question_radio">
                <div class="question_text">{{item.description}}</div>
                <div class="radio_box">
                  <span v-if="item.description === '4、google不到公司电话？'">
                    <el-checkbox :disabled="comphoneLag || jobInfShow" v-model="item.ruleResult"></el-checkbox>
                  </span>
                  <span v-if="item.description != '4、google不到公司电话？'">
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
              <el-button @click="jobInfSave" type="primary" size="small">保存</el-button>
              <el-button @click="jobInfEdit" type="primary" size="small">编辑</el-button>
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
          <td>用户备用手机号</td>
          <td>{{connectInfList.alternatePhoneNo}}</td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="审核规则">
            <el-button @click="connectInfSave" type="primary" size="small">保存</el-button>
            <el-button @click="connectInfEdit" type="primary" size="small">编辑</el-button>
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
            <el-button @click="faceCheckSave" type="primary" size="small">保存</el-button>
            <el-button @click="faceCheckEdit" type="primary" size="small">编辑</el-button>
          </el-form-item>
        </el-form>

        <template v-for="(item,index) in faceCheckRuleList">

          <span v-if="index <= 3 || (Personimg && index > 3)">
            <div class="question_radio">
              <div class="question_text">{{item.description}}</div>
              <div class="radio_box">
                <span v-if="item.description === '图片破损？'">
                  <el-checkbox :disabled="faceCheckShow" v-model="item.ruleResult" @change="personCheckShowOrNot"></el-checkbox>
                </span>
                <span v-if="item.description === '驾照？' || item.description === '护照？' ">
                  <el-checkbox :disabled="dricheck" v-model="item.ruleResult"></el-checkbox>
                </span>
                <span v-if="item.description != '图片破损？' && item.description != '驾照？' && item.description != '护照？' ">
                  <el-checkbox :disabled="faceCheckShow" v-model="item.ruleResult"></el-checkbox>
                </span>

              </div>
            </div>
          </span>
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
<!-- <el-row  v-if="videoShowOrNot">
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
          <el-button @click="videoCheckSave" type="primary" size="small">保存</el-button>
          <el-button @click="videoCheckEdit" type="primary" size="small">编辑</el-button>
        </el-form-item>
      </el-form>
      <div class="question_radio">
        <div class="question_text">1、视频中人非用户本人？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[0].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">2、视频是他人代读/有人指导？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[1].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">3、看不清/看不到人脸?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[2].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">4、视频破损？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
        </div>
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
              <el-button @click="addtionInfSave" type="primary" size="small">保存</el-button>
              <el-button @click="addtionInfEdit" type="primary" size="small">编辑</el-button>
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in otherCheckRuleList">
            <span v-if="index <= 4 || (creaditShowOrNot && index > 4)">
              <div class="question_radio">
                <div class="question_text">{{item.description}}</div>
                <div class="radio_box">
                  <span v-if="item.description === '5、上传的是信用卡？'">
                    <el-checkbox :disabled="addtionInfShow" v-model="item.ruleResult" @change="creditCheckShowOrNot"></el-checkbox>
                  </span>

                  <span v-if="item.description === '1、信用卡上姓名与订单姓名一致？'">
                    <el-checkbox :disabled="addtionInfShow || creaditSecondShowOrNot" v-model="item.ruleResult" @change="creditFirstCheckShowOrNot"></el-checkbox>
                  </span>
                  <span v-if="item.description === '2、信用卡上姓名与订单姓名不一致？'">
                    <el-checkbox :disabled="addtionInfShow || creaditFirstShowOrNot" v-model="item.ruleResult" @change="creditSecondCheckShowOrNot"></el-checkbox>
                  </span>

                  <span v-if="item.description === '3、visa信用卡？'">
                    <el-checkbox :disabled="addtionInfShow || creaditForthShowOrNot" v-model="item.ruleResult" @change="creditThirdCheckShowOrNot"></el-checkbox>
                  </span>
                  <span v-if="item.description === '4、mastercard信用卡？'">
                    <el-checkbox :disabled="addtionInfShow || creaditThirdShowOrNot" v-model="item.ruleResult" @change="creditForthCheckShowOrNot"></el-checkbox>
                  </span>

                  <span v-if="item.description != '5、上传的是信用卡？' && item.description != '1、信用卡上姓名与订单姓名一致？'
                  && item.description != '2、信用卡上姓名与订单姓名不一致？' && item.description != '3、visa信用卡？'
                  && item.description != '4、mastercard信用卡？'">
                  <el-checkbox :disabled="addtionInfShow" v-model="item.ruleResult"></el-checkbox>
                </span>
              </div>

            </div>
          </span>

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
<!-- 提交   -->
<el-form id="btnForm">
  <el-form-item align="right">
    <el-button @click="dialogVisible1 = true" type="primary">拒绝</el-button>
    <el-button @click="dialogVisible = true" type="primary">提交</el-button>
  </el-form-item>
</el-form>
<el-dialog
title="提交"
:visible.sync="dialogVisible"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>确认提交用户{{baseInfList.realName}}的申请订单，请在下方填写审核意见
</el-col>
<el-col>
  <i>初审结果:</i>
  <el-radio-group v-model="radio">
    <el-radio :label="1">优秀</el-radio>
    <el-radio :label="2">良好</el-radio>
    <el-radio :label="3">一般</el-radio>
    <el-radio :label="6">存疑</el-radio>
  </el-radio-group>
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
  <el-button type="primary" @click="reviewDialog(1)">提交复审</el-button>
</span>
</el-dialog>
<el-dialog
title="拒绝"
:visible.sync="dialogVisible1"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>确认提交用户{{baseInfList.realName}}的申请订单，请在下方填写审核意见
</el-col>
<el-col>
  <i>初审结果:</i>
  <el-radio v-model="radio" label="4">资质不符</el-radio>
  <el-radio v-model="radio" label="5">信息不对称</el-radio>
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark1"
class = 'textarear'>
</el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible1 = false">取 消</el-button>
  <el-button type="primary" @click="reviewDialog(2)">提交复审</el-button>
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
      historyLoading: false,
      faceShowOrNot: false,
      hitOrNot: false,
      insuranceHitOrNot: false,
      familyCard: false,
      familyCardControl1: false,
      familyCardControl2: false,
      videoShowOrNot: true,

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
          borrowUse:''//借款用途
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
        burningTime:'',

        // check显示
        baseInfShow: false,
        jobInfShow: false,
        comphoneLag:false,
        isActive:true,
        noActive:false,
        radio1:"",
        radio:"",
        connectInfShow: false,
        faceCheckShow: false,
        dricheck: true,
        videoCheckShow: false,
        addtionInfShow: false,
        facePhotoUrls:'',
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        flager:true,
        addtionInfRemark: '',
        // 审核规则
        baseRuleList: [],
        baseRuleList1: [],
        creaditFirstShowOrNot: false,
        creaditSecondShowOrNot: false,
        creaditThirdShowOrNot: false,
        creaditForthShowOrNot: false,
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
        },{
          attachmentName:"保险卡",
          attachmentType:17,
          attachmentUrl: require("../../assets/none.png")
        }],
        workerSeen: true,
        studentSeen: false,
        familySeen: false,
        userUuid: "",
        uuid: "",
        IsStudents: false,
        sessionId: '',
        dialogVisible: false,
        dialogVisible1:false,
        Personimg:false,
        creaditShowOrNot: false,
        reviewRemark: '',
        reviewRemark1: '',
        pairVerifySimilarity: ''
      }
    },
    methods: {
      formatUnixDateTime(time){
        return DataUtil.formatUnixDateTime(time);
      },
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
      getdates(dates) {
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
      // 编辑按钮click
      baseInfEdit(){
        this.baseInfShow=false;
      },
      jobInfEdit(){
        this.jobInfShow=false;
      },
      connectInfEdit(){
        this.connectInfShow=false;
      },
      faceCheckEdit(){
        this.faceCheckShow=false;
        this.dricheck=false;

      },
      videoCheckEdit(){
        this.videoCheckShow=false;
      },
      addtionInfEdit(){
        this.addtionInfShow=false;
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
      // 保存按钮
      baseInfSave(){
        if(this.baseInfShow==true){
          this.$message('请先编辑，后保存');return;
        }


        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.baseInfRemark},
          "checkRuleList": this.baseRuleList,
          "infoType": 1,
          "sessionId": this.sessionId
        };
        if(this.IsStudents==true){
          _data.infoType=2;
          _data.checkRuleList = this.baseRuleList1;
        }

        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('保存成功');
            this.baseInfShow=true;
          }else{
            this.$message('保存失败，请重试');
          }
        })
      },
      jobInfSave(){
        if(this.jobInfShow==true){
          this.$message('请先编辑，后保存');return;
        }
        let _data={
          "orderNo":this.uuid,
          "checkRuleRemark":{"remark": this.jobInfRemark},
          "checkRuleList": this.jobRuleList,
          "infoType": 3,
          "sessionId": this.sessionId
        }
        if(this.IsStudents==true){
          _data.infoType=4;
          _data.checkRuleList = this.jobRuleList1;
        }
        this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
          if (1 == response.body.code) {
            this.$message('保存成功');
            this.jobInfShow=true;
          }else{
            this.$message('保存失败，请重试');
          }
        })
      },
      creditFirstCheckShowOrNot() {
        if (this.otherCheckRuleList[5].ruleResult == true) {
          this.creaditFirstShowOrNot = true;
        }else {
          this.creaditFirstShowOrNot = false;
          this.otherCheckRuleList[6].ruleResult = false;
        }

      },
      creditSecondCheckShowOrNot() {
        if (this.otherCheckRuleList[6].ruleResult) {
          this.creaditSecondShowOrNot = true;
        }else {
          this.creaditSecondShowOrNot = false;
          this.otherCheckRuleList[5].ruleResult = false;
        }
      },
      creditThirdCheckShowOrNot() {
        if (this.otherCheckRuleList[7].ruleResult) {
          this.creaditThirdShowOrNot = true;
        }else {
          this.creaditThirdShowOrNot = false;
          this.otherCheckRuleList[8].ruleResult = false;
        }
      },
      creditForthCheckShowOrNot() {
        if (this.otherCheckRuleList[8].ruleResult) {
          this.creaditForthShowOrNot = true;
        }else {
          this.creaditForthShowOrNot = false;
          this.otherCheckRuleList[7].ruleResult = false;
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
     connectInfSave(){
      if(this.connectInfShow==true){
        this.$message('请先编辑，后保存');return;
      }
      let _data={
        "orderNo":this.uuid,
        "checkRuleRemark":{"remark": this.connectInfRemark},
        "checkRuleList": this.connectRuleList,
        "infoType": 5,
        "sessionId": this.sessionId
      }
      this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
        if (1 == response.body.code) {
          this.$message('保存成功');
          this.connectInfShow=true;
        }else{
          this.$message('保存失败，请重试');
        }
      })
    },
    faceCheckSave(){
      if(this.faceCheckShow==true){
        this.$message('请先编辑，后保存');return;
      }
      let _data={
        "orderNo":this.uuid,
        "checkRuleRemark":{"remark": this.faceCheckRemark},
        "checkRuleList": this.faceCheckRuleList,
        "infoType": 6,
        "sessionId": this.sessionId
      }
      this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
        if (1 == response.body.code) {
          this.$message('保存成功');
          this.faceCheckShow=true;
          this.dricheck=true;
        }else{
          this.$message('保存失败，请重试');
        }
      })
    },
    videoCheckSave(){
      if(this.videoCheckShow==true){
        this.$message('请先编辑，后保存');return;
      }
      let _data={
        "orderNo":this.uuid,
        "checkRuleRemark":{"remark": this.videoCheckRemark},
        "checkRuleList": this.videoCheckRuleList,
        "infoType": 7,
        "sessionId": this.sessionId
      }
      this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
        if (1 == response.body.code) {
          this.$message('保存成功');
          this.videoCheckShow=true;
        }else{
          this.$message('保存失败，请重试');
        }
      })
    },
//     faceCheckShowOrNot() {
//       if (this.faceCheckRuleList[2].ruleResult) {
//        this.dricheck = false;
//        if (this.addtionInfList[1].attachmentUrl && this.addtionInfList[2].attachmentUrl
//         && (this.addtionInfList[1].attachmentUrl != '/static/img/none.51d2a6c.png'
//           || this.addtionInfList[2].attachmentUrl != '/static/img/none.51d2a6c.png')) {
//         this.faceShowOrNot = true;
//     } else {
//       this.faceCheckRuleList[2].ruleLevel = 3;

//     }
//   }else{
//     this.dricheck = true;
//   }
// },
personCheckShowOrNot() {
  if (this.faceCheckRuleList[3].ruleResult == true) {
    this.Personimg = true;
  } else {
    this.Personimg = false;
  }
},
creditCheckShowOrNot() {
  if (this.otherCheckRuleList[4].ruleResult == true) {
    this.creaditShowOrNot = true;
  }else {
    this.creaditShowOrNot = false;
  }

},



judgeHitOrNot() {

  this.$http.post('manage/isUserHitRuleForVerifyScore',{'orderNo':this.uuid}).then(response => {
    if (response.body.data) {
      this.hitOrNot = true;
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
      this.jobRuleList[3].ruleResult = true;
    }
  })
},
addtionInfSave(){
  if(this.addtionInfShow==true){
    this.$message('请先编辑，后保存');return;
  }
  let _data={
    "orderNo":this.uuid,
    "checkRuleRemark":{"remark": this.addtionInfRemark},
    "checkRuleList": this.otherCheckRuleList,
    "infoType": 8,
    "sessionId": this.sessionId
  }
  this.$http.post("manage/manOrderCheckRuleEdit", _data).then(response => {
    if (1 == response.body.code) {
      this.$message('保存成功');
      this.addtionInfShow=true;
    }else{
      this.$message('保存失败，请重试');
    }
  })
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
            this.getBaseInf(this.userUuid,9);
            this.judgeHitOrNot();
            // this.judgeInsuranceHitOrNot();
            // this.judgefamilyCard();
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
      getIndex(index){
        return this.historyData.lenght-index+1;
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
          let _data={
            "orderNo": this.uuid,
            "infoType": type
          }
          this.$http.post("manage/manOrderCheckRuleInfo", _data).then(response => {
            if (1 == response.body.code && response.body.data.checkRuleList[0]) {
              let data=response.body.data;
              if(type==1&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.baseRuleList=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark;}
              if(type==2&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.baseRuleList1=data.checkRuleList;this.baseInfRemark=data.checkRuleRemark.remark}
              if(type==3&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.jobRuleList=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark;}
              if(type==4&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.jobRuleList1=data.checkRuleList;this.jobInfRemark=data.checkRuleRemark.remark}
              if(type==5&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.connectRuleList=data.checkRuleList;this.connectInfRemark=data.checkRuleRemark.remark}
              if(type==6&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.faceCheckRuleList=data.checkRuleList;
               this.faceCheckRemark=data.checkRuleRemark.remark}
               // if(type==7&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.videoCheckRuleList=data.checkRuleList;this.videoCheckRemark=data.checkRuleRemark.remark}
               if(type==8&&data.checkRuleList!==''&&data.checkRuleList.length!=0){this.otherCheckRuleList=data.checkRuleList;this.addtionInfRemark=data.checkRuleRemark.remark}
             }
           })
        }
      },

      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
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
              // this.getBaseInf(this.userUuid,7);
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
                if(obj.attachmentType==17){
                  adt[6]=obj;
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
      reviewDialog(type){
        if (type == 1) {
          if (this.reviewRemark == '' && !this.radio) {
            this.$message.error("请填写备注或选择初审结果");
            return ;
          }
        }else{
          if (this.reviewRemark1 == '' && !this.radio) {
            this.$message.error("请填写备注或选择初审结果");
            return ;
          }
        }
        var Orderstar = localStorage.getItem("myCat");
        var Orderstartime = new Date(Orderstar);
        var Orderendtime = new Date();
        let dureTime=(Orderendtime-Orderstartime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60);
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        let _data={
          "remark": type == 1 ? this.reviewRemark : this.reviewRemark1,  //必填
          "unPass": type == 2,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "type" : this.radio,
          "burningTime":this.burningTime
        }
        this.$http.post("manage/firstCheck", _data).then(response => {
          if (1 == response.body.code) {
            this.dialogVisible=false;
            this.dialogVisible1=false;
            this.$message("提交成功");
            window.close();
            window.opener.location.reload('#/RiviewTheListFirst');
            // window.open('#/RiviewTheListFirst');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            this.dialogVisible1=false;
            window.close();
            window.open('#/RiviewTheListFirst');
            return;
          }
        })

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

      handIdCardUrlClickone(){
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

      idCardUrlClickone(){
        if(this.baseInfList.idCardUrl){
          let _photoList = [
          this.baseInfList.idCardUrl
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
      // hideUserPhone(phone) {
      //   if (phone == '' || phone.length < 5) {
      //     return phone;
      //   }
      //   var mobile = '';
      //   for (var index = 0; index < phone.length - 4 ;index++ ) {
      //     mobile += '*';
      //   }
      //   mobile = mobile + phone[phone.length - 4] + phone[phone.length - 3]
      //   + phone[phone.length - 2] + phone[phone.length - 1];
      //   return mobile;
      // }
    },
    mounted: function () {
      this.uuid = this.$route.query['uuid']||'';
      this.userUuid = this.$route.query['userUuid']||'';
      this.sessionId=DataUtil.sid();
      this.getOrderStatus();
      this.getHistoryDetail();
      this.getCheckRule();
      this.getPairVerifySimilarity();
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
/*    border: .5px solid #F1F2F7;
border-radius: 5px;*/
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
/*  #studentsInf td img{
    max-width: 300px;
    max-height: 200px;
    }*/
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

   .textarear .el-textarea__inner{
    font-size:15px;
    font-weight: 900;
  }
  </style>
