Ext.define('Wsitms.view.main.MainMenu',{
	extend:'Ext.panel.Panel',
	
	
	xtype:'mainmenu',
	
	title:'系统菜单',
	
	glyph:0xf0c9,
	
	frame:true,
	collapsible:true,
	requires:['Ext.tree.Panel'],
	//布局

	layout:{
	type:'accordion',
	animate:true
		
	},
	autoScroll:true,//滚动条
	controller:'main',
	viewModel:'main',
	
	
	initComponent:function(){
		if(!userName){
			window.location.href='login.jsp';
			return false;
		}
		var  me  =this;
		Ext.Ajax.request({
    		url:'/Wsitms/menu/getMenuList',    		
    		async:false,    		
    		success:function(response,opts){
    			var text =response.responseText;
    			var menuGroupInfo =Ext.decode(text,true);
    			var menuGroup = [];
    			var menus = new Set([]);
    			if(menuGroupInfo){    				
    				Ext.Array.each(menuGroupInfo.modules,function(module){    					
    					menus.add(module.GROUPNAME);    	  					
    				})    				
    				for (var menu of menus) {
    					var _group = {};//空对象
    					_group['text']=menu;
						var NODE_ID=menu;
						var menuItems=[];
						Ext.Array.each(menuGroupInfo.modules,function(module){    							 
							 if(module.GROUPNAME==NODE_ID){    								
								 var _menu=[];
								 _menu['text']=module.DESCRIBE;
								 _menu['module']=module.MODULENAME;
								 menuItems.push(_menu);
							 }
						})
						_group['menuItems'] =menuItems;
						menuGroup.push(_group); 
                      }
    			}
    			me.getViewModel().set('leftMenu.menuGroup',menuGroup)
    		},
    	    
    		
    		
    	})
		
		
		function makeTreeStore(group){
			//1 实例化一个treeStore
			//2 得到根节点
			//3 循环每个分组下的模块项，得到的模块项注入tree
			var storeTree=Ext.create("Ext.data.TreeStore",{
				root:{
					text:group.text,
					expanded:true,
			        leaf:false
				}
			});
			
			
			var root =storeTree.getRootNode();
			var menuItems =group.menuItems;
			for(var i in menuItems){
				var item =menuItems[i];
				var childNode=Ext.apply({},{
					text:item.text,
					leaf:true,
					//glyph:item.glyph,
					id:item.module,
					moduleId:item.module,
					moduleName:item.text
					
				})
				root.appendChild(childNode);

			}
			
			return storeTree
		}
		
		
		//1 得到viewModel数据中心
		
		//2 根据数据中心的data配置的到我们的菜单数据
		
		//3 循环菜单分组，处理菜单数据
		this.items=[{hidden:true}];
		
		var menus =this.getViewModel().get('leftMenu.menuGroup');
		
		for(var i in menus){
			var menuGroup =menus[i];

			var groupPanel =Ext.create('Ext.tree.TreePanel',{
				title:menuGroup.text,
				collapsed: true,
				//expanded:true,//是否展开
				rootVisible:false,
				//collapsible:true,
				
				store:makeTreeStore(menuGroup),
				//listeners:{
					//捕获到选择菜单项的事件
				//	select:'onMenuItemSelect'					
			//	}				
			})
			this.items.push(groupPanel)
		};

		this.items.push({hidden:true});
		
		this.callParent();
	}
	
	
})