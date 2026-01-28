<template>
  <div class="app-container">
    <header class="app-header">
      <h1>资源查重系统</h1>
      <p class="subtitle">运营数据查重对比工具</p>
    </header>

    <main class="app-main">
      <DataImport 
        @import-success="handleImportSuccess" 
        @import-loading="handleImportLoading"
      />
      
      <!-- 加载状态提示 -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>正在核对资源...</p>
      </div>
      
      <!-- 结果展示 -->
      <AuditTable v-else-if="results.length > 0" :results="results" />
      
      <!-- 空状态 -->
      <div v-else class="empty-state">
        <p>暂无查重结果，请先导入运营数据</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataImport from './components/DataImport.vue'
import AuditTable from './components/AuditTable.vue'

const results = ref([])
const loading = ref(false)

const handleImportSuccess = (data) => {
  results.value = data
  loading.value = false
}

const handleImportLoading = (isLoading) => {
  loading.value = isLoading
}
</script>

<style scoped>
.app-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  text-align: center;
}

.app-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  padding: 40px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 1.1rem;
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #667eea;
  font-size: 1.1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 2rem;
  }
  
  .app-main {
    padding: 20px;
  }
}
</style>

