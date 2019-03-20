Ext.define('Wsitms.view.assess.AsjModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.asj',
	requires : [ 
		'Wsitms.model.Asj',
	],
	stores : {
		asjStore : {
			model : 'Asj',
			autoLoad : false,
			pageSize : 100,
			groupField : 'ASSGROUP',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/assess/asjList'
				}
			}
		},
		departnamestore:{
			model : 'Depart',
			autoLoad : false,
			pageSize : 100,
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/depart/depNameList'
				}
			}
		}
	}
})