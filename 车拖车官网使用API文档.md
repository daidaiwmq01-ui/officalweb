# 车拖车官网项目API接口文档

## 项目概述

本项目是一个Nuxt.js官网项目，主要用于汽车托运、轿车托运、物流运输等业务。项目包含多个业务模块：首页、汽车快递、汽车物流、代驾/取送车、拖车司机加入、代驾司机加入、企业/救援公司入驻、拖车咨询、关于我们等。

## 基础配置

### 环境变量

- **开发环境**: `VITE_APP_API=https://git.chetuoche.net/official-website-server`
- **生产环境**: `VITE_APP_API=https://www.chetuoche.net/official-website-server`
- **埋点开发环境**: `https://api.chetuoche.net`
- **埋点生产环境**: `https://test.chetuoche.net`

### HTTP请求配置

所有API请求都会自动添加以下请求头：

- `userType`: "web"
- `timestamp`: 当前时间戳
- `sign`: MD5(timestamp + "web")
- `Content-Language`: "zh-CN"
- `channelSource`: "3017" (PC端) 或 "3016" (移动端)

## 页面路由与API接口对应关系

### 1. 首页 (`/`)
**页面路径**: `pages/index.vue`

**使用的API接口**:
- **获取新闻类型**: `getAllNewsType()`
  - 接口地址: `/api/home/getAllNewsType`
  - 请求方法: GET
  - 使用场景: 首页新闻分类

- **获取新闻列表**: `getNewsList()`
  - 接口地址: `/api/home/newsList/1/10`
  - 请求方法: POST
  - 使用场景: 首页新闻列表展示

- **获取APP下载信息**: `getAppInfo()`
  - 接口地址: `/apis/api/update/updateInfo`
  - 请求方法: GET
  - 使用场景: 获取客户端和司机端下载链接

- **埋点**: `websiteBehaviorAdd()`
  - 接口地址: `/event/websiteBehavior/add`
  - 请求方法: POST
  - 使用场景: 用户行为追踪

**页面功能**:
- 汽车托运报价查询
- 为什么选择我们
- 拖车车型展示
- 新闻视点
- 合作伙伴
- 统计数据
- 下载客户端/司机端

---

### 2. 汽车快递 (`/express`)
**页面路径**: `pages/express.vue`

**使用的API接口**:
- **获取APP下载信息**: `getAppInfo()`
  - 接口地址: `/apis/api/update/updateInfo`
  - 请求方法: GET
  - 使用场景: 获取客户端下载链接

**页面功能**:
- 运车服务介绍
- 服务优势展示
- 客户评价
- 下载客户端

---

### 3. 汽车物流 (`/logistics`)
**页面路径**: `pages/logistics.vue`

**使用的API接口**:
- **获取大板物流线路（分页）**: `getLargeBoardLine()`
  - 接口地址: `/api/home/getLargeBoardLine/1/100`
  - 请求方法: POST
  - 使用场景: 物流线路查询、线路列表展示

- **获取大板物流线路（不分页）**: `getAllLargeBoardLine()`
  - 接口地址: `/api/home/getAllLargeBoardLine`
  - 请求方法: GET
  - 使用场景: 物流线路查询、线路列表展示

- **网点入驻申请**: `networkSettleApply()`
  - 接口地址: `/api/home/networkSettleApply`
  - 请求方法: POST
  - 使用场景: 物流网点入驻申请

- **获取APP下载信息**: `getAppInfo()`
  - 接口地址: `/apis/api/update/updateInfo`
  - 请求方法: GET
  - 使用场景: 获取客户端下载链接

- **获取运费报价**: `websiteOrderFee()`
  - 接口地址: `/api/order/orderFeeV4`
  - 请求方法: POST
  - 使用场景: 获取运费报价

- **获取图片验证码**: `fetchCaptchaImg()`
  - 接口地址: `/apis/order/vehicleOrder/captcha/img`
  - 请求方法: GET
  - 使用场景: 获取图片验证码

- **校验图片验证码**: `checkCaptchaCode()`
  - 接口地址: `/apis/order/vehicleOrder/captcha/img/check`
  - 请求方法: GET
  - 使用场景: 校验图片验证码

