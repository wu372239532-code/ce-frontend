import axios from 'axios'

// 当前本地测试地址
// 部署到 Zeabur 后需改为后端的公网域名
const BASE_URL = 'http://127.0.0.1:8080'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 导入运营数据进行查重
 * @param {Array} data - 运营数据数组
 * @returns {Promise} 返回查重结果
 */
export async function importData(data) {
  try {
    const response = await api.post('/api/audit/import', data)
    return response.data
  } catch (error) {
    // 如果后端未启动，返回模拟数据
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      console.warn('后端服务未启动，返回模拟数据')
      return generateMockResults(data)
    }
    throw error
  }
}

/**
 * 生成模拟查重结果（用于开发测试）
 * @param {Array} data - 原始数据
 * @returns {Array} 模拟结果
 */
function generateMockResults(data) {
  const resourceNameMap = new Map()
  
  return data.map((item, index) => {
    const resourceName = item.resourceName
    const isDuplicate = resourceNameMap.has(resourceName)
    
    if (!isDuplicate) {
      resourceNameMap.set(resourceName, true)
    }
    
    return {
      resourceName: item.resourceName,
      channel: item.channel,
      businessLine: item.businessLine,
      belongBusinessLine: item.belongBusinessLine,
      isDuplicate: isDuplicate ? '重复资源' : '独家资源',
      resultDescription: isDuplicate 
        ? `资源"${resourceName}"在系统中已存在，存在重复风险`
        : `资源"${resourceName}"检查通过，无重复`
    }
  })
}

