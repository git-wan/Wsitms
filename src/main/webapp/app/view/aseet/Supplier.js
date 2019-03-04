Ext.define('Wsitms.view.aseet.Supplier',{
	extend:'Ext.grid.Panel',
	xtype:'supplier-register',
	
	layout:'fit',
	
	tbar:[{
		text:'新增',
		handler:''
	},{
		text:'删除',
		handler:''
	},{
		text:'修改',
		handler:''
	},{
		text:'查询',
		handler:''
	}],
	
	columns:[{
		text:'供应商编号',
		dataIndex:''
	},{
		text:'供应商名称',
		dataIndex:''
	},{
		text:'联系人',
		dataIndex:''
	},{
		text:'电话',
		dataIndex:''
	},{
		text:'服务电话',
		dataIndex:''
	},{
		text:'登记日期',
		dataIndex:''
	},{
		text:'备注',
		dataIndex:''
	}],
	
	bbar:{
		xtype:'pagingtoolbar',
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		emptyMsg:'没有需要显示的数据'
	},
	
	selModel:{
		selType:'checkboxmodel'
	}
})