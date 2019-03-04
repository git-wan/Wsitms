Ext.define('Wsitms.view.status.DbPatrol', {//db view
	extend : 'Ext.grid.Panel',
	xtype : 'db-patrol',
	requires : [ 'Wsitms.view.status.DbController' ],
	controller : 'db-patrol',
	layout : 'fit',
	frame : true,
	autoScroll : true,
	tbar : [ {
		text : 'DB巡查',
		handler : 'dbPatrol',
		glyph : 0xf010,
	} ],
	columns : [ {
		text : '实物编号',
		dataIndex : 'ENTITYNO'
	}, {
		text : '实物名称',
		dataIndex : 'ENTITYNAME',
		width : 200
	}, {
		text : '属性值',
		dataIndex : 'PROPERTYVALUE'
	}, {
		text : '属性取值',
		dataIndex : 'PROPERTYCHAR'
	}, {
		text : '状态',
		dataIndex : 'STATUS',
		renderer : function(val, meta) {
			if (val == 'ERROR') {
				meta.style = 'color: #FF0000';
			}
			return val;
		}
	} ],
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true //只执行一次
		}
	},
})