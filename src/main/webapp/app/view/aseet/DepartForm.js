Ext.define('Wsitms.view.aseet.DepartForm', {
	extend : 'Ext.window.Window',
	xtype : 'depart-form',
	height : '220',
	width : 300,
	bind : {
		title : '{title}'
	},
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference : 'departForm',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [ {
			xtype : 'textfield',
			fieldLabel : '部门ID',
			name : 'DEPARTMENT_ID',
			hidden : true,
			reference : 'primary_id',
			bind : '{theDepart.id}'
		}, {
			xtype : 'textfield',
			fieldLabel : '部门代码',
			name : 'DEPARTMENT_CODE',
			allowBlank : false,
			blankText : '部门代码不能为空',
			msgTarget : 'side', //设置不符合验证的提示方式
			bind : '{theDepart.DEPARTMENT_CODE}'
		}, {
			xtype : 'textfield',
			fieldLabel : '部门名称',
			name : 'DEPARTMENT_NAME',
			allowBlank : false,
			blankText : '部门名称不能为空',
			msgTarget : 'side',
			bind : '{theDepart.DEPARTMENT_NAME}',
		}, {
			xtype : 'combobox',
			fieldLabel : '实体代码',
			editable : false,
			name : 'COMPANY_CODE',
			queryMode : 'loacl', //remote
			valueField : 'COMPANY_CODE', //传送的值
			displayField : 'COMPANY_NAME', //UI列表显示的文本,
			bind : {
				store : '{companyStore}'
			},
			modal : true,
			allowBlank : false,
			blankText : '部门代码不能为空',
			msgTarget : 'side',
			emptyText : '请选择',
			listConfig : {
				maxHeight : 100,
			},
			autoScroll : true,
			reference : 'combo-company',
		} ],
		buttons : [ {
			text : '保存',
			handler : 'saveForm'
		}, {
			text : '清空',
			handler : 'resetForm',
			reference : 'departFormReset'
		}, {
			text : '返回',
			handler : 'closeForm'
		} ]
	},
})