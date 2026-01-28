<template>
  <div class="audit-table-container">
    <h2 class="table-title">查重结果</h2>
    <div class="table-wrapper">
      <table class="audit-table">
        <thead>
          <tr>
            <th>资源名称</th>
            <th>频道</th>
            <th>业务线</th>
            <th>所属业务线</th>
            <th>是否重复</th>
            <th>结果说明</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(item, index) in results" 
            :key="index"
            :class="getRowClass(item.isDuplicate)"
          >
            <td>{{ item.resourceName }}</td>
            <td>{{ item.channel }}</td>
            <td>{{ item.businessLine }}</td>
            <td>{{ item.belongBusinessLine }}</td>
            <td>
              <span :class="['status-badge', getStatusClass(item.isDuplicate)]">
                {{ item.isDuplicate }}
              </span>
            </td>
            <td>{{ item.resultDescription || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Array,
    required: true,
    default: () => []
  }
})

// 根据是否重复字段返回行样式类
const getRowClass = (isDuplicate) => {
  if (isDuplicate === '重复资源') {
    return 'row-duplicate'
  } else if (isDuplicate === '独家资源') {
    return 'row-unique'
  }
  return ''
}

// 根据是否重复字段返回状态样式类
const getStatusClass = (isDuplicate) => {
  if (isDuplicate === '重复资源') {
    return 'duplicate'
  } else if (isDuplicate === '独家资源') {
    return 'unique'
  }
  return ''
}
</script>

<style scoped>
.audit-table-container {
  margin-top: 40px;
}

.table-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.audit-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 1000px;
}

.audit-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.audit-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
}

.audit-table tbody tr {
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.audit-table tbody tr:hover {
  background-color: #f8f9fa;
}

.audit-table tbody tr:last-child {
  border-bottom: none;
}

/* 重复资源行样式 - 整行显示红色背景 */
.audit-table tbody tr.row-duplicate {
  background-color: #ffe6e6;
}

.audit-table tbody tr.row-duplicate:hover {
  background-color: #ffcccc;
}

/* 独家资源行样式 - 整行显示绿色背景 */
.audit-table tbody tr.row-unique {
  background-color: #e6ffe6;
}

.audit-table tbody tr.row-unique:hover {
  background-color: #ccffcc;
}

.audit-table td {
  padding: 16px;
  color: #555;
  font-size: 0.9rem;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

/* 重复资源状态 - 红色文字 */
.status-badge.duplicate {
  background-color: #fee;
  color: #c33;
  font-weight: 700;
}

/* 独家资源状态 - 绿色文字 */
.status-badge.unique {
  background-color: #efe;
  color: #3c3;
  font-weight: 700;
}

@media (max-width: 768px) {
  .table-wrapper {
    overflow-x: scroll;
  }
}
</style>

