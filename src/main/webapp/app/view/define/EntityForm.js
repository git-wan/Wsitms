Ext.define('Wsitms.view.define.EntityForm',{
	extend:'Ext.window.Window',
	xtype:'entity-form',
	height:330,
	width:400,
	bind:{
		title:'{title}'
	},
	modal:true,//模态框，开启遮罩
	items:{
	xtype:'form',
	reference:'entityForm',
    layout:{
    	type:'vbox',
    	align:'center'
    },
	items:[{
		xtype:'textfield',
		fieldLabel:'实物编号',
		name:'ENTITY_ID',
        hidden:true,
        reference:'primary_id',
        bind:'{id}'
	},{
		xtype:'textfield',
		fieldLabel:'实物编号',
		name:'ENTITYNO',
		allowBlank:false,
		blankText:'实物编号不能为空',
		msgTarget:'side',//设置不符合验证的提示方式
	},{
		xtype:'combobox',
		fieldLabel:'实物类型',
		name:'ENTITYTYPE',
		allowBlank:false,
		blankText:'实物类型不能为空',
		msgTarget:'side',
		queryMode:'local',
		displayField: 'name',
		valueField:'abbr',
		allowBlank:false,
		blankText:'属性标志不能为空',
		msgTarget:'side',
		store:{data:[{
			'abbr':'硬件设备','name':'硬件设备'
		},{
			'abbr':'UPS电源','name':'UPS电源'
		},{
			'abbr':'服务器','name':'服务器'
		},{
			'abbr':'PC机','name':'PC机'
		},{
			'abbr':'WEB系统','name':'WEB系统'
		}]},
	},{
		xtype:'textfield',
		fieldLabel:'实物名称',
		name:'ENTITYNAME',
		allowBlank:false,
		blankText:'实物名称不能为空',
		msgTarget:'side',
	},{
		xtype:'datefield',
		fieldLabel:'创建时间',
		name:'CREATEDATE',
		allowBlank:false,
		blankText:'创建时间不能为空',
		msgTarget:'side',
		format:'Y-m-d',
		editable:false
		
	},{
		xtype:'combobox',
		fieldLabel:'有效标志',
		name:'AVAILABILITYMARK',
		editable:false,
		queryMode:'local',
		allowBlank:false,
		blankText:'有效标志',
		msgTarget:'side',
		displayField: 'name',
		valueField:'abbr',
		store:{data:[{
			'abbr':'Valid','name':'Valid'
		},{
			'abbr':'NoValid','name':'NoValid'
		}]},
	},{
		xtype:'datefield',
		fieldLabel:'失效时间',
		name:'INVALIDATION',
		format:'Y-m-d',
	}],
	},
	buttons:[{
		text:'保存',
		handler:'saveForm'
	},{
		text:'清空',
		handler:'resetForm',
		reference:'entFormReset'
	},{
		text:'返回',
		handler:'closeForm'
	}]
})
