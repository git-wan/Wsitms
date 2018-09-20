Ext.define('Wsitms.view.base.Depart',{
	extend:'Ext.grid.Panel',
	xtype:'depart-register',
	requires:[
		'Wsitms.view.base.DepartController',
		'Wsitms.view.base.DepartModel',
	],
	controller: 'depart-register',
	viewModel:{type:'depart-register'},
	layout:'fit',
/*	items:[{
	xtype:'grid',
	title:'查询部门信息',*/
	bind:{store:'{departStore}'},
	tbar:[{
		text:'新增',
		handler:'onAdd',
		glyph:0xf067
	},{
		text:'删除',
		handler:'batchDel',
		glyph:0xf014
	},{
		text:'修改',
		handler:'onEdit',
		glyph:0xf044
	},{
		text:'查询',
		handler:'',
		glyph:0xf010
	}],
	
	columns:[{
		text:'部门代码',
		dataIndex:'DEPARTMENT_CODE'
	},{
		text:'部门名称',
		dataIndex:'DEPARTMENT_NAME'
	},{
		text:'实体代码',
		dataIndex:'COMPANY_CODE'
	}],
	
	bbar:{
		xtype:'pagingtoolbar',
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		empetyMsg:'没有需要显示的数据'
	},
	selModel:{
		selType:'checkboxmodel'
	},
	
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },

})