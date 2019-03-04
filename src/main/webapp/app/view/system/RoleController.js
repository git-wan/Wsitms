Ext.define('Wsitms.view.system.RoleController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.role-manage',

	requires : [
		'Wsitms.view.system.RoleForm',
		'Wsitms.view.system.Authority'
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('roleStore').load();
	},

	onAdd : function() {
		this.displayForm(null);
	},
	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.isEdit = !!record;
		this.dialog = view.add({
			xtype : 'role-form',
			viewModel : {
				data : {
					title : record ? '修改角色' : '添加角色'
				},
			}
		});
		if (record) {
			this.lookup('roleForm').loadRecord(record);
		}
		this.dialog.show();
	},

	onEdit : function() {
		var me = this;
		var data = me.lookup('roleList').getSelectionModel().getSelection();
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
			return false;
		} else if (number == 1) {
			this.displayForm(data[0]);
			this.lookup('roleFormReset').hide();

		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},

	closeForm : function() {
		this.dialog = Ext.destroy(this.dialog);
	},

	resetForm : function() {
		this.lookup('roleForm').reset();
	},

	saveForm : function() {
		var me = this;
		var roleForm = this.lookup('roleForm');
		var id = this.lookup('primary_id').getValue();
		var addUrl = '/Wsitms/role/addRole';
		var modUrl = '/Wsitms/role/modRole';
		var url = modUrl;
		if (id == '') {
			url = addUrl;
		}
		if (roleForm.isValid()) {
			roleForm.submit({
				url : url,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('roleStore').load();
					me.dialog = Ext.destroy(me.dialog); //
				},
				failure : function(form, action) {
					switch (action.failureType) {
					case Ext.form.action.Action.CLIENT_INVALID:
						Ext.Msg.alert('提交失败', '不能使用无效值提交表单字段');
						me.dialog = Ext.destroy(me.dialog);
						break;
					case Ext.form.action.Action.CONNECT_FAILURE:
						Ext.Msg.alert('提交失败', 'Ajax通信失败');
						me.dialog = Ext.destroy(me.dialog);
						break;
					case Ext.form.action.Action.SERVER_INVALID:
						Ext.Msg.alert('提交失败', action.result.msg);
						me.dialog = Ext.destroy(me.dialog);
					}
				}
			})
		}

	},

	onDel : function(button) {
		var selection = button.getWidgetRecord();
		selection.drop(); //删除数据（标记数据为删除）   	

	},

	setAuthClick : function() {
		var me = this;
		var role = this.lookup('roleList').getSelectionModel().getSelection();
		if (role.length < 1) {
			Ext.Msg.alert('提示', '请选择一条角色信息')
			return false;
		}
		this.dialog = this.getView().add({
			xtype : 'authority'
		});
		var USER_ROLE = role[0].get('ROLE_NAME');
		/*var USER_ID='${}';*/
		var store = Ext.create('Ext.data.Store', {
			fields : [ 'MODULE_ID', 'DESCRIBE', 'GROUPNAME', 'MENU_ID' ],
			autoLoad : false,
			pageSize : 0,
			groupField : 'GROUPNAME',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/menu/roleMenu?USER_ROLE=' + encodeURI(USER_ROLE)
				}
			}
		});
		this.lookup('selectAuth').setStore(store);
		this.lookup('selectAuth').getStore().load();
		var store1 = Ext.create('Ext.data.Store', {
			fields : [ 'MODULE_ID', 'DESCRIBE', 'GROUPNAME', 'MENU_ID' ],
			autoLoad : false,
			pageSize : 0,
			groupField : 'GROUPNAME',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/menu/userNoMenu?USER_ID=' + USER_ID + '&USER_ROLE=' + encodeURI(USER_ROLE) //'/Wsitms/menu/roleNoMenu?USER_ROLE='+USER_ROLE
				}
			}
		});
		this.lookup('waitAuth').setStore(store1);
		this.lookup('waitAuth').getStore().load();
		me.dialog.show()
	},


	waitauthdblclick : function(grid, record, element, rowIndex, e, eOpts) {
		var addModel = grid.getSelectionModel().getSelection()
		this.lookup('selectAuth').getStore().insert(0, addModel);
		this.lookup('waitAuth').getStore().remove(addModel);
	},
	selectauthdblclick : function(grid, record, element, rowIndex, e, eOpts) {
		var addModel = grid.getSelectionModel().getSelection()
		this.lookup('waitAuth').getStore().insert(0, addModel);
		this.lookup('selectAuth').getStore().remove(addModel);
	},


	confirmAuth : function() {
		var role = this.lookup('roleList').getSelectionModel().getSelection();
		var ROLE_NAME = role[0].get('ROLE_NAME');
		var authStore = this.lookup('selectAuth').getStore();
		var dataArr = [];
		var flag = true;
		authStore.each(function(record) {
			if (record.get('MODULENAME') == 'role-manage') {
				flag = false;
			}
			dataArr.push(record.data);
		});
		if (flag && ROLE_NAME == '超级管理员') {
			Ext.Msg.alert('提示', '不可以弃用角色权限！');
			return false;
		}
		var jsonData = JSON.stringify(dataArr)
		Ext.Ajax.request({
			url : '/Wsitms/menu/setRoleAuth',
			params : {
				'jsonData' : jsonData,
				'ROLE_NAME' : ROLE_NAME
			},
			method : 'POST',
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				if (respText.success) {
					Ext.Msg.alert('提示', '权限设置成功');
				//me.getViewModel().getStore('questStore').load();
				} else {
					Ext.Msg.alert('提示', '权限设置失败');
				}
			},
			failure : function(response, opts) {
				Ext.Msg.alert('提示', '权限设置失败');
			}
		});
		this.dialog = Ext.destroy(this.dialog);
	},

	rowclick : function(grid, record, element, rowIndex, e, eOpts) {

		var ROLE_NAME = record.get('ROLE_NAME');
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			//model:model,
			fields : [ 'MODULENAME', 'DESCRIBE', 'GROUPNAME', 'VALID', 'UPDATETIME', 'REGISTER' ],
			groupField : 'GROUPNAME',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/menu/roleMenu?ROLE_NAME=' + encodeURI(ROLE_NAME)//防止乱码转义
				}
			}
		});

		this.lookup('queryModInfo').setStore(store);
		this.lookup('queryModInfo').getStore().load();
	},


	//删除信息
	onBatchDel : function() {
		var ids = '';
		var selectionModel = Ext.getCmp('question-point').getSelectionModel();
		var selection = selectionModel.getSelection();
		var me = this;
		if (selection.length == 0) {
			Ext.Msg.alert("提示", "请选择要删除的记录!");
			return;
		} else {
			Ext.Msg.confirm("提示", "确定删除?", function(button, text) {
				if (button == "yes") {


					/*		for (var i = 0; i < selection.length; i++) {
									
								selection[i].drop();
								
								}*/
					for (var i = 0; i < selection.length; i++) {
						if (i == 0) {
							ids = selection[i].get('id');
						} else {
							ids += "," + selection[i].get('id');
						}
					}
					;

					Ext.Ajax.request({
						url : '/WsCarPark/depart/destroy',
						params : {
							idList : ids
						},
						success : function(response, opts) {
							var respText = Ext.util.JSON.decode(response.responseText);
							Ext.Msg.alert("信息提示", respText.message);
							me.getViewModel().getStore('departStore').load();
							Ext.getCmp('question-point').getStore().reload();

						},
						failure : function(response, opts) {
							var respText = Ext.util.JSON.decode(response.responseText);
							alert(respText)
							Ext.Msg.alert("信息提示", respText.message);
						}
					});
				}
			});
		}
	}
});