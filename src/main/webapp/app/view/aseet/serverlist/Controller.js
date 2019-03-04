Ext.define('Wsitms.view.aseet.serverlist.Controller', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.serverlist',
	requires : [ 
		'Wsitms.view.aseet.serverlist.Add',
		'Wsitms.model.Server'
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('serverStore').load();
	},
	add : function() {
		this.displayForm(null);
	},

	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.dialog = view.add({
			xtype : 'serverlist-window',
			session : true,
			viewModel : {
				data : {
					title : record ? '修改数据' : '添加数据',
				}
			}
		});
		if (record) {
			this.lookup('server-form').loadRecord(record);
		}
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
			this.lookupReference('serverFormReset').hide()
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},
	saveForm : function() {
		var id = this.lookup('primary_id').getValue();
		var addUrl = '/Wsitms/aseet/addServer';
		var modUrl = '/Wsitms/aseet/modServer';
		var url = modUrl;
		if (id == '') {
			url = addUrl;
		}
		var me = this;
		var serForm = this.lookup('server-form');
		if (serForm.isValid()) {
			serForm.submit({
				url : url,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('serverStore').load();
					me.dialog = me.dialog.destroy();
				},
				failure : function(form, action) {
					switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
						me.dialog = me.dialog.destroy();
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('提交失败', 'Ajax通信失败');
						me.dialog = me.dialog.destroy();
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert('提交失败', action.result.msg);
						me.dialog = me.dialog.destroy();
					}
				}
			})
		}
	},

	del : function() {
		var me = this;
		var data = me.getView().getSelectionModel().getSelection();
		var SERVER_ID = data[0].get("SERVER_ID");
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
		}
		Ext.Ajax.request({
			url : '/Wsitms/aseet/delServer',
			params : {
				"SERVER_ID" : SERVER_ID
			},
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("信息提示", respText.msg);
				me.getViewModel().getStore('serverStore').load();
			},
			failure : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("信息提示", respText.msg);
			}
		});
	},

	/*	changeAPP : function(field, newValue, oldValue, eOpts) {
			var url = '/Wsitms/aseet/queryAPP?' + encodeURI(field.name) + '=' + encodeURI(newValue);
			if (newValue == '') {
				url = '/Wsitms/init/entityList';
			}
			var store = Ext.create('Ext.data.Store', {
				autoLoad : false,
				model : 'Entity',
				proxy : {
					type : 'ajax',
					api : {
						read : url
					}
				}
			});
			this.lookup('entity').setStore(store);
			this.lookup('entity').getStore().load();
		},*/

	changeQuery : function(field, newValue, oldValue, eOpts) {
		var url = '/Wsitms/aseet/querySer?' + encodeURI(field.name) + '=' + encodeURI(newValue);
		if (newValue == '') {
			url = '/Wsitms/aseet/serverList';
		}
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			model : 'Server',
			proxy : {
				type : 'ajax',
				api : {
					read : url
				}
			}
		});
		this.getView().setStore(store);
		this.getView().getStore().load();
	},

	closeForm : function() {
		this.dialog = Ext.destroy(this.dialog);
	},

	resetForm : function() {
		this.lookupReference('server-form').reset();
	},
	
	serExcel:function(){
		var store = this.getView().getStore();
    	var size = store.getTotalCount();
    	if(size<1){
    		Ext.Msg.alert('提示','没有可导出数据');
    		return false;
    	}
    	window.location.href='/Wsitms/aseet/excel'
	}
})