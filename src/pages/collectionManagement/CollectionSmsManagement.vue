<!-- 分配人员管理 -->
<template>
	<section>
    <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid" border>
      <el-table-column label="序号" type="index" width="100"></el-table-column>
      <el-table-column label="逾期时间段" prop="sysKey">
        <template scope="scope">
          {{getSpliteValue(scope.row.sysKey)}}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="updateTime">
        <template scope="scope">
          {{getdates(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column label="开关" prop="sysValue">
        <template scope="scope">
          <el-switch name="index++"
            v-model="scope.row.sysValue"
            active-text="开"
            inactive-text="关" @change="updateCollectionSms(scope.row)">
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
      this.$http.post('manage/smsTemplate/listCollectionSmsSwitch',{}).then(response => {
        this.gridLoading = false;
        let {body} = response;
        if(body.code ==1){
          this.gridData = body.data;
          this.gridData.forEach(elem => {
              if (elem.sysValue == 'true') {
                  elem.sysValue = true;
              } else {
                  elem.sysValue = false;
              }
          })
        }else{
          this.$message.error(body.message);
        }
      },response =>{this.gridLoading = false});
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
    getSpliteValue(_data) {

        if (_data.split(':').length == 3) {
            return _data.split(':')[2];
        }
        return '';
    },
    updateCollectionSms(row) {
        var _data = {
            id : row.id,
          sysValue: row.sysValue
        }
        this.$http.post('manage/smsTemplate/updateCollectionSmsSwitch', _data).then(response => {
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
