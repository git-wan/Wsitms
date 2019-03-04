Ext.define('Wsitms.view.aseet.DepartModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.depart-register',
	requires : [ 'Wsitms.model.Depart',
		'Wsitms.model.Company'
	],
	stores : {
		departStore : {
			model : 'Depart',
			autoLoad : false,
			pageSize : 5,
		},

	companyStore : {
			model : 'Company',
			autoLoad : false,
			pageSize : 0
		}
	}
})