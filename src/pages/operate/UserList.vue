/**
* Created by alan on 2017/3/10.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan</div>
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Urutan Pengajuan:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"Pengajuan ke-"+orderStatus.orderStep+""}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Durasi pinjaman:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Petugas manual pertama:</span><span>{{orderStatus.juniorReviewerName}}</span></div>
      </el-col>
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">Riwayat Permohonan</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="120" label="Urutan Pengajuan"></el-table-column>
        <el-table-column prop="createTime" width="240" label="Waktu Pengajuan">
          <template scope="scope">
            <span>{{getdate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="Nomor Permohonan"></el-table-column>
        <el-table-column prop="status" width="120" label="Hasil Verifikasi">
          <template scope="scope">
            <span>{{getOrderType(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="Keterangan"></el-table-column>
      </el-table>
    </el-row>
    <div class="divid-line"></div>
    <!-- 客户信息 baseInf-->
    <el-row>
      <div class="containers">
        <div class="asides">
          <div class="one-title">Informasi Dasar</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td>Sudah berkerja</td>
            </tr>
            <tr>
              <td>Nomor KTP</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>Alamat e-mail</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>Riwayat Pendidikan Terakhir</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>Status Perkawinan</td>
              <td>{{baseInfList.maritalStatus}}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>{{baseInfList.birthday}}</td>
            </tr>
            <tr>
              <td>Agama</td>
              <td>{{baseInfList.religion}}</td>
            </tr>
            <tr>
              <td>Nama Ibu</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>Jumlah Anak</td>
              <td>{{baseInfList.childrenAmount}}</td>
            </tr>
            <tr>
              <td>Alamat Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

          <table v-if='studentSeen' border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td>Mahasiswa</td>
            </tr>
            <tr>
              <td>Nomor KTP</td>
              <td>{{baseInfList.idCardNo}}</td>
            </tr>
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td>{{baseInfList.mobileNumberDES}}</td>
            </tr>
            <tr>
              <td>Alamat e-mail</td>
              <td>{{baseInfList.email}}</td>
            </tr>
            <tr>
              <td>Riwayat Pendidikan Terakhir</td>
              <td>{{baseInfList.academic}}</td>
            </tr>
            <tr>
              <td>Jumlah Anggota Keluarga</td>
              <td>{{baseInfList.familyMemberAmount}}</td>
            </tr>
            <tr>
              <td>Pendapatan Tahunan Keluarga</td>
              <td>{{baseInfList.familyAnnualIncome}}</td>
            </tr>
            <tr>
              <td>Nama Ayah</td>
              <td>{{baseInfList.fatherName}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel Ayah</td>
              <td>{{baseInfList.fatherMobile}}</td>
            </tr>
            <tr>
              <td>Profesi Ayah</td>
              <td>{{baseInfList.fatherPosition}}</td>
            </tr>
            <tr>
              <td>Nama Ibu</td>
              <td>{{baseInfList.motherName}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel Ibu</td>
              <td>{{baseInfList.motherMobile}}</td>
            </tr>
            <tr>
              <td>Profesi Ibu</td>
              <td>{{baseInfList.motherPosition}}</td>
            </tr>
            <tr>
              <td>Alamat Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

        </div>
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="80px">
              <el-form-item label="Peraturan verifikasi">
              </el-form-item>
            </el-form>
            <div class="question_radio">
              <div class="question_text">Apakah Alamat Tidak detail (jalan,nomor,keluarahan,kecamatan,kota)</div>
              <div class="radio_box">
                <el-checkbox :disabled="baseInfShow" v-model="baseRuleList[0].ruleResult"></el-checkbox>
    <!--               <el-radio :disabled="baseInfShow" v-model="baseRuleList[0].ruleResult" label="1">是</el-radio>
      <el-radio :disabled="baseInfShow" v-model="baseRuleList[0].ruleResult" label="2">否</el-radio> -->
    </div>
  </div>
</div>
<div class="other_remark smallRemark">
  <div class="aside_title">Keterangan Lainnya</div>
  <el-input
  type="textarea"
  :rows="12"
  placeholder=""
  :disabled="baseInfShow"
  v-model="baseInfRemark"
  class = 'textarear'>
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
      <div class="one-title">Informasi pekerjaan</div>
      <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
        <tr>
          <td>Nama Perusahaan</td>
          <td>{{jobInfList.companyName}}</td>
        </tr>
        <tr>
          <td>Posisi Jabatan</td>
          <td>{{jobInfList.positionName}}</td>
        </tr>
        <tr>
          <td>Pendapatan Bulanan</td>
          <td>{{jobInfList.monthlyIncome}}</td>
        </tr>
        <tr>
          <td>Alamat Perusahaan</td>
          <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
        </tr>
        <tr>
          <td>Alamat Detail Perushaan</td>
          <td>{{jobInfList.detailed}}</td>
        </tr>
        <tr>
          <td>No telepon perusahaan</td>
          <td>{{jobInfList.companyPhone}}</td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="Peraturan verifikasi">
          </el-form-item>
        </el-form>
        <div class="question_radio">
          <div class="question_text">Apakah alamat tidak detail?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[0].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">Apakah Nama perusahaan jelas jelas sembarang isi?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[1].ruleResult"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="containers" v-if="studentSeen">
    <div class="asides">
      <div class="one-title">Informasi Perguruan Tinggi</div>
      <table border='.1px' width="100%" style="table-layout:fixed;" class="studentsInf">
        <tr>
          <td>Nama perguruan Tinggi</td>
          <td>{{jobInfList.schoolName}}</td>
        </tr>
        <tr>
          <td>Jurusan</td>
          <td>{{jobInfList.major}}</td>
        </tr>
        <tr>
          <td>kapan mulai masuk Sekolah</td>
          <td>{{jobInfList.startSchoolDate}}</td>
        </tr>
        <tr>
          <td>Nomor Pelajar</td>
          <td>{{jobInfList.studentNo}}</td>
        </tr>
        <tr>
          <td>Alamat Perguruan Tinggi</td>
          <td>{{baseInfList.province}}{{baseInfList.city}}{{baseInfList.bigDirect}}{{baseInfList.smallDirect}}</td>
        </tr>
        <tr>
          <td>Alamat Detail Perushaan</td>
          <td>{{baseInfList.detailed}}</td>
        </tr>
        <tr>
          <td>Kartu Pelajar</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" @click.stop="studentCardUrlClick" alt=""></td>
        </tr>
        <tr>
          <td>Foto Beasiswa</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" @click.stop="scholarshipUrlClick" alt=""></td>
        </tr>
        <tr>
          <td>Foto Sertifikat Bahasa Inggris</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" @click.stop="englishUrlClick" alt=""></td>
        </tr>
        <tr>
          <td>Foto Sertifikat Komputer</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" @click.stop="ComputerUrlClick" alt=""></td>
        </tr>
        <tr>
          <td>Foto Kartu Sekolah Lainnya</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" @click.stop="schoolCardUrlClick" alt=""></td>
        </tr>
        <tr>
          <td>Foto Piagam/Sertifikat Lomba</td>
          <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" @click.stop="otherCertificateUrlClick" alt=""></td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="Peraturan verifikasi">
          </el-form-item>
        </el-form>
        <div class="question_radio">
          <div class="question_text">1.Apakah alamat perguruan tinggi tidak detail?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[0].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">2.Apakah nama perguruan tinggi tidak sesuai?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[1].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">3、Apakah foto kartu pelajar tidak jelas?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[2].ruleResult"></el-checkbox>

          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">4、Apakah wajah di KTP dan wajah di kartu pelajar sangat tidak mirip?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[3].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">5、Apakah informasi di KTP dan di kartu pelajar tidak sesuai?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[4].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">6、Apakah kartu pelajar yang digunakan ada kemungkinan kartu pelajar palsu?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[5].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">7、Apakah foto kartu pelajar yang digunakan tidak terdapat informasi?</div>
          <div class="radio_box">
            <el-checkbox :disabled="jobInfShow" v-model="jobRuleList[6].ruleResult"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="other_remark">
    <div class="aside_title">Keterangan Lainnya</div>
    <el-input
    type="textarea"
    :rows="4"
    placeholder=""
    :disabled="jobInfShow"
    v-model="jobInfRemark"
    class = 'textarear'>
  </el-input>
</div>
</el-row>
<div class="divid-line"></div>
<!-- 联系人信息 connectInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">Informasi Kontak yang Bisa Dihubungi</div>
      <table border='.1px' width="100%" style="table-layout:fixed;">
        <tr>
          <td>Nama kontak yang bisa dihubungi 1</td>
          <td>{{connectInfList.contactsName1}}</td>
        </tr>
        <tr>
          <td>hubungan</td>
          <td>{{connectInfList.relation1}}</td>
        </tr>
        <tr>
          <td>Nomor Ponsel 1</td>
          <td>{{connectInfList.contactsMobile1}}</td>
        </tr>
        <tr>
          <td>Nama kontak yang bisa dihubungi 2</td>
          <td>{{connectInfList.contactsName2}}</td>
        </tr>
        <tr>
          <td>hubungan</td>
          <td>{{connectInfList.relation2}}</td>
        </tr>
        <tr>
          <td>Nomor Ponsel 2</td>
          <td>{{connectInfList.contactsMobile2}}</td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="Peraturan verifikasi">
          </el-form-item>
        </el-form>
        <div class="question_radio">
          <div class="question_text">1、Kontak yg bisa dihubungi sembarang isi？</div>
          <div class="radio_box">
            <el-checkbox :disabled="connectInfShow" v-model="connectRuleList[0].ruleResult"></el-checkbox>
          </div>
        </div>
      </div>
      <div class="other_remark smallRemark">
        <div class="aside_title">Keterangan Lainnya</div>
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
      <div class="one-title">Pengenalan Wajah</div>
      <span class="titlePhone">Nomor KTP：  {{baseInfList.idCardNo}}</span>
      <div class="faceCheck">
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls" @click.stop="facePhotoUrlClick"><br>Bukti pengenaan wajah</div>
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl" @click.stop="handIdCardUrlClick"><br>Foto pengguna memegang KTP</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl" @click.stop="idCardUrlClick"><br>Foto KTP Tampak Depan</div>
      </div>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="80px">
          <el-form-item label="Peraturan verifikasi">
          </el-form-item>
        </el-form>
        <div class="question_radio">
          <div class="question_text">1、Apakah KTP yang di gunakan ada kemungkinan KTP palsu?</div>
          <div class="radio_box">
            <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[0].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">2、Apakah KTP yang di gunakan terlihat jelas kepalsuannya?</div>
          <div class="radio_box">
            <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[1].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="question_radio">
          <div class="question_text">3、Apakah nomor KTP yang di isi dan tidak sesuai dengan yang di foto?</div>
          <div class="radio_box">
            <el-checkbox :disabled="faceCheckShow" v-model="faceCheckRuleList[2].ruleResult"></el-checkbox>
          </div>
        </div>
        <div class="other_remark smallRemark">
          <div class="aside_title">Keterangan Lainnya</div>
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
<el-row v-if="videoShowOrNot">
  <div class="containers">
    <div class="asides">
      <div class="one-title">Sertifikasi Video</div>
      <el-button @click="searcher" type="primary">Putar</el-button>
      <div v-bind:class= "{ vadio:noActive,vadios:isActive}">
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
        <el-form-item label="Peraturan verifikasi">
        </el-form-item>
      </el-form>
      <div class="question_radio">
        <div class="question_text">1、Apakah suara pembaca seperti diwakilkan？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[0].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">2、Apakah ada orang lain di dalam rekaman?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[1].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">3、Apakah pengguna menutupi wajah dengan KTP dan berpura pura sebagai pemilik KTP dan mengajukan permohonan pinjaman? </div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[2].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">4、Apakah jenis kelamin yang di isi berbeda dari apa yang ada di video?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">5、Apakah wajah yang ada di video terdapat bekas luka sampai tidak bisa dikenali?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[4].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">6、Apakah busana yang digunakan keterlaluan? (memperlihatkan bagian tubuh yang tidak perlu)？</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[5].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">7、Apakah kualitas video tidak bagus, atau gelap?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[6].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">8、Apakah teks yang dibacakan tidak sesuai dengan teks yang diberikan?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[7].ruleResult"></el-checkbox>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="other_remark">
  <div class="aside_title">Keterangan Lainnya</div>
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
</el-row>
<div class="divid-line"></div>
<!-- 补充信息 addtionInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">Informasi Tambahan</div>
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
      <div class="other_remark smallRemark">
        <div class="lastTitle">Keterangan Lainnya</div>
        <el-input
        type="textarea"
        :rows="6"
        placeholder=""
        :disabled="true"
        v-model="addtionInfRemark"
        class = 'textarear'>
      </el-input>
    </div>
  </div>
</div>
</el-row>
<div class="divid-line"></div>
<!-- 电话审核 -->
<el-row>
  <div class="one-title">Modul verivfikasi telepon<span class="titlePhone">No.Ponsel pengguna：  {{baseInfList.mobileNumberDES}}</span><span class="titlePhone">Nama Pengguna：  {{baseInfList.realName}}</span>
    <span class="titlePhone">Jenis Kelamin：  {{baseInfList.sex}}</span>
    <span class="titlePhone">No telepon perusahaan：  {{jobInfList.companyPhone}}</span>
  </div>
  <el-row>
    <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 1：</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[0].question}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple"> jawaban yg benar：</div></el-col>
    <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[0].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
      <img :src="phoneCheckQuestions[0].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[0].answer)" alt="" width="150px" height="100px">
    </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[0].answer}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">jawaban pengguna：</div></el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <template>
          <el-radio v-model="phoneRadio1" label="1">benar</el-radio>
          <el-radio v-model="phoneRadio1" label="0">salah</el-radio>
        </template>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 2：</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[1].question}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple"> jawaban yg benar：</div></el-col>
    <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[1].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
      <img :src="phoneCheckQuestions[1].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[1].answer)" alt="" width="150px" height="100px">
    </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[1].answer}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple"> jawaban pengguna：</div></el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <template>
          <el-radio v-model="phoneRadio2" label="1">benar</el-radio>
          <el-radio v-model="phoneRadio2" label="0">salah</el-radio>
        </template>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="2"><div class="grid-content bg-purple">pertanyaan 3：</div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">{{phoneCheckQuestions[2].question}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">jawaban yg benar：</div></el-col>
    <el-col :span="5"><ml-photo-box ref='photoBox'></ml-photo-box><div class="grid-content bg-purple" v-if="phoneCheckQuestions[2].question === 'Sebutkan alamat tempat tingal pada KTP Anda?'">
      <img :src="phoneCheckQuestions[2].answer" @click.stop="teleReviewCardUrlClick(phoneCheckQuestions[2].answer)" alt="" width="150px" height="100px">
    </div><div class="grid-content bg-purple" v-else="">{{phoneCheckQuestions[2].answer}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">jawaban pengguna：</div></el-col>
    <el-col :span="5">
      <div class="grid-content bg-purple">
        <template>
          <el-radio v-model="phoneRadio3" label="1">benar</el-radio>
          <el-radio v-model="phoneRadio3" label="0">salah</el-radio>
        </template>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <span>Keterangan Lainnya：<el-button v-if="phoneCheckStartVif" @click="phoneCheckStart">Mulai</el-button><el-button v-if="phoneCheckEndVif" @click="phoneCheckEnd">selesai</el-button></span>
    <template>
      <el-table
      :data="phoneChecktableData"
      style="width: 100%">
      <el-table-column
      type="index"
      label="No.urut"
      width="80">
    </el-table-column>
    <el-table-column
    prop="startTime"
    label="waktu mulai"
    width="160">
  </el-table-column>
  <el-table-column
  prop="endTime"
  label=" waktu selesai"
  width="160">
</el-table-column>
<el-table-column
prop="burningTime"
label="Durasi"
width="120">
</el-table-column>
<el-table-column
prop="remark"
label="Keterangan">
</el-table-column>
<el-table-column
prop="alertTime"
label="pemberitahuan selanjutnya"
width="160">
</el-table-column>
<el-table-column prop="createTime" label="Tambahkan waktu" width="220">
</el-table-column>
<el-table-column
label="Opsi"
width="120">
<template scope="scope">
  <el-button v-if="scope.row.remark==''" @click="phoneCheckClick(scope.row,scope.$index)">Tambah keterangan</el-button>
</template>
</el-table-column>
</el-table>
</template>
<!-- 电核弹窗 -->
<el-dialog
title="keterangan"
:visible.sync="phoneCheckDialogVisible"
width="30%"
v-loading="phoneCheckDialogLoading">
<el-input
type="textarea"
:rows="10"
maxlength="800"
placeholder="Tidak lebih dari 800 huruf"
v-model="phoneCheckTextarea"
class = 'textarear'>
</el-input>
<el-col :span="18">
  <div class="grid-content bg-purple">Tambah waktu pemberitahuan：</div>
  <template>
    <el-date-picker
    v-model="phoneCheckDate"
    type="datetime"
    placeholder=" Pilih hari dan waktu"
    format="yyyy-MM-dd hh:mm"
    >
  </el-date-picker>
</template>
</el-col>
<span slot="footer" class="dialog-footer">
  <el-button @click="phoneCheckBack">Batal</el-button>
  <el-button type="primary" @click="phoneCheckCommit">Yakin</el-button>
</span>
</el-dialog>
</el-row>
</el-row>
<!--  Kirim   -->
<el-form id="btnForm">
  <el-form-item align="right">
    <el-button @click="dialogVisible=true" type="primary">TOLAK</el-button>
    <el-button @click="dialogVisible1=true" type="primary">Kirim</el-button>
  </el-form-item>
</el-form>
<el-dialog
title="Apakah Anda yakin mengirim hasil verifikasi ini?"
:visible.sync="dialogVisible"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>Pemohon milik akun{{baseInfList.realName}}Silakan tulis opini atau keterangan akhir pada kololm di bawah ini.
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark"
class = 'textarear'>
</el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">Batal</el-button>
  <el-button type="primary" @click="reviewRefuse">Yakin</el-button>
</span>
</el-dialog>
<el-dialog
title="LULUS"
:visible.sync="dialogVisible1"
width="50%">
<!-- <el-col>
  <i class="el-icon-warning"></i>确认用户{{baseInfList.realName}}的申请订单，请在下方填写审核意见
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark1">
</el-input> -->
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible1 = false">Batal</el-button>
  <el-button type="primary" @click="reviewPass">Yakin</el-button>
</span>
</el-dialog>

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
    let compareDate = (time) => {
      let _time = time.setDate(time.getDate()+1);
      return time.getTime() <= Date.now();
    }
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

      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
        },
        status: '', //审核结果
        remark: '', //审核意见
        // 电话审核radio
        phoneRadio1: "1",
        phoneRadio2: "1",
        phoneRadio3: "1",
        phoneChecktableData: [],
        phoneCheckCurrent: {
          "remark": "",
          "orderTag": 0,
          "alertTime": '',
          "startTime": '',
          "endTime": '',
          "burningTime": "",
          "current": true
        },
        phoneCheckQuestions: [],
        phoneCheckDialogVisible: false,
        phoneCheckTextarea: '',
        phoneCheckDate: '',
        phoneCheckStartVif: true,
        phoneCheckEndVif: false,
        recordStartTime: '',
        recordEndTime: '',
        phoneCheckDialogLoading: false,
        phoneCheckId: '',
        phoneCheckIndex: '',

        textarea: '',
        ddzhuangtai : [{
          code: 'SUBMITTING',
          name: 'Menunggu mengirim',
          value:'1'
        }, {
          code: 'MACHINE_CHECKING',
          name: 'menunggu verifikasi otomatis',
          value:'2'
        }, {
          code: 'FIRST_CHECK',
          name: 'Menunggu verifikasi manual pertama',
          value:'3'
        },{
          code: 'SECOND_CHECK',
          name: 'Menunggu verifikasi manual akhir ',
          value:'4'
        },{
          code: 'LOANING',
          name: 'Menunggu dana cair',
          value:'5'
        }, {
          code: 'LOANING_DEALING',
          name: 'Dalam proses pencairan dana',
          value:'6'
        }, {
          code: 'RESOLVING_NOT_OVERDUE',
          name: 'Menunggu pelunasan pinjaman',
          value:'7'
        },{
          code: 'RESOLVING_OVERDUE',
          name: 'Menunggu pelunasan pinjaman (terlambat) ',
          value:'8'
        }, {
          code: 'RESOLVED_DEALING',
          name: 'Dalam proses pelunasan pinjaman',
          value:'9'
        }, {
          code: 'RESOLVED_NOT_OVERDUE',
          name: 'Pelunasan tepat waktu ',
          value:'10'
        },{
          code: 'RESOLVED_OVERDUE',
          name: 'Pelunasan terlambat ',
          value:'11'
        },{
          code: 'MACHINE_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi otomatis',
          value:'12'
        }, {
          code: 'FIRST_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual pertama',
          value:'13'
        }, {
          code: 'SECOND_CHECK_NOT_ALLOW',
          name: 'Tidak lulus verifikasi manual akhir',
          value:'14'
        }, {
          code: 'CANCEL',
          name: 'Permohonan dibatalkan',
          value:'15'
        }, {
          code: 'LOAN_FAILD',
          name: 'Pinjaman gagal',
          value:'16'
        }],
        orderNo: '',
        isActive:true,
        noActive:false,
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
        jobInfList: {},
        connectInfList: [],

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
          attachmentName:"Foto BPJS",
          attachmentType:17,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"SIM",
          attachmentType:5,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"identitas paspor anda",
          attachmentType:6,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"Slip gaji",
          attachmentType:7,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"mutasi bank",
          attachmentType:8,
          attachmentUrl: require("../../assets/none.png")
        },{
          attachmentName:"buku bank",
          attachmentType:9,
          attachmentUrl: require("../../assets/none.png")
        }],
        workerSeen: true,
        studentSeen: false,
        userUuid: "",
        uuid: "",
        facePhotoUrls:'',
        IsStudents: false,
        dialogVisible: false,
        dialogVisible1: false,
        reviewRemark:'',
        reviewRemark1:'',
        videoShowOrNot : true,
      }
    },
    methods: {
      formatUnixDateTime(time){
        return DataUtil.formatUnixDateTime(time);
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
            }else{
              this.workerSeen=true;
              this.studentSeen=false;
            }
            // this.getPhoneCheck(type);
            this.getBaseInf(this.userUuid,3);
            this.getBaseInf(this.userUuid,4);
            this.getBaseInf(this.userUuid,5);
            this.getBaseInf(this.userUuid,6);
            this.getBaseInf(this.userUuid,8);
            this.getBaseInf(this.userUuid,9);
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
        for(let type=1;type<10;type++){
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
              if (response.body.data.checkRuleList[0]) {
                if(type==1){this.baseRuleList=data.checkRuleList;}
                if(type==2){this.baseRuleList=data.checkRuleList;}
                if(type==3){this.jobRuleList=data.checkRuleList;}
                if(type==4){this.jobRuleList=data.checkRuleList;}
                if(type==5){this.connectRuleList=data.checkRuleList;}
                if(type==6){this.faceCheckRuleList=data.checkRuleList;}
                if(type==7){this.videoCheckRuleList=data.checkRuleList;}
              }
              if(type==1){this.baseInfRemark=data.checkRuleRemark.remark;}
              if(type==2){this.baseInfRemark=data.checkRuleRemark.remark}
                if(type==4){this.jobInfRemark=data.checkRuleRemark.remark}
                  if(type==3){this.jobInfRemark=data.checkRuleRemark.remark;}
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
              this.baseInfList.maritalStatus="Single"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="Menikah"
            }else {
              this.baseInfList.maritalStatus="Cerai"
            }
            if(this.baseInfList.sex==0){
              this.baseInfList.sex="Tidak diisi"
            }else if(this.baseInfList.sex==1){
              this.baseInfList.sex="Laki-Laki"
            }else {
              this.baseInfList.sex="Perempuan"
            }
          }
        })
      },
      //获取用户基本信息
      getBaseInf(userUuid,type){
        let _data={
          "userUuid": this.userUuid,
          "type": type,
          "langue":2
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
              });
              this.addtionInfList=adt;
            }
          }
        })
      },
      // Kirim复审
      reviewPass(){
        this.phoneCheckQuestions[0].result = Number(this.phoneRadio1);
        this.phoneCheckQuestions[1].result = Number(this.phoneRadio2);
        this.phoneCheckQuestions[2].result = Number(this.phoneRadio3);
        let _dataOne={
          "orderNo": this.uuid,
          "resultRequests":this.phoneCheckQuestions,
          "langue":  2,
          "userUuid":this.userUuid,
        }
        this.$http.post("manage/saveTeleReviewResult", _dataOne);

        let _data={
          "remark": this.reviewRemark1,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":  Number(this.phoneRadio1)+Number(this.phoneRadio2)+Number(this.phoneRadio3) >=2? 0
          :1
        }
        this.$http.post("manage/secondCheck", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            this.dialogVisible1=false;
            this.$message("Verifikasi sukses");
            window.close();
            window.open('#/RiviewTheListSecond');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            window.close();
            window.open('#/RiviewTheListSecond');
            return;
          }
        }

        )
      },
      rowClick(row){
        window.open('#/completeOrderDetail?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
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

      reviewRefuse(){
        if(this.reviewRemark==''){
          this.$message("Keterangan verifikasi wajib diisi！");
          return;
        }
        let _data={
          "remark": this.reviewRemark,  //必填
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "pass":1
        }
        this.$http.post("manage/secondCheck", _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
            this.dialogVisible1=false;
            this.$message("Verifikasi sukses");
            window.open('#/RiviewTheListSecond');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            window.open('#/RiviewTheListSecond');
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
          "langue":2
        }
        this.$http.post("manage/getTeleReviewQuestion", _data).then(response => {
          let res=response.body.data.remarks;
          res.forEach(e=>{
            if(e.startTime){
              e.startTime=this.getdates(e.startTime);
            }
            if(e.endTime){
              e.endTime=this.getdates(e.endTime);
            }
            if(e.alertTime){
              e.alertTime=this.getdates(e.alertTime);
            }
            if(e.createTime){
              e.createTime=this.getdates(e.createTime);
            }
              // e.current=false;
            });
          this.phoneChecktableData=res;
          this.phoneChecktableData.push(this.phoneCheckCurrent);
          console.log(this.phoneChecktableData)
          this.phoneCheckQuestions=response.body.data.questions;
        })
      },
      phoneCheckStart(){
        this.recordStartTime = new Date();
        this.phoneChecktableData[this.phoneChecktableData.length-1].startTime=this.getdates(this.recordStartTime);
        this.phoneCheckStartVif=false;
        this.phoneCheckEndVif=true;
      },
      phoneCheckEnd(){
        this.recordEndTime = new Date();
        this.phoneChecktableData[this.phoneChecktableData.length-1].endTime=this.getdates(this.recordEndTime);
        let dureTime=(this.recordEndTime-this.recordStartTime)/1000;
        let dureTimeH=Math.floor(dureTime/3600);
        let dureTimeM=Math.floor((dureTime%3600)/60)
        let dureTimeS=Math.floor((dureTime%3600)%60);
        this.phoneCheckCurrent.burningTime=dureTimeH+":"+dureTimeM+":"+dureTimeS;
        this.phoneChecktableData[this.phoneChecktableData.length-1].burningTime=this.phoneCheckCurrent.burningTime;
        this.phoneCheckStartVif=false;
        this.phoneCheckEndVif=false;
        let _data={
          "userUuid":this.userUuid,
          "createUser": DataUtil.id(),
          "updateUser": DataUtil.id(),
          "orderNo": this.uuid,
          "startTime": this.phoneChecktableData[this.phoneChecktableData.length-1].startTime,
          "endTime": this.phoneChecktableData[this.phoneChecktableData.length-1].endTime,
          "burningTime": this.phoneCheckCurrent.burningTime,
          "type":"1",
          "id": this.phoneCheckId,
          "langue":2
        }
        this.$http.post("manage/inserOrUpdateManOrderRemark", _data).then(response => {
          if (1 == response.body.code) {
            this.phoneCheckDialogLoading = false;
            this.phoneCheckDialogVisible = false;
            this.phoneCheckId=response.body.data;
            this.$message({
              message: 'Verifikasi sukses',
              center: true
            });
          }
        })

      },
      phoneCheckBack(){
        this.phoneCheckDialogVisible = false;
        this.phoneCheckTextarea="";
        this.phoneCheckDate="";
      },
      // 点击添加备注
      phoneCheckClick(row,index){
        this.phoneCheckIndex=index;
        this.phoneCheckDialogVisible=true;
        if(row.id){
          this.phoneCheckId=row.id
        }
      },
      phoneCheckCommit(){
        this.phoneCheckDialogLoading = true;
        let index=this.phoneCheckIndex;
        this.phoneChecktableData[index].remark=this.phoneCheckTextarea;
        if(this.phoneCheckDate==""){
          this.phoneChecktableData[index].alertTime=""
        }else{
          this.phoneChecktableData[index].alertTime=this.getdates(this.phoneCheckDate);
        }
        let _data={
          "userUuid":this.userUuid,
          "createUser": DataUtil.id(),
          "updateUser": DataUtil.id(),
          "orderNo": this.uuid,
          "alertTime": this.phoneChecktableData[index].alertTime,
          "remark": this.phoneCheckTextarea,
          "type":"1",
          "id": this.phoneCheckId,
          "langue":2
        }
        this.$http.post("manage/inserOrUpdateManOrderRemark", _data).then(response => {
          if (1 == response.body.code) {
            this.phoneCheckDialogLoading = false;
            this.phoneCheckDialogVisible = false;
            this.phoneCheckId=response.body.data;
            this.$message({
              message: ' KirimVerifikasi sukses',
              center: true
            });
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
      this.getPhoneCheck();
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
  </style>
