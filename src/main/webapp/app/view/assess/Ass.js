Ext.define('Wsitms.view.assess.Ass',{
	extend:'Ext.grid.Panel',
	xtype:'assess',
	requires:[
		'Wsitms.view.assess.AssController',
		'Wsitms.view.assess.AssModel'
	],
	controller: 'assess',
	viewModel : {
		type : 'assess'
	},
	bind : {
		store : '{assStore}'
	},
	layout:'fit',	
	tbar:[{
		text : '新增',
		glyph:0xf067,
		menu:[{
			text:'月度',
			handler:'addMonth',
			tooltip:'新增月度评定',
		},{
			text:'年度',
			handler:'addYear',
			tooltip:'新增年度评定'
		}]
	},{
		text : '修改',
		glyph:0xf044,
		handler : 'onEdit'
	}, {
		text : '查看明细',
		glyph:0xf010,
		handler : 'queryInfo'
	},/*,{
		id:'dlink',
		glyph:0xf1c3,
		text:'导出EXCEL',
	    handler:'aa',
	},*/'-',{
		fieldLabel:'查询时间',
		xtype:'datefield',	
		reference:'queryDate',
		editable:false,
		name:'SALEDATE',
/*		maxValue:new Date(),
		minValue:new Date(new Date()-7*24*60*60*1000),*/
		editable:false,
		format:'Y-m',
		listeners:{
			change:'changeDate'
		}
	}],
	columns:[{
		text:'评定对象',
		dataIndex:'ASS_OBJECT',
		flex:1
	}/*,{
		text:'部门',
		dataIndex:'STORENAME',
		flex:1
	},{
		text:'岗位',
		dataIndex:'POSITION',
		flex:1
	}*/,{
		text:'评定日期',
		dataIndex:'ASS_DATE',
		flex:1
	},{
		text:'评定人',
		dataIndex:'ADJUSTER',
		flex:1
	},{
		text:'总分',
		dataIndex:'T_SCO',
		flex:1
	},{
		text:'评语',
		dataIndex:'REMARK',
		flex:1
	},{
		text:'状态',
		dataIndex:'STATUS',
		flex:1
	}],	
	bbar:{
		xtype:'pagingtoolbar',
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		emptyMsg:'没有需要显示的数据'
	},
	listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },  
})