- **发送短信验证码（带图片验证码）**: `handleSendSMS()`
  - 接口地址: `/apis/order/vehicleOrder/captcha/phone`
  - 请求方法: POST
  - 使用场景: 发送短信验证码（带图片验证码校验）

- **添加车辆订单**: `submitForm()`
  - 接口地址: `/apis/order/vehicleOrder/add`
  - 请求方法: POST
  - 使用场景: 添加车辆订单（询价）

- **埋点**: `websiteBehaviorAdd()`
  - 接口地址: `/event/websiteBehavior/add`
  - 请求方法: POST
  - 使用场景: 用户行为追踪

**页面功能**:
- 大板托运，物流运车集散中心
- 物流线路查询
- 物流服务优势
- 网点入驻申请
- 获取运费报价

---

### 4. 代驾/取送车 (`/driving`)
**页面路径**: `pages/driving.vue`

**使用的API接口**:
- 无直接API调用

**页面功能**:
- 代驾服务介绍
- 代驾流程展示
- 聊天记录展示

---

### 5. 拖车司机加入 (`/driver`)
**页面路径**: `pages/driver.vue`

**使用的API接口**:
- **发送短信验证码**: `sendSmsCode()`
  - 接口地址: `/gps/captcha/sendSmsCode/{phone}`
  - 请求方法: GET
  - 使用场景: 司机注册获取验证码

- **司机注册（品牌官网）**: `officialWebsiteDriverRegister()`
  - 接口地址: `/api/user/sjyzmLoginV2`
  - 请求方法: POST
  - 使用场景: 司机注册

- **无车加入**: `buyCarLine()`
  - 接口地址: `/api/home/buyCarLine`
  - 请求方法: POST
  - 使用场景: 无车司机加入

- **代驾司机入驻预检查**: `preCheck()`
  - 接口地址: `/api/user/register/preCheck`
  - 请求方法: POST
  - 使用场景: 司机入驻前检查

- **获取APP下载信息**: `getAppInfo()`
  - 接口地址: `/apis/api/update/updateInfo`
  - 请求方法: GET
  - 使用场景: 获取司机端下载链接

- **埋点**: `websiteBehaviorAdd()`
  - 接口地址: `/event/websiteBehavior/add`
  - 请求方法: POST
  - 使用场景: 用户行为追踪

**页面功能**:
- 司机注册
- 无车加入
- 买车接活
- 加入流程
- 司机评价

---

### 6. 代驾司机加入 (`/proxy`)
**页面路径**: `pages/proxy.vue`

**使用的API接口**:
- **代驾司机入驻预检查**: `preCheck()`
  - 接口地址: `/api/user/register/preCheck`
  - 请求方法: POST
  - 使用场景: 代驾司机入驻前检查

- **代驾司机入驻获取验证码**: `proxySendSmsCode()`
  - 接口地址: `/api/user/sendYzmV2`
  - 请求方法: POST
  - 使用场景: 代驾司机入驻获取验证码

- **代驾司机入驻提交**: `officialWebsiteProxyRegister()`
  - 接口地址: `/api/user/sjyzmLoginV2`
  - 请求方法: POST
  - 使用场景: 代驾司机入驻提交

- **切换司机APP类型**: `officialWebsiteSwitchDriver()`
  - 接口地址: `/valet-api/valet/driver/switchDriver/{device}/{driver}/{appType}`
  - 请求方法: GET
  - 使用场景: 切换司机APP类型

**页面功能**:
- 代驾司机注册
- 代驾流程展示

---

### 7. 企业/救援公司入驻 (`/site`)
**页面路径**: `pages/site.vue`

**使用的API接口**:
- **获取所有站点**: `useHttp.get('/api/home/getAllSite')`
  - 接口地址: `/api/home/getAllSite`
  - 请求方法: GET
  - 使用场景: 获取全国站点信息

**页面功能**:
- 城市网点展示
- 全国直营店展示
- 地图展示

---

### 8. 拖车咨询 (`/agent`)
**页面路径**: `pages/agent.vue`

**使用的API接口**:
- **代理加盟咨询**: `agentConsultationApply()`
  - 接口地址: `/api/home/agentConsultationApply`
  - 请求方法: POST
  - 使用场景: 代理加盟咨询

**页面功能**:
- 合作收益展示
- 入驻流程展示
- 联系方式

---

