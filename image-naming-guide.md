# 车拖车官网图片命名规范与清单（PNG 格式）

## 📋 命名规则总则

### 统一规范
- **格式要求**：全部使用 PNG 格式（`.png`）
- **命名语言**：全小写英文 + 连字符 `-`，禁止使用空格和中文
- **基本结构**：`[页面/模块]-[位置/用途]-[版本/序号].png`
- **目录结构**：`public/images/[模块名]/文件名.png`

### 命名组成部分说明
1. **页面/模块**：`home`、`about`、`solutions`、`pricing`、`partners`、`careers`、`contact`、`download`、`driver`、`valet`、`big-carrier`、`small-carrier`、`rescue`、`cybersecurity`、`news`、`guide`、`truck-sales`、`partner-recruit` 等
2. **位置/用途**：`hero`、`bg`、`section-a`、`section-b`、`card-01`、`icon-01`、`mockup`、`feature`、`review`、`case`、`logo` 等
3. **版本/序号**：`v1`、`v2` 或 `01`、`02`、`03` 等

---

## 🏠 首页（Home - /pages/index.vue）

### 使用的组件及其图片
- **HomeHero** - 顶部主横幅
- **HomeServiceSmall** - 小板车服务板块  
- **HomeServiceBig** - 大板车服务板块
- **HomeServiceValet** - 代驾服务板块
- **HomeServiceRescue** - 救援服务板块
- **HomeTrust** - 信任与技术板块
- **HomeEcosystem** - 生态与制造板块
- **NewsSection** - 新闻板块

### 图片清单

#### 主横幅（HomeHero）
- `home-hero-bg.png` - Hero 区域背景图（建议尺寸：1920×1080px）
- `home-hero-overlay.png` - 可选的叠加图层（如科技网格、光效等）

#### 服务板块通用
- `home-service-small-bg.png` - 小板车服务板块背景
- `home-service-small-mockup.png` - 小板车服务手机截图/界面展示
- `home-service-big-bg.png` - 大板车服务板块背景
- `home-service-big-truck.png` - 大板车实景图
- `home-service-valet-bg.png` - 代驾服务板块背景
- `home-service-valet-driver.png` - 代驾司机形象图
- `home-service-rescue-bg.png` - 救援服务板块背景
- `home-service-rescue-vehicle.png` - 救援车辆图

#### 信任与技术板块
- `home-trust-security.png` - 安全认证相关视觉
- `home-trust-ai.png` - AI 技术可视化图
- `home-trust-certifications.png` - 资质证书墙（可选）

#### 生态制造板块
- `home-ecosystem-factory.png` - 工厂制造场景
- `home-ecosystem-network.png` - 全国网络地图可视化
- `home-ecosystem-partners.png` - 合作伙伴 Logo 墙

---

## 📖 关于我们（About - /pages/about/index.vue）

### 图片清单

#### Hero 顶部
- `about-hero-bg.png` - Hero 背景图（科技感物流网络）

#### Section A - 公司使命
- `about-lab-main.png` - 数智供应链实验室主图

#### Section A-Plus - 产业布局
- `about-industrial-map.png` - 工业布局地图（临沂+随州+全国网点）
- `about-industrial-map.svg` - 可选矢量版本

#### 战略合作伙伴（装备制造）
- `about-equipment-partners-strip.png` - 合作伙伴 Logo 聚合图（可选）
- `about-partner-foton-logo.png` - 福田汽车 Logo
- `about-partner-sinotruk-logo.png` - 中国重汽 Logo
- `about-partner-jac-logo.png` - 江淮汽车 Logo
- `about-partner-faw-logo.png` - 一汽解放 Logo

#### 四大核心硬实力
- `about-core-capacity.png` - 专业运力池插画
- `about-core-dispatch.png` - 数字化调度插画
- `about-core-security.png` - 安全合规保障插画
- `about-core-coverage.png` - 行业覆盖力插画

