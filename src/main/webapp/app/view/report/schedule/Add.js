Ext.define('Wsitms.view.report.schedule.Add', {
	extend : 'Ext.window.Window',
	xtype : 'shedue-window',
	height : 550,
	width : 600,
/*	bind : {
		title : '{title}'
	},*/	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'sch-form',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [{
			xtype : 'datefield',
			fieldLabel : '排班月份',
			name : 'SCHDATE',
			allowBlank : false,
			editable:false,
			format:'Y-m'
		}],
	},
	
	
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '清空',
		handler : 'resetForm',
		reference : 'staffFormReset'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ],
	
})