### 9. 关于我们 (`/about`)
**页面路径**: `pages/about/index.vue`

**使用的API接口**:
- 无直接API调用

**页面功能**:
- 公司介绍
- 企业文化展示

---

### 10. 联系我们 (`/about/connect`)
**页面路径**: `pages/about/connect.vue`

**使用的API接口**:
- 无直接API调用

**页面功能**:
- 商务合作联系方式
- 城市代理联系方式
- 品牌合作联系方式
- 客服热线
- 地址展示

---

### 11. 加入我们 (`/about/join`)
**页面路径**: `pages/about/join.vue`

**使用的API接口**:
- **获取所有职位**: `useHttp.get('/api/home/getAllPost')`
  - 接口地址: `/api/home/getAllPost`
  - 请求方法: GET
  - 使用场景: 获取所有职位信息

**页面功能**:
- 社会招聘
- 校园招聘
- 简历投递

---

### 12. 职位详情 (`/about/jobs`)
**页面路径**: `pages/about/jobs.vue`

**使用的API接口**:
- **获取所有职位**: `useHttp.get('/api/home/getAllPost')`
  - 接口地址: `/api/home/getAllPost`
  - 请求方法: GET
  - 使用场景: 获取所有职位信息

**页面功能**:
- 职位列表展示
- 职位详情查看

---

## API接口详细说明

### 1. 新闻相关接口

#### 1.1 获取新闻类型
- **接口地址**: `/api/home/getAllNewsType`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `NewsType[]`
- **使用场景**: 首页新闻分类、新闻列表页
- **示例代码**:
```typescript
import { getAllNewsType } from "~/api";

const { data } = await getAllNewsType();
```

#### 1.2 获取新闻列表
- **接口地址**: `/api/home/newsList/1/10`
- **请求方法**: POST
- **请求参数**:
  - `newsTypeId`: 新闻类型ID (number)
- **返回数据类型**: `NewsItem[]`
- **使用场景**: 首页新闻列表、新闻详情页
- **示例代码**:
```typescript
import { getNewsList } from "~/api";

const { data } = await getNewsList({
  newsTypeId: 1,
});
```

### 2. 物流线路相关接口

#### 2.1 获取大板物流线路（分页）
- **接口地址**: `/api/home/getLargeBoardLine/1/100`
- **请求方法**: POST
- **请求参数**:
  - `origin`: 起点城市代码 (number)
  - `destination`: 终点城市代码 (number)
  - `originCity`: 起点城市名称 (string)
  - `destinationCity`: 终点城市名称 (string)
- **返回数据类型**: `LineItem[]`
- **使用场景**: 物流线路查询、线路列表展示
- **示例代码**:
```typescript
import { getLargeBoardLine } from "~/api";

const { data } = await getLargeBoardLine({
  origin: 110000,
  destination: 440000,
  originCity: "北京",
  destinationCity: "广州",
});
```

#### 2.2 获取大板物流线路（不分页）
- **接口地址**: `/api/home/getAllLargeBoardLine`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `LineItem[]`
- **使用场景**: 物流线路查询、线路列表展示
- **示例代码**:
```typescript
import { getAllLargeBoardLine } from "~/api";

const { data } = await getAllLargeBoardLine();
```

### 3. 网点入驻相关接口

#### 3.1 网点入驻申请
- **接口地址**: `/api/home/networkSettleApply`
- **请求方法**: POST
- **请求参数**:
  - `linkPerson`: 联系人 (string)
  - `phone`: 联系电话 (string)
  - `remark`: 备注 (string)
  - `source`: 来源 (number)
- **返回数据类型**: `any`
- **使用场景**: 物流网点入驻申请
- **示例代码**:
```typescript
import { networkSettleApply } from "~/api";

const { data } = await networkSettleApply({
  linkPerson: "张三",
  phone: "13800138000",
  remark: "车辆自有数量、大板数量、小板数量、司机人数、地跑人数、可托运车型等",
  source: 3017,
});
```

### 4. 协议政策相关接口

#### 4.1 用户服务协议
- **接口地址**: `/apis/api/agreement/info/user_agreement`
- **请求方法**: GET
- **请求参数**:
  - `channelSource`: 渠道来源 (number)
  - `appentitysource`: 应用实体来源 (number)
