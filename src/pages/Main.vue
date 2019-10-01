/**
* Created by alan on 17-5-1.
*/
<template>
  <el-row class="container">
    <el-col :span="28" class="header">
      <el-col :span="10" class="logo">
        <img src="../assets/logodoit.png" /><span>Do-It management system</span>
      </el-col>
      <el-col :span="9" class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><img src="../assets/user.png"/> {{userName}} {{employeeNumber}}</span>
          <el-dropdown-menu slot="dropdown" class="menu">
            <el-dropdown-item v-show="false" v-if="changeCn">我的消息</el-dropdown-item>
            <el-dropdown-item @click.native="changePassword" v-if="changeCn">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout" v-if="changeCn">退出登录</el-dropdown-item>
            <el-dropdown-item v-show="false" v-if="changeInn">Informasi terbaru saya</el-dropdown-item>
            <el-dropdown-item @click.native="changePassword" v-if="changeInn">Ganti kata sandi</el-dropdown-item>
            <el-dropdown-item divided @click.native="logoutone" v-if="changeInn">Keluar</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--       <span :span="8" class="changeLanguage"><span> <span id="middle">/</span> <span :class="{clickOn:changeInn}" @click="inn">indonesian</span></span></span> -->
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside>
        <el-menu id="menu" theme="dark" :default-active="$route.path" unique-opened router>
          <!-- 中文版本路由 -->
          <template v-for="(item,index) in menuList " v-if="changeCn">
            <el-submenu v-if="item.children && item.children.length" :index="index+''">
              <template slot="title"><i class="el-icon-menu"></i>{{item.permissionName}}</template>
              <el-menu-item v-for="(node,i) in item.children" :key="node.permissionUrl" :index="node.permissionUrl"><i class="el-icon-document"></i>{{node.permissionName}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.permissionUrl"><!--<span :class="{clickOn:changeCn}" @click="cn">中文</span> --> <i class="el-icon-document"></i>{{item.permissionName}}</el-menu-item>
          </template>
          <!-- 印尼语版本路由 -->
          <template v-for="(item,index) in innMenuList " v-if="changeInn">
            <el-submenu v-if="item.children && item.children.length" :index="index+''">
              <template slot="title"><i class="el-icon-menu"></i>{{item.permissionName}}</template>
              <el-menu-item v-for="(node,i) in item.children" :key="node.permissionUrl" :index="node.permissionUrl">
                <i class="el-icon-document"></i>{{node.permissionName}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.permissionUrl"><i class="el-icon-document"></i>{{item.permissionName}}</el-menu-item>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <strong class="title">{{$route.name}}</strong>
          <el-breadcrumb separator="/" class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.name">
              {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
          <transition>
            <router-view></router-view>
          </transition>
        </el-col>
      </section>
      <ml-change-password ref="changePassword" changeType="2" :uuid="userUuid"></ml-change-password>
      <ml-message></ml-message>
    </el-col>
  </el-row>
</template>
<script>
import DataUtil from '../common/dataUtil'
// import mlChangePassword from '../components/_changePassword.vue'
import mlChangePassword from '../components/_changePasswordInn.vue'
import mlMessage from '../components/Message.vue'
export default {
  data() {
    return {
      userName: '',
      employeeNumber: '',
      menuList: [],
      menuListByInn: [],
      changeCn: false,
      changeInn: true,
      innMenuList:[],
      userUuid:DataUtil.uuid(),
      menuListCn: [{
        permissionName:'系统管理',
        permissionUrl:'/',
        children:[{
          permissionName:'APP版本管理',
          permissionUrl:'/AppVersion',
        },{
          permissionName:'权限列表',
          permissionUrl:'/Permission',
        },{
          permissionName:'角色管理',
          permissionUrl:'/Role',
        },{
          permissionName:'用户管理',
          permissionUrl:'/Manager',
        },{
          permissionName:'字典管理',
          permissionUrl:'/DictionaryManage',
        },{
          permissionName:'手机号码解密',
          permissionUrl:'/CheakMobileNoWithDecryption',
        },{
          permissionName:'获取验证码',
          permissionUrl:'/GetCodelist',
        },{
          permissionName:'订单归档',
          permissionUrl:'/SaveMongoData',
        }]
      },{
        permissionName:'订单管理',
        permissionUrl:'/',
        children:[{
          permissionName:'全部订单查询',
          permissionUrl:'/FullOrderEnquiry',
        },{
          permissionName:'D0订单查询',
          permissionUrl:'/D0Details',
        },{
          permissionName:'逾期订单查询',
          permissionUrl:'/OverdueOrderDetails',
        },{
          permissionName:'已还款订单查询',
          permissionUrl:'/RepaymentOrder',
        },{
          permissionName:'打款失败列表',
          permissionUrl:'/CallFailureOrder',
        }]
      },{
        permissionName:'审核管理',
        permissionUrl:'/',
        children:[{
          permissionName:'审核列表—初审',
          permissionUrl:'/RiviewTheListFirst',
        },{
          permissionName:'审核列表—复审',
          permissionUrl:'/RiviewTheListSecond',
        },{
          permissionName:'审核人员管理',
          permissionUrl:'/AuditPersonnelmanage',
        },{
          permissionName:'订单分配列表',
          permissionUrl:'/OrderDistributionList',
        },{
          permissionName:'全部完成订单',
          permissionUrl:'/ComplateOrderStatistics',
        },{
          permissionName:'订单管理',
          permissionUrl:'/Complatemanager',
        }]
      },{
        permissionName:'自动审核管理',
        permissionUrl:'/',
        children:[{
          permissionName:'自动审核管理-新户',
          permissionUrl:'/AutomaticAudit-new',
        }]
      },{
        permissionName:'运营管理',
        permissionUrl:'/',
        children:[{
          permissionName:'修改手机号',
          permissionUrl:'/EditUserName',
        },{
          permissionName:'线下还款',
          permissionUrl:'/TheLineOfRepayment',
        },{
          permissionName:'批量发送短信',
          permissionUrl:'/SendSmsBatch',
        }]
      },{
        permissionName:'催收管理',
        permissionUrl:'/',
        children:[{
          permissionName:'逾期订单(内)',
          permissionUrl:'/BackOrder',
        },{
          permissionName:'已还款订单-内',
          permissionUrl:'/HasTheRepaymentOrder',
        },{
          permissionName:'已还款订单(管理员)',
          permissionUrl:'/AdminHasTheRepaymentOrder',
        },{
          permissionName:'D0订单分配',
          permissionUrl:'/D0OrderAllocation',
        },{
          permissionName:'逾期订单分配',
          permissionUrl:'/OverdueOrderDistribution',
        },{
          permissionName:'分配人员管理',
          permissionUrl:'/ThePersonnelManagement',
        },{
          permissionName:'短信数据统计-管理者',
          permissionUrl:'/SmsMessageSystem',
        },{
          permissionName:'一键发送短信设置-管理者',
          permissionUrl:'/ShortNoteAdmin',
        },{
          permissionName:'委外催收',
          permissionUrl:'/SubConTract',
        },{
          permissionName:'短信发送管理',
          permissionUrl:'/CollectionSmsManagement',
        }]
      },{
        permissionName:'质检管理',
        permissionUrl:'/',
        children:[{
          permissionName:'全部订单查询',
          permissionUrl:'/FullOrderEnquiry',
        },{
          permissionName:'D0订单查询',
          permissionUrl:'/D0Details',
        },{
          permissionName:'逾期订单查询',
          permissionUrl:'/OverdueOrderDetails',
        },{
          permissionName:'已还款订单查询',
          permissionUrl:'/RepaymentOrder',
        },{
          permissionName:'打款失败列表',
          permissionUrl:'/CallFailureOrder',
        }]
      },],
      menuListInn: [{
        permissionName:'Manajemen sistem',
        permissionUrl:'/',
        children:[{
          permissionName:'APP Manajemen aplikasi',
          permissionUrl:'/AppVersionInn',
        },{
          permissionName:'Manajemen batas akses',
          permissionUrl:'/PermissionInn',
        },{
          permissionName:'Manajemen peran',
          permissionUrl:'/RoleInn',
        },{
          permissionName:'Manajemen akun pengguna',
          permissionUrl:'/ManagerInn',
        },{
          permissionName:'Manajemen kata/kamus',
          permissionUrl:'/DictionaryManageInn',
        },{
          permissionName:'Pengelolaan Kode Verifikasi',
          permissionUrl:'/GetCodelistInn',
        },{
          permissionName:'arsipkan berdasarkan nomer order',
          permissionUrl:'/SaveMongoDataInn',
        },{
          permissionName:'manajemen struktur pemimpin dan anggota kelompok',
          permissionUrl:'/personManageInn',
        }]
      },{
        permissionName:'Manajemen permohonan',
        permissionUrl:'/',
        children:[{
          permissionName:'Semua permohonan',
          permissionUrl:'/FullOrderEnquiryInn',
        },{
          permissionName:'Pencarian permohonan hari H',
          permissionUrl:'/D0DetailsInn',
        },{
          permissionName:'Pencarian keterlambatan pelunasan',
          permissionUrl:'/OverdueOrderDetailsInn',
        },{
          permissionName:'Pencarian pinjaman yg sudah lunas',
          permissionUrl:'/RepaymentOrderInn',
        },{
          permissionName:'Pencarian pencairan gagal',
          permissionUrl:'/CallFailureOrderInn',
        }]
      },{
        permissionName:'Modul kualitas cek',
        permissionUrl:'/',
        children:[{
          permissionName: 'Alokasi Permohonan',
          permissionUrl: '/qualityListInsInn',
        },{
          permissionName:'Manajemen kualitas cek',
          permissionUrl:'/qualityPersonSystemInn',
        },{
          permissionName:'Pengaturan Jenis Kualitas Cek',
          permissionUrl:'/typeAllocationInn',
        },{
          permissionName:'Daftar Kualitas Cek',
          permissionUrl:'/qualityListOrderInn',
        },{
          permissionName:'Catatan QC rekaman',
          permissionUrl:'/voiceTypeAtionInn',
        },{
          permissionName:'Daftar QC Rekaman',
          permissionUrl:'/qualityVoiceListInn',
        }]
      },{
        permissionName:'Manajemen verifikasi',
        permissionUrl:'/',
        children:[{
          permissionName:'manual pertama',
          permissionUrl:'/RiviewTheListFirstInn',
        },{
          permissionName:'manual akhir',
          permissionUrl:'/RiviewTheListSecondInn',
        },{
          permissionName:'Manajemen petugas verivikasi',
          permissionUrl:'/AuditPersonnelmanageInn',
        },{
          permissionName:'Daftar alokasi permohonan',
          permissionUrl:'/OrderDistributionListInn',
        },{
          permissionName:'Semua permohonan',
          permissionUrl:'/ComplateOrderStatisticsInn',
        },{
          permissionName:'Manajemen semua permohonan',
          permissionUrl:'/ComplatemanagerInn',
        }]
      },{
        permissionName:'Manajemen penagihan',
        permissionUrl:'/',
        children:[{
          permissionName:'permohonan terlambat',
          permissionUrl:'/BackOrderInn',
        },{
          permissionName:'Permohonan sudah lunas',
          permissionUrl:'/HasTheRepaymentOrderInn',
        },{
          permissionName:'Permohonan sudah lunas-admin',
          permissionUrl:'/AdminHasTheRepaymentOrderInn',
        },{
          permissionName:'Alokasi permohonan(D0)',
          permissionUrl:'/D0OrderAllocationInn',
        },{
          permissionName:'Alokasi permohonan terlambat',
          permissionUrl:'/OverdueOrderDistributionInn',
        },{
          permissionName:'Petugas alokas',
          permissionUrl:'/ThePersonnelManagementInn',
        },{
          permissionName:'statistik Data SMS',
          permissionUrl:'/SmsMessageSystemInn',
        },{
          permissionName:'Pengaturan pengiriman SMS ',
          permissionUrl:'/ShortNoteAdminInn',
        },{
          permissionName:'Alokasi permohonan terlambat',
          permissionUrl:'/SubConTractInn',
        },{
          permissionName:'Komplain terhadap Kolektor',
          permissionUrl:'/complaintPersonListInn',
        },{
          permissionName: 'Pengaturan Telpon Pengguna',
          permissionUrl: '/contactManageInn',
        },{
          permissionName: 'Manajemen blacklist penagihan',
          permissionUrl: '/TamBahkanInn',
        },{
          permissionName: 'Manajemen informasi jadwal',
          permissionUrl: '/workforceManagementInn',
        }]
      },{
        permissionName:'Manajemen operator',
        permissionUrl:'/',
        children:[{
          permissionName:'updateUserName',
          permissionUrl:'/EditUserNameInn',
        },{
          permissionName:'Daftar masukan pengguna',
          permissionUrl:'/UserFeedBackInn',
        },{
          permissionName:'Offline pembayaran',
          permissionUrl:'/TheLineOfRepaymentInn',
        },{
          permissionName: 'Pengaturan Kupon Tersedia',
          permissionUrl: '/couponIssuanceInn',
        },{
          permissionName: 'Kupon statistik',
          permissionUrl: '/CouponStatisticsInn',
        },{
          permissionName:'Batalkan Permohonan',
          permissionUrl:'/cancleOrderInn',
        }]
      },{
        permissionName:'Manajemen keuangan',
        permissionUrl:'/',
        children:[{
          permissionName:'Manajemen Peminjaman Dana',
          permissionUrl:'/fundsManagementInn',
        }]
      },]
    }
  },
  methods: {
    getInnMenuList() {//debugger;
      for (var i = 0; i < this.menuListInn.length; i++) {
        var flag = false;
        var menuItem ={
          permissionName:this.menuListInn[i].permissionName,
          permissionUrl:this.menuListInn[i].permissionUrl,
          children:[]
        }
        for(var index = 0 ; index < this.menuListByInn.length; index++) {
          for (var j = 0; j < this.menuListByInn[index].children.length; j++) {
            for (var localChild = 0; localChild < this.menuListInn[i].children.length; localChild++){
              var child = this.menuListInn[i].children[localChild];
              if (child.permissionUrl == this.menuListByInn[index].children[j].permissionUrl) {
                // if (index == 7) {
                //   debugger;
                // }
                menuItem.children.push(child);
                flag = true;
              }
            }
          }
        }
        if (flag){
          this.innMenuList.push(menuItem);
        }
      }

    },
    changePassword() {
      this.$refs.changePassword.show()
    },
    //退出登录
    logout() {
      this.$confirm('确认退出登录吗?', '提示', {}).then(() => {
        this.$http.post('manage/sysLoginOut');
        DataUtil.sid('')
        this.$router.push('/login')
      }).catch(() => {

      });
    },
    logoutone() {
      this.$confirm('Apakah Anda yakin keluar dari akun?', 'Pemberitahuan', {}).then(() => {
        this.$http.post('manage/sysLoginOut');
        DataUtil.sid('')
        this.$router.push('/login')
      }).catch(() => {

      });
    },
    updateurl(){
      let upUrl=window.location.href;
      if(upUrl.indexOf('Inn')==-1){
        this.changeCn=true,
        this.changeInn= false
      }else{
        this.changeCn=false,
        this.changeInn= true
      }
    },
    pageInit() {
      this.userName = DataUtil.userName()
      this.employeeNumber = DataUtil.employeeNumber()
      //this.userUuid = DataUtil.uuid()
    },
    getMenuListInn() {
      var postData = {
        id: DataUtil.id()
      }
      this.$http.post('manage/permissionTreeInnByUserId', postData).then(response => {
        let {
          status,
          body
        } = response;
        this.menuListByInn = body.data;
        this.getInnMenuList();
        DataUtil.savePermission(body.data);     /*将权限列表存入localStorage*/
      })
    },
    getMenuList() {
      var postData = {
        id: DataUtil.id()
      }
      this.$http.post('manage/permissionTreeByUserId', postData).then(response => {
        let {
          status,
          body
        } = response;
        this.menuList = body.data;
        DataUtil.savePermission(body.data);     /*将权限列表存入localStorage*/
      })
    },
    cn(){
      this.changeCn=true;
      this.changeInn=false;
      let urlCheck=window.location.hash;
      if(urlCheck.indexOf('?')!==-1){
        console.log(urlCheck.substring(urlCheck.indexOf('?')-3,urlCheck.indexOf('?')))
        if(urlCheck.substring(urlCheck.indexOf('?')-3,urlCheck.indexOf('?'))=="Inn"){
          urlCheck=urlCheck.replace("Inn","");
          window.location.href=urlCheck;
        }else{
          window.location.href=window.location.hash;
        }

      }else{
        if(urlCheck.slice(-3)=="Inn"){
          urlCheck=urlCheck.substring(0,urlCheck.length-3)
          window.location.href=urlCheck;
        }else{
          window.location.href=window.location.hash;
        }
      }
    },
    inn(){
      this.changeCn=false;
      this.changeInn=true;
      let urlCheck=window.location.hash;
      if(urlCheck.indexOf('?')!==-1){
        console.log(urlCheck.substring(urlCheck.indexOf('?')-3,urlCheck.indexOf('?')))
        if(urlCheck.substring(urlCheck.indexOf('?')-3,urlCheck.indexOf('?'))=="Inn"){
          window.location.href=window.location.hash;
        }else{
          urlCheck=urlCheck.replace("?","Inn?");
          console.log(urlCheck)
          window.location.href=urlCheck;

        }
      }else{
        console.log("b")
        if(urlCheck.slice(-3)=="Inn"){
          window.location.href=window.location.hash;
        }else{
          window.location.href=window.location.hash+"Inn";
        }
      }


      // let urlCheck=window.location.hash;
      // if(urlCheck.slice(-3)=="Inn"){
      //   window.location.href=window.location.hash;
      // }else{
      //   window.location.href=window.location.hash+"Inn";
      // }
      }
    },
  mounted() {
    this.pageInit();
    this.getMenuList();
    this.getMenuListInn();
    console.info(this.innMenuList);
    this.updateurl();
  },
    components: {
      mlChangePassword,
      mlMessage
    }
}

  </script>
  <style scoped>
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .header {  
    height: 60px;
    line-height: 60px;
    background: #1F2D3D;
    color: #c0ccda;
  }
  .main aside[data-v-089787dd] {
    width: 320px !important;
  }
  .content-container[data-v-089787dd] {
    left: 330px !important;
  }
  .logo {
    font-size: 15px;
  }

  .logo img {
    width: 40px;
    float: left;
    margin: 10px 10px 10px 18px;
  }

  .userinfo {
    width: 480px;
    float: right;
    text-align: right;
    padding-right: 35px;
  }

  .userinfo-inner {
    color: #c0ccda;
    cursor: pointer;
  }

  .userinfo-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px;
    float: right;
  }

  .main {
    background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
  }

  .main aside {
    width: 200px;
    overflow-y: auto;
    overflow: auto;
    height: 100%;
  }

  .main ul {
    margin-bottom: 50px;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .content-container {
    background: #f1f2f7;
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
    left: 200px;
    overflow-y: scroll;
    padding: 20px;
  }

  .breadcrumb-container {
    margin-bottom: 15px;
  }

  .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .breadcrumb-inner {
    float: right;
  }

  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
  .languageChange {
    float: right;
    width: 80px;
    height: 40px;
  }
  .languageChange a:hover {
    color: orange;
  }
  .changeLanguage{
    color: #656e73;
    float: right;
  }
  #middle{
    height: 60px;
    line-height: 60px;
    display: inline-block;
    margin: 0 5px;
  }
  .clickOn {
    color: white;
  }
/*  .menu {
    width: 300px;
    }*/
    </style>
