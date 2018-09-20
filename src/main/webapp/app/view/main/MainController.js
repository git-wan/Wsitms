//主要写控制视图的方法

Ext.define('Wsitms.view.main.MainController',{
	//1 继承
	extend:'Ext.app.ViewController',
	
	//别名
	alias:'controller.main',

	requires:[
		'Wsitms.view.base.UserController',
		'Wsitms.view.main.Header',
		'Wsitms.view.base.Role',
		'Wsitms.view.base.RoleController',
		'Wsitms.view.base.User',
		'Wsitms.view.base.Question',
		'Wsitms.view.base.QuestionController',
		'Wsitms.view.base.Group',
		'Wsitms.view.base.ProblemBack',
		'Wsitms.view.base.ProblemQuery',
		'Wsitms.view.base.StateRecord',
		'Wsitms.view.base.StateLook',
		'Wsitms.view.base.IpPatrol',
		'Wsitms.view.base.DbPatrol',
		'Wsitms.view.base.TableSpace',
		'Wsitms.view.base.Depart',
		'Wsitms.view.base.Aseet',
		'Wsitms.view.base.Staff',
		'Wsitms.view.base.Supplier',
		'Wsitms.view.base.Entity',
		'Wsitms.view.base.AseetSort',
		'Wsitms.view.base.AllotRecord',
		'Wsitms.view.base.Module',
		'Wsitms.view.base.QueryLog',
		'Wsitms.view.base.SysCode',
		'Wsitms.view.base.Supplier',
		'Wsitms.view.base.EntityProp',
		'Wsitms.view.base.Property',
		'Wsitms.view.base.AseetReport',
		'Wsitms.view.base.Company',
		'Wsitms.view.main.HomePage'
	],
	
	//3方法
	onClickAbout:function(){
		Ext.Msg.alert('信息','啊啊啊啊')
	},
    onClickQuit:function(){
    	Ext.Msg.confirm('提醒','确认退出','onExit',this)
    },
    onExit:function(choice){
    	if(choice=='yes'){
    		Ext.Msg.alert('信息','退出')
    	}
    },
    
    onWeb:function(){
    	
    	window.open('http://www.baidu.com')
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
    
    onMenuItemSelect:function(tree,record ,index,eOpts){
    	var moduleId=record.get('moduleId');
    	var contentPanel=Ext.getCmp('content-panel');
    	// 2 让xtype与moduleID保持一致
    	//var module =Ext.widget(moduleId);
    	//3 类管理器 类似反射
    	var className=Ext.ClassManager.getNameByAlias('widget.'+moduleId);
    	var ViewClass=Ext.ClassManager.get(className);
    	var module=new ViewClass();
    	//关闭布局
    	Ext.suspendLayouts();
    	
    	contentPanel.removeAll(true);
    	contentPanel.add(module); 
    	this.updateTitle(contentPanel, record)
    	//开启布局
    	Ext.resumeLayouts(true)
    },
    
    updateTitle:function(panel,record){
    	var title=record.get('text');
    	
    	panel.setTitle(title);
    	document.title=title;
    	
    },
    
    init:function(){
    	var me=this;
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