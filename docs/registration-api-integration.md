# 公司名和品牌名注册核验 API 接入说明

日期：2026-06-02

## 接入目标

公司起名、品牌起名和品牌名测试页面已经加入注册核验层。静态站默认不请求后端接口，只展示本地风险提示与官方核验入口；部署真实后端后，可开启远程接口，返回每个候选名称的工商重名/近似风险和商标近似风险。

由于工商名称核准和商标注册审查都有官方流程，前端不能承诺“确保注册成功”。当前页面使用“预查”措辞，最终结果应以官方申报、官方检索和审查结论为准。

## 静态站本地预审规则

当前静态站会先做本地预审，不产生后端请求，也不会在控制台报错。预审覆盖：

- 公司名：行政区划、组织形式、禁限词、敏感行业词、候选名近似度、商号长度。
- 品牌名/商标名：显著性、通用宣传词、尾字弱显著性、商标类别、候选名近似度。
- 输出字段：`status`、`label`、`score`、`note`、`conflicts`、`sourceUrl`、`checkedAt`。

本地预审的目标是降低低级风险，不能替代官方数据库检索。

## 权威核验入口

- 企业名称申报系统：`https://wsdj.samr.gov.cn/saicmcdjweb/`
- 国家企业信用信息公示系统：`https://www.gsxt.gov.cn/`
- 国家知识产权局商标检索：`https://so.cnipa.cn/`

## 前端默认接口

### 公司名称预查

Endpoint:

```text
POST /api/registry/company-name-check
```

Request:

```json
{
  "kind": "company",
  "items": ["上海星辰科技有限公司", "上海瑞禾科技有限公司"],
  "context": {
    "region": "上海",
    "industry": "科技互联网",
    "suffix": "有限公司"
  }
}
```

Response:

```json
{
  "results": [
    {
      "name": "上海星辰科技有限公司",
      "status": "review",
      "label": "需人工复核",
      "note": "检索到近似主体，请进入官方系统继续核验。",
      "conflicts": ["上海星辰信息科技有限公司"],
      "sourceUrl": "https://www.gsxt.gov.cn/",
      "checkedAt": "2026-06-02T03:45:00+08:00",
      "evidence": {
        "source": "authorized_company_registry",
        "queryType": "exact_and_similar_name",
        "confidence": 0.86
      }
    }
  ]
}
```

### 商标名称预查

Endpoint:

```text
POST /api/registry/trademark-check
```

Request:

```json
{
  "kind": "trademark",
  "items": ["星禾", "云问"],
  "context": {
    "category": "AI 学习工具",
    "audience": "中小企业老板",
    "trademarkClass": "第42类 科技服务"
  }
}
```

Response:

```json
{
  "results": [
    {
      "name": "星禾",
      "status": "conflict",
      "label": "发现冲突",
      "note": "同类别存在近似商标，建议更换名称或调整类别。",
      "conflicts": ["星禾智造", "星禾科技"],
      "sourceUrl": "https://so.cnipa.cn/",
      "checkedAt": "2026-06-02T03:45:00+08:00",
      "evidence": {
        "source": "authorized_trademark_search",
        "queryType": "same_class_similar_mark",
        "confidence": 0.82
      }
    }
  ]
}
```

## Status 约定

- `available` 或 `clear`：未见明显冲突，可继续申报。
- `review`：需要人工复核，建议进入官方系统确认。
- `conflict` 或 `unavailable`：发现明显冲突，不建议直接使用。
- `unknown`：接口未连接或数据不足，不能判断。

## 前端配置

如部署路径不同，或已接入真实后端，可在 `columns-tools.js` 之前注入：

```html
<script>
  window.RegistryApiConfig = {
    enabled: true,
    companyEndpoint: "/api/registry/company-name-check",
    trademarkEndpoint: "/api/registry/trademark-check",
    timeoutMs: 6000
  };
</script>
```

## 后端实现建议

- 公司名：优先接国家市场监督管理总局名称申报/授权数据服务或合规第三方企业库，不建议在前端抓取官方页面。
- 商标：优先接国家知识产权局开放数据/授权检索服务或合规第三方商标库，并要求用户选择国际分类。
- 所有查询记录应保留 `sourceUrl`、`checkedAt` 和数据源版本。
- 对用户展示时必须保留“预查不等于注册成功”的边界提示。
