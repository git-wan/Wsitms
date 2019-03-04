Ext.define('Wsitms.view.aseet.serverlist.Add', {
	extend : 'Ext.window.Window',
	xtype : 'serverlist-window',
	height : 340,
	width : 400,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'server-form',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [{
			xtype : 'textfield',
			fieldLabel : '机柜',
			name : 'CABINET',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : '应用系统',
			name : 'APPLICATION',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : '品牌型号',
			name : 'BRAND',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : '操作系统',
			name : 'SYS',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : 'IP',
			name : 'IP',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : '备注',
			name : 'NOTE',
			allowBlank : false,
		},{
			xtype : 'textfield',
			name : 'SERVER_ID',
			hidden:true,
			reference:'primary_id'
		}],
	},
		
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '清空',
		handler : 'resetForm',
		reference : 'serverFormReset'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ],
	
})