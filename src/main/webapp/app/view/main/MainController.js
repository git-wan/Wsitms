//主要写控制视图的方法

Ext.define('Wsitms.view.main.MainController', {
	//1 继承
	extend: 'Ext.app.ViewController',

	//别名
	alias: 'controller.main',

	requires: [
		'Wsitms.view.main.Header',
		'Wsitms.view.system.Role',
		'Wsitms.view.system.User',
		'Wsitms.view.problem.Question',
		'Wsitms.view.system.Group',
		'Wsitms.view.problem.ProblemBack',
		'Wsitms.view.problem.ProblemQuery',
		'Wsitms.view.status.StateRecord',
		'Wsitms.view.status.StateLook',
		'Wsitms.view.status.IpPatrol',
		'Wsitms.view.status.DbPatrol',
		'Wsitms.view.status.TableSpace',
		'Wsitms.view.aseet.Depart',
		'Wsitms.view.aseet.Aseet',
		'Wsitms.view.aseet.Staff',
		'Wsitms.view.aseet.Supplier',
		'Wsitms.view.define.Entity',
		'Wsitms.view.aseet.AseetSort',
		'Wsitms.view.aseet.AllotRecord',
		'Wsitms.view.system.Module',
		'Wsitms.view.system.QueryLog',
		'Wsitms.view.define.SysCode',
		'Wsitms.view.aseet.Supplier',
		'Wsitms.view.define.EntityProp',
		'Wsitms.view.define.Property',
		'Wsitms.view.report.AseetReport',
		'Wsitms.view.aseet.Company',
		'Wsitms.view.main.HomePage',
		'Wsitms.view.report.SaleReport',
		'Wsitms.view.status.WebPatrol',
		'Wsitms.view.report.DutyReport',
		'Wsitms.view.main.PassForm',
		'Wsitms.view.problem.article.List',
		'Wsitms.view.report.schedule.List',
		'Wsitms.view.aseet.serverlist.List',
		'Wsitms.view.assess.AssInfo',
		'Wsitms.view.assess.Ass',
		'Wsitms.view.assess.AssRs',
		'Wsitms.view.assess.AssPlan',
		'Wsitms.view.assess.Asj'
	],

	//3方法
	logAgain: function () {
		window.location.href = '';
	},
	onClickQuit: function () {
		Ext.Msg.confirm('提醒', '确认退出', 'onExit', this)
	},
	onExit: function (choice) {
		if (choice == 'yes') {
			window.location.href = 'about:blank';
		}
	},

	editPass: function () {
		this.dialog = this.getView().add({
			xtype: 'pass-form'
		})
		this.dialog.show()
	},

	resetForm: function () {
		this.lookupReference('passForm').reset();
	},

	saveForm: function () {
		var me = this;
		var passForm = this.lookup('passForm');
		if (passForm.isValid()) {
			passForm.submit({
				url: '/Wsitms/user/editPass',
				waitMsg: '正在提交数据',
				waitTitle: '提示',
				method: 'POST',
				success: function (form, action) {
					Ext.Msg.alert('提交成功', action.result.msg);
					me.lookup('pass-form').destroy();
				},
				failure: function (form, action) {
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

	closeForm: function () {
		this.dialog = Ext.destroy(this.dialog);
	},


	/* onMenuItemSelect:function(tree,record ,index,eOpts){
	 	var moduleId=record.get('moduleId');
	 	//1 :找到contentPanel 这个组件
	 	var contentPanel=Ext.getCmp('content-panel');
	 	if(moduleId=='userManage'){
	 		
	 		//2 :动态创建user视图
	 		var user =Ext.create('DemoExt2.view.base.User')
	 		//3： 移除当前 contentPanel里面的内容
	 		contentPanel.removeAll(true);
	 		//4: 添加 动态user视图到contentPanel
	 		contentPanel.add(user);  
	 	
	 		
	 		
	 	}else if(moduleId=='departManage'){
	 		//2 :动态创建user视图
	 		var depart =Ext.create('DemoExt2.view.base.Depart')
	 		//3： 移除当前 contentPanel里面的内容
	 		contentPanel.removeAll(true);
	 		//4: 添加 动态user视图到contentPanel
	 		contentPanel.add(depart);  
	 	}else if(moduleId=='menuManage'){
	 		
	 	}else if(moduleId=='roleManage'){
	 		
	 	}else{
	 		
	 		Ext.Msg.alert('系统错误',"模块没有找到")
	 	}
	 	this.updateTitle(contentPanel, record)
	 },*/

	onMenuItemSelect: function (tree, record, index, eOpts) {
		var moduleId = record.get('moduleId');
		var contentPanel = Ext.getCmp('content-panel');
		// 2 让xtype与moduleID保持一致
		//var module =Ext.widget(moduleId);
		//3 类管理器 类似反射
		var className = Ext.ClassManager.getNameByAlias('widget.' + moduleId);
		var ViewClass = Ext.ClassManager.get(className);
		var module = new ViewClass();
		//关闭布局
		Ext.suspendLayouts();

		contentPanel.removeAll(true);
		contentPanel.add(module);
		this.updateTitle(contentPanel, record)
		//开启布局
		Ext.resumeLayouts(true)
	},

	updateTitle: function (panel, record) {
		var title = record.get('text');

		panel.setTitle(title);
		document.title = title;

	},

	init: function () {
		var me = this;
		/*    	Ext.Ajax.request({
		    		url:'/Wsitms/login/check_login',
		    		
		    		async:false,
		    		
		    		success:function(response,opts){
		    			var text =response.responseText;
		    			var menuGroupInfo =Ext.decode(text,true);
		    			var menuGroup =[];
		    			if(menuGroup.root){
		    				Ext.Array.each(menuGroupInfo.root,function(group){
		    					var _group = {};//空对象
		    					_group['text']=group.NODE_NAME;
		    					
		    				})
		    			}
		               
		    		},
		    	    
		    	    failure:function(reponse,opts){
		    	    	
		    	    
		    	    }
		    		
		    	})*/

		//this.getView().destroy();
		//document.getElementById("login-background-img").style.display = "none";
		// Ext.create('Wsitms.view.login.Login')

		//Ext.getCmp('login-repass-background-img').drop();

	}



})