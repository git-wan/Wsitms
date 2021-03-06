Ext.define('Wsitms.view.aseet.AllotRecord', { //分配记录
	extend : 'Ext.grid.Panel',
	xtype : 'allot-record',
	layout : 'fit',
	tbar : [ {
		text : '新增',
		handler : ''
	}, {
		text : '删除',
		handler : ''
	}, {
		text : '修改',
		handler : ''
	}, {
		text : '查询',
		handler : ''
	} ],
	columns : [ {
		text : '固定资产使用号',
		handler : ''
	}, {
		text : '使用描述',
		handler : ''
	}, {
		text : '固定资产编号',
		handler : ''
	}, {
		text : '固定资产名称',
		handler : ''
	}, {
		text : '实体编号',
		handler : ''
	}, {
		text : '使用名称',
		handler : ''
	} ],

	bbar : {
		xtype : 'pagingtoolbar',
		displayInfo : true,
		displayMsg : '显示:{0}-{1}条,总共:{2}条',
		emptyMsg : '没有需要显示的数据'
	},
	selModel : {
		selType : 'checkboxmodel'
	}
})