Ext.define('Wsitms.view.aseet.Aseet', { //资产
	extend : 'Ext.grid.Panel',
	xtype : 'aseet-register',
	layout : 'fit',
	requires : [
		'Wsitms.view.aseet.AseetController',
		'Wsitms.view.aseet.AseetModel',
	],
	controller : 'aseet-register',
	viewModel : {
		type : 'aseet-register'
	},
	bind : {
		store : '{aseetStore}'
	},
	columnLines : true,
	tbar : [ {
		text : '新增',
		glyph : 0xf067,
		menu : [ {
			text : '主信息',
			handler : 'onAdd'
		}, {
			text : '明细信息',
			handler : ''
		} ]
	}, {
		text : '删除',
		handler : 'batchDel',
		glyph : 0xf014
	}, {
		text : '修改',
		handler : 'onEdit',
		glyph : 0xf044
	}, {
		text : '查询',
		handler : ''
	}],

	columns : [ {
		text : '资产编号',
		dataIndex : 'FIXED_CODE'
	}, {
		text : '资产名称',
		dataIndex : 'FIXED_NAME'
	}, {
		text : '实体编号',
		dataIndex : 'UNIT_CODE'
	}, {
		text : '品牌名称',
		dataIndex : 'BRAND_NAME'
	}, {
		text : '折旧率',
		dataIndex : ''
	}, {
		text : '资产状态',
		dataIndex : 'STATE'
	}, {
		text : '采购日期',
		dataIndex : 'BUY_DATE'
	} ],

	bbar : {
		xtype : 'pagingtoolbar',
		displayInfo : true,
		displayMsg : '显示:{0}-{1}条,总共:{2}条',
		emptyMsg : '没有需要显示的数据'
	},

	selModel : {
		selType : 'checkboxmodel'
	},
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true //只执行一次
		}
	},
})