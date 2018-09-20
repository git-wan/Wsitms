Ext.define('Wsitms.view.base.Company',{
	extend:'Ext.grid.Panel',
	xtype:'entity-register',
	
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
		text:'实体编号',
		dataIndex:''
	},{
		text:'字母代码',
		dataIndex:''
	},{
		text:'实体编号',
		dataIndex:''
	},{
		text:'实体名称',
		dataIndex:''
	},{
		text:'中文简写',
		dataIndex:''
	},{
		text:'地址',
		dataIndex:''
	},{
		text:'邮编',
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