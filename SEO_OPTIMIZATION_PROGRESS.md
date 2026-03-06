# SEO 优化进度追踪

## 已完成的优化

### 1. 创建工具函数和文档
- [x] 创建 `composables/useSeoMeta.ts` - 统一的 SEO meta 标签管理
- [x] 创建 `SEO_GEO_OPTIMIZATION_REPORT.md` - 优化报告文档
- [x] 扩展 `composables/useSchemaOrg.ts` - 添加新的 Schema 函数
  - [x] useHowToSchema - 流程/教程结构化数据
  - [x] useLocalBusinessSchema - 本地商业信息
  - [x] useItemListSchema - 列表页面结构化数据
  - [x] useVideoObjectSchema - 视频内容结构化数据

### 2. 页面 SEO 优化 (OG + Twitter Card)
- [x] 首页 (`/`) - 已添加 OG 和 Twitter Card
- [x] 大板车页面 (`/big-carrier`) - 已添加 OG 和 Twitter Card
- [x] 小板车页面 (`/small-carrier`) - 已添加 OG 和 Twitter Card
- [ ] 救援页面 (`/rescue`) - 待处理
- [ ] 代驾页面 (`/valet`) - 待处理
- [ ] 定价页面 (`/pricing`) - 待处理
- [ ] 关于我们 (`/about`) - 待处理
- [ ] 新闻页面 (`/news`) - 待处理
- [ ] 联系我们 (`/contact`) - 待处理
- [ ] 其他页面 (共 27 个页面)

### 3. HowTo Schema 添加
- [ ] 大板车流程页面
- [ ] 小板车流程页面
- [ ] 救援流程页面
- [ ] 代驾流程页面

### 4. 图片 alt 属性优化
- [ ] 批量修改英文 alt 为中文
- [ ] 检查所有图片是否有 alt 属性

### 5. LocalBusiness Schema
- [ ] 在首页或关于我们页面添加

## 下一步行动

1. 继续为剩余页面添加 OG 和 Twitter Card 标签
2. 为流程组件添加 HowTo Schema
3. 批量修改图片 alt 属性
4. 添加 LocalBusiness Schema
5. 准备社交媒体分享图片 (1200x630px)

## 注意事项

- 所有页面都需要准备对应的 OG 图片 (1200x630px)
- 图片路径: `/image/[page-name]/og-[page-name].jpg`
- 确保所有 Schema 数据准确无误
- 测试社交媒体分享效果

## 预期完成时间

- 第1周: 完成所有页面的 OG 和 Twitter Card 标签
- 第2周: 完成 HowTo Schema 和图片 alt 优化
- 第3周: 完成 LocalBusiness Schema 和其他优化