#### 资质与荣誉
- `about-honors-bg.png` - 荣誉墙整体背景（可选）
- `about-honor-license.png` - 道路运输经营许可证图标
- `about-honor-iso9001.png` - ISO9001 质量认证图标
- `about-honor-hightech.png` - 国家高新技术企业图标
- `about-honor-cybersecurity.png` - 信息安全等保三级图标
- `about-honor-software-award.png` - 首版次高端软件图标
- `about-honor-bigdata-award.png` - 大数据创新应用图标
- `about-honor-lab.png` - 重点实验室图标
- `about-honor-insurance.png` - 物流责任险图标

#### 合作伙伴品牌墙（整车品牌）
- `about-oem-partners-wall.png` - 合作品牌墙整体图
- `about-partner-mercedes-logo.png` - 奔驰 Logo
- `about-partner-bmw-logo.png` - 宝马 Logo
- `about-partner-audi-logo.png` - 奥迪 Logo
- `about-partner-honda-logo.png` - 本田 Logo
- `about-partner-tesla-logo.png` - 特斯拉 Logo

---

## 💼 解决方案（Solutions - /pages/solutions/index.vue）

### 图片清单

#### Hero 顶部
- `solutions-hero-bg.png` - 解决方案 Hero 背景

#### 三大解决方案配图（SolutionsZigzag 组件）
- `solutions-supply-chain.png` - 数字化供应链方案配图
- `solutions-luxury.png` - 商业活动与高端定制配图
- `solutions-personal.png` - 个人旅游与异地托运配图

#### 安全护城河板块
- `solutions-security-moat.png` - 安全技术可视化图

---

## 💰 定价计算器（Pricing - /pages/pricing/index.vue）

### 图片清单

#### Hero 顶部
- `pricing-hero-bg.png` - 定价页 Hero 背景（司机+板车场景）

#### 计算器板块配图
- `pricing-calculator-mockup.png` - 价格计算器界面展示（可选）
- `pricing-route-map.png` - 路线示意图（可选）

---

## 🤝 生态合作（Partners - /pages/partners/index.vue）

### 图片清单

#### Hero 顶部
- `partners-hero-bg.png` - 生态平台 Hero 背景（全球物流网络）

#### 运力生态卡片（CapacityCard 组件）
- `partners-capacity-carrier.png` - 板车/承运商卡片配图
- `partners-capacity-rescue.png` - 救援公司卡片配图
- `partners-capacity-individual.png` - 个人司机卡片配图

#### 支持项目卡片（SupportItem 组件）
- `partners-support-insurance.png` - 保险支持配图
- `partners-support-finance.png` - 金融支持配图
- `partners-support-training.png` - 培训支持配图
- `partners-support-tech.png` - 技术支持配图

#### 企业合作表单背景
- `partners-form-bg.png` - 合作申请表单区域背景图

---

## 💼 招聘（Careers - /pages/careers/index.vue）

### 图片清单

#### Hero 顶部
- `careers-hero-bg.png` - 招聘页 Hero 背景

#### 校招专项板块
- `careers-campus-team.png` - 团队合照/校招活动现场

---

## 📞 联系我们（Contact - /pages/contact/index.vue）

### 图片清单

#### Hero 顶部
- `contact-hero-bg.png` - 联系页 Hero 背景

#### 办公场景
- `contact-office-main.png` - 公司办公环境主图

#### 二维码
- `contact-qr-wechat.png` - 微信公众号二维码
- `contact-qr-douyin.png` - 抖音二维码
- `contact-qr-app-ios.png` - iOS App 下载二维码
- `contact-qr-app-android.png` - Android App 下载二维码

---

## 🔐 网络安全（Cybersecurity - /pages/cybersecurity/index.vue）

### 图片清单

#### Hero 顶部
- `cybersecurity-hero-bg.png` - 网络安全页 Hero 背景

#### 安全架构可视化
- `cybersecurity-architecture.png` - 安全架构示意图
- `cybersecurity-certifications.png` - 等保三级等认证展示