- **返回数据类型**: `any`
- **使用场景**: 用户服务协议展示
- **示例代码**:
```typescript
import { userPolicy } from "~/api";

const { data } = await userPolicy({
  channelSource: 102,
  appentitysource: 102,
});
```

#### 4.2 隐私政策
- **接口地址**: `/apis/api/agreement/info/privacy_agreement`
- **请求方法**: GET
- **请求参数**:
  - `channelSource`: 渠道来源 (number)
  - `appentitysource`: 应用实体来源 (number)
- **返回数据类型**: `any`
- **使用场景**: 隐私政策展示
- **示例代码**:
```typescript
import { privacyPolicy } from "~/api";

const { data } = await privacyPolicy({
  channelSource: 102,
  appentitysource: 102,
});
```

### 5. 验证码相关接口

#### 5.1 发送短信验证码
- **接口地址**: `/gps/captcha/sendSmsCode/{phone}`
- **请求方法**: GET
- **请求参数**:
  - `phone`: 手机号 (string)
- **返回数据类型**: `any`
- **使用场景**: 司机注册、代驾注册、网点入驻等需要短信验证的场景
- **示例代码**:
```typescript
import { sendSmsCode } from "~/api";

const { data } = await sendSmsCode("13800138000");
```

### 6. 司机注册相关接口

#### 6.1 司机注册（品牌官网）
- **接口地址**: `/api/user/sjyzmLoginV2`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `verify_code`: 验证码 (string)
  - `checked`: 是否同意协议 (boolean)
  - `source`: 来源 (number)
  - `device_code`: 设备码 (number)
  - `usertype`: 用户类型 (string)
  - `registerSource`: 注册来源 (number)
  - `smsType`: 短信类型 (number)
  - `channelSource`: 渠道来源 (number)
  - `appType`: 应用类型 (number)
- **返回数据类型**: `any`
- **使用场景**: 司机注册
- **示例代码**:
```typescript
import { officialWebsiteDriverRegister } from "~/api";

const { data } = await officialWebsiteDriverRegister({
  phone: "13800138000",
  verify_code: "1234",
  checked: true,
  source: 3017,
  device_code: Date.now(),
  usertype: "driver",
  registerSource: 14,
  smsType: 1,
  channelSource: 3017,
  appType: 1,
});
```

#### 6.2 无车加入
- **接口地址**: `/api/home/buyCarLine`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `source`: 来源 (number)
- **返回数据类型**: `any`
- **使用场景**: 无车司机加入
- **示例代码**:
```typescript
import { buyCarLine } from "~/api";

const { data } = await buyCarLine({
  phone: "13800138000",
  source: 3017,
});
```

### 7. 代驾司机入驻相关接口

#### 7.1 代驾司机入驻预检查
- **接口地址**: `/api/user/register/preCheck`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `userType`: 用户类型 (number)
  - `userRole`: 用户角色 (number)
- **返回数据类型**: `any`
- **使用场景**: 代驾司机入驻前检查
- **示例代码**:
```typescript
import { preCheck } from "~/api";

const { data } = await preCheck({
  phone: "13800138000",
  userType: 2,
  userRole: 1,
});
```

#### 7.2 代驾司机入驻获取验证码
- **接口地址**: `/api/user/sendYzmV2`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `user_type`: 用户类型 (string)
  - `purpose`: 目的 (number)
  - `smsType`: 短信类型 (number)
- **返回数据类型**: `any`
- **使用场景**: 代驾司机入驻获取验证码
- **示例代码**:
```typescript
import { proxySendSmsCode } from "~/api";

const { data } = await proxySendSmsCode({
  phone: "13800138000",
  user_type: "driver",
  purpose: 1,
  smsType: 1,
});
```

#### 7.3 代驾司机入驻提交
- **接口地址**: `/api/user/sjyzmLoginV2`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `verify_code`: 验证码 (string)
  - `usertype`: 用户类型 (string)
  - `device_code`: 设备码 (number)
  - `registerSource`: 注册来源 (number)
  - `smsType`: 短信类型 (number)
  - `channelSource`: 渠道来源 (number)
  - `appType`: 应用类型 (number)
