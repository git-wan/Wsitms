Ext.define('Wsitms.view.assess.AssPlanController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.assplan',
	requires : [
		'Wsitms.view.assess.AssTimeForm'
	],
	onAfterLayout : function() {
		this.getViewModel().getStore('asstimeStore').load();
		this.getViewModel().getStore('asjStore').load();
	},

	onAddTime : function() {
		this.displayForm(null);
	},

	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.isEdit = !!record;
		this.dialog = view.add({
			xtype : 'asstime-window',
			viewModel : {
				data : {
					title : record ? '修改数据' : '添加数据'
				},
			}
		});
		if (record) {
			this.lookup('asstime-form').loadRecord(record);
		}
		this.dialog.show();
	},

	onEditTime:function() {
		var me = this;
		var data = me.lookup('asstime').getSelectionModel().getSelection();
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
			return false;
		} else if (number == 1) {
			this.displayForm(data[0]);
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
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
			this.lookupReference('departFormReset').hide()
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},

	resetForm : function() {
		this.lookupReference('departForm').reset();
	},

	saveForm : function() {
		var me = this;
		var assTimeForm = this.lookup('asstime-form');
		var majorkey = this.lookup('majorkey');
		alert(majorkey.getValue())
		alert(assTimeForm.getValues(true))
		return false;
		
		if (assTimeForm.isValid()) {
			assTimeForm.submit({
				url : '/Wsitms/assess/addAssTime',
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



	textWeb : function() {
		var opStore = this.lookup('opGrid').getStore();
		var opModel = opStore.getCount();
		if (opModel < 1) {
			Ext.Msg.alert('提示', '没有操作信息添加');
			this.lookup('opRecord').destroy();
			return false;
		}
		var dataArr = [];
		opStore.each(function(record) {
			dataArr.push(record.data)
		})
		var jsonData = JSON.stringify(dataArr)
		Ext.Ajax.request({
			url : '/Wsitms/state/queryWeb',
			params : {
				'jsonData' : jsonData
			},
			method : 'POST',
			success : function(response, opts) {
				Ext.Msg.alert('提示', response.result.msg);
			},
			failure : function(response, opts) {}
		});
	}
})