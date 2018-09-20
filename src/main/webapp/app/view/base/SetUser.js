Ext.define('Wsitms.view.base.SetUser',{
	extend:'Ext.window.Window',
	xtype:'set-user',
	height:'400',
	width:700,
	modal:true,//模态框，开启遮罩
	
    layout:'hbox',
	items:[{
		xtype:'grid',
		flex:3,
		frame:true,
		height:'100%',
	    title:'备选用户',
	    reference:'waitUser',
	    bind:{store:'{userStore}'},
	    columns:[{
	    	text:'用户编号',
	    	dataIndex:'USER_CODE'
	    },{
	    	text:'用户名称',
	    	dataIndex:'USER_NAME'
	    }],
	    listeners:{
			  rowdblclick:'waituserdblclick'
		    }

	},{
		xtype:'grid',
		flex:1,
		height:'100%',
			
	},{
		xtype:'grid',
		flex:3,
		frame:true,
		height:'100%',
	    title:'已选用户',
	    reference:'selectUser',
	   
	    columns:[{
	    	text:'用户编号',
	    	dataIndex:'USER_CODE'
	    },{
	    	text:'用户名称',
	    	dataIndex:'USER_NAME'
	    }],
	    listeners:{
			  rowdblclick:'selectuserdblclick'
		    }
	}],


})





