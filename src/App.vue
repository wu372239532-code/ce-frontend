<template>
  <div id="app" style="padding: 20px; font-family: Arial, sans-serif;">
    <h1>资源查重系统 (Excel版)</h1>
    
    <div style="margin-bottom: 20px; padding: 20px; border: 2px dashed #409eff; border-radius: 10px; background-color: #f5f7fa;">
      <h3 style="margin-top: 0;">第一步：上传 Excel 文件</h3>
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept=".xlsx, .xls"
        style="margin-bottom: 10px;"
      />
      <p style="font-size: 13px; color: #666;">
        温馨提示：系统会自动读取表格的 **第一列（资源名称）** 和 **第二列（频道名称）**。
      </p>
    </div>

    <hr />

    <div v-if="tableData.length > 0">
      <h3>第二步：查看查重结果</h3>
      <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px;">资源名称 (A列)</th>
            <th style="padding: 10px;">对应频道 (B列)</th>
            <th style="padding: 10px;">审核状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td style="padding: 10px;">{{ item.name }}</td>
            <td style="padding: 10px;">{{ item.channel }}</td>
            <td style="padding: 10px; font-weight: bold;" :style="{ color: item.is_duplicate ? 'red' : 'green' }">
              {{ item.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="color: #999; margin-top: 40px; text-align: center;">
      <p>暂无数据，请先上传 Excel 文件进行查重</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      // apidemp.zeabur.app
      BASE_URL: 'https://apidemo.zeabur.app'
    };
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // 构造文件上传数据
      const formData = new FormData();
      formData.append('file', file);

      try {
        // 调用后端新的上传接口
        const response = await axios.post(`${this.BASE_URL}/api/audit/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // 将后端返回的结果更新到表格中
        this.tableData = response.data;
        console.log("查重完成！", response.data);
      } catch (error) {
        console.error("上传失败:", error);
        alert("连接服务器失败，请检查后端是否正常运行或域名是否填错。");
      }
    }
  }
};
</script>

<style scoped>
table tr:hover {
  background-color: #fafafa;
}
</style>