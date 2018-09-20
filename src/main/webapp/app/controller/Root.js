Ext.define('Wsitms.controller.Root',{
	extend:'Ext.app.Controller',
	
	config:{
		//控制谁 谁的哪个事件，监听菜单树
		control:{
			'mainmenu treepanel':{
				select:'onMenuSelectForRout'
			}
		},
       //引入控制逻辑的视图组件
	    refs:{
	    	mainMenu:'mainmenu',
	    	contentPanel:'content-panel'
	    },		
		//路由
		routes:{
			':id':{
				action:'handleRout',
				before:'beforeHandleRout'
			}			
		}		
	    },
	    
	    findNode:function(id){
	    	//1 找到treepanel
	    	var me =this,mainMenu=me.getMainMenu(),
	    	menuTrees =mainMenu.query('treepanel'),
	    	node=null;
	    	Ext.Array.each(menuTrees,function(menuTree){
	    		//questionPoint
	    		var store =menuTree.getStore();
	    		node=store.getNodeById(id);
	    		
	    		if(node){//if标签用{}
	    			return false;
	    		}	    			
	    	});
	    	return node;
	    },
	    
	    //
	    findAndFocusNode:function(id){
	    	var me =this,mainMenu=me.getMainMenu(),
	    	menuTrees =mainMenu.query('treepanel'),
	    	node=null;

	    	Ext.Array.each(menuTrees,function(menuTree){	    		
	    		var store =menuTree.getStore();
	    		node=store.getNodeById(id);
	    		if(node){	    			    			
	    			menuTree.getSelectionModel().select(node);//选中tree的数据
	    		    menuTree.getView().focusNode(node);//聚焦
	    			return false;
	    		}	    		
	    	});
	    	return node;
	    },
	    
	    
	    handleRout:function(id){
	    	//1 聚焦菜单
	    	var me=this,node=me.findAndFocusNode(id),
	    	contentPanel=me.getContentPanel(),
	    	moduleId=id;
	    	//2 执行模块切换
	    	
	    	var className=Ext.ClassManager.getNameByAlias('widget.'+moduleId);
	    	var ViewClass=Ext.ClassManager.get(className);
	    	var module=new ViewClass();
	    	//关闭布局
	    	Ext.suspendLayouts();
	    	
	    	//contentPanel.removeAll(true);
	    	//contentPanel.add(module); 
	    	//this.updateTitle(contentPanel, node)
	    	//1 配置我们需要显示的tab的属性
	    	module =Ext.apply(module,{
	    		itemId:id,
	    		//closable:true,
	    		//glyph:node.get('glyph'),
	    		title:node.get('text'),
	    		tooltip:node.get('text'),
	    	});
	    	
	    	this.addTab(contentPanel,module);
	    	//开启布局
	    	Ext.resumeLayouts(true)
	    	
	    },
	    
	    addTab:function(contend,module){
	    	//得到contentPanel
	    	var tabs =contend,
	    	id=module.getItemId(),
	    	//
	    	tab =tabs.items.getByKey(id);
	    	if(!tab){
	    		tab=tabs.add(module)
	    	}
	    	tabs.setActiveTab(tab);
	    },
	    
	    
	    beforeHandleRout:function(id,action){
	    	//判断当前浏览器给出的模块编号的合法性
	    	var me =this,node=me.findNode(id);
	    	//合法放行，不合法就弹出提示或者定位到系统默认页面
			if(!userName){
				window.location.href='login.jsp';
				return false
			}
	    	
	    	if(node){
	    		action.resume();
	    	}else{
	    		Ext.Msg.alert('系统错误','请求的模块'+id+'不能被找到，系统将定位到默认页面')
	    	}
	    	
	    },
	
	
	
	onMenuSelect:function(tree,record ,index,eOpts){
		
		var me =this;
		
    	var moduleId=record.get('moduleId');
    	var contentPanel=me.getContentPanel();
           
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
    
    onMenuSelectForRout:function(tree,record,index,eOptes){

    	this.redirectTo(record.get('moduleId'))//将获得的ID与路由器匹配
    },
    
  
    updateTitle:function(panel,node){
    	var title=node.get('text');    	
    	panel.setTitle(title);
    	document.title=title;    	
    }
	
})