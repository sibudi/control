<!-- 分配人员管理 -->
<template>
	<section>
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" border>
      <el-table-column label="阶段" width="100" prop = "sysStage"></el-table-column>
      <el-table-column label="D0" prop="sysValue1">
        <template scope="scope">
          <el-switch name="index++"
          v-model="scope.row.sysValue1"
          active-text="开"
          inactive-text="关" @change="updateCollectionSms(scope.row.sysKey1, scope.row.sysValue1)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="D1以上" prop="sysValue2">
      <template scope="scope">
        <el-switch name="index++"
        v-model="scope.row.sysValue2"
        active-text="开"
        inactive-text="关" @change="updateCollectionSms(scope.row.sysKey2, scope.row.sysValue2)">
      </el-switch>
    </template>
  </el-table-column>
</el-table>

</section>
</template>
<script>
export default {
  data() {
    return {
      gridData: [],
      gridLoading: true,
    }
  },
  methods: {
    bindGrid() {
      this.$http.post('manage/smsTemplate/listContactSwitch',{}).then(response => {
        this.gridLoading = false;
        let {body} = response;
        if(body.code ==1){
          let tempData = body.data;
          let tempObject1 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          let tempObject2 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          let tempObject3 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          let tempObject4 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          let tempObject5 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          let tempObject6 = {
            sysValue1 :'',
            sysValue2: '',
            sysKey1: '',
            sysKey2: '',
            sysStage: ''
          };
          for (let index = 0; index <tempData.length ; index ++) {
            if (tempData[index].sysKey.indexOf(":self:") != -1) {
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject1.sysValue1 = tempData[index].sysValue;
                tempObject1.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject1.sysValue2 = tempData[index].sysValue;
              tempObject1.sysKey2 = tempData[index].sysKey;
              tempObject1.sysStage = '本人电话';
              this.gridData.push(tempObject1);
            } else if (tempData[index].sysKey.indexOf(":spare:") != -1) {
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject2.sysValue1 = tempData[index].sysValue;
                tempObject2.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject2.sysValue2 = tempData[index].sysValue;
              tempObject2.sysKey2 = tempData[index].sysKey;
              tempObject2.sysStage = '备用联系人';
              this.gridData.push(tempObject2);
            } else if (tempData[index].sysKey.indexOf(":com:") != -1) {
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject3.sysValue1 = tempData[index].sysValue;
                tempObject3.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject3.sysValue2 = tempData[index].sysValue;
              tempObject3.sysKey2 = tempData[index].sysKey;
              tempObject3.sysStage = '公司联系人';
              this.gridData.push(tempObject3);
            } else if (tempData[index].sysKey.indexOf(":selfSpare:") != -1) {
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject4.sysValue1 = tempData[index].sysValue;
                tempObject4.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject4.sysValue2 = tempData[index].sysValue;
              tempObject4.sysKey2 = tempData[index].sysKey;
              tempObject4.sysStage = '本人备用联系人';
              this.gridData.push(tempObject4);
            } else if(tempData[index].sysKey.indexOf(":link:") != -1){
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject5.sysValue1 = tempData[index].sysValue;
                tempObject5.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject5.sysValue2 = tempData[index].sysValue;
              tempObject5.sysKey2 = tempData[index].sysKey;
              tempObject5.sysStage = '紧急联系人';
              this.gridData.push(tempObject5);
            }else{
              if (tempData[index].sysKey.indexOf("D0") != -1) {
                tempObject6.sysValue1 = tempData[index].sysValue;
                tempObject6.sysKey1 = tempData[index].sysKey;
              }
              index ++;
              tempObject6.sysValue2 = tempData[index].sysValue;
              tempObject6.sysKey2 = tempData[index].sysKey;
              tempObject6.sysStage = '公司电话';
              this.gridData.push(tempObject6);

            }
          }
//          this.gridData = body.data;
this.gridData.forEach(elem => {
  if (elem.sysValue1 == 'true') {
    elem.sysValue1 = true;
  }  if (elem.sysValue1 == 'false') {
    elem.sysValue1 = false;
  }  if (elem.sysValue2 == 'true') {
    elem.sysValue2 = true;
  } if (elem.sysValue2 == 'false') {
    elem.sysValue2 = false;
  }
})
}else{
  this.$message.error(body.message);
}
},response =>{this.gridLoading = false});
},
getSpliteValue(_data) {

  if (_data.split(':').length == 3) {
    return _data.split(':')[2];
  }
  return '';
},
updateCollectionSms(key, value) {
  var _data = {
    sysKey : key,
    sysValue: value
  }
  this.$http.post('manage/smsTemplate/updateContactSwitch', _data).then(response => {
    if (response.body.data == 0) {
      this.$message.error('更改失败!');
    }
  })
}
},
mounted() {
  this.bindGrid();
}
}
</script>
<style></style>