---

## 📱 下载中心（Download - /pages/download/index.vue）

### 图片清单

#### Hero 顶部
- `download-hero-bg.png` - 下载页 Hero 背景

#### 客户端界面展示
- `download-client-mockup-01.png` - 客户端界面截图 1
- `download-client-mockup-02.png` - 客户端界面截图 2
- `download-client-mockup-03.png` - 客户端界面截图 3

#### 司机端界面展示
- `download-driver-mockup-01.png` - 司机端界面截图 1
- `download-driver-mockup-02.png` - 司机端界面截图 2
- `download-driver-mockup-03.png` - 司机端界面截图 3

---

## 🚚 司机端（Driver - /pages/driver/index.vue 和 /pages/driver/home.vue）

### 图片清单

#### Hero 顶部
- `driver-hero-bg.png` - 司机端 Hero 背景（司机+车辆场景）

#### App 展示
- `driver-app-mockup-main.png` - 司机 App 主界面
- `driver-app-mockup-secondary.png` - 司机 App 副界面
- `driver-station.png` - 司机服务站场景

#### 司机学院板块
- `driver-academy-training.png` - 培训场景图

#### 订单调度板块
- `driver-order-dispatch.png` - 调度系统界面

---

## 🚗 服务页面（小板车/大板车/代驾/救援）

### 小板车（Small Carrier - /pages/small-carrier/index.vue）
- `small-carrier-hero-bg.png` - 小板车 Hero 背景
- `small-carrier-vehicle-main.png` - 小板车车辆主图
- `small-carrier-process-01.png` - 服务流程图 1
- `small-carrier-case-01.png` - 案例配图 1
- `small-carrier-case-02.png` - 案例配图 2
- `small-carrier-pricing-chart.png` - 价格表可视化
- `small-carrier-review-avatar-01.png` - 用户评价头像 1
- `small-carrier-review-avatar-02.png` - 用户评价头像 2
- `small-carrier-review-avatar-03.png` - 用户评价头像 3

### 大板车（Big Carrier - /pages/big-carrier/index.vue）
- `big-carrier-hero-bg.png` - 大板车 Hero 背景
- `big-carrier-truck-main.png` - 大板车车辆主图
- `big-carrier-process-01.png` - 服务流程图 1
- `big-carrier-case-01.png` - 案例配图 1
- `big-carrier-case-02.png` - 案例配图 2
- `big-carrier-pricing-chart.png` - 价格表可视化
- `big-carrier-review-avatar-01.png` - 用户评价头像 1
- `big-carrier-review-avatar-02.png` - 用户评价头像 2
- `big-carrier-faq-illustration.png` - FAQ 配图

### 代驾服务（Valet - /pages/valet/index.vue）
- `valet-hero-bg.png` - 代驾 Hero 背景
- `valet-driver-main.png` - 代驾司机形象图
- `valet-service-scene.png` - 代驾服务场景
- `valet-pricing-chart.png` - 价格表可视化

### 道路救援（Rescue - /pages/rescue/index.vue）
- `rescue-hero-bg.png` - 救援 Hero 背景
- `rescue-vehicle-main.png` - 救援车辆主图
- `rescue-case-01.png` - 救援案例图 1
- `rescue-case-02.png` - 救援案例图 2
- `rescue-process-01.png` - 救援流程图
- `rescue-review-avatar-01.png` - 用户评价头像 1
- `rescue-review-avatar-02.png` - 用户评价头像 2

---

## 🚙 垂直业务页面

### 板车销售（Truck Sales - /pages/truck-sales/index.vue）
- `truck-sales-hero-bg.png` - 板车销售 Hero 背景
- `truck-sales-product-01.png` - 产品图 1（清障车）
- `truck-sales-product-02.png` - 产品图 2（轿运车）
- `truck-sales-factory.png` - 工厂生产线
- `truck-sales-network-map.png` - 服务网络地图

