import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'

const routes = [{
  path: '/login',
  component: Login
}, {
  name: 'management system',
  path: '/',
  redirect: '/homeInn',
  component: Main,
  children: [{
    name: 'HomeCN',//'首页',
    path: '/home',
    component: resolve => require(['../pages/Home.vue'], resolve),
  }, {
    name: 'Home',
    path: '/homeInn',
    component: resolve => require(['../pages/HomeInn.vue'], resolve),
  }, {
    name: 'APP版本管理',
    path: '/AppVersion',
    component: resolve => require(['../pages/system/AppVersion.vue'], resolve)
  }, {
    name: 'APP Manajemen aplikasi',
    path: '/AppVersionInn',
    component: resolve => require(['../pages/system/AppVersionInn.vue'], resolve)
  }, {
    name: '权限列表',
    path: '/Permission',
    component: resolve => require(['../pages/system/Permission.vue'], resolve)
  }, {
    name: 'Manajemen batas akses',
    path: '/PermissionInn',
    component: resolve => require(['../pages/system/PermissionInn.vue'], resolve)
  },
    {
      name: '订单详情-初审',
      path: '/orderPreliminaryReview',
      component: resolve => require(['../pages/order/orderPreliminaryReview.vue'], resolve)
    }, {
      name: 'Detail Permohonan - manual pertama',
      path: '/orderPreliminaryReviewInn',
      component: resolve => require(['../pages/order/orderPreliminaryReviewInn.vue'], resolve)
    }, {
      name: '订单详情-复审',
      path: '/orderSecondReview',
      component: resolve => require(['../pages/order/orderSecondReview.vue'], resolve)
    }, {
      name: 'Detail Permohonan - manual akhir',
      path: '/orderSecondReviewInn',
      component: resolve => require(['../pages/order/orderSecondReviewInn.vue'], resolve)
    }, {
      name: '订单详情',
      path: '/completeOrderDetail',
      component: resolve => require(['../pages/order/completeOrderDetail.vue'], resolve)
    }, {
      name: 'Detail Permohonan',
      path: '/completeOrderDetailInn',
      component: resolve => require(['../pages/order/completeOrderDetailInn.vue'], resolve)
    },
    {
      name: '角色管理',
      path: '/Role',
      component: resolve => require(['../pages/system/Role.vue'], resolve)
    }, {
      name: '字典管理',
      path: '/DictionaryManage',
      component: resolve => require(['../pages/system/DictionaryManage.vue'], resolve)
    }, {
      name: 'Manajemen kata/kamus',
      path: '/DictionaryManageInn',
      component: resolve => require(['../pages/system/DictionaryManageInn.vue'], resolve)
    }, {
      name: '用户管理',
      path: 'Manager',
      component: resolve => require(['../pages/system/Manager.vue'], resolve)
    }, {
      name: 'Manajemen peran',
      path: '/RoleInn',
      component: resolve => require(['../pages/system/RoleInn.vue'], resolve)
    }, {
      name: 'Manajemen akun pengguna',
      path: '/ManagerInn',
      component: resolve => require(['../pages/system/ManagerInn.vue'], resolve)
    }, {
      name: '初审列表',
      path: '/RiviewTheListFirst',
      component: resolve => require(['../pages/order/RiviewTheListxiao.vue'], resolve),
    }, {
      name: 'Daftar verifikasi permohonan - manual pertama',
      path: '/RiviewTheListFirstInn',
      component: resolve => require(['../pages/order/RiviewTheListxiaoInn.vue'], resolve),
    }, {
      name: '复审列表',
      path: '/RiviewTheListSecond',
      component: resolve => require(['../pages/order/RiviewTheListwei.vue'], resolve),
    }, {
      name: 'Daftar verifikasi permohonan - manual akhir',
      path: '/RiviewTheListSecondInn',
      component: resolve => require(['../pages/order/RiviewTheListweiInn.vue'], resolve),
    }, {
      name: '审核人员管理',
      path: '/AuditPersonnelmanage',
      component: resolve => require(['../pages/order/AuditPersonnelmanage.vue'], resolve),
    }, {
      name: 'Manajemen petugas verifikasi',
      path: '/AuditPersonnelmanageInn',
      component: resolve => require(['../pages/order/AuditPersonnelmanageInn.vue'], resolve),
    }, {
      name: '订单分配列表',
      path: '/OrderDistributionList',
      component: resolve => require(['../pages/order/OrderDistributionList.vue'], resolve),
    }, {
      name: 'Daftar alokasi permohonan',
      path: '/OrderDistributionListInn',
      component: resolve => require(['../pages/order/OrderDistributionListInn.vue'], resolve),
    }, {
      name: '订单分配列表详情',
      path: '/OrderListDetails',
      component: resolve => require(['../pages/order/OrderListDetails.vue'], resolve),
    }, {
      name: 'Daftar alokasi permohonan-details',
      path: '/OrderListDetailsInn',
      component: resolve => require(['../pages/order/OrderListDetailsInn.vue'], resolve),
    }, {
      name: '全部完成订单',
      path: '/ComplateOrderStatistics',
      component: resolve => require(['../pages/order/ComplateOrderStatistics.vue'], resolve),
    }, {
      name: 'Semua permohonan',
      path: '/ComplateOrderStatisticsInn',
      component: resolve => require(['../pages/order/ComplateOrderStatisticsInn.vue'], resolve),
    }, {
      name: '全部订单查询',
      path: '/FullOrderEnquiry',
      component: resolve => require(['../pages/management/FullOrderEnquiry.vue'], resolve),
    }, {
      name: 'Semua permohonan',
      path: '/FullOrderEnquiryInn',
      component: resolve => require(['../pages/management/FullOrderEnquiryInn.vue'], resolve),
    }, {
      name: '全部订单详情',
      path: '/OrderDetails',
      component: resolve => require(['../pages/management/OrderDetails.vue'], resolve),
    }, {
      name: 'Detail permohonan',
      path: '/OrderDetailsInn',
      component: resolve => require(['../pages/management/OrderDetailsInn.vue'], resolve),
    }, {
      name: 'D0订单查询',
      path: '/D0Details',
      component: resolve => require(['../pages/management/D0Details.vue'], resolve),
    }, {
      name: 'Pencarian permohonan hari H',
      path: '/D0DetailsInn',
      component: resolve => require(['../pages/management/D0DetailsInn.vue'], resolve),
    }, {
      name: '逾期订单查询',
      path: '/OverdueOrderDetails',
      component: resolve => require(['../pages/management/OverdueOrderDetails.vue'], resolve),
    }, {
      name: 'Pencarian keterlambatan pelunasan',
      path: '/OverdueOrderDetailsInn',
      component: resolve => require(['../pages/management/OverdueOrderDetailsInn.vue'], resolve),
    }, {
      name: '已还款订单查询',
      path: '/RepaymentOrder',
      component: resolve => require(['../pages/management/RepaymentOrder.vue'], resolve),
    }, {
      name: 'Pencarian pinjaman yg sudah lunas',
      path: '/RepaymentOrderInn',
      component: resolve => require(['../pages/management/RepaymentOrderInn.vue'], resolve),
    }, {
      name: '打款失败列表',
      path: '/CallFailureOrder',
      component: resolve => require(['../pages/management/CallFailureOrder.vue'], resolve),
    }, {
      name: 'Pencarian pencairan gagal',
      path: '/CallFailureOrderInn',
      component: resolve => require(['../pages/management/CallFailureOrderInn.vue'], resolve),
    }, {
      name: '自动审核配置-新户',
      path: '/AutomaticAudit-new',
      component: resolve => require(['../pages/automaticaudit/AutomaticAudit-new.vue'], resolve),
    }, {
      name: 'Audit Otomatis - Akun baru',
      path: '/AutomaticAudit-newInn',
      component: resolve => require(['../pages/automaticaudit/AutomaticAudit-newInn.vue'], resolve),
    }, {
      name: '逾期订单（内）',
      path: '/BackOrder',
      component: resolve => require(['../pages/collectionManagement/BackOrder.vue'], resolve),
    }, {
      name: 'Permohonan terlambat',
      path: '/BackOrderInn',
      component: resolve => require(['../pages/collectionManagement/BackOrderInn.vue'], resolve),
    }, {
      name: '已还款订单-内',
      path: '/HasTheRepaymentOrder',
      component: resolve => require(['../pages/collectionManagement/HasTheRepaymentOrder.vue'], resolve),
    }, {
      name: 'Permohonan sudah lunas',
      path: '/HasTheRepaymentOrderInn',
      component: resolve => require(['../pages/collectionManagement/HasTheRepaymentOrderInn.vue'], resolve),
    }, {
      name: '已还款订单-管理员',
      path: '/AdminHasTheRepaymentOrder',
      component: resolve => require(['../pages/collectionManagement/AdminHasTheRepaymentOrder.vue'], resolve),
    }, {
      name: 'Permohonan sudah lunas-admin',
      path: '/AdminHasTheRepaymentOrderInn',
      component: resolve => require(['../pages/collectionManagement/AdminHasTheRepaymentOrderInn.vue'], resolve),
    }, {
      name: 'D0订单分配',
      path: '/D0OrderAllocation',
      component: resolve => require(['../pages/collectionManagement/D0OrderAllocation.vue'], resolve),
    }, {
      name: 'D0Alokasi permohonan',
      path: '/D0OrderAllocationInn',
      component: resolve => require(['../pages/collectionManagement/D0OrderAllocationInn.vue'], resolve),
    }, {
      name: '逾期订单分配',
      path: '/OverdueOrderDistribution',
      component: resolve => require(['../pages/collectionManagement/OverdueOrderDistribution.vue'], resolve),
    }, {
      name: 'Alokasi permohonan terlambat',
      path: '/OverdueOrderDistributionInn',
      component: resolve => require(['../pages/collectionManagement/OverdueOrderDistributionInn.vue'], resolve),
    }, {
      name: '分配人员管理',
      path: '/ThePersonnelManagement',
      component: resolve => require(['../pages/collectionManagement/ThePersonnelManagement.vue'], resolve),
    }, {
      name: 'Petugas alokasi',
      path: '/ThePersonnelManagementInn',
      component: resolve => require(['../pages/collectionManagement/ThePersonnelManagementInn.vue'], resolve),
    }, {
      name: '全部订单管理',
      path: '/Complatemanager',
      component: resolve => require(['../pages/order/Complatemanager.vue'], resolve),
    }, {
      name: 'Manajemen semua permohonan',
      path: '/ComplatemanagerInn',
      component: resolve => require(['../pages/order/ComplatemanagerInn.vue'], resolve),
    }, {
      name: '手机号码解密',
      path: '/CheakMobileNoWithDecryption',
      component: resolve => require(['../pages/system/CheakMobileNoWithDecryption.vue'], resolve),
    }, {
      name: '催收订单详情',
      path: '/CollectionOrderDetails',
      component: resolve => require(['../pages/collectionManagement/CollectionOrderDetails.vue'], resolve),
    }, {
      name: 'Penagihan permohonan',
      path: '/CollectionOrderDetailsInn',
      component: resolve => require(['../pages/collectionManagement/CollectionOrderDetailsInn.vue'], resolve),
    }, {
      name: '运营管理',
      path: '/UserFeedBack',
      component: resolve => require(['../pages/operate/UserFeedBack.vue'], resolve),
    }, {
      name: 'Daftar masukan pengguna',
      path: '/UserFeedBackInn',
      component: resolve => require(['../pages/operate/UserFeedBackInn.vue'], resolve),
    }, {
      name: '修改手机号',
      path: '/EditUserName',
      component: resolve => require(['../pages/operate/EditUserName.vue'], resolve),
    }, {
      name: '批量发送短信',
      path: '/SendSmsBatch',
      component: resolve => require(['../pages/operate/SendSmsBatch.vue'], resolve),
    }, {
      name: 'Ubah nama user',
      path: '/EditUserNameInn',
      component: resolve => require(['../pages/operate/EditUserNameInn.vue'], resolve),
    }, {
      name: '线下还款',
      path: '/TheLineOfRepayment',
      component: resolve => require(['../pages/operate/TheLineOfRepayment.vue'], resolve),
    }, {
      name: 'Offline pembayaran',
      path: '/TheLineOfRepaymentInn',
      component: resolve => require(['../pages/operate/TheLineOfRepaymentInn.vue'], resolve),
    }, {
      name: '委外催收分配',
      path: '/SubConTract',
      component: resolve => require(['../pages/collectionManagement/SubConTract.vue'], resolve),
    }, {
      name: 'Alokasi kolektor',
      path: '/SubConTractInn',
      component: resolve => require(['../pages/collectionManagement/SubConTractInn.vue'], resolve),
    }, {
      name: '获取验证码',
      path: '/GetCodelist',
      component: resolve => require(['../pages/system/GetCode.vue'], resolve),
    }, {
      name: '订单归档',
      path: '/SaveMongoData',
      component: resolve => require(['../pages/system/SaveMongoData.vue'], resolve),
    }, {
      name: 'arsipkan berdasarkan nomer order',
      path: '/SaveMongoDataInn',
      component: resolve => require(['../pages/system/SaveMongoDataInn.vue'], resolve),
    }, {
      name: 'Mendapatkan Kode Verifikasi',
      path: '/GetCodelistInn',
      component: resolve => require(['../pages/system/GetCodeInn.vue'], resolve),
    }, {
      name: '短信数据统计-管理者',
      path: '/SmsMessageSystem',
      component: resolve => require(['../pages/collectionManagement/SmsMessageSystem.vue'], resolve),
    }, {
      name: 'statistik Data SMS-admin',
      path: '/SmsMessageSystemInn',
      component: resolve => require(['../pages/collectionManagement/SmsMessageSystemInn.vue'], resolve),
    }, {
      name: '一键发送短信管理',
      path: '/ShortNoteAdmin',
      component: resolve => require(['../pages/collectionManagement/ShortNoteAdmin.vue'], resolve),
    }, {
      name: 'Pengaturan pengiriman SMS ',
      path: '/ShortNoteAdminInn',
      component: resolve => require(['../pages/collectionManagement/ShortNoteAdminInn.vue'], resolve),
    }, {
      name: '短信发送管理',
      path: '/CollectionSmsManagement',
      component: resolve => require(['../pages/collectionManagement/CollectionSmsManagement.vue'], resolve),
    }, {
      name: '用户黑名单',
      path: '/userNull',
      component: resolve => require(['../pages/system/userNull.vue'], resolve),
    }, {
      name: ' Lokasi pengguna tidak valid',
      path: '/userNullInn',
      component: resolve => require(['../pages/system/userNullInn.vue'], resolve),
    }, {
      name: 'goPay',
      path: '/goPay',
      component: resolve => require(['../pages/operate/goPay.vue'], resolve),
    }, {
      name: 'goPayInn',
      path: '/goPayInn',
      component: resolve => require(['../pages/operate/goPayInn.vue'], resolve),
    }, {
      name: '邀请好友',
      path: '/invitationfr',
      component: resolve => require(['../pages/operate/invitationfr.vue'], resolve),
    }, {
      name: '联系人管理',
      path: '/contactManage',
      component: resolve => require(['../pages/collectionManagement/contactManagement.vue'], resolve),
    }, {
      name: 'Pengaturan Telpon Pengguna',
      path: '/contactManageInn',
      component: resolve => require(['../pages/collectionManagement/contactManagementInn.vue'], resolve),
    }, {
      name: '还款查询',
      path: '/refundQuery',
      component: resolve => require(['../pages/operate/refundQuery.vue'], resolve),
    }, {
      name: '取消订单',
      path: '/cancleOrder',
      component: resolve => require(['../pages/operate/cancleOrder.vue'], resolve),
    }, {
      name: 'Batalkan Order',
      path: '/cancleOrderInn',
      component: resolve => require(['../pages/operate/cancleOrderInn.vue'], resolve),
    }, {
      name: '催收黑名单管理',
      path: '/TamBahkan',
      component: resolve => require(['../pages/collectionManagement/TamBahkan.vue'], resolve),
    }, {
      name: 'Manajemen blacklist penagihan',
      path: '/TamBahkanInn',
      component: resolve => require(['../pages/collectionManagement/TamBahkanInn.vue'], resolve),
    }, {
      name: '外呼数据统计',
      path: '/whDataStatistics',
      component: resolve => require(['../pages/operate/whDataStatistics.vue'], resolve),
    }, {
      name: '批次详情',
      path: '/dataStatisDetails',
      component: resolve => require(['../pages/operate/dataStatisDetails.vue'], resolve),
    }, {
      name: '加入风控黑名单',
      path: '/BlackListManagement',
      component: resolve => require(['../pages/system/BlackListManagement.vue'], resolve),
    }, {
      name: '放款资金管理',
      path: '/fundsManagement',
      component: resolve => require(['../pages/system/fundsManagement.vue'], resolve),
    }, {
      name: 'Manajemen Peminjaman Dana',
      path: '/fundsManagementInn',
      component: resolve => require(['../pages/system/fundsManagementInn.vue'], resolve),
    }, {
      name: '组长组员架构管理',
      path: '/personManage',
      component: resolve => require(['../pages/collectionManagement/personManage.vue'], resolve),
    }, {
      name: 'Manajemen struktur pemimpin dan anggota kelompok',
      path: '/personManageInn',
      component: resolve => require(['../pages/collectionManagement/personManageInn.vue'], resolve),
    }, {
      name: '催收投诉列表',
      path: '/complaintPersonList',
      component: resolve => require(['../pages/collectionManagement/complaintPersonList.vue'], resolve),
    }, {
      name: '排班信息管理',
      path: '/workforceManagement',
      component: resolve => require(['../pages/collectionManagement/workforceManagement.vue'], resolve),
    }, {
      name: 'Manajemen informasi jadwal',
      path: '/workforceManagementInn',
      component: resolve => require(['../pages/collectionManagement/workforceManagementInn.vue'], resolve),
    }, {
      name: 'Manajemen T90',
      path: '/t90Inn',
      component: resolve => require(['../pages/collectionManagement/t90Inn.vue'], resolve),
    }, {
      name: 'Manajemen Email dan PIN',
      path: '/emailPINInn',
      component: resolve => require(['../pages/collectionManagement/emailPINInn.vue'], resolve),
    }, {
      name: 'Informasi Pembayaran',
      path: '/CollectionOrderDetailsByIdInn',
      component: resolve => require(['../pages/collectionManagement/CollectionOrderDetailsByIdInn.vue'], resolve),
    }, {
      name: 'Informasi Pembayaran Admin',
      path: '/CollectionOrderDetailsByIdAdminInn',
      component: resolve => require(['../pages/collectionManagement/CollectionOrderDetailsByIdAdminInn.vue'], resolve),
    }, {
      name: 'Komplain terhadap Kolektor',
      path: '/complaintPersonListInn',
      component: resolve => require(['../pages/collectionManagement/complaintPersonListInn.vue'], resolve),
    }, {
      name: '质检列表分配',
      path: '/qualityListIns',
      component: resolve => require(['../pages/quality/qualityListIns.vue'], resolve),
    }, {
      name: 'Alokasi Permohonan',
      path: '/qualityListInsInn',
      component: resolve => require(['../pages/quality/qualityListInsInn.vue'], resolve),
    }, {
      name: '质检管理',
      path: '/qualityPersonSystem',
      component: resolve => require(['../pages/quality/qualityPersonSystem.vue'], resolve),
    }, {
      name: 'Manajemen kualitas cek',
      path: '/qualityPersonSystemInn',
      component: resolve => require(['../pages/quality/qualityPersonSystemInn.vue'], resolve),
    }, {
      name: '备注质检类型配置',
      path: '/typeAllocation',
      component: resolve => require(['../pages/quality/typeAllocation.vue'], resolve),
    }, {
      name: 'Pengaturan Jenis Kualitas Cek',
      path: '/typeAllocationInn',
      component: resolve => require(['../pages/quality/typeAllocationInn.vue'], resolve),
    }, {
      name: '语音备注质检配置',
      path: '/voiceTypeAtion',
      component: resolve => require(['../pages/quality/voiceTypeAtion.vue'], resolve),
    }, {
      name: 'Catatan QC rekaman',
      path: '/voiceTypeAtionInn',
      component: resolve => require(['../pages/quality/voiceTypeAtionInn.vue'], resolve),
    }, {
      name: '质检列表',
      path: '/qualityListOrder',
      component: resolve => require(['../pages/quality/qualityListOrder.vue'], resolve),
    }, {
      name: 'Daftar Kualitas Cek',
      path: '/qualityListOrderInn',
      component: resolve => require(['../pages/quality/qualityListOrderInn.vue'], resolve),
    }, {
      name: '质检详情',
      path: '/qualityDetails',
      component: resolve => require(['../pages/quality/qualityDetails.vue'], resolve),
    }, {
      name: 'Kualitas cek',
      path: '/qualityDetailsInn',
      component: resolve => require(['../pages/quality/qualityDetailsInn.vue'], resolve),
    }, {
      name: '质检语音列表',
      path: '/qualityVoiceList',
      component: resolve => require(['../pages/quality/qualityVoiceList.vue'], resolve),
    }, {
      name: 'Daftar QC Rekaman',
      path: '/qualityVoiceListInn',
      component: resolve => require(['../pages/quality/qualityVoiceListInn.vue'], resolve),
    }, {
      name: 'waUserback',
      path: '/wauserawserInn',
      component: resolve => require(['../pages/operate/wauserawserInn.vue'], resolve),
    }, {
      name: 'WA用户回复',
      path: '/wauserawser',
      component: resolve => require(['../pages/operate/wauserawser.vue'], resolve),
    }, {
      name: '查询账户余额',
      path: '/inquireBalance',
      component: resolve => require(['../pages/system/inquireBalance.vue'], resolve),
    }, {
      name: '资金管理',
      path: '/fundsManagement',
      component: resolve => require(['../pages/system/fundsManagement.vue'], resolve),
    }, {
      name: '优惠券发放',
      path: '/couponIssuance',
      component: resolve => require(['../pages/operate/couponIssuance.vue'], resolve),
    }, {
      name: '优惠券统计',
      path: '/CouponStatistics',
      component: resolve => require(['../pages/operate/CouponStatistics.vue'], resolve),
    }, {
      name: 'Kupon statistik',
      path: '/CouponStatisticsInn',
      component: resolve => require(['../pages/operate/CouponStatisticsInn.vue'], resolve),
    }, {
      name: 'Pengaturan Kupon Tersedia',
      path: '/couponIssuanceInn',
      component: resolve => require(['../pages/operate/couponIssuanceInn.vue'], resolve),
    }, {
      path: '/unauthorizedInn',
      component: resolve => require(['../pages/unauthorizedInn.vue'], resolve)
    }, {
      path: '/404',
      component: resolve => require(['../pages/404.vue'], resolve)
    }]
}, {
  path: '*',
  redirect: {path: '/404'}
}];

export default routes
