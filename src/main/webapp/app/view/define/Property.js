Ext.define('Wsitms.view.define.Property',{
	extend:'Ext.grid.Panel',
	xtype:'define-property',
	
	requires:[
		'Wsitms.view.define.PropModel',
		'Wsitms.view.define.PropController'
	],
	controller:'define-property',
	viewModel:{type:'define-property'},
	layout:'fit',
	autoScroll:true,
	
	tbar:[{
		text:'新增属性',
		handler:'onAdd',
		glyph:0xf067
	},{
		text:'修改属性',
		handler:'onEdit',
		glyph:0xf044
	}],
	bind:{store:'{propStore}'},
	
	columns:[{
		text:'自动生成属性编号',
		dataIndex:'id'
	},{
		text:'用户定义属性编号',
		dataIndex:'PROPERTYNO'
	},{
		text:'属性名称',
		dataIndex:'PROPERTYNAME'
	},{
		text:'属性操作',
		dataIndex:'PROPERTYOP',
		width:200
	},{
		text:'属性标志',
		dataIndex:'PROPERTYMARK'
	},{
		text:'属性取值类型',
		dataIndex:'PROPERTYVALUETYPE'
	},{
		text:'属性正常取值',
		dataIndex:'PROPERTYCHAR'
	},{
		text:'最小正常值',
		dataIndex:'PROPERTYMINI'
	},{
		text:'最大正常值',
		dataIndex:'PROPERTYMAX'
	},{
		text:'备注',
		dataIndex:'NOTE'
	},{
		text:'图形显示',
		dataIndex:'SHOWMARK'
	}],
	selModel:{
		selType:'checkboxmodel'
	},
    listeners:{
    	afterlayout:{
    		fn:'onAfterLayout',
    		delay:1,
    		single:true//只执行一次
    	}
    }

})