- **返回数据类型**: `any`
- **使用场景**: 代驾司机入驻提交
- **示例代码**:
```typescript
import { officialWebsiteProxyRegister } from "~/api";

const { data } = await officialWebsiteProxyRegister({
  phone: "13800138000",
  verify_code: "1234",
  usertype: "driver",
  device_code: Date.now(),
  registerSource: 14,
  smsType: 1,
  channelSource: 3017,
  appType: 2,
});
```

### 8. 代理加盟相关接口

#### 8.1 代理加盟咨询
- **接口地址**: `/api/home/agentConsultationApply`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
- **返回数据类型**: `any`
- **使用场景**: 代理加盟咨询
- **示例代码**:
```typescript
import { agentConsultationApply } from "~/api";

const { data } = await agentConsultationApply({
  phone: "13800138000",
});
```

### 9. 司机APP切换相关接口

#### 9.1 切换司机APP类型
- **接口地址**: `/valet-api/valet/driver/switchDriver/{device}/{driver}/{appType}`
- **请求方法**: GET
- **请求参数**:
  - `device`: 设备ID (number)
  - `driver`: 司机ID (string)
  - `appType`: 应用类型 (number)
- **返回数据类型**: `any`
- **使用场景**: 切换司机APP类型
- **示例代码**:
```typescript
import { officialWebsiteSwitchDriver } from "~/api";

const { data } = await officialWebsiteSwitchDriver(
  Date.now(),
  "123456",
  2
);
```

### 10. 埋点相关接口

#### 10.1 网站行为埋点
- **接口地址**: `/event/websiteBehavior/add`
- **请求方法**: POST
- **请求参数**:
  - `eventName`: 事件名称 (string)
  - `eventPos`: 事件位置 (string)
  - `eventSource`: 事件来源 (number)
- **返回数据类型**: `any`
- **使用场景**: 用户行为追踪、数据分析
- **示例代码**:
```typescript
import { websiteBehaviorAdd } from "~/api";

const { data } = await websiteBehaviorAdd({
  eventName: "trailer_consult",
  eventPos: "trailer_consult",
  eventSource: 1,
});
```

### 11. 订单费用相关接口

#### 11.1 获取订单费用
- **接口地址**: `/api/order/orderFeeV4`
- **请求方法**: POST
- **请求参数**:
  - `channelSource`: 渠道来源 (string)
  - `orderType`: 订单类型 (number)
  - `carTypeCode`: 车辆类型代码 (number)
  - `carType`: 车辆类型 (string)
  - `origin`: 起点 (number)
  - `originCity`: 起点城市 (string)
  - `originProvince`: 起点省份 (string)
  - `destination`: 终点 (number)
  - `destCity`: 终点城市 (string)
  - `destProvince`: 终点省份 (string)
  - `phone`: 手机号 (string)
  - `remark`: 备注 (string)
- **返回数据类型**: `any`
- **使用场景**: 获取运费报价
- **示例代码**:
```typescript
import { websiteOrderFee } from "~/api";

const { data } = await websiteOrderFee({
  channelSource: "3017",
  orderType: 0,
  carTypeCode: 1,
  carType: "轿车",
  origin: 110000,
  originCity: "北京",
  originProvince: "北京",
  destination: 440000,
  destCity: "广州",
  destProvince: "广东",
  phone: "13800138000",
  remark: "备注信息",
});
```

### 12. 验证码校验相关接口

#### 12.1 获取图片验证码
- **接口地址**: `/apis/order/vehicleOrder/captcha/img`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `any`
- **使用场景**: 获取图片验证码
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.get('/apis/order/vehicleOrder/captcha/img');
```

#### 12.2 校验图片验证码
- **接口地址**: `/apis/order/vehicleOrder/captcha/img/check`
- **请求方法**: GET
- **请求参数**:
  - `uuid`: UUID (string)
  - `captchaCode`: 验证码 (string)
- **返回数据类型**: `any`
- **使用场景**: 校验图片验证码
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.get('/apis/order/vehicleOrder/captcha/img/check', {
  uuid: "123456",
  captchaCode: "1234",
});
```

#### 12.3 发送短信验证码（带图片验证码）
- **接口地址**: `/apis/order/vehicleOrder/captcha/phone`
- **请求方法**: POST
- **请求参数**:
  - `phone`: 手机号 (string)
  - `captchaCode`: 图片验证码 (string)
  - `userType`: 用户类型 (string)
  - `uuid`: UUID (string)
