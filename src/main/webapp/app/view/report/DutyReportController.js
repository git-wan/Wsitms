Ext.define('Wsitms.view.report.DutyReportController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.duty-report',
	requires : [
		'Wsitms.view.aseet.AseetForm',
		'Wsitms.view.report.Night',
		'Wsitms.view.report.Morning'
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('aseetStore').load();
	},

	morningInput : function() {
		var view = this.getView();
		this.dialog = view.add({
			xtype : 'morning',
		})
		this.dialog.show();
	},

	nightInput : function() {
		var view = this.getView();
		this.dialog = view.add({
			xtype : 'night-form',
		})
		this.dialog.show();

	},

	onAdd : function() {
		this.displayForm(null);
	},



	resetForm : function() {
		this.lookup('mornForm').reset();
	},

	saveForm : function() {
		var me = this,
			dutytype = this.lookup('dutytype'),
			mornForm = this.lookup('mornForm'),
			nightForm = this.lookup('nightForm');
		var dutyForm;
		if (dutytype.getValue() == '晚班') {
			dutyForm = nightForm;
		} else {
			dutyForm = mornForm;

		}
		if (dutyForm.isValid()) {
			dutyForm.submit({
				url : '/Wsitms/report/duty',
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					if (dutytype.getValue() == '晚班') {
						me.lookup('nightWindow').destroy();
					} else {
						me.lookup('mornWindow').destroy();

					}

				},
				failure : function(form, action) {
					switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('提交失败', 'Ajax通信失败');
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert('提交失败', action.result.msg);
					}
				}
			})
		}
	},

	closeForm : function() {
		this.dialog = Ext.destroy(this.dialog);
	}
})