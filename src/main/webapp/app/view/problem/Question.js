Ext.define("Wsitms.view.problem.Question", {
	extend : "Ext.form.Panel",
	xtype : "questionPoint",
	requires : [
		'Wsitms.view.problem.QuestionController'
	],
	controller : 'questionPoint',
	reference : 'questForm',
	frame : true,
	items : [ {
		xtype : 'fieldset',
		title : '问题记录',
		margin : '0 10 0 10',
		items : [ {
			layout : 'column',
			items : [ {
				xtype : 'combobox',
				fieldLabel : '*提问人',
				editable : false,
				style : 'margin-left:20px',
				name : 'PROBLEMHUMAN',
				displayField : 'name',
				valueField : 'abbr',
				allowBlank : false,
				blankText : '提问人不能为空',
				//msgTarget:'side',
				editable : false,
				store : {
					data : [ {
						'abbr' : '供应商',
						'name' : '供应商'
					}, {
						'abbr' : '量贩',
						'name' : '量贩'
					}, {
						'abbr' : '百货',
						'name' : '百货'
					}, {
						'abbr' : '集团',
						'name' : '集团'
					}, {
						'abbr' : '资讯',
						'name' : '资讯'
					}, {
						'abbr' : '其他',
						'name' : '其他'
					} ]
				}
			}, {
				xtype : 'combobox',
				fieldLabel : '问题类型',
				editable : false,
				style : 'margin-left:20px',
				name : 'PROBLEMTYPE',
				displayField : 'name',
				valueField : 'abbr',
				allowBlank : false,
				blankText : '问题类型不能为空',
				editable : false,
				//msgTarget:'side',
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
				editable : false,
				margin : '0 0 0 20',
				name : 'APPLICATION',
				displayField : 'name',
				allowBlank : false,
				blankText : '应用系统不能为空',
				//msgTarget:'side',
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
			} ]
		}, {
			layout : 'column',
			style : 'margin-top:10px',
			items : [ {
				xtype : 'datefield',
				fieldLabel : '日期',
				style : 'margin-left:20px',
				format : 'Y-m-d',
				editable : false,
				name : 'DATE_'
			}, {
				xtype : 'timefield',
				fieldLabel : '时间',
				editable : false,
				format : 'H:i',
				style : 'margin-left:20px',
				name : 'TIME_'
			}, {
				xtype : 'textfield',
				fieldLabel : '记录人',
				margin : '0 0 0 20',
				name : 'RECORDER',
				value : userName,
				readOnly : true
			} ]
		}, {
			style : 'margin-top:10px',
			xtype : 'textarea',
			fieldLabel : '问题描述',
			width : '100%',
			name : 'PROBLEMNOTE'
		}

		]
	},
		{
			xtype : 'fieldset',
			title : '备注',
			margin : '0 10 0 10',
			items : [
				{
					xtype : 'checkboxfield',
					fieldLabel : '显示监控',
					boxLabel : '是',
					inputValue : 'YES',
					name : 'SHOWMARK'
				},
				{
					xtype : 'textarea',
					fieldLabel : '备注',
					width : '100%',
					name : 'NOTE'
				},
				{
					xtype : 'textfield',
					fieldLabel : '状态',
					hidden : true,
					name : 'PROBLEMSTATUS',
					value : 'QUESTION'
				}

			]
		} ],

	buttons : [ {
		text : '提交',
		handler : 'saveForm',
	}, {
		text : '重置',
		handler : 'resetForm',
	} ]
});