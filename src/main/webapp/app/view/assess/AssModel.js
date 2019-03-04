Ext.define('Wsitms.view.assess.AssModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.assess',
	requires : [ 
		'Wsitms.model.User',
		'Wsitms.model.Assess'
		],
	stores : {
		mon_users_Store : {
			model : 'User',
			autoLoad : false,
			pageSize : 0,
			proxy : {
				type : 'ajax',
				api : {
					read : '/Wsitms/user/mon_user?userName=' + encodeURI(userName)
				}
			}
		},
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