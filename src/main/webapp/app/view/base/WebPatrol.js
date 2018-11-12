Ext.define('Wsitms.view.base.WebPatrol',{
	extend:'Ext.grid.Panel',
	xtype:'web-patrol',
	requires: ['Wsitms.view.base.WebController'],	
	layout:'fit',
	controller: 'web-patrol',
	autoScroll:true,
	tbar:[{
		text:'巡查',
		handler:'webPatrol',
		glyph:0xf010,
	}],
	columns:[{
		text:'实物编号',
		dataIndex:'ENTITYNO'
	},{
		text:'实物名称',
		dataIndex:'ENTITYNAME'
	},{
		text:'属性编号',
		dataIndex:'PROPERTYNO'
	},{
		text:'属性名称',
		dataIndex:'PROPERTYNAME'
	},{
		text:'属性值',
		width:200,
		dataIndex:'PROPERTYVALUE'
		
	},{
		text:'属性取值',
		dataIndex:'PROPERTYCHAR',
		renderer : function(val, meta) {
			if(val=='TimeOut'){
				meta.style = 'color: #FF0000';
			}
			return val;
		}
	},{
		text:'状态',
		dataIndex:'STATUS',
		renderer : function(val, meta) {
			if(val=='ERROR'){
				meta.style = 'color: #FF0000';				
			}
			return val;
			    }
	}],
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    },
})