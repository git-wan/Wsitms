Ext.define('Wsitms.view.define.EntPropForm', {
	extend : 'Ext.window.Window',
	xtype : 'entprop-form',
	height : 550,
	width : 300,
	bind : {
		title : '{title}'
	},
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference : 'entPropForm',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [ {
			xtype : 'textfield',
			fieldLabel : '实物属性ID',
			name : 'ENTPROP_ID',
			hidden : true,
			reference : 'primary_id',
			bind : '{id}'
		}, {
			xtype : 'textfield',
			fieldLabel : '实物编号',
			name : 'ENTITYNO',
			allowBlank : false,
			blankText : '部门代码不能为空',
			msgTarget : 'side', //设置不符合验证的提示方式
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : '实物名称',
			name : 'ENTITYNAME',
			allowBlank : false,
			blankText : '实物名称不能为空',
			msgTarget : 'side',
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : '属性编号',
			name : 'PROPERTYNO',
			allowBlank : false,
			blankText : '属性编号不能为空',
			msgTarget : 'side',
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : '属性名称',
			name : 'PROPERTYNAME',
			allowBlank : false,
			blankText : '属性名称不能为空',
			msgTarget : 'side',
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : '属性标志',
			name : 'VALUEFLAG',
			allowBlank : false,
			blankText : '属性标志不能为空',
			msgTarget : 'side',
			readOnly : true
		}, {
			xtype : 'combobox',
			fieldLabel : '属性值类型',
			name : 'VALUETYPE',
			readOnly : true
		}, {
			xtype : 'textfield',
			fieldLabel : '属性值',
			name : 'PROPERTYVALUE',
			allowBlank : false,
			blankText : '属性名称不能为空',
			msgTarget : 'side',
		}, {
			xtype : 'textfield',
			fieldLabel : '最小正常值',
			name : 'PROPERTYMINI',
		}, {
			xtype : 'textfield',
			fieldLabel : '最大正常值',
			name : 'PROPERTYMAX',
		}, {
			xtype : 'combobox',
			fieldLabel : '自动录入',
			name : 'AUTOENTRY',
			allowBlank : false,
			blankText : '自动录入不能为空',
			msgTarget : 'side',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'abbr',
			store : {
				data : [ {
					'abbr' : 'Y',
					'name' : 'Y'
				}, {
					'abbr' : 'N',
					'name' : 'N'
				} ]
			},
		}, {
			xtype : 'textfield',
			fieldLabel : '图形显示',
			name : 'SHOWMARK',
		} ],
		buttons : [ {
			text : '保存',
			handler : 'saveForm'
		}, {
			text : '清空',
			handler : 'resetForm',
			reference : 'entPropFormReset'
		}, {
			text : '返回',
			handler : 'closeForm'
		} ]
	},
})