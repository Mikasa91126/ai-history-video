# Logo 素材来源登记

采集日期：**2026-10-17**
用途：AI Agent 巡礼科普视频；AI 编年史视频（第二批，2026-10-17）
（评论/介绍性质使用，非商业授权素材）

> **商标声明**：下列标志的商标权与著作权归各自权利人所有（Anthropic、OpenAI、Google LLC、
> 北京火山引擎/字节跳动（豆包）、月之暗面 Moonshot AI（Kimi）、Manus AI、DeepSeek、
> Meta Platforms、Stability AI、Black Forest Labs、阿里巴巴通义千问 Qwen、智谱 AI、
> MiniMax、Midjourney、Runway、xAI）。
> 本片为科普评论用途，仅作标识指代，不表示任何形式的合作、赞助或背书。
> 如需商用发行，请另行取得各品牌方的授权或遵循其品牌规范。

---

## 第一批采集结果总览

| 文件名 | 品牌 | 格式 | 来源方式 | viewBox | 原色版 |
|---|---|---|---|---|---|
| `claude.svg` | Claude / Anthropic | SVG（原色） | lobe-icons（第三方官方图标库） | `0 0 24 24` | 是 `#D97757` |
| `openai.svg` | OpenAI | SVG（单色） | simple-icons | `0 0 24 24` | 品牌本身即单色（黑） |
| `google.svg` | Google | SVG（原色） | lobe-icons（第三方官方图标库） | `0 0 24 24` | 是（4 色 G） |
| `doubao.svg` | 豆包 / 字节跳动 | SVG（原色） | lobe-icons（第三方官方图标库） | `0 0 24 24` | 是（蓝/青/紫） |
| `kimi.svg` | Kimi / 月之暗面 | SVG（单色） | simple-icons | `0 0 24 24` | 否（可着色） |
| `manus.svg` | Manus | SVG（原色） | **品牌官网** manus.im | `0 0 32 32` | 是 `#34322D` |

第一批 6 枚均为**矢量 SVG**，无 PNG 降级项。已通过 `xml.etree` 解析（合法 XML）
且均含 `viewBox`。

---

## 逐枚明细

