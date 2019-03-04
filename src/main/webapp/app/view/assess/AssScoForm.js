Ext.define('Wsitms.view.assess.AssScoForm', {
	extend : 'Ext.window.Window',
	xtype : 'asswindow',
	height : 600,
	width : 550,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'assform',
		margin:'10 0 0 0',
		layout : {
			type : 'vbox',
			
			align : 'left'
		},
		items : [{}],
	},		
	buttons : [{
		text : '保存',
		handler : 'SaveForm',
		reference:'saveform',
	},{
		text : '返回',
		handler : 'closeForm'
	}],
	
})