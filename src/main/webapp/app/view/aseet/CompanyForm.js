Ext.define('Wsitms.view.aseet.RoleForm', {
	extend : 'Ext.window.Window',
	xtype : 'staff-form',
	height : 500,
	width : 400,
	bind : {
		title : '{title}'
	},
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference : 'roleForm',
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [ {
			xtype : 'textfield',
			fieldLabel : '用户ID',
			name : 'ROLE_ID',
			hidden : true,
			bind : '{theRole.ROLE_ID}'
		}, {
			xtype : 'textfield',
			fieldLabel : '用户编号',
			name : 'ROLE_CODE',
			allowBlank : false,
			blankText : '用户编号不能为空',
			msgTarget : 'side', //设置不符合验证的提示方式
			bind : '{theRole.ROLE_CODE}'
		}, {
			xtype : 'textfield',
			fieldLabel : '用户名称',
			name : 'ROLE_NAME',
			allowBlank : false,
			blankText : '用户名称不能为空',
			msgTarget : 'side',
			bind : '{theRole.ROLE_NAME}'
		}, {
			xtype : 'textarea',
			fieldLabel : '备注信息',
			name : 'NOTE',
			bind : '{theRole.NOTE}'
		} ],
	},
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '清空',
		handler : 'resetForm'
	}, {
		text : '返回',
		handler : 'closeForm'
	} ]
})