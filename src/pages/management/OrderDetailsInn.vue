/**
* Created by xiaowei on 2017/24/12.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan <el-button v-if="orderStatus.extendType===0" class="tp-title" type="primary" size="mini" @click="dialogVisible1 = true">Bukti Transfer</el-button></div>
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Status Permohonan:</span><span>{{getOrderType(orderStatus.status)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Pinjaman ulang:</span><span> <el-tag :type="orderStatus.isRepeatBorrowing==1?'danger':''"><span>{{orderStatus.isRepeatBorrowing==1?"Ya":"Bukan"}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Pengenal perangkat:</span><span>{{orderStatus.intoOrdFlag == '1' ? 'cashcash' : ''}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Tujuan pinjaman:</span><span>{{orderStatus.borrowUse}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Apakah ini nama asli:</span><span> <el-tag :type="orderStatus.realNameAuthFlag==true?'danger':''"><span>{{orderStatus.realNameAuthFlag==true?"Ya":"Bukan"}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Nomor WhatsApp (yang sering digunakan):</span><span>{{orderStatus.WhatsApp}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Permohonan yang Mencicil :</span><span> <el-tag :type="orderStatus.extendType==true?'danger':''"><span>{{orderStatus.extendType==1?"Ya":"Bukan"}}</span></el-tag></span></div>
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
        <li><span class="left_span">Tanggal/Jam</span><span class="rig_span">{{bankList.loanDate}}</span></li>
        <li><span class="left_span">Nama Merchant</span><span class="rig_span">{{bankList.platformName}}</span></li>
        <li><span class="left_span">Nama Penerima</span><span class="rig_span">{{bankList.userName}}</span></li>
        <li><span class="left_span">Transfer ke Rekening</span><span class="rig_span">{{bankList.userAccount}}</span></li>
        <li><span class="left_span">Total Transfer</span><span class="rig_span">{{bankList.loanAmout}}</span></li>
        <li><span class="left_span">Status</span><span class="rig_span">berhasil</span></li>
      </ul>
      <div class="bot_close" @click="dialogVisible1 = false">BATAL</div>
    </div>
  </el-dialog>
  <div class="divid-line"></div>
  <el-row>
    <div class="one-title">Proses permohonan</div>
    <el-steps :data="orderProData" :space="250" :active="active" :align-center="true" finish-status="success">
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
          <div class="one-title">Informasi Dasar</div>
          <table v-if="workerSeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
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
              <td>Jumlah Anggota Keluarga</td>
              <td>{{baseInfList.familyMemberAmount}}</td>
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
              <td>Jenis Identitas</td>
              <td><span v-if="orderStatus.isKefu !=true ">Sudah berkerja</span><span v-if="orderStatus.isKefu == true ">**</span></td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
          </table>

          <table v-if="familySeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td><span v-if="orderStatus.isKefu !=true ">Ibu rumah tangga</span><span v-if="orderStatus.isKefu == true ">**</span></td>
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
              <td><span v-if="orderStatus.isKefu !=true ">Mahasiswa</span><span v-if="orderStatus.isKefu == true ">**</span></td>
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
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 工作信息 jobInf-->
    <el-row>
      <div class="containers" v-if="workerSeen">
        <div class="asides">
          <div class="one-title">jobInf</div>
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
              <td>Perusahaan Ibu</td>
              <td>{{jobInfList.companyPhone}}</td>
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
              <td>Nomor Induk Pegawai/karyawan</td>
              <td>{{jobInfList.employeeNumber}}</td>
            </tr>
            <tr>
              <td>Nomor Ekstensi</td>
              <td>{{jobInfList.extensionNumber}}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="containers" v-if="familySeen">
        <div class="asides">
          <div class="one-title">familySeen</div>
          <table v-if="familySeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>total pendapatan bulanan rumah tangga</td>
              <td>{{jobInfList.homeMouthIncome}}</td>
            </tr>
            <tr>
              <td>Penghasilan utama rumah tangga</td>
              <td>{{jobInfList.incomeType}}</td>
            </tr>
            <tr>
              <td>Sumber utama pendapatan rumah tangga</td>
              <td>{{jobInfList.incomtSource}}</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td>{{jobInfList.sourceName}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td>{{jobInfList.sourceTel}}</td>
            </tr>
            <tr>
              <td>penghasilan bulanan</td>
              <td>{{jobInfList.mouthIncome}}</td>
            </tr>
            <tr>
              <td>Jenis perkerjaan</td>
              <td>{{jobInfList.workType}}</td>
            </tr>
            <tr>
              <td>Nama Perusahaan</td>
              <td>{{jobInfList.companyName}}</td>
            </tr>
            <tr>
              <td>No telepon perusahaan</td>
              <td>{{jobInfList.companyPhone}}</td>
            </tr>
            <tr>
              <td>Alamat perusahaan</td>
              <td>{{jobInfList.workAddressDetail}}</td>
            </tr>
            <tr>
              <td>Informasi utama sumber pendapatan rumah tangga</td>
              <td>{{jobInfList.incomeWithNoCom}}</td>
            </tr>
            <tr>
              <td>Nomor Induk Pegawai/karyawan</td>
              <td>{{jobInfList.employeeNumber}}</td>
            </tr>
            <tr>
              <td>Nomor Ekstensi</td>
              <td>{{jobInfList.extensionNumber}}</td>
            </tr>
          </table>
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
              <td>Alamat Perguruan Tinggi Sekarang</td>
              <td>{{jobInfList.province}}{{jobInfList.city}}{{jobInfList.bigDirect}}{{jobInfList.smallDirect}}</td>
            </tr>
            <tr>
              <td>Alamat Detail Perguruan Tinggi Sekarang</td>
              <td>{{jobInfList.detailed}}</td>
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
      </div>
    </el-row>
    <div class="divid-line"></div>
    <!-- 联系人信息 connectInf-->
    <el-row v-if="contactmanage">
      <div class="one-title">Telepon Pelanggan</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>Telepon Pelanggan</td>
            <td>{{baseMobileList.mobile}}</td>
          </tr>
          <tr>
            <td>Hasil Panggilan Keluar </td>
            <td>{{getmobilecon(baseMobileList.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">Hasil Penagihan</div>
        <el-col :span="8" class="grid-content">
          <div><span>Telepon:</span><span>{{getcitys(baseMobileList.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileList.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>SMS:</span><span>{{getcitys(baseMobileList.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-row v-if="contactmanage1">
      <div class="one-title">Telepon cadangan</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>Telepon cadangan nasabah</td>
            <td>{{baseMobileListone.mobile}}</td>
          </tr>
          <tr>
            <td>Hasil Panggilan Keluar </td>
            <td>{{getmobilecon(baseMobileListone.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">Hasil Penagihan</div>
        <el-col :span="8" class="grid-content">
          <div><span>Telepon:</span><span>{{getcitys(baseMobileListone.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileListone.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>SMS:</span><span>{{getcitys(baseMobileListone.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-row v-if="contactmanage2">
      <div class="one-title">No telepon perusahaan</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>No telepon perusahaan</td>
            <td>{{baseMobileListtwo.mobile}}</td>
          </tr>
          <tr>
            <td>Hasil Panggilan Keluar </td>
            <td>{{getmobilecon(baseMobileListtwo.callResult)}}</td>
          </tr>
        </table>
        <div class="two-title">Hasil Penagihan</div>
        <el-col :span="8" class="grid-content">
          <div><span>Telepon:</span><span>{{getcitys(baseMobileListtwo.contactResultPhone)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>WA:</span><span>{{getcitys(baseMobileListtwo.contactResultWA)}}</span></div>
        </el-col>
        <el-col :span="8" class="grid-content">
          <div><span>SMS:</span><span>{{getcitys(baseMobileListtwo.contactResultSms)}}</span></div>
        </el-col>
      </div>
    </el-row>
    <el-dialog title=" Riwayat Penagihan" v-model="addDialogVisible" :close-on-click-modal="false" size="tiny">
      <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
        <el-form-item label="Pilih Kontak">
         <el-select v-model="addForm.contactMode" placeholder="Silahkan pilih" clearable @change="getProv($event)">
          <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hasil Kontak yang Dipilih">
       <el-select v-model="addForm.contactResult" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Keterangan Lainnya">
      <el-input type="textarea" placeholder="Keterangan Lainnya" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">BATAL</el-button>
    <el-button type="primary" @click="tijiaofor" >Kirim</el-button>
  </div>
</el-dialog>
<div class="divid-line"></div>
<div v-if="contactmanage3">
  <div class="one-title">Informasi Kontak yang Bisa Dihubungi</div>
  <template v-for="(item,index) in getlinkmanList">
    <el-row>
     <div class="asides">
      <table border='.1px' width="40%" style="table-layout:fixed;float:left">
        <tr>
          <td>Nama kontak yang bisa dihubungi{{index+1}}</td>
          <td>{{item.realName}}</td>
        </tr>
        <tr>
          <td>hubungan{{index+1}}</td>
          <td>{{item.relation}}</td>
        </tr>
        <tr>
          <td>Nama kontak yang bisa dihubungi{{index+1}}</td>
          <td>{{item.mobile}}</td>
        </tr>
        <tr>
          <td>WA/Line{{index+1}}</td>
          <td>{{item.waOrLine}}</td>
        </tr>
        <tr>
          <td>Hasil Panggilan Keluar </td>
          <td>{{getmobilecon(item.callResult)}}</td>
        </tr>

        <div class="two-title">Hasil Penagihan</div>
        <el-col width="30%">
          <div><span>Telepon:</span><span>{{getcitys(item.contactResultPhone)}}</span></div>
        </el-col>
        <el-col width="30%">
          <div><span>WA:</span><span>{{getcitys(item.contactResultWA)}}</span></div>
        </el-col>
        <el-col width="30%">
          <div><span>SMS:</span><span>{{getcitys(item.contactResultSms)}}</span></div>
        </el-col>
      </table>
    </div>
  </el-row>
</template>
</div>
<div class="divid-line"></div>
<div v-if="contactmanage4">
  <div class="one-title">Informasi Kontak yang Bisa Dihubungi</div>
  <template v-for="(item,index) in linkmanList">
    <el-row>
     <div class="asides">
      <table border='.1px' width="50%" style="table-layout:fixed;">
        <tr>
          <td>Nama{{index+1}}</td>
          <td>{{item.realName}}</td>
        </tr>
        <tr>
          <td>Telepon{{index+1}}</td>
          <td>{{item.mobile}}</td>
        </tr>
        <tr>
          <td>Hasil Panggilan Keluar </td>
          <td>{{getmobilecon(item.callResult)}}</td>
        </tr>
        <div class="two-title">Hasil Penagihan</div>
        <el-col class="grid-content">
          <div><span>Telepon:</span><span>{{getcitys(item.contactResultPhone)}}</span></div>
        </el-col>
        <el-col class="grid-content">
          <div><span>WA:</span><span>{{getcitys(item.contactResultWA)}}</span></div>
        </el-col>
        <el-col class="grid-content">
          <div><span>SMS:</span><span>{{getcitys(item.contactResultSms)}}</span></div>
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
      <div class="one-title">Pengenalan Wajah</div>
      <span class="titlePhone"><span v-if="pairVerifySimilarity.indexOf('face') == -1">Nilai pengenalan wajah：</span>  {{pairVerifySimilarity}}</span>
      <div class="faceCheck">
       <!--  <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="
        'data:image/jpeg;base64,'+facePhotoUrls"  @click.stop="facePhotoUrlClick"><br>Bukti pengenaan wajah</div> -->
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>Swafoto</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="
        baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>Foto KTP Tampak Depan</div>
        <!--  <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.insuranceCardUrl"  @click.stop="insuranceCardUrl"><br>Foto BPJS</div> -->
      </div>
    </div>

  </div>
</el-row>
<div class="divid-line"></div>
<!-- 视频认证 videoCheck-->
<!-- <el-row  v-if="videoShowOrNot">
  <div class="containers">
    <div class="asides">
      <div class="one-title">Sertifikasi Video</div>
      <el-button @click="searcher" type="primary">Putar</el-button>
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
<div class="divid-line"></div>
<!-- 银行卡信息 -->
<el-row>
  <div class="one-title"> Informasi kartu bank</div>
  <el-col :span="8" class="grid-content">
    <div><span> Jenis bank:</span><span>{{cardbackInfList.bankCode}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>Nomor rekening:</span><span>{{cardbackInfList.bankNumberNo}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>Nama pemilik rekening:</span><span>{{cardbackInfList.bankCardName}}</span></div>
  </el-col>
  <el-col :span="8" class="grid-content">
    <div><span>Kondisi kartu bank:</span><span>{{getBankStatusInn(cardbackInfList.status)}}</span></div>
  </el-col>
</el-row>
<div class="divid-line"></div>
<!-- 补充信息 addtionInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">Informasi Tambahan</div>
      <div class="faceCheck">
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>Kartu Kredit
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>SIM
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>identitas paspor anda
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>KK
        </div>
        <div class="faceImg" v-if="workerSeen">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>Slip gaji
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box>
          <img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>Mutasi bank
        </div>
      </div>
    </div>
  </div>
</el-row>
<!-- 催收记录 -->
<div class="divid-line"></div>
<el-row>
  <h1 class="one-title">Keterangan permohonan</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="200">
    <el-table-column type="index" label="No.urut" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="Tambahkan waktu" width="220">
      <template scope="scope">{{getdate(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="remark" label="Tambah keterangan">
    </el-table-column>
    <el-table-column prop="orderTag" label="Label permohonan" width="100">
     <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
   </el-table-column>
   <el-table-column prop="alertTime" label="pemberitahuan selanjutnya" width="220">
    <template scope="scope">{{getdate(scope.row.alertTime)}}</template>
  </el-table-column>
</el-table>
</el-row>
<div class="divid-line"></div>
<el-row>
 <div class="one-title">Riwayat Permohonan</div>
 <el-table :data="historyData" width="100%" v-loading="historyLoading" @row-click="rowClick" size="large">
   <el-table-column prop="uuid" width="300" label="Nomor Permohonan"></el-table-column>
   <el-table-column prop="status" width="200" label="Hasil Verifikasi">
     <template scope="scope">
       <span>{{getOrderTypeone(scope.row.status)}}</span>
     </template>
   </el-table-column>
   <el-table-column prop="amountApply" width="200" label="Jumlah pinjaman"></el-table-column>
   <el-table-column prop="borrowingTerm" width="250" label="Urutan Pengajuan">
   </el-table-column>
 </el-table>
</el-row>
<div class="divid-line"></div>
<el-row>
  <div class="one-title">Informasi penagihan</div>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="billData"   size="large">
   <el-table-column prop="billTerm" width="150" label="Jumlah Cicilan"></el-table-column>
   <el-table-column prop="refundTime" width="150" label="Hari pembayaran"></el-table-column>
   <el-table-column prop="totalAmount" width="150" label="Jumlah tagihan yang harus dibayar"></el-table-column>
   <el-table-column prop="actualRepayAmout" width="150" label="Jumlah tagihan sebenarnya"></el-table-column>
   <el-table-column prop="billAmount" width="150" label="pokok"></el-table-column>
   <el-table-column prop="overdueFee" width="150" label="Biaya Keterlambatan"></el-table-column>
   <el-table-column prop="penalty" width="150" label="denda"></el-table-column>
   <el-table-column prop="status" width="100" label="Status Pembayaran">
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
      facePhotoUrls:'',
      historyLoading: false,
      orderRemarkList:[], //订单备注
      bankList:[],

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
        contactmanage:true,
        contactmanage1:true,
        contactmanage2:true,
        contactmanage3:true,
        contactmanage4:true,
        provs: [{
          name: 'Telepon',
          code: '2',
          pro:'Telepon'
        },{
          name: 'WA',
          code: '1',
          pro:'WA'
        },{
          name: 'SMS',
          code: '3',
          pro:'SMS'
        },{
          name: 'Lainnya',
          code: '4',
          pro:'Lainnya'
        }],
        qingkuanglist : [{
          code: '0',
          name: 'Asrama/dorm/dalam sekolah'
        }, {
          code: '1',
          name: 'Rumah/ bersama keluarga'
        }, {
          code: '2',
          name: ' kontrakan/apartemen/kos'
        }],
        titys:[{
          prov: "2",
          name: "Tersambung, janji bayar",
          code:"1"
        }, {
          prov: "2",
          name: "Tersambung, ingkar janji",
          code:"2"
        }, {
          prov: "2",
          name: "Nomor salah",
          code:"3"
        }, {
          prov: "2",
          name: "Reject",
          code:"4"
        }, {
          prov: "2",
          name: "Tidak dijawab, sedang dalam panggilan",
          code:"5"
        }, {
          prov: "2",
          name: "Tidak aktif",
          code:"6"
        }, {
          prov: "2",
          name: "Dialihkan",
          code:"7"
        }, {
          prov: "2",
          name: "Lainnya",
          code:"8"
        }, {
          prov: "1",
          name: "Tidak ada WhatsApp",
          code:"9"
        }, {
          prov: "1",
          name: "Sudah terkirim, belum dibaca",
          code:"10"
        }, {
          prov: "1",
          name: "Sudah dibaca, tidak dibalas",
          code:"11"
        }, {
          prov: "1",
          name: "Sudah dibaca, ingkar janji",
          code:"12"
        }, {
          prov: "1",
          name: "Sudah dibaca, janji bayar",
          code:"13"
        }, {
          prov: "1",
          name: "Protected",
          code:"14"
        }, {
          prov: "1",
          name: "Lainnya",
          code:"15"
        },{
          prov: "3",
          name: "Sudah terkirim, belum dibalas",
          code:"16"
        },{
          prov: "3",
          name: "Sudah terkirim, janji bayar",
          code:"17"
        },{
          prov: "3",
          name: "Sudah terkirim, ingkar janji",
          code:"18"
        },{
          prov: "3",
          name: "Tidak terkirim",
          code:"19"
        },{
          prov: "3",
          name: "Gagal terkirim",
          code:"20"
        },{
          prov: "3",
          name: "Lainnya",
          code:"21"
        },{
          prov: "4",
          name: "Mohon catat secara rinci untuk cara menghubungi nasabah melalu media apa ",
          code:"22"
        },{
          prov: "2",
          name: "Tersambung, bersedia dititipi pesan",
          code:"23"
        },{
          prov: "2",
          name: "Tersambung, tidak bersedia dititipi pesan",
          code:"24"
        },{
          prov: "2",
          name: "Tersambung, tidak kenal/sudah resign/tidak ada orang ini",
          code:"25"
        }],
        mobilecon:[{
          name:'Tersambung',code:1
        },{
          name:'Tidak Tersambung',code:2
        },{
          name:'Tidak yakin',code:3
        }],
        contactMode:'',
        addForm:{
          contactMode:'',
          contactResult:'',
          tema:'',
          remark:''
        },
        dialogVisible1:false,
        titleList:[],
        citys: [],
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

        // 基本信息
        baseInfList: {},
        historyData: [],
        jobInfList: {},
        connectInfList: [],
        cardbackInfList:{},//银行卡信息
        pairVerifySimilarity:'',
        // radio显示
        baseInfShow: true,
        jobInfShow: true,
        connectInfShow: true,
        insuranceHitOrNot: false,
        faceCheckShow: true,
        videoCheckShow: true,
        addtionInfShow: true,
        //备注
        baseInfRemark: '',
        isActive:'true',
        noActive:'false',
        jobInfRemark: '',
        connectInfRemark: '',
        isActive:true,
        noActive:false,
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
          attachmentName:"Kartu Kredit",
          attachmentType:4,
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
        ddzhuangtai :[{
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
        },{
          code: 'WAIT_CALLING',
          name: 'Menunggu panggilan luar',
          value:'17'
        },{
          code: "WAITING_CALLING_AFTER_FIRST_CHECK",
          name: "Menunggu panggilan luar setelah verifikasi awal",
          value:'18'
        },{
          code: "WAITING_CONFIRM",
          name: "menunggu konfirmasi",
          value:'19'
        },{
        code: "WAITING_SIGN_CONTRACT",
        name: "menunggu penandatanganan kontrak",
        value:'20'
      }],
        qingkuanglist : [{
          code: '0',
          name: 'Asrama/dorm/dalam sekolah'
        }, {
          code: '1',
          name: 'Rumah/ bersama keluarga'
        }, {
          code: '2',
          name: 'kontrakan/apartemen/kos'
        }],
        billData:[],
        billList:[{
          name:'menunggu pelunasan',code:1
        },{
          name:'terlambat-dalam proses pelunasan',code:2
        },{
          name:'sudah membayar',code:3
        },{
          name:'pelunasan terlambat',code:4
        }],
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

    // getOrderType(type){
    //   return enums.getOrderPro(type);
    // },
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
          "langue": 2,
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
              this.baseInfList.maritalStatus="Single"
            }else if(this.baseInfList.maritalStatus==1){
              this.baseInfList.maritalStatus="Menikah"
            }else if(this.baseInfList.maritalStatus == -1){
               this.baseInfList.maritalStatus="**"
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

          }else{
            this.baseInfList = {};
          }
        })
      },
      //获取银行卡状态
      getBankStatusInn(val) {
        return enums.getBankStatusInn(val);
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
      rowClick(row){
        window.open('#/completeOrderDetailInn?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
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
      this.$message("Berhasil");
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
</style>
