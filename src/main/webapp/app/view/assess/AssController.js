Ext.define('Wsitms.view.assess.AssController', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.assess',
	requires : [
		'Wsitms.view.assess.AssForm',
		'Wsitms.model.AssSco',
		'Wsitms.view.assess.AssScoForm'
	],

	onAfterLayout : function() {
		this.getViewModel().getStore('assStore').load();
		this.getViewModel().getStore('mon_users_Store').load();
	},

	changeDate : function(object, newDate, oldDate, eOpts) {
		var me = this;
		var date = this.format(newDate, 'yyyy-MM');
		var store = Ext.create('Ext.data.Store', {
			autoLoad : false,
			model : 'Assess',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/assess/queryDate?ASS_DATE=' + date+'&userName=' + encodeURI(userName)
				}
			}
		});
		var currdate = this.format(new Date(), 'yyyy-MM-dd');
		store.load({
			callback : function(reocrd, options, success) {
				me.getView().setStore(store);
			}
		})
	},

	//时间格式
	format : function(time, format) {
		var t = new Date(time);
		var tf = function(i) {
			return (i < 10 ? '0' : '') + i
		};
		return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
			switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
			}
		})
	},

	exportExcel : function() {
		var newdate = this.lookup('queryDate').getValue();
		var date = this.format(newdate, 'yyyy-MM-dd')
		var store = this.getView().getStore();
		var size = store.getTotalCount();
		if (size < 1) {
			Ext.Msg.alert('提示', '没有可导出数据');
			return false;
		}
		window.location.href = '/Wsitms/report/excel?SALEDATE=' + date
	},

	addMonth : function() {
		var date = this.format(new Date() - 10 * 24 * 60 * 60 * 1000, 'yyyy-MM');

		var store = this.getView().getStore();
		var flag = false;
		if (store.getCount() > 0) {
			store.each(function(record) {

				if (record.get('ADJUSTER') == userName && userName != '高兴' && userName != '肖凯' && userName != '钟育林') {
					if (record.get('ASS_DATE') == date) {
						Ext.Msg.alert('提示', '已自评，请勿重复操作！');
						flag = true;
					}
				}
			})
		}
		if (flag) {
			return false;
		} else {
			this.dialog = this.getView().add({
				xtype : 'ass-window',
				viewModel : {
					data : {
						title : '月度考评',
					}
				}
			})
			var me = this,
				schForm = this.lookup('ass-form');
			var datetext = Ext.create('Ext.form.field.Date', {
				fieldLabel : '考评月份',
				name : 'ASS_DATE',
				value : new Date(new Date-10 * 24 * 60 * 60 * 1000),
				format : 'Y-m',
				style : 'margin-left:20px',
				readOnly : true
			});
			Ext.Ajax.request({
				url : '/Wsitms/assess/getMonthAss',
				success : function(response, opts) {
					var text = response.responseText;
					var assInfos = Ext.decode(text, true);
					if (assInfos) {
						schForm.items.add(datetext);
						Ext.Array.each(assInfos, function(assInfo) {
							var numberfield = Ext.create('Ext.form.field.Number', {
								fieldLabel : assInfo.SCOREGROUP,
								name : assInfo.ID,
								allowBlank : false,
								value : assInfo.SC_PRICE,
								maxValue : assInfo.SC_PRICE,
								style : 'margin-left:20px',
								minValue : 0
							})
							var textarea = Ext.create('Ext.form.field.TextArea', {
								fieldLabel : '评分细则',
								value : assInfo.SCOREINFO,
								style : 'margin-left:20px',
								readOnly : true,
								width : 500
							})
							schForm.items.add(numberfield);
							schForm.items.add(textarea);
						})
						var markarea = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : '评语',
							name : 'REMARK',
							style : 'margin-left:20px',
							allowBlank : false,
							width : 400
						})
						schForm.items.add(markarea);
					}

					me.dialog.show()
				}
			})
		}
	},

	addYear : function() {
		Ext.Msg.alert('提示', '还在开发中。。');
	},

	displayForm : function(record) {
		var view = this.getView(); //得到列表页
		this.dialog = view.add({
			xtype : 'ass-window',
			session : true,
			viewModel : {
				data : {
					title : record ? '修改数据' : '添加数据',
				}
			}
		});
		if (record) {
			this.lookup('ass-form').loadRecord(record);
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
		}
		var status = data[0].get("STATUS");
		var adj = data[0].get('ADJUSTER');
		if (status == '评定完成') {
			if (userName == adj && adj == '高兴') {

			} else {
				Ext.Msg.alert('提示', '此条记录无法修改');
				return false;
			}
		}
		if (status == '等待负责人评定') {
			if ((adj == '钟育林' || adj == '肖凯') &&adj==userName) {

			} else {
				Ext.Msg.alert('提示', '此条记录无法修改');
				return false;
			}
		}
		if (status == '等待上级评定') {
			if (userName != '高兴'&&userName != '钟育林'&&userName != '肖凯'&& adj==userName) {

			} else {
				Ext.Msg.alert('提示', '此条记录无法修改');
				return false;
			}
		}
		this.dialog = this.getView().add({
			xtype : 'asswindow',
			viewModel : {
				data : {
					title : '评定修改',
				}
			}
		});
		var schForm = this.lookup('assform');
		var ASS_ID = data[0].get("ID");
		var ASS_OBJECT = data[0].get("ASS_OBJECT");
		var ASS_DATE = data[0].get("ASS_DATE");
		var REMARK = data[0].get("REMARK");
		var textfield = Ext.create('Ext.form.field.Text', {
			fieldLabel : 'ASS_ID',
			value : ASS_ID,
			name: 'ASS_ID',
			hidden:true
		})
		var textfield1 = Ext.create('Ext.form.field.Text', {
			fieldLabel : 'userName',
			value : userName,
			name: 'userName',
			hidden:true
		})
		var textfield2 = Ext.create('Ext.form.field.Text', {
			fieldLabel : 'ASS_OBJECT',
			value : ASS_OBJECT,
			name: 'ASS_OBJECT',
			hidden:true
		})
		var textfield3 = Ext.create('Ext.form.field.Text', {
			fieldLabel : 'ASS_DATE',
			value : ASS_DATE,
			name: 'ASS_DATE',
			hidden:true
		})
		Ext.Ajax.request({
			url : '/Wsitms/assess/assInfo?ASS_ID=' + ASS_ID,
			success : function(response, opts) {
				var text = response.responseText;
				var assInfos = Ext.decode(text, true);
				if (assInfos) {
					Ext.Array.each(assInfos, function(assInfo) {
						var numberfield = Ext.create('Ext.form.field.Number', {
							name : assInfo.ID,
							fieldLabel : assInfo.SCOREGROUP,
							value : assInfo.ASS_SCORE,
							style : 'margin-left:20px',
							allowBlank : false,
							maxValue : assInfo.SC_PRICE,
						})
						var textarea = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : '评分细则',
							value : assInfo.SCOREINFO,
							style : 'margin-left:20px',
							readOnly : true,
							width : 500
						})
						schForm.items.add(numberfield);
						schForm.items.add(textarea);
						schForm.items.add(textfield);
						schForm.items.add(textfield1);
						schForm.items.add(textfield2);
						schForm.items.add(textfield3);
					})
						var markarea = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : '评语',
							name : 'REMARK',
							style : 'margin-left:20px',
							value: REMARK,
							allowBlank : false,
							width : 400
						})
						schForm.items.add(markarea);
					me.dialog.show();
				}
			}
		});
	},

	queryInfo : function() {
		var me = this;
		var data = me.getView().getSelectionModel().getSelection();
		var number = data.length;
		if (number < 1) {
			Ext.Msg.alert('提示', '请选择一条数据')
			return false;
		}
		var ASS_ID = data[0].get("ID");
		var REMARK = data[0].get("REMARK");
		this.dialog = this.getView().add({
			xtype : 'asswindow',
			viewModel : {
				data : {
					title : '评定明细',
				}
			}
		});
		var schForm = this.lookup('assform');
		this.lookup('saveform').hide();
		Ext.Ajax.request({
			url : '/Wsitms/assess/assInfo?ASS_ID=' + ASS_ID,
			success : function(response, opts) {
				var text = response.responseText;
				var assInfos = Ext.decode(text, true);
				if (assInfos) {
					Ext.Array.each(assInfos, function(assInfo) {
						var numberfield = Ext.create('Ext.form.field.Text', {
							fieldLabel : assInfo.SCOREGROUP,
							value : assInfo.ASS_SCORE,
							style : 'margin-left:20px',
							readOnly : true
						})
						var textarea = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : '评分细则',
							value : assInfo.SCOREINFO,
							style : 'margin-left:20px',
							readOnly : true,
							width : 500
						})
						schForm.items.add(numberfield);
						schForm.items.add(textarea);
					})
					var markarea = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : '评语',
							name : 'REMARK',
							style : 'margin-left:20px',
							value: REMARK,
							readOnly:true,
							width : 400
						})
						schForm.items.add(markarea);
					me.dialog.show();
				}
			}
		});
	},

	resetForm : function() {
		this.lookupReference('departForm').reset();
	},
	
	SaveForm:function(){
		var me = this;
		var assForm = this.lookup('assform');
		/*var id = this.lookup('primary_id').getValue();*/
		var addUrl = '/Wsitms/assess/modAssSco';
		if (assForm.isValid()) {
			assForm.submit({
				url : addUrl,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('assStore').load();
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

	saveForm : function() {
		var me = this;
		var assForm = this.lookup('ass-form');
		/*var id = this.lookup('primary_id').getValue();*/
		var addUrl = '/Wsitms/assess/addAss';
		if (assForm.isValid()) {
			assForm.submit({
				url : addUrl,
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.getViewModel().getStore('assStore').load();
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