/**
* Created by tonggen on 2017/1/7.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">订单状态 <el-button class="tp-title" type="primary" size="mini" @click="dialogVisible1 = true">打款凭证</el-button></div>
      <el-col :span="8" class="grid-content">
        <div><span>订单编号:</span><span>{{ ip }}</span></div>
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
        <div><span>催收标识:</span><span>{{getOrderTag(orderStatus.collectionFlag)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请金额:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>申请时间:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>逾期账户管理费:</span><span>{{orderStatus.overdueFee}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>逾期账户滞纳金:</span><span>{{orderStatus.overdueMoney}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>应还款总额:</span><span>{{orderStatus.shouldPayAmount}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>实际应还款金额:</span><span>{{orderStatus.actualPayAmount}}</span></div>
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
      <el-step v-for="item in orderProData" :key="item.status" :title="getOrderPro(item.status)">
        <div slot="description">
          {{getOrderPro(item.status)}}<br>{{getdate(item.createTime)}}</div>
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
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
              <td><div v-if="jobInfList.sourceTel !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{jobInfList.sourceTel}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.studentCardUrl" @click.stop="studentCardUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>奖学金照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.scholarshipUrl" @click.stop="scholarshipUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>英语证书照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.englishUrl" @click.stop="englishUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>计算机证书</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.ComputerUrl" @click.stop="ComputerUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>校园卡照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.schoolCardUrl" @click.stop="schoolCardUrlClick" alt=""></td>
            </tr>
            <tr>
              <td>其他大赛照片</td>
              <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="'data:image/jpeg;base64,'+jobInfList.otherCertificateUrl" @click.stop="otherCertificateUrlClick" alt=""></td>
            </tr>
          </table>
        </div>
      </div>
    </el-row>
    <div class="divid-line"></div>
    <el-row v-if="contactmanage">
      <div class="one-title">本人信息</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>本人电话</td>
            <td><div v-if="baseMobileList.mobile != null "><el-tooltip effect="dark" placement="top-start">
              <div slot="content">{{baseMobileList.mobile}}</div>
              <span>*********</span>
            </el-tooltip></div></td>
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
        <el-button @click="addRootReply(baseMobileList.mobile, 1)" type="success">记录</el-button>
        <el-button @click="aotuCall(baseMobileList.mobile,1)" :disabled ="callflag1" type="success">呼叫</el-button>
      </div>
    </el-row>
    <el-row  v-if="contactmanage1">
      <div class="one-title">备用电话</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>本人备用电话</td>
            <td><div v-if="baseMobileListone.mobile !=null "><el-tooltip  effect="dark" placement="top-start">
              <div slot="content" >{{baseMobileListone.mobile}}</div>
              <span>*********</span>
            </el-tooltip></div></td>
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
        <el-button @click="addRootReplyby(baseMobileListone.mobile)" type="success">记录</el-button>
        <el-button @click="aotuCall(baseMobileListone.mobile,4)" :disabled ="callflag4" type="success">呼叫</el-button>
      </div>
    </el-row>
    <el-row v-if="contactmanage2">
      <div class="one-title">公司电话</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>公司电话</td>
            <td><div v-if="baseMobileListtwo.mobile !=null "><el-tooltip  effect="dark" placement="top-start">
              <div slot="content" >{{baseMobileListtwo.mobile}}</div>
              <span>*********</span>
            </el-tooltip></div></td>
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
        <el-button @click="addRoot(baseMobileListtwo.mobile)" type="success">记录</el-button>
        <el-button @click="aotuCall(baseMobileListtwo.mobile,2)" :disabled ="callflag2" type="success">呼叫</el-button>
      </div>
    </el-row>
    <el-dialog title="催收记录" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
        <el-form-item label="选择联系方式">
         <el-select v-model="addForm.contactMode" placeholder="请选择" clearable @change="getProv($event)">
          <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择联系结果">
       <el-select v-model="addForm.contactResult" placeholder="请选择" clearable>
        <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" placeholder="请填写备注" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="tijiaofor" >提 交</el-button>
  </div>
</el-dialog>
<el-dialog title="催收记录" v-model="addDialogVisibleReply" :close-on-click-modal="false" size="tiny">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="选择联系方式">
     <el-select v-model="addForm.contactMode" placeholder="请选择" clearable @change="getProv($event)">
      <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择联系结果">
   <el-select v-model="addForm.contactResult" placeholder="请选择" clearable  @change="funcRepay">
    <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
  </el-select>
</el-form-item>
<div v-if="repayflag">
  <el-form-item label="还款意愿">
    <el-rate v-model="repayList.repayDesire" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="还款能力">
    <el-rate v-model="repayList.repayBility" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="用户素质">
    <el-rate v-model="repayList.userDiathesis" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
</div>
<el-form-item label="备注">
  <el-input type="textarea" placeholder="请填写备注" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisibleReply = false">取 消</el-button>
  <el-button type="primary" @click="tijiaoforReply(2)" >提 交</el-button>
</div>
</el-dialog>
<el-dialog title="催收记录" v-model="addDialogVisibleReplyby" :close-on-click-modal="false" size="tiny">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="选择联系方式">
     <el-select v-model="addForm.contactMode" placeholder="请选择" clearable @change="getProv($event)">
      <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择联系结果">
   <el-select v-model="addForm.contactResult" placeholder="请选择" clearable @change="funcRepay">
    <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
  </el-select>
</el-form-item>
<div v-if="repayflag">
  <el-form-item label="还款意愿">
    <el-rate  v-model="repayList.repayDesire" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="还款能力">
    <el-rate v-model="repayList.repayBility" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="用户素质">
    <el-rate v-model="repayList.userDiathesis" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
</div>
<el-form-item label="备注">
  <el-input type="textarea" placeholder="请填写备注" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisibleReplyby = false">取 消</el-button>
  <el-button type="primary" @click="tijiaoforReply(3)" >提 交</el-button>
</div>
</el-dialog>
<div class="divid-line"></div>
<div v-if="contactmanage3">
  <el-row>
    <div class="one-title">联系人信息</div>
    <template v-for="(item,index) in getlinkmanList">
     <div class="asides">
      <table border='.1px' width="40%" style="table-layout:fixed;float:left; margin:15px 15px;">
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
          <td><div v-if="item.mobile !=null "><el-tooltip  effect="dark" placement="top-start">
            <div slot="content" >{{item.mobile}}</div>
            <span>*********</span>
          </el-tooltip></div></td>
        </tr>
        <tr>
          <td>WA/Line{{index+1}}</td>
          <td><div v-if="item.waOrLine !=null "><el-tooltip  effect="dark" placement="top-start">
            <div slot="content" >{{item.waOrLine}}</div>
            <span>*********</span>
          </el-tooltip></div></td>
        </tr>
        <tr>
          <td>外呼结果</td>
          <td>{{getmobilecon(item.callResult)}}</td>
        </tr>
        <div style="margin-left:15px;">
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
          <el-button @click="addRoot(item.mobile, index + 3)" type="success">记录</el-button>
          <el-button @click="aotuCall(item.mobile,3)" :disabled ="callflag3" type="success">呼叫</el-button>
        </div>
      </table>
    </div>
  </template>
</el-row>
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
        <el-button @click="addRoot(item.mobile, 7)" type="success">记录</el-button>
        <el-button @click="aotuCall(item.mobile,5)" type="success" :disabled="callflag5" >呼叫</el-button>
      </table>
    </div>

  </el-row>
</template>
</div>
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
<!-- 人脸识别 faceCheck-->
<!-- <el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">人脸识别</div>
      <div class="faceCheck">
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls"  @click.stop="facePhotoUrlClick"><br>活体识别截图</div>
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>手持身份证照片</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>身份证正面照</div>
      </div>
    </div>
  </div>
</el-row> -->
<!-- <div class="divid-line"></div> -->
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
</el-row> -->
<!-- <div class="divid-line"></div> -->
<!-- 订单备注 -->
<el-row>
  <h1 class="one-title">订单备注</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="300">
    <el-table-column type="index" label="序号" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="operator" label="操作员" width="220">
    </el-table-column>
    <el-table-column prop="contactMobile" label="联系号码" width="120">
    </el-table-column>
    <el-table-column prop="contactMode" label="联系方式" width="120">
      <template scope="scope">{{getprovs(scope.row.contactMode)}}</template>
    </el-table-column>
    <el-table-column prop="contactResult" label="状态" width="120">
      <template scope="scope">{{getcitys(scope.row.contactResult)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" width="200" >
    </el-table-column>
    <el-table-column prop="orderTag" label="标签" width="100">
      <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
    </el-table-column>
    <el-table-column prop="alertTime" label="下次提醒时间" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
    </el-table-column>
    <el-table-column prop="promiseRepaymentTime" label="承诺时间" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.promiseRepaymentTime)}}</template>
    </el-table-column>
  </el-table>

</el-row>
<div class="divid-line"></div>

<!-- 添加备注 -->
<el-row>
  <h1 class="one-title">添加订单标签及备注</h1>
  <el-form :model="addRemarkForm" :rule="addRemarkRule" ref="addRemarkForm" label-width="100px">
    <el-form-item label="填写备注" prop="remark">
      <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
  </el-form>
  <el-form :inline="true" :model="tagForm" :rule="addRemarkRule" label-width="100px" ref="addRemarkForm">
    <el-form-item label="选择标签" prop="remark">
      <el-select v-model="tagForm.orderTag" placeholder="请选择" clearable>
        <el-option v-for="item in tagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item><br>
    <el-form-item label="添加提醒时间" prop="remindTime">
      <el-date-picker v-model="tagForm.remindDate" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
      <el-time-select placeholder="请选择时间" v-model="tagForm.remindTime" :picker-options="pickerTimeOptions"></el-time-select>
      （非必填）
    </el-form-item>
    <el-form-item label="发薪日">
     <el-select v-model="tagForm.payDay" placeholder="请选择" clearable>
      <el-option v-for="item in payDayList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="saveTagForm" :loading="tagFormLoading">打个标签</el-button>
  </el-form-item>
  <el-form-item label="承诺还款时间" prop="promiseRepaymentTime">
    <el-date-picker v-model="tagForm.promiseDate" type="date" placeholder="请选择日期" :picker-options="pickerOptions"></el-date-picker>
    <el-time-select placeholder="请选择时间" v-model="tagForm.promiseTime" :picker-options="pickerTimeOptions"></el-time-select>
    （非必填）
  </el-form-item>
</el-form>
</el-row>
<div class="divid-line"></div>
<el-row v-if="D0CollectionSmsShow">
  <div class="one-title">一键发送短信</div>
  <el-table :data="SmSData"  v-loading="SmSDataLoading" size="large">
    <el-table-column prop="id" min-width="210" label="序号"></el-table-column>
    <el-table-column prop="sender" min-width="210" label="发送人员"></el-table-column>
    <el-table-column prop="receiveType" min-width="210" label="接收人员"></el-table-column>
    <el-table-column prop="sendTime" min-width="210" label="发送时间">
     <template scope="scope">
      {{getdate(scope.row.sendTime)}}
    </template>
  </el-table-column>
  <el-table-column prop="smsTitle" min-width="210" label="短信标题"></el-table-column>
</el-table>
<div class="heihher"></div>
<el-form>
  <el-form-item label="选择收件人" v-if = "notdzero">
    <el-select v-model="searchForm.collectionSmsType" placeholder="请选择" clearable>
      <el-option v-for="item in SJList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择收件人" v-if = "isdzero">
    <el-select v-model="searchForm.collectionSmsType" placeholder="请选择" clearable>
      <el-option v-for="item in SJListD0" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择短信标题" prop="smsTemplateId" >
    <el-select v-model="searchForm.smsTemplateId" placeholder="请选择" clearable @change="titlenex" >
      <el-option  v-for="item in titleList" :label="item.smsTitle" :key="item.smsTemplateId" :value="item.smsTemplateId" ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="预览" prop="smsContent">
    <el-input
    type="textarea"
    :rows="9"
    placeholder=""
    :disabled="true"
    v-model="smsContent"
    class = 'textarear'
    >
  </el-input>
</el-form-item>
<el-form-item>
  <el-button type="primary" @click="SmsFor" :disabled="oneceSms">{{onececontent}}</el-button>
</el-form-item>

</el-form>
</el-row>
<div class="divid-line"></div>
<el-row>
  <div class="one-title">历史订单记录</div>
  <el-table :data="historyData" v-loading="historyLoading" size="large">
    <el-table-column prop="uuid" min-width="210" label="订单编号"></el-table-column>
    <el-table-column prop="status" min-width="210" label="订单状态">
      <template scope="scope">
        <span>{{getenums(scope.row.status)}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="amountApply" min-width="210" label="申请金额"></el-table-column>
    <el-table-column prop="borrowingTerm" min-width="210" label="期限">
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
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
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
      addForm:{
        contactMode:'',
        contactResult:'',
        tema:'',
        remark:''
      },
      voicePhone:'',
      ip:'',
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
      userName:'',
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
      // companyPhoneShow:true,
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
      bankList:[],
      type:'',
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
        callflag1:false,
        callflag2:false,
        callflag3:false,
        callflag4:false,
        callflag5:false,
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
        repayflag:false,
        titleList:[],
        dialogVisible1:false,
        citys: [],
        promiseRepaymentTime:'',
        isActive:true,
        noActive:false,
        linkData: [],//通讯录
        dialogTableVisible: false,
        isTrueMXCall:false,
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
        workerSeen: true,
        studentSeen: false,
        addDialogVisible: false,
        addDialogVisibleReply: false,
        addDialogVisibleReplyby: false,
        repayList: {
          repayDesire:'',
          repayBility:'',
          userDiathesis:'',
        },
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
    window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.userUuid+
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
      addRootReply(mobile, contactType) {
        this.numMobile=mobile;
        this.addDialogVisibleReply = true
        this.$refs.addForm && this.$refs.addForm.resetFields()
        this.addForm.parentId = '0';
        this.contactType = contactType;
      },
      addRootReplyby(mobile, contactType) {
        this.numMobile=mobile;
        this.addDialogVisibleReplyby = true
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
     // if(!this.companyPhoneShow) {
     //  this.baseMobileListtwo.mobile = '*********';
     // }
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
    "vzlur":this.value3,
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
funcRepay(){
  if (this.addForm.contactMode == 2 && (this.addForm.contactResult == 1 || this.addForm.contactResult == 2)) {
    this.repayflag = true;
    if (this.repayList.repayDesire =='' || this.repayList.repayBility =='' || this.repayList.userDiathesis =='') {
      this.$message("请完成评分");
      return;
    }
  }else{
    this.repayflag = false;
  }
},

aotuCall(mobile,type){
  if (type == 1) {
   this.callflag1 = true;
 } else if (type == 2) {
   this.callflag2 = true;
 } else if (type == 3) {
   this.callflag3 = true;
 } else if (type == 4) {
   this.callflag4 = true;
 } else if (type == 5) {
   this.callflag5 = true;
 }
  // this.callflag = true;
  let _data = Object.assign({
    "callNode":1,
    "callType":type,
    "destnumber":mobile.replace(/-/g,''),
  // "destnumber":'87782407500',
  "extnumber":this.voicePhone,
  // "extnumber": '200401001',
  "sessionId":this.sessionId,
  "uuid":this.userUuid,
  "orderNo":this.uuid,
  "realName":this.baseInfList.realName,
  "userName":this.userName,


});
  this.$http.post("manage/infinity/makeCall", _data).then(response => {
    if (1 == response.body.code && response.body.data) {
      this.$message(response.body.message);
      this.callflag1 = false;
      this.callflag2 = false;
      this.callflag3 = false;
      this.callflag4 = false;
      this.callflag5 = false;
    }else{
      this.$message.error(response.body.message);
      this.callflag1 = false;
      this.callflag2 = false;
      this.callflag3 = false;
      this.callflag4 = false;
      this.callflag5 = false;
    }

  })
},

tijiaoforReply(type){
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
    "type":type,
    "userUuid":this.userUuid,
    "orderNo":this.uuid,
    "contactType": contactType,
    "contactMobile":this.numMobile,
    createUser: DataUtil.id(),
    updateUser: DataUtil.id(),
  },this.addForm,this.repayList);
  this.$http.post("manage/insertManCollectionRemark", _data).then(response => {
    if (1 == response.body.code && response.body.data) {
      this.addDialogVisibleReply = false;
      this.addDialogVisibleReplyby = false;
      this.$message("提交成功");
      this.getBaseMobile();
      this.getBaseMobileone();
      this.getBaseMobiletwo();
      this.getlinkman();
      this.copygetlinkman();
      this.addForm.contactMode='';
      this.addForm.contactResult='';
      this.repayList.repayDesire='';
      this.repayList.repayBility='';
      this.repayList.userDiathesis='';
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
pageInit() {
  this.userName = DataUtil.userName()
  this.employeeNumber = DataUtil.employeeNumber()
        //this.userUuid = DataUtil.uuid()
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
            // this.companyPhoneShow = false;
          this.notdzero = false;
          this.isdzero = true;
        }else{
          // this.companyPhoneShow = true;
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
       dom(){
        this.$refs.divInfo.addEventListener('copy',this.myFunction);

      },
      myFunction(){
        let _data={
          "userUuid": this.userUuid,
          "orderNo":this.uuid,
          "operator":this.id,
          "content":this.baseInfList.mobileNumberDES
        }
        this.$http.post("manage/insertManCtrlcRecord", _data).then(response => {
          if (1 == response.body.code && response.body.data) {
          }

        })
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
          "orderNo": this.uuid,
          "type": type,
          "langue":1
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
           this.tagFormLoading = false;
           this.$message("success");
           setTimeout('window.location.reload()',1500);
         }else{
          this.tagFormLoading = false;
          this.$message("error");
        }

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
                } else if (elem.type == 'comPhone:' && !elem.result) {
                  this.jobInfList.companyPhone = '**********';
                  this.baseMobileListtwo.mobile = '*********';
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
       this.id=DataUtil.id();
       this.getOrderStatus();
       this.getHistoryDetail();
       this.orderSchedule();
       this.getRemarkList();
       this.getSMSDetail();
       this.gettitleList();
       this.getBaseMobile();
       this.getBaseMobileone();
       this.getBaseMobiletwo();
       this.getlinkman();
       this.copygetlinkman();
       this.initDays();
       this.getBack();
       this.voicePhone = DataUtil.voicePhone();
       this.pageInit();
       this.getRemarkList();
       this.dom();
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
#studentsInf td img{
  max-width: 300px;
  max-height: 200px;
}
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
.el-form-item__label {
  padding: 4px 12px 11px 0;
}
</style>
