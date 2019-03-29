Ext.define('Wsitms.view.assess.AssModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.assess',
	requires : [ 
		'Wsitms.model.User',
		'Wsitms.model.Assess'
		],
	stores : {
		assStore : {
			model : 'Assess',
			autoLoad : false,
			pageSize : 0,
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/assess/assessList?userName=' + encodeURI(userName)
				}
			}
		}
	}
})