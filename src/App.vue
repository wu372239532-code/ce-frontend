<template>
  <div id="app" style="padding: 30px; font-family: 'Microsoft YaHei', sans-serif; max-width: 1000px; margin: 0 auto;">
    <h1 style="color: #303133; text-align: center;">资源查重系统 (业务审计版)</h1>
    
    <div style="margin: 30px 0; padding: 25px; border: 2px dashed #409eff; border-radius: 12px; background-color: #f0f7ff;">
      <h3 style="margin-top: 0; color: #409eff;">第一步：上传待审 Excel</h3>
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept=".xlsx, .xls"
        style="font-size: 16px;"
      />
      <div style="margin-top: 15px; padding: 10px; background: #fff; border-radius: 6px; border: 1px solid #dcdfe6;">
        <p style="margin: 5px 0; font-size: 14px; color: #606266;"><strong>Excel 格式要求：</strong></p>
        <ul style="margin: 0; font-size: 13px; color: #909399; padding-left: 20px;">
          <li>A 列：业务线</li>
          <li>B 列：资源名称</li>
          <li>C 列：频道</li>
        </ul>
      </div>
    </div>

    <div v-if="tableData.length > 0" style="margin-top: 30px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #303133;">第二步：查重结果预览</h3>
        <button @click="tableData = []" style="padding: 5px 15px; cursor: pointer; border: 1px solid #dcdfe6; background: #fff; border-radius: 4px;">清空结果</button>
      </div>

      <table border="1" style="width: 100%; border-collapse: collapse; box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);">
        <thead>
          <tr style="background-color: #409eff; color: white;">
            <th style="padding: 12px;">业务线</th>
            <th style="padding: 12px;">资源名称</th>
            <th style="padding: 12px;">频道</th>
            <th style="padding: 12px;">是否重复</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index" style="transition: all 0.3s;">
            <td style="padding: 12px; border: 1px solid #ebeef5;">{{ item.biz_line }}</td>
            <td style="padding: 12px; border: 1px solid #ebeef5;">{{ item.name }}</td>
            <td style="padding: 12px; border: 1px solid #ebeef5;">{{ item.channel }}</td>
            <td style="padding: 12px; border: 1px solid #ebeef5; font-weight: bold; text-align: center;" 
                :style="{ color: item.is_duplicate ? '#F56C6C' : '#67C23A', backgroundColor: item.is_duplicate ? '#fef0f0' : '#f0f9eb' }">
              {{ item.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="text-align: center; margin-top: 60px; color: #909399;">
      <div style="font-size: 50px; margin-bottom: 10px;">📊</div>
      <p>请上传 Excel 文件，系统将自动开始比对数据...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tableData: [],
      // 已根据您的后端域名更正为 apidemo
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
        // 请求后端上传接口
        const response = await axios.post(`${this.BASE_URL}/api/audit/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // 更新表格数据
        this.tableData = response.data;
        console.log("查重成功！", response.data);
      } catch (error) {
        console.error("上传失败:", error);
        alert("连接服务器失败，请检查后端是否正常运行。");
      }
    }
  }
};
</script>

<style>
/* 简单的鼠标经过变色效果 */
table tbody tr:hover {
  background-color: #f5f7fa !important;
}
</style>