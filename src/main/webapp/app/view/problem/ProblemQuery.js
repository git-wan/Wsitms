Ext.define('Wsitms.view.problem.ProblemQuery', { //问题查询view
	extend : 'Ext.panel.Panel',
	xtype : 'problem-query',
	style : 'margin-top:2px',
	requires : [
		'Wsitms.view.problem.ProbQueryController',
		'Wsitms.view.problem.ProbQueryModel'
	],
	controller : "probquery",
	viewModel : {
		type : "probquery"
	},
	frame : true,
	tbar : [ {
		text : '详细记录',
		tooltip : '',
		glyph : 0xf15c,
		handler : 'lookDetail'
	} ],
	layout : 'hbox',
	items : [ {
		xtype : 'grid',
		autoScroll : true,
		reference : 'backRecord',
		flex : 3,
		height : '100%',
		border : '1',
		columns : [ {
			text : '问题编号',
			dataIndex : 'PROBLEMSEQ'
		}, {
			text : '提问人',
			dataIndex : 'PROBLEMHUMAN'
		}, {
			text : '问题类型',
			dataIndex : 'PROBLEMTYPE'
		}, {
			text : '应用系统',
			dataIndex : 'APPLICATION'
		}, {
			text : '记录日期',
			dataIndex : 'DATE_'
		}, {
			text : '记录时间',
			dataIndex : 'TIME_'
		}, {
			text : '问题描述',
			dataIndex : 'PROBLEMNOTE'
		}, {
			text : '监控',
			dataIndex : 'SHOWMARK'
		}, {
			text : '备注',
			dataIndex : 'NOTE'
		}, {
			text : '记录人',
			dataIndex : 'RECORDER'
		}, {
			text : '记录时间',
			dataIndex : 'INDATE'
		}, {
			text : '问题状态',
			dataIndex : 'PROBLEMSTATUS'
		} ]
	}, {
		xtype : 'form',
		reference : 'queryParams',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		flex : 1,
		height : '100%',
		border : '1',
		items : [ {
			xtype : 'datefield',
			fieldLabel : '记录起始日期:',
			name : 'STRATDATE',
			format : 'Y-m-d',
			editable : false,
			margin : '10 0 10 0'
		}, {
			xtype : 'datefield',
			fieldLabel : '记录终止日期',
			name : 'ENDDATE',
			format : 'Y-m-d',
			editable : false
		}, {
			xtype : 'combobox',
			fieldLabel : '问题类型',
			name : 'PROBLEMTYPE',
			displayField : 'name',
			valueField : 'abbr',
			editable : false,
			store : {
				data : [ {
					'abbr' : '硬件设备',
					'name' : '硬件设备'
				}, {
					'abbr' : '电源',
					'name' : '电源'
				}, {
					'abbr' : '数据库',
					'name' : '数据库'
				}, {
					'abbr' : '服务器',
					'name' : '服务器'
				}, {
					'abbr' : '网页',
					'name' : '网页'
				}, {
					'abbr' : '网络',
					'name' : '网络'
				}, {
					'abbr' : '网络设备',
					'name' : '网络设备'
				}, {
					'abbr' : '计算机',
					'name' : '计算机'
				}, {
					'abbr' : '应用系统',
					'name' : '应用系统'
				} ]
			}
		}, {
			xtype : 'combobox',
			fieldLabel : '应用系统',
			name : 'APPLICATION',
			displayField : 'name',
			valueField : 'abbr',
			editable : false,
			store : {
				data : [ {
					'abbr' : '百货供应链',
					'name' : '百货供应链'
				}, {
					'abbr' : '量贩供应链',
					'name' : '量贩供应链'
				}, {
					'abbr' : '财务NC',
					'name' : '财务NC'
				}, {
					'abbr' : '集团会员',
					'name' : '集团会员'
				}, {
					'abbr' : '集团OA',
					'name' : '网络'
				}, {
					'abbr' : '集团卡劵',
					'name' : '集团卡劵'
				}, {
					'abbr' : '国广MIS',
					'name' : '国广MIS'
				}, {
					'abbr' : '国广POS',
					'name' : '国广POS'
				}, {
					'abbr' : '武广MIS',
					'name' : '武广MIS'
				}, {
					'abbr' : '武广MIS',
					'name' : '武广MIS'
				}, {
					'abbr' : '武广POS',
					'name' : '武广POS'
				}, {
					'abbr' : '世贸MIS',
					'name' : '世贸MIS'
				}, {
					'abbr' : '世贸POS',
					'name' : '世贸POS'
				}, {
					'abbr' : '亚贸MIS',
					'name' : '亚贸MIS'
				}, {
					'abbr' : '亚贸POS',
					'name' : '亚贸POS'
				}, {
					'abbr' : '建二MIS',
					'name' : '建二MIS'
				}, {
					'abbr' : '建二POS',
					'name' : '建二POS'
				}, {
					'abbr' : '襄樊MIS',
					'name' : '襄樊MIS'
				}, {
					'abbr' : '襄樊POS',
					'name' : '襄樊POS'
				} ]
			}
		}, {
			xtype : 'textfield',
			fieldLabel : '记录人',
			name : 'RECORDER',
		} ],
		buttons : [ {
			text : '提交',
			handler : 'overProblems'
		} ]
	} ]
})