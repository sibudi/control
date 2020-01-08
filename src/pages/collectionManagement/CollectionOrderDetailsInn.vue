/**
* Created by tonggen on 2017/1/7.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan <el-button class="tp-title" type="primary" size="mini" @click="dialogVisible1 = true">Bukti Transfer</el-button></div>
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Status Permohonan:</span><span>{{getOrderType(orderStatus.status)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Pinjaman ulang:</span><span> <el-tag :type="orderStatus.isRepeatBorrowing==1?'danger':''"><span>{{orderStatus.isRepeatBorrowing==1?"Ya":"Bukan"}}</span></el-tag></span></div>
      </el-col>
    <!--   <el-col :span="8" class="grid-content">
        <div><span>审核标识:</span><span><el-tag :type="orderStatus.checkFlag==0?'success':'primary'"><span>{{checkFlag}}</span></el-tag></span></div>
      </el-col> -->
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <!--<el-col :span="8" class="grid-content">-->
        <!--<div><span>进件标识:</span><span>{{orderStatus.intoOrdFlag}}</span></div>-->
        <!--</el-col>-->
     <!--   <el-col :span="8" class="grid-content">
      <span>资金渠道:</span><span><el-tag type="danger">{{orderStatus.payChannel || '无'}}</el-tag></span> </el-col> -->
      <el-col :span="8" class="grid-content">
        <div><span>Tanda penagihan:</span><span>{{getOrderTag(orderStatus.collectionFlag)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{getdate(orderStatus.applyTime)}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Biaya pengelolaan akun terlambat:</span><span>{{orderStatus.overdueFee}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Denda akun terlambat:</span><span>{{orderStatus.overdueMoney}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Total biaya yang harus dibayar:</span><span>{{orderStatus.shouldPayAmount}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Total yang harus dibayar:</span><span>{{orderStatus.actualPayAmount}}</span></div>
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
    <div class="one-title">Proses Permohonan</div>
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
          <div class="one-title">Informasi dasar</div>
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
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
              <td>Identitas peminjam</td>
              <td>Sudah berkerja</td>
            </tr>
            <tr>
              <td>Alamat Detail Tempat Tinggal Sekarang</td>
              <td>{{baseInfList.detailed}}</td>
            </tr>
            <tr>
              <td>Alamat Email</td>
              <td>{{baseInfList.email}}</td>
            </tr>
          </table>

          <table v-if="familySeen" border='.1px' width="100%" style="table-layout:fixed;">
            <tr>
              <td>Nama Pengguna</td>
              <td>{{baseInfList.realName}}</td>
            </tr>
            <tr>
              <td>Jenis Identitas</td>
              <td>Ibu rumah tangga</td>
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
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
            <tr>
              <td>Alamat Email</td>
              <td>{{baseInfList.email}}</td>
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
              <td>Jenis Kelamin</td>
              <td>{{baseInfList.sex}}</td>
            </tr>
            <tr>
              <td>Nomor Ponsel</td>
              <td ref="divInfo"><div v-if="baseInfList.mobileNumberDES !=null "><el-tooltip  effect="dark" placement="top-start">
                <div slot="content">{{baseInfList.mobileNumberDES}}</div>
                <span>*********</span>
              </el-tooltip></div></td>
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
            <tr>
              <td>Alamat Email</td>
              <td>{{baseInfList.email}}</td>
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
          <div class="one-title">workerSeen</div>
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
              <td>No telepon perusahaan</td>
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
          <div class="one-title">workerSeen</div>
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
        <el-button @click="addRootReply(baseMobileList.mobile, 1)" type="success">Riwayat</el-button>
        <el-button @click="aotuCall(baseMobileList.mobile,1)" :disabled ="callflag1" type="success">panggilan keluar</el-button>
      </div>
    </el-row>
    <el-row v-if="contactmanage1">
      <div class="one-title">Telepon cadangan</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>Telepon cadangan nasabah</td>
            <td><div v-if="baseMobileListone.mobile !=null "><el-tooltip  effect="dark" placement="top-start">
              <div slot="content" >{{baseMobileListone.mobile}}</div>
              <span>*********</span>
            </el-tooltip></div></td>
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
        <el-button @click="addRootReplyby(baseMobileListone.mobile)" type="success">Riwayat</el-button>
        <el-button @click="aotuCall(baseMobileList.mobile,4)" :disabled ="callflag4" type="success">panggilan keluar</el-button>
      </div>
    </el-row>
    <el-row v-if="contactmanage2">
      <div class="one-title">No telepon perusahaan</div>
      <div class="asides">
        <table border='.1px' width="100%" style="table-layout:fixed;">
          <tr>
            <td>No telepon perusahaan</td>
            <td><div v-if="baseMobileListtwo.mobile !=null "><el-tooltip  effect="dark" placement="top-start">
              <div slot="content" >{{baseMobileListtwo.mobile}}</div>
              <span>*********</span>
            </el-tooltip></div></td>
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
        <el-button @click="addRoot(baseMobileListtwo.mobile)" type="success">Riwayat</el-button>
        <el-button @click="aotuCall(baseMobileList.mobile,2)" :disabled ="callflag2" type="success">panggilan keluar</el-button>
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

<el-dialog title=" Riwayat Penagihan" v-model="addDialogVisibleReply" :close-on-click-modal="false" size="tiny">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="Pilih Kontak">
     <el-select v-model="addForm.contactMode" placeholder="Silahkan pilih" clearable @change="getProv($event)">
      <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Hasil Kontak yang Dipilih">
   <el-select v-model="addForm.contactResult" placeholder="Silahkan pilih" clearable @change="funcRepay">
    <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
  </el-select>
</el-form-item>
<div v-if="repayflag">
  <el-form-item label="Keinginan Membayar">
    <el-rate v-model="repayList.repayDesire" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="kemampuan mengembalikan">
    <el-rate v-model="repayList.repayBility" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="Kualitas Pengguna">
    <el-rate v-model="repayList.userDiathesis" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
</div>

<el-form-item label="Keterangan Lainnya">
  <el-input type="textarea" placeholder="Keterangan Lainnya" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisibleReply = false">BATAL</el-button>
  <el-button type="primary" @click="tijiaoforReply(2)" >Kirim</el-button>
</div>
</el-dialog>

<el-dialog title=" Riwayat Penagihan" v-model="addDialogVisibleReplyby" :close-on-click-modal="false" size="tiny">
  <el-form :model="addForm" label-position="left" label-width="100px"  ref="addForm">
    <el-form-item label="Pilih Kontak">
     <el-select v-model="addForm.contactMode" placeholder="Silahkan pilih" clearable @change="getProv($event)">
      <el-option v-for="item in provs" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Hasil Kontak yang Dipilih">
   <el-select v-model="addForm.contactResult" placeholder="Silahkan pilih" clearable @change="funcRepay">
    <el-option v-for="item in citys" :label="item.name" :key="item.key" :value="item.value"></el-option>
  </el-select>
</el-form-item>
<div v-if="repayflag">
  <el-form-item label="Keinginan Membayar">
    <el-rate v-model="repayList.repayDesire" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="kemampuan mengembalikan">
    <el-rate v-model="repayList.repayBility" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
  <el-form-item label="Kualitas Pengguna">
    <el-rate v-model="repayList.userDiathesis" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
    </el-rate>
  </el-form-item>
</div>
<el-form-item label="Keterangan Lainnya">
  <el-input type="textarea" placeholder="Keterangan Lainnya" v-model="addForm.remark" :maxlength="300" :rows="5"></el-input>
</el-form-item>
</el-form>
<div slot="footer" class="dialog-footer">
  <el-button @click="addDialogVisibleReplyby = false">BATAL</el-button>
  <el-button type="primary" @click="tijiaoforReply(3)" >Kirim</el-button>
</div>
</el-dialog>
<div class="divid-line"></div>
<div v-if="contactmanage3">
 <el-row>
  <div class="one-title">Informasi Kontak yang Bisa Dihubungi</div>
  <template v-for="(item,index) in getlinkmanList">
   <div class="asides">
    <table border='.1px' width="40%" style="table-layout:fixed;float:left; margin:15px 15px;">
      <tr>
        <td>Nomor kontak yang bisa dihubungi{{index+1}}</td>
        <td>{{item.realName}}</td>
      </tr>
      <tr>
        <td>hubungan{{index+1}}</td>
        <td>{{item.relation}}</td>
      </tr>
      <tr>
        <td>Nomor kontak yang bisa dihubungi{{index+1}}</td>
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
        <td>Hasil Panggilan Keluar </td>
        <td>{{getmobilecon(item.callResult)}}</td>
      </tr>
      <div style="margin-left:15px;">
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
        <el-button @click="addRoot(item.mobile, index + 3)" type="success">Riwayat</el-button>
        <el-button @click="aotuCall(item.mobile,3)" :disabled ="callflag3" type="success">panggilan keluar</el-button>
      </div>
    </table>
  </div>
</template>
</el-row>
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
        <el-button @click="addRoot(item.mobile, 7)" type="success">Riwayat</el-button>
        <el-button @click="aotuCall(item.mobile,5)" type="success" :disabled="callflag5" >panggilan keluar</el-button>
      </table>
    </div>

  </el-row>
</template>
</div>
<div class="divid-line"></div>
<!-- 银行卡信息 -->
<el-row>
  <div class="one-title">Informasi kartu bank</div>
  <el-col :span="8" class="grid-content">
    <div><span>Jenis bank:</span><span>{{cardbackInfList.bankCode}}</span></div>
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
<!-- <div class="divid-line"></div> -->
<!-- <el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">Pengenalan Wajah</div>
      <div class="faceCheck">
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="facePhotoUrls"  @click.stop="facePhotoUrlClick"><br>Bukti pengenaan wajah</div>
        <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClick"><br>Foto pengguna memegang KTP</div>
        <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClick"><br>Foto KTP Tampak Depan</div>
      </div>
    </div>

  </div>
</el-row> -->
<!-- <div class="divid-line"></div> -->
<!-- 视频认证 videoCheck-->
<!-- <el-row v-if="videoShowOrNot">
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
<!-- 订单备注 -->
<el-row>
  <h1 class="one-title">Keterangan permohonan</h1>
  <div style="margin-bottom: 10px"></div>
  <el-table :data="orderRemarkList" v-loading="orderRemarkLoading" max-height="300">
    <el-table-column type="index" label="Num" width="100">
    </el-table-column>
    <el-table-column prop="createTime" label="Tambahkan waktu" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.createTime)}}</template>
    </el-table-column>
    <el-table-column prop="operator" label="Opsi" width="120">
    </el-table-column>
    <el-table-column prop="remark" label="Keterangan Lainnya" width="220">
    </el-table-column>
    <el-table-column prop="contactMobile" label="Telepon" width="120">
    </el-table-column>
    <el-table-column prop="contactMode" label="Kontak" width="120">
      <template scope="scope">{{getprovs(scope.row.contactMode)}}</template>
    </el-table-column>
    <el-table-column prop="contactResult" label="Status" width="120">
      <template scope="scope">{{getcitys(scope.row.contactResult)}}</template>
    </el-table-column>
    <el-table-column prop="orderTag" label="Tanda" width="100">
      <template scope="scope">{{getOrderTag(scope.row.orderTag)}}</template>
    </el-table-column>
    <el-table-column prop="alertTime" label="pemberitahuan selanjutnya" width="220">
      <template scope="scope">{{formatUnixTime(scope.row.alertTime)}}</template>
    </el-table-column>
  </el-table>
</el-row>
<div class="divid-line"></div>

<!-- 添加备注 -->
<el-row>
  <h1 class="one-title">Tambahkan tanda dan keterangan permohonan</h1>
  <el-form :model="addRemarkForm" :rule="addRemarkRule" ref="addRemarkForm" label-width="100px">
    <el-form-item label="Tulis keterangan" prop="remark">
      <el-input type="textarea" v-model="addRemarkForm.remark" :maxlength="300" :rows="5"></el-input>
    </el-form-item>
  </el-form>
  <el-form :inline="true" :model="tagForm" :rule="addRemarkRule" label-width="100px" ref="addRemarkForm">
    <el-form-item label=" Pilih tanda" prop="remark">
      <el-select v-model="tagForm.orderTag" placeholder="Silahkan pilih" clearable>
        <el-option v-for="item in tagList" :label="item.name" :key="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item><br>
    <el-form-item label="Tambahkan waktu" prop="remindTime">
      <el-date-picker v-model="tagForm.remindDate" type="date" placeholder="Silahkan pilih" :picker-options="pickerOptions"></el-date-picker>
      <el-time-select placeholder="Silahkan pilih" v-model="tagForm.remindTime" :picker-options="pickerTimeOptions"></el-time-select>
      （Opsional）
    </el-form-item>
    <el-form-item label="Hari Gajian">
     <el-select v-model="tagForm.payDay" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in payDayList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="saveTagForm" :loading="tagFormLoading">Tandai</el-button>
  </el-form-item>
  <el-form-item label=" Janji waktu pembayaran" prop="promiseRepaymentTime">
    <el-date-picker v-model="tagForm.promiseDate" type="date" placeholder="Silahkan pilih" :picker-options="pickerOptions"></el-date-picker>
    <el-time-select placeholder="Silahkan pilih" v-model="tagForm.promiseTime" :picker-options="pickerTimeOptions"></el-time-select>
    （Opsional）
  </el-form-item>
</el-form>
</el-row>
<div class="divid-line"></div>
<el-row v-if="D0CollectionSmsShow">
  <div class="one-title">Kirim SMS</div>
  <el-table :data="SmSData"  v-loading="SmSDataLoading" size="large">
    <el-table-column prop="id" min-width="210" label="No.urut"></el-table-column>
    <el-table-column prop="sender" min-width="210" label="Pengirim SMS"></el-table-column>
    <el-table-column prop="receiveType" min-width="210" label=" Penerima SMS"></el-table-column>
    <el-table-column prop="sendTime" min-width="210" label="Waktu pengiriman">
     <template scope="scope">
      {{getdate(scope.row.sendTime)}}
    </template>
  </el-table-column>
  <el-table-column prop="smsTitle" min-width="210" label="Header SMS"></el-table-column>
</el-table>
<div class="heihher"></div>
<el-form>
  <el-form-item label="Penerima SMS" v-if="notdzero">
    <el-select v-model="searchForm.collectionSmsType" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in SJList" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Penerima SMS" v-if = "isdzero">
    <el-select v-model="searchForm.collectionSmsType" placeholder="Silahkan pilih" clearable>
      <el-option v-for="item in SJListD0" :label="item.name" :key="item.code" :value="item.code"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Pilih header SMS" prop="smsTemplateId" >
    <el-select v-model="searchForm.smsTemplateId" placeholder="Silahkan pilih" clearable @change="titlenex" >
      <el-option  v-for="item in titleList" :label="item.smsTitle" :key="item.smsTemplateId" :value="item.smsTemplateId" ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="Preview" prop="smsContent">
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
  <!-- <el-button type="primary" @click="SmsFor">Kirim SMS</el-button> -->
  <el-button type="primary" @click="SmsFor" :disabled="oneceSms">{{onececontent}}</el-button>
</el-form-item>
</el-form>
</el-row>
<div class="divid-line"></div>
<el-row>
 <div class="one-title">Riwayat Permohonan</div>
 <el-table :data="historyData" width="100%" v-loading="historyLoading" size="large">
   <el-table-column prop="uuid" min-width="300" label="Nomor Permohonan"></el-table-column>
   <el-table-column prop="status" min-width="200" label="Hasil Verifikasi">
     <template scope="scope">
       <span>{{getOrderType(scope.row.status)}}</span>
     </template>
   </el-table-column>
   <el-table-column prop="amountApply" min-width="200" label="Jumlah pinjaman"></el-table-column>
   <el-table-column prop="borrowingTerm" min-width="250" label="Urutan Pengajuan">
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
      tagList: [{
        code: '1',
        name: 'Tidak tersambung'
      },{
        code: '2',
        name: 'Sementara tidak tersambung'
      },{
        code: '3',
        name: 'Tersambung, ingkar janji'
      },{
        code: '4',
        name: 'Tersambung, memberi janji'
      }],
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
      notdzero:false,
      isdzero:true,
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
      // companyPhoneShow:true,
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
      contactmanage:true,
      dialogVisible1:false,
      contactmanage1:true,
      contactmanage2:true,
      contactmanage3:true,
      contactmanage4:true,
      totalLinkMan: 0,//通讯录个数
      historyLoading: false,
      orderRemarkList:[], //订单备注
      payDayList:[],
      callflag1:false,
      callflag2:false,
      callflag3:false,
      callflag4:false,
      callflag5:false,
      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          userUuid: '', //订单编号;
          collectionFlag:''
        },
        status: '', //审核结果
        remark: '', //审核意见
        oneceSms: false,
        onececontent:'Kirim SMS',
        totalTime: 10,
        canClick: true,
        textarea: '',
        totalLinkMan: 0,//通讯录个数
        linkData: [],//通讯录
        dicFlag: [],//通讯录标签
        callLogData: [],//通话Riwayat
        moxieCallLogData: [],//通话Riwayat
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
        orderRemarkLoading: false,
        isActive:true,
        noActive:false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        addDialogVisible: false,
        addDialogVisibleReply: false,
        addDialogVisibleReplyby: false,
        voicePhone:'',
        callflag:false,
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        smsContent:' ',
        contactType: 0,
        SJList:[{
          name:'Riwayat panggilan 30 pertama',code:'CALL_RECORD_TOP_30'
        },{
          name:'Riwayat panggilan 20 pertama',code:'CALL_RECORD_TOP_20'
        },{
          name:'Riwayat panggilan 10 pertama',code:'CALL_RECORD_TOP_10'
        },{
          name:'Riwayat panggilan 5 pertama',code:'CALL_RECORD_TOP_5'
        }],
        SJListD0:[{
          name:'Riwayat panggilan 5 pertama',code:'CALL_RECORD_TOP_5'
        }],
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
        repayflag:false,
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
       id:'',
        linkData: [],//通讯录
        dialogTableVisible: false,
        moxieCallLogDialog: false,
        facePhotoUrls:'',
        moxieCallLogLoading: false,
        isTrueMXCall:false,
        workerSeen: true,
        studentSeen: false,
        familySeen: false,
        repayList: {
          repayDesire:'',
          repayBility:'',
          userDiathesis:'',
        },
        SmSDataLoading: false,
        videoShowOrNot: true,
        SmSData:[],
        userUuid: "",
        searchForm:{
          collectionSmsType:'',
          smsTitle:'',
          smsTemplateId:'',
        },
        D0CollectionSmsShow: true,
        bankList:[],
        uuid: "",
        IsStudents: false,
        active: 2,
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
          promiseTime: '',
          promiseDate: '',
        },       //订单标签
        tagFormLoading:false,
        smsFormLoading:false,
      }
    },
    methods: {
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
    SmsFor() {
      this.oneceSms=true;
      if (!this.canClick) return
       this.canClick = false
     this.onececontent = this.totalTime + 's'
     let clock = window.setInterval(() => {
      this.totalTime--
      this.onececontent = this.totalTime + 's'
      if (this.totalTime < 0) {
       window.clearInterval(clock)
       this.onececontent = 'Kirim SMS'
       this.totalTime = 10
       this.oneceSms=false;
   this.canClick = true  //这里重新开启
 }
},1000)
     if (!this.searchForm.smsTemplateId) {
      this.$message("Silakan pilih judul pesan teks");
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
        this.$message("Sedang mengirim ");
        this.smsFormLoading = false;
      }else{
        this.$message.error(response.body.message);
        this.gettitleList();
      }
    },response => {});
  },
  titlenex() {
    this.titleList.forEach(obj => {

      if (obj.smsTemplateId == this.searchForm.smsTemplateId) {
        this.smsContent = obj.smsContent;
        return
      }
    });

  },
     // SMS
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
    initDays() {

      for(let index = 1; index <32; index++) {
       let initDay = {name:'',code:''};
       initDay.code = index;
       initDay.name = index;
       this.payDayList.push(initDay);
     }
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

  gettitleList() {
    let _data = Object.assign({
      orderNo:this.uuid,
      userUuid:this.userUuid,
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
  getContractType(type) {
    if (type == '0') {
      return 'Tidak diangkat';
    }
    if (type == '1') {
      return 'panggilan masuk';
    }
    if (type == '2') {
      return 'panggilan keluar';
    }
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
    //  if(!this.companyPhoneShow) {
    //   this.baseMobileListtwo.mobile = '*********';
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

funcRepay(){
  if (this.addForm.contactMode == 2 && (this.addForm.contactResult == 1 || this.addForm.contactResult == 2)) {
    this.repayflag = true;
    if (this.repayList.repayDesire =='' || this.repayList.repayBility =='' || this.repayList.userDiathesis =='') {
      this.$message("Beri dia penilaian");
      return;
    }
  }else{
    this.repayflag = false;
  }
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
      this.$message("success");
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
getProv(prov){
  let tempCity=[];
  this.citys=[];
  this.selectCity='';
  let allCity=[{
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
  }];
  for (var val of allCity){
    if (prov == val.prov){
      console.log(val);
      tempCity.push({name: val.name, value: val.code,key:val.code})
    }
  }
  this.citys = tempCity;
},
      //获取银行卡状态
      getBankStatusInn(val) {
        return enums.getBankStatusInn(val);
      },
      getOrderPro(val) {//订单进度
        return enums.getOrderPro(val)
      },
      getTop20ContactList(channel) {
         this.$http.post("manage/orderUserCallRecordMongoByUuid",{uuid:this.userUuid,dataType:1,orderNo:this.uuid,channel:channel}).then((response) =>{   //通话Riwayat
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
      // 通讯录信息按钮
      addressBook(){
        this.dialogTableVisible = true;
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
      getOrderTag(type){
        return enums.getOrderTagList(type);
      },
      formatUnixTime(time){
        return DataUtil.formatUnixTimeInn(time);
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
            if(this.orderStatus
              .collectionLevel =="D0"){
              // this.companyPhoneShow = false;
            this.notdzero = false;
            this.isdzero = true;
          }else{
            // this.companyPhoneShow =true;
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
        this.ddzhuangtai.forEach(function (obj) {
          if(obj.code == val){
            re = obj.name;
            return;
          }
        });
        return re;
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
    //通话Riwayat
    moxieCallLog(){
      this.moxieCallLogDialog = true;
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
              this.baseInfList.maritalStatus=" Menikah"
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
          if (1 == response.body.code) {
            let {body} = response;
            if(1 == body.code && body.data){
              this.totalLinkMan = body.data.length;
              this.linkData = body.data;
            }
          }
        })
      },
      rowClick(row){
        window.open('#/CollectionOrderDetails?seen=true&userUuid='+row.userUuid+
          '&uuid='+row.uuid);
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
          "langue":2,
        }
        let urlss = 'manage/orderUserDataSql';
        this.$http.post(urlss, _data).then(response => {
          this.historyLoading = false;
          if (1 == response.body.code) {
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
              // if (!this.companyPhoneShow) {
              //   this.jobInfList.companyPhone = '**********';
              // }
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
          this.$message.error("Label permohonan");
          return false;
        }
        if(this.addRemarkForm.remark&&this.addRemarkForm.remark.length > 300){
          this.$message.error(" Mohon mengisi dengan benar ");
          return false;
        }
        // if(!this.tagForm.remindDate && this.tagForm.remindTime){
        //   this.$message.error('Pilih hari');
        //   return false;
        // }
        // if(this.tagForm.remindDate && !this.tagForm.remindTime){
        //   this.$message.error('Pilih waktu spesifik');
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
            window.location.reload();
          }
          this.tagFormLoading = false;
        }).catch(e =>{this.saveRemarkFormLoading = false;})
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
      pageInit() {
        this.userName = DataUtil.userName()
        this.employeeNumber = DataUtil.employeeNumber()
        //this.userUuid = DataUtil.uuid()
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
                response.body.data.forEach(elem =>{
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
                } else if (elem.type = 'comPhone:' && !elem.result) {
                  this.jobInfList.companyPhone = '**********';
                  this.baseMobileListtwo.mobile = '*********';
                }
              })

              }
            })
          } else {
            this.D0CollectionSmsShow = false;
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
  .heihher {
   height: 20px;
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
