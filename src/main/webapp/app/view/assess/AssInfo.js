Ext.define('Wsitms.view.assess.AssInfo',{
	extend:'Ext.panel.Panel',
	xtype:'assinfo',
    requires:[
		'Wsitms.view.assess.AssInfoController',
		'Wsitms.view.assess.AssInfoModel'
	],
	controller: 'assinfo',
		viewModel : {
		type : 'assinfo'
	},
	layout:'hbox',	
	items:[{
		xtype:'grid',
		bind : {
			store : '{assinfoStore}'
		},
		title:'评定项',
		frame : true,
		width:'50%',
		height:'100%',
		autoScroll : true,	
		reference:'ass_project',
		tbar:[{
			text : '新增',
			glyph:0xf067,
			handler : 'onAdd'
		}, {
			text : '修改',
			glyph:0xf044,
			handler : 'onEdit'
		}, {
			text : '删除',
			glyph:0xf014,
			handler : 'del'
		}],
		columns:[{
			text:'评定类型',
			dataIndex:'ASSTYPE',
		},{
			text:'评分项',
			dataIndex:'SCOREGROUP',
		},{
			text:'分值',
			dataIndex:'SC_PRICE',
		},{
			text:'备注',
			dataIndex:'SCOREINFO',
			flex:1
		}],	
	},{
		xtype:'grid',
	/*	bind : {
			store : '{scoruleStore}'
		},*/
		title:'总分项',
		width:'50%',
		height:'100%',
		autoScroll : true,	
		frame : true,
		tbar:[{
			text : '新增',
			glyph:0xf067,
			handler : 'onAdd'
		}, {
			text : '修改',
			glyph:0xf044,
			handler : 'onEdit'
		}, {
			text : '删除',
			glyph:0xf014,
			handler : 'del'
		}],
		columns:[{
			text:'评定类型',
			dataIndex:'SCO_TYPE',
		},{
			text:'评分模式',
			dataIndex:'PATTERN',
		},{
			text:'分值所占百分比',
			dataIndex:'PERCENT',
		},{
			text:'备注',
			dataIndex:'SCOREINFO',
			flex:1
		}],	
	}],
/*	bbar:{
		xtype:'pagingtoolbar',
		bind : {
			store : '{assinfoStore}'
		},
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		emptyMsg:'没有需要显示的数据'
	},*/
	listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },

   
})