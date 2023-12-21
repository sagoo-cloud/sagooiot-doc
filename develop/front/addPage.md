# 增加新页面

开发一个新页面的简单模板

## 步骤

1. 在项目里增加一个页面文件，比如 **demo.vue**，放在 **/src/view** 里(不能放在跟目录下，需要有文件夹), 比如 **/src/view/new/demo.vue** 。
2. 在项目里的 **系统配置/菜单管理/添加菜单**， 创建一个新菜单，其中组件路径写 **/new/demo** ，其他可自由定义， 例如路由路径 **/demo**。
3. 重新启动下项目，项目启动之后重新登录一下。
3. 在 **demo.vue** 中写自己的业务逻辑。


## 文件基础模板

``` vue
<template>
	<div>demo初始化模板</div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
</style>
```

## 简单增删改查页面模板

``` vue
<template>
  <div class="page">
    <el-card shadow="hover">
      <div class="search">
        <el-form :model="params" :inline="true" ref="queryRef">
          <el-form-item label="接口名称" prop="name">
            <el-input v-model="params.name" placeholder="请输入接口名称" clearablestyle="width: 240px" @keyup.enter.native="getList(1)" />
          </el-form-item>
          <el-form-item label="接口地址" prop="address">
            <el-input v-model="params.address" placeholder="请输入接口地址" clearablestyle="width: 240px" @keyup.enter.native="getList(1)" />
          </el-form-item>
          <el-form-item label="状态" prop="status" style="width: 200px">
            <el-select v-model="params.status" placeholder="接口状态" clearablestyle="width: 240px">
              <el-option label="全部" :value="-1" />
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="default" type="primary" class="ml10" @click="getList(1)">
              <el-icon>
                <ele-Search />
              </el-icon>
              查询
            </el-button>
            <el-button size="default" @click="resetQuery()">
              <el-icon>
                <ele-Refresh />
              </el-icon>
              重置
            </el-button>
            <el-button type="success" @click="addOrEdit()" v-auth="'add'">
              <el-icon>
                <ele-FolderAdd />
              </el-icon>
              新增接口
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="name" v-col="'name'" label="接口名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" v-col="'address'" label="接口地址" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="100" align="center" v-col="'handle'">
          <template #default="scope">
            <el-button size="small" text type="warning" @click="addOrEdit(scope.row)" v-auth="'edit'">修改</el-button>
            <el-button size="small" text type="danger" @click="onDel(scope.row)" v-auth="'del'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-if="params.total" :total="params.total" v-model:page="params.pageNum" v-model:limit="params.pageSize" @pagination="getList()" />
    </el-card>
    <EditForm ref="editFormRef" @getList="getList()"></EditForm>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import EditForm from './component/edit.vue';
import { ApiRow } from '/@/api/model/system/menu';
import api from '/@/api/system';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useSearch } from '/@/hooks/useCommon';

const editFormRef = ref();
const queryRef = ref();

const { params, tableData, getList, loading } = useSearch<ApiRow[]>(api.api.getList, 'Info', { name: '', address: '' });

getList();

const addOrEdit = async (row?: ApiRow) => {
  if (row) {
    const res = await api.api.detail(row.id as number);
    editFormRef.value.open(res);
  } else {
    editFormRef.value.open();
  }
};

// 重置表单
const resetQuery = () => {
  queryRef.value.resetFields();
  getList(1);
};

const onDel = (row: ApiRow) => {
  ElMessageBox.confirm(`此操作将删除接口：“${row.name}”，是否继续?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await api.api.del(row.id as number);
    ElMessage.success('删除成功');
    getList();
  });
};
</script>

```