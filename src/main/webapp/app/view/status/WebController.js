Ext.define('Wsitms.view.status.WebController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.web-patrol',
	requires : [
		'Wsitms.model.EntityProp',
		'Wsitms.model.EnPrStatus',
		'Wsitms.view.status.ErrorForm'
	],
	onAfterLayout : function() {
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			model : 'EntityProp',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/state/webPatorl'
				}
			}
		});
		this.getView().setStore(store);
		this.getView().getStore().load();
	},

	webPatrol : function() {
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			model : 'EnPrStatus',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/state/webStatus?PROPERTYNO=WEB'
				}
			}
		});

		var view = me.getView();
		me.dialog = view.add({
			xtype : 'error-form',
		});
		var data = [];
		var store1 = Ext.create('Ext.data.Store', {})
		this.getView().setStore(store);
		this.getView().getStore().load({
			callback : function(record, options, success) {
				for (var i = 0; i < record.length; i++) {
					var STATUS = record[i].get('STATUS');
					if (STATUS != 'ERROR' && STATUS != 'OK') {
						me.getView().getStore().removeAll();
						Ext.Msg.alert('错误', STATUS);
						return false;
					}
					if (STATUS == 'ERROR') {
						me.lookup('errorForm').getStore().insert(0, record[i]);
					}
				}
				store1.add(data);
				me.lookup('errorForm').setStore(store1)
				var opModel = me.lookup('errorForm').getStore().getCount();
				if (opModel < 1) {
					return false;
				}
				me.dialog.show();
			}
		});
	},

	saveForm : function() {
		var errorStore = this.lookup('errorForm').getStore();
		var dataArr = [];
		errorStore.each(function(record) {
			dataArr.push(record.data)
		})
		var jsonData = JSON.stringify(dataArr)
		Ext.Ajax.request({
			url : '/Wsitms/state/addError',
			params : {
				'jsonData' : jsonData
			},
			method : 'POST',
			success : function(response, opts) {
				Ext.Msg.alert('提示', response.result.msg);
			},
			failure : function(response, opts) {}
		});
	},

	closeForm : function() {
		this.dialog = Ext.destroy(this.dialog);
	},
})