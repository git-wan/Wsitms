Ext.define('Wsitms.view.problem.ProblemBackModel', {
	extend : 'Ext.app.ViewModel',
	alias : 'viewmodel.probback',

	requires : [
		'Wsitms.model.Question',
		'Wsitms.model.OpTemplate'
	],


	stores : {
		questStore : {
			model : 'Question',
			pageSize : 100,
			autoLoad : false,
			remoteFilter : true, //开启过滤条件
			remoteSort : true, //开启排序条件
			session : true
		},

		opTemplateStore : {
			model : 'OpTemplate',
			pageSize : 100,
			autoLoad : false,
		},

		overProblemStore : {
			model : 'Question',
			pageSize : 10,
			autoLoad : false,
		},
		
		opStore:{
			
		}
	}
});