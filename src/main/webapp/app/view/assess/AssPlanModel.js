Ext.define('Wsitms.view.assess.AssPlanModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.assplan',
	requires : [ 
		'Wsitms.model.Assess',
		'Wsitms.model.AssTime',        		
	],
	stores : {
		asjStore : {
			model : 'Assess',
			autoLoad : false,
			pageSize : 100,
			groupField : 'ADJUSTER',
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/assess/asjList'
				}
			}
		},

		asstimeStore : {
			model : 'AssTime',
			autoLoad : false,
			pageSize : 100,
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/assess/assTimeList'
				}
			}
		}
	}
})