# 开发说明

## 目录说明
1，api声明文件，在版本下，如V1目录下，创建模块目录，进行api文件的定义。
2，internal进行功能实现。其中主要实现的有controller、logic两个目录的内容。
dao、model中的do、entity目录是由gf gen 工具自动生成的。对于model的结构体的自定义放在model下的对应文件中


每个独立完整的功能，建议创建独立的功能目录，在controller、logic等下面。

## 数据表设计约定

业务数据表要求必须有的默认字典为：

`dept_id` bigint(20) NOT NULL COMMENT '部门ID',
`create_by` int(64) UNSIGNED NULL DEFAULT 0 COMMENT '创建者',
`update_by` int(64) UNSIGNED NULL DEFAULT 0 COMMENT '更新者',
`created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
`updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
`deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
`status`  int NOT NULL COMMENT '状态 0停用 1正常',
`is_deleted`  int NOT NULL COMMENT '状态 0未删除 1已删除',


## 开发步骤

`第一步: 在hack/config.yaml中配置对应的表名`
`第二步: 使用gf gen dao命令生成对应的ENTITY DO`
`第三步: 在logic新建某个业务单元,例如system,编写对应的业务实现`
`第四步: 使用gf gen service 实现对应的接口`
`第五步: 定义相关返回结构体, 返回API将数据返回给前端`

## 注意事项
`列表中存在状态status查询时，-1代表全部 0停用 1正常`
`method定义为: 提交(post) 编辑(put) 删除(del) 获取(get)`

## WEBSOCKET使用方法
`第一步: 在v1/websocket定义api`
`第二步: 定义业务单元常量`
`第三步: 在controller中定义接口，并调用InitConnection()方法初始化连接`
`第四步: 编写对应的Heartbeat业务`

## TDengine
TDengine 官方提供两种连接器：原生连接、REST连接(http)  
在使用时可以灵活配置，配置方式如下：

1. 在hack/config.yaml中配置
2. 原生连接：type=taosSql，端口是6030
3. REST连接：type=taosRestful，端口是6041
4. 修改驱动的引入方式(import)：sagoo-admin/internal/logic/tdengine/td_engine.go

***`注：原生连接使用了cgo`***

## 添加数据

1. 如果数据源是postgresql,则添加时不能存在主键ID,否则会将id默认为0写入到postgresql数据库中,可参考下述写法：
   
   ```go
   result, err := dao.ConfigureDiagram.Ctx(ctx).Data(do.ConfigureDiagram{
		DeptId:    loginUserDeptId,
		FolderId:  diagram.FolderId,
		Name:      diagram.Name,
		Types:     diagram.Types,
		Images:    diagram.Images,
		PointIds:  diagram.PointIds,
		JsonData:  diagram.JsonData,
		Remark:    diagram.Remark,
		Status:    diagram.Status,
		IsDeleted: 0,
		CreatedBy: uint(loginUserId),
		CreatedAt: gtime.Now(),
	}).Insert()
   ```

## 获取最后一条记录的主键ID值

1. 使用Insert()进行添加
   ```go
   result, err := dao.ConfigureFolder.Ctx(ctx).Data(do.ConfigureFolder{
			DeptId:    loginUserDeptId,
			Name:      folder.Name,
			Types:     folder.Types,
			Status:    folder.Status,
			IsDeleted: 0,
			CreatedBy: uint(loginUserId),
			CreatedAt: gtime.Now(),
		}).Insert()
   ```
2. 在添加方法后调用GetSequences()方法获取最后一条记录主键ID值
   ```go
   lastInsertId, err := service.Sequences().GetSequences(ctx, result, dao.ConfigureFolder.Table(), dao.ConfigureFolder.Columns().Id)
		if err != nil {
			return
		}
   ```
***`注：目前只支持MySQL和postgresql, postgresql创建序列命名规则必须为:表名_主键名_seq, 例如: configure_folder_id_seq`***