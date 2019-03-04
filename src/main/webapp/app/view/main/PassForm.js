Ext.define('Wsitms.view.main.PassForm', {
	extend: 'Ext.window.Window',
	xtype: 'pass-form',
	height: 170,
	width: 350,
	title: '修改密码',
	modal: true, //模态框，开启遮罩,
	reference:'pass-form',
	items: {
		xtype: 'form',
		reference: 'passForm',
		layout: {
			type: 'vbox',
			align: 'center'
		},
		items: [{
			xtype: 'textfield',
			fieldLabel: '用户编号',
			name: 'USER_ID',
			allowBlank: false,
			blankText: '用户类型不能为空',
			msgTarget: 'side',
			hidden: true,
			value: USER_ID
		}, {
			id: 'newPwd',
			xtype: 'textfield',
			fieldLabel: '新密码',
			name: 'PASSWD',
			msgTarget: 'side',
			regex: /^((?=.*\d).{6,20})/,
			regexText: '密码必须有6-20的数字和字母组成',
			allowBlank: false,
			blankText: '密码不能为空',
			inputType: 'password',
		}, {
			xtype: 'textfield',
			fieldLabel: '确认密码',
			msgTarget: 'side',
			vtype: 'password',
			allowBlank: false,
			blankText: '密码不能为空',
			inputType: 'password',
		}],
	},
	buttons: [{
		text: '保存',
		handler: 'saveForm'
	}, {
		text: '清空',
		handler: 'resetForm',
	}, {
		text: '返回',
		handler: 'closeForm'
	}]
})
Ext.apply(Ext.form.VTypes, {
	password: function (val, field) {
		var pwd = Ext.getCmp('newPwd').getValue()
		if (val == pwd) {
			return true;
		}
	},
	passwordText: '两次输入密码不一致！'
})