### 城市合伙人招募（Partner Recruit - /pages/partner-recruit/index.vue）
- `partner-recruit-hero-bg.png` - 合伙人招募 Hero 背景
- `partner-recruit-success-01.png` - 成功案例图 1
- `partner-recruit-success-02.png` - 成功案例图 2
- `partner-recruit-highlight-01.png` - 优势亮点图 1

### 用户指南（Guide - /pages/guide/index.vue）
- `guide-hero-bg.png` - 指南页 Hero 背景
- `guide-step-illustration-01.png` - 步骤说明图 1
- `guide-step-illustration-02.png` - 步骤说明图 2
- `guide-faq-illustration.png` - FAQ 配图

### 高端旅游托运（Luxury Transport - /pages/luxury-transport/index.vue）
- `luxury-hero-bg.png` - 高端托运 Hero 背景
- `luxury-vehicle-01.png` - 高端车辆展示 1
- `luxury-vehicle-02.png` - 高端车辆展示 2
- `luxury-service-scene.png` - 高端服务场景

### 个人旅游（Personal Travel - /pages/personal-travel/index.vue）
- `personal-travel-hero-bg.png` - 个人旅游 Hero 背景
- `personal-travel-scene-01.png` - 旅游场景 1
- `personal-travel-scene-02.png` - 旅游场景 2

### 供应链（Supply Chain - /pages/supply-chain/index.vue）
- `supply-chain-hero-bg.png` - 供应链 Hero 背景
- `supply-chain-dashboard.png` - 供应链数据看板
- `supply-chain-network.png` - 供应链网络图

---

## 📰 新闻中心（News - /pages/news/index.vue）

### 图片清单
- `news-hero-bg.png` - 新闻中心 Hero 背景
- `news-featured-01.png` - 特色新闻配图 1
- `news-featured-02.png` - 特色新闻配图 2
- `news-featured-03.png` - 特色新闻配图 3
- `news-placeholder.png` - 新闻占位图（通用）

---

## 🔧 通用组件图片

### Logo 与品牌资源（/public/ 根目录）
- `logo-chetuoche-primary.png` - 主 Logo（彩色，1000×300px）
- `logo-chetuoche-dark.png` - 深色 Logo（深色背景用）
- `logo-chetuoche-light.png` - 浅色 Logo（白色，浅色背景用）
- `logo-chetuoche-icon.png` - Logo 图标版（正方形，512×512px）
- `favicon-16x16.png` - Favicon 小图标
- `favicon-32x32.png` - Favicon 标准图标
- `favicon-192x192.png` - Favicon 高清图标
- `favicon-512x512.png` - Favicon 超高清图标

### 页脚资源（TheFooter 组件）
- `footer-qr-wechat.png` - 页脚微信二维码
- `footer-qr-app.png` - 页脚 App 下载二维码

### 评价/案例通用头像
- `common-avatar-placeholder.png` - 用户头像占位图
- `common-avatar-01.png` - 通用头像 1
- `common-avatar-02.png` - 通用头像 2
- `common-avatar-03.png` - 通用头像 3
- `common-avatar-04.png` - 通用头像 4
- `common-avatar-05.png` - 通用头像 5

### 图标/插画资源
- `icon-security-shield.png` - 安全盾牌图标
- `icon-ai-brain.png` - AI 大脑图标
- `icon-truck.png` - 卡车图标
- `icon-location.png` - 定位图标
- `icon-verified.png` - 认证图标
- `icon-support-24h.png` - 24 小时支持图标

---

## 📁 目录结构建议

