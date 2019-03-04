Ext.define('Wsitms.view.define.EntityProp', { //实体属性view
	extend : 'Ext.panel.Panel',
	xtype : 'entity-property',
	requires : [
		'Wsitms.view.define.EntityPropController',
		'Wsitms.view.define.EntityPropModel',
	],
	controller : 'entity-property',
	viewModel : {
		type : 'entity-property'
	},
	layout : 'hbox', //布局可以激活百分比
	items : [ {
		layout : 'vbox',
		height : '100%',
		width : '50%',
		frame : true,
		style : 'margin-top:2px',
		items : [ {
			title : '实物信息',
			xtype : 'grid',
			width : '100%',
			height : '50%',
			reference : 'entity',
			bind : {
				store : '{entPropStore}'
			},
			tbar : [ '->', {
				fieldLabel : '实物类型列表',
				xtype : 'combobox',
				editable : false,
				name : 'ENTITYTYPE',
				queryMode : 'local',
				displayField : 'name',
				valueField : 'abbr',
				store : {
					data : [ {
						'abbr' : '硬件设备',
						'name' : '硬件设备'
					}, {
						'abbr' : 'UPS电源',
						'name' : 'UPS电源'
					}, {
						'abbr' : '服务器',
						'name' : '服务器'
					}, {
						'abbr' : 'PC机',
						'name' : 'PC机'
					}, {
						'abbr' : 'WEB系统',
						'name' : 'WEB系统'
					}, {
						'abbr' : '',
						'name' : '其他'
					} ]
				},
				listeners : {
					change : 'changeEntType'
				}
			} ],
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
			}, {
				text : '创建标志',
				dataIndex : 'CREATEDATE'
			}, {
				text : '有效时间',
				dataIndex : 'AVAILABILITYMARK'
			}, {
				text : '失效时间',
				dataIndex : 'INVALIDATION'
			} ],
			listeners : {
				rowclick : 'entPropClick'
			}
		}, {
			title : '属性信息',
			xtype : 'grid',
			height : '50%',
			width : '100%',
			reference : 'property',
			bind : {
				store : '{propStore}'
			},
			//autoScroll:true,
			columns : [ {
				text : '自动生成属性编号',
				dataIndex : 'id'
			}, {
				text : '用户生成属性编号',
				dataIndex : 'PROPERTYNO'
			}, {
				text : '属性名称',
				dataIndex : 'PROPERTYNAME'
			}, {
				text : '属性操作',
				dataIndex : 'PROPERTYOP'
			}, {
				text : '属性标志',
				dataIndex : 'PROPERTYMARK'
			}, {
				text : '属性取值类型',
				dataIndex : 'PROPERTYVALUETYPE'
			}, {
				text : '属性正常取值',
				dataIndex : 'PROPERTYCHAR'
			}, {
				text : '最小正常值',
				dataIndex : 'PROPERTYMINI'
			}, {
				text : '最大正常值',
				dataIndex : 'PROPERTYMAX'
			}, {
				text : '备注',
				dataIndex : 'NOTE'
			} ]
		} ]
	}, {
		xtype : 'grid',
		title : '实物属性信息',
		style : 'margin-top:2px',
		height : '100%',
		width : '50%',
		reference : 'entProp',
		frame : true,
		tbar : [ {
			text : '新增实物属性',
			handler : 'addEntProp'
		}, {
			text : '修改实物属性',
			handler : 'editEntProp'
		} ],
		columns : [ {
			text : '实物编号',
			dataIndex : 'ENTITYNO'
		}, {
			text : '实物名称',
			dataIndex : 'ENTITYNAME'
		}, {
			text : '属性编号',
			dataIndex : 'PROPERTYNO'
		}, {
			text : '属性名称',
			dataIndex : 'PROPERTYNAME'
		}, {
			text : '属性值',
			dataIndex : 'PROPERTYVALUE',
		/*			VALUEFLAG:'{VALUEFLAG}',
					renderer : function(VALUEFLAG) {
		                alert(VALUEFLAG)
		                if(VALUEFLAG=='PSWD')
						return "******";} */
		}, {
			text : '值类型',
			dataIndex : 'VALUETYPE'
		}, {
			text : '自动录入',
			dataIndex : 'AUTOENTRY'
		}, {
			text : '最小正常值',
			dataIndex : 'PROPERTYMINI'
		}, {
			text : '最大正常值',
			dataIndex : 'PROPERTYMAX'
		}, {
			text : '图形显示',
			dataIndex : 'SHOWMARK'
		} ],
	} ],
	listeners : {
		afterlayout : {
			fn : 'onAfterLayout',
			delay : 1,
			single : true //只执行一次
		}
	},
})