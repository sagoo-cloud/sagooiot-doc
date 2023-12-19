# 前端开发规范

前端使用 `ts` `vue3` `element-plus` 开发，开发新页面及功能时请遵循如下规范：

## 一、代码强制规则

<!-- `这里可以添加本文要记录的大概内容：` -->

### 1. 强制使用 `<script lang="ts" setup>`

必须使用 `setup` 语法糖， 禁止使用 `defineComponent`、必须使用 `ts` 进行代码编写。

- `setup` 能提高代码可读性，降低代码复杂度。
- `ts` 提供语法检查，提前发现代码错误。
- `vscode` 中可使用代码块注释，折叠时候可以自动将 `region` 标签包裹的内容折叠，并保留 `region` 后面的描述，可以把实现相同功能的代码包起来，开发时可能无关代码折叠，使代码更易读。

```js
// #region 代码功能描述

// 定一个字符串
const str1 = "这里是字符串1"

// 执行一些操作
function doSomething() {}

// 一些其他的代码
// ...

// #endregion
```

### 2. `rules` 表单验证校验用 `change` 禁止用 `blur`。

- 使用 change 事件进行表单验证，而不是 blur，以提高用户体验和减少错误提示。
- change 事件允许在用户完成输入后立即进行验证，提高即时性。
- 这样可以防止用户在未完成输入时收到错误提示，避免造成不必要的干扰。

### 3. 去掉页面多余的 log

- 在生产环境中删除所有 `console.log()` 和 `debugger` 语句，保持控制台清洁，提升性能。
- 已在打包配置中自动剔除日志语句，但仍需在开发过程中合理使用日志，但在代码提交前确保移除，避免过多无用 log 影响其他开发人员调试代码。

### 4. 多些注释说明

- 每个函数和重要代码块都应有注释说明其功能和用途。
- 注释应简洁明了，避免无关内容，确保后续维护者能快速理解代码意图。

### 5. 代码提交需要保证最小功能可用，可以少量多次提交

- 每次提交应确保一个功能点的完成，保持提交历史清晰。
- 避免大量更改一次性提交，以减少合并冲突和代码审查难度。
- 提交信息应具有描述性，清晰说明本次提交的更改内容。

### 6. 大页面需分多个组件进行编写

- 将大型页面分解为更小、更可管理的组件。
- 每个组件应聚焦于一个功能，保持独立性和可重用性。
- 这种方法有助于代码维护、测试和团队合作。

### 7. 优先使用 `const` 和 `let` ，避免使用 `var`。

- `const` 用于声明不会被重新赋值的变量，增加代码的可读性和稳定性。
- `let` 用于可能需要重新赋值的变量，限制其作用域在块级。
- 禁止使用 `var`，只有变量需要重新赋值时采用 `let`，其他情况用 `const`。

### 8. 符合代码校验规则

- 项目中已经配置代码规则的提示，禁止代码中出现标红或带浪线的提示。

## 二、页面及用户体验优化方式规则

### 1. el-upload 单文件上传情况下重新选择文件不生效

- 选择文件提交之后，不论成功还是失败，将选中文件列表置空，否则无法重新选择文件。

```vue
<template>
  <el-upload v-model:file-list="fileList" :limit="1" :on-success="updateImg">
    <el-button>数据导入</el-button>
  </el-upload>
</template>

<script lang="ts" setup>
const fileList = ref<any[]>([])

const updateImg = (res: any) => {
  // ...
  fileList.value = []
}
</script>
```

### 2. 页面撑满

为保持页面整理效果，避免内容少的时候主页面部分内容比较空，露出底色，需要用 css 样式对主页面部分进行铺满的填充。

```scss
// 已在全局定义好，页面里直接使用
.page-full {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  .page-full-part {
    flex: 1;
    overflow-y: auto;
  }
}
```

```vue
<template>
  <el-card shadow="nover" class="page-wrapper page-full">
    <section class="search-wrapper">...</section>
    <!-- page-full-part 会撑满中间部分，内容多会出现纵向滚动条。
    即使上面的搜索部分和下面的footer部分都不存在
    page-full-part也会撑满整个页面，来保证整体布局效果 -->
    <section class="content-wrapper page-full-part">
      <p v-for="i in 100" :key="i">...</p>
    </section>
    <section class="footer-wrapper">...</section>
  </el-card>
</template>
```

### 4. 表格高度

为保证表格部分整体显示效果，给 `el-table` 增加 `max-height="calc(100vh  - 210px)"` 属性，`210px` 具体是多少，可以按整体 `100vh` 减掉搜索栏的高度，页脚高度，直接间隙高度等，在开发时候调试出一个合适的大小。

这样能保证屏幕小或分页条数多的情况下，也能在页面正常显示出表格的 `header`和页脚部分，方便用户查看和操作页面跳转等。

```vue
<template>
  <el-card shadow="nover" class="page-wrapper page-full">
    <section class="search-wrapper">...</section>
    <el-table
      :data="list"
      max-height="calc(100vh  - 210px)"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column label="日期" prop="createdAt" align="center" />
    </el-table>
  </el-card>
</template>
```

### 5. 表单编辑弹窗关闭时要清空表单