```
public/
└── images/
    ├── common/              # 通用资源
    │   ├── logo-chetuoche-primary.png
    │   ├── logo-chetuoche-dark.png
    │   ├── logo-chetuoche-light.png
    │   ├── common-avatar-01.png
    │   ├── icon-security-shield.png
    │   └── ...
    ├── home/                # 首页
    │   ├── home-hero-bg.png
    │   ├── home-service-small-bg.png
    │   └── ...
    ├── about/               # 关于我们
    │   ├── about-hero-bg.png
    │   ├── about-lab-main.png
    │   └── ...
    ├── solutions/           # 解决方案
    │   ├── solutions-hero-bg.png
    │   └── ...
    ├── pricing/             # 定价
    │   ├── pricing-hero-bg.png
    │   └── ...
    ├── partners/            # 合作伙伴
    │   ├── partners-hero-bg.png
    │   └── ...
    ├── careers/             # 招聘
    │   ├── careers-hero-bg.png
    │   └── ...
    ├── contact/             # 联系我们
    │   ├── contact-hero-bg.png
    │   └── ...
    ├── driver/              # 司机端
    │   ├── driver-hero-bg.png
    │   └── ...
    ├── small-carrier/       # 小板车
    │   ├── small-carrier-hero-bg.png
    │   └── ...
    ├── big-carrier/         # 大板车
    │   ├── big-carrier-hero-bg.png
    │   └── ...
    ├── valet/               # 代驾
    │   ├── valet-hero-bg.png
    │   └── ...
    ├── rescue/              # 救援
    │   ├── rescue-hero-bg.png
    │   └── ...
    ├── download/            # 下载中心
    │   ├── download-hero-bg.png
    │   └── ...
    ├── news/                # 新闻
    │   ├── news-hero-bg.png
    │   └── ...
    ├── cybersecurity/       # 网络安全
    │   ├── cybersecurity-hero-bg.png
    │   └── ...
    ├── truck-sales/         # 板车销售
    │   ├── truck-sales-hero-bg.png
    │   └── ...
    ├── partner-recruit/     # 合伙人招募
    │   ├── partner-recruit-hero-bg.png
    │   └── ...
    ├── guide/               # 用户指南
    │   ├── guide-hero-bg.png
    │   └── ...
    ├── luxury/              # 高端托运
    │   ├── luxury-hero-bg.png
    │   └── ...
    ├── personal-travel/     # 个人旅游
    │   ├── personal-travel-hero-bg.png
    │   └── ...
    └── supply-chain/        # 供应链
        ├── supply-chain-hero-bg.png
        └── ...
```

---

## 📝 使用说明

### 步骤 1：准备图片文件
1. 将设计师提供的图片按照本文档命名
2. 确保所有图片为 PNG 格式
3. 检查图片尺寸符合要求（Hero 图建议 1920×1080px，内容区图 1600×1200px）

### 步骤 2：放置文件
1. 在项目 `public/images/` 目录下创建对应的子目录
2. 将命名好的图片放入对应目录

### 步骤 3：更新代码引用
在 Vue 组件中，将远程图片链接替换为本地路径：

**替换前：**
```vue
<ImageWithFallback
  src="https://images.unsplash.com/photo-xxxxx"
  alt="描述"
/>
```

**替换后：**
```vue
<ImageWithFallback
  src="/images/about/about-hero-bg.png"
  alt="描述"
/>
```

### 步骤 4：图片优化建议
- 使用在线工具或本地工具压缩 PNG 文件（如 TinyPNG）
- Hero 大图控制在 500KB 以内
- 小图标控制在 100KB 以内
- 考虑使用 WebP 格式作为备选（需配合 ImageWithFallback 组件）

---

## ✅ 检查清单

完成图片替换后，请检查：

- [ ] 所有图片已按命名规范重命名
- [ ] 所有图片已放置到正确的目录
- [ ] 所有图片为 PNG 格式
- [ ] 代码中的远程链接已替换为本地路径
- [ ] 页面加载测试通过，无图片加载失败
- [ ] 图片文件大小已优化
- [ ] 移动端显示正常
- [ ] 所有 Hero 区域图片文字安全区预留充足

---

**文档版本**：v1.0  
**最后更新**：2026-02-12  
**维护人**：车拖车技术团队
