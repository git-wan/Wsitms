Ext.define('Wsitms.view.assess.AssTimeForm', {
	extend : 'Ext.window.Window',
	xtype : 'asstime-window',
	height : 230,
	width : 300,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'asstime-form',
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
			xtype:'numberfield',
			fieldLabel:'评定起始天数',			
			name:'STARTDAY',
			value:1,
			minValue : 1,
			maxValue : 8,
		},{
			xtype:'numberfield',
			fieldLabel:'评定结束天数',			
			name:'ENDDAY',
			value:1,
			minValue : 1,
			maxValue : 8,
		},{
			fieldLabel:'状态',
			xtype:'combobox',
			name:'STATUS',
			editable:false,
			allowBlank : false,
			displayField : 'STATUS',
			valueField : 'STATUS',
			store : {
				data : [ {
					'STATUS' : '启用'
				}, {
					'STATUS' : '未启用'
				}]
			},
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