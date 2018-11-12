Ext.define('Wsitms.view.base.SaleReport',{
	extend:'Ext.grid.Panel',
	xtype:'sale-report',
	id:'app-sale-report',
	requires:[
		'Wsitms.view.base.SaleReportController',
	],
	controller: 'sale-report',
	layout:'fit',
	
	tbar:[{
		id:'dlink',
		glyph:0xf1c3,
		text:'导出EXCEL',
	    handler:'aa',
	},'-',{
		fieldLabel:'查询时间',
		xtype:'datefield',	
		reference:'queryDate',
		editable:false,
		name:'SALEDATE',
		maxValue:new Date(),
		minValue:new Date(new Date()-7*24*60*60*1000),
		editable:false,
		format:'Y-m-d',
		listeners:{
			change:'changeDate'
		}
	}],
	columns:[{
		text:'销售时间',
		dataIndex:'SALEDATE',
		flex:1
	},{
		text:'实体名称',
		dataIndex:'STORENAME',
		flex:1
	},{
		text:'当日销售',
		dataIndex:'CURRAMT',
		flex:1
	},{
		text:'去年可比日销售',
		dataIndex:'COMAMT',
		flex:1
	},{
		text:'可比增长',
		dataIndex:'COMINCREASE',
		flex:1
	},{
		text:'当月累计',
		dataIndex:'CURRSUM',
		flex:1
	},{
		text:'同比月度累计',
		dataIndex:'HISSUM',
		flex:1
	}],
	
	bbar:{
		xtype:'pagingtoolbar',
		displayInfo:true,
		displayMsg:'显示:{0}-{1}条,总共:{2}条',
		emptyMsg:'没有需要显示的数据'
	},
	/*listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },*/

   
})