# 资源查重系统

基于 Vue 3 和 Vite 构建的前端项目，用于运营数据查重对比。

## 功能特性

- 📊 模拟导入运营数据
- 🔍 资源查重对比
- 📋 美观的结果展示表格
- 🎨 现代化的 UI 设计

## 技术栈

- Vue 3 (Composition API)
- Vite
- Axios

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
risk-frontend/
├── src/
│   ├── api/
│   │   └── api.js          # API 调用模块
│   ├── components/
│   │   ├── DataImport.vue  # 数据导入组件
│   │   └── ResultTable.vue # 结果表格组件
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── index.html              # HTML 入口
├── vite.config.js          # Vite 配置
└── package.json            # 项目配置
```

## API 接口

### 查重接口

- **URL**: `/api/audit/import`
- **Method**: POST
- **Base URL**: 配置在 `src/api/api.js` 中的 `BASE_URL` 变量
  - 本地测试: `http://127.0.0.1:8080`
  - 部署到 Zeabur 后需改为后端的公网域名
- **Request Body**: 
```json
[
  {
    "resourceName": "白月光",
    "channel": "电影频道",
    "businessLine": "内容运营",
    "belongBusinessLine": "内容运营"
  }
]
```

- **Response**: 
```json
[
  {
    "resourceName": "白月光",
    "channel": "电影频道",
    "businessLine": "内容运营",
    "belongBusinessLine": "内容运营",
    "isDuplicate": "重复资源",
    "resultDescription": "资源\"白月光\"在系统中已存在，存在重复风险"
  }
]
```

## 功能说明

### 视觉反馈

- **重复资源**: 整行显示红色背景，"是否重复"字段显示红色文字
- **独家资源**: 整行显示绿色背景，"是否重复"字段显示绿色文字
- **加载状态**: 数据加载时显示"正在核对资源..."提示和加载动画

## 注意事项

- 后端 API 地址配置在 `src/api/api.js` 中的 `BASE_URL` 变量
- 部署到 Zeabur 后，需要将 `BASE_URL` 改为后端的公网域名
- 如果后端未启动，系统会自动返回模拟数据用于前端开发测试