- **返回数据类型**: `any`
- **使用场景**: 发送短信验证码（带图片验证码校验）
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.post('/apis/order/vehicleOrder/captcha/phone', {
  phone: "13800138000",
  captchaCode: "1234",
  userType: "customer",
  uuid: "123456",
});
```

### 13. 订单相关接口

#### 13.1 添加车辆订单
- **接口地址**: `/apis/order/vehicleOrder/add`
- **请求方法**: POST
- **请求参数**:
  - `channelSource`: 渠道来源 (string)
  - `orderType`: 订单类型 (number)
  - `carTypeCode`: 车辆类型代码 (number)
  - `carType`: 车辆类型 (string)
  - `origin`: 起点 (number)
  - `originCity`: 起点城市 (string)
  - `originProvince`: 起点省份 (string)
  - `destination`: 终点 (number)
  - `destCity`: 终点城市 (string)
  - `destProvince`: 终点省份 (string)
  - `phone`: 手机号 (string)
  - `captchaCode`: 图片验证码 (string)
  - `captchaPhone`: 短信验证码 (string)
  - `remark`: 备注 (string)
- **返回数据类型**: `any`
- **使用场景**: 添加车辆订单（询价）
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.post('/apis/order/vehicleOrder/add', {
  channelSource: "3017",
  orderType: 0,
  carTypeCode: 1,
  carType: "轿车",
  origin: 110000,
  originCity: "北京",
  originProvince: "北京",
  destination: 440000,
  destCity: "广州",
  destProvince: "广东",
  phone: "13800138000",
  captchaCode: "1234",
  captchaPhone: "5678",
  remark: "备注信息",
});
```

### 14. 下载相关接口

#### 14.1 获取APP下载信息
- **接口地址**: `/apis/api/update/updateInfo`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `DownloadMsg`
- **使用场景**: 获取APP下载链接和版本信息
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.get('/apis/api/update/updateInfo');
```

### 15. 站点相关接口

#### 15.1 获取所有站点
- **接口地址**: `/api/home/getAllSite`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `SiteList[]`
- **使用场景**: 获取全国站点信息
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.get('/api/home/getAllSite');
```

### 16. 职位相关接口

#### 16.1 获取所有职位
- **接口地址**: `/api/home/getAllPost`
- **请求方法**: GET
- **请求参数**: 无
- **返回数据类型**: `PostData[]`
- **使用场景**: 获取所有职位信息
- **示例代码**:
```typescript
import { useHttp } from "~/utils/useHttp";

const { data } = await useHttp.get('/api/home/getAllPost');
```

## 数据类型定义

### NewsItem
```typescript
{
  coverImg: string;        // 封面图片
  title: string;           // 标题
  briefIntroduction: string; // 简介
  id: number;              // ID
  publishTime: string;     // 发布时间
  newsTypeId: number;      // 新闻类型ID
}
```

### NewsType
```typescript
{
  newsType: string;        // 新闻类型
  id: number;              // ID
}
```

### LineItem
```typescript
{
  destinationCity: string;     // 终点城市
  destinationCode: string;     // 终点代码
  destinationLatitude?: string; // 终点纬度
  destinationLongitude?: string; // 终点经度
  destinationProvince: string; // 终点省份
  originCity: string;          // 起点城市
  originCode: string;          // 起点代码
  originLatitude?: string;     // 起点纬度
  originLongitude?: string;    // 起点经度
  originProvince: string;      // 起点省份
  mileage?: Nullish;           // 里程
  lineType?: Number            // 线路类型
}
```

### SiteItem
```typescript
{
  createBy: string;
  createTime: string;
  deleteStatus: number;
  id: number;
  isSortNum: any;
  linkPhone: string;
  remark: string;
  siteAddress: string;
  siteHeadPerson: string;
  siteLola: string;
  siteName: string;
  siteType: number;
  sortNum: number;
  updateBy: string;
  updateTime?: string;
}
```

### SiteList
```typescript
{
  siteList: SiteItem[];
  siteType: number;
}
```

### PostData
```typescript
{
  postTypeList: PostTypeList[];
  recruitType: number;
}
```

### PostTypeList
```typescript
{
  pcImg: string;
  postList: PostList[];
  postType: string;
  postTypeId: number;
  sortNum: any;
  wapImg: string;
}
```

