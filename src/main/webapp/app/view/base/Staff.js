Ext.define('Wsitms.view.base.Staff',{
	extend:'Ext.grid.Panel',
	xtype:'staff-register',
	
	layout:'fit',
	requires:[
		'Wsitms.view.base.StaffController',
		'Wsitms.view.base.StaffModel',
	],
	controller: 'staff-register',
	viewModel:{type:'staff-register'},
	bind:{store:'{staffStore}'},
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
		text:'员工编号',
		dataIndex:'EMPLOYEE_CODE'
	},{
		text:'员工姓名',
		dataIndex:'EMPLOYEE_NAME'
	},{
		text:'实体代码',
		dataIndex:'COMPANY_CODE'
	},{
		text:'部门代码',
		dataIndex:'DEPARTMENT_CODE'
	}],
	
	bbar:{
		xtype:'pagingtoolbar',
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		emptyMsg:'没有需要显示的数据'
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