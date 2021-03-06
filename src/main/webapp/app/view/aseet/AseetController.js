Ext.define('Wsitms.view.aseet.AseetController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.aseet-register',
	requires : [
		'Wsitms.view.aseet.AseetForm',
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('aseetStore').load();
	},


	onAdd : function() {
		this.displayForm(null);
	},

	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.isEdit = !!record;
		this.dialog = view.add({
			xtype : 'aseet-form',
			viewModel : {
				data : {
					title : record ? '修改数据' : '添加数据'
				},
				links : {
					theDepart : record || {
							//id : 'add',//会像后台发送数据
							create : true, //幻影记录，不会像后台发送数据
							type : 'Aseet'
					}
				}
			}
		});
		this.dialog.show();
	},

	onEdit : function() {
		var me = this;
		var data = me.getView().getSelectionModel().getSelection();
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
			return false;
		} else if (number == 1) {
			this.displayForm(data[0]);
			this.lookupReference('resetForm').hide()
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},

	resetForm : function() {
		this.lookupReference('aseetForm').reset();
	},

	saveForm : function() {
		var me = this;
		var aseetForm = this.lookup('aseetForm');
		var id = this.lookup('primary_id').getValue();
		var addUrl = '/Wsitms/depart/addDepart';
		var modUrl = '/Wsitms/depart/modDepart';
		var url = modUrl;
		if (id == 'Depart-1') {
			url = addUrl;
		}
		if (aseetForm.isValid()) {
			aseetForm.submit({
				url : url,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('departStore').load();
					me.dialog = Ext.destroy(me.dialog);
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
	},
})