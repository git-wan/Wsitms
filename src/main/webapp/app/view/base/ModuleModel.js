Ext.define('Wsitms.view.base.ModuleModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.module-manage',
	requires:['Wsitms.model.Module'],
	stores:{
		moduleStore:{
			model:'Module',
			atuoLoad:false,
			pageSize:100,//0为禁用分页
			groupField:'MODULE_GROUP',//在store中定义，进行分组
		}
	}
})