Ext.define('Wsitms.view.assess.AssPlan',{
	extend:'Ext.panel.Panel',
	xtype:'assplan',
	requires:[
		'Wsitms.view.assess.AssPlanController',
		'Wsitms.view.assess.AssPlanModel'
		],
	    controller:'assplan',
	    viewModel:{type:'assplan'},
	    
	layout:'hbox',
	items:[{
		xtype:'grid',
		width:'50%',
		height:'100%',
		autoScroll : true,		
		title:'评定人员',
		bind:{store:'{asjStore}'},
		//border:1,
		frame : true,
		tbar:[{
			text:'新增',
			handler:'onAdd'
		},{
			text:'删除',
			handler:'onDel'
		},{
			text:'修改',
			handler:'onEdit'
		}],	
		columns:[{
			text:'评定人',
			dataIndex:'ADJUSTER',
		},{
			text:'评定对象',
			dataIndex:'ASS_OBJECT'
		}],
		 features: [{ftype:'grouping'}],
	},{
		xtype:'grid',
		width:'50%',
		height:'100%',
		title:'评定时间',
		reference:'asstime',
		bind:{store:'{asstimeStore}'},
		tbar:[{
			text:'新增',
			handler:'onAddTime'
		},{
			text:'删除',
			handler:'onDel'
		},{
			text:'修改',
			handler:'onEditTime'
		}],	
		columns:[{
			text:'起始时间',
			dataIndex:'STARTDAY',
		},{
			text:'结束时间',
			dataIndex:'ENDDAY'
		},{
			text:'状态',
			dataIndex:'STATUS'
		}],
	}],


    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	},
    },

})