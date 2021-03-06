Ext.define('Wsitms.view.aseet.AseetForm', { //资产编辑框
	extend : 'Ext.window.Window',
	xtype : 'aseet-form',
	height : 740,
	width : 620,
	bind : {
		title : '{title}'
	},
	modal : true, //模态框，开启遮罩
	items : {
		xtype : 'form',
		reference : 'aseetForm',
		items : [ {
			layout : 'column',
			items : [ {
				xtype : 'fieldset',
				title : '资产信息',
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '编号',
					//margin:'10 0 0 20'
				}, {
					xtype : 'textfield',
					fieldLabel : '名称',
				//margin:'10 0 0 20'
				}, {
					xtype : 'combobox',
					fieldLabel : '实体编号',
					editable : false,
				//style:'margin-left:20px'
				}, {
					xtype : 'combobox',
					fieldLabel : '品牌名称',
					editable : false,
				}, {
					xtype : 'combobox',
					fieldLabel : '分类代码',
					editable : false,
				}, {
					xtype : 'combobox',
					fieldLabel : '采购部门',
					editable : false,
				}, {
					xtype : 'textfield',
					fieldLabel : '采购合同编号',
				//margin:'10 0 0 20'
				}, {
					xtype : 'combobox',
					fieldLabel : '采购人',
					editable : false,
				}, {
					xtype : 'datefield',
					fieldLabel : '采购日期'
				}, {
					xtype : 'datefield',
					fieldLabel : '折旧起始日期'
				} ]
			}, {
				xtype : 'fieldset',
				title : '资产信息',
				layout : {
					type : 'vbox',
					align : 'center'
				},
				items : [ {
					xtype : 'textfield',
					fieldLabel : '原值',
				}, {
					xtype : 'textfield',
					fieldLabel : '折旧方式',
				}, {
					xtype : 'textfield',
					fieldLabel : '净值',
				}, {
					xtype : 'textfield',
					fieldLabel : '资产明细净值总额',
				}, {
					xtype : 'textfield',
					fieldLabel : '残值',
				}, {
					xtype : 'combobox',
					fieldLabel : '状态',
					editable : false,
				}, {
					xtype : 'combobox',
					fieldLabel : '供应商编号',
					editable : false,
				}, {
					xtype : 'textfield',
					fieldLabel : '明细条款',
				}, {
					xtype : 'combobox',
					fieldLabel : '账务标志',
					editable : false,
				} ]
			} ]
		}, {
			xtype : 'fieldset',
			title : '资产备注',
			width : '100%',
			margin : '10,0,0,0',
			items : [ {
				xtype : 'textarea',
				fieldLabel : '备注信息',
				width : '100%',
			} ]
		} ],
		buttons : [ {
			text : '保存',
			handler : 'saveForm'
		}, {
			text : '清空',
			handler : 'resetForm',
			reference : 'resetForm',
		}, {
			text : '返回',
			handler : 'closeForm'
		} ]
	},
})