/**
* Created by alan on 2017/3/10.
*/
<template>
  <section class="orderBox">
    <div class="divid-line"></div>
    <!-- 订单状态 -->
    <el-row>
      <div class="one-title">Status Permohonan</div>  <!-- 订单状态 -->
      <el-col :span="8" class="grid-content">
        <div><span>Nomor Permohonan:</span><span>{{ uuid }}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Waktu Pengajuan:</span><span>{{orderStatus.createTime}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Urutan Pengajuan:</span><span><el-tag :type="orderStatus.orderStep==0?'success':'primary'"><span>{{"Pengajuan ke-"+orderStatus.orderStep}}</span></el-tag></span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Jumlah pinjaman:</span><span>{{orderStatus.amountApply}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Durasi pinjaman:</span><span>{{orderStatus.borrowingTerm}}</span></div>
      </el-col>
      <el-col :span="8" class="grid-content">
        <div><span>Petugas manual pertama:</span><span>{{orderStatus.firstChecker}}</span></div>
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
    </el-row>
    <div class="divid-line"></div>
    <el-row>
      <div class="one-title">Riwayat Permohonan</div>
      <el-table :data="historyData" v-loading="historyLoading" @row-click="rowClick" size="large">
        <el-table-column prop="borrowingCount" width="180" label="Urutan Pengajuan"></el-table-column>
        <el-table-column prop="createTime" width="200" label="Waktu Pengajuan">
          <template scope="scope">
            <span>{{getdate(scope.row.createTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="uuid" width="240" label="Nomor Permohonan"></el-table-column>
        <el-table-column prop="status" width="240" label="Hasil Verifikasi">
          <template scope="scope">
            <span>{{getOrderPro(scope.row.status)}}</span>
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
              <td>Sudah bekerja</td>
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
          <div class="faceCheck">
            <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClickone"><br>Foto KTP Tampak Depan</div>
          </div>
          <!--<div class="faceCheck" v-if="insuranceHitOrNot">-->
            <!--<div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.insuranceCardUrl"  @click.stop="insuranceCardUrl"><br>Foto BPJS</div>-->
            <!--</div>-->
            <!--<div class="faceCheck" v-if="(familyCard&&!insuranceHitOrNot) || ((familyCardControl1||familyCardControl2)&&familyCard)">-->
              <!--<div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img :src="baseInfList.kkCardPhoto"  @click.stop="kkCardPhotourl"><br>kartu keluarga</div>-->
              <!--</div>-->
            </div>
            <div class="mains">
              <div class="check_rule">
                <el-form label-width="140px">
                  <el-form-item label="Peraturan verifikasi">
                    <el-button @click="baseInfSave" type="primary" size="small">Simpan</el-button>
                    <el-button @click="baseInfEdit" type="primary" size="small">Ubah</el-button>
                  </el-form-item>
                </el-form>
                <template v-for="(item,index) in baseRuleList">
                  <div class="question_radio">
                    <div class="question_text">{{item.descriptionInn}}</div>
                    <div class="radio_box">
                      <el-checkbox :disabled="baseInfShow" v-model="item.ruleResult"></el-checkbox>
                    </div>
                  </div>
                </template>
              </div>
              <div class="other_remark smallRemark">
                <div class="aside_title">Keterangan Lainnya</div>
                <el-input
                type="textarea"
                class = 'textarear'
                :rows="12"
                placeholder=""
                :disabled="baseInfShow"
                v-model="baseInfRemark">
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
            <div class="one-title">Informasi perusahaan</div>
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
          <div class="mains">
            <div class="check_rule">
              <el-form label-width="140px">
                <el-form-item label="Peraturan verifikasi">
                  <el-button @click="jobInfSave" type="primary" size="small">Simpan</el-button>
                  <el-button @click="jobInfEdit" type="primary" size="small">Ubah</el-button>
                </el-form-item>
              </el-form>
              <template v-for="(item,index) in jobRuleList">
                <div class="question_radio">
                  <div class="question_text">{{item.descriptionInn}}</div>
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
          <div class="one-title">Informasi perusahaan</div>
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
        <div class="mains">
          <div class="check_rule">
            <el-form label-width="140px">
              <el-form-item label="Peraturan verifikasi">
                <el-button @click="jobInfSave" type="primary" size="small">Simpan</el-button>
                <el-button @click="jobInfEdit" type="primary" size="small">Ubah</el-button>
              </el-form-item>
            </el-form>
            <template v-for="(item,index) in jobRuleList">
              <div class="question_radio">
                <div class="question_text">{{item.descriptionInn}}</div>
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
        <div class="one-title">Informasi Perguruan Tinggi</div>
        <table id="studentsInf" border='.1px' width="100%" style="table-layout:fixed;">
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
            <td>Foto Kartu Pelajar</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.studentCardUrl" alt="" @click.stop="studentCardUrlClick"></td>
          </tr>
          <tr>
            <td>Foto Beasiswa</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.scholarshipUrl" alt="" @click.stop="scholarshipUrlClick"></td>
          </tr>
          <tr>
            <td>Foto Sertifikat Bahasa Inggris</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.englishUrl" alt="" @click.stop="englishUrlClick"></td>
          </tr>
          <tr>
            <td>Foto Sertifikat Komputer</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.ComputerUrl" alt="" @click.stop="ComputerUrlClick"></td>
          </tr>
          <tr>
            <td>Foto Kartu Sekolah Lainnya</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.schoolCardUrl" alt="" @click.stop="schoolCardUrlClick"></td>
          </tr>
          <tr>
            <td>Foto Piagam/Sertifikat Lomba</td>
            <td><ml-photo-box ref='photoBox'></ml-photo-box><img :src="jobInfList.otherCertificateUrl" alt="" @click.stop="otherCertificateUrlClick"></td>
          </tr>
        </table>
      </div>
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="80px">
            <el-form-item label="Peraturan verifikasi">
              <el-button @click="jobInfSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="jobInfEdit" type="primary" size="small">Ubah</el-button>
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in jobRuleList1">
            <div class="question_radio">
              <div class="question_text">{{item.descriptionInn}}</div>
              <div class="radio_box">
                <el-checkbox :disabled="jobInfShow" v-model="item.ruleResult"></el-checkbox>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="other_remark">
      <div class="aside_title">Keterangan Lainnya</div>
      <el-input
      type="textarea"
      class = 'textarear'
      :rows="4"
      placeholder=""
      :disabled="jobInfShow"
      v-model="jobInfRemark">
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
        <tr>
          <td>Nomor telepon sekunder</td>
          <td>{{connectInfList.alternatePhoneNo}}</td>
        </tr>
      </table>
    </div>
    <div class="mains">
      <div class="check_rule">
        <el-form label-width="140px">
          <el-form-item label="Peraturan verifikasi">
            <el-button @click="connectInfSave" type="primary" size="small">Simpan</el-button>
            <el-button @click="connectInfEdit" type="primary" size="small">Ubah</el-button>
          </el-form-item>
        </el-form>
        <template v-for="(item,index) in connectRuleList">
          <div class="question_radio">
            <div class="question_text">{{item.descriptionInn}}</div>
            <div class="radio_box">
              <el-checkbox :disabled="connectInfShow" v-model="item.ruleResult"></el-checkbox>
            </div>
          </div>
        </template>
        <!--<div class="question_radio">-->
          <!--<div class="question_text">2、kontak yang bisa dihubungi kemungkinan adalah pendaftar itu sendiri？</div>-->
          <!--<div class="radio_box">-->
            <!--<el-checkbox :disabled="connectInfShow" v-model="connectRuleList[1].ruleResult"></el-checkbox>-->
            <!--</div>-->
            <!--</div>-->
          </div>
          <div class="other_remark smallRemark">
            <div class="aside_title">Keterangan Lainnya</div>
            <el-input
            type="textarea"
            class = 'textarear'
            :rows="4"
            placeholder=""
            :disabled="connectInfShow"
            v-model="connectInfRemark">
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
        &nbsp;&nbsp;
        <!--    <span class="titlePhone"><span v-if="pairVerifySimilarity.indexOf('face') == -1">Nilai pengenalan wajah：</span>  {{pairVerifySimilarity}}</span> -->
        <div class="faceCheck">
          <div class="faceImgTop"><ml-photo-box ref='photoBox'></ml-photo-box><img class="handleImg" :src="baseInfList.handIdCardUrl"  @click.stop="handIdCardUrlClickone"><br>Swafoto</div>
          <div class="faceImgBottom"><ml-photo-box ref='photoBox'></ml-photo-box><img  :src="baseInfList.idCardUrl"  @click.stop="idCardUrlClickone"><br>Foto KTP Tampak Depan</div>
        </div>
      </div>
      <div class="mains">
        <div class="check_rule">
          <el-form label-width="140px">
            <el-form-item label="Peraturan verifikasi">
              <el-button @click="faceCheckSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="faceCheckEdit" type="primary" size="small">Ubah</el-button>
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in faceCheckRuleList">

            <span v-if="index <= 3 || (Personimg && index > 3)">
              <div class="question_radio">
                <div class="question_text">{{item.descriptionInn}}</div>
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
          <div class="aside_title">Keterangan Lainnya</div>
          <el-input
          type="textarea"
          class = 'textarear'
          :rows="9"
          placeholder=""
          :disabled="faceCheckShow"
          v-model="faceCheckRemark">
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
      <div class="one-title">Sertifikasi Video</div>
      <el-button @click="searcher" type="primary">putar</el-button>
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
      <el-form label-width="140px">
        <el-form-item label="Peraturan verifikasi">
          <el-button @click="videoCheckSave" type="primary" size="small">Simpan</el-button>
          <el-button @click="videoCheckEdit" type="primary" size="small">Ubah</el-button>
        </el-form-item>
      </el-form>
      <div class="question_radio">
        <div class="question_text">1、Orang dalam video bukanlah nasabah itu sendiri?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[0].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">2、Video tersebut dibaca oleh seseorang / seseorang diinstruksikan?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[1].ruleResult"></el-checkbox>
        </div>
      </div>
      <div class="question_radio">
        <div class="question_text">3、Tidak terlihat jelas / wajah tidak terlihat? </div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[2].ruleResult"></el-checkbox>
        </div>
      </div>
     <div class="question_radio">
        <div class="question_text">4、nasabah tidak membaca teks dalam video?</div>
        <div class="radio_box">
          <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
        </div> -->
          <!--</div>
          <div class="question_radio">
            <div class="question_text">4、kerusakan video？</div>
            <div class="radio_box">
              <el-checkbox :disabled="videoCheckShow" v-model="videoCheckRuleList[3].ruleResult"></el-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="other_remark">
        <div class="aside_title">Keterangan Lainnya</div>
        <el-input
        type="textarea"
        class = 'textarear'
        :rows="4"
        :disabled="videoCheckShow"
        placeholder=""
        v-model="videoCheckRemark">
      </el-input>
    </div>
  </div>
</el-row> -->
<!-- <div class="divid-line"></div> -->
<!-- 补充信息 addtionInf-->
<el-row>
  <div class="containers">
    <div class="asides">
      <div class="one-title">Informasi Tambahan</div>
      <div class="faceCheck">
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[0].attachmentUrl" @click.stop="attachmentUrl0"><br>Kartu Kredit
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[1].attachmentUrl" @click.stop="attachmentUrl1"><br>SIM
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[2].attachmentUrl" @click.stop="attachmentUrl2"><br>identitas paspor anda
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[3].attachmentUrl" @click.stop="attachmentUrl3"><br>KK
        </div>
        <div class="faceImg" v-if="workerSeen">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[4].attachmentUrl" @click.stop="attachmentUrl4"><br>Slip gaji
        </div>
        <div class="faceImg">
          <ml-photo-box ref='photoBox'></ml-photo-box><img :src="addtionInfList[5].attachmentUrl" @click.stop="attachmentUrl5"><br>Mutasi bank
        </div>
      </div>
      <div class="other_remark smallRemark">
        <el-form>
          <el-form-item>
            <el-col ><div class="lastTitle">Keterangan Lainnya</div><el-button @click="addtionInfSave" type="primary" size="small">Simpan</el-button>
              <el-button @click="addtionInfEdit" type="primary" size="small">Ubah</el-button></el-col>
              <el-col :span="12">
              </el-col>
            </el-form-item>
          </el-form>
          <template v-for="(item,index) in otherCheckRuleList">
            <span v-if="index <= 4 || (creaditShowOrNot && index > 4)">
              <div class="question_radio">
                <div class="question_text">{{item.descriptionInn}}</div>
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
      <el-input
      type="textarea"
      class = 'textarear'
      :rows="6"
      placeholder=""
      :disabled="addtionInfShow"
      v-model="addtionInfRemark">
    </el-input>
  </div>
</div>
</el-row>
<!-- 提交   -->
<el-form id="btnForm">
  <el-form-item align="right">
    <el-button @click="dialogVisible1 = true" type="primary">Rekomen untuk tolak</el-button>
    <el-button @click="dialogVisible = true" type="primary">Kirim</el-button>
  </el-form-item>
</el-form>
<el-dialog
title="Rekomendasi"
:visible.sync="dialogVisible"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>Apakah Anda yakin mengirim hasil verifikasi ini?
</el-col>
<el-col>
  <i>Hasil Verifikasi:</i>
  <el-radio-group v-model="radio">
    <el-radio :label="1">Best</el-radio>
    <el-radio :label="2">Baik</el-radio>
    <el-radio :label="3">Normal</el-radio>
    <el-radio :label="6">Diragukan</el-radio>
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
  <el-button @click="dialogVisible = false">BATAL</el-button>
  <el-button type="primary" @click="reviewDialog(1)">Kirim</el-button>
</span>
</el-dialog>
<el-dialog
title="Rekomen untuk tolak"
:visible.sync="dialogVisible1"
width="50%">
<el-col>
  <i class="el-icon-warning"></i>Apakah Anda yakin mengirim hasil verifikasi ini?
</el-col>
<el-col>
  <i>Hasil Verifikasi:</i>
  <el-radio v-model="radio" label="4">tidak cocok kualifikasi</el-radio>
  <el-radio v-model="radio" label="5">informasi tidak sama</el-radio>
</el-col>
<el-input
type="textarea"
:rows="6"
placeholder=""
v-model="reviewRemark1"
class = 'textarear'>
</el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible1 = false">BATAL</el-button>
  <el-button type="primary" @click="reviewDialog(2)">Kirim</el-button>
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
      facePhotoUrls:'',
      videoShowOrNot: true,
      creaditShowOrNot:false,
      creaditFirstShowOrNot: false,
      creaditSecondShowOrNot: false,
      creaditThirdShowOrNot: false,
      creaditForthShowOrNot: false,
      orderStatus: {
          borrowingCount: '',//借款次数
          createTime: '',//申请时间
          uuid: '', //订单编号;
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
        burningTime:'',

        // 基本信息
        baseInfList: {},
        historyData: [],
        flager:true,
        jobInfList: {},
        connectInfList: [],
        familyCard: false,
        comphoneLag:false,

        // check显示
        baseInfShow: false,
        jobInfShow: false,
        connectInfShow: false,
        faceCheckShow: false,
        videoCheckShow: false,
        addtionInfShow: false,
        //备注
        baseInfRemark: '',
        jobInfRemark: '',
        connectInfRemark: '',
        faceCheckRemark: '',
        videoCheckRemark: '',
        addtionInfRemark: '',
        // Peraturan verifikasi
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
        attachmentUrl: require("../../assets/noneInn.png")
      },{
        attachmentName:"驾驶证",
        attachmentType:5,
        attachmentUrl: require("../../assets/noneInn.png")
      },{
        attachmentName:"护照",
        attachmentType:6,
        attachmentUrl: require("../../assets/noneInn.png")
      },{
        attachmentName:"家庭卡",
        attachmentType:7,
        attachmentUrl: require("../../assets/noneInn.png")
      },{
        attachmentName:"工资卡",
        attachmentType:8,
        attachmentUrl: require("../../assets/noneInn.png")
      },{
        attachmentName:"银行卡流水",
        attachmentType:9,
        attachmentUrl: require("../../assets/noneInn.png")
      }],
      workerSeen: true,
      studentSeen: false,
      familySeen: false,
      isActive:true,
      noActive:false,
      userUuid: "",
      Personimg:false,
      dricheck: true,
      uuid: "",
      radio:"",
      IsStudents: false,
      sessionId: '',
      dialogVisible: false,
      dialogVisible1:false,
      reviewRemark: '',
      reviewRemark1: '',
      pairVerifySimilarity: '',
      faceShowOrNot: false,
      hitOrNot: false,
      insuranceHitOrNot: false,
      familyCardControl1: false,
      familyCardControl2: false,
        //印尼版订单进度
        orderPros:[{
          code: "1",
          name: "Menunggu mengirim"
        },{
          code: "2",
          name: "menunggu verifikasi otomatis"
        }, {
          code: "3",
          name: "Menunggu verifikasi manual pertama"
        },{
          code: "4",
          name: "Menunggu verifikasi manual akhir "
        }, {
          code: "5",
          name: "Menunggu dana cair"
        },{
          code: "6",
          name: "Dalam proses pencairan dana"
        },{
          code: "7",
          name: "Menunggu pelunasan pinjaman",
        },{
          code: "8",
          name: "Menunggu pelunasan pinjaman (terlambat)"
        },{
          code: "9",
          name: "Dalam proses pelunasan pinjaman"
        },{
          code: "10",
          name: "Pelunasan tepat waktu "// 订单生命周期完成 (正常完成)
        },{
          code: "11",
          name: "Pelunasan terlambat "// 订单生命周期完成 (正常完成)
        },{
          code: "12",
          name: "Tidak lulus verifikasi otomatis"// (异常完成)
        },{
          code: "13",
          name: "Tidak lulus verifikasi manual pertama"// (异常完成)
        },{
          code: "14",
          name: "Tidak lulus verifikasi manual akhir"// (异常完成)
        },{
          code: "15",
          name: "Permohonan dibatalkan"// 因为审核不通过被取消，订单生命周期完成(异常完成)
        }]
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
      // Ubah按钮click
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
      },
      videoCheckEdit(){
        this.videoCheckShow=false;
      },
      addtionInfEdit(){
        this.addtionInfShow=false;
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
      // Simpan按钮
      baseInfSave(){
        if(this.baseInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.baseInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
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
      jobInfSave(){
        if(this.jobInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.jobInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      connectInfSave(){
        if(this.connectInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.connectInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      faceCheckSave(){
        if(this.faceCheckShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.faceCheckShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      videoCheckSave(){
        if(this.videoCheckShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.videoCheckShow=true;
          }else{
            this.$message('Verifikasi gagal');
          }
        })
      },
      creditCheckShowOrNot() {
        if (this.otherCheckRuleList[4].ruleResult == true) {
          this.creaditShowOrNot = true;
        }else {
          this.creaditShowOrNot = false;
        }

      },
      addtionInfSave(){
        if(this.addtionInfShow==true){
          this.$message('Ubah dulu, lalu simpan.');return;
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
            this.$message('Berhasil menyimpan');
            this.addtionInfShow=true;
          }else{
            this.$message('Verifikasi gagal');
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
            }else if(this.orderStatus.userRole==3){
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
          return re
        }else{
          return enums.getOrderPro(val)
        }
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
//       faceCheckShowOrNot() {
//         if (this.faceCheckRuleList[2].ruleResult == true) {
//          this.dricheck = false;
//        // this.faceCheckRuleList[10].ruleResult = true;
//        // this.faceCheckRuleList[11].ruleResult = true;

//        if ((this.addtionInfList[1].attachmentUrl && this.addtionInfList[2].attachmentUrl
//         && this.addtionInfList[1].attachmentUrl != '/static/img/none.51d2a6c.png'
//         || this.addtionInfList[2].attachmentUrl != '/static/img/none.51d2a6c.png')) {
//         this.faceShowOrNot = true;
//     } else {
//       this.faceCheckRuleList[2].ruleLevel = 3;

//     }
//   }else{
//     this.dricheck = true;
//     // this.faceCheckRuleList[10].ruleResult = false;
//     //    this.faceCheckRuleList[11].ruleResult = false;
//   }
// },
personCheckShowOrNot() {
  if (this.faceCheckRuleList[3].ruleResult == true) {
   this.Personimg = true;
 }else {
  this.Personimg = false;
}

},
      //活体识别分
      // getPairVerifySimilarity(){
      //   let _data={
      //     "userUuid":this.userUuid,
      //     "orderNo":this.uuid
      //   }
      //   this.$http.post("manage/getPairVerifySimilarity", _data).then(response => {
      //     if (1 == response.body.code) {
      //       this.pairVerifySimilarity = response.body.data;
      //     }
      //     if (this.pairVerifySimilarity >40 && this.pairVerifySimilarity <60 && this.addtionInfList[1].attachmentUrl) {
      //      this.flager = true;
      //    }else {
      //      this.flager = false;
      //    }
      //  })
      // },
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
            this.$message.error("Silakan isi keterangan atau hasil verif tahap pertama");
            return ;
          }
        }else{
          if (this.reviewRemark1 == '' && !this.radio) {
            this.$message.error("Silakan isi keterangan atau hasil verif tahap pertama");
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
        // if (type ==2) {
        //   this.dialogVisible1=true;
        //   this.dialogVisible=false;

        // } else if (type ==1) {
        //   this.dialogVisible=true;
        //   this.dialogVisible1=false;
        // }

        let _data={
          "remark": type == 1 ? this.reviewRemark : this.reviewRemark1,  //必填
          "unPass": type == 2,
          "orderNo": this.uuid,
          "sessionId": this.sessionId,
          "type" : this.radio,
          "burningTime":this.burningTime
        }
        this.$http.post("manage/firstCheck", _data).then(response => {
          if (1 == response.body.code) {
            this.dialogVisible=false;
            this.dialogVisible1=false;
            this.$message("Berhasil menyimpan");
            window.close();
            window.opener.location.reload('#/RiviewTheListFirstInn');
            return;
          }else{
            this.$message(response.body.message);
            this.dialogVisible=false;
            this.dialogVisible1=false;
            window.close();
            window.open('#/RiviewTheListFirstInn');
            return;
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
.textarear .el-textarea__inner{
  font-size:15px;
  font-weight: 900;
}
</style>
