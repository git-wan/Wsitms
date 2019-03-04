Ext.define('Wsitms.view.status.StReController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.state-record',

	onAfterLayout : function() {
		var store = Ext.create('Ext.data.TreeStore', {
			fields : [
				{
					name : "ENTITYNO",
					type : "string"
				},
				{
					name : "text",
					type : "string",
					mapping : 'ENTITYNAME'
				},
				{
					name : "leaf",
					type : "boolean",
					defaultValue : true
				},
				//{name : "expanded",type : "boolean",defaultValue: false},

			],
			autoLoad : false,
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/init/entityList'
				}
			},
			root : {
				expanded : true,
			}
		});
		this.lookup('staterecord').setStore(store);
		this.lookup('staterecord').getStore().load();
	},

	stateRecordClick : function(grid, record, element, rowIndex, e, eOpts) {
		var ENTITYNO = record.get('ENTITYNO');
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			model : 'EntityProp',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/init/entPropEntry?ENTITYNO=' + ENTITYNO
				}
			}
		});
		this.lookup('entProp').setStore(store);
		this.lookup('entProp').getStore().load();
	},

	saveStatus : function() {
		var store = this.lookup('entProp').getStore();
		if(store.getCount()<1){
			Ext.Msg.alert('提示','没有数据需要保存')
			return false;
		}
		var dataArr = [];
		store.each(function(record) {
			dataArr.push(record.data)
		})
		var jsonData = JSON.stringify(dataArr)
		Ext.Ajax.request({
			url : '/Wsitms/state/addStatus',
			params : {
				'jsonData' : jsonData
			},
			method : 'POST',
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("信息提示", respText.msg);
			},
			failure : function(response, opts) {}
		});
	}
})