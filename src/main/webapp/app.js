
//加载Ext.App.Application类并在页面准备好后以给定的配置启动它。 
//Ext.App.Application由Application.js文件继承并定义
//所以它加载的实例是由Application.js定义的类
Ext.application({
	extend:'Wsitms.Application',
	
	name:'Wsitms',
	controllers:['Root'],
	  views: [
	        'Wsitms.view.login.Login'
	    ],
	listen:{
		controller:{
			'#':{
				unmatchedroute:'onUnmatchedRoute'
			}
		}
	},
    autoCreateViewport:'Wsitms.view.main.Main',
	init:function(){
/*		var me =this;
		me.setDefaultToken('home-page')//默认页
		Ext.tip.QuickTipManager.init();//初始化
*/	
	},
	launch: function() {
/*		var a=Ext.create({
			xtype:'login-win'
		})
	a.destroy()*/
/*		if(this.stateful){  
	        this.initState(config);  
	    } */
	}
	
		
})
