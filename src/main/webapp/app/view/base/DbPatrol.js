Ext.define('Wsitms.view.base.DbPatrol',{
	extend:'Ext.grid.Panel',
	xtype:'db-patrol',
	requires: ['Wsitms.view.base.DbController'],
	layout:'fit',
	frame:true,
	controller: 'db-patrol',
	autoScroll:true,
	
	tbar:[{
		text:'DB巡查',
		handler:'dbPatrol'
	}],
	columns:[{
		text:'实物编号',
		dataIndex:'ENTITYNO'
	},{
		text:'实物名称',
		dataIndex:'ENTITYNAME'
	},{
		text:'属性值',
		dataIndex:'PROPERTYVALUE'
	},{
		text:'属性取值',
		dataIndex:'PROPERTYCHAR'
	},{
		text:'状态',
		dataIndex:'STATUS'
	}],
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },
})