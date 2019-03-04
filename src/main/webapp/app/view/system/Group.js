Ext.define('Wsitms.view.system.Group',{
	extend:'Ext.panel.Panel',
	xtype:'group-manage',
	requires:[
		'Wsitms.view.system.GroupController',
		'Wsitms.view.system.GroupModel'
	],
	controller: 'group-manage',
	viewModel:{type:'group-manage'},
	layout:'anchor',
    items:[{
    	xtype:'grid',
    	title:'查询组信息',
    	anchor:'100% 50%',
    //	bind:{store:'{groupStore}'},
    	frame:true,
    	autoScroll:true,
    	tbar:[
    		{    		
        	 	text:'添加',
            	tooltip:'添加一个部门到系统中',
            	handler:''
        	},{    		
        	 	text:'修改',
            	tooltip:'选择对部门进行删除',
            	handler:''
        	},{    		
        	 	text:'查询',
            	tooltip:'',
            	handler :''
        	},{    		
        	 	text:'设置组用户',
            	tooltip:'',
            	handler :'onSetUser'
        	},{    		
        	 	text:'设置组角色',
            	tooltip:'',
            	handler :'onSetRole'
        	}],
    	columns:[{
    			text : '组编号',
	   	        dataIndex : 'GROUP_CODE',
	   	        align : 'center',
	   	        flex:1,
	   	        sortable : false,
    		},{
        		text:'组名称',
        		 flex:1,
        		dataIndex:'GROUP_NAME'
        	},{
        		text:'有效标志',
        		 flex:1,
        		dataIndex:'VALID'
        	},{
        		text:'注释',
        		 flex:1,
        		dataIndex:'NOTE'
        	}],
        selModel: {
            selType: 'checkboxmodel'
        },
        
        //底部工具条
        bbar:{
        	    reference:'grouppagingtoolbar',//查找组件
        /*	    bind:{
        			store:''
        		},   */ 		
        	    xtype:'pagingtoolbar',
        	    displayInfo:true,//显示信息
        	    displayMsg : '显示:{0}-{1}条,总共:{2}条',//显示格式,0表示start 1表示end 2表示total
        	    emptyMsg:'没有需要显示的数据'   	
             },
      },{
    	xtype:'panel',
    	anchor:'100% 50%',
    	layout:'hbox',
    	//frame:true,
    	items:[{

            xtype:'grid',
        	title:'查询组用户信息',
        	height:'100%',
            // height:255,
             //flex:1,
         	//anchor:'50% 30%',
             frame:true,
             flex:1,
         	columns:[{
         			 text : '用户编号',
         	         dataIndex : '',
         	         align : 'center',
         	         width : '20px',
         	         hidden : false,
         	         sortable : false,
         		},{
         			text:'用户名称',
             		width:80,
             		dataIndex:''
         		},{
         			text:'用户类型',
             		width:80,
             		dataIndex:''
         		}],
                    selModel: {
                    selType: 'checkboxmodel'
                              },
             },{
            	//cls:'group-role-user',
                xtype:'grid',
              	title:'查询角色信息',
             	height:'100%',
             	//anchor:'50% 50%',
             	flex:1,
             	//frame:true,            	
             	columns:[{
             			 text : '用户编号',
             	         dataIndex : '',
             	         align : 'center',
             	         width : '20px',
             	         hidden : false,
             	         sortable : false,
             		},{
             			text:'用户名称',
                 		width:80,
                 		dataIndex:''
             		},{
             			text:'用户类型',
                 		width:80,
                 		dataIndex:''
             		}],             	
                 selModel: {
                     selType: 'checkboxmodel'
                 },
                 }]
    }],
})