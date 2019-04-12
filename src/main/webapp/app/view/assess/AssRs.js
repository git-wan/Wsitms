Ext.define('Wsitms.view.assess.AssRs',{
	extend:'Ext.grid.Panel',
	xtype:'ass_result',
	requires:[
		'Wsitms.view.assess.AssRsController',
		'Wsitms.view.assess.AssResModel'
	],
	controller: 'ass_result',
	layout:'fit',
	viewModel : {
		type : 'ass_result'
	},
	bind:{
		store:'{assResStore}'
	},
	
	tbar:[{
		glyph:0xf1c3,
		text:'考核表',
	    handler:'assess'
	},'-',{
		id:'dlink',
		glyph:0xf1c3,
		text:'导出EXCEL',
	    handler:'aa'
	},'-',{
		fieldLabel:'评定计划名称',
		xtype:'combobox',
		name:'PLANNAME',
		editable:false,
		allowBlank : false,
		displayField : 'PLANNAME',
		valueField : 'PLANNAME',
		bind : {
            store : '{planstore}'
        },
		listeners : {
			change : 'changePlan'
		}
	}],
	columns:[{
		text:'评定时间',
		dataIndex:'ASS_DATE',
		flex:1
	},{
		text:'评定计划名称',
		dataIndex:'PLANNAME',
		flex:1
	},{
		text:'评定对象',
		dataIndex:'ASS_OBJECT',
		flex:1
	},{
		text:'工作质量',
		dataIndex:'QUALITY',
		flex:1
	},{
		text:'工作效率',
		dataIndex:'EFFICIENCY',
		flex:1
	},{
		text:'考勤纪律',
		dataIndex:'CHECKWORK',
		flex:1
	},{
		text:'行为规范',
		dataIndex:'ACTION',
		flex:1
	},{
		text:'责任感',
		dataIndex:'RESPONSIBILITY',
		flex:1
	},{
		text:'创新性',
		dataIndex:'CREATIVE',
		flex:1
	},{
		text:'总分',
		dataIndex:'F_SCO',
		flex:1
	},{
		text:'考核等级',
		dataIndex:'ASS_LEVEL',
		flex:1
	},{
		text:'备注',
		dataIndex:'NOTE',
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
    }
});