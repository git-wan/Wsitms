Ext.define('Wsitms.view.assess.AssInfoForm', {
	extend : 'Ext.window.Window',
	xtype : 'assinfo-window',
	height : 400,
	width : 450,
	bind : {
		title : '{title}'
	},	
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference:'assinfo-form',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [{
			xtype : 'textfield',
			name : 'ID',
			hidden:true,
			reference:'primary_id'
		},{
			xtype : 'combobox',
			fieldLabel : '评定类型',
			name : 'ASSTYPE',
			allowBlank : false,
			displayField : 'name',
			editable : false,
			valueField : 'name',
			store : {
				data : [{
					'name' : '月度'
				}, {
					'name' : '年度'
				}]
			}
		},{
			xtype : 'textfield',
			fieldLabel : '评分项',
			name : 'SCOREGROUP',
			allowBlank : false,
		},{
			xtype : 'textfield',
			fieldLabel : '分值',
			name : 'SC_PRICE',
			allowBlank : false,
			regex:/^([1-9]|[1-4][0-9]|50)$/,///^([1-5][0-9]?)|(50)$/
			regexText:'分值大于1小于50',
		},{
			xtype : 'textarea',
			fieldLabel : '备注',
			name : 'SCOREINFO',
			allowBlank : false,
			height:170,
			width:350
		}],
	},
		
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '清空',
		handler : 'resetForm',
		reference : 'assinfoFormReset'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ],	
})