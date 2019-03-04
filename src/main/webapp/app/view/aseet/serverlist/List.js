Ext.define('Wsitms.view.aseet.serverlist.List', {
	extend : 'Ext.grid.Panel',
	xtype : 'serverlist',
	requires : [
		'Wsitms.view.aseet.serverlist.Controller',
		'Wsitms.view.aseet.serverlist.Model'
	],
	controller : 'serverlist',
	viewModel : {
		type : 'serverlist'
	},
	bind : {
		store : '{serverStore}'
	},
	layout : 'fit',
	tbar : [ {
		text : '新增',
		glyph:0xf067,
		handler : 'add'
	}, {
		text : '修改',
		glyph:0xf044,
		handler : 'onEdit'
	}, {
		text : '删除',
		glyph:0xf014,
		handler : 'del'
	}, {
		text : '导出EXCEL',
		glyph:0xf1c3,
		handler : 'serExcel'
	}, '->', {
		fieldLabel : '分类',
		xtype : 'combobox',
		name : 'APPLICATION',
		displayField : 'name',
		editable : false,
		valueField : 'name',
		store : {
			data : [{
				'name' : '虚拟机'
			}, {
				'name' : '服务器'
			}]
		},
		listeners : {
			change : 'changeQuery'
		}
	}, {
		fieldLabel : 'IP',
		xtype : 'combobox',
		name : 'IP',
		displayField : 'IP',
		valueField : 'IP',
		typeAhead:true,//搜索提示
		typeAheadDelay:1,//键入时长
		bind : {
			store : '{serverStore}'
		},
		listeners : {
			change : 'changeQuery',				
		}
	} ],
	columns : [ {
		text : '机柜',
		dataIndex : 'CABINET',
		width : 160
	}, {
		text : '应用系统',
		dataIndex : 'APPLICATION',
		width : 160
	}, {
		text : '品牌型号',
		dataIndex : 'BRAND',
		width : 160
	}, {
		text : 'IP',
		dataIndex : 'IP',
		width : 200
	}, {
		text : '操作系统',
		dataIndex : 'SYS',
		width : 160
	}, {
		text : '备注',
		dataIndex : 'NOTE'
	} ],
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true //只执行一次
		}
	},
})