### 1. `claude.svg` — Claude / Anthropic 星芒标

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg/icons/claude-color.svg`
- 格式：**原色**（单色路径，填充 Claude 官方珊瑚橙 `#D97757`）
- viewBox：`0 0 24 24`；1 条 path
- 处理：迁移 `width/height="1em"` → `24`，移除内联 flex 样式，路径与配色原样保留。
- 备选（单色，simple-icons）：
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg`
  （另有 `.../icons/anthropic.svg`，那是 Anthropic 的字母 A 标，非星芒，未采用）

### 2. `openai.svg` — OpenAI 花结标

- 来源 URL：`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/openai.svg`
- 格式：**单色**（无 fill 属性，默认渲染为黑）——OpenAI 官方标识本身就是单色黑白，
  故此即官方原色处理方式。
- viewBox：`0 0 24 24`；1 条 path
- 处理：原样保存，未改动。
- 备注：需要染色时用 CSS `fill` 覆盖即可（`path { fill: #fff }`）。

### 3. `google.svg` — Google「G」

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg/icons/google-color.svg`
- 格式：**原色**（官方 4 色：`#4285F4` 蓝 / `#34A853` 绿 / `#FBBC05` 黄 / `#EB4335` 红）
- viewBox：`0 0 24 24`；4 条 path
- 处理：迁移 `width/height="1em"` → `24`，移除内联 flex 样式。
- 备选（单色，simple-icons）：
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg`

### 4. `doubao.svg` — 豆包（字节跳动）

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg/icons/doubao-color.svg`
- 格式：**原色**（`#1E37FC` 蓝 ×2 / `#37E1BE` 青 / `#A569FF` 紫）
- viewBox：`0 0 24 24`；4 条 path
- 处理：迁移 `width/height="1em"` → `24`，移除内联 flex 样式。
- 备注：simple-icons **没有** `doubao` 条目（slug 探测 404）。
  品牌官网 favicon 仅有位图且最大 192×192（低于 256 门槛），故未采用：
  `https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/favicon/new-doubao/192x192.png`
  （官网 HTML/CSS/JS 中亦未发现矢量 logo 资源）。本枚为可用的原色矢量替代。

### 5. `kimi.svg` — Kimi / 月之暗面 Moonshot AI

- 来源 URL：`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/kimi.svg`
- 格式：**单色**（无 fill 属性，默认黑）
- viewBox：`0 0 24 24`；1 条 path
- 处理：原样保存，未改动。
- 备注：Kimi 品牌蓝为 `#1783FF`，可用 CSS `fill: #1783FF` 直接还原。
  lobe-icons 的 `kimi-color.svg` 经检查为「浅色 K + 蓝色角标」的深底反白版
  （K 字填充为 `#fff`），在白底上会不可见，故**未采用**，改用本单色版。
  simple-icons 另有 `.../icons/moonshotai.svg`（Moonshot AI 的环形标），非 Kimi 标，未采用。

### 6. `manus.svg` — Manus

- 来源 URL：`https://manus.im/icon.svg?icon.2kbcs13ndm9it.svg`
  （品牌官网 `https://manus.im/` HTML 中 `<link rel="icon" ... type="image/svg+xml">` 直链）
- 格式：**原色**（官方深色 `#34322D`）
- viewBox：`0 0 32 32`；4 条 path
- 处理：**唯一一处内容改动** —— 原文件带一层不透明白色圆角底板
  `<rect width="32" height="32" rx="5.05263" fill="white"/>`（App 图标样式），
  为便于视频中透明叠加，已删除该 rect。**logo 几何路径与官方配色完全未动。**
  若需要还原官方「白底圆角 App 图标」外观，把该 rect 贴回 `<svg>` 开头即可。
  （该 rect 原文件逐字保留在下方备忘中，可直接复制）
- 备选（单色，lobe-icons）：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg/icons/manus.svg`
- 备注：simple-icons **没有** `manus` 条目（slug 探测 404）。

原 rect 备忘：
```xml
<rect width="32" height="32" rx="5.05263" fill="white"/>
```

---

## 附注：DeepSeek 鲸鱼标（本工程既有素材，无需采集）

- 文件：`assets-src/deepseek-whale.svg`（本工程已有，**本次未采集、未改动**）
- 同目录另有 `assets-src/deepseek-logo-brandblue.svg`
- 来源：由项目方此前自行提供 / 采集，来源信息请参见该文件或项目既有记录。

---

## 采集路线备注（供后续复用）

1. **simple-icons CDN**（jsdelivr 可达，最省事）：`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg`
   - 本次命中：`openai` / `google` / `anthropic` / `claude` / `bytedance` / `moonshotai` / `kimi`
   - 未命中（404）：`doubao` / `manus`
2. **lobe-icons 静态 SVG 包**（覆盖国产 AI 品牌，含**原色**变体，jsdelivr/unpkg 均可达）：
   `https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg/icons/<name>.svg`
   原色变体加 `-color` 后缀（本次 `doubao-color` / `claude-color` / `google-color` / `kimi-color` 命中；
   `manus-color` / `moonshot-color` / `openai-color` 为 404）
3. **品牌官网** favicon / `<link rel="icon">` 直链（部分站点直接提供 SVG）
4. **Wikimedia Commons**：`commons.wikimedia.org` 与 `upload.wikimedia.org` 本机网络**超时不可达**，
   本次未使用，后续可直接跳过该路线。

---

# 第二批采集：AI 编年史视频（2026-10-17）

> **变更说明**：原清单 10 枚中的 **快手 / Kling（`kuaishou.svg`）** 已由用户同日决定删除，
> 未采集、未入库。因此本批实际交付 **9 枚**。以下合计列出本批 9 枚与工程原有 7 枚
> （含 DeepSeek），共 16 枚。

**本批来源统一说明**

- 除另有注明外，本批 9 枚均来自 **lobe-icons 静态 SVG 包**：
  `https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/<name>.svg`
- 2026-10-17 下载时 `@latest` 解析为 **1.95.1**；npm 包许可为 MIT，图标商标归各品牌所有。
  如需锁定版本，可把 URL 中的 `@latest` 换成 `@1.95.1`。
- 处理规则：仅将 `width="1em"` / `height="1em"` 统一改为 `24`，并移除
  `style="flex:none;line-height:1"`；`viewBox`、路径、渐变与配色均未改动。
- 本批全部为矢量 SVG，无 PNG 降级项。已通过 XML 解析、`viewBox`、`width/height=24`
  以及本地渐变 `url(#...)` 引用完整性校验。

## 全部清单（本批 9 + 原有 7）

| 文件名 | 品牌 | 批次 | 格式 | 来源 | 深色底是否需反白 |
|---|---|---|---|---|---|
| `meta.svg` | Meta | 第二批 | SVG 彩色（蓝渐变） | lobe-icons `meta-color` | 否 |
| `stability.svg` | Stability AI | 第二批 | SVG 彩色（紫渐变＋红点） | lobe-icons `stability-color` | 否 |
| `bfl.svg` | Black Forest Labs（FLUX） | 第二批 | SVG 单色 | lobe-icons `bfl` | **是** |
| `qwen.svg` | 通义千问 Qwen | 第二批 | SVG 彩色（紫渐变） | lobe-icons `qwen-color` | 否（暗底建议提亮） |
| `zhipu.svg` | 智谱 AI | 第二批 | SVG 彩色（品牌蓝） | lobe-icons `zhipu-color` | 否 |
| `minimax.svg` | MiniMax | 第二批 | SVG 彩色（品红→橙渐变） | lobe-icons `minimax-color` | 否 |
| `midjourney.svg` | Midjourney | 第二批 | SVG 单色（帆船） | lobe-icons `midjourney` | **是** |
| `runway.svg` | Runway | 第二批 | SVG 单色（R 标） | lobe-icons `runway` | **是** |
| `xai.svg` | xAI / Grok | 第二批 | SVG 单色（xAI 标） | lobe-icons `xai` | **是** |
| `kuaishou.svg` | 快手 / Kling | 第二批 | — | **已弃用，未采集/未入库** | — |
| `claude.svg` | Claude / Anthropic | 第一批 | SVG 彩色（珊瑚橙） | lobe-icons `claude-color` | 否 |
| `openai.svg` | OpenAI | 第一批 | SVG 单色 | simple-icons `openai` | **是** |
| `google.svg` | Google | 第一批 | SVG 彩色（四色 G） | lobe-icons `google-color` | 否 |
| `doubao.svg` | 豆包 / 字节跳动 | 第一批 | SVG 彩色 | lobe-icons `doubao-color` | 否 |
| `kimi.svg` | Kimi / 月之暗面 | 第一批 | SVG 单色 | simple-icons `kimi` | **是** |
| `manus.svg` | Manus | 第一批 | SVG 彩色（深灰 `#34322D`） | 品牌官网 `manus.im` | **是**（深灰接近黑色） |
| `deepseek.svg` | DeepSeek | 既有 | SVG 彩色（品牌蓝 `#4D6BFE`） | 工程既有素材 | 否 |

> `deepseek.svg` 当前位于 `public/logos/`；`assets-src/` 中的源文件为
> `deepseek-whale.svg` 与 `deepseek-logo-brandblue.svg`。本批未改动 DeepSeek。
> 第一批 6 枚的详细来源见上文；其 `viewBox` 分别为 24×24（`manus.svg` 为 32×32）。

## 本批逐枚明细

### 1. `meta.svg` — Meta 无限环

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/meta-color.svg`
- 格式：**彩色**，Meta 品牌蓝渐变（`#0867DF` / `#0064E0` / `#0082FB` 等），15 条 path / 13 组渐变
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**不需要反白**，蓝色渐变在纯黑背景上清晰
- 备注：采用 Meta 公司标志，可代表 Meta AI / Llama 相关段落。另有单色 `meta.svg`（lobe-icons）
  未采用。simple-icons 也有 `meta`（单色）备选。

### 2. `stability.svg` — Stability AI「S.」

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/stability-color.svg`
- 格式：**彩色**，`S` 为紫色渐变 `#9D39FF → #A380FF`，圆点为红色 `#E80000`
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**不需要反白**，紫红配色在黑色背景上可见

### 3. `bfl.svg` — Black Forest Labs

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/bfl.svg`
- 格式：**单色**（根节点 `fill="currentColor"`，外部 `<img>` 默认渲染为黑）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**需要反白**；对 `<img>` 使用 `filter: brightness(0) invert(1)`，
  内联 SVG 可设 `fill: #fff` 或将 `color` 设为白色
- 备注：lobe-icons 无 `bfl-color`（404）；simple-icons 无 `bfl` / `blackforestlabs`（404）。
  本标志为 BFL 的几何山峰/字母 A 标，也用于 FLUX 段落。

### 4. `qwen.svg` — 通义千问 Qwen

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/qwen-color.svg`
- 格式：**彩色**，官方紫色渐变 `#6336E7 → #6F69F7`（原文件两处 `stop-opacity=".84"`）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**不需要反白**（不要使用 invert，以免破坏紫色）；但 84% 不透明度在纯黑背景上略暗，
  如画面需要可把两个 `stop-opacity` 调整为 `1`，或加轻微 `brightness(1.15)`，不要用黑白反白
- 备注：simple-icons 也有单色 `qwen.svg` 备选（黑白），本片采用彩色版以保留品牌色。
  阿里巴巴集团/阿里云标并非 Qwen 标，未采用。

### 5. `zhipu.svg` — 智谱 AI

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/zhipu-color.svg`
- 格式：**彩色**，单色品牌蓝 `#3859FF`（圆点环状标志）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**不需要反白**，蓝色在黑色背景上可见
- 备注：智谱公司的 `zhipu` 标；产品 GLM/ChatGLM 另有 `chatglm-color.svg`（蓝紫渐变），
  按文件名与公司主体采用本枚，未改用 GLM 产品标。lobe-icons 的 `zhipu-color` 可用；
  simple-icons 无 `zhipu`（404）。

### 6. `minimax.svg` — MiniMax

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/minimax-color.svg`
- 格式：**彩色**，波形渐变 `#E2167E → #FE603C`（品红到橙）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**不需要反白**，渐变在黑色背景上清晰
- 备注：simple-icons 也有单色 `minimax` 备选，本片采用彩色版。

### 7. `midjourney.svg` — Midjourney 帆船

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/midjourney.svg`
- 格式：**单色**（`fill="currentColor"`；官方帆船线稿，外链 `<img>` 默认黑色）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**需要反白**，使用 `filter: brightness(0) invert(1)` 或白色填充
- 备注：lobe-icons 无 `midjourney-color`（404）；simple-icons 无 `midjourney`（404）。
  图形已核验为官方帆船/波浪轮廓。

### 8. `runway.svg` — Runway

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/runway.svg`
- 格式：**单色**（`fill="currentColor"`，Runway 的圆角 R 组合标）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**需要反白**，使用 `filter: brightness(0) invert(1)` 或白色填充
- 备注：lobe-icons 无 `runway-color`（404）；simple-icons 无 `runway`（404）。

### 9. `xai.svg` — xAI / Grok

- 来源 URL：`https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/xai.svg`
- 格式：**单色**（`fill="currentColor"`，xAI 的斜切 X 标；文件 `<title>` 为 Grok）
- viewBox：`0 0 24 24`；`width/height=24`
- 深色底：**需要反白**，使用 `filter: brightness(0) invert(1)` 或白色填充
- 备注：lobe-icons 无 `xai-color`（404）；simple-icons 无 `xai`（404）。本枚可直接用于
  xAI / Grok 段落。

### 10. `kuaishou.svg` — 快手 / Kling（已弃用）

- 状态：**已弃用（用户 2026-10-17 变更）**，未采集、未入库，不参与渲染。
- 说明：原任务要求快手/可灵标志；用户随后删除该品牌，故交付清单中不含此文件。
  `/tmp` 探测过程中未保留任何快手资产。其余 9 枚照常采集。

## 深色底使用建议

单色标（`bfl.svg`、`midjourney.svg`、`runway.svg`、`xai.svg`，以及原有的
`openai.svg`、`kimi.svg`）在纯黑/深色背景上请使用：

```css
filter: brightness(0) invert(1);
```

若内联 SVG，也可统一设 `fill: #fff`。`manus.svg` 的品牌深灰 `#34322D` 接近黑色，
深底建议同样反白（但会变成白色单色）。彩色标（Meta / Stability / Qwen / 智谱 /
MiniMax / Claude / Google / 豆包 / DeepSeek）**不要**应用 `brightness(0) invert(1)`，
否则会丢失品牌色；Qwen 若在纯黑上偏暗，按上文单独提亮。

## 校验记录

- 新增 9 枚均写入 `assets-src/logos/` 与 `public/logos/`，两处同名文件逐字节一致。
- Python `xml.etree` 解析通过；根节点均为 `svg`，`viewBox` 均为 `0 0 24 24`，
  `width/height` 均为 `24`，无 `<script>`，所有 `url(#...)` 均能解析到本地渐变/定义。
- 无 PNG 降级项；原有 7 枚未改动。