```vue
<template>
  <el-dialog
    v-model="showDialog"
    :title="`${formData.id ? '编辑XX' : '新增XX'}`"
    width="600px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="80px"
      v-if="showDialog"
    >
      <el-form-item label="XX名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入XX名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="submiting"
          >确定</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue"
import { ElMessage } from "element-plus"
import api from "/@/api"

const emit = defineEmits(["update"])

const showDialog = ref(false)
const submiting = ref(false)
const formRef = ref()

interface IForm {
  id: undefined | number
  name: string
}

const baseForm: IForm = {
  id: undefined,
  name: "",
}

const formData = reactive({
  ...baseForm,
})

const ruleForm = {
  name: [{ required: true, message: "请输入XX名称", trigger: "change" }],
}

const onSubmit = async () => {
  await formRef.value.validate()

  submiting.value = true

  const theApi = formData.id ? api.edit : api.add

  theApi(formData)
    .then(() => {
      resetForm()
      emit("update")
      showDialog.value = false
      ElMessage.success("操作成功")
    })
    .finally(() => (submiting.value = false))
}

const resetForm = async () => {
  Object.assign(formData, { ...baseForm })
  formRef.value && formRef.value.resetFields()
}

const open = async (row: any) => {
  resetForm()
  showDialog.value = true
  nextTick(() => {
    Object.assign(formData, { ...row })
  })
}

defineExpose({ open })
</script>
```

### 6. 需要显示图片的地方需要兼容加载失败的情况，并增加图片预览

```html
<el-image
  style="width: 80px; height: 80px"
  :src="detail.icon"
  :previewSrcList="[detail.icon]"
  fit="contain"
>
  <template #error>
    <div class="image-slot">
      <ele-Picture style="width: 30px;" />
      加载失败
    </div>
  </template>
</el-image>
```

```css
.image-slot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #ccc;
  color: #666;
  font-size: 12px;
  gap: 2px;
}
```

### 7. el-table-column 的宽度说明 fixed 说明等

- 如果这列显示的是时间，可以给定固定宽度 `width="160"`, 状态等文字数量有限的情况也需要给定合适的固定宽度。
- 如果第一列是复选框或者日期之类的，将其固定在左侧: `fixed="right"`。操作栏始终固定在右侧：`fixed="right"`。
- 如果是名称或者描述之类的文字数量可能很多的，可以给 `min-width="200px"`。
- 如果列数有限，每列的文字也不多，则可以每一项都改为 `min-width` 这样会自动撑满，不会有横向空白。
- 如果列数比较少，只有一列文字比较多，也应该都用 `min-width`。如果只有文字多的用 `min-width` 则那列会占用大部分，会不协调。
- 如果列多，则固定的都用 `width`, 字数不确定的用 `min-width`。
- 最终显示效果要多次调试，`1920` `1280` 分辨率下都看下，给出最优的宽度设置。

### 7. 产品详情中的数据解析及规则引擎中的 `js` 代码必须使用 `es5` 写法

### 8. 新增页面不要复制多余的 `vue` 文件，会增加无用文件，不便维护

## 三、一些全局参数的使用说明

### 1. 文件上传，图片上传 增加 source 字段

图片、文件上传接口需要增加 `source` 字段，来标记图片存储到的地址，如果实现已有的组件，则不需要考虑这个问题，如果是自己新加的，需要增加这个字段

需要增加 `source` 字段的接口如下：

- `/common/singleImg`
- `/common/singleFile`
- `/common/multipleImg`
- `/common/multipleFile`

```vue
<template>
  <el-upload :data="{ source }"></el-button>
  </el-upload>
</template>

<script lang="ts" setup>
// 从缓存中取得 source 字段代表的上传方式
const source = localStorage.uploadFileWay
</script>
```

### 2. 地图使用之前调用获取地图脚本的代码(ak 和地图中心点从参数配置中获取)

```vue
<template>
  <div class="map" ref="mapContainer"></div>
</template>

<script lang="ts" setup>
import { initMap } from "/@/utils/map"

const mapContainer = ref<HTMLElement | null>(null)

let BMapGL: any = null
let map: any = null

async function init() {
  // 获取BMapGL及默认中心点
  const { BMapGL: theBMapGL, centerPoint } = await initMap()

  BMapGL = theBMapGL

  map = new BMapGL.Map(mapContainer.value!)

  map.centerAndZoom(centerPoint, 10)
}
</script>
```

### 3. 本地环境配置 .local

- 根目录下以 `.env` 结尾的文件是全局的环境配置。其中 `.env` 是默认配置其他配置中的配置会覆盖 `.env` 中的配置，其中 `.env.development` 是开发环境配置，其中 `.env.production` 是生产环境的配置。

- 在上述配置文件的文件名后面增加 `.local` 则会覆盖对应配置文件的配置。通常会在 `.gitignore` 中配置 `.env.*.local`。即带 `.local` 的文件不会被推动到 git 仓库。

- 这样开发者可以复制一份 `.env.development`，命名为 `.env.development.local`，这样就可以覆盖仓库中配置的环境，改为连接到自己本地或其他环境，而这个文件不会被推送到代码仓库，不会影响其他开发人员的开发。

### 4. echart 图形显示（之后整理）

## 四、全局 hooks 使用说明

### 1. useSearch 简化列表查询页面代码

```vue
<template>
  <el-card shadow="nover" class="page-wrapper page-full">
    <section class="search-wrapper">
      <el-form inline>
        <el-form-item label="接口名称" prop="name">
          <el-input v-model="params.name" @keyup.enter.native="getList(1)" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-table
      :data="tableData"
      max-height="calc(100vh  - 210px)"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column label="日期" prop="createdAt" align="center" />
    </el-table>
    <pagination
      v-if="params.total"
      :total="params.total"
      v-model:page="params.pageNum"
      v-model:limit="params.pageSize"
      @pagination="getList()"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue"
import api from "/@/api"
import { useSearch } from "/@/hooks/useCommon"

const { params, tableData, getList, loading } = useSearch<any[]>(
  api.getList,
  "Data",
  { name: "" }
)

getList()
</script>
```
