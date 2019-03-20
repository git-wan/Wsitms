Ext.define('Wsitms.view.assess.AsjForm', {
	extend : 'Ext.window.Window',
	xtype : 'asj-window',
	height : 230,
	width : 300,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'asj-form',
		margin:'10 0 0 0',
		layout : {
			type : 'vbox',
			align:'center'
		},
		items : [{
			xtype:'textfield',
			fieldLabel:'ID',			
			name:'ID',
			reference:'majorkey',
			hidden:true,
			
		},{
			xtype:'textfield',
			fieldLabel:'评定人',
			name:'ADJUSTER',
			allowBlank : false,
		},{
			xtype:'textfield',
			fieldLabel:'评定对象',
			name:'ASS_OBJECT',
			allowBlank : false,
		},{
			fieldLabel: '评定组',
			xtype: 'combobox',
			name: 'ASSGROUP',
			allowBlank: false,
			displayField: 'DEPARTMENT_NAME',
			valueField: 'DEPARTMENT_NAME',
			bind:{store: '{departnamestore}'},
		}],
	},		
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ],
	
})