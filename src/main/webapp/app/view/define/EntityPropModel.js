Ext.define('Wsitms.view.define.EntityPropModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.entity-property',
	requires : [
		'Wsitms.model.Entity',
		'Wsitms.model.Property',
		'Wsitms.model.EntityProp'
	],
	stores : {
		entPropStore : {
			model : 'Entity',
			autoLoad : false,
			pageSize : 0,
			proxy:{
				type:'ajax',
				api:{
					read:'/Wsitms/init/entValList'
				}
			}
		},

	propStore : {
			model : 'Property',
			autoLoad : false,
			pageSize : 100,
		}
	}
})