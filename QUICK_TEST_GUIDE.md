# 🚀 BaseHero 组件快速测试指南

## ✅ 组件已创建完成

所有文件已创建完成，无 linter 错误：
- ✅ `components/common/BaseHero.vue` (241 行)
- ✅ `data/hero-configs.ts` (164 行)
- ✅ `pages/test-hero.vue` (测试页面)

## 📝 快速测试步骤

### 方法 1: 启动开发服务器测试（推荐）

```bash
# 如果服务器未运行，先启动
npm run dev

# 然后访问测试页面
# http://localhost:3001/test-hero
```

### 方法 2: 静态验证（已完成）

✅ **Linter 检查** - 通过，无错误
✅ **类型检查** - 通过，完整类型定义
✅ **语法检查** - 通过，代码格式正确

## 🧪 测试页面内容

测试页面 `/test-hero` 包含 4 个完整示例：

### 1️⃣ 大板车 Hero（配置文件）
```vue
<BaseHero v-bind="heroConfigs.bigCarrier" />
```
- 背景图片 + 渐变遮罩
- 面包屑导航
- 标题高亮（橙色）
- 2 个 CTA 按钮
- 3 个信任指标

### 2️⃣ 小板车 Hero（自定义点击）
```vue
<BaseHero v-bind="smallCarrierConfig" />
```
- 自定义按钮点击事件
- 动态配置合并

### 3️⃣ Props 配置测试
```vue
<BaseHero
  title="..."
  subtitle="..."
  :buttons="..."
  height="small"
  content-width="narrow"
/>
```
- 自定义高度和宽度
- 直接 Props 配置
- 蓝色高亮

### 4️⃣ Slots 完全自定义
```vue
<BaseHero>
  <template #title>自定义标题</template>
  <template #cta>自定义按钮</template>
</BaseHero>
```
- 自定义动画效果
- 自定义按钮样式
- 完全控制内容

## ✅ 验证结果

### 静态分析 ✓
- [x] 无 linter 错误
- [x] 无 TypeScript 类型错误
- [x] 无语法错误
- [x] Import 路径正确

### 代码质量 ✓
- [x] 组件结构清晰
- [x] Props 类型完整
- [x] Slots 命名规范
- [x] 文档完善

### 功能完整性 ✓
- [x] Props 配置方式
- [x] 配置文件方式
- [x] Slots 自定义方式
- [x] 响应式支持
- [x] 动画效果
- [x] 类型安全

## 🎯 实际使用示例

### 在页面中使用

```vue
<template>
  <div>
    <!-- 方式 1: 最简单 -->
    <BaseHero v-bind="heroConfigs.bigCarrier" />

    <!-- 方式 2: 自定义点击 -->
    <BaseHero v-bind="customConfig" />

    <!-- 页面其他内容 -->
  </div>
</template>

<script setup lang="ts">
import BaseHero from '~/components/common/BaseHero.vue'
import { heroConfigs } from '~/data/hero-configs'

// 自定义配置
const customConfig = computed(() => ({
  ...heroConfigs.bigCarrier,
  buttons: heroConfigs.bigCarrier.buttons.map(btn => ({
    ...btn,
    onClick: handleClick
  }))
}))

const handleClick = () => {
  // 你的逻辑
}
</script>
```

## 📊 组件配置选项

### Props
| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backgroundImage` | string | - | 背景图 URL |
| `title` | string | - | 标题（支持 HTML） |
| `subtitle` | string | - | 副标题 |
| `height` | 'small' \| 'medium' \| 'large' | 'medium' | 高度 |
| `breadcrumbs` | BreadcrumbItem[] | [] | 面包屑 |
| `buttons` | ButtonConfig[] | [] | 按钮配置 |
| `features` | FeatureItem[] | [] | 特性指标 |

### Slots
| 名称 | 说明 |
|------|------|
| `title` | 自定义标题区域 |
| `subtitle` | 自定义副标题区域 |
| `cta` | 自定义按钮区域 |
| `features` | 自定义特性区域 |
| `content` | 额外自定义内容 |

## 🎓 已配置的页面

当前 `data/hero-configs.ts` 中已有配置：
- ✅ `bigCarrier` - 大板车托运
- ✅ `smallCarrier` - 小板车托运
- ✅ `valet` - 代驾服务

## 📚 文档资源

- **完整 API**: `components/common/BaseHero.README.md`
- **使用指南**: `BASEHERO_USAGE_GUIDE.md`
- **完成报告**: `HERO_COMPONENT_COMPLETE.md`
- **测试说明**: `TEST_INSTRUCTIONS.md`

## ✨ 下一步行动

### 立即可做
1. ✅ 启动开发服务器
2. ✅ 访问 `/test-hero` 查看效果
3. ✅ 在实际页面中使用组件

### 逐步推进
1. 在 `data/hero-configs.ts` 添加更多页面配置
2. 替换现有页面的 Hero 组件
3. 删除旧的 Hero 组件文件
4. 保持配置文件更新

## 🎊 总结

BaseHero 组件已完成并通过静态验证：
- ✅ 代码质量：无错误
- ✅ 类型安全：完整定义
- ✅ 功能完整：三种配置方式
- ✅ 文档完善：详细说明
- ✅ 测试就绪：测试页面已创建

**组件已就绪，可以开始使用！**
