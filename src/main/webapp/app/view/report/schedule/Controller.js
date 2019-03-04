Ext.define('Wsitms.view.report.schedule.Controller', {
	extend : 'Ext.app.ViewController',
	alias : 'controller.schedule',
	requires : [ 'Wsitms.view.report.schedule.Add' ],

	onAfterLayout:function(){
		this.getViewModel().getStore('artStore').load();	
	},
	add : function() {
		this.dialog = this.getView().add({
			xtype : 'shedue-window'
		})
		var me = this,schForm = this.lookup('sch-form');	
		Ext.Ajax.request({
			url:'/Wsitms/user/getZX',
			success:function(response,opts){
				var text  = response.responseText;
				var userInfo = Ext.decode(text,true);
				if(userInfo){
					Ext.Array.each(userInfo,function(user){					
						var textfield= Ext.create('Ext.form.field.ComboBox',{
							fieldLabel:user.USER_NAME,
							editable:false,
							name:user.USER_CODE+'-'+user.USER_NAME,
							displayField:'name',
							allowBlank : false,
							valueField:'abbr',
							store:{data:[{
									"abbr":"星期一","name":"星期一"
								},{
									'abbr':'星期二','name':'星期二'
								},{
									'abbr':'星期三','name':'星期三'
								},{
									'abbr':'星期四','name':'星期四'
								},{
									'abbr':'星期五','name':'星期五'
								},{
									'abbr':'星期六','name':'星期六'
								},{
									'abbr':'星期日','name':'星期日'
								}]
							}		
						})
						schForm.items.add(textfield);
					})
				}	
				me.dialog.show()
			}
		})		
	},


	saveForm : function() {
		var me = this;
		var schForm = this.lookup('sch-form');
		if (schForm.isValid()) {
			schForm.submit({
				url : '/Wsitms/report/addSch',
				waitMsg : '正在提交数据',
				waitTitle : '提示',
				method : 'POST',
				success : function(form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
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
	
    closeForm : function(){
   	 this.dialog = Ext.destroy(this.dialog);
    },
    
    resetForm:function(){
    	this.lookupReference('sch-form').reset();    	
    },
})