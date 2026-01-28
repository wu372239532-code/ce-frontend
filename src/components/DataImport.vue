<template>
  <div class="data-import-container">
    <button 
      class="import-button" 
      @click="handleImport"
      :disabled="loading"
    >
      <span v-if="!loading">模拟导入运营数据</span>
      <span v-else>导入中...</span>
    </button>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { importData } from '../api/api'

const emit = defineEmits(['import-success', 'import-loading'])

const loading = ref(false)
const error = ref('')

const handleImport = async () => {
  loading.value = true
  error.value = ''
  emit('import-loading', true)
  
  try {
    const testData = [
      {
        resourceName: '白月光',
        channel: '电影频道',
        businessLine: '内容运营',
        belongBusinessLine: '内容运营',
      },
      {
        resourceName: '狂飙',
        channel: '电视剧频道',
        businessLine: '内容运营',
        belongBusinessLine: '内容运营',
      },
      {
        resourceName: '电影',
        channel: '电影频道',
        businessLine: '内容运营',
        belongBusinessLine: '内容运营',
      },
      {
        resourceName: '白月光',
        channel: '电影频道',
        businessLine: '内容运营',
        belongBusinessLine: '内容运营',
      },
    ]
    
    const results = await importData(testData)
    emit('import-success', results)
  } catch (err) {
    error.value = err.message || '导入失败，请稍后重试'
    console.error('导入失败:', err)
    emit('import-loading', false)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.data-import-container {
  margin-bottom: 40px;
  text-align: center;
}

.import-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 48px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.import-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.import-button:active:not(:disabled) {
  transform: translateY(0);
}

.import-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-top: 15px;
  font-size: 0.95rem;
}
</style>

