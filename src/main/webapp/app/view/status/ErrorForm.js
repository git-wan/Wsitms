Ext.define('Wsitms.view.status.ErrorForm', {
	extend : 'Ext.window.Window',
	xtype : 'error-form',
	height : 330,
	width : 700,
	autoScroll : true,
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'grid',
		reference : 'errorForm',
		columns : [ {
			text : '实物编号',
			dataIndex : 'ENTITYNO',
		}, {
			text : '实物名称',
			dataIndex : 'ENTITYNAME',
		}, {
			text : '属性编号',
			dataIndex : 'PROPERTYNO',
		}, {
			text : '实物名称',
			dataIndex : 'PROPERTYNAME',
		}, {
			text : '属性值',
			dataIndex : 'PROPERTYVALUE',
		}, {
			text : '属性取值',
			dataIndex : 'PROPERTYCHAR',
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
	},
	buttons : [ {
		text : '保存',
		handler : 'saveForm'
	}, {
		text : '取消',
		handler : 'closeForm'
	} ]
})