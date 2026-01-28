<template>
  <div id="app" style="padding: 30px; font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif; max-width: 1100px; margin: 0 auto; color: #303133;">
    <h1 style="text-align: center; margin-bottom: 40px; font-weight: 600;">资源查重系统</h1>
    
    <div style="margin-bottom: 30px; padding: 25px; border: 1px solid #ebeef5; border-radius: 8px; background-color: #fff; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);">
      <h3 style="margin-top: 0; color: #409eff; display: flex; align-items: center;">
        <span style="background: #409eff; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; font-size: 14px; margin-right: 10px;">1</span>
        上传待审 Excel
      </h3>
      <div style="margin-left: 34px;">
        <input 
          type="file" 
          @change="handleFileUpload" 
          accept=".xlsx, .xls"
          style="margin: 15px 0;"
        />
        <p style="font-size: 13px; color: #909399; margin: 0;">
          * 请确保表格前三列依次为：<strong>业务线、资源名称、频道</strong>
        </p>
      </div>
    </div>

    <div v-if="tableData.length > 0" style="padding: 25px; border: 1px solid #ebeef5; border-radius: 8px; background-color: #fff; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; color: #409eff; display: flex; align-items: center;">
          <span style="background: #409eff; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; justify-content: center; align-items: center; font-size: 14px; margin-right: 10px;">2</span>
          查重结果预览
        </h3>
        <button @click="tableData = []" style="padding: 6px 16px; cursor: pointer; border: 1px solid #dcdfe6; background: #fff; border-radius: 4px; color: #606266; font-size: 13px;">清空数据</button>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background-color: #f5f7fa;">
              <th style="padding: 12px; border-bottom: 2px solid #ebeef5; color: #909399; font-weight: 600;">业务线</th>
              <th style="padding: 12px; border-bottom: 2px solid #ebeef5; color: #909399; font-weight: 600;">资源名称</th>
              <th style="padding: 12px; border-bottom: 2px solid #ebeef5; color: #909399; font-weight: 600;">频道</th>
              <th style="padding: 12px; border-bottom: 2px solid #ebeef5; color: #909399; font-weight: 600;">判定状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index" class="table-row">
              <td style="padding: 12px; border-bottom: 1px solid #ebeef5;">{{ item.biz_line }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #ebeef5;">{{ item.name }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #ebeef5;">{{ item.channel }}</td>
              <td style="padding: 12px; border-bottom: 1px solid #ebeef5; font-weight: bold;">
                <span :style="{ 
                  color: item.is_duplicate ? '#F56C6C' : '#67C23A',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: item.is_duplicate ? '#fef0f0' : '#f0f9eb'
                }">
                  {{ item.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else style="text-align: center; margin-top: 100px; color: #c0c4cc;">
      <div style="font-size: 60px; margin-bottom: 20px;">📂</div>
      <p style="font-size: 16px;">暂无数据，请在上方上传 Excel 文件开始审计</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      // 这里的域名已根据你的后端 apidemo 进行对齐
      BASE_URL: 'https://apidemo.zeabur.app'
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`${this.BASE_URL}/api/audit/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        this.tableData = response.data;
      } catch (error) {
        console.error("上传失败:", error);
        alert("连接服务器失败，请确保后端服务 apidemo.zeabur.app 已正常启动。");
      }
    }
  }
};
</script>

<style scoped>
.table-row:hover {
  background-color: #f9fafc;
}
</style>