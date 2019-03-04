Ext.define('Wsitms.view.assess.AssInfoController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.assinfo',
	requires : [
		'Wsitms.view.assess.AssInfoForm'
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('assinfoStore').load();
		/*this.getViewModel().getStore('scoruleStore').load();*/
	},

	onAdd : function() {
		this.displayForm(null);
	},

	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.dialog = view.add({
			xtype : 'assinfo-window',
			viewModel : {
				data : {
					title : record ? '修改数据' : '添加数据',
				}
			}
		});
		if (record) {
			this.lookup('assinfo-form').loadRecord(record);
		}
		this.dialog.show();
	},

	onEdit : function() {
		var me = this;
		var data = me.lookup('ass_project').getSelectionModel().getSelection();
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
			return false;
		} else if (number == 1) {
			this.displayForm(data[0]);
			this.lookup('assinfoFormReset').hide()
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},

	resetForm : function() {
		this.lookupReference('assinfo-form').reset();
	},

	saveForm : function() {
		var me = this;
		var assinfoForm = this.lookup('assinfo-form');
		var id = this.lookup('primary_id').getValue();
		var addUrl = '/Wsitms/assess/addAssInfo';
		var modUrl = '/Wsitms/assess/modAssInfo';
		var url = modUrl;
		if (id == '') {
			url = addUrl;
		}
		if (assinfoForm.isValid()) {
			assinfoForm.submit({
				url : url,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('assinfoStore').load();				
					me.dialog = me.dialog.destroy();			
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
	
	del : function() {
		var me = this;
		var data = me.getView().getSelectionModel().getSelection();
		var ID = data[0].get("ID");
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
		}
		Ext.Ajax.request({
			url : '/Wsitms/assess/delAssInfo',
			params : {
				"ID" : ID
			},
			success : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("信息提示", respText.msg);
				me.getViewModel().getStore('assinfoStore').load();
			},
			failure : function(response, opts) {
				var respText = Ext.util.JSON.decode(response.responseText);
				Ext.Msg.alert("信息提示", respText.msg);
			}
		});
	},

	closeForm : function() {
		this.dialog = Ext.destroy(this.dialog);
	},

	prn1_preview : function() {
		window.open("question/printPage", "", 'left=0,top=0,width=750,height=1000,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes');
	},

	CreateOneFormPage : function() {
		this.LODOP = getLodop();
		this.LODOP.PRINT_INIT("打印控件功能演示_Lodop功能_表单一");
		this.LODOP.SET_PRINT_STYLE("FontSize", 8);
		this.LODOP.SET_PRINT_STYLE("Bold", 1);
		this.LODOP.ADD_PRINT_HTM(18, 20, 350, 600, document.getElementById("aseet-report").innerHTML);
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