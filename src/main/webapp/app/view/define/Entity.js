Ext.define('Wsitms.view.define.Entity', {
	extend : 'Ext.grid.Panel',
	xtype : 'entity-define',
	requires : [
		'Wsitms.view.define.EntityModel',
		'Wsitms.view.define.EntityController'
	],
	controller : 'entity-define',
	viewModel : {
		type : 'entity-define'
	},
	layout : 'fit',
	autoScroll : true,
	tbar : [ {
		text : '新增实物',
		glyph : 0xf067,
		handler : 'onAdd'
	}, {
		text : '修改实物',
		glyph : 0xf044,
		handler : 'onEdit'
	} ],
	bind : {
		store : '{entityStore}'
	},
	columns : [ {
		text : '实物编号',
		dataIndex : 'id'
	}, {
		text : '实物编号',
		dataIndex : 'ENTITYNO'
	}, {
		text : '实物类型',
		dataIndex : 'ENTITYTYPE'
	}, {
		text : '实物名称',
		dataIndex : 'ENTITYNAME',
		width : 200,
	}, {
		text : '创建时间',
		dataIndex : 'CREATEDATE'
	}, {
		text : '有效标志',
		dataIndex : 'AVAILABILITYMARK'
	}, {
		text : '失效时间',
		dataIndex : 'INVALIDATION'
	} ],
	selModel : {
		selType : 'checkboxmodel'
	},
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true //只执行一次
		}
	}
})