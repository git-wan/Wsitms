Ext.define('Wsitms.view.report.AseetReportController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.aseetreport',
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
		if (record) {
			var COMPANY_CODE = record.get('COMPANY_CODE');
			this.lookup('combo-company').setValue(COMPANY_CODE);
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
			this.lookupReference('departFormReset').hide()
		} else {
			Ext.Msg.alert('提示', '只能选择一条记录')
			return false;
		}
	},


	resetForm : function() {
		this.lookup('mornForm').reset();
	},

	saveForm : function() {
		var me = this,
			mornForm = this.lookup('mornForm');
			/*	    	var values =  mornForm.getValues(true);
				    	if(mornForm.getValues()["SERVER"]==undefined){
				    		alert(mornForm.getValues()["SERVER"])
				    	}*/

		if (mornForm.isValid()) {
			mornForm.submit({
				url : '/Wsitms/report/duty',
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
				/*me.getViewModel().getStore('departStore').load(); 
				me.dialog = Ext.destroy(me.dialog);*/
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