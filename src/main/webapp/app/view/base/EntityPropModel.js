Ext.define('Wsitms.view.base.EntityPropModel',{
	extend:'Ext.app.ViewModel',
	alias:'viewmodel.entity-property',
	requires:[
		'Wsitms.model.Entity',
		'Wsitms.model.Property',
		'Wsitms.model.EntityProp'
		],
	stores:{
		entPropStore:{
			model:'Entity',
			autoLoad:false,
			pageSize:0,
		},
		
		propStore:{
			model:'Property',
			autoLoad:false,
			pageSize:100,
		}
	
	}
})

