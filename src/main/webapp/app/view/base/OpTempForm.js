Ext.define('Wsitms.view.base.OpTempForm',{
	extend:'Ext.window.Window',
	xtype:'optemp-form',
	height:'220',
	width:300,
	title:'添加模板',
	modal:true,//模态框，开启遮罩
	//bind:{store:'{opTemplateStore}'},
	items:{
	xtype:'form',
	reference:'optempForm',
    layout:{
    	type:'vbox',
    	align:'center'
    },
	items:[{
		xtype:'textfield',
		fieldLabel:'操作关键词',
		name:'OPKEYWORD',
		allowBlank:false,
		blankText:'操作关键词不能为空',
		msgTarget:'side',//设置不符合验证的提示方式
		//bind:'{opTemplateStore.OPMODELSEQ}'
	},{
		xtype:'textfield',
		fieldLabel:'操作描述',
		name:'OPDESC',
		allowBlank:false,
		blankText:'操作描述不能为空',
		msgTarget:'side',
		//bind:'{opTemplateStore.OPKEYWORD}'
	},{
		xtype:'textfield',
		fieldLabel:'备注',
		name:'OPNOTE',
		allowBlank:false,
		blankText:'备注不能为空',
		msgTarget:'side',
		//bind:'{opTemplateStore.OPDESC}'
	}],

	},
	buttons:[{
		text:'保存',
		handler:'saveForm'
	},{
		text:'返回',
		handler:'closeForm'
	}]
})


