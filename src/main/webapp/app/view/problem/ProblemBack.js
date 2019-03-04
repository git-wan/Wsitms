Ext.define('Wsitms.view.problem.ProblemBack', {
	extend : 'Ext.panel.Panel',
	xtype : 'problem-back',
	requires : [
		'Wsitms.view.problem.ProblemBackController',
		'Wsitms.view.problem.ProblemBackModel',
		'Ext.grid.plugin.RowEditing'
	],
	controller : "probback",
	viewModel : {
		type : "probback"
	},
	layout : {
		type : 'fit',
	},
	items : [ {
		xtype : 'grid',
		title : {
			text : '未回复问题记录',
			style : 'line-height:12px;font-size:12px;'
		},
		style : 'margin-top:2px',
		//anchor:'100% 40%',
		frame : true,
		autoScroll : true,
		bind : {
			store : '{questStore}'
		},
		reference : 'waitSolve',
		plugins : [
			Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit : 2, //设置单击单元格编辑	               
			})
		],
		tbar : [ {
			text : '刷新问题',
			tooltip : '刷新问题',
			glyph : 0xf021,
			handler : 'refreshPage'
		}, {
			text : '无问题',
			tooltip : '删除无问题记录',
			glyph : 0xf00c, //f00c 正确//f044编辑  //f0c7保存//f010 查询 //f067增
			handler : 'delProb' //f014 删除
		}, '-', {
			text : '修改保存',
			tooltip : '保存修改内容',
			glyph : 0xf0c7,
			handler : 'editSave'
		}, {
			text : '回复',
			tooltip : '回复待解决的问题',
			glyph : 0xf067,
			handler : 'addBack'
		} ],
		columns : [ {
			text : '问题编号',
			dataIndex : 'id',
			align : 'center',
			flex : 1,
			sortable : false,
		}, {
			text : '提问人',
			flex : 1,
			dataIndex : 'PROBLEMHUMAN'
		}, {
			text : '问题类型',
			flex : 1,
			dataIndex : 'PROBLEMTYPE',
		}, {
			text : '应用系统',
			flex : 1,
			dataIndex : 'APPLICATION',
		}, {
			text : '问题描述',
			flex : 1,
			dataIndex : 'PROBLEMNOTE'
		}, {
			text : '监控',
			xtype : 'checkcolumn',
			flex : 1,
			dataIndex : 'SHOWMARK',
		}, {
			text : '备注',
			flex : 1,
			dataIndex : 'NOTE',
			editor : {
				xtype : 'textfield',
				allowBlank : false,
				name : 'NOTE'
			}
		}, {
			text : '记录人',
			flex : 1,
			dataIndex : 'RECORDER'
		}, {
			text : '记录时间',
			flex : 1,
			dataIndex : 'INDATE',
			format : 'Y-m-d'
		} ],		
	} ],
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true
		}
	},
})