### PostList
```typescript
{
  createBy: string;
  createTime: string;
  deleteStatus: number;
  deptId: number;
  id: number;
  isNegotiable: number;
  isSortNum: any;
  pcImg: string;
  postName: string;
  postRequirement: string;
  postTypeId: number;
  postTypeName: string;
  postTypeSortNum: number;
  postTypeStatus: any;
  publishTime: string;
  recruitType: number;
  salaryMax: string;
  salaryMin: string;
  salaryUnit: string;
  sortNum: number;
  status: number;
  updateBy: string;
  updateTime: any;
  wapImg: string;
  workSite: string;
}
```

### DownloadMsg
```typescript
{
  customerAndroidVersionName: string;    // 客户端Android版本名称
  customerAndroidVersionNum: string;     // 客户端Android版本号
  customerAndroidDownload: string;       // 客户端Android下载链接
  customerAndroidLog: string;            // 客户端Android更新日志
  customerAndroidIsForceupdate: number;  // 客户端Android是否强制更新
  customerIosVersionName: string;        // 客户端iOS版本名称
  customerIosVersionNum: string;         // 客户端iOS版本号
  customerIosDownload: string;           // 客户端iOS下载链接
  customerIosLog: string;                // 客户端iOS更新日志
  customerIosIsForceupdate: number;      // 客户端iOS是否强制更新
  driverAndroidVersionName: string;      // 司机端Android版本名称
  driverAndroidVersionNum: string;       // 司机端Android版本号
  driverAndroidDownload: string;         // 司机端Android下载链接
  driverAndroidLog: string;              // 司机端Android更新日志
  driverAndroidIsForceupdate: number;    // 司机端Android是否强制更新
  driverIosVersionName: string;          // 司机端iOS版本名称
  driverIosVersionNum: string;           // 司机端iOS版本号
  driverIosDownload: string;             // 司机端iOS下载链接
  driverIosLog: string;                  // 司机端iOS更新日志
  driverIosIsForceupdate: number;        // 司机端iOS是否强制更新
  baseIosDriver: string;                 // 基础iOS司机端
  baseIosCustomer: string;               // 基础iOS客户端
  baseAndroidDriver: number;             // 基础Android司机端
  baseAndroidCustomer: number;           // 基础Android客户端
  customerAndroidWebUpgradeState: number; // 客户端AndroidWeb升级状态
  customerAndroidWebUpgradeLink: string;  // 客户端AndroidWeb升级链接
  driverAndroidWebUpgradeState: number;   // 司机端AndroidWeb升级状态
  driverAndroidWebUpgradeLink: string;    // 司机端AndroidWeb升级链接
}
```

## 使用示例

### 1. 获取新闻类型和新闻列表
```typescript
import { getAllNewsType, getNewsList } from "~/api";

// 获取新闻类型
const { data: newsTypes } = await getAllNewsType();

// 获取新闻列表
const { data: newsList } = await getNewsList({
  newsTypeId: newsTypes.value[0].id,
});
```

### 2. 获取物流线路
```typescript
import { getLargeBoardLine } from "~/api";

// 获取物流线路
const { data: lines } = await getLargeBoardLine({
  origin: 110000,
  destination: 440000,
  originCity: "北京",
  destinationCity: "广州",
});
```

### 3. 司机注册
```typescript
import { sendSmsCode, officialWebsiteDriverRegister } from "~/api";

// 发送验证码
await sendSmsCode("13800138000");

// 注册
const { data } = await officialWebsiteDriverRegister({
  phone: "13800138000",
  verify_code: "1234",
  checked: true,
  source: 3017,
  device_code: Date.now(),
  usertype: "driver",
  registerSource: 14,
  smsType: 1,
  channelSource: 3017,
  appType: 1,
});
```

### 4. 获取运费报价
```typescript
import { websiteOrderFee } from "~/api";

// 获取运费报价
const { data } = await websiteOrderFee({
  channelSource: "3017",
  orderType: 0,
  carTypeCode: 1,
  carType: "轿车",
  origin: 110000,
  originCity: "北京",
  originProvince: "北京",
  destination: 440000,
  destCity: "广州",
  destProvince: "广东",
  phone: "13800138000",
  remark: "备注信息",
});
```

