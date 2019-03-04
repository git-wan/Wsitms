Ext.define('Wsitms.view.system.Authority', {
	extend : 'Ext.window.Window',
	xtype : 'authority',
	height : 400,
	width : 700,
	modal : true, //模态框，开启遮罩
	title : '设置角色权限',
	layout : 'hbox',
	items : [ {
		xtype : 'grid',
		flex : 3,
		frame : true,
		style : 'margin-top:2px',
		height : '100%',
		title : '备选权限模块',
		reference : 'waitAuth',
		columns : [ {
			text : '模块',
			dataIndex : 'DESCRIBE'
		}, {
			text : '模块组',
			dataIndex : 'GROUPNAME'
		} ],
		features : [ {
			ftype : 'grouping'
		} ],
		listeners : {
			rowdblclick : 'waitauthdblclick'
		}
	}, {
		xtype : 'panel',
		style : 'margin-top:2px',
		flex : 1,
		height : '100%',
		html : '提示:通过双击行,选取或移除模块'
	}, {
		xtype : 'grid',
		style : 'margin-top:2px',
		flex : 3,
		frame : true,
		height : '100%',
		title : '已选权限模块',
		reference : 'selectAuth',
		columns : [ {
			text : '模块',
			dataIndex : 'DESCRIBE'
		}, {
			text : '模块组',
			dataIndex : 'GROUPNAME'
		} ],
		features : [ {
			ftype : 'grouping'
		} ],
		listeners : {
			rowdblclick : 'selectauthdblclick'
		}
	} ],
	buttons : [ {
		text : '确定',
		handler : 'confirmAuth'
	}, {
		text : '取消',
		handler : 'closeForm'
	} ]
})