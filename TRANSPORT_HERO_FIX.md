# TransportHero 修复说明

## 问题
汽车托运页面（`/transport`）的长标题在 PC 端重叠。

## 已执行的修改

### 文件: `components/transport/TransportHero.vue`

**修改前：**
```vue
<h1 class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6" style="line-height: 1.5;">
  2026 汽车托运全场景服务百科：大板车、小板车、代驾与救援深度解析
</h1>
```

**修改后：**
```vue
<h1 class="text-2xl sm:text-3xl md:text-[40px] font-bold text-white mb-6 text-center" style="line-height: 1.5;">
  <div class="block">2026 汽车托运全场景服务百科：</div>
  <div class="block">大板车、小板车、代驾与救援深度解析</div>
</h1>
```

## 关键改动

1. ✅ 将单行长标题拆分为两个 `<div>` 
2. ✅ 每个 `<div>` 添加 `class="block"` 确保块级显示
3. ✅ H1 添加 `text-center` 保持居中对齐
4. ✅ 保持 `style="line-height: 1.5;"`
5. ✅ 父容器移除 `text-center`，改为 H1 自身居中

## 为什么需要 class="block"

TransportHero 的 H1 在一个 flex 容器中，且需要居中。添加 `class="block"` 确保内部的 div 强制为块级元素，每行独占一行，避免 inline 行为导致的重叠。

## 与其他 Hero 的对比

- **About Hero**: div 没有额外容器，天然 block
- **BigCarrier Hero**: 在左对齐容器中，天然 block  
- **Transport Hero**: 在 flex 居中容器中，需要显式 block

## 验证

请硬刷新浏览器访问 `/transport` 页面，标题应该：
- 第一行："2026 汽车托运全场景服务百科："
- 第二行："大板车、小板车、代驾与救援深度解析"
- 两行不重叠
- 居中对齐