### 5. 埋点
```typescript
import { websiteBehaviorAdd } from "~/api";

// 埋点
await websiteBehaviorAdd({
  eventName: "trailer_consult",
  eventPos: "trailer_consult",
  eventSource: 1,
});
```

## 注意事项

1. **环境变量配置**: 请确保正确配置环境变量，特别是 `VITE_APP_API` 和 `VITE_APP_PROXY_API`。
2. **请求头**: 所有API请求都会自动添加请求头，包括 `userType`、`timestamp`、`sign`、`Content-Language` 和 `channelSource`。
3. **错误处理**: 建议在调用API时添加错误处理逻辑，以应对网络异常或服务器错误。
4. **数据验证**: 在调用API前，建议对参数进行验证，确保数据格式正确。
5. **缓存策略**: 部分接口支持缓存，可以通过 `server: false` 参数控制是否在服务端请求。
6. **验证码**: 需要先获取图片验证码，再发送短信验证码，最后进行注册或登录。
7. **协议政策**: 用户服务协议和隐私政策需要通过 `channelSource` 和 `appentitysource` 参数获取。
8. **埋点**: 埋点接口用于用户行为追踪，建议在关键操作时调用。
9. **下载链接**: APP下载链接通过 `/apis/api/update/updateInfo` 接口获取，根据操作系统自动选择下载链接。
10. **订单费用**: 获取运费报价需要先校验手机号，然后发送验证码，最后提交订单。

## 接口调用流程

### 司机注册流程
1. 调用 `preCheck` 接口检查手机号是否已注册
2. 调用 `sendSmsCode` 接口发送短信验证码
3. 调用 `officialWebsiteDriverRegister` 接口提交注册信息
4. 调用 `buyCarLine` 接口（可选）提交买车线索

### 代驾司机入驻流程
1. 调用 `preCheck` 接口检查手机号是否已注册
2. 调用 `proxySendSmsCode` 接口发送短信验证码
3. 调用 `officialWebsiteProxyRegister` 接口提交注册信息
4. 调用 `officialWebsiteSwitchDriver` 接口切换司机APP类型

### 物流询价流程
1. 调用 `getLargeBoardLine` 接口获取物流线路
2. 调用 `websiteOrderFee` 接口获取运费报价
3. 调用 `websiteBehaviorAdd` 接口埋点

### 网点入驻流程
1. 调用 `networkSettleApply` 接口提交入驻申请

### 代理加盟流程
1. 调用 `agentConsultationApply` 接口提交加盟咨询

## 接口版本说明

- **当前版本**: v1.0
- **更新日期**: 2024-08-20
- **维护者**: [author]
- **联系方式**: [example@mail.com]

## 附录

### 环境变量说明

| 变量名               | 说明        | 示例值                                              |
| -------------------- | ----------- | --------------------------------------------------- |
| `VITE_APP_API`       | API基础地址 | `https://git.chetuoche.net/official-website-server` |
| `VITE_APP_PROXY_API` | 代理API地址 | `https://test.chetuoche.net`                        |

### 请求头说明

| 请求头             | 说明     | 示例值                          |
| ------------------ | -------- | ------------------------------- |
| `userType`         | 用户类型 | `web`                           |
| `timestamp`        | 时间戳   | `1724083200000`                 |
| `sign`             | 签名     | `md5(timestamp + "web")`        |
| `Content-Language` | 内容语言 | `zh-CN`                         |
| `channelSource`    | 渠道来源 | `3017` (PC端) / `3016` (移动端) |

### 错误码说明

| 错误码  | 说明                             |
| ------- | -------------------------------- |
| `0`     | 成功                             |
| `1`     | 失败                             |
| `11001` | 已接收到您的询价单，请勿重复提交 |

### 响应格式

所有API接口返回统一格式：

```json
{
  "data": {
    // 具体数据
  },
  "code": 0,
  "message": true
}
```

### 数据类型说明

- `Nullish`: `null | string | number`
- `any`: 任意类型
- `number`: 数字类型
- `string`: 字符串类型
- `boolean`: 布尔类型

## 更新日志

### v1.0 (2024-08-20)
- 初始版本
- 整理所有API接口
- 添加接口使用示例
- 添加数据类型定义
- 添加接口调用流程
- 按页面路由分类整理
